---
name: playwright-skill
description: >
  Generates production-grade Playwright automation scripts and E2E tests in TypeScript.
  Use when users ask to write Playwright tests, automate browser flows, run cross-browser
  checks, debug flaky tests, mock APIs, or perform visual regression testing.
---

# Playwright Test Automation

This skill provides comprehensive patterns, workflows, and tools for writing production-grade Playwright E2E tests in TypeScript.

## Validation Workflow

After generating or modifying any test, follow this workflow:

1. **Verify & Fix**: Resolve any compiler or syntax errors immediately.
2. **Execute Locally**: Validate correctness using the specific test runner command:
   ```bash
   npx playwright test --project=chromium
   ```
3. **Handle Failures**: If tests fail, refer to [reference/debugging-flaky.md](reference/debugging-flaky.md) for a troubleshooting checklist.

---

## Skill Guides & Reference Directory

The instructions for this skill are modularized into highly focused sub-guides. Refer to the specific file that matches your current task:

| Reference Guide | Description & When to Read |
| :--- | :--- |
| **[Element Locators](reference/locator.md)** | Selector priorities, accessibility roles, getByRole/getByLabel, and custom IDs. *Read when locating page elements.* |
| **[Web-First Assertions](reference/assertion.md)** | Auto-retry assertions, non-retrying anti-patterns, soft assertions, and assertion tables. *Read when writing checks.* |
| **[Test Organization](reference/test-organization.md)** | Anti-patterns table, test isolation, setup blocks, and readable test steps. *Read when designing test suites.* |
| **[Page Object Model (POM)](reference/page-object-model.md)** | POM patterns, base pages, class templates, and maintenance rules. *Read when creating or refactoring POM.* |
| **[CLI & Commands Reference](reference/cli-commands.md)** | CLI flags, UI mode, Playwright Inspector, Trace viewer, and video recordings. *Read when running/debugging tests.* |
| **[Auth State Reuse](reference/auth-state.md)** | Login state setups, caching, and reusing `storageState`. *Read when handling user sessions.* |
| **[API Mocking & Visual Testing](reference/api-mocking-visual.md)** | Mocking endpoints, custom responses, blocking resources, GraphQL mocking, and visual regression. *Read when mocking APIs or doing visual testing.* |
| **[Debugging & Flakiness](reference/debugging-flaky.md)** | Flaky test checklist, dialog race conditions, navigation races, and network-dependent assertions. *Read when debugging failed/unstable tests.* |
