# Phase 0: Foundation - Architecture Decisions & Conventions

**This is a reference document for all phases. Read this before starting any implementation.**

## Architecture Decisions

### ADR-001: Component Naming Convention

**Decision**: Use PascalCase for all `.svelte` component files

**Rationale**:
- Clear visual distinction between components and utility files
- Matches conventions from React, Vue, and other modern frameworks
- Makes imports more readable: `import ProjectCard from '$lib/components/ui/ProjectCard.svelte'`
- Consistent with TypeScript interface naming (which are already PascalCase)

**Examples**:
- ✅ `ProjectCard.svelte`
- ✅ `ImageGrid.svelte`
- ✅ `GooeyButton.svelte`
- ❌ `project-card.svelte`
- ❌ `imageGrid.svelte`

**Exceptions**: Route page components like `+page.svelte`, `+layout.svelte`, `+error.svelte` remain as-is (SvelteKit convention)

---

### ADR-002: Directory Organization

**Decision**: Type-based organization with refined structure

**Rationale**:
- Easier to find files when you know what type you're looking for
- Aligns with how developers typically think ("I need a component" vs "I need blog stuff")
- Simpler import paths
- Works well for portfolio/showcase sites that aren't complex enough to need feature-based organization

**Structure**:
```
/lib/
  /components/
    /ui/          # Reusable UI components (ProjectCard, ImageGrid, etc.)
    /icons/       # SVG icon components
    /layouts/     # Layout wrapper components (if any)
  /stores/        # All state management stores
  /data/          # Static data files (projects, navigation, etc.)
  /hooks/         # Custom Svelte utilities and hooks
  /utils/         # Helper functions and utilities
  /types/         # TypeScript type definitions
  /styles/        # Global styles, variables, mixins
  /images/        # Image assets
  /sounds/        # Audio files
```

**Rationale for `/ui/` subfolder**: Separates reusable UI components from specialized components like icons

---

### ADR-003: Svelte 5 Runes Adoption Strategy

**Decision**: Pragmatic runes - use where beneficial, not everywhere

**Rationale**:
- Svelte 5 runes provide better performance and type safety for complex state
- Simple components don't benefit from runes and become more verbose
- Balance modern patterns with code clarity

**Guidelines**:

**Use runes for**:
- All stores (use `$state()` for reactive store properties)
- Components with complex local state
- Components with derived/computed values
- Components with side effects that need fine-grained control

**Example - Complex component (USE runes)**:
```svelte
<script lang="ts">
  import type { Project } from '$lib/types';

  interface Props {
    project: Project;
    expanded?: boolean;
  }

  let { project, expanded = false }: Props = $props();
  let isHovered = $state(false);
  let imageLoaded = $state(false);

  let displayTitle = $derived(
    project.title.length > 50
      ? project.title.slice(0, 50) + '...'
      : project.title
  );

  $effect(() => {
    if (expanded) {
      // Track analytics
    }
  });
</script>
```

**Keep simple for**:
- Components that just receive props and display them
- Components with no local state
- Static presentational components

**Example - Simple component (KEEP simple)**:
```svelte
<script lang="ts">
  import type { Project } from '$lib/types';

  export let project: Project;
  export let size: 'small' | 'medium' | 'large' = 'medium';
</script>

<div class="card {size}">
  <h3>{project.title}</h3>
  <p>{project.description}</p>
</div>
```

**Key Point**: Prefer clarity over dogma. If `export let` is clearer than `$props()`, use it.

---

### ADR-004: Styling Architecture

**Decision**: CSS Custom Properties first, SCSS fallback if needed

**Rationale**:
- CSS custom properties enable runtime theming (light/dark mode)
- Better browser DevTools support
- Modern standard that works everywhere
- Reduces reliance on build-time SCSS variables
- SCSS remains available for complex logic/mixins if CSS custom properties become problematic

**Migration Strategy**:
1. Create comprehensive CSS custom properties for design tokens
2. Replace SCSS variables with CSS custom properties
3. Keep SCSS only for:
   - Mixins that can't be CSS (complex calculations)
   - Nested selectors (if beneficial)
   - Build-time constants (if any)

**Design Token Structure**:
```css
:root {
  /* Colors - Primitives */
  --color-primary-50: #...;
  --color-primary-100: #...;
  /* ... */

  /* Colors - Semantic */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-bg-primary: var(--color-white);
  --color-bg-secondary: var(--color-gray-50);

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  /* ... */

  /* Typography */
  --font-sans: ...;
  --font-mono: 'Fira Mono', monospace;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  /* ... */

  /* Effects */
  --shadow-sm: ...;
  --shadow-md: ...;
  --radius-sm: 4px;
  --radius-md: 8px;
}

[data-theme="dark"] {
  --color-text-primary: var(--color-gray-50);
  --color-text-secondary: var(--color-gray-400);
  --color-bg-primary: var(--color-gray-900);
  --color-bg-secondary: var(--color-gray-800);
}
```

