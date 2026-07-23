# Playwright CLI Reference (`playwright-cli`)

This guide provides a comprehensive list of `npx playwright-cli` commands for interacting with, inspecting, and automating the Application Under Test (AUT).

`playwright-cli` ([microsoft/playwright-cli](https://github.com/microsoft/playwright-cli)) is a command-line interface designed for token-efficient browser automation and interactive debugging without needing to load large tool schemas.

---

## 1. Element Targeting Strategies

Commands in `playwright-cli` support targeting DOM elements using snapshot references, CSS selectors, or Playwright locator expressions:

### A. Snapshot Reference IDs (Recommended)

After taking a page snapshot with `npx playwright-cli snapshot`, elements are assigned lightweight reference IDs (e.g. `e1`, `e15`):

```bash
npx playwright-cli snapshot
npx playwright-cli click e15
```

### B. CSS Selectors

Target elements directly via standard CSS selectors:

```bash
npx playwright-cli click "#main > button.submit"
```

### C. Playwright Locators

Target elements using Playwright role or test ID locator syntax:

```bash
# Role locator
npx playwright-cli click "getByRole('button', { name: 'Submit' })"

# Test ID locator
npx playwright-cli click "getByTestId('submit-button')"
```

---

## 2. Categorized Command Reference

### Browser & Session Lifecycle

Manage the browser instance and page navigation:

| Command                             | Description                                                          |
| :---------------------------------- | :------------------------------------------------------------------- |
| `npx playwright-cli open [url]`     | Launch browser session, optionally navigating directly to target URL |
| `npx playwright-cli goto <url>`     | Navigate active session page to specified URL                        |
| `npx playwright-cli resize <w> <h>` | Resize browser viewport (width x height in pixels)                   |
| `npx playwright-cli close`          | Close the active browser session                                     |

### DOM Inspection & Snapshots

Capture element hierarchies, locate specific text, and inspect element references:

| Command                                      | Description                                                                |
| :------------------------------------------- | :------------------------------------------------------------------------- |
| `npx playwright-cli snapshot`                | Capture current page DOM snapshot and generate element reference IDs       |
| `npx playwright-cli snapshot --filename=<f>` | Save page snapshot output to a specific file                               |
| `npx playwright-cli snapshot <ref>`          | Capture snapshot scoped specifically to a target element                   |
| `npx playwright-cli snapshot --depth=<N>`    | Limit snapshot tree depth for maximum performance and token efficiency     |
| `npx playwright-cli find <text>`             | Search snapshot for literal text matches and return matching element nodes |
| `npx playwright-cli find --regex <pattern>`  | Search snapshot tree using a regular expression pattern                    |

### Element Interactions

Interact with input elements, buttons, checkboxes, dropdowns, and file uploads:

| Command                                         | Description                                                                    |
| :---------------------------------------------- | :----------------------------------------------------------------------------- |
| `npx playwright-cli fill <ref> <text>`          | Clear and fill text into an editable element                                   |
| `npx playwright-cli fill <ref> <text> --submit` | Fill text into element and immediately press `Enter` to submit                 |
| `npx playwright-cli type <text>`                | Type raw text keystrokes into currently focused element                        |
| `npx playwright-cli click <ref> [button]`       | Perform a click on target element (optional button: `left`, `right`, `middle`) |
| `npx playwright-cli dblclick <ref> [button]`    | Perform a double click on target element                                       |
| `npx playwright-cli check <ref>`                | Check a checkbox or radio button                                               |
| `npx playwright-cli uncheck <ref>`              | Uncheck a checkbox element                                                     |
| `npx playwright-cli select <ref> <val>`         | Select an option in a `<select>` dropdown menu by value                        |
| `npx playwright-cli hover <ref>`                | Hover cursor over target element                                               |
| `npx playwright-cli drag <startRef> <endRef>`   | Perform drag-and-drop from source element to destination element               |
| `npx playwright-cli drop <ref> --path=<file>`   | Drop external file onto a drop zone element                                    |
| `npx playwright-cli drop <ref> --data="k=v"`    | Drop custom data payload onto an element                                       |
| `npx playwright-cli upload <file>`              | Upload single or multiple files to active file input                           |

### JS Evaluation & Dialog Handling

Execute custom JavaScript snippet or handle browser alert/confirm/prompt dialogs:

| Command                                     | Description                                                              |
| :------------------------------------------ | :----------------------------------------------------------------------- |
| `npx playwright-cli eval <func> [ref]`      | Evaluate JavaScript expression on active page or specific target element |
| `npx playwright-cli dialog-accept [prompt]` | Accept an active browser modal dialog with optional prompt text response |
| `npx playwright-cli dialog-dismiss`         | Dismiss an active browser modal dialog                                   |

---

## 3. Step-by-Step AUT Interaction Workflow Example

Below is a complete end-to-end example demonstrating how to use `playwright-cli` to inspect and interact with an AUT (Application Under Test):

```bash
# 1. Open the AUT URL in browser
npx playwright-cli open https://example.com/login

# 2. Capture snapshot to identify element references (e1 = email field, e2 = password field, e3 = submit button)
npx playwright-cli snapshot

# 3. Fill in user credentials
npx playwright-cli fill e1 "user@example.com"
npx playwright-cli fill e2 "SecretPassword123"

# 4. Click login submit button
npx playwright-cli click e3

# 5. Take post-login snapshot to inspect updated DOM and verify navigation
npx playwright-cli snapshot

# 6. Find welcome message element
npx playwright-cli find "Welcome back"

# 7. Close browser session upon completion
npx playwright-cli close
```
