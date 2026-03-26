# Phase 1: [HYGIENIST] Subtractive Cleanup

## Phase Goal

Remove dead code, unused dependencies, and stale files from the codebase. This phase is purely subtractive: nothing is added except minor test adjustments to maintain coverage. Cleaning first prevents wasted effort in later phases.

**Success criteria:**
- All identified dead code removed
- Unused dependency removed from package.json
- Stale lock file deleted
- Placeholder test replaced or removed
- No regression in `pnpm test` or `pnpm run check`

**Estimated tokens:** ~12,000

## Prerequisites

- Phase 0 read and understood
- Repository cloned, `pnpm install` completes successfully
- `pnpm test` passes before starting

## Tasks

### Task 1: Remove Unused `run` Dependency

**Goal:** Remove the `run` npm package which is listed as a production dependency but never imported anywhere.

**Files to Modify:**
- `package.json` - Remove `"run": "^1.5.0"` from `dependencies`

**Prerequisites:** None

**Implementation Steps:**
- Remove the `run` entry from the `dependencies` object in `package.json`
- Run `pnpm install` to update the lockfile
- Run `pnpm test` and `pnpm run check` to verify no breakage

**Verification Checklist:**
- [ ] `run` no longer appears in `package.json`
- [ ] `pnpm install` succeeds
- [ ] `pnpm test` passes
- [ ] `pnpm run check` passes

**Testing Instructions:**
- No new tests needed. Existing tests confirm nothing depends on this package.

**Commit Message Template:**
```
chore(deps): remove unused run dependency

- Package was never imported in source code
```

---

### Task 2: Delete Stale `package-lock.json`

**Goal:** Remove the npm lock file since the project uses pnpm. Having both lock files risks dependency version drift between local dev and CI.

**Files to Delete:**
- `package-lock.json`

**Prerequisites:** Task 1 complete (so the lockfile deletion commit is clean)

**Implementation Steps:**
- Delete `package-lock.json` from the repository root
- Verify `.gitignore` already ignores it (it should, based on the audit). If it does, this file is untracked and only needs local deletion. If it is tracked, it needs a `git rm`.
- Check with `git status` whether the file is tracked

**Verification Checklist:**
- [ ] `package-lock.json` does not exist in working directory
- [ ] `pnpm install --frozen-lockfile` still works
- [ ] Only `pnpm-lock.yaml` remains as a lockfile

**Testing Instructions:**
- No tests needed.

**Commit Message Template:**
```
chore(deps): remove stale package-lock.json

- Project uses pnpm; npm lockfile causes version drift risk
```

---

### Task 3: Remove Dead `LinkedIn.svelte` Icon Component

**Goal:** Remove the LinkedIn icon component which is never imported by any production code. Its test file should also be removed since it tests dead code.

**Files to Delete:**
- `src/lib/components/icons/LinkedIn.svelte`
- `src/lib/components/icons/LinkedIn.test.ts`

**Prerequisites:** None

**Implementation Steps:**
- Verify with a search that `LinkedIn` is not imported anywhere except its test file
- Delete both the component and its test file
- Run `pnpm test` to ensure no other tests reference it

**Verification Checklist:**
- [ ] No file in `src/` imports `LinkedIn.svelte`
- [ ] Both files deleted
- [ ] `pnpm test` passes

**Testing Instructions:**
- No new tests. Run existing suite to confirm no references break.

**Commit Message Template:**
```
chore: remove unused LinkedIn icon component

- Component was never imported in production code
- Test file only tested dead code
```

---

### Task 4: Remove Dead `navigation.ts` Data File

**Goal:** Remove `src/lib/data/navigation.ts` which contains SVG icon markup as raw strings but is never imported by any production code. The navigation items it exports duplicate icons already rendered inline in `Header.svelte`, and the two have already drifted (different CSS variable names).

**Files to Delete:**
- `src/lib/data/navigation.ts`

**Files to Potentially Modify:**
- Any test files that import from `navigation.ts` (search first)

**Prerequisites:** None

**Implementation Steps:**
- Search the codebase for any imports of `navigation.ts` or `$lib/data/navigation`
- If only test files reference it, delete both the data file and the test
- If production files reference it, do not delete (flag for review)
- Run `pnpm test` and `pnpm run check`

**Verification Checklist:**
- [ ] No production code imports `navigation.ts`
- [ ] File deleted
- [ ] `pnpm test` passes
- [ ] `pnpm run check` passes

**Testing Instructions:**
- Run full test suite. Remove any test file that exclusively tests `navigation.ts`.

**Commit Message Template:**
```
chore: remove unused navigation.ts data file

- SVG markup duplicated Header.svelte icons with drift
- Never imported by production code
```

---

### Task 5: Fix Placeholder Test

**Goal:** Replace the `expect(true).toBe(true)` placeholder in `src/lib/test-utils/setup.test.ts` with a meaningful assertion or delete the test case entirely.

**Files to Modify:**
- `src/lib/test-utils/setup.test.ts`

**Prerequisites:** None

**Implementation Steps:**
- Read `src/lib/test-utils/setup.test.ts` to understand its full context
- If the test file only contains the placeholder, consider what the setup utilities actually do (read `src/lib/test-utils/` directory) and write a test that validates the test setup works (e.g., that mock factories return valid objects, or that jsdom is properly configured)
- If the placeholder is alongside real tests, just remove the placeholder test case
- If the entire file is only a placeholder, delete it

