# Phase 4: [DOC-ENGINEER] Documentation Remediation

## Phase Goal

Fix all documentation drift, gaps, and stale content identified in the doc audit. Archive historical phase documents. Update README and STRUCTURE.md to reflect the current codebase (post-Phases 1-3 changes). This runs last because the codebase has changed significantly in prior phases.

**Success criteria:**
- All 10 drift findings resolved
- All 3 gap findings resolved
- All 2 stale findings resolved
- All 3 stale code examples fixed
- All 3 structure issues resolved
- Historical phase docs archived
- `pnpm run lint:md` passes on all documentation

**Estimated tokens:** ~10,000

## Prerequisites

- Phase 0 read and understood
- Phases 1-3 complete (codebase is in final state)
- `pnpm run lint:md` available (installed in Phase 3)

## Tasks

### Task 1: Archive Historical Phase Documents

**Goal:** Move the 9 historical refactoring documents out of the main `docs/` directory. These are point-in-time records of a completed refactoring project that confuse new contributors looking for current documentation.

**Files to Move (to `docs/archive/`):**
- `docs/FINAL_COMPREHENSIVE_REVIEW.md`
- `docs/PERFORMANCE_BASELINE.md`
- `docs/PHASE_6_AUDIT.md`
- `docs/PHASE_6_COMPLETE.md`
- `docs/PHASE_6_TESTING.md`
- `docs/PHASE_7_BUILD.md`
- `docs/PHASE_7_FUNCTIONAL_TESTING.md`
- `docs/PHASE_7_REVIEW_RESPONSE.md`
- `docs/REFACTORING_SUMMARY.md`
- `docs/SECURITY_AUDIT.md`

**Files to Keep in `docs/`:**
- `docs/STRUCTURE.md` (living doc, updated in Task 2)
- `docs/TESTING.md` (living doc, updated in Task 3)
- `docs/PERFORMANCE.md` (living doc)
- `docs/PRELOAD_STRATEGY.md` (living doc)
- `docs/plans/` (plan directory)

**Prerequisites:** None

**Implementation Steps:**
- Create `docs/archive/` directory
- Move all 10 historical files into `docs/archive/`
- Add a brief `docs/archive/README.md` with one line: "Historical documents from the 2025 refactoring project. These are point-in-time snapshots and may not reflect current code."
- Verify no other docs link to these files (search for relative links). If any do, update the links.

**Verification Checklist:**
- [x] `docs/archive/` contains all 10 historical files
- [x] `docs/` root contains only living docs (STRUCTURE, TESTING, PERFORMANCE, PRELOAD_STRATEGY, plans/)
- [x] No broken relative links in remaining docs

**Testing Instructions:**
- Search all `.md` files for references to moved filenames
- Run `pnpm run lint:md` on docs/

**Commit Message Template:**
```
docs: archive historical phase documents

- Move 10 refactoring-era docs to docs/archive/
- Reduces confusion for new contributors
```

---

### Task 2: Fix README.md Drift and Gaps

**Goal:** Update README.md to match the current codebase state. Addresses drift findings 1, 2, 3 from the doc audit.

**Files to Modify:**
- `README.md`

**Prerequisites:** Task 1 complete (stale doc references cleaned up)

**Implementation Steps:**

