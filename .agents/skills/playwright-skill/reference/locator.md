# Element Locators — Playwright

This guide outlines selector strategies, priority, and best practices for locating elements in Playwright.

## Selector Priority

Use locators in the following order of preference. Stop at the first locator that works and uniquely identifies the element:

### 1. `page.getByRole(role, options)`

Always prefer locating by accessible role. This ensures tests are resilient to layout changes and verify the accessibility (a11y) of the page.

```typescript
await page.getByRole("button", { name: "Submit" }).click();
```

### 2. `page.getByLabel(label)`

Use for input fields that have an associated `<label>` element.

```typescript
await page.getByLabel("Email").fill("user@example.com");
```

### 3. `page.getByPlaceholder(placeholder)`

Use when a field does not have a visible label but contains descriptive placeholder text.

```typescript
await page.getByPlaceholder("Enter email").fill("user@example.com");
```

### 4. `page.getByText(text)`

Use to find non-interactive elements (like paragraphs, divs, spans) that contain static, unique text.

```typescript
await expect(page.getByText("Welcome back!")).toBeVisible();
```

### 5. `page.getByTestId(testId)`

Use as a last resort when the element does not have semantic value (e.g., standard text/label/role) and needs a stable test locator. Requires adding `data-testid` to the HTML elements.

```typescript
await page.getByTestId("submit-btn").click();
```

---

## Raw CSS & XPath Selectors

> [!WARNING]
> Never use raw CSS or XPath selectors (e.g., `page.locator('.submit-btn')` or `page.locator('//button')`) unless you are matching a third-party widget with no accessible attributes or stable semantic locators. Raw selectors are fragile and break easily when styling or structure changes.
