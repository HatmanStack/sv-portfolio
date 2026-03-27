---
type: repo-health
date: 2026-03-26
goal: General health check
---

# Codebase Health Audit: sv-portfolio

## Configuration
- **Goal:** General health check — scan all 4 vectors equally
- **Scope:** Full repo, no constraints
- **Existing Tooling:** Full setup — linters, CI pipeline, pre-commit hooks, type checking
- **Deployment Target:** Serverless (Lambda, Cloud Functions)
- **Constraints:** None

## Summary
- Overall health: FAIR
- Biggest structural risk: SVG filter markup duplicated across 4 files (3 full copies plus 1 component that should replace them all), and CSS design tokens/styles copy-pasted across multiple route pages
- Biggest operational risk: Unvalidated user-controlled content rendered via `{@html}` in the web projects page, combined with credentials embedded in static data
- Total findings: 1 critical, 5 high, 9 medium, 7 low

## Tech Debt Ledger

### CRITICAL
1. **[Operational Debt]** `src/routes/web/+page.svelte:60`
   - **The Debt:** `{@html webContentMap[selectedImage].description}` renders raw HTML from `webProjects.ts` data. The `description` field in `src/lib/data/webProjects.ts:50` and `src/lib/data/webProjects.ts:74` contains inline `<a>` and `<b>` tags with `href` attributes. While the data is currently static, this pattern renders arbitrary HTML without sanitization. If project data ever becomes dynamic (CMS, API, user-contributed), this is an XSS vector. The `webContentMap` is typed as `Record<string, any>` (line 91), providing zero type safety on what `.description` contains.
   - **The Risk:** Direct XSS vulnerability if the data source changes. The `as Record<string, any>` cast erases all type checking, so there is no compile-time guard against injecting unexpected properties.

### HIGH
1. **[Operational Debt]** `src/lib/data/projects.ts:72`
   - **The Debt:** Hardcoded credentials in static source: `Login: guest@hatstack.fun / Guest@123` in the RAGStack project description. This is committed to the public repository.
   - **The Risk:** Even if these are demo credentials, they train the pattern of embedding secrets in source. Credential scanners flag this, and if these credentials are reused anywhere, they are fully exposed.

2. **[Operational Debt]** npm audit reports 9 vulnerabilities (5 high, 3 moderate, 1 low)
   - **The Debt:** Vulnerable versions of `picomatch` (ReDoS + method injection), `rollup` (arbitrary file write via path traversal), `svelte` (5 SSR XSS vectors including attribute spreading and `<svelte:element>` tag name injection)
   - **The Risk:** The Svelte SSR XSS vulnerabilities are particularly relevant since this project prerenders pages. The rollup path traversal affects the build toolchain. All are fixable via `npm audit fix`.

3. **[Structural Debt]** `src/routes/android/+page.svelte:57`
   - **The Debt:** Uses legacy Svelte event syntax `on:change="{() => ...}"` instead of the Svelte 5 `onchange` attribute pattern used in the rest of the codebase.
   - **The Risk:** Inconsistent event binding paradigm within the same codebase. This will become a deprecation issue as Svelte moves forward with runes-only mode.

4. **[Code Hygiene Debt]** `src/lib/data/webProjects.ts:88-91` and `src/lib/data/androidApps.ts:71-74`
   - **The Debt:** Both `webContentMap` and `androidContentMap` use `as Record<string, any>` type assertions with a seed object that has a different shape than the typed entities (`WebProject` / `AndroidApp`). The seed `{ 'Splash': { title: 'Web Stuff' } }` does not conform to `WebProject`.
   - **The Risk:** Type safety is completely erased for these maps. Any property access (`.description`, `.link`, `.webLink`) on the seed entries returns `undefined` at runtime with no compile-time warning.

5. **[Architectural Debt]** `src/lib/data/navigation.ts` (entire file)
   - **The Debt:** Contains SVG icon markup as raw HTML strings duplicating the exact same SVG icons that are already rendered inline in `src/routes/Header.svelte`. The `navigationItems` export is never imported by any non-test file.
   - **The Risk:** Dead production code that must be manually kept in sync with the actual Header SVGs. It currently drifts (uses `var(--focus-t)` instead of `var(--color-nav-focus-alt)` used in Header.svelte).

