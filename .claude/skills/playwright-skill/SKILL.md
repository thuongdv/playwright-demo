---
name: playwright-skill
description: >
  Generates production-grade Playwright automation scripts and E2E tests in TypeScript.
  Use when users ask to write Playwright tests, automate browser flows, run cross-browser
  checks, debug flaky tests, mock APIs, or perform visual regression testing.
---

# Playwright Test Automation

## Core Patterns - TypeScript

### Selector Priority

Use in this order — stop at the first that works:

1. `getByRole('button', { name: 'Submit' })` — accessible, resilient
2. `getByLabel('Email')` — form fields
3. `getByPlaceholder('Enter email')` — when label missing
4. `getByText('Welcome')` — visible text
5. `getByTestId('submit-btn')` — last resort, needs `data-testid`

Never use raw CSS/XPath unless matching a third-party widget with no other option.

### Assertions — Always Web-First

```typescript
// ✅ Auto-retries until timeout
await expect(page.getByRole("heading")).toBeVisible();
await expect(page.getByRole("alert")).toHaveText("Saved");
await expect(page).toHaveURL("/dashboard");

// ❌ No auto-retry — races with DOM
const text = await page.textContent(".msg");
expect(text).toBe("Saved");
```

### Anti-Patterns

| ❌ Don't                       | ✅ Do                                               | Why                       |
| ------------------------------ | --------------------------------------------------- | ------------------------- |
| `page.waitForTimeout(3000)`    | `await expect(locator).toBeVisible()`               | Hard waits are flaky      |
| `expect(await el.isVisible())` | `await expect(el).toBeVisible()`                    | No auto-retry             |
| `page.$('.btn')`               | `page.getByRole('button')`                          | Fragile selector          |
| `page.click('.submit')`        | `page.getByRole('button', {name:'Submit'}).click()` | Not accessible            |
| Shared state between tests     | `test.beforeEach` for setup                         | Tests must be independent |
| `try/catch` around assertions  | Let Playwright handle retries                       | Swallows real failures    |

### Page Object Model

Always use page object model. Full patterns with base page, fixtures, and examples in [reference/page-object-model.md](reference/page-object-model.md).

---

## Validation Workflow

After generating any test:

```
1. If errors → fix → re-validate
2. Run locally:      npx playwright test --project=chromium
3. If failures → check reference/debugging-flaky.md
```

---

## Quick Reference

### Common Commands

```bash
npx playwright test                          # Run all tests
npx playwright test --ui                     # Interactive UI mode
npx playwright test --debug                  # Step-through debugger
npx playwright test --project=chromium       # Single browser
npx playwright test tests/login.spec.ts      # Single file
npx playwright show-report                   # Open HTML report
npx playwright codegen https://example.com   # Record test
npx playwright test --update-snapshots       # Update visual baselines
```

### Auth State Reuse

```typescript
// Save auth state once in global setup
await page.context().storageState({ path: "auth.json" });

// Reuse in config
use: {
  storageState: "auth.json";
}
```

### Visual Regression (Built-in)

```typescript
await expect(page).toHaveScreenshot("homepage.png", {
  maxDiffPixelRatio: 0.01,
  animations: "disabled",
  mask: [page.locator(".dynamic-date")],
});
```

### Network Mocking

```typescript
await page.route("**/api/users", (route) => route.fulfill({ json: [{ id: 1, name: "Mock User" }] }));
```

Full mocking patterns in [reference/api-mocking-visual.md](reference/api-mocking-visual.md).

### Test Steps for Readability

```typescript
test("Verify orders appear in order history - grab order history information", async ({ page }) => {
  const myAccountPage = new MyAccountPage(page);

  // 1. Go to My Account page
  await myAccountPage.goto();

  // 2. Click on Orders in left navigation
  await myAccountPage.clickOrderButton();

  // 3. Verify order details
  for (const expOrderDetail of orderDetails) {
    const orderHistory: OrderHistory = await myAccountPage.getOrderHistory(expOrderDetail.orderNumber);
    // Verify that the order history details are correct
    expect.soft(orderHistory.date).toMatch(new RegExp(`^${expOrderDetail.orderDate}$`, "i"));
    expect.soft(orderHistory.status).toMatch(/^On hold$/i);
    expect.soft(orderHistory.total).toContain(expOrderDetail.total);
  }
});
```

---

## Reference Files

| File                                                               | When to read                                         |
| ------------------------------------------------------------------ | ---------------------------------------------------- |
| [reference/page-object-model.md](reference/page-object-model.md)   | POM architecture, base page, fixtures, full examples |
| [reference/debugging-flaky.md](reference/debugging-flaky.md)       | Flaky test checklist, common fixes                   |
| [reference/api-mocking-visual.md](reference/api-mocking-visual.md) | API mocking + visual regression patterns             |
