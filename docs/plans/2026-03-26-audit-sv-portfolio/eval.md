---
type: repo-eval
target: 9
role_level: Senior Developer
date: 2026-03-26
pillar_overrides:
  # None — require 9/10 on all 12 pillars
---

# Repo Evaluation: sv-portfolio

## Configuration
- **Role Level:** Senior Developer — production: defensive coding, observability, performance awareness, type rigor
- **Focus Areas:** None — balanced evaluation across all pillars
- **Exclusions:** Standard exclusions (vendor, generated, node_modules, __pycache__)

## Combined Scorecard

| # | Lens | Pillar | Score | Target | Status |
|---|------|--------|-------|--------|--------|
| 1 | Hire | Problem-Solution Fit | 8/10 | 9 | NEEDS WORK |
| 2 | Hire | Architecture | 7/10 | 9 | NEEDS WORK |
| 3 | Hire | Code Quality | 6/10 | 9 | NEEDS WORK |
| 4 | Hire | Creativity | 8/10 | 9 | NEEDS WORK |
| 5 | Stress | Pragmatism | 7/10 | 9 | NEEDS WORK |
| 6 | Stress | Defensiveness | 6/10 | 9 | NEEDS WORK |
| 7 | Stress | Performance | 7/10 | 9 | NEEDS WORK |
| 8 | Stress | Type Rigor | 5/10 | 9 | NEEDS WORK |
| 9 | Day 2 | Test Value | 7/10 | 9 | NEEDS WORK |
| 10 | Day 2 | Reproducibility | 7/10 | 9 | NEEDS WORK |
| 11 | Day 2 | Git Hygiene | 5/10 | 9 | NEEDS WORK |
| 12 | Day 2 | Onboarding | 7/10 | 9 | NEEDS WORK |

**Pillars at target (>=9):** 0/12
**Pillars needing work (<9):** 12/12

## Hire Evaluation -- The Pragmatist

### VERDICT
- **Decision:** CAUTIOUS HIRE
- **Overall Grade:** B
- **One-Line:** Solves the right problem with the right tools, strong visual craft, but CSS duplication and a dual sound API signal incomplete refactoring discipline.

### SCORECARD
| Pillar | Score | Evidence |
|--------|-------|----------|
| Problem-Solution Fit | 8/10 | `package.json:1-50` -- SvelteKit + adapter-static + MDSvex is the right stack for a portfolio with a blog. Only 3 runtime deps. `vite.config.ts:8-37` -- terser minification, manual chunking, precompression all show production awareness. |
| Architecture | 7/10 | `src/lib/types/index.ts:1-324` -- centralized type system with domain, component prop, and store types cleanly separated. `src/lib/hooks/useSound.js` vs `src/lib/hooks/useSound.svelte.ts` -- two parallel sound implementations (legacy JS action + Svelte 5 runes store) both in production use. |
| Code Quality | 6/10 | `src/routes/web/+page.svelte:119-453` and `src/routes/read/+page.svelte:82-224` -- glow-filter, header-text, and animation keyframes duplicated verbatim across 3+ route files. `src/routes/read/post/[slug]/+page.svelte:94-157` -- SVG filter duplicated inline instead of using the existing `SVGFilters.svelte` component. |
| Creativity | 8/10 | `src/lib/components/ui/ImageGrid.svelte:70-78` -- scroll-driven `animation-timeline: scroll()` with `@supports` progressive enhancement and `prefers-reduced-motion` guard is thoughtful. `src/routes/android/+page.svelte:153-209` -- pure CSS `:has()` selectors driving grid column animations with no JS, clean state machine via radio inputs. |

### HIGHLIGHTS
- **Brilliance:**
  - `/src/routes/android/+page.svelte:53-78` -- The android gallery uses native radio inputs + CSS `:has()` for a fully declarative state machine. No JavaScript state transitions needed for the grid animation. This is elegant and performant.
  - `/src/lib/components/ui/ImageGrid.svelte:70-78` -- Using `animation-timeline: scroll(root block)` with progressive enhancement (`@supports`) and a reduced-motion media query. This is a modern CSS technique applied responsibly.
  - `/src/lib/components/ui/GooeyButton.svelte:18-35` -- The trigonometric intro animation (`Math.cos`/`Math.sin` at 60fps intervals) creating an orbiting glow effect is inventive. The cleanup in the `$effect` return is correct.
  - `/src/lib/stores/app.svelte.ts:1-131` -- Clean Svelte 5 runes-based store with proper SSR guards (`typeof localStorage`, `typeof window`, `typeof document`), graceful JSON parse error handling, and system theme change listener.

