# Phase 2: Component Modernization (Non-Navigation)

## Phase Goal

Modernize all components (except navigation) to leverage Svelte 5's runes API where beneficial. This includes migrating complex stateful components to use `$state()`, `$props()`, `$derived()`, and `$effect()`, while keeping simple components simple. We'll also standardize component patterns, improve TypeScript typing, and enhance code clarity.

**Success Criteria**:
- All stateful components use Svelte 5 runes appropriately
- Simple components remain simple (don't over-engineer)
- All components have proper TypeScript types
- Component patterns are consistent across codebase
- Navigation components (Header.svelte) are NOT touched (Phase 6)

**Estimated tokens**: ~95,000

---

## Prerequisites

- Phase 0 read and understood (especially ADR-003 on runes adoption)
- Phase 1 complete (all files renamed and reorganized)
- Application builds and runs successfully
- Git configured with HatmanStack credentials

---

## Tasks

### Task 1: Audit Components for Runes Migration

**Goal**: Analyze each component to determine whether it should be migrated to runes or kept simple, creating a migration plan based on component complexity.

**Files to Review**:
- `/src/lib/components/ui/*.svelte` (ProjectCard, ImageGrid, GooeyButton, SVGFilters, AndroidFilters)
- `/src/lib/components/icons/*.svelte` (icon components)
- `/src/routes/*.svelte` (route page components, but NOT Header.svelte)
- `/src/lib/hooks/*.svelte.ts` (Svelte runes-based utilities)

**Prerequisites**:
- None

**Implementation Steps**:

1. For each component, assess:
   - Does it have local reactive state? (candidate for `$state()`)
   - Does it receive props? (candidate for `$props()` with TypeScript)
   - Does it have computed values? (candidate for `$derived()`)
   - Does it have side effects? (candidate for `$effect()`)
   - Or is it simple/presentational? (keep as-is)

2. Create mental categories:
   - **Migrate to runes**: Complex state, reactivity, or side effects
   - **Keep simple**: Just displays props, minimal logic
   - **Needs TypeScript improvement**: Correct structure but missing types
   - **Already modern**: Using runes correctly

3. Consider existing patterns:
   - `/src/lib/stores/app.svelte.ts` already uses runes - good pattern to follow
   - `/src/lib/hooks/useSound.svelte.ts` already uses runes - analyze pattern

4. Document migration priority:
   - High: Components with complex state/reactivity
   - Medium: Components with props that need better TypeScript
   - Low: Simple components working fine

5. Special notes:
   - **SKIP**: `/src/routes/Header.svelte` (Phase 6 only)
   - **SKIP**: Any navigation-related components

**Verification Checklist**:
- [ ] All non-navigation components reviewed
- [ ] Migration priority determined for each
- [ ] Understand which components benefit from runes
- [ ] Have migration strategy clear
- [ ] Header.svelte confirmed as out-of-scope

**Testing Instructions**:
- No testing needed for audit
- Document findings as comments or notes

**Commit Message Template**:
```
docs(components): audit components for Svelte 5 runes migration

- Analyze component complexity and state management
- Categorize components by migration priority
- Document runes adoption strategy
```

**Estimated tokens**: ~8,000

---

### Task 2: Modernize ProjectCard Component

**Goal**: Update ProjectCard component to use Svelte 5 runes for props and any internal state, improving type safety and following modern patterns.

**Files to Modify**:
- `/src/lib/components/ui/ProjectCard.svelte`

**Prerequisites**:
- Task 1 complete (audit done)

**Implementation Steps**:

1. Read the current ProjectCard implementation:
   - Understand current props
   - Identify any local state
   - Check for reactive statements or computed values
   - Note any lifecycle hooks

2. Analyze requirements:
   - What data does ProjectCard receive? (likely `project` object)
   - Does it have hover states or other internal reactivity?
   - Are there any animations or side effects?

3. Migrate to runes pattern:
   - If it receives props: Convert `export let` to `$props()` with TypeScript interface
   - If it has local state: Convert to `$state()`
   - If it has computed values: Convert reactive statements to `$derived()`
   - If it has side effects: Convert to `$effect()` (though likely not needed)

4. Example pattern (adapt to actual component):
   ```svelte
   <script lang="ts">
     import type { Project } from '$lib/types';

     interface Props {
       project: Project;
       variant?: 'default' | 'compact';
     }

     let { project, variant = 'default' }: Props = $props();

     // If there's hover state
     let isHovered = $state(false);

     // If there's a computed value
     let truncatedTitle = $derived(
       project.title.length > 50
         ? project.title.slice(0, 50) + '...'
         : project.title
     );
   </script>
   ```

5. Ensure TypeScript types are imported from `$lib/types`

6. Test the component:
   - Run `pnpm dev`
   - Navigate to pages using ProjectCard
   - Verify component renders correctly
   - Check console for errors
   - Test any interactive features

**Verification Checklist**:
- [ ] ProjectCard uses `$props()` with TypeScript interface
- [ ] Any local state uses `$state()`
- [ ] Any computed values use `$derived()` if appropriate
- [ ] Types imported from `$lib/types`
- [ ] Component renders correctly on all pages
- [ ] No console errors
- [ ] Interactive features work (hover, click, etc.)

**Testing Instructions**:
- Manual: Visit home, Android, and Web pages
- Visual: Verify card styling and layout intact
- Interaction: Test hover effects, links, etc.
- Console: Check for no errors

**Commit Message Template**:
```
refactor(components): modernize ProjectCard with Svelte 5 runes

- Convert props to $props() with TypeScript interface
- Add local state with $state() if needed
- Improve type safety with centralized types
- Verify component functionality
```

**Estimated tokens**: ~12,000

---

### Task 3: Modernize ImageGrid Component

**Goal**: Update ImageGrid component to use Svelte 5 runes, focusing on any animation state, visibility tracking, or complex reactivity.

**Files to Modify**:
- `/src/lib/components/ui/ImageGrid.svelte`

**Prerequisites**:
- Task 2 complete (ProjectCard modernized)

**Implementation Steps**:

1. Read current ImageGrid implementation:
   - Identify props (likely images array, grid configuration)
   - Check for intersection observer usage (lazy loading)
   - Look for animation state
   - Note any complex reactive logic

2. Plan runes migration:
   - Props: Convert to `$props()` with interface
   - State: Image loading states, visibility states → `$state()`
   - Effects: Intersection observer setup → `$effect()`
   - Computed: Grid calculations or filtering → `$derived()`

3. Handle intersection observer pattern:
   - If using IntersectionObserver, it's a side effect
   - Migrate `onMount` or reactive statements to `$effect()`
   - Ensure cleanup is handled properly

4. Example pattern for effects:
   ```svelte
   <script lang="ts">
     let imageRefs = $state<HTMLElement[]>([]);

     $effect(() => {
       const observer = new IntersectionObserver((entries) => {
         // Handle visibility
       });

       imageRefs.forEach(el => observer.observe(el));

       return () => observer.disconnect(); // Cleanup
     });
   </script>
   ```

5. Maintain animation behavior:
   - Ensure fade-in, stagger animations still work
   - Test scroll-triggered animations
   - Preserve timing and easing

6. Test thoroughly:
   - Image loading behavior
   - Lazy loading if implemented
   - Grid responsiveness
   - Animations

**Verification Checklist**:
- [ ] ImageGrid uses `$props()` for configuration
- [ ] Visibility/loading state uses `$state()`
- [ ] Intersection observer or similar effects use `$effect()`
- [ ] Animations work correctly
- [ ] Lazy loading functional (if implemented)
- [ ] Grid layout responsive
- [ ] No console errors
- [ ] Performance is maintained or improved

**Testing Instructions**:
- Manual: Visit home page with image grid
- Scroll: Test lazy loading behavior
- Resize: Verify responsive grid
- Visual: Check animations and transitions
- Performance: Ensure no jank or slowness

**Commit Message Template**:
```
refactor(components): modernize ImageGrid with Svelte 5 runes

- Convert props to $props() with types
- Migrate state to $state()
- Use $effect() for intersection observer
- Preserve animation behavior
- Test lazy loading and responsiveness
```

**Estimated tokens**: ~15,000

---

### Task 4: Modernize GooeyButton Component

**Goal**: Update GooeyButton component to use runes for any internal state (hover, active, animation states) and props.

**Files to Modify**:
- `/src/lib/components/ui/GooeyButton.svelte`

**Prerequisites**:
- Task 3 complete (ImageGrid modernized)

**Implementation Steps**:

1. Read current GooeyButton implementation:
   - Identify props (variant, size, disabled, etc.)
   - Check for hover/active/focus states
   - Look for animation triggers
   - Note SVG filter usage

2. Migrate to runes:
   - Props: Use `$props()` with interface
   - State: Hover, active, pressed states → `$state()`
   - Events: Keep event handlers unless they need reactive behavior

3. Consider interaction states:
   ```svelte
   <script lang="ts">
     interface Props {
       variant?: 'primary' | 'secondary';
       disabled?: boolean;
       onclick?: () => void;
     }

     let { variant = 'primary', disabled = false, onclick }: Props = $props();

     let isHovered = $state(false);
     let isPressed = $state(false);
   </script>

   <button
     class="gooey-button {variant}"
     class:disabled
     on:mouseenter={() => isHovered = true}
     on:mouseleave={() => isHovered = false}
     on:mousedown={() => isPressed = true}
     on:mouseup={() => isPressed = false}
     {onclick}
     {disabled}
   >
     <slot />
   </button>
   ```

4. Maintain gooey filter effect:
   - SVG filters should continue working
   - Animation timings preserved
   - Visual effect identical

5. Test interactions:
   - Hover effects
   - Click/press states
   - Disabled state
   - Animation smoothness

**Verification Checklist**:
- [ ] GooeyButton uses `$props()` for configuration
- [ ] Interaction states use `$state()`
- [ ] Button behavior unchanged
- [ ] Gooey filter effect works
- [ ] Animations smooth
- [ ] Disabled state functional
- [ ] No console errors

**Testing Instructions**:
- Manual: Find pages using GooeyButton
- Hover: Test hover animations
- Click: Verify press/release states
- Disabled: Test disabled prop
- Visual: Verify gooey SVG effect renders

**Commit Message Template**:
```
refactor(components): modernize GooeyButton with Svelte 5 runes

- Convert props to $props() with interface
- Add interaction states with $state()
- Preserve gooey filter effect
- Test all button interactions
```

**Estimated tokens**: ~12,000

---

### Task 5: Review and Standardize Filter Components

**Goal**: Review SVGFilters and AndroidFilters components. These are likely presentational components that define SVG filter definitions - keep them simple unless they have complex logic.

**Files to Review**:
- `/src/lib/components/ui/SVGFilters.svelte`
- `/src/lib/components/ui/AndroidFilters.svelte`

**Prerequisites**:
- Task 4 complete (GooeyButton modernized)

**Implementation Steps**:

1. Read both filter components:
   - Are they purely presentational? (just SVG definitions)
   - Do they receive props? (filter colors, parameters)
   - Do they have any logic or state?

2. Decision tree:
   - **If purely static**: Keep as-is (no runes needed)
   - **If they receive props**: Add `$props()` with TypeScript
   - **If they have state**: Unlikely, but migrate to `$state()` if so

3. Most likely scenario (static filters):
   - These components probably just output `<svg>` with `<filter>` definitions
   - No migration needed - simple is better
   - Just ensure they're clean and well-commented

4. If they do need props (e.g., configurable colors):
   ```svelte
   <script lang="ts">
     interface Props {
       primaryColor?: string;
       intensity?: number;
     }

     let { primaryColor = '#ff0000', intensity = 1 }: Props = $props();
   </script>

   <svg style="position: absolute; width: 0; height: 0;">
     <defs>
       <filter id="gooey-filter">
         <!-- filter using primaryColor and intensity -->
       </filter>
     </defs>
   </svg>
   ```

5. Verify filter effects still work:
   - Gooey button effects
   - Android-specific effects
   - SVG rendering

**Verification Checklist**:
- [ ] SVGFilters component reviewed
- [ ] AndroidFilters component reviewed
- [ ] Migration decision made (likely keep simple)
- [ ] If props added, TypeScript interfaces defined
- [ ] Filter effects render correctly
- [ ] No visual regressions

**Testing Instructions**:
- Visual: Check all pages for filter effects
- Gooey: Verify gooey button effects work
- Android: Verify Android page effects work
- Console: No errors

**Commit Message Template**:
```
refactor(components): review filter components

- Analyze SVGFilters and AndroidFilters
- Keep components simple (presentational)
- Add TypeScript props if needed
- Verify filter effects functional
```

**Estimated tokens**: ~10,000

---

### Task 6: Modernize Icon Components

**Goal**: Review icon components and add TypeScript props if they accept configuration, but keep them simple since icons are typically presentational.

**Files to Review**:
- `/src/lib/components/icons/*.svelte` (all icon components)

**Prerequisites**:
- Task 5 complete (filter components reviewed)

**Implementation Steps**:

1. Review each icon component:
   - Are they static SVG exports?
   - Do they accept props (size, color, class)?
   - Is there any dynamic behavior?

2. Common icon patterns:
   - **Static SVG**: Keep as-is, no runes needed
   - **Configurable props**: Add `$props()` with TypeScript
   - **Interactive**: Unlikely, but add state if needed

3. If icons accept props (common pattern):
   ```svelte
   <script lang="ts">
     interface Props {
       size?: number | string;
       class?: string;
       color?: string;
     }

     let {
       size = 24,
       class: className = '',
       color = 'currentColor'
     }: Props = $props();

     let sizeValue = $derived(typeof size === 'number' ? `${size}px` : size);
   </script>

   <svg
     class="icon {className}"
     width={sizeValue}
     height={sizeValue}
     viewBox="0 0 24 24"
     fill={color}
   >
     <!-- SVG path -->
   </svg>
   ```

4. Standardize icon API:
   - All icons accept same props (size, class, color)
   - Consistent default values
   - TypeScript interface can be shared

5. Test icons across the app:
   - Verify they render
   - Check sizing is correct
   - Ensure colors work

**Verification Checklist**:
- [ ] All icon components reviewed
- [ ] Consistent prop interface (if accepting props)
- [ ] TypeScript types added where appropriate
- [ ] Icons render correctly across app
- [ ] No visual regressions
- [ ] No console errors

**Testing Instructions**:
- Manual: Visit pages with icons
- Visual: Verify icon appearance
- Sizing: Check icons are correct size
- Color: Verify color inheritance works

**Commit Message Template**:
```
refactor(icons): standardize icon component props with TypeScript

- Review all icon components
- Add consistent prop interface for size, class, color
- Use $props() with TypeScript where needed
- Keep simple icons simple
- Verify icon rendering
```

**Estimated tokens**: ~10,000

---

### Task 7: Modernize Route Page Components (Except Navigation)

**Goal**: Update route page components (`+page.svelte` files) to use runes where beneficial, improving data handling and reactivity while keeping presentation simple.

**Files to Modify**:
- `/src/routes/+page.svelte` (home)
- `/src/routes/about/+page.svelte`
- `/src/routes/android/+page.svelte`
- `/src/routes/web/+page.svelte`
- `/src/routes/read/+page.svelte`
- `/src/routes/read/post/[slug]/+page.svelte`

**Files to SKIP**:
- `/src/routes/Header.svelte` ❌ (Phase 6 only)
- `/src/routes/+layout.svelte` (handle separately if needed)

**Prerequisites**:
- Tasks 1-6 complete (components modernized)

**Implementation Steps**:

1. For each route page component:
   - Read current implementation
   - Identify data from `+page.ts` or `+page.js` (accessed via `export let data`)
   - Check for local state (filters, sorting, UI state)
   - Note any computed values or effects

2. Migration pattern for route pages:
   ```svelte
   <script lang="ts">
     import type { PageData } from './$types';

     // SvelteKit page data prop
     let { data }: { data: PageData } = $props();

     // Local UI state
     let filter = $state('all');
     let sortOrder = $state<'asc' | 'desc'>('asc');

     // Computed from data + local state
     let filteredProjects = $derived(
       data.projects
         .filter(p => filter === 'all' || p.category === filter)
         .sort((a, b) => sortOrder === 'asc' ? a.id - b.id : b.id - a.id)
     );
   </script>
   ```

3. Handle each page:
   - **Home** (`/`): Might have image grid state, Firefox redirect logic
   - **About**: Likely simple, minimal state
   - **Android**: Project filtering/sorting if implemented
   - **Web**: Project filtering/sorting if implemented
   - **Read**: Blog post list, might have filtering
   - **Read/post/[slug]**: Single post display, likely simple

4. Special consideration for home page Firefox redirect:
   - Review the redirect logic carefully
   - Ensure any `onMount` or reactive statements are migrated to `$effect()` properly
   - Test redirect behavior thoroughly

5. Test each route:
   - Navigate to route
   - Verify data displays correctly
   - Test any interactive features (filters, sorting)
   - Check console for errors

**Verification Checklist**:
- [ ] All route pages (except Header) reviewed
- [ ] Page data props use `$props()` with PageData type
- [ ] Local UI state uses `$state()`
- [ ] Computed values use `$derived()` where appropriate
- [ ] Effects use `$effect()` (Firefox redirect, etc.)
- [ ] Header.svelte NOT modified
- [ ] All routes load and display correctly
- [ ] Interactive features work
- [ ] No console errors

**Testing Instructions**:
- Manual: Visit every route
  - `/` - Test image grid, any interactions
  - `/about` - Verify content displays
  - `/android` - Test project display
  - `/web` - Test project display
  - `/read` - Test blog list
  - `/read/post/[slug]` - Test individual post
- Firefox: Test redirect behavior on home page
- Data: Verify all data from loaders displays correctly
- Console: Check for no errors on each route

**Commit Message Template**:
```
refactor(routes): modernize route page components with Svelte 5 runes

- Convert page data props to $props() with PageData type
- Migrate local UI state to $state()
- Use $derived() for computed values
- Migrate effects to $effect()
- Exclude Header.svelte (Phase 6)
- Test all routes thoroughly
```

**Estimated tokens**: ~18,000

---

### Task 8: Review and Update Root Layout

**Goal**: Review `/src/routes/+layout.svelte` and update to use runes if needed, ensuring app-wide layout logic is modern while being careful not to break anything.

**Files to Modify**:
- `/src/routes/+layout.svelte`

**Prerequisites**:
- Task 7 complete (route pages modernized)

**Implementation Steps**:

1. Read current `+layout.svelte` implementation:
   - What does it currently do? (likely renders Header, slot for pages, maybe footer)
   - Does it use app store?
   - Are there any effects (theme initialization, etc.)?
   - Does it import global styles?

2. Based on Phase 0 exploration, layout might:
   - Initialize app store
   - Apply theme
   - Render Header component
   - Provide page slot
   - Handle fade-in animation

3. Modernize carefully:
   - If it has props from `+layout.ts`, use `$props()`
   - If it has initialization logic, use `$effect()`
   - Keep it simple - layout should be stable

4. Example pattern (adapt to actual code):
   ```svelte
   <script lang="ts">
     import { appStore } from '$lib/stores/app.svelte';
     import Header from './Header.svelte';
     import '../app.css';

     // If layout receives data
     // let { data } = $props();

     // Theme initialization effect
     $effect(() => {
       // Initialize theme, reducedMotion, etc.
       document.documentElement.setAttribute(
         'data-theme',
         appStore.preferences.theme
       );
     });
   </script>

   <div class="app">
     <Header />
     <main>
       <slot />
     </main>
   </div>
   ```

5. Be conservative:
   - If current layout works well, minimal changes
   - Focus on runes for any new patterns, not forced migration
   - Test extensively

6. Test thoroughly:
   - Visit all routes
   - Verify header appears everywhere
   - Check theme application
   - Ensure page transitions work
   - Test any fade-in animations

**Verification Checklist**:
- [ ] Root layout reviewed and updated if needed
- [ ] Any initialization logic uses `$effect()`
- [ ] Layout renders correctly across all routes
- [ ] Header component appears on all pages
- [ ] Theme/preferences applied correctly
- [ ] Page transitions/animations work
- [ ] No console errors
- [ ] No visual regressions

**Testing Instructions**:
- Manual: Navigate through all routes multiple times
- Theme: Test theme switching if implemented
- Layout: Verify consistent header/footer across pages
- Animations: Check any mount animations
- Console: No errors

**Commit Message Template**:
```
refactor(layout): modernize root layout with Svelte 5 patterns

- Review and update +layout.svelte
- Use $effect() for initialization logic
- Ensure consistent layout across routes
- Test theme and app-wide features
```

**Estimated tokens**: ~10,000

---

## Phase Verification

Before proceeding to Phase 3, ensure:

### Component Modernization
- [ ] ProjectCard uses runes appropriately
- [ ] ImageGrid uses runes for state and effects
- [ ] GooeyButton uses runes for interaction states
- [ ] Filter components (SVG, Android) kept simple or use typed props
- [ ] Icon components standardized with TypeScript
- [ ] All route pages (except Header) modernized
- [ ] Root layout updated and functional

### Code Quality
- [ ] All stateful components use `$state()`
- [ ] All components with props use `$props()` with TypeScript
- [ ] Computed values use `$derived()` where appropriate
- [ ] Side effects use `$effect()` instead of `onMount` or reactive statements
- [ ] Simple components kept simple (no forced migration)

### TypeScript
- [ ] All component props have TypeScript interfaces
- [ ] Types imported from `$lib/types` where shared
- [ ] No TypeScript errors (`pnpm run check` passes)

### Functionality
- [ ] All components render correctly
- [ ] All routes load and display properly
- [ ] Interactive features work (hover, click, animations)
- [ ] Image loading and lazy loading work
- [ ] Filters and sorting work (if implemented)
- [ ] Theme/preferences apply correctly

### Testing
- [ ] Manual testing on all routes complete
- [ ] All component interactions tested
- [ ] No console errors
- [ ] No visual regressions
- [ ] Animations and transitions work
- [ ] `pnpm dev` runs successfully
- [ ] `pnpm build` succeeds
- [ ] `pnpm preview` works

### Git
- [ ] All changes committed atomically
- [ ] Conventional commit format used
- [ ] Git author is HatmanStack
- [ ] Working on correct branch

### Exclusions Verified
- [ ] **Header.svelte NOT modified** (reserved for Phase 6)
- [ ] Navigation components untouched

## Integration Points

This phase prepares for:
- **Phase 3**: Styling with CSS custom properties (components have clear structure)
- **Phase 4**: Type system refinement (components use centralized types)
- **Phase 5**: Performance optimization (modern reactivity patterns)
- **Phase 6**: Navigation modernization (other components done, can focus on Header)

## Known Limitations

- Header.svelte not modernized yet (Phase 6)
- Automated tests still minimal (manual testing required)
- Some simple components may not use runes (intentional - pragmatic approach)

## Success Metrics

Phase 2 is successful when:
- Components use modern Svelte 5 patterns consistently
- TypeScript provides better type safety
- Code is more maintainable and readable
- Application functionality is 100% preserved
- No performance regressions
- Foundation is set for styling and performance work