Fix drift items:
- **Vite version** (drift #1): Change `Build: Vite 5.4` to `Build: Vite 8` (or whatever version is in `package.json` after Phase 1 updates)
- **Deployment** (drift #2): Change `Deployment: Static adapter for any static host` to `Deployment: AWS Amplify (static adapter with precompression)`. Reference `amplify.yml` for config.
- **Project structure** (drift #3): Remove `/lib/utils` from the project structure tree (directory does not exist). Verify all other listed directories still exist.

Additional updates post-Phases 1-3:
- Update the tech stack section to reflect any dependency version changes from Phase 1
- Add mention of ESLint, Prettier, and Husky (added in Phase 3) to the development section or tech stack
- Add a "Linting" subsection to the development commands showing `pnpm run lint`, `pnpm run format`, `pnpm run format:check`
- Verify the project structure tree matches the actual directory layout after all deletions in Phase 1 (LinkedIn.svelte removed, navigation.ts removed)

**Verification Checklist:**
- [x] Vite version matches `package.json`
- [x] Deployment section mentions Amplify
- [x] No `/lib/utils` in project structure
- [x] All listed directories and files actually exist
- [x] Lint commands documented
- [x] `pnpm run lint:md` passes on README.md

**Testing Instructions:**
- Cross-reference every file/directory listed in README with the actual filesystem
- Run `pnpm run lint:md` on README.md

**Commit Message Template:**
```
docs: update README to match current codebase

- Fix Vite version, deployment target, project structure
- Add linting documentation
```

---

### Task 3: Fix STRUCTURE.md Drift, Gaps, and Stale Content

**Goal:** Update STRUCTURE.md to accurately reflect the current file layout. Addresses drift findings 4-6, stale findings 1-2, stale code examples 1-2, and structure issue 1 from the doc audit.

**Files to Modify:**
- `docs/STRUCTURE.md`

**Prerequisites:** Task 1 complete, Phases 1-3 complete (final file layout known)

**Implementation Steps:**

Fix drift items:
- **Hooks directory** (drift #4): Add the test file to the listing, or note the convention that test files colocate with source. After Phase 2, `useSound.js` and `applyClickSound.js` are deleted, so update accordingly.
- **Styles directory** (drift #5): Replace `app.scss` with `tokens.css` and add `glow.css` (created in Phase 2)
- **Data directory** (drift #6): Add `images.ts` and `projects.ts` to the listing

Fix stale items:
- **app.scss reference** (stale #1): Already covered by drift #5 above
- **/lib/utils reference** (stale #2): Remove all references to `/lib/utils/` directory and `formatDate.ts` from STRUCTURE.md

Fix stale code examples:
- **Import example** (stale example #1): Update `import { projects } from '$lib/data/projects'` to include `.js` extension if that is the actual convention, or keep without extension if SvelteKit resolves it
- **Quick Reference table** (stale example #2): Remove the `/lib/utils/` row from the quick reference table

Fix structure issues:
- **Speculative `/components/layouts`** (structure #1): Remove the "(if needed)" reference to a directory that was never created

Additional updates:
- Reflect all file additions/deletions from Phases 1-3 (new ESLint config, Prettier config, Husky hooks, deleted files)
- Update the hooks section to reflect the consolidated sound API

**Verification Checklist:**
- [ ] Every file and directory listed in STRUCTURE.md exists on disk
- [ ] No references to deleted files (useSound.js, applyClickSound.js, LinkedIn.svelte, navigation.ts, app.scss)
- [ ] No references to non-existent directories (/lib/utils, /components/layouts)
- [ ] Data directory lists all 5 files (after Phase 1 deletions, verify count)
- [ ] Import examples match actual import conventions
- [ ] `pnpm run lint:md` passes

**Testing Instructions:**
- For every file path in STRUCTURE.md, verify it exists with `ls` or `find`
- Run `pnpm run lint:md`

**Commit Message Template:**
```
docs: update STRUCTURE.md to match current file layout

- Fix 3 drift items, 2 stale references, 2 stale examples
- Remove references to non-existent directories and deleted files
```

---

### Task 4: Fix TESTING.md Drift

**Goal:** Update TESTING.md to reflect actual CI configuration and coverage thresholds. Addresses drift findings 7-8 from the doc audit, plus stale code example 3.

**Files to Modify:**
- `docs/TESTING.md`

**Prerequisites:** Phase 3 complete (CI updated)

**Implementation Steps:**

Fix drift items:
- **Coverage threshold** (drift #7): Change `Branches: 75%` to `Branches: 70%` to match `vitest.config.ts:41`
- **CI Node versions** (drift #8): Change `Both Node 18 and Node 20` to `Node 24` to match `.github/workflows/ci.yml`

Fix stale code example:
- **Store import path** (stale example #3): Change `import { createAppStore } from './app.svelte'` to `import { createAppStore } from './app.svelte.ts'` (or the correct path that matches actual test files)

Additional updates:
- After Phase 3 CI changes, update any references to the CI pipeline to include the lint job
- Verify all test file paths mentioned in TESTING.md still exist after Phase 1 deletions

**Verification Checklist:**
- [ ] Coverage thresholds match `vitest.config.ts`
- [ ] Node version matches CI config
- [ ] Import paths in examples are correct
- [ ] All referenced test files exist
- [ ] `pnpm run lint:md` passes

**Testing Instructions:**
- Cross-reference every number and path in TESTING.md with config files
- Run `pnpm run lint:md`

**Commit Message Template:**
```
docs: fix TESTING.md drift from actual config

- Correct coverage threshold (70% not 75%)
- Update Node version to 24
- Fix store import path in example
```

---

### Task 5: Fix Plans README Node Version

**Goal:** Update the prerequisites in `docs/plans/README.md` to reflect the actual Node version used in CI.

**Files to Modify:**
- `docs/plans/README.md`

**Prerequisites:** None

**Implementation Steps:**
- Change `Node.js: v18+` to `Node.js: v24` (or `v24+`) to match the CI configuration
- This is a minor change but prevents confusion for new contributors setting up their environment

**Verification Checklist:**
- [ ] Node version in plans README matches CI config
- [ ] `pnpm run lint:md` passes

**Testing Instructions:**
- Verify the version matches `.github/workflows/ci.yml`

**Commit Message Template:**
```
docs: update Node version prerequisite in plans README
```

---

### Task 6: Add `.env.example` and Document Amplify Deployment

**Goal:** Address the onboarding gaps: no `.env.example` exists (even if no env vars are needed, this should be documented), and the Amplify deployment pipeline is not mentioned anywhere in docs.

**Files to Create:**
- `.env.example` (if environment variables exist) OR add a note to README that no env vars are required

**Files to Modify:**
- `README.md` - Add a deployment section mentioning Amplify

**Prerequisites:** Task 2 complete (README already updated)

**Implementation Steps:**
- Check if any environment variables are referenced anywhere in the codebase (search for `import.meta.env`, `process.env`, `$env/`)
- If none are used, add a line to README under setup: "No environment variables are required."
- If some exist, create `.env.example` with placeholder values and add it to the setup instructions
- Read `amplify.yml` to understand the deployment pipeline
- Add a "Deployment" section to README documenting:
  - The project deploys via AWS Amplify
  - Reference `amplify.yml` for the build config
  - Note that `adapter-static` with `precompress: true` generates Brotli/gzip assets

**Verification Checklist:**
- [ ] README documents whether env vars are needed
- [ ] README has a deployment section referencing Amplify
- [ ] `pnpm run lint:md` passes

**Testing Instructions:**
- Verify `amplify.yml` exists and the README description matches its contents

**Commit Message Template:**
```
docs: document deployment pipeline and environment setup

- Add Amplify deployment section to README
- Clarify no environment variables required (or add .env.example)
```

## Phase Verification

- `pnpm run lint:md` passes on all markdown files
- Every file path referenced in documentation exists on disk
- Every version number in documentation matches the corresponding config file
- No references to deleted files or non-existent directories
- Historical docs archived in `docs/archive/`
- README has accurate tech stack, project structure, and deployment info
- STRUCTURE.md matches actual file layout
- TESTING.md matches actual test config and CI pipeline
