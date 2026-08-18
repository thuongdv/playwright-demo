import { BrowserContext, Page } from "@playwright/test";
import { PageMap } from "../page-map/schema";

export interface SettleConfig {
  waitFor?: "load" | "domcontentloaded" | "networkidle";
  timeoutMs?: number;
  extraSelector?: string;
}

export type FixtureHandler = (context: {
  page: Page;
  browserContext: BrowserContext;
  baseURL?: string;
}) => Promise<void>;

export interface VariantConfig {
  key: string;
  fixture?: string | FixtureHandler;
  openers?: Array<{
    description: string;
    action: (page: Page) => Promise<void>;
  }>;
}

export interface Target {
  pageKey: string;
  route: string;
  rootSelector?: string;
  depth?: number;
  roles?: string[];
  variants?: VariantConfig[];
  settle?: SettleConfig;
  baseURL?: string;
}

export interface HarvesterConfig {
  baseURL?: string;
  appBuild?: string;
  harvesterVersion?: string;
  outputDir?: string;
  authStorageDir?: string;
  targets: Target[];
}

export interface HarvesterOptions {
  configPath: string;
  only?: string;
  dryRun?: boolean;
}

export interface HarvestResult {
  pageKey: string;
  roleKey: string;
  variantKey: string;
  filePath: string;
  pageMap: PageMap;
  isNew: boolean;
  hasChanged: boolean;
}
