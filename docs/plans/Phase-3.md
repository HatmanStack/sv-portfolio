# Phase 3: Styling Architecture Migration

## Phase Goal

Migrate from SCSS variables to CSS custom properties (CSS variables) for all theming and design tokens, creating a modern, runtime-themeable styling system. This enables better browser DevTools support, runtime theme switching, and reduces reliance on build-time preprocessing. If CSS custom properties cause insurmountable issues, we have a fallback plan to use a hybrid approach (CSS vars for theme values, SCSS for complex logic).

**Success Criteria**:
- Design token system using CSS custom properties
- Light/dark theme switching works correctly
- All SCSS variables migrated to CSS custom properties
- SCSS retained only for complex mixins/nesting if beneficial
- No visual regressions
- Theme switching is smooth and functional

**Estimated tokens**: ~90,000

---

## Prerequisites

- Phase 0 read (especially ADR-004 on styling architecture)
- Phase 1 complete (file structure organized)
- Phase 2 complete (components modernized)
- Application builds and runs successfully

---

## Tasks

### Task 1: Audit Current Styling System

**Goal**: Understand the current SCSS setup, identify all variables, analyze theming implementation, and plan the migration to CSS custom properties.

**Files to Review**:
- `/src/lib/styles/*.scss` (variables.scss, components.scss)
- `/src/app.css` - Global styles
- Component `<style>` blocks - How they use SCSS
- Current theme implementation in app store

**Prerequisites**:
- None

**Implementation Steps**:

1. Catalog current SCSS files:
   - Read `/src/lib/styles/variables.scss` (if exists)
   - Read `/src/lib/styles/components.scss` (if exists)
   - List all SCSS variables being used

2. Identify variable categories:
   - Colors (primitives and semantic)
   - Spacing/sizing
   - Typography (fonts, sizes, weights)
   - Effects (shadows, borders, radius)
   - Breakpoints
   - Z-index layers
   - Transitions/animations

3. Review theme implementation:
   - How is light/dark theme currently handled?
   - Where is theme applied? (app store, root layout, CSS)
   - Are theme colors hardcoded or variable-based?

4. Analyze SCSS usage patterns:
   - Which components use SCSS features?
   - Are there complex mixins or functions?
   - Is nesting heavily used?
   - Any build-time calculations?

5. Identify migration challenges:
   - SCSS features that can't be replicated in CSS
   - Complex calculations that need SCSS
   - Browser compatibility concerns (very unlikely for CSS vars)

6. Document migration plan:
   - Which SCSS variables → CSS custom properties
   - Which SCSS features to keep (mixins, nesting)
   - Fallback scenarios

**Verification Checklist**:
- [ ] All SCSS files identified and reviewed
- [ ] All SCSS variables cataloged
- [ ] Current theme implementation understood
- [ ] SCSS feature usage documented
- [ ] Migration challenges identified
- [ ] Clear plan for CSS custom properties

**Testing Instructions**:
- No testing for audit
- Documentation as notes or comments

**Commit Message Template**:
```
docs(styles): audit current SCSS system for CSS custom properties migration

- Catalog all SCSS variables and usage
- Document current theme implementation
- Identify migration challenges
- Plan CSS custom properties structure
```

**Estimated tokens**: ~10,000

---

### Task 2: Create CSS Custom Properties Design Token System

**Goal**: Create a comprehensive design token system using CSS custom properties in a new file, defining all color primitives, semantic colors, spacing, typography, and effects.

**Files to Create/Modify**:
- `/src/lib/styles/tokens.css` - New file for design tokens
- `/src/app.css` - Import tokens

**Prerequisites**:
- Task 1 complete (audit done, variables cataloged)

**Implementation Steps**:

1. Create `/src/lib/styles/tokens.css` file