**Verification Checklist:**
- [ ] No `expect(true).toBe(true)` remains in the codebase
- [ ] `pnpm test` passes
- [ ] Coverage thresholds still met

**Testing Instructions:**
- Run `pnpm test:coverage` to verify coverage is not degraded.

**Commit Message Template:**
```
test: replace placeholder assertion in setup test

- Removed expect(true).toBe(true) pattern
- [Added meaningful assertion | Deleted placeholder test file]
```

---

### Task 6: Remove Duplicate CSS Import

**Goal:** Remove the duplicate `import '../app.css'` from `src/routes/+page.svelte` since it is already imported in `+layout.svelte`. SvelteKit deduplicates at build time, but the duplicate is misleading.

**Files to Modify:**
- `src/routes/+page.svelte` - Remove the `import '../app.css'` line

**Prerequisites:** None

**Implementation Steps:**
- Read `src/routes/+page.svelte` and confirm the `import '../app.css'` line exists (around line 43)
- Read `src/routes/+layout.svelte` and confirm it already imports `app.css`
- Remove the duplicate import from `+page.svelte`
- Run `pnpm run build` (or at minimum `pnpm run check`) to verify no style regression

**Verification Checklist:**
- [ ] `app.css` imported only in `+layout.svelte`
- [ ] `pnpm run check` passes
- [ ] `pnpm test` passes

**Testing Instructions:**
- No new tests. Visual check that the homepage renders correctly (this is a build-time deduplicated import, so removal has no runtime effect).

**Commit Message Template:**
```
chore(css): remove duplicate app.css import from +page.svelte

- Already imported in +layout.svelte
```

---

### Task 7: Fix Dead CSS Declaration

**Goal:** Remove the overridden `background-image: var(--bg-color)` in `+page.svelte` that is immediately overridden by `background: transparent`.

**Files to Modify:**
- `src/routes/+page.svelte` - Remove the dead `background-image` line (around lines 119-121)

**Prerequisites:** None

**Implementation Steps:**
- Read the `.portfolio-container` CSS block in `src/routes/+page.svelte`
- Remove the `background-image: var(--bg-color)` line since the `background: transparent` shorthand on the next line overrides it
- Verify the intent: if `background: transparent` is the desired state, the `background-image` line is dead. If the image was intended, the `background` shorthand should be removed instead. Check git blame if unclear.

**Verification Checklist:**
- [ ] No CSS property is immediately overridden by the next declaration in the same rule
- [ ] `pnpm run check` passes

**Testing Instructions:**
- No new tests. Visual check that homepage background renders correctly.

**Commit Message Template:**
```
fix(css): remove dead background-image declaration in +page.svelte

- Was immediately overridden by background shorthand
```

---

### Task 8: Fix Invalid CSS `width: em;`

**Goal:** Fix the syntactically invalid CSS `width: em;` in `Header.svelte` (missing numeric value before the unit).

**Files to Modify:**
- `src/routes/Header.svelte` - Fix line ~194

**Prerequisites:** None

**Implementation Steps:**
- Read `src/routes/Header.svelte` around line 194 to see the full CSS context
- The fallback `min-width: 3em` on line 195 suggests the intended value was likely `width: 3em` or similar
- Check adjacent elements and the design to determine the correct value
- If uncertain, use the same value as `min-width` (3em) since the browser was already falling back to it

**Verification Checklist:**
- [ ] `width: em;` replaced with a valid CSS declaration
- [ ] `pnpm run check` passes

**Testing Instructions:**
- No new tests. Visual check that header navigation items render correctly.

**Commit Message Template:**
```
fix(css): fix invalid width declaration in Header.svelte

- width: em was missing numeric value, browser was ignoring it
```

---

### Task 9: Run `npm audit fix` Equivalent via pnpm

**Goal:** Address the 9 known vulnerabilities (5 high, 3 moderate, 1 low) identified by the audit. Key concerns: picomatch ReDoS, rollup path traversal, svelte SSR XSS vectors.

**Files to Modify:**
- `package.json` - Update vulnerable dependency versions if needed
- `pnpm-lock.yaml` - Will be updated by pnpm

**Prerequisites:** Tasks 1-2 complete (clean dependency state)

**Implementation Steps:**
- Run `pnpm audit` to see current vulnerability state
- Run `pnpm update` to update dependencies to latest compatible versions
- If specific packages need major version bumps, update them individually
- Check if pnpm overrides in `package.json` need additions for transitive dependencies
- Run `pnpm test` and `pnpm run check` after updates

**Verification Checklist:**
- [ ] `pnpm audit` shows 0 high vulnerabilities (moderate/low may remain if they require breaking changes)
- [ ] `pnpm test` passes
- [ ] `pnpm run check` passes
- [ ] `pnpm run build` succeeds

**Testing Instructions:**
- Run full test suite. If any tests break due to dependency updates, fix them.

**Commit Message Template:**
```
fix(deps): update dependencies to resolve audit vulnerabilities

- Address picomatch, rollup, and svelte security advisories
- [List specific version changes]
```

## Phase Verification

- `pnpm test` passes with no regressions
- `pnpm run check` passes
- `pnpm audit` shows reduced vulnerability count
- No dead code artifacts remain (LinkedIn.svelte, navigation.ts, run dependency, duplicate import, dead CSS)
- Placeholder test removed or replaced with meaningful assertion