- **Concerns:**
  - `/src/lib/hooks/useSound.js` and `/src/lib/hooks/useSound.svelte.ts` -- Two completely separate sound implementations coexist. The legacy `useSound.js` is a Svelte action pattern; the newer `useSound.svelte.ts` is a runes-based store pattern. Both are imported across different routes. This is a migration left incomplete.
  - `/src/routes/web/+page.svelte:141-198`, `/src/routes/read/+page.svelte:179-221`, `/src/routes/read/post/[slug]/+page.svelte:229-288` -- The `.glow-filter`, `.header-text`, and `@keyframes onloadscale`/`onloadopacity` styles are copy-pasted identically. This should be a shared component or global styles.
  - `/src/routes/read/post/[slug]/+page.svelte:94-157` -- The entire SVG filter definition is duplicated inline even though `SVGFilters.svelte` exists as a reusable component (used correctly in `/web` and `/read` list pages).
  - `/src/routes/+page.svelte:53-65` -- Firefox users get silently redirected to `/read` on first visit with `sessionStorage` gating. No user notice, no opt-out. A UX decision that should at minimum be commented with rationale.
  - `/src/routes/+layout.svelte:7` -- `children: any` in the layout Props interface. Svelte 5 has `Snippet` types for this.
  - `/src/lib/data/webProjects.ts:88-91` -- `webContentMap` is typed as `Record<string, any>`, losing all type safety on the map that drives the web route's content rendering.

### REMEDIATION TARGETS

- **Problem-Solution Fit (current: 8/10, target: 9/10)**
  - Remove the unused `run` dependency from `package.json:42` (npm package called "run" with no imports found in source)
  - Remove `package-lock.json` since the project uses pnpm (`pnpm-lock.yaml` is present)
  - Estimated complexity: LOW

- **Architecture (current: 7/10, target: 9/10)**
  - Consolidate the dual sound API: migrate all `useSound.js` (action-based) consumers to `useSound.svelte.ts` (runes-based), then delete the legacy file. Files affected: `src/routes/Header.svelte`, `src/routes/web/+page.svelte`, `src/routes/android/+page.svelte`, `src/routes/read/+page.svelte`, `src/routes/read/post/[slug]/+page.svelte`, `src/lib/hooks/applyClickSound.js`
  - Extract the glow text heading into a shared component (e.g., `GlowHeading.svelte`) that accepts `text` and `size` props, used across `/web`, `/read`, `/android`, and `/read/post/[slug]`
  - Estimated complexity: MEDIUM

- **Code Quality (current: 6/10, target: 9/10)**
  - Extract duplicated CSS (`.glow-filter`, `.header-text`, `@keyframes onloadscale`, `@keyframes onloadopacity`, paragraph gradient text styles) into either `tokens.css` or a shared `glow-text.css` imported by routes that need it. Currently duplicated in at least 4 files.
  - Replace the inline SVG filter in `/src/routes/read/post/[slug]/+page.svelte:94-157` with the existing `<SVGFilters />` component import
  - Fix `any` types: `+layout.svelte:7` should use `import type { Snippet } from 'svelte'`; `webProjects.ts:91` and `androidApps.ts:74` content maps should use union types (`WebProject | { title: string }`) instead of `Record<string, any>`
  - Add a code comment explaining the Firefox redirect logic in `+page.svelte:53-65`, or better, extract it to a utility with a documented reason
  - Estimated complexity: MEDIUM

- **Creativity (current: 8/10, target: 9/10)**
  - The `/about` page (`src/routes/about/+page.svelte:47-59`) is minimal compared to the craft shown elsewhere. Four social links and "the Good stuff" as a heading. Consider applying the same visual ingenuity seen in other routes (the scroll animation, the 3D perspective, the glow effects) to make this page feel like it belongs in the same portfolio.
  - The `applyClickSound.js` action (`src/lib/hooks/applyClickSound.js`) does not call `destroy()` on the inner sound actions it creates, which means event listeners on links accumulate if the parent node re-renders. Add cleanup logic.
  - Estimated complexity: LOW

---

## Stress Evaluation -- The Oncall Engineer

