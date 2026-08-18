import { PageMapElement } from "../page-map/schema";

/**
 * Common patterns that represent volatile / dynamic runtime text in web apps.
 */
const DYNAMIC_PATTERNS: Array<{ regex: RegExp; replacement: string; patternReplacer: (s: string) => string }> = [
  {
    // UUID / GUID
    regex: /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g,
    replacement: "<UUID>",
    patternReplacer: (s) =>
      s.replace(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g, "[0-9a-fA-F-]+"),
  },
  {
    // Dates: 2026-08-18, 2026/08/18, 08/18/2026, 18.08.2026
    regex: /\b\d{4}[-/.]\d{1,2}[-/.]\d{1,2}\b|\b\d{1,2}[-/.]\d{1,2}[-/.]\d{4}\b/g,
    replacement: "<DATE>",
    patternReplacer: (s) =>
      s.replace(
        /\b\d{4}[-/.]\d{1,2}[-/.]\d{1,2}\b|\b\d{1,2}[-/.]\d{1,2}[-/.]\d{4}\b/g,
        "\\d{4}[-/.]\\d{1,2}[-/.]\\d{1,2}",
      ),
  },
  {
    // Currency: $120.00, ¥8,000, €45.50, £10.99
    regex: /[$¥€£]\s?\d+(?:,\d{3})*(?:\.\d{2})?/g,
    replacement: "<CURRENCY>",
    patternReplacer: (s) =>
      s.replace(/[$¥€£]\s?\d+(?:,\d{3})*(?:\.\d{2})?/g, "[$¥€£]\\s?\\d+(?:,\\d{3})*(?:\\.\\d{2})?"),
  },
  {
    // Order / Invoice IDs like INV-2026-0041, Order #12345
    regex: /\b(INV|ORD|Order|Invoice)[- #:]+\d+([-\w]*)\b/gi,
    replacement: "<ID>",
    patternReplacer: (s) => s.replace(/\b(INV|ORD|Order|Invoice)[- #:]+\d+([-\w]*)\b/gi, "$1[- #:]+\\d+.*"),
  },
];

/**
 * Checks if accessibleName contains dynamic content, and normalizes it to a regex pattern.
 */
export function normalizeAccessibleName(rawName?: string): {
  accessibleName?: string;
  accessibleNamePattern?: string;
} {
  if (!rawName) return {};

  const trimmed = rawName.trim().replace(/\s+/g, " ");

  let isDynamic = false;
  let patternStr = trimmed;

  for (const { regex, patternReplacer } of DYNAMIC_PATTERNS) {
    if (regex.test(trimmed)) {
      isDynamic = true;
      patternStr = patternReplacer(patternStr);
    }
  }

  if (isDynamic) {
    return {
      accessibleNamePattern: `^${patternStr}$`,
    };
  }

  return {
    accessibleName: trimmed,
  };
}

/**
 * Formats a raw label/role into a clean, idiomatic camelCase identifier key.
 */
export function generateElementKey(role: string, name?: string, testId?: string, id?: string): string {
  let base = "";

  if (testId) {
    base = testId;
  } else if (name && name.length <= 40) {
    base = name;
  } else if (id) {
    base = id;
  } else {
    base = role;
  }

  // Sanitize non-alphanumeric chars
  const words = base
    .replace(/[^a-zA-Z0-9\s-_]/g, "")
    .split(/[\s\-_]+/)
    .filter(Boolean);

  if (words.length === 0) {
    words.push(role);
  }

  // Convert to camelCase
  let key = words
    .map((w, idx) => {
      const lower = w.toLowerCase();
      return idx === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");

  // Append role suffix if not already present in key
  const lowerKey = key.toLowerCase();
  const lowerRole = role.toLowerCase();
  if (!lowerKey.endsWith(lowerRole)) {
    const roleSuffix = role.charAt(0).toUpperCase() + role.slice(1);
    key = `${key}${roleSuffix}`;
  }

  // Ensure valid JS identifier
  if (!/^[a-zA-Z_$]/.test(key)) {
    key = `el_${key}`;
  }

  return key;
}

/**
 * Deterministically sorts elements by scope, role, accessibleName, and key.
 */
export function sortElements(elements: PageMapElement[]): PageMapElement[] {
  return [...elements].sort((a, b) => {
    const scopeA = a.scope ?? "";
    const scopeB = b.scope ?? "";
    if (scopeA !== scopeB) return scopeA.localeCompare(scopeB);

    if (a.role !== b.role) return a.role.localeCompare(b.role);

    const nameA = a.accessibleName ?? a.accessibleNamePattern ?? "";
    const nameB = b.accessibleName ?? b.accessibleNamePattern ?? "";
    if (nameA !== nameB) return nameA.localeCompare(nameB);

    return a.key.localeCompare(b.key);
  });
}
