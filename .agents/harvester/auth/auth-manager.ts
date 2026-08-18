import { Browser, chromium } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { getRoleCredentials } from "./env";

export interface AuthStateInfo {
  storageStatePath?: string;
  stateGeneratedAt?: string;
}

interface AuthMeta {
  roleKey: string;
  generatedAt: string;
}

const DEFAULT_AUTH_DIR = path.resolve(process.cwd(), ".auth");

function getStorageStatePath(roleKey: string, authDir = DEFAULT_AUTH_DIR): string {
  return path.join(authDir, `${roleKey}.json`);
}

function getMetaPath(roleKey: string, authDir = DEFAULT_AUTH_DIR): string {
  return path.join(authDir, `${roleKey}.meta.json`);
}

function resolveUrl(route: string, baseURL: string): string {
  const base = baseURL.endsWith("/") ? baseURL : `${baseURL}/`;
  let cleaned = route;
  if (base.includes("/en-US/") && cleaned.startsWith("/en-US/")) {
    cleaned = cleaned.replace(/^\/en-US\//, "");
  }
  return new URL(cleaned.replace(/^\//, ""), base).toString();
}

/**
 * Validates whether an existing storageState file has an active, valid session.
 */
export async function validateAuthState(
  roleKey: string,
  baseURL: string,
  authDir = DEFAULT_AUTH_DIR,
): Promise<{ isValid: boolean; generatedAt?: string }> {
  const statePath = getStorageStatePath(roleKey, authDir);
  const metaPath = getMetaPath(roleKey, authDir);

  if (!fs.existsSync(statePath)) {
    return { isValid: false };
  }

  let generatedAt: string | undefined;
  if (fs.existsSync(metaPath)) {
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf8")) as AuthMeta;
      generatedAt = meta.generatedAt;
    } catch {
      // Ignore
    }
  }

  let browser: Browser | null = null;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      storageState: statePath,
      baseURL,
    });
    const page = await context.newPage();

    if (roleKey === "standardUser") {
      const resp = await page.goto(resolveUrl("/my-account/", baseURL), {
        waitUntil: "domcontentloaded",
        timeout: 15_000,
      });
      if (!resp || resp.status() >= 400) {
        await context.close();
        return { isValid: false };
      }

      // Check if logged in (Logout link is present, or login form is absent)
      const logoutLink = page.getByRole("link", { name: "Logout" });
      const isLogged = await logoutLink.isVisible({ timeout: 5000 }).catch(() => false);
      await context.close();
      return { isValid: isLogged, generatedAt };
    }

    if (roleKey === "hotelUser") {
      const resp = await page.goto(resolveUrl("/en-US/mypage.html", baseURL), {
        waitUntil: "domcontentloaded",
        timeout: 15_000,
      });
      if (!resp || resp.status() >= 400 || page.url().includes("login.html")) {
        await context.close();
        return { isValid: false };
      }
      const isLogged = await page
        .locator("#logout-form, button:has-text('Logout')")
        .first()
        .isVisible({ timeout: 5000 })
        .catch(() => false);
      await context.close();
      return { isValid: isLogged, generatedAt };
    }

    await context.close();
    return { isValid: true, generatedAt };
  } catch {
    return { isValid: false };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Performs login once and writes the storage state to .auth/<roleKey>.json
 */
export async function setupAuthState(
  roleKey: string,
  baseURL: string,
  authDir = DEFAULT_AUTH_DIR,
): Promise<AuthStateInfo> {
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const credentials = getRoleCredentials(roleKey);
  const statePath = getStorageStatePath(roleKey, authDir);
  const metaPath = getMetaPath(roleKey, authDir);

  console.log(`[AuthManager] Authenticating role '${roleKey}' against ${baseURL}...`);

  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ baseURL });
    const page = await context.newPage();

    if (roleKey === "standardUser") {
      await page.goto(resolveUrl("/my-account/", baseURL), { waitUntil: "domcontentloaded" });

      const usernameInput = page.getByLabel("Username or email address *");
      const passwordInput = page.getByLabel("Password *");
      const loginButton = page.getByRole("button", { name: "Log in" });

      await usernameInput.fill(credentials.email);
      if (credentials.password) {
        await passwordInput.fill(credentials.password);
      }
      await loginButton.click();

      // Wait for navigation or Logout link
      const logoutLink = page.getByRole("link", { name: "Logout" });
      await logoutLink.waitFor({ state: "visible", timeout: 15_000 });
    } else if (roleKey === "hotelUser") {
      await page.goto(resolveUrl("/en-US/login.html", baseURL), { waitUntil: "domcontentloaded" });
      await page.locator("#email").fill(credentials.email);
      if (credentials.password) {
        await page.locator("#password").fill(credentials.password);
      }
      await page.locator("#login-button").click();
      await page.waitForURL("**/mypage.html", { timeout: 15_000 });
    } else {
      throw new Error(`Unsupported role for setupAuthState: '${roleKey}'`);
    }

    const generatedAt = new Date().toISOString();

    // Export storage state to local .auth/ file
    await context.storageState({ path: statePath });

    // Save metadata
    const meta: AuthMeta = { roleKey, generatedAt };
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n", "utf8");

    console.log(`[AuthManager] Saved storage state for '${roleKey}' to ${statePath}`);
    return { storageStatePath: statePath, stateGeneratedAt: generatedAt };
  } finally {
    await browser.close();
  }
}

/**
 * Ensures a valid storageState exists for a roleKey. Refreshes if missing or expired.
 */
export async function ensureAuthState(
  roleKey: string,
  baseURL: string,
  authDir = DEFAULT_AUTH_DIR,
): Promise<AuthStateInfo> {
  if (roleKey === "unauthenticated" || roleKey === "anonymous") {
    return { storageStatePath: undefined };
  }

  const { isValid, generatedAt } = await validateAuthState(roleKey, baseURL, authDir);
  if (isValid && generatedAt) {
    console.log(`[AuthManager] Storage state for '${roleKey}' is valid (generated: ${generatedAt}).`);
    return {
      storageStatePath: getStorageStatePath(roleKey, authDir),
      stateGeneratedAt: generatedAt,
    };
  }

  console.log(`[AuthManager] Storage state for '${roleKey}' is missing or expired. Refreshing...`);
  return await setupAuthState(roleKey, baseURL, authDir);
}

/**
 * Corrupts or deletes storage state for testing recovery.
 */
export function invalidateAuthState(roleKey: string, authDir = DEFAULT_AUTH_DIR): void {
  const statePath = getStorageStatePath(roleKey, authDir);
  const metaPath = getMetaPath(roleKey, authDir);
  if (fs.existsSync(statePath)) fs.unlinkSync(statePath);
  if (fs.existsSync(metaPath)) fs.unlinkSync(metaPath);
}