### VERDICT
- **Decision:** MID-LEVEL
- **Seniority Alignment:** Solid mid-level frontend work. Strong visual craft with CSS animations and scroll-driven effects. Type system and defensive coding trail behind what I would expect from a senior claiming production awareness.
- **One-Line:** "Beautiful portfolio site with good SSG defaults, but the type system has escape hatches and `@html` with user-adjacent data would keep me uneasy."

### SCORECARD
| Pillar | Score | Evidence |
|--------|-------|----------|
| Pragmatism | 7/10 | `vite.config.ts:28-34` -- manual chunk splitting, terser config, and precompression show awareness of build perf. `package.json:42` -- the `run` dependency (`^1.5.0`) is unused dead weight; no import references exist anywhere in `src/`. |
| Defensiveness | 6/10 | `src/routes/read/+page.js:4-14` -- blog post loader validates structure, handles null, catches parse errors with graceful fallback to empty array. `src/routes/about/+page.svelte:53-56` -- four `target="_blank"` links missing `rel="noopener noreferrer"`, creating a tab-nabbing vector. `src/lib/hooks/applyClickSound.js:11-17` -- event listeners are attached to child anchors but never cleaned up on destroy (only `update` is returned, no `destroy`), leaking listeners on route changes. |
| Performance | 7/10 | `src/lib/data/images.ts:1-80` -- 48 image imports (including GIFs) all loaded eagerly at module level; while `loading="lazy"` is on img tags (`ImageGrid.svelte:22`), the module-level imports still cause all assets to be processed by the bundler upfront. `src/lib/components/ui/GooeyButton.svelte:23-34` -- `setInterval` at 16ms (~60fps) for intro animation; properly cleaned up in `$effect` return (`line:45-49`), which is good. `src/lib/components/ui/ImageGrid.svelte:70-78` -- scroll-driven animations gated behind `@supports (animation-timeline: scroll())` and `prefers-reduced-motion`, which is production-aware. |
| Type Rigor | 5/10 | `src/lib/types/index.ts:233` -- `children?: any` on GooeyButtonProps; Svelte 5 has `Snippet` for this. `src/lib/data/webProjects.ts:91` -- `as Record<string, any>` cast on `webContentMap` erases the `WebProject` type, meaning any property access on the map is untyped. Same pattern at `src/lib/data/androidApps.ts:74`. `src/lib/types/index.ts:119` -- `date: string` on BlogPost; no branded type or Date validation, so "March 2025" and "2025-03-25" are equally valid at compile time but sort differently at runtime. |

### CRITICAL FAILURE POINTS
- **XSS via `@html`**: `src/routes/web/+page.svelte:60` renders `webContentMap[selectedImage].description` as raw HTML. While the data is hardcoded today (`src/lib/data/webProjects.ts:50` contains `<a href=...>` HTML), there is no sanitization layer. If the data source ever becomes dynamic (CMS, API), this is an injection point. The same pattern exists for JSON-LD blocks across all routes, though those use `JSON.stringify` which is safe.
- **Missing `rel="noopener noreferrer"`**: `src/routes/about/+page.svelte:53-56` -- all four external links open in new tabs without `rel="noopener"`. Minor on modern browsers (most now imply `noopener`), but still a best-practice gap.
- **Memory leak in `applyClickSound`**: `src/lib/hooks/applyClickSound.js:11-28` -- the action attaches click listeners to all anchor children but provides no `destroy()` method. On SPA navigation, old listeners accumulate. Additionally, `useSound` at module scope (`line:4`) creates a single `Audio` instance shared across all usages, which could cause playback conflicts if rapid clicks overlap.

### HIGHLIGHTS
- **Brilliance:**
  - `src/lib/stores/app.svelte.ts:57-76` -- localStorage persistence with `try/catch` around `JSON.parse`, graceful fallback with `console.warn`, and SSR guards (`typeof localStorage !== 'undefined'`). This is the right defensive pattern.
  - `src/routes/sitemap.xml/+server.ts:15` -- `encodeURIComponent` on blog slugs in the sitemap. Small detail, easy to miss, prevents malformed URLs.
  - `svelte.config.js:14` -- `precompress: true` for Brotli/gzip at build time. Combined with `adapter-static` and prerender config, the deploy story is solid for a static site.
  - `src/lib/components/ui/ImageGrid.svelte:70-78` -- Progressive enhancement: animations only activate when `animation-timeline: scroll()` is supported AND reduced motion is not preferred. This is textbook graceful degradation.
  - `vitest.config.ts:38-43` -- Coverage thresholds set at 80/70/80/80. This is real commitment to test quality.