### MEDIUM
1. **[Structural Debt]** `src/lib/components/ui/SVGFilters.svelte`, `src/routes/read/post/[slug]/+page.svelte:94-156`, `src/routes/+page.svelte:90-99`
   - **The Debt:** The `glow-4` SVG filter definition is copy-pasted in 3 places: the `SVGFilters.svelte` component, inline in the blog post template, and a simplified `goo` filter in `+page.svelte`. The `SVGFilters` component exists specifically to be a single source, but the blog post page does not use it.
   - **The Risk:** Filter drift. The `AndroidFilters.svelte` already has a different (simplified) version of the same filter, but shares the same `id="glow-4"`, which means the last one rendered wins.

2. **[Structural Debt]** `src/routes/web/+page.svelte:119-128`, `src/routes/read/+page.svelte:83-91`, `src/routes/android/+page.svelte:83-92`
   - **The Debt:** CSS custom properties `--text-color`, `--accent-color`, `--transition-speed`, `--border-radius`, `--box-shadow`, `--index`, `--transition` are redeclared on `:root` independently in multiple route pages with identical values.
   - **The Risk:** Maintenance burden. Changing a design token requires editing 3+ files. These should live in a single global stylesheet or CSS layer.

3. **[Structural Debt]** `src/routes/web/+page.svelte:140-208`, `src/routes/read/+page.svelte:179-221`, `src/routes/read/post/[slug]/+page.svelte:229-288`
   - **The Debt:** The `.glow-filter`, `.header-text`, `.glow-filter::before`, `@keyframes onloadscale`, and `@keyframes onloadopacity` CSS blocks are identically duplicated across 3 route pages (web, read, blog post).
   - **The Risk:** Same as above. Any visual change to the glow text effect requires 3 synchronized edits.

4. **[Architectural Debt]** `src/lib/hooks/useSound.js` and `src/lib/hooks/useSound.svelte.ts`
   - **The Debt:** Two parallel sound hook implementations exist. `useSound.js` (plain JS, Svelte action pattern) is used by `Header.svelte`, `web/+page.svelte`, `android/+page.svelte`, `read/+page.svelte`, and `applyClickSound.js`. `useSound.svelte.ts` (TypeScript, Svelte 5 runes pattern with `$state`) is used by `ProjectCard.svelte`. They serve the same purpose with different APIs.
   - **The Risk:** Behavioral inconsistency. The `.js` version catches and logs errors; the `.svelte.ts` version sets an error state and also logs. The `.js` version has no `isLoaded` guard before playing (it plays immediately); the `.svelte.ts` version waits for `canplaythrough`. Bug fixes applied to one implementation won't reach the other.

5. **[Code Hygiene Debt]** `src/routes/+layout.svelte:7`
   - **The Debt:** `children: any` in the Props interface. The Svelte 5 `Snippet` type should be used instead.
   - **The Risk:** No type safety on the layout's slot content.

6. **[Operational Debt]** `src/routes/+page.svelte:51-65`
   - **The Debt:** Firefox users are force-redirected to `/read` on first visit via `sessionStorage`. The scroll container is also hidden with `display: none`. This affects all Firefox users unconditionally.
   - **The Risk:** Entire homepage experience is bypassed for a browser with ~3% market share. The scroll-driven animation API that this works around has been supported in Firefox since v128 (July 2024). This workaround may no longer be necessary.

7. **[Code Hygiene Debt]** `src/lib/components/icons/LinkedIn.svelte`
   - **The Debt:** This icon component is never imported by any production code. The only reference is its own test file `LinkedIn.test.ts`.
   - **The Risk:** Dead code. Tests are passing for code that is never used.

8. **[Structural Debt]** `src/routes/web/+page.svelte:74-108`
   - **The Debt:** The entire `.item` div block is duplicated inside an `{#if expand_sound}...{:else}...{/if}` conditional. The only difference is the presence of `use:expand_sound`. The same pattern occurs with `click_sound` at lines 64-68.
   - **The Risk:** Any change to the item markup requires two edits in two branches. A null-safe action wrapper would eliminate the duplication entirely.