2. Structure design tokens following best practices:

   ```css
   /* ===================================
    * Design Tokens - CSS Custom Properties
    * ===================================*/

   :root {
     /* ===== Color Primitives ===== */
     /* These are base colors - don't use directly in components */

     --color-gray-50: #f9fafb;
     --color-gray-100: #f3f4f6;
     --color-gray-200: #e5e7eb;
     --color-gray-300: #d1d5db;
     --color-gray-400: #9ca3af;
     --color-gray-500: #6b7280;
     --color-gray-600: #4b5563;
     --color-gray-700: #374151;
     --color-gray-800: #1f2937;
     --color-gray-900: #111827;

     --color-blue-500: #3b82f6;
     --color-blue-600: #2563eb;
     /* Add other color primitives from current theme */

     /* ===== Semantic Colors ===== */
     /* These are what components should use */

     --color-text-primary: var(--color-gray-900);
     --color-text-secondary: var(--color-gray-600);
     --color-text-tertiary: var(--color-gray-500);
     --color-text-inverse: var(--color-gray-50);

     --color-bg-primary: #ffffff;
     --color-bg-secondary: var(--color-gray-50);
     --color-bg-tertiary: var(--color-gray-100);
     --color-bg-inverse: var(--color-gray-900);

     --color-border-primary: var(--color-gray-200);
     --color-border-secondary: var(--color-gray-300);

     --color-accent-primary: var(--color-blue-600);
     --color-accent-hover: var(--color-blue-500);

     /* ===== Spacing ===== */
     --space-1: 0.25rem;   /* 4px */
     --space-2: 0.5rem;    /* 8px */
     --space-3: 0.75rem;   /* 12px */
     --space-4: 1rem;      /* 16px */
     --space-5: 1.25rem;   /* 20px */
     --space-6: 1.5rem;    /* 24px */
     --space-8: 2rem;      /* 32px */
     --space-10: 2.5rem;   /* 40px */
     --space-12: 3rem;     /* 48px */
     --space-16: 4rem;     /* 64px */

     /* ===== Typography ===== */
     --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
     --font-mono: 'Fira Mono', 'Courier New', monospace;

     --font-size-xs: 0.75rem;    /* 12px */
     --font-size-sm: 0.875rem;   /* 14px */
     --font-size-base: 1rem;     /* 16px */
     --font-size-lg: 1.125rem;   /* 18px */
     --font-size-xl: 1.25rem;    /* 20px */
     --font-size-2xl: 1.5rem;    /* 24px */
     --font-size-3xl: 1.875rem;  /* 30px */
     --font-size-4xl: 2.25rem;   /* 36px */

     --font-weight-normal: 400;
     --font-weight-medium: 500;
     --font-weight-semibold: 600;
     --font-weight-bold: 700;

     --line-height-tight: 1.25;
     --line-height-normal: 1.5;
     --line-height-relaxed: 1.75;

     /* ===== Effects ===== */
     --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
     --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
     --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
     --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

     --radius-sm: 0.25rem;   /* 4px */
     --radius-md: 0.5rem;    /* 8px */
     --radius-lg: 0.75rem;   /* 12px */
     --radius-xl: 1rem;      /* 16px */
     --radius-full: 9999px;

     --transition-fast: 150ms;
     --transition-base: 200ms;
     --transition-slow: 300ms;
     --transition-slower: 500ms;

     /* ===== Z-Index Scale ===== */
     --z-base: 0;
     --z-dropdown: 1000;
     --z-sticky: 1100;
     --z-fixed: 1200;
     --z-modal-backdrop: 1300;
     --z-modal: 1400;
     --z-popover: 1500;
     --z-tooltip: 1600;
   }

   /* ===== Dark Theme ===== */
   [data-theme="dark"] {
     --color-text-primary: var(--color-gray-50);
     --color-text-secondary: var(--color-gray-400);
     --color-text-tertiary: var(--color-gray-500);
     --color-text-inverse: var(--color-gray-900);

     --color-bg-primary: var(--color-gray-900);
     --color-bg-secondary: var(--color-gray-800);
     --color-bg-tertiary: var(--color-gray-700);
     --color-bg-inverse: var(--color-gray-50);

     --color-border-primary: var(--color-gray-700);
     --color-border-secondary: var(--color-gray-600);
   }

   /* ===== Reduced Motion ===== */
   @media (prefers-reduced-motion: reduce) {
     :root {
       --transition-fast: 0ms;
       --transition-base: 0ms;
       --transition-slow: 0ms;
       --transition-slower: 0ms;
     }
   }
   ```