**Fallback Plan**: If CSS custom properties cause issues (performance, specificity battles, browser bugs), switch to hybrid:
- CSS custom properties for theme values that change at runtime
- SCSS variables for everything else
- Decision point: Phase 3, Task 4

---

### ADR-005: TypeScript Type Organization

**Decision**: Centralized type definitions in `/lib/types/index.ts`

**Rationale**:
- Single source of truth for shared types
- Easier to refactor types across the codebase
- Clear import path: `import type { Project } from '$lib/types'`
- Prevents type duplication and drift

**Organization**:
```typescript
// /lib/types/index.ts

// Domain types
export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  tags: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

// Component prop types
export interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'compact';
}

// Store types
export interface AppState {
  navigation: NavigationState;
  preferences: PreferencesState;
  isLoading: boolean;
}

// Utility types
export type Theme = 'light' | 'dark' | 'auto';
export type BreakPoint = 'mobile' | 'tablet' | 'desktop';
```

**Exception**: Component-specific types that won't be reused can stay colocated in the component file.

---

### ADR-006: Performance Optimization Strategy

**Decision**: Balanced optimization - standard best practices without over-engineering

**Rationale**:
- Portfolio site doesn't need aggressive optimization
- Premature optimization adds complexity
- Focus on low-hanging fruit with high impact

**Optimizations to include**:
1. **Code splitting**: Dynamic imports for heavy routes (Android, Web showcases)
2. **Image optimization**: Lazy loading for images below the fold
3. **Asset preloading**: Preload critical fonts and hero images
4. **Tree shaking**: Ensure unused code is eliminated (verify build output)

