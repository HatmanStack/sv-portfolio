# Phase 2: [IMPLEMENTER] Structural Fixes

## Phase Goal

Fix security issues, type safety gaps, CSS/component duplication, sound API fragmentation, and defensive coding problems. This is the largest phase, covering architecture, code quality, defensiveness, type rigor, and performance findings.

**Success criteria:**
- No `any` types in production code
- Single sound API (runes-based)
- CSS glow/header styles defined in one place
- SVG filters consolidated
- All security findings addressed
- `pnpm test` and `pnpm run check` pass

**Estimated tokens:** ~30,000

## Prerequisites

- Phase 0 read and understood
- Phase 1 complete (dead code removed, deps clean)
- `pnpm test` passes before starting

## Tasks

### Task 1: Security Quick Wins

**Goal:** Fix the low-effort security findings: missing `rel` attributes and slug validation.

**Files to Modify:**
- `src/routes/about/+page.svelte` - Add `rel="noopener noreferrer"` to 4 external links (lines ~53-56)
- `src/routes/read/post/[slug]/+page.js` - Add slug validation before dynamic import

**Prerequisites:** None

**Implementation Steps:**

For the about page:
- Find all `target="_blank"` links in `src/routes/about/+page.svelte`
- Add `rel="noopener noreferrer"` to each one
- Verify the rest of the codebase already has these attributes (it should, per the audit)

For slug validation:
- Read `src/routes/read/post/[slug]/+page.js`
- Before the `await import(...)` call, add a regex check: if the slug does not match `/^[a-z0-9-]+$/i`, throw an error (SvelteKit 404 or redirect)
- This prevents path traversal even though Vite's module resolution is already a guard

**Verification Checklist:**
- [x] All `target="_blank"` links in about page have `rel="noopener noreferrer"`
- [x] Slug validation rejects slugs containing `..`, `/`, or other path traversal characters
- [x] `pnpm test` passes
- [x] `pnpm run check` passes

**Testing Instructions:**
- If a test exists for `+page.js` slug loading, add a case for an invalid slug (e.g., `../etc/passwd`). If no test exists, add one.

**Commit Message Template:**
```
fix(security): add rel attributes and slug validation

- Add rel="noopener noreferrer" to about page external links
- Validate blog post slugs before dynamic import
```

---

### Task 2: Fix `@html` XSS Vector and Type-Unsafe Content Maps

**Goal:** Address the CRITICAL finding: `{@html}` rendering untyped content from `Record<string, any>` maps. Fix the type erasure in `webContentMap` and `androidContentMap`. This consolidates the CRITICAL health audit finding with the Type Rigor eval findings.

**Files to Modify:**
- `src/lib/data/webProjects.ts` - Replace `as Record<string, any>` with proper type
- `src/lib/data/androidApps.ts` - Replace `as Record<string, any>` with proper type
- `src/lib/types/index.ts` - Add types for content map seed entries if needed
- `src/routes/web/+page.svelte` - Add sanitization or type narrowing around `{@html}` usage

**Prerequisites:** None

**Implementation Steps:**

For the content maps:
- Read `src/lib/data/webProjects.ts` to understand the `webContentMap` structure. The seed object (`{ 'Splash': { title: 'Web Stuff' } }`) has a different shape than `WebProject`.
- Define a union type or a separate `ContentMapSeed` type that accurately represents what the seed entries contain
- Replace `as Record<string, any>` with the proper type, e.g., `Record<string, WebProject | ContentMapSeed>`
- Do the same for `androidApps.ts` and its `androidContentMap`

For the `@html` usage:
- Read `src/routes/web/+page.svelte` around line 60 where `{@html webContentMap[selectedImage].description}` is used
- Since the data is static and the description field contains trusted HTML (`<a>` and `<b>` tags), the immediate risk is low. The fix is to ensure the type system enforces that `.description` is always a string, and to add a code comment noting that this renders trusted static HTML only.
- If the project ever moves to dynamic data, DOMPurify should be added. For now, type safety is the fix.

**Verification Checklist:**
- [x] No `Record<string, any>` casts remain in `webProjects.ts` or `androidApps.ts`
- [x] Content map access is type-safe (accessing `.description` on a seed entry produces a compile error or returns `undefined` safely)
- [x] `pnpm run check` passes with no type errors
- [x] `pnpm test` passes

