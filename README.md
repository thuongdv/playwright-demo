# Playwright Automation & Deterministic Page Map Pipeline

This repository contains an enterprise Playwright test automation framework built with TypeScript. It features a deterministic **Page Map Harvester Pipeline** that extracts canonical accessibility-first page elements once per deploy, enabling browser-free AI test authoring and rock-solid Page Object Model (POM) maintenance.

---

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Project Structure](#-project-structure)
- [Setup & Environment Configuration](#-setup--environment-configuration)
- [🌾 Page Map Harvester Pipeline](#-page-map-harvester-pipeline)
  - [Overview](#overview)
  - [Running the Harvester](#running-the-harvester)
  - [How to Add New Page Targets](#how-to-add-new-page-targets)
  - [Authentication & Multi-Role Support](#authentication--multi-role-support)
  - [Determinism & Secrets Handling](#determinism--secrets-handling)
- [🚀 Running Tests](#-running-tests)
- [📊 Viewing Test Reports](#-viewing-test-reports)
- [🛠️ Code Quality & Formatting](#️-code-quality--formatting)
- [📚 References](#-references)

---

## 📋 Prerequisites

- **[Node.js](https://nodejs.org/)**: v18 or later (v20+ recommended)
- **[npm](https://www.npmjs.com/)**: comes with Node.js
- **Playwright Browsers**: Chrome / Chromium

---

## 📁 Project Structure

```text
playwright-demo/
├── .agents/
│   ├── harvester/                # Deterministic DOM & accessibility harvester engine
│   │   ├── auth/                 # Storage-state auth lifecycle & credential validation
│   │   │   ├── auth-manager.ts   # Session validation, login setup, auto-refresh
│   │   │   └── env.ts            # Environment variable validation
│   │   ├── digest.ts             # Deterministic SHA-256 aria/element digest calculation
│   │   ├── extractor.ts          # DOM evaluation, AI aria snapshot, row deduplication
│   │   ├── normalizer.ts         # Dynamic text normalization (dates, IDs, currencies)
│   │   ├── sanitizer.ts          # Secret leak & token protection
│   │   ├── targets.ts            # Harvester target manifest & route configurations
│   │   ├── types.ts              # TypeScript interfaces for harvester configuration
│   │   └── run.ts                # Harvester CLI entry point
│   ├── page-map/                 # Committed, versioned JSON page maps
│   │   ├── schema.ts             # Zod validation schema & TypeScript types
│   │   ├── <PageKey>.index.json  # Page index mapping roles & variants to element keys
│   │   └── <PageKey>.<role>.<variant>.json # Canonical element maps with locators
│   └── skills/                   # Agent skills for test authoring and automation
├── src/
│   ├── fixtures/                 # Custom test fixtures, page injections & assertions
│   ├── models/                   # TypeScript interfaces & data models
│   ├── pages/                    # Page Object Model (POM) classes
│   │   ├── hotel/                # Hotel Planisphere POMs (Home, Plans, Login, Reserve, etc.)
│   │   └── ta/                   # TestArchitect Demo POMs (Home, MyAccount, Cart, etc.)
│   ├── reporters/                # Custom test reporters
│   ├── tests/                    # Playwright test specs
│   │   └── ui/
│   │       ├── hotel/            # Hotel reservation and booking test suites
│   │       └── ta/               # E-commerce store test suites
│   ├── utils/                    # Step decorators, Excel spec-gen, helper functions
│   └── settings.ts               # Runtime settings & environment variables
├── playwright.config.ts          # Multi-project Playwright configuration
├── package.json                  # Dependencies, dev scripts & tools
└── tsconfig.json                 # TypeScript compiler configuration
```

---

## ⚙️ Setup & Environment Configuration

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Install Playwright browsers:**

   ```bash
   npx playwright install chromium
   ```

3. **Configure environment variables:**
   Copy `.env.example` to `.env` and configure your credentials and target URLs:

   ```bash
   cp .env.example .env
   ```

   Key environment variables:
   - `BASE_HOTEL_URL`: Hotel example site base URL (default: `https://hotel-example-site.takeyaqa.dev/en-US/`)
   - `BASE_TA_URL`: TestArchitect demo store URL (default: `https://demo.testarchitect.com/`)
   - `TA_EMAIL` / `TA_PASSWORD`: Credentials for standard store user
   - `HOTEL_EMAIL` / `HOTEL_PASSWORD`: Credentials for hotel user

---

## 🌾 Page Map Harvester Pipeline

### Overview

Per-session DOM exploration by AI agents is costly (10k–50k tokens per snapshot) and discarded after authoring. This framework separates the pipeline:

1. **Harvesting (Deterministically)**: Plain Playwright + TypeScript walks routes once per build, extracting accessibility trees, synthesized robust locators, and row templates into versioned JSON files (`.agents/page-map/`).
2. **Authoring (Browser-Free)**: Agents consume `.agents/page-map/*.index.json` and element maps directly to write tests without launching browsers.

### Running the Harvester

- **Harvest all configured targets:**

  ```bash
  npm run harvest
  ```

  _(or via CLI runner directly)_

  ```bash
  npx tsx .agents/harvester/run.ts --config .agents/harvester/targets.ts
  ```

- **Harvest a specific page only (e.g., `HotelMyPage` or `TAMyAccount`):**

  ```bash
  npx tsx .agents/harvester/run.ts --config .agents/harvester/targets.ts --only HotelMyPage
  ```

- **Dry-run mode (validate without writing to disk):**

  ```bash
  npx tsx .agents/harvester/run.ts --config .agents/harvester/targets.ts --dry-run
  ```

### How to Add New Page Targets

To capture additional application routes, add entries to the `targets` array in [`.agents/harvester/targets.ts`](.agents/harvester/targets.ts):

```typescript
{
  pageKey: "HotelConfirmation",                // Unique PascalCase name for the Page Object
  route: "/en-US/confirm.html",                // Relative route or absolute URL
  baseURL: "https://hotel-example-site.takeyaqa.dev", // Optional override base URL
  rootSelector: "body",                        // CSS selector for the root container
  roles: ["unauthenticated"],                  // Roles: "unauthenticated", "hotelUser", "standardUser"
  variants: [
    {
      key: "default",
    },
  ],
  settle: {
    waitFor: "domcontentloaded",               // "domcontentloaded" | "networkidle" | "load"
    extraSelector: "#confirmation-details",    // Optional selector to wait for before extraction
  },
}
```

### Authentication & Multi-Role Support

- Authenticated pages use **storage-state sessions** stored in local `.auth/<roleKey>.json` (automatically ignored by git).
- The harvester validates the session prior to harvesting. If the session is missing or expired, `AuthManager` logs in once via background automation, saves the updated state, and loads it into browser contexts.
- Multi-role targets (e.g. `roles: ["unauthenticated", "standardUser"]`) produce separate, role-differentiated page maps (e.g., `TAMyAccount.unauthenticated.default.json` containing login/register forms vs. `TAMyAccount.standardUser.default.json` containing account dashboard navigation).

### Determinism & Secrets Handling

- **Zero-Diff Guarantee**: Reruns against an unchanged application produce **zero git diff**. All volatile data (dynamic timestamps, nonces, session tokens, IDs) are generalized (`<DATE>`, `<ID>`, `<CURRENCY>`, `<UUID>`), and elements are deterministically sorted.
- **Secret Sanitizer**: An automated pass verifies that no JWT tokens, passwords, cookies, or environment secrets appear in page map outputs or console logs.

---

## 🚀 Running Tests

- **Run all UI tests:**

  ```bash
  npx playwright test
  ```

- **Run tests for a specific project:**

  ```bash
  # Hotel Planisphere test suite
  npm run test:ui-hotel

  # TestArchitect e-commerce test suite
  npm run test:ui-ta
  ```

- **Run tests matching a specific tag or name:**

  ```bash
  npx playwright test --grep @SmokeTest
  ```

- **Run tests in headed mode (visible browser):**

  ```bash
  npx playwright test --headed
  ```

- **Debug tests with Playwright Inspector:**

  ```bash
  npx playwright test --debug
  ```

---

## 📊 Viewing Test Reports

- **Playwright HTML Report:**

  ```bash
  npm run report
  # or
  npx playwright show-report
  ```

- **Allure Report:**

  ```bash
  npx allure serve allure-results
  ```

---

## 🛠️ Code Quality & Formatting

- **Type Check:**

  ```bash
  npm run tsc
  ```

- **Lint with ESLint:**

  ```bash
  npm run lint:check       # Check for lint issues
  npm run lint             # Auto-fix lint issues
  ```

- **Code Formatting with Prettier:**

  ```bash
  npm run format:check     # Check formatting
  npm run format           # Format all files
  ```

---

## 📚 References

- [Playwright Official Documentation](https://playwright.dev/docs/intro)
- [Playwright Locators Best Practices](https://playwright.dev/docs/locators)
- [Page Object Models in Playwright](https://playwright.dev/docs/pom)
- [Allure Playwright Reporting](https://allurereport.org/docs/playwright/)
