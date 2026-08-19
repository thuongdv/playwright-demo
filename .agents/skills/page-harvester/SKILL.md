---
name: page-harvester
description: >
  Maintenance skill for discovering and extracting deterministic accessibility-first Page Maps
  from web applications into versioned JSON files (.agents/page-map/) and generating typed POM classes.
  Use when adding new routes, updating page targets, handling auth/roles, configuring variants,
  or regenerating Page Object Models.
---

# Page Harvester Skill

This skill governs the deterministic extraction of web application DOM and accessibility trees into committed, versioned **Page Map** artifacts (`.agents/page-map/`) and the generation of typed Page Object Model (POM) classes.

> [!IMPORTANT]
> The harvester contains **no LLM calls**. Element extraction is plain, deterministic Playwright + TypeScript.
> All secrets are read strictly from environment variables and must never appear in page maps, logs, or console output.

---

## 🌾 Harvester Workflow

1. **Check or Configure Targets**:
   Edit [.agents/harvester/targets.ts](../../harvester/targets.ts) to define or update application routes, roles, variants, root selectors, and settle conditions.

2. **Execute Harvest**:
   Run the harvester to extract canonical page maps:

   ```bash
   npm run harvest
   ```

   Or target a single page:

   ```bash
   npx tsx .agents/harvester/run.ts --config .agents/harvester/targets.ts --only <PageKey>
   ```

3. **Verify Zero-Diff Determinism**:
   Run the harvester a second time against an unchanged application. The output must report `[UNCHANGED]` with **zero git diff**.

4. **Regenerate Page Object Models**:
   Run the POM codegen to emit typed TypeScript classes in `src/pages/<area>/generated/`:

   ```bash
   npm run codegen:pom
   ```

5. **Run Code Quality Checks**:
   ```bash
   npm run tsc && npm run lint:check && npm run format:check
   ```

---

## 🎯 Target Configuration Reference

Add targets to `targets` in [.agents/harvester/targets.ts](../../harvester/targets.ts):

```typescript
{
  pageKey: "HotelReservation",                // PascalCase identifier for POM & Page Map
  route: "/en-US/reserve.html?plan-id=0",     // Target route or URL
  baseURL: "https://hotel-example-site.takeyaqa.dev", // Optional base URL override
  rootSelector: "body",                       // Container selector (or scoped selector)
  roles: ["unauthenticated"],                 // Roles: "unauthenticated", "hotelUser", "standardUser"
  variants: [
    {
      key: "default",
      // fixture: async ({ page }) => { ... }, // Optional state preparation fixture
      // openers: [{ description: "Open Menu", action: async (page) => ... }]
    },
  ],
  settle: {
    waitFor: "domcontentloaded",              // "domcontentloaded" | "networkidle" | "load"
    // extraSelector: ".card",                // Optional selector to wait for before extraction
  },
}
```

---

## 🔐 Auth Roles & Storage State

- Roles are defined in [.agents/harvester/auth/env.ts](../../harvester/auth/env.ts) and [.agents/harvester/auth/auth-manager.ts](../../harvester/auth/auth-manager.ts).
- Sessions are saved to `.auth/<roleKey>.json` (ignored by git).
- The harvester automatically tests session validity; if expired or missing, it logs in once via background automation and re-uses the storage state.
- Emits `<PageKey>.<roleKey>.<variantKey>.json` for each role, capturing role-specific controls (e.g. login form for `unauthenticated` vs. navigation for `standardUser`).

---

## 🛡️ Secrets & Sanitization

- Never write passwords, tokens, session cookies, or JWTs into `.agents/page-map/`.
- Every harvest run automatically runs `assertNoSecrets()` to fail if credentials or token patterns leak.
- Dynamic data (dates, IDs, currencies, UUIDs) are normalized to regex patterns (`<DATE>`, `<ID>`, `<CURRENCY>`, `<UUID>`).