- **Concerns:**
  - `src/routes/+page.svelte:53-65` -- Firefox users get silently redirected to `/read` on first visit. This is browser-sniffing (`navigator.userAgent.includes("Firefox")`), which is brittle and confusing. No error message, no explanation, no opt-out. A user on Firefox ESR or Firefox forks hits different behavior with no diagnostic trail.
  - `src/lib/hooks/useSound.js` and `src/lib/hooks/useSound.svelte.ts` -- two parallel implementations of the same concept (one plain JS, one Svelte runes). The JS version is used in `Header.svelte` and page components via `use:` actions, while the `.svelte.ts` version is used in `ProjectCard.svelte`. This dual implementation increases maintenance surface and confusion.
  - `src/routes/read/post/[slug]/+page.js:3` -- Dynamic `import()` with user-controlled `params.slug`. SvelteKit's routing constrains this, but the pattern `await import(`../${params.slug}.md`)` relies entirely on the framework to prevent path traversal. No explicit slug validation (e.g., regex check for alphanumeric-and-hyphens).

### REMEDIATION TARGETS

- **Pragmatism (current: 7/10, target: 9/10)**
  - Remove the `run` dependency from `package.json`; it is unused.
  - Consolidate the dual `useSound` implementations (`useSound.js` and `useSound.svelte.ts`) into one. Pick the runes version since the project is Svelte 5.
  - Remove the Firefox UA sniffing redirect in `+page.svelte:53-65` or document why scroll-driven animations require it (with a proper feature detect, not UA string matching).
  - Files: `package.json`, `src/lib/hooks/useSound.js`, `src/lib/hooks/useSound.svelte.ts`, `src/routes/+page.svelte`
  - Estimated complexity: LOW

- **Defensiveness (current: 6/10, target: 9/10)**
  - Add `rel="noopener noreferrer"` to all `target="_blank"` links in `src/routes/about/+page.svelte:53-56`.
  - Add a `destroy()` method to `applyClickSound.js` that removes all attached event listeners.
  - Add slug validation in `src/routes/read/post/[slug]/+page.js` (e.g., `/^[a-z0-9-]+$/i.test(params.slug)`) before the dynamic import.
  - Consider DOMPurify or equivalent if `@html` rendering of descriptions ever moves to dynamic data sources (`src/routes/web/+page.svelte:60`).
  - Files: `src/routes/about/+page.svelte`, `src/lib/hooks/applyClickSound.js`, `src/routes/read/post/[slug]/+page.js`, `src/routes/web/+page.svelte`
  - Estimated complexity: LOW

- **Performance (current: 7/10, target: 9/10)**
  - Consider dynamic imports or code-splitting for the 48 image assets in `src/lib/data/images.ts`. Even with lazy `<img>` loading, the module graph pulls all references into the home page chunk.
  - Audit GIF usage (many of the image grid items are `.gif`). Convert to WebM/MP4 video elements or animated AVIF where possible for significant size reduction.
  - The `will-change: transform, filter, rotateY, width` on `.item` in `src/routes/web/+page.svelte:261` promotes every slice to its own compositor layer. With 8 items this is fine, but `will-change` should be applied on hover/focus rather than statically to avoid unnecessary GPU memory consumption on lower-end devices.
  - Files: `src/lib/data/images.ts`, `src/routes/web/+page.svelte`
  - Estimated complexity: MEDIUM

- **Type Rigor (current: 5/10, target: 9/10)**
  - Replace `children?: any` in `GooeyButtonProps` and `+layout.svelte Props` with Svelte 5's `Snippet` type.
  - Remove the `as Record<string, any>` casts in `webProjects.ts:91` and `androidApps.ts:74`. Define proper types for the content maps (e.g., `Record<string, WebProject | { title: string }>`).
  - Add a branded `Slug` type or at minimum a `BlogPost['date']` as an ISO date string branded type to catch format mismatches at compile time.
  - Reduce `any` usage in test files; while less critical than production code, the 30+ `any` casts in tests mask potential type regressions.
  - Files: `src/lib/types/index.ts`, `src/lib/data/webProjects.ts`, `src/lib/data/androidApps.ts`, `src/routes/+layout.svelte`
  - Estimated complexity: MEDIUM

