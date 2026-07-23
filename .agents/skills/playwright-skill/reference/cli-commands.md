# Playwright CLI & Commands Reference

This guide provides a comprehensive list of Playwright CLI commands and debugging options to run, inspect, and troubleshoot tests.

## Common CLI Commands

Run these commands from the root directory of your Playwright project:

```bash
npx playwright test                          # Run all tests in headless mode
npx playwright test --ui                     # Open interactive UI mode (highly recommended)
npx playwright test --debug                  # Run tests with step-through debugger / inspector
npx playwright test --project=chromium       # Run tests only on Chromium browser
npx playwright test tests/login.spec.ts      # Run a specific test file
npx playwright show-report                   # Open the HTML test report
npx playwright codegen https://example.com   # Open code generator to record browser actions
npx playwright test --update-snapshots       # Re-generate and update visual baseline screenshots
```

---

## Debugging Tools & Options

Use these built-in Playwright tools to diagnose and solve test failures.

### 1. Interactive UI Mode

UI Mode provides an outstanding interactive developer experience. You can see DOM snapshots, console logs, network requests, and step back and forth through every test action.

```bash
npx playwright test --ui
```

### 2. Playwright Inspector (Debug Mode)

Step through each line of your test execution interactively. Playwright will open a browser window alongside the Inspector window.

```bash
npx playwright test --debug
```

_Tip: You can add `await page.pause()` anywhere in your test code to automatically pause execution and open the Inspector at that line._

### 3. Trace Viewer (Post-Mortem Debugging)

Traces record video, screencasts, network activity, and DOM snapshots during execution. They are perfect for debugging flaky tests in CI environments.

Configure trace collection in `playwright.config.ts`:

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    // Collect trace when retrying a failed test
    trace: "on-first-retry",
  },
});
```

View the trace file locally:

```bash
npx playwright show-trace path/to/trace.zip
```

### 4. Video Recording

Capture video records of test execution, especially useful to visual-verify failures.

Configure video recording in `playwright.config.ts`:

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    // Record video for failed tests on the first retry
    video: "on-first-retry",
  },
});
```