3. Adapt the above template to match:
   - Current color scheme in the portfolio
   - Actual spacing values being used
   - Font families from the app
   - Existing shadow/border styles

4. Import tokens in `/src/app.css`:
   ```css
   @import './lib/styles/tokens.css';

   /* Rest of global styles */
   ```

5. Test tokens load:
   - Run `pnpm dev`
   - Inspect root element in DevTools
   - Verify CSS custom properties appear on `:root`

**Verification Checklist**:
- [ ] `/src/lib/styles/tokens.css` file created
- [ ] All color primitives defined
- [ ] Semantic color tokens defined
- [ ] Spacing scale defined
- [ ] Typography tokens defined
- [ ] Effects (shadows, radius, transitions) defined
- [ ] Dark theme overrides defined
- [ ] Reduced motion support added
- [ ] Tokens imported in app.css
- [ ] CSS custom properties visible in DevTools

**Testing Instructions**:
- Dev: Run `pnpm dev`
- Inspect: Open DevTools, inspect `<html>` element
- Verify: See custom properties like `--color-text-primary`, `--space-4`, etc.
- Theme: Check that `[data-theme="dark"]` selector is present

**Commit Message Template**:
```
style(tokens): create CSS custom properties design token system

- Create comprehensive design tokens in tokens.css
- Define color primitives and semantic tokens
- Add spacing, typography, and effects scales
- Include dark theme overrides
- Support reduced motion preference
- Import in app.css
```

**Estimated tokens**: ~15,000

---

### Task 3: Migrate Global Styles to Use CSS Custom Properties

**Goal**: Update `/src/app.css` and any global SCSS files to use the new CSS custom properties instead of SCSS variables or hardcoded values.

**Files to Modify**:
- `/src/app.css` - Main global styles
- `/src/lib/styles/components.scss` - If it exists and has global styles

**Prerequisites**:
- Task 2 complete (tokens created)

**Implementation Steps**:

1. Read current `/src/app.css`:
   - Identify all color values (hex, rgb)
   - Identify spacing/sizing hardcoded values
   - Note any SCSS variables being used
   - Check for theme-related styles

2. Replace hardcoded values with tokens:
   ```css
   /* ❌ Before */
   body {
     color: #1f2937;
     background: #ffffff;
     padding: 16px;
     font-family: sans-serif;
   }

   /* ✅ After */
   body {
     color: var(--color-text-primary);
     background: var(--color-bg-primary);
     padding: var(--space-4);
     font-family: var(--font-sans);
   }
   ```

3. Update theme-aware styles:
   - Remove manual dark mode styles if they duplicate token system
   - Rely on `[data-theme="dark"]` overrides in tokens.css
   - Simplify global styles now that tokens handle theming

4. Verify typography:
   - Body font uses `var(--font-sans)` or `var(--font-mono)`
   - Font sizes use token scale
   - Line heights use tokens

5. Update any global component styles:
   - If `/src/lib/styles/components.scss` has global styles, migrate them too
   - Replace SCSS variables with CSS custom properties
   - Keep SCSS only if using mixins or complex logic

6. Test visual appearance:
   - Run `pnpm dev`
   - Verify app looks identical to before
   - Test light and dark themes
   - Check spacing, colors, typography

**Verification Checklist**:
- [ ] All hardcoded colors in app.css replaced with tokens
- [ ] All spacing values use token scale
- [ ] Typography uses font tokens
- [ ] Theme switching works (light/dark)
- [ ] Visual appearance unchanged
- [ ] No regressions

**Testing Instructions**:
- Manual: Load app and visually compare to before
- Theme: Switch between light/dark (via app store if implemented)
- Spacing: Verify layout and spacing identical
- Console: No errors

**Commit Message Template**:
```
style(global): migrate global styles to CSS custom properties

- Replace hardcoded colors with semantic tokens
- Use spacing scale tokens
- Apply typography tokens
- Verify theme switching works
- Maintain visual consistency
```

**Estimated tokens**: ~12,000

---