9. **[Operational Debt]** `src/routes/about/+page.svelte:53-56`
   - **The Debt:** Four external links use `target="_blank"` without `rel="noopener noreferrer"`. All other external links in the codebase correctly include both attributes.
   - **The Risk:** Minor security concern (reverse tabnapping) and inconsistency with the pattern used everywhere else.

### LOW
1. **[Code Hygiene Debt]** `package.json` dependencies
   - **The Debt:** `"run": "^1.5.0"` is listed as a production dependency but is never imported anywhere in the source code.
   - **The Risk:** Unnecessary dependency increasing install size and attack surface.

2. **[Code Hygiene Debt]** `package.json` lock file inconsistency
   - **The Debt:** Both `package-lock.json` and `pnpm-lock.yaml` exist. `package-lock.json` is gitignored but `pnpm-lock.yaml` is tracked. The CI and Amplify builds use pnpm, which is correct, but `package-lock.json` exists on disk suggesting npm has been run locally.
   - **The Risk:** Potential dependency version drift between local development and CI.

3. **[Code Hygiene Debt]** `src/routes/Header.svelte:194`
   - **The Debt:** `width: em;` is syntactically invalid CSS (missing a value before the unit). Should be `width: Xem;` with a numeric value.
   - **The Risk:** The browser ignores this declaration silently, falling back to `min-width: 3em` on line 195. Likely harmless but indicates a copy-paste error.

4. **[Code Hygiene Debt]** `src/routes/+page.svelte:43`, `src/routes/+page.svelte:119-121`
   - **The Debt:** `import '../app.css'` is done in both `+layout.svelte:2` and `+page.svelte:43`. CSS should only be imported once in the layout.
   - **The Risk:** Double import of global styles. Svelte Kit deduplicates this at build time, so it has no runtime effect, but it is misleading.

5. **[Code Hygiene Debt]** `src/routes/+page.svelte:119-121`
   - **The Debt:** `.portfolio-container` sets `background-image: var(--bg-color)` followed immediately by `background: transparent`. The `background` shorthand overrides the preceding `background-image`.
   - **The Risk:** Dead CSS declaration that obscures intent.

6. **[Code Hygiene Debt]** `src/lib/hooks/useSound.svelte.ts:68-84`
   - **The Debt:** `useSoundAction` calls `event.preventDefault()` on click events. This prevents default link navigation for any element this action is applied to.
   - **The Risk:** If applied to an anchor tag, it silently breaks navigation. Currently only used via `ProjectCard` which applies it to a button, so the risk is latent.

7. **[Code Hygiene Debt]** `src/routes/read/post/[slug]/+page.js:3`
   - **The Debt:** Dynamic import path `await import(\`../${params.slug}.md\`)` uses unsanitized URL parameter. While Vite's `import()` restricts to the file system and SvelteKit validates route params, the slug is used directly without path traversal validation.
   - **The Risk:** Low due to Vite's module resolution constraints, but defense in depth would validate the slug matches `[a-zA-Z0-9-]+` before importing.

## Quick Wins
1. `src/routes/about/+page.svelte:53-56` - Add `rel="noopener noreferrer"` to 4 external links (estimated effort: < 5 minutes)
2. `package.json` - Remove unused `"run": "^1.5.0"` dependency (estimated effort: < 5 minutes)
3. `src/routes/Header.svelte:194` - Fix `width: em;` to a valid CSS value (estimated effort: < 5 minutes)

## Automated Scan Results
- **Dead code (knip):** Failed to run due to missing `@sveltejs/kit/vite` module in the knip resolution context. Manual analysis found: `src/lib/components/icons/LinkedIn.svelte` (unused component), `src/lib/data/navigation.ts` (unused in production), `useSound.svelte.ts:useSoundAction` (exported but only `createSoundStore` is consumed), `run` npm dependency (never imported).
- **Vulnerability scan (npm audit):** 9 vulnerabilities (1 low, 3 moderate, 5 high). Key concerns: picomatch ReDoS, rollup path traversal, svelte SSR XSS (5 vectors). All fixable via `npm audit fix`.
- **Secrets scan:** No API keys or tokens found in source. One set of demo credentials found hardcoded in `src/lib/data/projects.ts:72`.
