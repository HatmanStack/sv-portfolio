# Phase 3: [FORTIFIER] Guardrails and CI

## Phase Goal

Add ESLint, Prettier, Husky pre-commit hooks, and CI improvements to prevent regressions. This phase runs after structural fixes so the guardrails cover the final code state, not code that was about to be refactored.

**Success criteria:**
- ESLint and Prettier configured and passing on the full codebase
- Pre-commit hook runs lint-staged
- Commit-msg hook enforces conventional commits
- CI enforces lint, coverage thresholds, and type checking
- `pnpm test`, `pnpm run check`, and `pnpm run lint` all pass

**Estimated tokens:** ~15,000

## Prerequisites

- Phase 0 read and understood
- Phases 1-2 complete (clean, well-typed codebase)
- `pnpm test` and `pnpm run check` pass before starting

## Tasks

### Task 1: Add ESLint Configuration

**Goal:** Add ESLint with Svelte and TypeScript support to catch code quality issues automatically.

**Files to Create:**
- `eslint.config.js` - Flat config format (ESLint 9+)

**Files to Modify:**
- `package.json` - Add ESLint devDependencies and `lint` script

**Prerequisites:** None

**Implementation Steps:**
- Install ESLint and required plugins: `pnpm add -D eslint @eslint/js eslint-plugin-svelte typescript-eslint globals`
- Create `eslint.config.js` using flat config format (ESLint 9+ style)
- Configure for TypeScript and Svelte files
- Add recommended rules, plus specific rules for:
  - No `any` types (warn, since tests may still use them)
  - No unused variables
  - No console.log in production (warn)
- Add a `lint` script to `package.json`: `"lint": "eslint src/"`
- Run `pnpm run lint` and fix any violations
- Prefer auto-fixable rules to minimize manual intervention

**Verification Checklist:**
- [x] `eslint.config.js` exists with Svelte + TS config
- [x] `pnpm run lint` passes with 0 errors (warnings acceptable)
- [x] `package.json` has `lint` script

**Testing Instructions:**
- Run `pnpm run lint` and verify it completes without errors
- Intentionally introduce a lint violation (e.g., unused variable) and verify it is caught

**Commit Message Template:**
```
ci(lint): add ESLint with Svelte and TypeScript support

- Flat config format (ESLint 9+)
- Covers src/ directory
```

---

### Task 2: Add Prettier Configuration

**Goal:** Add Prettier for consistent code formatting across the codebase.

**Files to Create:**
- `.prettierrc` - Prettier configuration
- `.prettierignore` - Files to exclude from formatting

**Files to Modify:**
- `package.json` - Add Prettier devDependency and `format` script
- `eslint.config.js` - Add eslint-config-prettier to disable conflicting rules

**Prerequisites:** Task 1 complete (ESLint configured)

**Implementation Steps:**
- Install Prettier and Svelte plugin: `pnpm add -D prettier prettier-plugin-svelte eslint-config-prettier`
- Create `.prettierrc` with project-appropriate settings (check existing code for tab/space preference, quote style, etc.)
- Create `.prettierignore` excluding: `build/`, `node_modules/`, `pnpm-lock.yaml`, `.svelte-kit/`, `static/`
- Add `format` and `format:check` scripts to `package.json`
- Add eslint-config-prettier to `eslint.config.js` to avoid ESLint/Prettier conflicts
- Run `pnpm run format` to format the entire codebase
- Commit the formatting changes separately from the config changes

**Verification Checklist:**
- [x] `.prettierrc` exists
- [x] `pnpm run format:check` passes (all files formatted)
- [x] `pnpm run lint` still passes (no ESLint/Prettier conflicts)

**Testing Instructions:**
- Run `pnpm run format:check` and verify it exits 0
- Run `pnpm test` to ensure formatting did not break anything

**Commit Message Template (config):**
```
ci(lint): add Prettier with Svelte plugin

- Configure formatting rules
- Add format and format:check scripts
```

**Commit Message Template (formatting):**
```
style: apply Prettier formatting to entire codebase
```

---

### Task 3: Add Husky and lint-staged

**Goal:** Add pre-commit hooks that run lint-staged (lint + format check on staged files) and a commit-msg hook that enforces conventional commit format.

**Files to Create:**
- `.husky/pre-commit` - Runs lint-staged
- `.husky/commit-msg` - Validates conventional commit format

**Files to Modify:**
- `package.json` - Add husky, lint-staged, and @commitlint dependencies and config

**Prerequisites:** Tasks 1-2 complete (ESLint and Prettier configured)