---

## Day 2 Evaluation -- The Team Lead

### VERDICT
- **Decision:** COLLABORATOR
- **Collaboration Score:** Med
- **One-Line:** Solid test infrastructure and CI for a portfolio site, but inconsistent commit discipline and no linting gate weaken the safety net.

### SCORECARD
| Pillar | Score | Evidence |
|--------|-------|----------|
| Test Value | 7/10 | 20 test files across data, components, stores, routes. `src/lib/stores/app.svelte.test.ts` tests real behavior (persistence, theme side-effects, corrupted data handling). `src/lib/test-utils/setup.test.ts:14` has a placeholder `expect(true).toBe(true)`. No e2e tests. |
| Reproducibility | 7/10 | CI at `.github/workflows/ci.yml` runs typecheck, test, build with frozen lockfile. `pnpm-lock.yaml` committed. No linter (no eslint/prettier config). No pre-commit hooks. No Dockerfile or devcontainer. |
| Git Hygiene | 5/10 | Mixed quality. Good: `mobile: fix /read/post title overlap` (atomic, descriptive). Bad: `blog update`, `new post`, `lock file`, `updated link` (repeated vague messages). `1ce2afb` touches 27 files / 4529 insertions in one commit. Multiple git identity aliases (HatmanStack, Hatmanstack, hatmanstack). |
| Onboarding | 7/10 | `README.md` has setup steps, project structure, tech stack, links to docs. `docs/TESTING.md` covers test commands and organization. Missing: `.env.example`, `CONTRIBUTING.md`, no explanation of the Amplify deployment pipeline, no "how to deploy" section. |

### RED FLAGS
- **Placeholder test**: `src/lib/test-utils/setup.test.ts:14` contains `expect(true).toBe(true)`. This is exactly the pattern that erodes trust in a test suite.
- **Mega-commit**: `1ce2afb` ("ci: add release workflow and claude-forge skills") touches 27 files with 4,529 insertions. This is unreviewable and impossible to bisect.
- **No linter in pipeline**: CI runs `svelte-check` for types but has no ESLint or Prettier. Style drift is inevitable with multiple contributors.
- **No pre-commit hooks**: Nothing prevents bad code from being committed locally.
- **Vague commit messages**: At least 8 of the last 30 commits use messages like "blog update", "new post", "updated link" with no context about what changed or why.
- **Git identity fragmentation**: The same author appears as HatmanStack (84), Hatmanstack (61), and hatmanstack (4), making `git blame` less useful.
- **No `.env.example`**: `.gitignore` references `.env` files but no template exists for required variables (if any).

### HIGHLIGHTS
- **Process Win:** Well-structured test utilities at `src/lib/test-utils/`. The `mock-factories.ts` file uses typed factory functions with partial overrides, which is a pattern that scales and prevents brittle test data. `store-helpers.ts` provides reusable mock implementations for localStorage and matchMedia.
- **Process Win:** CI pipeline at `.github/workflows/ci.yml` enforces a correct gate: typecheck and test must pass before build runs. The `status-check` job with `if: always()` prevents silent failures.
- **Process Win:** Tests cover real behavior, not just structure. `app.svelte.test.ts` tests corrupted localStorage handling, theme system preference resolution, and CSS variable side-effects. `page-load.test.js` validates sort order and slug extraction from actual data.
- **Maintenance Drag:** The `docs/` directory has 14 files, many of which are phase-specific audit artifacts (`PHASE_6_AUDIT.md`, `PHASE_7_BUILD.md`, etc.) that will confuse new contributors looking for current documentation. These are historical artifacts, not living docs.

### REMEDIATION TARGETS

- **Git Hygiene (current: 5/10, target: 9/10)**
  - Adopt conventional commit format consistently. The codebase already uses it sporadically (`chore:`, `fix:`, `mobile:`), but blog/content commits ignore it entirely.
  - Add a commit-msg hook (via Husky or similar) to enforce the pattern.
  - Consolidate git identity to a single author name.
  - Break large commits into reviewable units. The 4,529-line commit should have been at least 3 separate PRs (CI config, skills config, content).
  - Estimated complexity: LOW

