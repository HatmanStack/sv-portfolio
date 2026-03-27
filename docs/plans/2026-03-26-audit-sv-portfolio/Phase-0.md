# Phase 0: Foundation

This phase establishes conventions and decisions that apply to all subsequent phases. Every implementer should read this before starting any phase.

## Architecture Decisions

### ADR-1: Svelte 5 Runes as the Single Reactivity Model

Where two patterns exist (legacy Svelte actions vs. Svelte 5 runes), converge on runes. This applies specifically to the sound system (`useSound.js` vs. `useSound.svelte.ts`). The runes version is the target; the legacy JS version will be deleted after migration.

### ADR-2: CSS Custom Properties via Shared Stylesheet

Duplicated CSS tokens and animation keyframes will be consolidated into shared CSS files imported once, rather than redeclared per-route. The existing `src/lib/styles/tokens.css` is the home for design tokens. Shared component styles (glow effects, header text) will go into new shared CSS files or shared Svelte components as appropriate.

### ADR-3: No `any` Types in Production Code

All `any` types in production source files will be replaced with proper types. `Record<string, any>` casts will be replaced with discriminated union types or properly typed maps. `children` props will use Svelte 5's `Snippet` type.

### ADR-4: Subtractive Before Additive

Dead code, unused dependencies, and stale files are removed before structural changes. This prevents wasted effort linting, testing, or documenting code that will be deleted.

### ADR-5: Documentation Follows Code

Docs are updated only after code changes are complete (Phase 4 runs last). Prevention tooling (markdownlint) is added in the guardrails phase to catch future drift.

## Tech Stack

- **Framework:** SvelteKit 2.55+ with Svelte 5.54+
- **Build:** Vite 8, terser minification, adapter-static with precompression
- **Testing:** Vitest 4.1, @testing-library/svelte 5.3, jsdom
- **Package Manager:** pnpm 9 (frozen lockfile in CI)
- **Deployment:** AWS Amplify (static adapter)
- **CI:** GitHub Actions (Node 24)

## Testing Strategy

### Unit Tests
- Use Vitest with jsdom environment
- Use `@testing-library/svelte` for component tests
- Use existing mock factories in `src/lib/test-utils/mock-factories.ts`
- Use existing store helpers in `src/lib/test-utils/store-helpers.ts`

### Test Commands
- `pnpm test` - run all tests
- `pnpm test:coverage` - run with coverage reporting
- `pnpm run check` - TypeScript/Svelte type checking

### When to Write Tests
- When modifying existing behavior (update existing tests to match)
- When creating new shared components extracted from duplicated code
- Do not write tests for pure deletions

### Coverage Thresholds (from vitest.config.ts)
- Statements: 80%
- Branches: 70%
- Functions: 80%
- Lines: 80%

## Commit Convention

Use conventional commits format:

```
type(scope): brief description

- Detail 1
- Detail 2
```

Types: `fix`, `refactor`, `chore`, `test`, `ci`, `docs`, `style`

Scopes: `deps`, `css`, `types`, `sound`, `security`, `lint`, `ci`, `docs`

## Shared Patterns

### Svelte 5 Component Props
```typescript
import type { Snippet } from 'svelte';

interface Props {
  children: Snippet;
  // other props
}

let { children, ...rest }: Props = $props();
```

### Svelte 5 Sound Action Pattern
After consolidation, all sound usage should go through `useSound.svelte.ts` which exports `createSoundStore`. The action-based `useSound.js` pattern will be removed.

### CSS Shared Styles
Route-specific styles that are identical across routes should be extracted to `src/lib/styles/` and imported. Component-specific shared styles should live with their component.