**Optimizations to skip**:
- Virtual scrolling (lists aren't long enough)
- Complex memoization strategies (components are fast enough)
- Service worker/offline support (not required for portfolio)
- Advanced bundle analysis (unless bundle size becomes an issue)

---

### ADR-007: Navigation System Approach

**Decision**: Conservative, incremental updates with extensive testing

**Rationale**:
- User reported navigation has been problematic
- Breaking navigation breaks the entire site
- Better to be cautious than introduce regressions

**Approach**:
1. Make minimal changes to Header.svelte
2. Test thoroughly after each small change
3. Keep existing patterns if they work
4. Only modernize what's clearly outdated
5. Phase 6 is dedicated entirely to navigation (separate from other component work)

**Testing checklist for navigation**:
- [ ] Menu opens and closes correctly
- [ ] Navigation links work on all routes
- [ ] Mobile menu works (if applicable)
- [ ] Active route highlighting works
- [ ] Keyboard navigation works
- [ ] No console errors
- [ ] Smooth animations (if any)

---

## Design Decisions & Rationale

### Why Aggressive Refactoring (Except Navigation)?

The codebase is already on Svelte 5 and SvelteKit 2, so the migration risk is lower than a major version upgrade. The biggest risks are:
- Breaking functionality through refactoring
- Introducing bugs in the navigation
- CSS changes causing visual regressions

We mitigate these with:
- Frequent manual testing after each change
- Atomic commits (easy to rollback)
- Conservative approach on navigation
- Fallback plan for CSS custom properties

### Why PascalCase Over kebab-case?

While kebab-case is more "web native" and matches URL conventions, PascalCase has won in the component ecosystem. The mental overhead of switching between conventions (kebab for routes, Pascal for components) is less than the benefit of consistency with the broader JavaScript/TypeScript ecosystem. Additionally, PascalCase makes component imports visually distinct from utility imports.

### Why Type-Based Over Feature-Based Organization?

Feature-based organization shines in large applications with many domain areas. This portfolio has:
- ~14 Svelte components
- 4 main routes (home, about, Android, Web, blog)
- Simple data flow

Type-based organization is clearer for this scale. A developer looking for "the ProjectCard component" immediately knows to check `/lib/components/ui/`, not to search through feature folders.

### Why Pragmatic Runes Over "All Runes"?

Svelte 5's runes are powerful but add syntax overhead. A simple component that receives `project` and renders it doesn't benefit from:
```svelte
let { project }: { project: Project } = $props();
```

When this is clearer:
```svelte
export let project: Project;
```

Use runes when they solve a problem (complex reactivity, fine-grained control). Don't use them to "be modern."

---

## Testing Strategy

### Current State

The codebase has minimal automated tests. Testing will primarily be manual.

### Testing Approach

**After each task**:
1. Run `pnpm dev` and manually test the changes
2. Check browser console for errors
3. Test on multiple screen sizes (mobile, tablet, desktop)
4. Verify no functionality broken

**After each phase**:
1. Full manual regression test of all routes
2. Test light/dark theme switching
3. Test all interactive elements
4. Verify navigation works completely
5. Check build output: `pnpm build && pnpm preview`

**Phase 6 (Navigation) requires**:
- Test on multiple browsers (Chrome, Firefox, Safari)
- Test all navigation interactions extensively
- Test edge cases (deep links, back button, etc.)

### Test Automation (Future)

If time permits in Phase 7, add:
- Playwright tests for critical user flows
- Visual regression tests for major pages
- Unit tests for utility functions

But manual testing is acceptable for this refactoring given the project scope.

---

## Common Patterns

### Import Conventions

```typescript
// Types (always use "type" keyword)
import type { Project, BlogPost } from '$lib/types';

// Components
import ProjectCard from '$lib/components/ui/ProjectCard.svelte';
import LinkedInIcon from '$lib/components/icons/LinkedIn.svelte';

// Stores
import { appStore } from '$lib/stores/app.svelte';

// Data
import { projects } from '$lib/data/projects';

// Utils
import { formatDate } from '$lib/utils/date';
```

### Component File Structure

```svelte
<!-- 1. Script tag with types -->
<script lang="ts">
  import type { ComponentProps } from '$lib/types';
  import OtherComponent from './OtherComponent.svelte';

  // Props
  export let propName: string;

  // Local state (use $state if complex)
  let localVar = 'value';

  // Derived values (use $derived if complex)
  const computed = propName + localVar;

  // Functions
  function handleClick() {
    // ...
  }
</script>

<!-- 2. Template -->
<div class="component">
  <OtherComponent />
  <button on:click={handleClick}>
    {computed}
  </button>
</div>

<!-- 3. Styles (scoped by default) -->
<style lang="scss">
  .component {
    /* Use CSS custom properties */
    color: var(--color-text-primary);
    padding: var(--space-4);
  }
</style>
```

### Store Pattern

```typescript
// /lib/stores/example.svelte.ts
import { browser } from '$app/environment';

interface ExampleState {
  value: string;
  count: number;
}

function createExampleStore() {
  let state = $state<ExampleState>({
    value: '',
    count: 0
  });

  return {
    get value() { return state.value; },
    get count() { return state.count; },

    increment() {
      state.count++;
    },

    setValue(newValue: string) {
      state.value = newValue;
    }
  };
}

export const exampleStore = createExampleStore();
```

---

## Common Pitfalls to Avoid

### 1. Breaking Imports During Renames

When renaming files, update all imports immediately. Use your editor's "Find All References" feature.

**Process**:
1. Find all imports of the file (grep/search)
2. Rename the file
3. Update all imports
4. Test the app
5. Commit

### 2. Forgetting Route Components

Don't rename `+page.svelte` or `+layout.svelte` files - these are SvelteKit conventions that must stay as-is.

### 3. Over-Using Runes

Don't convert every `export let` to `$props()`. Simple is better.

### 4. CSS Custom Property Specificity Issues

CSS custom properties don't increase specificity. If you have issues, you might need to restructure selectors or use fallback SCSS.

### 5. Breaking Navigation

Test navigation after EVERY change in Phase 6. Even small CSS changes can break layout.

### 6. Forgetting TypeScript Imports

Always use `import type` for types:
```typescript
// ✅ Good
import type { Project } from '$lib/types';

// ❌ Bad - bundles type in runtime
import { Project } from '$lib/types';
```

### 7. Mixing Old and New Patterns

Don't leave half-migrated code. Finish each component fully before moving on.

---

## Git Commit Conventions

Use conventional commits format:

```
<type>(<scope>): <subject>

<body>
```

**Types**:
- `feat`: New feature
- `refactor`: Code refactoring
- `style`: Style/formatting changes
- `perf`: Performance improvements
- `chore`: Build/config changes
- `docs`: Documentation
- `test`: Tests

**Examples**:
```
refactor(components): rename ProjectCard component to PascalCase

- Rename project-card.svelte to ProjectCard.svelte
- Update all imports
- Verify app still works
```

```
style(theme): migrate color variables to CSS custom properties

- Create color design tokens in app.css
- Replace SCSS $color-* with --color-*
- Test light and dark themes
```

```
perf(images): add lazy loading to ImageGrid component

- Add loading="lazy" to images below fold
- Preload hero image
- Test loading behavior
```

**Git Author Configuration**:
```bash
git config --global user.email "82614182+HatmanStack@users.noreply.github.com"
git config --global user.name "HatmanStack"
```

Do NOT use "Claude Code" or AI tool names in commits. Always use the HatmanStack identity.

---

## Phase Completion Criteria

Before marking a phase complete, verify:

- [ ] All tasks in the phase are completed
- [ ] All verification checklists are satisfied
- [ ] Manual testing shows no regressions
- [ ] All changes are committed with proper commit messages
- [ ] `pnpm dev` runs without errors
- [ ] `pnpm build` succeeds
- [ ] Built app (`pnpm preview`) works correctly

If any item fails, debug and fix before proceeding to the next phase.

---

## Questions or Issues?

If you encounter:
- **Unclear requirements**: Refer to the task description in the phase file
- **Technical blockers**: Check this Phase-0 document for patterns
- **Breaking changes**: Commit current work, document the issue, ask for guidance
- **Test failures**: Debug immediately, don't proceed until resolved

This is an aggressive refactoring, but each phase is designed to be completable. Take your time, test thoroughly, commit frequently.