### Task 4: Migrate Component Styles to CSS Custom Properties

**Goal**: Update all component `<style>` blocks to use CSS custom properties instead of hardcoded values or SCSS variables. This is the largest task in this phase.

**Files to Modify**:
- All `.svelte` components with `<style>` blocks
- Focus on `/src/lib/components/**/*.svelte`

**Prerequisites**:
- Task 3 complete (global styles migrated)

**Implementation Steps**:

1. Create a systematic approach:
   - Work through components one by one
   - Test each component after migration
   - Commit after each component or small groups

2. For each component `<style>` block:
   - Identify all color values
   - Identify all spacing/sizing values
   - Identify all typography declarations
   - Identify all effects (shadows, borders, transitions)

3. Replace with tokens:
   ```css
   /* ❌ Before */
   <style lang="scss">
     .card {
       background: #ffffff;
       color: #1f2937;
       padding: 16px;
       border-radius: 8px;
       box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
       transition: all 200ms;
     }

     .card:hover {
       background: #f3f4f6;
     }
   </style>

   /* ✅ After */
   <style>
     .card {
       background: var(--color-bg-primary);
       color: var(--color-text-primary);
       padding: var(--space-4);
       border-radius: var(--radius-md);
       box-shadow: var(--shadow-sm);
       transition: all var(--transition-base);
     }

     .card:hover {
       background: var(--color-bg-secondary);
     }
   </style>
   ```

4. Handle theme-specific styles:
   - If a component has different colors for light/dark:
   - Use semantic tokens (they change automatically)
   - Don't add theme-specific selectors in components if possible
   - Let tokens handle the theming

5. Consider removing `lang="scss"`:
   - If a component only used SCSS for variables, remove `lang="scss"`
   - Keep `lang="scss"` if using nesting, mixins, or other SCSS features
   - Evaluate case-by-case

6. Component-by-component checklist:
   - ProjectCard.svelte
   - ImageGrid.svelte
   - GooeyButton.svelte
   - SVGFilters.svelte
   - AndroidFilters.svelte
   - Icon components
   - Route page components
   - Any other components

7. Test each component:
   - Visual appearance unchanged
   - Hover states work
   - Animations smooth
   - Theme switching works
   - No console errors

8. **Decision point** (ADR-004 fallback):
   - If CSS custom properties cause major issues (specificity, complexity):
   - Stop and switch to hybrid approach
   - Keep CSS vars for theme colors only
   - Use SCSS for everything else
   - Document the decision

**Verification Checklist**:
- [ ] All component styles reviewed
- [ ] Colors replaced with semantic tokens
- [ ] Spacing uses scale tokens
- [ ] Typography uses font tokens
- [ ] Effects use shadow/transition tokens
- [ ] Theme switching works in all components
- [ ] Visual appearance preserved
- [ ] No regressions in interactions
- [ ] Decision made: full CSS vars or hybrid approach

**Testing Instructions**:
- Manual: Visit all routes and test all components
- Visual: Compare before/after screenshots if possible
- Interaction: Test hover, click, focus states
- Theme: Switch light/dark and verify all components adapt
- Animation: Ensure transitions are smooth
- Console: No errors

**Commit Message Template (per component or group)**:
```
style(components): migrate [ComponentName] to CSS custom properties

- Replace hardcoded colors with semantic tokens
- Use spacing and typography scales
- Apply effect tokens (shadows, transitions)
- Verify visual consistency and theme switching
```

**Estimated tokens**: ~30,000

---

### Task 5: Clean Up SCSS Files

**Goal**: Remove or refactor SCSS variable files that are now redundant, keeping only SCSS features that CSS can't replicate (mixins, complex logic).

**Files to Modify/Remove**:
- `/src/lib/styles/variables.scss` - Likely can be deleted
- `/src/lib/styles/components.scss` - Refactor or remove if redundant
- Any other SCSS files

**Prerequisites**:
- Task 4 complete (all components migrated)

**Implementation Steps**:

1. Review each SCSS file:
   - Is it still being imported anywhere?
   - Does it define variables? (can remove, replaced by CSS vars)
   - Does it have mixins? (keep if useful)
   - Does it have global styles? (migrate to CSS)

