# Authentication State Reuse — Playwright

This guide details best practices for authenticating once and reusing that session/cookies state across multiple tests, dramatically reducing test execution times.

## Setup Authentication Storage State

Rather than having every test run a login flow, you can log in once in a setup step, export the cookie/session storage state to a local file, and then load that state when creating new browser contexts.

### 1. Perform Login & Save State

Use `page.context().storageState({ path: '...' })` to export all cookies, localStorage, and sessionStorage values.

```typescript
import { test as setup, expect } from '@playwright/test';

setup('authenticate user and save storage state', async ({ page }) => {
  // 1. Navigate to login page
  await page.goto('/login');

  // 2. Perform authentication flow
  await page.getByLabel('Username').fill('testuser');
  await page.getByLabel('Password').fill('securepassword');
  await page.getByRole('button', { name: 'Log in' }).click();

  // 3. Confirm login succeeded (web-first assertion)
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  // 4. Save authentication state to a file
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});
```

---

## Reuse Storage State

### Option A: Configure Globally (Config File)

If almost all tests in your suite require authentication, specify the `storageState` path globally in the config file.

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    // Path to the saved authentication state
    storageState: 'playwright/.auth/user.json',
  },
});
```

### Option B: Reuse per Test File or Test Group

If only specific tests require authentication, you can pass `storageState` as an option to individual `test.use()` blocks.

```typescript
import { test, expect } from '@playwright/test';

// Instruct all tests in this file to reuse the saved auth state
test.use({ storageState: 'playwright/.auth/user.json' });

test('view secure dashboard', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
```