**Testing Instructions:**
- Update any existing tests for `webProjects.ts` or `androidApps.ts` to reflect new types
- Verify that `pnpm run check` catches incorrect property access on the content maps

**Commit Message Template:**
```
fix(types): replace Record<string, any> casts in content maps

- webContentMap and androidContentMap now properly typed
- Eliminates type erasure that masked potential runtime errors
```

---

### Task 3: Fix All Remaining `any` Types in Production Code

**Goal:** Replace `children?: any` with `Snippet` in layout and component props. Address any other `any` types found in production source files.

**Files to Modify:**
- `src/routes/+layout.svelte` - Replace `children: any` with `children: Snippet`
- `src/lib/types/index.ts` - Replace `children?: any` in `GooeyButtonProps` with `Snippet`

**Prerequisites:** Task 2 complete (content map types fixed)

**Implementation Steps:**
- In `src/routes/+layout.svelte`, import `Snippet` from `'svelte'` and change the Props interface to use `children: Snippet`
- In `src/lib/types/index.ts`, find `GooeyButtonProps` and change `children?: any` to `children?: Snippet`. Add the `Snippet` import.
- Search the entire `src/` directory (excluding test files) for remaining `any` usage. Fix each one with a proper type.
- Run `pnpm run check` after each file change to catch cascading type errors

**Verification Checklist:**
- [x] No `any` type annotations in production `src/` files (excluding test files)
- [x] `Snippet` is used for all `children` props
- [x] `pnpm run check` passes
- [x] `pnpm test` passes

**Testing Instructions:**
- No new tests needed. Type checking is the verification.

**Commit Message Template:**
```
fix(types): replace all any types with proper types in production code

- children props now use Svelte 5 Snippet type
- GooeyButtonProps children typed correctly
```

---

### Task 4: Consolidate SVG Filters

**Goal:** Eliminate SVG filter duplication. The `glow-4` filter is defined in `SVGFilters.svelte` but also duplicated inline in the blog post template and (simplified) in `+page.svelte`. The blog post page should use the existing `SVGFilters.svelte` component.

**Files to Modify:**
- `src/routes/read/post/[slug]/+page.svelte` - Replace inline SVG filter (lines ~94-156) with `<SVGFilters />` component import
- `src/routes/+page.svelte` - Evaluate whether the `goo` filter can use `SVGFilters.svelte` or needs to remain separate (it is a simplified version)

**Prerequisites:** None

**Implementation Steps:**
- Read `src/lib/components/ui/SVGFilters.svelte` to understand what filters it provides
- Read `src/routes/read/post/[slug]/+page.svelte` lines 94-156 to see the duplicated filter
- Replace the inline SVG filter block with an import and usage of `<SVGFilters />`
- For `src/routes/+page.svelte`, read the `goo` filter. If it is the same as one in `SVGFilters.svelte`, replace it. If it is genuinely different (different parameters, different purpose), leave it but add a comment explaining why.
- Check `src/lib/components/ui/AndroidFilters.svelte` for any `id="glow-4"` conflict and rename if needed

**Verification Checklist:**
- [x] No inline SVG filter definitions in blog post template
- [x] `SVGFilters.svelte` is the single source for the `glow-4` filter
- [x] No duplicate `id="glow-4"` definitions that could conflict
- [x] `pnpm test` passes
- [x] Visual: blog post pages still render glow effects correctly

**Testing Instructions:**
- If component tests exist for the blog post page, verify they still pass
- Run `pnpm run build` to ensure prerendering works

**Commit Message Template:**
```
refactor: consolidate SVG filter definitions

- Blog post page now uses SVGFilters component
- Eliminated duplicate glow-4 filter definition
```

---

### Task 5: Extract Shared CSS (Glow, Header Text, Keyframes, Design Tokens)

**Goal:** Consolidate CSS that is copy-pasted across 3+ route pages: `.glow-filter`, `.header-text`, `@keyframes onloadscale`, `@keyframes onloadopacity`, and the duplicated `:root` custom properties. This addresses multiple Medium findings from the health audit and the Code Quality eval score.

**Files to Create:**
- `src/lib/styles/glow.css` - Shared glow filter, header text, and keyframe styles