2. For `variables.scss`:
   - If it only defines variables, delete it entirely
   - If it has mixins, keep only the mixins
   - Update imports if removing

3. For `components.scss`:
   - If global component styles, migrate to app.css
   - If reusable mixins, keep them
   - If complex SCSS logic, evaluate if still needed

4. Update imports:
   - Remove imports of deleted SCSS files
   - Update svelte.config.js if SCSS preprocessing can be simplified
   - Verify build still works

5. Consider keeping SCSS preprocessing:
   - Even if not using variables, nesting is useful
   - Mixins might be valuable
   - Don't remove SCSS entirely unless truly not needed

6. Document what's kept:
   - If keeping any SCSS, document why
   - Note which mixins are valuable
   - Explain when to use SCSS vs CSS vars

**Verification Checklist**:
- [ ] SCSS variable files removed or refactored
- [ ] Only useful SCSS features retained (mixins, nesting)
- [ ] All imports updated
- [ ] Build succeeds
- [ ] No broken styles

**Testing Instructions**:
- Build: `pnpm build` should succeed
- Dev: `pnpm dev` should run
- Visual: App looks identical
- Styles: All styles still apply

**Commit Message Template**:
```
refactor(styles): clean up SCSS files after CSS custom properties migration

- Remove variables.scss (replaced by CSS custom properties)
- Keep useful SCSS mixins in components.scss
- Update imports and build configuration
- Verify all styles functional
```

**Estimated tokens**: ~10,000

---

### Task 6: Enhance Theme Switching Implementation

**Goal**: Ensure theme switching is robust, testing light/dark/auto modes thoroughly and connecting the app store theme preference to the CSS custom property system.

**Files to Modify**:
- `/src/lib/stores/app.svelte.ts` - App store with theme state
- `/src/routes/+layout.svelte` - Apply theme to DOM
- Any theme switcher UI component (if exists)

**Prerequisites**:
- Task 5 complete (SCSS cleanup done)

**Implementation Steps**:

1. Review current theme implementation:
   - Read app store to understand current theme state
   - Check how theme preference is persisted (localStorage)
   - Identify where theme is applied to DOM

2. Ensure theme application in layout:
   ```svelte
   <!-- /src/routes/+layout.svelte -->
   <script lang="ts">
     import { appStore } from '$lib/stores/app.svelte';
     import { browser } from '$app/environment';

     $effect(() => {
       if (browser) {
         const theme = appStore.preferences.theme;

         let appliedTheme = theme;
         if (theme === 'auto') {
           const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
           appliedTheme = prefersDark ? 'dark' : 'light';
         }

         document.documentElement.setAttribute('data-theme', appliedTheme);
       }
     });
   </script>
   ```

3. Test theme modes:
   - **Light**: Manually set and verify light colors
   - **Dark**: Manually set and verify dark colors
   - **Auto**: Test system preference detection
     - Change OS theme
     - Verify app theme follows

4. Verify theme persistence:
   - Change theme
   - Reload page
   - Verify theme persists (localStorage)

5. Test all components in both themes:
   - Navigate through all routes
   - Verify all components use semantic tokens correctly
   - Check for any hardcoded colors that don't switch
   - Ensure readability in both themes

6. Check reduced motion:
   - Enable "reduce motion" in OS settings
   - Verify animations are disabled
   - Check that tokens adjust (if implemented)

7. If theme switcher UI exists, test it:
   - Click through theme options
   - Verify immediate visual feedback
   - Check persistence

**Verification Checklist**:
- [ ] Theme switching works (light/dark/auto)
- [ ] Theme persists across page reloads
- [ ] System preference detection works (auto mode)
- [ ] All components adapt to theme correctly
- [ ] No components have hardcoded theme colors
- [ ] Reduced motion preference respected
- [ ] Theme switcher UI functional (if exists)
- [ ] Smooth theme transitions

**Testing Instructions**:
- Manual: Click theme switcher (if UI exists) or modify store directly
- Light: Verify all pages in light mode
- Dark: Verify all pages in dark mode
- Auto: Change OS theme setting and verify app follows
- Persistence: Reload page, verify theme persists
- Motion: Enable "reduce motion" in OS, verify animations disabled

