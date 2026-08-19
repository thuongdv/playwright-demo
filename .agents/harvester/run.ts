import { chromium } from "@playwright/test";
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as prettier from "prettier";
import { PageMap, PageMapIndex, validatePageMap } from "../page-map/schema";
import { ensureAuthState, setupAuthState } from "./auth/auth-manager";
import { getAllKnownSecrets } from "./auth/env";
import { extractPageMap } from "./extractor";
import { assertNoSecrets } from "./sanitizer";
import { HarvesterConfig, HarvesterOptions, HarvestResult } from "./types";

async function formatJson(content: object, filepath?: string): Promise<string> {
  const raw = JSON.stringify(content, null, 2);
  try {
    const config = filepath ? await prettier.resolveConfig(filepath) : null;
    return await prettier.format(raw, { ...config, filepath, parser: "json" });
  } catch {
    return raw + "\n";
  }
}

function parseArgs(): HarvesterOptions {
  const args = process.argv.slice(2);
  let configPath = ".agents/harvester/targets.ts";
  let only: string | undefined;
  let dryRun = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--config" && args[i + 1]) {
      configPath = args[i + 1];
      i++;
    } else if (args[i] === "--only" && args[i + 1]) {
      only = args[i + 1];
      i++;
    } else if (args[i] === "--dry-run") {
      dryRun = true;
    }
  }

  return { configPath, only, dryRun };
}

function getAppBuild(): string {
  try {
    const commit = execSync("git rev-parse --short HEAD", { stdio: ["pipe", "pipe", "ignore"] })
      .toString()
      .trim();
    if (commit) return commit;
  } catch {
    // Fallback if git is unavailable
  }
  return process.env.APP_BUILD || "unknown";
}

