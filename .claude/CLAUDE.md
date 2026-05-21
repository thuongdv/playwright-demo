Repository guidance for AI coding agents (Claude Code + GitHub Copilot)

This file is intentionally **repo-specific**.  
Generic Playwright patterns, CLI command catalogs, and deep testing playbooks live in skill/agent files and should not be duplicated here.

## Source of truth hierarchy

1. **This file (`.claude/CLAUDE.md`)**: project-specific constraints, paths, and integration notes.
2. **Skill docs (`.claude/skills/**`)\*\*: reusable Playwright workflows and implementation patterns.
3. **Agent docs (`.claude/agents/*.agent.md`)**: routing and agent behavior.

When guidance overlaps, keep this file minimal and defer to skill/agent docs.

## Repository profile

- TypeScript Playwright test automation project.
- Tests: `src/tests/`
- Page objects: `src/pages/ta-demo/`
- Custom fixtures and assertions: `src/fixtures/base-fixture.ts`
- Runtime settings and required env validation: `src/settings.ts`
- Reporting/integrations:
  - Playwright HTML + Allure
  - Report Portal (`@reportportal/agent-js-playwright`)
  - Slack reporter (`src/reporters/slack-reporter.ts`)
  - JIRA client (`src/utils/jira-client.ts`)

## Project conventions (must follow)

- Prefer existing page objects before introducing new selectors or flows.
- In tests, import `test`/`expect` from `fixtures/base-fixture` when custom matchers are needed.
- Reuse custom matchers (for example: `toHaveAmount`, `toBeVisibleWithReloadPage`, `toHaveCountGTE`) instead of re-implementing equivalent checks.
- Avoid global config churn in `playwright.config.ts` unless the request explicitly requires cross-project config changes.
- Keep code output plain text only; do not add emoji in source code or logs.

## Environment and configuration safety

- `src/settings.ts` validates required env vars at import time and can fail fast.
- Required groups include: `RP_*`, `TA_*`, `SLACK_*`, `BASE_URL`, `DWS_*`, `REPORTS_PATH`, `JIRA_*`.
- If new env vars are introduced:
  - add validation in `src/settings.ts`
  - document in `.env.example` (create/update if needed)

## Validation workflow for code changes

Use repository scripts:

- `npm install`
- `npm run tsc`
- `npm run lint`
- `npm test`

If relevant, use scoped test runs before full suite runs.

## Agent/skill routing (no duplication)

Use these exact names:

- **Context7-Expert**: external library/framework API correctness, version-aware guidance.
- **Playwright Tester Mode**: Playwright test creation, locator repair, flaky test debugging, browser flow validation.
- **playwright-cli** skill: direct browser automation workflows and Playwright CLI operations.
- **playwright-skill** skill: reusable TypeScript Playwright test architecture/patterns.

For mixed requests, resolve API/library correctness first (Context7-Expert), then implement/refine tests (Playwright Tester Mode).

## High-value files to inspect first

- `playwright.config.ts`
- `src/settings.ts`
- `src/fixtures/base-fixture.ts`
- `src/pages/`
- `src/tests/`
- `src/reporters/slack-reporter.ts`
- `src/utils/jira-client.ts`

End of instructions.
