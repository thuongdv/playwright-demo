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
   ```bash
   npm run tsc && npm run lint:fix && npm run format:fix
   ```
2. **Execute Locally**: Validate correctness using the specific test runner command:
   ```bash
   npx playwright test --project=chromium
   ```
3. **Handle Failures**: If tests fail, refer to [reference/debugging-flaky.md](reference/debugging-flaky.md) for a troubleshooting checklist.
4. **Stuck Protocol**: If any sub-task (locator, action, assertion, navigation) cannot be resolved after **2–3 attempts**, stop retrying and emit a structured summary. See [reference/stuck-protocol.md](reference/stuck-protocol.md). Record persistent blockers in [.agents/knowledge/blockers.md](../../knowledge/blockers.md).

---

## Skill Guides & Reference Directory

The instructions for this skill are modularized into highly focused sub-guides. Refer to the specific file that matches your current task:

| Reference Guide                                                     | Description & When to Read                                                                                                                                                                                 |
| :------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[Element Locators](reference/locator.md)**                        | Selector priorities, accessibility roles, getByRole/getByLabel, and custom IDs. _Read when locating page elements._                                                                                        |
| **[DOM Inspection](reference/dom-inspection.md)**                   | Programmatic DOM evaluation, token-efficient element discovery, validation debugging, and widget sync. _Read when discovering locators or debugging forms._                                                |
| **[Web-First Assertions](reference/assertion.md)**                  | Auto-retry assertions, non-retrying anti-patterns, soft assertions, and assertion tables. _Read when writing checks._                                                                                      |
| **[Test Organization](reference/test-organization.md)**             | Anti-patterns table, test isolation, setup blocks, and readable test steps. _Read when designing test suites._                                                                                             |
| **[Page Object Model (POM)](reference/page-object-model.md)**       | POM patterns, base pages, class templates, and maintenance rules. _Read when creating or refactoring POM._                                                                                                 |
| **[CLI & Commands Reference](reference/cli-commands.md)**           | CLI flags, UI mode, Playwright Inspector, Trace viewer, and video recordings. _Read when running/debugging tests._                                                                                         |
| **[Auth State Reuse](reference/auth-state.md)**                     | Login state setups, caching, and reusing `storageState`. _Read when handling user sessions._                                                                                                               |
| **[API Mocking & Visual Testing](reference/api-mocking-visual.md)** | Mocking endpoints, custom responses, blocking resources, GraphQL mocking, and visual regression. _Read when mocking APIs or doing visual testing._                                                         |
| **[Debugging & Flakiness](reference/debugging-flaky.md)**           | Flaky test checklist, dialog race conditions, navigation races, and network-dependent assertions. _Read when debugging failed/unstable tests._                                                             |
| **[Stuck Protocol](reference/stuck-protocol.md)**                   | What to do after 2–3 failed attempts: structured summary format, escalation rules, and how to record blockers for git tracking. _Read when blocked on a locator, action, assertion, or compilation error._ |