- **Test Value (current: 7/10, target: 9/10)**
  - Remove the `expect(true).toBe(true)` placeholder in `src/lib/test-utils/setup.test.ts:14`. Replace with an actual assertion or delete the test case.
  - Add at least one e2e test (Playwright) for a critical user path (e.g., navigating between routes, theme toggle persistence).
  - Add the blog post slug/[slug] route test (`src/routes/read/post/[slug]/page-load.test.js`) to validate dynamic route resolution.
  - Run `pnpm test:coverage` in CI and fail on threshold violations (thresholds are already defined in `vitest.config.ts` but not enforced in CI).
  - Estimated complexity: MEDIUM

- **Reproducibility (current: 7/10, target: 9/10)**
  - Add ESLint and Prettier configurations. Wire them into both CI and a pre-commit hook.
  - Add `.husky/pre-commit` with lint-staged to catch formatting issues before commit.
  - Consider adding a `.devcontainer/devcontainer.json` for consistent dev environments, given the Node 24 requirement is non-trivial.
  - Add `pnpm test:coverage` to the CI test job (coverage thresholds exist but are not enforced in CI).
  - Estimated complexity: LOW

- **Onboarding (current: 7/10, target: 9/10)**
  - Add a `CONTRIBUTING.md` with branch strategy, commit conventions, and PR process.
  - Clean up `docs/` by archiving or removing phase-specific files (`PHASE_6_*`, `PHASE_7_*`, `FINAL_COMPREHENSIVE_REVIEW.md`). Keep only `STRUCTURE.md`, `TESTING.md`, and `PERFORMANCE.md` as living docs.
  - Add `.env.example` if any environment variables are needed, or note in README that none are required.
  - Document the Amplify deployment pipeline (the `amplify.yml` exists but is never mentioned in README or docs).
  - Estimated complexity: LOW

---

## Consolidated Remediation Targets

Merged and deduplicated across all 3 evaluators, ordered by lowest score first:

### Type Rigor (5/10) + Code Quality (6/10) -- Type Safety Overhaul
- Replace all `any` types with proper types: `children: Snippet`, content maps with union types, branded date strings
- Remove `as Record<string, any>` casts in `webProjects.ts` and `androidApps.ts`
- Reduce `any` in test files
- Files: `src/lib/types/index.ts`, `src/lib/data/webProjects.ts`, `src/lib/data/androidApps.ts`, `src/routes/+layout.svelte`
- Complexity: MEDIUM

### Git Hygiene (5/10) -- Commit Discipline
- Enforce conventional commits via commit-msg hook
- Consolidate git identity
- Complexity: LOW

### Defensiveness (6/10) -- Security Hardening
- Add `rel="noopener noreferrer"` to about page links
- Add `destroy()` to `applyClickSound.js`
- Validate slugs before dynamic import
- Files: `src/routes/about/+page.svelte`, `src/lib/hooks/applyClickSound.js`, `src/routes/read/post/[slug]/+page.js`
- Complexity: LOW

### Code Quality (6/10) -- CSS/Component Deduplication
- Extract shared CSS (glow-filter, header-text, keyframes) to shared stylesheet
- Replace inline SVG filter with `<SVGFilters />` component
- Extract glow heading into shared component
- Files: multiple route pages, `src/lib/components/ui/`
- Complexity: MEDIUM

### Architecture (7/10) + Pragmatism (7/10) -- Sound API Consolidation
- Migrate all consumers from `useSound.js` to `useSound.svelte.ts`
- Delete legacy `useSound.js` and `applyClickSound.js`
- Files: `src/lib/hooks/`, `src/routes/Header.svelte`, all route pages
- Complexity: MEDIUM

### Reproducibility (7/10) -- Dev Tooling
- Add ESLint + Prettier config
- Add pre-commit hooks (Husky + lint-staged)
- Enforce coverage thresholds in CI
- Complexity: LOW

### Test Value (7/10) -- Test Quality
- Remove placeholder test
- Add e2e tests (Playwright)
- Enforce coverage in CI
- Complexity: MEDIUM

### Onboarding (7/10) -- Documentation
- Add CONTRIBUTING.md
- Clean up stale phase docs
- Document Amplify deployment
- Complexity: LOW

### Performance (7/10) -- Asset Optimization
- Code-split image imports
- Convert GIFs to video/animated AVIF
- Apply `will-change` conditionally
- Complexity: MEDIUM

### Problem-Solution Fit (8/10) + Creativity (8/10) -- Polish
- Remove unused `run` dependency
- Remove stale `package-lock.json`
- Enhance about page visual treatment
- Complexity: LOW