**Files to Modify:**
- `src/routes/web/+page.svelte` - Remove duplicated CSS, import shared styles
- `src/routes/read/+page.svelte` - Remove duplicated CSS, import shared styles
- `src/routes/read/post/[slug]/+page.svelte` - Remove duplicated CSS, import shared styles
- `src/lib/styles/tokens.css` - Move duplicated `:root` custom properties here (if not already present)

**Prerequisites:** Task 4 complete (SVG filters consolidated first)

**Implementation Steps:**

For design tokens:
- Read the `:root` blocks in `web/+page.svelte`, `read/+page.svelte`, and `android/+page.svelte`
- Identify which custom properties are identical across all three
- Move those to `src/lib/styles/tokens.css` (which already exists for this purpose)
- Remove the duplicate declarations from route files
- Keep route-specific overrides in their route files if any differ

For glow/header CSS:
- Read the `.glow-filter`, `.header-text`, `.glow-filter::before`, `@keyframes onloadscale`, and `@keyframes onloadopacity` blocks from each route page
- Confirm they are identical (the audit says they are)
- Create `src/lib/styles/glow.css` containing these shared rules
- In each route page, remove the duplicated CSS blocks and add `@import '$lib/styles/glow.css';` (or use Svelte's style mechanism, whichever is idiomatic for the project)

Note on Svelte scoped styles: If these CSS classes are used on elements within the component, Svelte's scoped styles may add hash suffixes. In that case, the shared CSS should use `:global()` selectors or be imported as a global stylesheet. Check how `tokens.css` is currently imported for the pattern to follow.

**Verification Checklist:**
- [x] `.glow-filter`, `.header-text`, and keyframe definitions exist in exactly one place
- [x] `:root` custom properties (shared ones) defined in exactly one place
- [x] All 3 route pages render identically to before
- [x] `pnpm run check` passes
- [x] `pnpm test` passes

**Testing Instructions:**
- Run `pnpm run build` to verify prerendering works
- Visual check on `/web`, `/read`, and a blog post page that glow effects render correctly

**Commit Message Template:**
```
refactor(css): extract shared glow and header styles

- Created glow.css for shared animation styles
- Consolidated duplicate :root custom properties into tokens.css
- Removed identical CSS from 3 route pages
```

---

### Task 6: Consolidate Sound API

**Goal:** Migrate all consumers from the legacy `useSound.js` (action-based) to `useSound.svelte.ts` (runes-based), then delete the legacy files. This addresses the Architecture and Pragmatism eval findings.

**Files to Delete (after migration):**
- `src/lib/hooks/useSound.js`
- `src/lib/hooks/applyClickSound.js`

**Files to Modify:**
- `src/lib/hooks/useSound.svelte.ts` - May need to export an action-compatible API if consumers need it
- `src/routes/Header.svelte` - Migrate from `useSound.js` to `useSound.svelte.ts`
- `src/routes/web/+page.svelte` - Migrate sound usage
- `src/routes/android/+page.svelte` - Migrate sound usage
- `src/routes/read/+page.svelte` - Migrate sound usage
- `src/routes/read/post/[slug]/+page.svelte` - Migrate sound usage (if applicable)

**Prerequisites:** Tasks 1-5 complete (clean codebase state)

**Implementation Steps:**

Phase A - Understand the current APIs:
- Read `src/lib/hooks/useSound.js` to understand its export shape (likely a function returning `{ play, stop }` or similar, used as a Svelte action with `use:`)
- Read `src/lib/hooks/useSound.svelte.ts` to understand the runes-based API (`createSoundStore`)
- Read `src/lib/hooks/applyClickSound.js` to understand how it wraps `useSound.js`
- Read each consumer file to understand how they call the sound API

Phase B - Design the migration:
- The runes-based `useSound.svelte.ts` exports `createSoundStore`. Consumers using `use:sound_action` syntax need a Svelte action that wraps the store.
- Add a `createSoundAction` export to `useSound.svelte.ts` that returns a proper Svelte action (with `destroy()` cleanup) backed by the runes store
- This replaces both `useSound.js` and `applyClickSound.js`

Phase C - Migrate consumers:
- Update each consumer file to import from `useSound.svelte.ts` instead of `useSound.js`
- Replace `applyClickSound` usage with the new action from `useSound.svelte.ts`
- Ensure all actions have proper `destroy()` cleanup (fixes the memory leak finding)

Phase D - Delete legacy files:
- Delete `src/lib/hooks/useSound.js`
- Delete `src/lib/hooks/applyClickSound.js`
- Update or remove any tests that reference the deleted files

**Verification Checklist:**
- [x] `useSound.js` deleted
- [x] `applyClickSound.js` deleted
- [x] No imports reference deleted files
- [x] All sound actions have `destroy()` cleanup
- [x] `pnpm test` passes
- [x] `pnpm run check` passes

**Testing Instructions:**
- Update `src/lib/hooks/useSound.svelte.test.ts` to cover any new exports (e.g., `createSoundAction`)
- Test that the action properly cleans up event listeners (mock `addEventListener`/`removeEventListener`)
- Run full test suite

**Commit Message Template:**
```
refactor(sound): consolidate to single runes-based sound API

- Migrate all consumers from useSound.js to useSound.svelte.ts
- Add createSoundAction with proper destroy() cleanup
- Delete legacy useSound.js and applyClickSound.js
```

---

### Task 7: Fix Conditional Template Duplication in Web Page

**Goal:** Eliminate the duplicated `.item` div block in `src/routes/web/+page.svelte` where the only difference between the `{#if}` and `{:else}` branches is the presence of `use:expand_sound`. A null-safe action wrapper eliminates the need for the conditional entirely.

**Files to Modify:**
- `src/routes/web/+page.svelte` - Replace the duplicated `{#if expand_sound}...{:else}...{/if}` block with a single block using a null-safe action

**Prerequisites:** Task 6 complete (sound API consolidated, so the action API is finalized)

**Implementation Steps:**
- Read `src/routes/web/+page.svelte` lines ~74-108 to understand the duplication
- Create a small helper function (inline or in a utility) that returns a no-op action when the sound is not loaded: `const safeAction = (node) => expand_sound ? expand_sound(node) : { destroy: () => {} }`
- Replace the `{#if}/{:else}` block with a single block using `use:safeAction`
- Apply the same pattern to the `click_sound` conditional at lines ~64-68 if applicable

**Verification Checklist:**
- [x] No duplicated `.item` markup in the `{#if}` conditional
- [x] Sound actions still fire correctly when loaded
- [x] No-op when sound is not loaded (no errors)
- [x] `pnpm test` passes

**Testing Instructions:**
- Existing tests for the web page should still pass
- No new tests needed unless none exist for this page

**Commit Message Template:**
```
refactor: eliminate conditional template duplication in web page

- Replaced {#if sound}...{:else}...{/if} with null-safe action wrapper
- Halves the maintained markup for item elements
```

---

### Task 8: Fix Svelte 5 Event Syntax in Android Page

**Goal:** Replace the legacy `on:change` event syntax with the Svelte 5 `onchange` attribute pattern in the android page.

**Files to Modify:**
- `src/routes/android/+page.svelte` - Change `on:change` to `onchange` (around line 57)

**Prerequisites:** None

**Implementation Steps:**
- Read `src/routes/android/+page.svelte` around line 57
- Replace `on:change="{() => ...}"` with `onchange={() => ...}` (Svelte 5 syntax)
- Check for any other instances of legacy event syntax (`on:click`, `on:keydown`, etc.) in this file and fix them too

**Verification Checklist:**
- [x] No `on:` event syntax in `android/+page.svelte`
- [x] `pnpm run check` passes
- [x] `pnpm test` passes

**Testing Instructions:**
- No new tests. Existing tests verify functionality.

**Commit Message Template:**
```
refactor: migrate android page to Svelte 5 event syntax

- Replace on:change with onchange attribute pattern
```

---

### Task 9: Fix `preventDefault` in Sound Action and Hardcoded Credentials

**Goal:** Address two remaining findings: (1) the `useSoundAction` in `useSound.svelte.ts` calls `event.preventDefault()` which would break navigation if applied to anchor tags, and (2) hardcoded demo credentials in `projects.ts`.

**Files to Modify:**
- `src/lib/hooks/useSound.svelte.ts` - Remove or guard the `event.preventDefault()` call (lines ~68-84)
- `src/lib/data/projects.ts` - Remove inline credentials from the RAGStack project description (line ~72)

**Prerequisites:** Task 6 complete (sound API is the final version)

**Implementation Steps:**

For `preventDefault`:
- Read the `useSoundAction` function in `useSound.svelte.ts`
- Remove `event.preventDefault()` or change it to only call `preventDefault` when the element is not an anchor/link. The sound should play without blocking navigation.

For credentials:
- Read `src/lib/data/projects.ts` around line 72
- Remove the `Login: guest@hatstack.fun / Guest@123` text from the description
- Replace with a generic note like "Demo credentials available on request" or simply remove the login information entirely

**Verification Checklist:**
- [x] `event.preventDefault()` no longer called unconditionally in sound action
- [x] No credentials (usernames, passwords) in source code
- [x] `pnpm test` passes
- [x] `pnpm run check` passes

**Testing Instructions:**
- Update sound action tests to verify `preventDefault` is not called on anchor elements
- Update any tests that assert on the projects.ts description text

**Commit Message Template:**
```
fix(security): remove credentials and fix preventDefault in sound action

- Remove demo credentials from projects.ts description
- Sound action no longer blocks default element behavior
```

---

### Task 10: Address Firefox Redirect and Add Missing `rel` Attributes

**Goal:** The Firefox UA-sniffing redirect in `+page.svelte` bypasses the homepage for all Firefox users. The scroll-driven animation API has been supported in Firefox since v128 (July 2024). Replace the UA sniff with a proper feature detection or remove it if no longer needed.

**Files to Modify:**
- `src/routes/+page.svelte` - Lines ~51-65

**Prerequisites:** None

**Implementation Steps:**
- Read `src/routes/+page.svelte` lines 51-65 to understand the Firefox workaround
- The workaround was for `scroll-driven animations` not being supported in Firefox. Check what CSS API is being used (likely `animation-timeline: scroll()`)
- Replace the `navigator.userAgent.includes("Firefox")` check with a proper CSS `@supports` check or a JS feature detection:
  ```javascript
  if (!CSS.supports('animation-timeline', 'scroll()')) {
    // redirect or show fallback
  }
  ```
- If the feature is now widely supported (Firefox 128+, released July 2024), consider removing the redirect entirely and letting the `@supports` CSS fallback handle it (which `ImageGrid.svelte` already does)
- If keeping the redirect, add a code comment explaining the rationale and when it can be removed
- Also remove the `display: none` on the scroll container for affected browsers

**Verification Checklist:**
- [x] No `navigator.userAgent` string matching in the codebase
- [x] Feature detection uses `CSS.supports()` or `@supports` if still needed
- [x] `pnpm test` passes
- [x] `pnpm run check` passes

**Testing Instructions:**
- Update any existing tests for `+page.svelte` that mock `navigator.userAgent`
- Add a test that the page does not redirect when `CSS.supports('animation-timeline', 'scroll()')` returns true

**Commit Message Template:**
```
fix: replace Firefox UA sniffing with feature detection

- Use CSS.supports() instead of userAgent string matching
- Scroll-driven animations now supported in Firefox 128+
```

---

### Task 11: Performance Quick Wins

**Goal:** Apply `will-change` conditionally (on hover/focus) instead of statically, and remove any other low-effort performance improvements.

**Files to Modify:**
- `src/routes/web/+page.svelte` - Change `will-change: transform, filter, rotateY, width` on `.item` to apply only on hover/focus

**Prerequisites:** Task 5 complete (CSS is consolidated)

**Implementation Steps:**
- Find the `.item` CSS rule in `src/routes/web/+page.svelte` (around line 261) that has `will-change`
- Move the `will-change` property into a `:hover` or `:focus-within` pseudo-class so it only promotes to a compositor layer when the user interacts
- The `:hover` rule likely already exists for the item's transform/filter transitions

**Verification Checklist:**
- [x] `will-change` is not set on `.item` at rest, only on `:hover`/`:focus-within`
- [x] `pnpm run check` passes

**Testing Instructions:**
- No automated tests for CSS perf. Visual verification that hover animations still work smoothly.

**Commit Message Template:**
```
perf(css): apply will-change only on hover/focus for web page items

- Reduces GPU memory consumption at rest on lower-end devices
```

## Phase Verification

- `pnpm test` passes
- `pnpm run check` passes with zero type errors
- No `any` types in production code (search `src/` excluding test files)
- No `Record<string, any>` casts
- No `on:` legacy event syntax
- No `navigator.userAgent` checks
- No duplicate CSS blocks across route pages
- No duplicate SVG filter definitions
- Single sound API with proper cleanup
- No hardcoded credentials
- All `target="_blank"` links have `rel="noopener noreferrer"`