**Commit Message Template**:
```
feat(theme): enhance theme switching with CSS custom properties

- Connect app store theme to data-theme attribute
- Support light, dark, and auto (system) modes
- Ensure theme persistence via localStorage
- Test all components in both themes
- Support reduced motion preference
```

**Estimated tokens**: ~13,000

---

## Phase Verification

Before proceeding to Phase 4, ensure:

### CSS Custom Properties System
- [ ] Design tokens created in tokens.css
- [ ] Color primitives and semantic tokens defined
- [ ] Spacing, typography, effects scales defined
- [ ] Dark theme overrides defined
- [ ] Reduced motion support implemented

### Migration Complete
- [ ] All global styles use CSS custom properties
- [ ] All component styles use CSS custom properties
- [ ] No hardcoded colors, spacing, or typography (except edge cases)
- [ ] SCSS variables removed or refactored
- [ ] Only necessary SCSS features retained

### Theme Switching
- [ ] Light theme works correctly
- [ ] Dark theme works correctly
- [ ] Auto (system preference) mode works
- [ ] Theme persists across reloads
- [ ] All components adapt to theme
- [ ] Smooth theme transitions

### Visual Consistency
- [ ] App looks identical to before refactoring
- [ ] No visual regressions
- [ ] Spacing preserved
- [ ] Typography preserved
- [ ] Colors accurate in both themes
- [ ] Shadows, borders, effects intact

### Testing
- [ ] All routes tested in light theme
- [ ] All routes tested in dark theme
- [ ] Theme switcher tested (if exists)
- [ ] Reduced motion tested
- [ ] No console errors
- [ ] `pnpm dev` runs successfully
- [ ] `pnpm build` succeeds
- [ ] `pnpm preview` works

### Build
- [ ] Build process unchanged or simplified
- [ ] CSS output size reasonable
- [ ] No SCSS compilation errors

### Git
- [ ] All changes committed atomically
- [ ] Conventional commits used
- [ ] Git author is HatmanStack

## Fallback Scenario

**If CSS custom properties cause major issues in Task 4:**

1. Stop migration at that point
2. Revert to hybrid approach:
   - Keep CSS custom properties for theme colors only
   - Use SCSS variables for spacing, typography, effects
   - Document the decision in Phase-0.md

3. Adjust tokens.css:
   ```css
   /* Only theme colors as CSS vars */
   :root {
     --color-text-primary: #1f2937;
     --color-bg-primary: #ffffff;
     /* ... only colors */
   }

   [data-theme="dark"] {
     --color-text-primary: #f9fafb;
     --color-bg-primary: #111827;
   }
   ```

4. Create SCSS variables for everything else:
   ```scss
   // variables.scss
   $space-4: 1rem;
   $font-sans: sans-serif;
   // ... other tokens
   ```

5. Update components to use hybrid:
   ```css
   .component {
     color: var(--color-text-primary); /* CSS var for theme */
     padding: $space-4;                 /* SCSS var for spacing */
   }
   ```

6. Continue with rest of refactoring

**Trigger for fallback**:
- CSS specificity battles become unmanageable
- Performance issues with many custom properties
- Browser bugs with custom properties (extremely unlikely)
- Migration complexity exceeds benefits

## Integration Points

This phase enables:
- **Phase 4**: Type system can include theme types
- **Phase 5**: Performance benefits from simpler CSS
- **Phase 6**: Navigation can use consistent theme system
- **Future**: Easy runtime theme customization, new color schemes

## Known Limitations

- Some SVG filter values might not support CSS custom properties (color literals required)
- Complex SCSS mixins may still be needed for special cases
- Build-time calculations can't be fully replaced by runtime CSS vars

## Success Metrics

Phase 3 is successful when:
- Entire app uses CSS custom properties for theming
- Light and dark themes work flawlessly
- Visual appearance is 100% preserved
- Theme switching is smooth and instant
- Code is cleaner and more maintainable
- Foundation is set for easy theme customization in the future
