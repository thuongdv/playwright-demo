# Test Organization & Design Patterns — Playwright

This guide covers best practices for organizing, structuring, and maintaining a high-quality Playwright test suite.

## Anti-Patterns

Avoid these common pitfalls to prevent flakiness and maintainable codebases:

| ❌ Don't                       | ✅ Do                                                  | Why                                                           |
| :----------------------------- | :----------------------------------------------------- | :------------------------------------------------------------ |
| `page.waitForTimeout(3000)`    | `await expect(locator).toBeVisible()`                  | Hard waits are extremely flaky and slow down test runs.       |
| `expect(await el.isVisible())` | `await expect(el).toBeVisible()`                       | Synchronous assertions do not auto-retry.                     |
| `page.$('.btn')`               | `page.getByRole('button')`                             | Raw selectors are fragile; use semantic, accessible locators. |
| `page.click('.submit')`        | `page.getByRole('button', { name: 'Submit' }).click()` | Clicking raw classes ignores accessibility and element roles. |
| Shared state between tests     | Keep tests fully independent                           | Independent tests can run in parallel without side effects.   |
| `try/catch` around assertions  | Let Playwright handle assertion failures               | Wrapping assertions in try/catch blocks swallows failures.    |

---

## Test Independence & Setup

Tests should be fully isolated and independent so they can be run in parallel in any order.

Use `test.beforeEach` to prepare state or perform setup actions (like navigating to a base URL or logging in) rather than sharing global state variables between test blocks.

```typescript
import { test, expect } from "fixtures/base-fixture";

test.describe("Shopping Cart", () => {
  // Setup runs independently before each test block
  test.beforeEach(async ({ page }) => {
    await page.goto("/store");
  });

  test("should allow adding item to cart", async ({ page }) => {
    // Test logic...
  });

  test("should display cart total", async ({ page }) => {
    // Test logic...
  });
});
```

---

## Test Steps for Readability

For complex user journeys, organize the test into clear logical blocks using sequential step descriptions. This creates excellent logging in the Playwright HTML report and helps developers easily trace failures.

```typescript
test("Verify orders appear in order history - grab order history information", async ({ myAccountPage }) => {
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
