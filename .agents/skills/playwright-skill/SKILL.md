---
name: playwright-skill
description: >
  Generates production-grade Playwright automation scripts, E2E tests, and Page Object Models in TypeScript.
  Follows a deterministic two-stage pipeline: page-harvester for DOM discovery/codegen and test-author for browser-free test creation.
---

# Playwright Test Automation Architecture

This repository uses a **two-stage, deterministic pipeline** for Playwright test automation:

```text
               Stage 1: Harvester (No LLM, Plain Playwright)
  AUT Deploy ──────────────────────────────────────────────────► .agents/page-map/*.json
                                                                        │
                                                                        ▼
                                                             npm run codegen:pom
                                                                        │
                                                                        ▼
                                                             src/pages/*/generated/*.ts
                                                                        │
               Stage 2: Test Authoring (Browser-Free)                   │
  tests-md/*.md ───────────────────────────────────────────────► src/tests/ui/*.spec.ts
```

---

## 🧭 Core Skills Overview

| Skill                | Purpose                                                                                                              | Execution Mode                         | Guide                                                 |
| :------------------- | :------------------------------------------------------------------------------------------------------------------- | :------------------------------------- | :---------------------------------------------------- |
| **`page-harvester`** | Discovers DOM elements, extracts accessibility trees, handles multi-role auth, and generates POM classes.            | Maintenance (Deterministic Playwright) | [page-harvester/SKILL.md](../page-harvester/SKILL.md) |
| **`test-author`**    | Reads markdown specs from `tests-md/` and writes `.spec.ts` tests using Page Maps & POMs without launching browsers. | Authoring (**Browser-Free**)           | [test-author/SKILL.md](../test-author/SKILL.md)       |

---

## 🌾 Stage 1: Page Map Harvesting & POM Codegen

1. **Harvest Application Routes**:

   ```bash
   npm run harvest
   ```

   Extracts canonical elements into `.agents/page-map/<PageKey>.<role>.<variant>.json` and `.agents/page-map/<PageKey>.index.json`.

2. **Generate Typed Page Objects**:
   ```bash
   npm run codegen:pom
   ```
   Emits TypeScript POM classes into `src/pages/<area>/generated/<PageKey>.generated.ts`.

---

## ✍️ Stage 2: Browser-Free Test Authoring

When asked to author or update tests:

1. Read the markdown test spec in `tests-md/` (e.g. `tests-md/RESERVE_010.md`).
2. Read `.agents/page-map/<PageKey>.index.json` to find element keys and role variants.
3. Consult the specific `<PageKey>.<role>.<variant>.json` map(s).
4. Author the `.spec.ts` using the POM classes in `src/pages/`.
5. **Never launch a browser to explore the DOM.** If an element is missing, fail immediately and instruct to run `npm run harvest`.

---

## 🔍 Validation Workflow

After generating or updating test files:

1. **Typecheck and Lint**:
   ```bash
   npm run tsc && npm run lint:check && npm run format:check
   ```
2. **Execute Locally**:
   ```bash
   npm run test:ui-hotel
   # or
   npm run test:ui-ta
   ```

---

## 📚 Reference Guides

| Reference Guide                                           | Description                                                          |
| :-------------------------------------------------------- | :------------------------------------------------------------------- |
| **[Element Locators](reference/locator.md)**              | Selector priorities, accessibility roles, `getByRole`, `getByLabel`. |
| **[Web-First Assertions](reference/assertion.md)**        | Auto-retry assertions and expectations.                              |
| **[Test Organization](reference/test-organization.md)**   | Test isolation, setup blocks, and readable steps.                    |
| **[Page Object Model](reference/page-object-model.md)**   | POM patterns, base pages, and maintenance rules.                     |
| **[Auth State Reuse](reference/auth-state.md)**           | Login state setups and storage-state sessions.                       |
| **[Debugging & Flakiness](reference/debugging-flaky.md)** | Troubleshooting checklist for failed/flaky tests.                    |
| **[Stuck Protocol](reference/stuck-protocol.md)**         | Rules for escalating blocked tasks after 2–3 attempts.               |