export async function runHarvester(options?: Partial<HarvesterOptions>): Promise<HarvestResult[]> {
  const cliOptions = parseArgs();
  const configPath = options?.configPath || cliOptions.configPath;
  const only = options?.only || cliOptions.only;
  const dryRun = options?.dryRun ?? cliOptions.dryRun;

  const resolvedConfigPath = path.resolve(process.cwd(), configPath);
  if (!fs.existsSync(resolvedConfigPath)) {
    throw new Error(`Harvester config not found at: ${resolvedConfigPath}`);
  }

  const configModule = await import(`file://${resolvedConfigPath.replace(/\\/g, "/")}`);
  const harvesterConfig: HarvesterConfig = configModule.default || configModule.config;

  const outputDir = path.resolve(process.cwd(), harvesterConfig.outputDir || ".agents/page-map");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const appBuild = harvesterConfig.appBuild || getAppBuild();
  const harvesterVersion = harvesterConfig.harvesterVersion || "1.0.0";
  const defaultBaseURL = harvesterConfig.baseURL || "http://localhost:3000";
  const knownSecrets = getAllKnownSecrets();

  let targets = harvesterConfig.targets;
  if (only) {
    targets = targets.filter((t) => t.pageKey.toLowerCase() === only.toLowerCase());
    if (targets.length === 0) {
      console.warn(`[Harvester] Warning: No targets matched --only=${only}`);
    }
  }

  console.log(`[Harvester] Starting harvest for ${targets.length} target(s)...`);
  console.log(`[Harvester] App Build: ${appBuild} | Version: ${harvesterVersion}`);

  const browser = await chromium.launch({ headless: true });
  const results: HarvestResult[] = [];

  try {
    for (const target of targets) {
      const roles = target.roles && target.roles.length > 0 ? target.roles : ["unauthenticated"];
      const variants = target.variants && target.variants.length > 0 ? target.variants : [{ key: "default" }];
      const baseURL = target.baseURL || defaultBaseURL;

      const pageMapVariants: PageMap[] = [];

      for (const roleKey of roles) {
        // Pre-harvest Auth Setup / Freshness validation
        let authInfo = await ensureAuthState(roleKey, baseURL, harvesterConfig.authStorageDir);

        for (const variant of variants) {
          console.log(`[Harvester] Harvesting ${target.pageKey} (role: ${roleKey}, variant: ${variant.key})...`);

          let harvestAttempt = 0;
          let harvestSuccess = false;
          let newPageMap: PageMap | null = null;
          const fileName = `${target.pageKey}.${roleKey}.${variant.key}.json`;
          const filePath = path.join(outputDir, fileName);

          while (harvestAttempt < 2 && !harvestSuccess) {
            harvestAttempt++;
            const context = await browser.newContext({
              baseURL,
              storageState: authInfo.storageStatePath,
              viewport: { width: 1280, height: 800 },
            });
            const page = await context.newPage();

            try {
              let existingPageMap: PageMap | undefined;
              if (fs.existsSync(filePath)) {
                try {
                  const raw = fs.readFileSync(filePath, "utf8");
                  existingPageMap = JSON.parse(raw) as PageMap;
                } catch {
                  // Ignore corrupt previous files
                }
              }

              // Apply state fixture if provided, or navigate to target route
              if (typeof variant.fixture === "function") {
                await variant.fixture({ page, browserContext: context, baseURL });
              } else {
                const targetUrl = target.route.startsWith("http")
                  ? target.route
                  : new URL(target.route, baseURL.endsWith("/") ? baseURL : `${baseURL}/`).toString();
                const resp = await page.goto(targetUrl, {
                  waitUntil: target.settle?.waitFor || "domcontentloaded",
                  timeout: target.settle?.timeoutMs || 30_000,
                });

                // Mid-run auth expiry detection
                if (
                  roleKey !== "unauthenticated" &&
                  (resp?.status() === 401 || (page.url().includes("/login") && !target.route.includes("/login")))
                ) {
                  console.warn(
                    `[Harvester] Mid-run session expiry detected for role '${roleKey}'. Refreshing auth state and retrying...`,
                  );
                  await context.close();
                  authInfo = await setupAuthState(roleKey, baseURL, harvesterConfig.authStorageDir);
                  continue;
                }
              }

              if (target.settle?.extraSelector) {
                await page.locator(target.settle.extraSelector).first().waitFor({ state: "attached", timeout: 10_000 });
              }

              // Apply openers if present
              if (variant.openers) {
                for (const opener of variant.openers) {
                  console.log(`[Harvester] Executing opener: ${opener.description}`);
                  await opener.action(page);
                }
              }

              // Extract Page Map
              newPageMap = await extractPageMap(page, target, variant, roleKey, {
                appBuild,
                harvesterVersion,
                existingPageMap,
                baseURL,
              });

              if (authInfo.stateGeneratedAt) {
                newPageMap.auth.stateGeneratedAt = authInfo.stateGeneratedAt;
              }

              // Check for change / determinism preservation
              let hasChanged = true;
              let isNew = true;

              if (existingPageMap) {
                isNew = false;
                if (existingPageMap.ariaDigest === newPageMap.ariaDigest) {
                  // Digest is identical: preserve capturedAt to ensure byte-level zero git diff
                  newPageMap.capturedAt = existingPageMap.capturedAt;
                  hasChanged = false;
                }
              }

              // Sanitization check with known environment credentials
              assertNoSecrets(newPageMap, knownSecrets);

              // Schema validation check
              validatePageMap(newPageMap);

              pageMapVariants.push(newPageMap);

              if (!dryRun) {
                const formatted = await formatJson(newPageMap, filePath);
                fs.writeFileSync(filePath, formatted, "utf8");
              }

              results.push({
                pageKey: target.pageKey,
                roleKey,
                variantKey: variant.key,
                filePath,
                pageMap: newPageMap,
                isNew,
                hasChanged,
              });

              harvestSuccess = true;
            } finally {
              await context.close();
            }
          }

          if (!harvestSuccess) {
            throw new Error(`Failed to harvest target '${target.pageKey}' for role '${roleKey}' after retry.`);
          }
        }
      }

      // Generate page index across variants
      if (!dryRun && pageMapVariants.length > 0) {
        const indexFilePath = path.join(outputDir, `${target.pageKey}.index.json`);
        const allVariantKeys = variants.map((v) => v.key);
        const allRoles = roles;

        // Find common element keys vs variant-specific
        const elementKeySets = pageMapVariants.map((pm) => new Set(pm.elements.map((e) => e.key)));
        const allUniqueKeys = Array.from(
          new Set(pageMapVariants.flatMap((pm) => pm.elements.map((e) => e.key))),
        ).sort();

        const commonKeys = allUniqueKeys.filter((key) => elementKeySets.every((s) => s.has(key)));
        const variantSpecific: Record<string, string[]> = {};

        for (const pm of pageMapVariants) {
          const vKey = `${pm.auth.roleKey}.${pm.state.variantKey}`;
          variantSpecific[vKey] = pm.elements
            .filter((e) => !commonKeys.includes(e.key))
            .map((e) => e.key)
            .sort();
        }

        const pageIndex: PageMapIndex = {
          pageKey: target.pageKey,
          route: target.route,
          roles: allRoles,
          variants: allVariantKeys,
          commonElementKeys: commonKeys,
          variantSpecificElementKeys: variantSpecific,
          lastUpdated: new Date().toISOString(),
        };

        // If existing index has same common keys and variants, preserve lastUpdated for determinism
        if (fs.existsSync(indexFilePath)) {
          try {
            const oldIndex = JSON.parse(fs.readFileSync(indexFilePath, "utf8")) as PageMapIndex;
            if (
              JSON.stringify(oldIndex.commonElementKeys) === JSON.stringify(pageIndex.commonElementKeys) &&
              JSON.stringify(oldIndex.variantSpecificElementKeys) ===
                JSON.stringify(pageIndex.variantSpecificElementKeys)
            ) {
              pageIndex.lastUpdated = oldIndex.lastUpdated;
            }
          } catch {
            // Ignore
          }
        }

        assertNoSecrets(pageIndex);
        const formattedIndex = await formatJson(pageIndex, indexFilePath);
        fs.writeFileSync(indexFilePath, formattedIndex, "utf8");
      }
    }
  } finally {
    await browser.close();
  }

  console.log(`[Harvester] Completed harvest. ${results.length} map(s) processed.`);
  for (const r of results) {
    const status = r.isNew ? "CREATED" : r.hasChanged ? "UPDATED" : "UNCHANGED";
    console.log(
      `  - [${status}] ${r.pageKey} (${r.roleKey}.${r.variantKey}) -> ${path.basename(r.filePath)} (${r.pageMap.elements.length} elements)`,
    );
  }

  return results;
}

if (process.argv[1] && process.argv[1].endsWith("run.ts")) {
  runHarvester().catch((err) => {
    console.error("[Harvester] Error:", err);
    process.exit(1);
  });
}