**Implementation Steps:**
- Install dependencies: `pnpm add -D husky lint-staged @commitlint/cli @commitlint/config-conventional`
- Add a `prepare` script to `package.json`: `"prepare": "husky"`
- Run `pnpm run prepare` to initialize the `.husky` directory
- Create `.husky/pre-commit` with content: `pnpm lint-staged`
- Create `.husky/commit-msg` with content: `pnpm commitlint --edit $1`
- Add lint-staged config to `package.json`:
  ```json
  "lint-staged": {
    "*.{js,ts,svelte}": ["eslint --fix", "prettier --write"],
    "*.{css,md,json}": ["prettier --write"]
  }
  ```
- Add commitlint config to `package.json` or a `.commitlintrc.json`:
  ```json
  { "extends": ["@commitlint/config-conventional"] }
  ```
- Test the hooks by making a small change and committing

**Verification Checklist:**
- [x] `.husky/pre-commit` exists and is executable
- [x] `.husky/commit-msg` exists and is executable
- [x] A commit with bad formatting is auto-fixed by lint-staged
- [x] A commit with message "bad message" is rejected by commitlint
- [x] A commit with message "fix: good message" passes

**Testing Instructions:**
- Stage a file with intentional formatting issues, commit, verify lint-staged fixes them
- Try `git commit -m "bad"` and verify it is rejected
- Try `git commit -m "fix: valid message"` and verify it passes

**Commit Message Template:**
```
ci: add Husky pre-commit and commit-msg hooks

- Pre-commit runs lint-staged (ESLint + Prettier)
- Commit-msg enforces conventional commits via commitlint
```

---

### Task 4: Improve CI Pipeline

**Goal:** Add lint step to CI, enforce coverage thresholds, and add format check. The coverage thresholds already exist in `vitest.config.ts` but are not enforced in CI because the CI runs `pnpm test` (not `pnpm test:coverage`).

**Files to Modify:**
- `.github/workflows/ci.yml` - Add lint job, change test to include coverage

**Prerequisites:** Tasks 1-3 complete (lint and format tooling installed)

**Implementation Steps:**
- Add a new `lint` job to ci.yml that runs `pnpm run lint` and `pnpm run format:check`
- Change the test job to run `pnpm test:coverage` instead of `pnpm test` so coverage thresholds are enforced
- Add `lint` to the `needs` array of the `build` job
- Keep the `status-check` job updated with the new `lint` job in its `needs`

**Verification Checklist:**
- [x] CI yml has a `lint` job running ESLint and Prettier check
- [x] CI test job runs `pnpm test:coverage`
- [x] `build` job depends on `lint-and-typecheck`, `lint`, and `test`
- [x] `status-check` includes all jobs
- [ ] CI pipeline passes locally with `act` or by pushing a test branch

**Testing Instructions:**
- Review the YAML for syntax correctness
- If possible, push to a test branch and verify the CI pipeline runs all jobs

**Commit Message Template:**
```
ci: add lint job and enforce coverage thresholds in CI

- New lint job runs ESLint and Prettier check
- Test job now runs with coverage enforcement
```

---

### Task 5: Add markdownlint Configuration

**Goal:** Add markdownlint to catch documentation formatting issues and prevent future drift in markdown structure.

**Files to Create:**
- `.markdownlint.json` - markdownlint configuration

**Files to Modify:**
- `package.json` - Add markdownlint-cli2 devDependency and script
- `.github/workflows/ci.yml` - Add markdown lint to the lint job (optional, can be pre-commit only)

**Prerequisites:** Task 3 complete (Husky configured)

**Implementation Steps:**
- Install: `pnpm add -D markdownlint-cli2`
- Create `.markdownlint.json` with reasonable defaults (disable rules that conflict with the project's style, e.g., line length if the project uses long lines)
- Add `lint:md` script to `package.json`: `"lint:md": "markdownlint-cli2 '**/*.md' '#node_modules'"`
- Add `*.md` to lint-staged config in `package.json` to run markdownlint on staged markdown files
- Run `pnpm run lint:md` and fix any violations in docs that will survive Phase 4

**Verification Checklist:**
- [x] `.markdownlint.json` exists
- [x] `pnpm run lint:md` passes
- [x] lint-staged includes markdown files

**Testing Instructions:**
- Run `pnpm run lint:md` and verify 0 errors
- Introduce a markdown violation (e.g., trailing whitespace) and verify lint-staged catches it

**Commit Message Template:**
```
ci(lint): add markdownlint for documentation quality

- Prevents markdown formatting drift
- Integrated with lint-staged pre-commit hook
```

## Phase Verification

- `pnpm run lint` passes with 0 errors
- `pnpm run format:check` passes
- `pnpm run lint:md` passes
- `pnpm test:coverage` passes with thresholds enforced
- `pnpm run check` passes
- Pre-commit hook catches lint/format issues
- Commit-msg hook rejects non-conventional commits
- CI pipeline includes lint, format check, type check, test with coverage, and build
