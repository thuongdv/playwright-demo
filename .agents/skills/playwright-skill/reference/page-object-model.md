# Page Object Model Guide

## Why POM

Use page objects to keep selectors and page behavior in one place. Tests should focus on business flows, not selector details.

## Repository Pattern

1. Place page objects under src/pages/<area>/.
2. Use one class per page or major page section.
3. Pass Playwright Page through the constructor.
4. Expose methods that describe user actions and outcomes.
5. Keep assertions in tests unless a page-level verification is reused heavily.

## Class Template

```typescript
import { type Locator, type Page } from "fixtures/base-fixture";

export class ExamplePage {
  readonly title: Locator = this.page.getByRole("heading", { name: "Example" });
  readonly submitButton: Locator = this.page.getByRole("button", { name: "Submit" });

  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto("/example");
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}
```

## Selector Strategy

Prefer this order:

1. getByRole with accessible name
2. getByLabel
3. getByPlaceholder
4. getByText
5. getByTestId

Avoid CSS and XPath unless the UI has no stable semantic locator.

## Method Design

Good methods:

1. Represent user intent: login, addToCart, applyCoupon.
2. Return useful values when needed.
3. Hide low-level click/fill details.

Avoid:

1. Exposing every raw locator publicly.
2. Creating methods that only wrap one trivial line without meaning.
3. Putting unrelated page behaviors into one class.

## Test Usage Pattern

```typescript
import { test, expect } from "fixtures/base-fixture";
import { ExamplePage } from "pages/ta-demo/example.page";

test("user can submit form", async ({ examplePage }) => {
  await examplePage.goto();
  await examplePage.submit();

  await expect(examplePage.status).toHaveText("Submitted");
});
```

## Maintenance Rules

1. If a selector changes, update only the page object.
2. Keep naming consistent with action intent.
3. Remove dead methods when tests no longer use them.
4. Prefer extending existing page objects before creating duplicates.
