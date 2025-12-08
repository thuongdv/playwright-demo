This file gives concise, actionable guidance for AI coding agents working in the Playwright Demo repository.

Keep this short and specific — aim for the patterns and commands an agent needs to be productive immediately.

Repository highlights

- TypeScript Playwright test suite with Page Object Model under `src/pages/ta-demo/` and tests in `src/tests/`.
- Custom fixtures and assertions live in `src/fixtures/base-fixture.ts` (imports `test` and extends `expect`). Use these helpers instead of raw Playwright expect when editing tests.
- Environment-based configuration is in `src/settings.ts` which calls `dotenv.config()` and throws for missing required env vars. Required env vars include: RP_*, TA_*, SLACK_*, BASE_URL, DWS_*, REPORTS_PATH, and JIRA_*.
- Reporting and integrations: Allure (`allure-playwright`), Playwright HTML reporter, Report Portal (`@reportportal/agent-js-playwright`), and a custom Slack reporter in `src/reporters/slack-reporter.ts`.

What to change and how (contract)

- Inputs: edits to TypeScript test, page object, utils, or config files.
- Outputs: passing TypeScript compile (tsc --noEmit), lint (eslint .), and Playwright tests (npx playwright test) where applicable.
- Error modes: missing environment variables (settings.ts will throw), failing tests, or reporter credentials missing — surface these clearly in console output.

Key workflows and commands (use these exact commands)

- Install deps: `npm install`
- Typecheck: `npm run tsc` (runs `npx tsc --noEmit`)
- Lint: `npm run lint` (runs `npx eslint .`)
- Run tests: `npm test` -> `npx playwright test --config=playwright.config.ts`
- Run tests with QAT env file: `npm run test:qat` (uses `dotenv -e .env.qat -- npx playwright test ...`)
- Open html report: `npm run report` -> `npx playwright show-report`
- Playwright debug/headed: `npx playwright test --debug` and `npx playwright test --headed`
- Update playwright browsers: `npx playwright install`

Project-specific conventions

- Tests live in `src/tests/` and usually import page objects with path aliases like `pages/ta-demo/HomePage`. Prefer existing page objects over creating new low-level selectors.
- Page objects follow class-based pattern (constructor takes `Page`) and expose methods for actions (example: `pages/ta-demo/cart-page.ts`).
- Custom expect extensions: `toHaveAmount`, `toBeVisibleWithReloadPage`, `toHaveCountGTE`. Use these where appropriate instead of reimplementing behavior.
- Settings are strict: `src/settings.ts` validates required env vars at import time. When adding new env usage, update `src/settings.ts` to validate it and consider adding `.env.example` if needed.
- Reporting flags: `process.env.REPORT === 'rp'` enables Report Portal. To test Report Portal flows locally, set `REPORT=rp` and required RP\_\* env vars.

Integration points & external deps

- Report Portal: configured in `playwright.config.ts` and used with `@reportportal/agent-js-playwright` for test reporting.
- Slack: `src/reporters/slack-reporter.ts` posts summary messages using `@slack/web-api` and env vars SLACK\_\*.
- JIRA: `src/utils/jira-client.ts` interacts with JIRA API using env vars JIRA\_\*.
- Test Automation Site: tests target a demo application configured via TA\_\* env vars.

Patterns and file examples (copy-edit tasks use these)

- When editing tests, import `expect` from `fixtures/base-fixture` to get project custom matchers: `import { expect } from 'fixtures/base-fixture';`
- To add a new page object, put it under `src/pages/<area>/` and follow the existing pattern: constructor(page: Page) and methods returning Locator or performing actions.
- For reporters or utilities that write files, prefer `settings.REPORTS_PATH` from `src/settings.ts` for locations.

Tips for safe edits

- Always run `npm run tsc` after changing TypeScript files.
- Add/update unit or integration tests under `src/tests/` that exercise your change. For quick validation run a specific file with `npx playwright test path/to/file`.
- Avoid changing global Playwright config unless necessary; prefer environment toggles or new projects in `playwright.config.ts`.
- If adding new env variables, update `src/settings.ts` and document defaults in `.env.example` (create if missing).
- **Never include emoji icons in generated code** (e.g., avoid `console.log('🐛 Bugs: ...')` or similar). Keep all code output plain text only.

Examples (concrete snippets from repo)

- Custom expect usage: `import { expect } from 'fixtures/base-fixture'; await expect(locator).toHaveAmount(2);`
- Enable Report Portal in CI/local debug: `REPORT=rp RP_ENDPOINT=... RP_PROJECT=... RP_API_KEY=... npm test`

Files to inspect for more context

- `playwright.config.ts` (default config & RP toggle)
- `src/settings.ts` (env validation)
- `src/fixtures/base-fixture.ts` (custom matchers)
- `src/pages/` and `src/tests/` (POM and tests)
- `src/reporters/slack-reporter.ts` and `src/utils/report-portal-utils.ts` (reporting integrations)

If something is unclear

- Ask for the intended change's scope (test, page object, reporter, or infra). Provide the test filename or file you want changed and a short description. I will run typecheck and tests for quick verification.

End of instructions.
