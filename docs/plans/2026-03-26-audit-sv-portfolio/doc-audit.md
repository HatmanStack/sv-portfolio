---
type: doc-health
date: 2026-03-26
prevention_scope: Markdown linting (markdownlint) + link checking (lychee)
language_stack: JS/TS and Python
---

# Documentation Audit: sv-portfolio

## Configuration
- **Prevention Scope:** Markdown linting (markdownlint) + link checking (lychee)
- **Language Stack:** JS/TS and Python (both)
- **Constraints:** None

## Summary
- Docs scanned: 22 files (README.md + 21 files in docs/)
- Code modules scanned: ~40 source files across src/
- Findings: 10 drift, 3 gaps, 2 stale, 0 broken links, 3 stale code examples, 0 config drift, 3 structure issues

## Findings

### DRIFT (doc exists, doesn't match code)

1. **`README.md:37`** - Tech Stack section
   - Doc says: `Build: Vite 5.4`
   - Code says: `"vite": "^8.0.0"` in `package.json:36`
   - Vite was upgraded to v8, README never updated.

2. **`README.md:38`** - Tech Stack section
   - Doc says: `Deployment: Static adapter for any static host`
   - Code says: deployment via AWS Amplify (`amplify.yml` present), not "any static host."
   - Deployment target is specific, not generic.

3. **`README.md:53`** - Project Structure tree
   - Doc lists: `/lib/hooks  # Custom hooks and utilities`
   - Actual hooks dir contains: `applyClickSound.js`, `useSound.js`, `useSound.svelte.ts` (plus test file)
   - README omits specific mention, but more critically lists `/lib/utils` as a directory. No `/lib/utils` directory exists in the codebase, nothing imports from `$lib/utils`.

4. **`docs/STRUCTURE.md:38-39`** - hooks directory listing
   - Doc says: `applyClickSound.js`, `useSound.js`, `useSound.svelte.ts`
   - Actual dir also contains: `useSound.svelte.test.ts`
   - Minor omission (test file), but consistent with stated convention.

5. **`docs/STRUCTURE.md:53-54`** - styles directory
   - Doc says: `/styles` contains `app.scss`
   - Actual file: `src/lib/styles/tokens.css` (no `app.scss` exists). Zero SCSS files exist anywhere in `src/`. The SCSS-to-CSS-custom-properties migration (Phase 3) was completed, but this doc was never updated.

6. **`docs/STRUCTURE.md:30-33`** - data directory listing
   - Doc lists only: `androidApps.ts`, `navigation.ts`, `webProjects.ts`
   - Actual dir contains 5 source files: `androidApps.ts`, `images.ts`, `navigation.ts`, `projects.ts`, `webProjects.ts`
   - `images.ts` and `projects.ts` are missing from the documented listing.

7. **`docs/TESTING.md:185-189`** - Coverage thresholds
   - Doc says: `Branches: 75%`
   - `vitest.config.ts:41` says: `branches: 70`
   - The actual threshold is 70%, not 75%.

8. **`docs/TESTING.md:264-266`** - CI/CD Node versions
   - Doc says: Tests run on `Both Node 18 and Node 20`
   - `.github/workflows/ci.yml:10` says: `NODE_VERSION: '24'` (single version, Node 24)
   - CI runs on Node 24 only, not 18/20.

9. **`docs/plans/README.md:14`** - Prerequisites
   - Doc says: `Node.js: v18+`
   - `package.json` uses Vite 8 and Vitest 4, which require Node 18+ at minimum but CI targets Node 24. The prerequisite is technically not wrong but misleadingly low given actual CI configuration.

10. **`docs/SECURITY_AUDIT.md:39`** - mdsvex version
    - Doc says: mdsvex updated to `0.12.6`
    - `package.json:40` says: `"mdsvex": "^0.12.7"`
    - Version has since been bumped beyond what the audit recorded. The security audit is a point-in-time snapshot, so this is expected drift.

### GAPS (code exists, no doc)

1. **`src/lib/data/images.ts`** - Exports `ImageGridItem[]` data used on the home page. Not documented in STRUCTURE.md data directory listing.

2. **`src/lib/data/projects.ts`** - Exports `projects` and `projectsRow2` arrays. Not documented in STRUCTURE.md data directory listing, even though STRUCTURE.md shows an import example referencing `$lib/data/projects`.

3. **`src/routes/sitemap.xml/+server.ts`** - Sitemap generation endpoint. No documentation mentions this route or its behavior anywhere in the docs.

### STALE (doc exists, code doesn't)

1. **`docs/STRUCTURE.md:54`** - References `app.scss` in `/lib/styles/` directory. File does not exist. All SCSS has been migrated to CSS custom properties; only `tokens.css` exists in that directory.

2. **`README.md:55`** - Project Structure tree lists `/lib/utils` as `# Helper functions`. This directory does not exist. No code imports from `$lib/utils`. The Quick Reference table in STRUCTURE.md:162 also references `/lib/utils/` with example `formatDate.ts`, which does not exist.

### BROKEN LINKS

No broken internal doc links found. All relative links (`./docs/STRUCTURE.md`, `./docs/PERFORMANCE.md`, etc.) resolve correctly.

### STALE CODE EXAMPLES

1. **`docs/STRUCTURE.md:178-179`** - Import examples section
   - Doc shows: `import { projects } from '$lib/data/projects';`
   - Actual import in `src/routes/+page.svelte:48`: `import { projects, projectsRow2 } from '$lib/data/projects.js';`
   - The `.js` extension is used in actual imports but omitted in the doc example. While SvelteKit resolves both, the doc doesn't match actual usage.

2. **`docs/STRUCTURE.md:162-163`** - Quick Reference table
   - Lists: `A utility function` goes to `/lib/utils/` with example `formatDate.ts`
   - The `/lib/utils/` directory does not exist. No utility functions exist at that path.

3. **`docs/TESTING.md:81-82`** - Store test example
   - Doc shows: `import { createAppStore } from './app.svelte';`
   - Actual store file: `src/lib/stores/app.svelte.ts` (file extension is `.svelte.ts`, not `.svelte`)
   - The import path in the example would not resolve correctly.

### CONFIG DRIFT

No environment variables are used in the codebase. No `.env` files or `.env.example` exist. No config drift detected.

### STRUCTURE ISSUES

1. **`docs/STRUCTURE.md:77`** - References `/components/layouts` subdirectory with note "(if needed)". This directory does not exist. This is speculative documentation for a directory that was never created.

2. **Excessive phase documentation** - 14 files in `docs/` are historical refactoring records (PHASE_6_AUDIT.md, PHASE_6_COMPLETE.md, PHASE_6_TESTING.md, PHASE_7_BUILD.md, PHASE_7_FUNCTIONAL_TESTING.md, PHASE_7_REVIEW_RESPONSE.md, FINAL_COMPREHENSIVE_REVIEW.md, PERFORMANCE_BASELINE.md, SECURITY_AUDIT.md, plus 7 phase plan files). These document a completed refactoring project, not the current application. They occupy significant doc surface area with point-in-time snapshots that are progressively drifting from reality (version numbers, bundle sizes, dependency lists).

3. **`docs/SECURITY_AUDIT.md`** - Lists specific dependency versions (svelte 5.43.10, sass 1.94.1, etc.) that have since been updated in `package.json` (svelte ^5.54.0, sass ^1.98.0). The audit is dated November 2025 and represents a stale security posture, not the current one. The pnpm overrides section also only mentions `cookie` but `package.json` now also overrides `devalue`.
