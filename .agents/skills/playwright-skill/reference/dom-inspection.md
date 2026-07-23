# Programmatic DOM Inspection & Token-Efficient Discovery — Playwright

This guide describes how to perform programmatic DOM inspection during test design to discover robust locators, verify form contracts, and debug runtime failures while minimizing token consumption.

---

## Why Programmatic DOM Evaluation?

When building Playwright automation tests, agents must discover target locators, form requirements, and widget behaviors.

- **Full DOM/Snapshot Dumping**: Passing entire HTML bodies, full accessibility trees, or image frames into LLM context window burns thousands of tokens per turn and causes context window bloat.
- **Programmatic Extraction**: Executing micro `page.evaluate()` scripts in the test runner extracts only target element metadata (`id`, `name`, `type`, `role`, `required`, `validationMessage`). This achieves **~90–95% token savings** while providing 100% precise technical contracts.

---

## Discovery Snippets

### 1. Extract Form Controls & Attributes

Use this evaluation to inspect inputs, selects, textareas, and buttons on a page:

```typescript
const formInputs = await page.evaluate(() => {
  return Array.from(document.querySelectorAll("input, select, textarea, button")).map((el) => ({
    id: el.id,
    name: el.getAttribute("name"),
    type: el.getAttribute("type"),
    tagName: el.tagName,
    required: (el as HTMLInputElement).required,
    value: (el as HTMLInputElement).value,
  }));
});
```

### 2. Discover ARIA Roles & Link Targets

Inspect interactive elements to identify explicit ARIA roles (e.g., `<a role="button">`) or link navigation targets (`target="_blank"`):

```typescript
const interactiveElements = await page.evaluate(() => {
  return Array.from(document.querySelectorAll("a, button")).map((el) => ({
    text: el.textContent?.trim(),
    role: el.getAttribute("role"),
    href: el.getAttribute("href"),
    target: el.getAttribute("target"),
  }));
});
```

### 3. Inspect Form Validation Errors

When form submission does not trigger expected navigation, extract invalid elements and HTML5 validation messages:

```typescript
const invalidFields = await page.evaluate(() => {
  return Array.from(document.querySelectorAll(".is-invalid, :invalid")).map((el) => ({
    id: el.id,
    name: el.getAttribute("name"),
    validationMessage: (el as HTMLInputElement).validationMessage,
  }));
});
```

---

## Best Practices & Integration Patterns

### 1. Synchronizing Third-Party Widgets (e.g. jQuery UI Datepicker)

When interacting with complex JavaScript datepickers or custom dropdowns:

- Standard `.fill()` might be cleared on `blur` if the text format doesn't match the widget's internal date format parser.
- Combine Playwright `.fill()` with programmatic widget state updates when necessary:

```typescript
await page.locator("#date").fill(dateStr);
await page.evaluate((d) => {
  const $ = (window as any).$;
  if ($ && $("#date").data("datepicker")) {
    $("#date").datepicker("setDate", d);
  }
}, dateStr);
```

### 2. Multi-Tab & Popup Navigation (`target="_blank"`)

When clicking links or buttons with `target="_blank"` that open a new tab:

```typescript
const pagePromise = context.waitForEvent("page");
await page.locator(".card").filter({ hasText: planName }).getByRole("link", { name: "Reserve room" }).click();

const newTab = await pagePromise;
await newTab.waitForLoadState("domcontentloaded");
```

### 3. Form Submit Navigation (`Promise.all`)

Avoid navigation race conditions on standard form submissions by wrapping `waitForURL` and `.click()` in `Promise.all`:

```typescript
await Promise.all([page.waitForURL("**/confirm.html"), submitButton.click()]);
```
