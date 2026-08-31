# Stuck Protocol — Playwright Agent

When an agent cannot complete a sub-task after **2–3 attempts**, it MUST stop retrying and produce a structured summary. This prevents infinite loops, wasted context, and invisible blockers.

---

## Trigger Conditions

Apply this protocol when any of the following occur after 2–3 attempts:

| Category                       | Examples                                                                               |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| **Locator not found**          | Element not in DOM, selector never matches, `getByRole` / `getByLabel` returns nothing |
| **Action cannot be simulated** | Click has no visible effect, form won't submit, drag-and-drop silently fails           |
| **Assertion keeps failing**    | `toBeVisible()` / `toHaveText()` times out despite page appearing correct              |
| **Navigation blocked**         | `waitForURL` times out, redirect loop, auth wall encountered unexpectedly              |
| **Network/API blocker**        | Request never fires, mock never matches, response body differs from expectation        |
| **Compiler/lint errors**       | TypeScript error that cannot be resolved with available types or imports               |

---

## Required Summary Format

After hitting the trigger, output the following block **before stopping work**:

```
## Stuck Summary

**Task attempted:** <one-line description of what you were trying to do>

**Attempts made:**
1. <approach tried> — <why it failed or what happened>
2. <approach tried> — <why it failed or what happened>
3. <approach tried> — <why it failed or what happened> (if applicable)

**Blocker:**
<Root cause or best hypothesis. Be specific: include selector text, error messages, URL, element state, etc.>

**What I need to continue:**
- [ ] <specific information, access, or change needed from the user>
- [ ] <e.g. "Visible `data-testid` on the submit button", "Confirmed API route for login", "Screenshot of the actual DOM state">

**Workaround considered:**
<Optional: describe any partial fallback that could unblock progress, or state "none identified">
```

---

## Escalation Rules

1. **Do not retry the same approach a 4th time.** A different approach counts as a new attempt.
2. **Do not silently skip the blocker.** Always surface it in the summary.
3. **Do not guess selectors beyond 3 variants.** After 3 locator candidates fail, emit the summary and list what was tried.
4. **Do not fabricate passing tests.** If an assertion cannot be verified, mark the test as `test.skip` with a `// TODO:` comment explaining the blocker, then emit the summary.

---

## After Emitting the Summary

- Stop work on the blocked sub-task.
- Continue with other unblocked parts of the request (if any).
- Record persistent blockers in `.agents/knowledge/blockers.md` so they survive across sessions.

---

## Knowledge Persistence

Blockers and their resolutions should be recorded in `.agents/knowledge/blockers.md` using this format:

```markdown
### [YYYY-MM-DD] <short title>

**Blocker:** <description>
**Resolution:** <how it was fixed, or "unresolved">
**Notes:** <any extra context>
```

This file is git-tracked and serves as a shared knowledge base for the team.
