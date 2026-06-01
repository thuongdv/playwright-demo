# Web-First Assertions — Playwright

This guide covers writing reliable, web-first assertions in Playwright, ensuring tests wait dynamically for conditions to be met instead of using static waits.

## Web-First Assertions (Auto-Retry)

Always use asynchronous, web-first assertions. These assertions auto-retry until they pass or a timeout is reached. This is critical for modern web apps with dynamic, asynchronous DOM updates.

```typescript
// ✅ Recommended: Auto-retries until timeout
await expect(page.getByRole("heading")).toBeVisible();
await expect(page.getByRole("alert")).toHaveText("Saved");
await expect(page).toHaveURL("/dashboard");
```

Avoid synchronous, non-retrying assertions for DOM state. They do not wait and will cause race conditions and flaky tests:

```typescript
// ❌ Avoid: No auto-retry — will fail if elements aren't instantly ready
const text = await page.textContent(".msg");
expect(text).toBe("Saved");
```

---

## Soft Assertions

Use soft assertions when a failure shouldn't immediately terminate the test run. This is extremely useful for checking multiple non-blocking items, such as rows in a list or minor details in a layout.

When a soft assertion fails, Playwright compiles the error but continues running the rest of the test steps. The test will still fail at the end.

```typescript
// Example: Checking properties of list items soft-asserting each without blocking the loop
for (const expOrderDetail of orderDetails) {
  const orderHistory = await myAccountPage.getOrderHistory(expOrderDetail.orderNumber);

  expect.soft(orderHistory.date).toMatch(new RegExp(`^${expOrderDetail.orderDate}$`, "i"));
  expect.soft(orderHistory.status).toMatch(/^On hold$/i);
  expect.soft(orderHistory.total).toContain(expOrderDetail.total);
}
```

---

## Common Assertion Matchers

Here are the most common web-first assertions you should use:

| Matcher                                     | Description                             |
| :------------------------------------------ | :-------------------------------------- |
| `await expect(locator).toBeVisible()`       | Element is visible on screen            |
| `await expect(locator).toBeHidden()`        | Element is not visible or not in DOM    |
| `await expect(locator).toBeEnabled()`       | Form control is enabled                 |
| `await expect(locator).toBeDisabled()`      | Form control is disabled                |
| `await expect(locator).toHaveText(text)`    | Element matches exact or substring text |
| `await expect(locator).toContainText(text)` | Element contains text                   |
| `await expect(locator).toHaveValue(value)`  | Input field has value                   |
| `await expect(locator).toBeChecked()`       | Checkbox or radio button is checked     |
| `await expect(page).toHaveURL(url)`         | Page URL matches value                  |
| `await expect(page).toHaveTitle(title)`     | Page title matches value                |
