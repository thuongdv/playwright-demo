import { Page } from "@playwright/test";
import { PageMap, PageMapElement } from "../page-map/schema";
import { computeAriaDigest } from "./digest";
import { generateElementKey, normalizeAccessibleName, sortElements } from "./normalizer";
import { Target, VariantConfig } from "./types";

const INTERACTIVE_ROLES = new Set([
  "button",
  "link",
  "textbox",
  "combobox",
  "checkbox",
  "radio",
  "tab",
  "menuitem",
  "option",
  "slider",
  "switch",
  "searchbox",
  "spinbutton",
]);

const ASSERTION_ROLES = new Set(["heading", "alert", "dialog", "status", "table"]);

interface RawDomElement {
  tagName: string;
  role: string;
  name: string;
  testId?: string;
  id?: string;
  label?: string;
  placeholder?: string;
  text?: string;
  visible: boolean;
  enabled: boolean;
  scope?: string;
  scopeLocator?: string;
  cssSelector?: string;
}

/**
 * Extracts elements and aria snapshot from a target page.
 */
export async function extractPageMap(
  page: Page,
  target: Target,
  variant: VariantConfig,
  roleKey: string,
  options: {
    appBuild: string;
    harvesterVersion: string;
    existingPageMap?: PageMap;
    baseURL?: string;
  },
): Promise<PageMap> {
  const rootSelector = target.rootSelector || "body";
  const depth = target.depth ?? 8;
  const rootLocator = rootSelector === "body" ? page.locator("body") : page.locator(rootSelector);

  // 1. Capture AI-mode accessibility snapshot with depth limit
  let ariaSnapshotText = "";
  try {
    ariaSnapshotText = await rootLocator.ariaSnapshot({
      mode: "ai",
      depth,
    });
  } catch {
    // Fallback if rootSelector is not yet attached or root snapshot fails
    ariaSnapshotText = await page.ariaSnapshot({
      mode: "ai",
      depth,
    });
  }

  // 2. Walk live DOM deterministically to extract interactive elements and assertion landmarks
  const rawElements: RawDomElement[] = await page.evaluate(
    `((rootSel) => {
      const root = document.querySelector(rootSel) || document.body;
      const interactiveTags = "button, a[href], input, select, textarea, [role], h1, h2, h3, h4, h5, h6, [data-testid]";
      const nodes = Array.from(root.querySelectorAll(interactiveTags));

      const checkVisible = (el) => {
        if (el.closest("[aria-hidden='true'], [hidden], style, script")) return false;
        if (el.offsetParent === null && el.tagName !== "BODY" && window.getComputedStyle(el).position !== "fixed") {
          return false;
        }
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
      };

      const getRole = (el) => {
        const explicitRole = el.getAttribute("role");
        if (explicitRole) return explicitRole.toLowerCase().trim();

        const tag = el.tagName.toLowerCase();
        if (tag === "button") return "button";
        if (tag === "a" && el.hasAttribute("href")) return "link";
        if (tag === "select") return "combobox";
        if (tag === "textarea") return "textbox";
        if (tag === "input") {
          const type = (el.getAttribute("type") || "text").toLowerCase();
          if (type === "button" || type === "submit" || type === "reset") return "button";
          if (type === "checkbox") return "checkbox";
          if (type === "radio") return "radio";
          if (type === "search") return "searchbox";
          if (type === "number") return "spinbutton";
          return "textbox";
        }
        if (/^h[1-6]$/.test(tag)) return "heading";
        if (el.classList.contains("alert") || el.getAttribute("role") === "alert") return "alert";
        if (el.classList.contains("modal") || el.getAttribute("role") === "dialog") return "dialog";
        if (tag === "table") return "table";
        return "";
      };

      const getName = (el) => {
        const ariaLabel = el.getAttribute("aria-label");
        if (ariaLabel) return ariaLabel.trim();

        const ariaLabelledBy = el.getAttribute("aria-labelledby");
        if (ariaLabelledBy) {
          const labelNode = document.getElementById(ariaLabelledBy);
          if (labelNode && labelNode.textContent) return labelNode.textContent.trim();
        }

        if (el.tagName === "INPUT" || el.tagName === "SELECT" || el.tagName === "TEXTAREA") {
          const id = el.id;
          if (id) {
            const label = document.querySelector('label[for="' + id + '"]');
            if (label && label.textContent) return label.textContent.trim();
          }
          const parentLabel = el.closest("label");
          if (parentLabel && parentLabel.textContent) return parentLabel.textContent.trim();
        }

        const title = el.getAttribute("title");
        if (title) return title.trim();

        const placeholder = el.getAttribute("placeholder");
        if (placeholder) return placeholder.trim();

        const text = (el.textContent || "").replace(/\\s+/g, " ").trim();
        if (text.length > 0 && text.length < 120) {
          return text;
        }

        return "";
      };

      const getScope = (el) => {
        const row = el.closest("tr, [role='row'], .card, .modal, .table-row, [data-testid*='row'], [data-testid*='item']");
        if (row) {
          if (row.classList.contains("card")) return { scope: "Card", scopeLocator: ".card" };
          if (row.classList.contains("modal")) return { scope: "Modal", scopeLocator: ".modal" };
          if (row.tagName === "TR" || row.getAttribute("role") === "row") return { scope: "Row", scopeLocator: "tr" };
          return { scope: "Item", scopeLocator: "[data-testid*='item'], [data-testid*='row']" };
        }
        return {};
      };

      const getSelector = (el) => {
        if (el.id) return "#" + el.id;
        const name = el.getAttribute("name");
        if (name) return el.tagName.toLowerCase() + '[name="' + name + '"]';
        const href = el.getAttribute("href");
        if (href && href.length < 60) return 'a[href*="' + href.replace(/^.*\\//, "") + '"]';
        const cls = Array.from(el.classList).slice(0, 2).join(".");
        if (cls) return el.tagName.toLowerCase() + "." + cls;
        return el.tagName.toLowerCase();
      };

      const results = [];

      for (const el of nodes) {
        const visible = checkVisible(el);
        const role = getRole(el);
        const testId = el.getAttribute("data-testid") || el.getAttribute("data-test") || undefined;
        const id = el.id ? el.id : undefined;
        const name = getName(el);
        const placeholder = el.getAttribute("placeholder") || undefined;
        const label = el.tagName === "INPUT" || el.tagName === "SELECT" || el.tagName === "TEXTAREA"
          ? (el.id ? document.querySelector('label[for="' + el.id + '"]')?.textContent?.trim() : undefined)
          : undefined;

        if (!role && !testId && !name && !id) continue;

        const enabled = !el.disabled;
        const { scope, scopeLocator } = getScope(el);
        const cssSelector = getSelector(el);

        results.push({
          tagName: el.tagName.toLowerCase(),
          role: role || el.tagName.toLowerCase(),
          name,
          testId,
          id,
          label,
          placeholder,
          visible,
          enabled,
          scope,
          scopeLocator,
          cssSelector,
        });
      }

      return results;
    })(${JSON.stringify(rootSelector)})`,
  );

  // 3. Process raw elements, calculate counts, construct locators and notes
  const notes: string[] = [];
  const processedElements: PageMapElement[] = [];
  const existingMap = options.existingPageMap;
  const previousBuildMap = new Map<string, string>();
  if (existingMap) {
    for (const el of existingMap.elements) {
      previousBuildMap.set(el.key, el.firstSeenBuild);
    }
  }

  // Count occurrences across same role + name / testId for scoping detection
  const elementCounts = new Map<string, number>();
  for (const raw of rawElements) {
    const signature = raw.testId ? `testId:${raw.testId}` : `${raw.role}:${raw.name}:${raw.scope ?? ""}`;
    elementCounts.set(signature, (elementCounts.get(signature) ?? 0) + 1);
  }

  const seenKeys = new Set<string>();
  const seenScopedSignatures = new Set<string>();

  for (const raw of rawElements) {
    // Only include interactive elements or assertion landmarks
    const isInteractive = INTERACTIVE_ROLES.has(raw.role);
    const isAssertion = ASSERTION_ROLES.has(raw.role);
    if (!isInteractive && !isAssertion && !raw.testId) {
      continue;
    }

    // Skip empty elements with no name and no testId and no id
    if (!raw.name && !raw.testId && !raw.id && !raw.placeholder && !raw.label) {
      continue;
    }

    const signature = raw.testId ? `testId:${raw.testId}` : `${raw.role}:${raw.name}:${raw.scope ?? ""}`;
    const totalCount = elementCounts.get(signature) ?? 1;
    const requiresScoping = totalCount > 1;

    // If element is inside a repeated scope and we already recorded the representative template element, skip duplicate instances
    if (raw.scope && requiresScoping) {
      if (seenScopedSignatures.has(signature)) {
        continue;
      }
      seenScopedSignatures.add(signature);
    }

    const { accessibleName, accessibleNamePattern } = normalizeAccessibleName(raw.name);
    let key = generateElementKey(raw.role, accessibleName || accessibleNamePattern, raw.testId, raw.id);

    // Disambiguate duplicate keys within the page
    let uniqueKey = key;
    let counter = 2;
    while (seenKeys.has(uniqueKey)) {
      uniqueKey = `${key}${counter}`;
      counter++;
    }
    seenKeys.add(uniqueKey);
    key = uniqueKey;

    // Synthesize primary locator and fallbacks according to priority
    let locator = "";
    const fallbackLocators: string[] = [];

    if (raw.testId) {
      locator = `getByTestId('${raw.testId}')`;
      if (accessibleName && isInteractive) {
        fallbackLocators.push(`getByRole('${raw.role}', { name: '${accessibleName}' })`);
      }
    } else if (raw.label && (raw.role === "textbox" || raw.role === "combobox" || raw.role === "checkbox")) {
      locator = `getByLabel('${raw.label}')`;
      if (accessibleName) {
        fallbackLocators.push(`getByRole('${raw.role}', { name: '${accessibleName}' })`);
      }
    } else if (accessibleName) {
      locator = `getByRole('${raw.role}', { name: '${accessibleName}' })`;
      if (raw.id) {
        fallbackLocators.push(`locator('#${raw.id}')`);
      }
    } else if (raw.placeholder) {
      locator = `getByPlaceholder('${raw.placeholder}')`;
    } else if (raw.id) {
      locator = `locator('#${raw.id}')`;
    } else if (raw.cssSelector) {
      locator = `locator('${raw.cssSelector}')`;
      notes.push(`Element '${key}' uses scoped CSS selector '${raw.cssSelector}' as a last resort.`);
    } else {
      locator = `locator('${raw.tagName}')`;
    }

    const firstSeenBuild = previousBuildMap.get(key) || options.appBuild;

    processedElements.push({
      key,
      role: raw.role,
      accessibleName,
      accessibleNamePattern,
      testId: raw.testId,
      locator,
      fallbackLocators: fallbackLocators.length > 0 ? fallbackLocators : undefined,
      scope: raw.scope,
      count: totalCount,
      requiresScoping,
      visible: raw.visible,
      enabled: raw.enabled,
      firstSeenBuild,
    });
  }

  // Deduplicate and sort elements deterministically
  const sortedElements = sortElements(processedElements);

  // Compute deterministic digest
  const ariaDigest = computeAriaDigest(ariaSnapshotText, sortedElements);

  const pageMap: PageMap = {
    $schema: "./schema.json",
    route: target.route,
    pageKey: target.pageKey,
    capturedAt: new Date().toISOString(),
    appBuild: options.appBuild,
    harvesterVersion: options.harvesterVersion,
    auth: {
      roleKey,
    },
    state: {
      variantKey: variant.key,
      fixture: typeof variant.fixture === "string" ? variant.fixture : undefined,
      openers: variant.openers ? variant.openers.map((o) => o.description) : undefined,
    },
    elements: sortedElements,
    ariaDigest,
    notes: Array.from(new Set(notes)),
  };

  return pageMap;
}
