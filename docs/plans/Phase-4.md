# Phase 4: Type System Organization

## Phase Goal

Refine and organize the TypeScript type system to follow a centralized, well-documented structure. All shared types will live in `/lib/types/index.ts` as a single source of truth, with clear organization, comprehensive JSDoc comments, and strict type safety across the codebase. This makes the type system easier to maintain and prevents type drift.

**Success Criteria**:
- All shared types centralized in `/lib/types/index.ts`
- Types are well-organized with clear categories
- Comprehensive JSDoc documentation for all types
- No duplicate type definitions across codebase
- All imports use `import type { }` syntax
- TypeScript strict mode passes (`pnpm run check`)

**Estimated tokens**: ~70,000

---

## Prerequisites

- Phase 0 read (especially ADR-005 on type organization)
- Phases 1-3 complete (structure, components, styles modernized)
- TypeScript fundamentals understood
- Application builds and runs successfully

---

## Tasks

### Task 1: Audit Current Type System

**Goal**: Identify all TypeScript types, interfaces, and type definitions across the codebase, understanding current organization and identifying opportunities for consolidation.

**Files to Review**:
- `/src/lib/types/index.ts` - Current centralized types
- All `.svelte` files - Component prop types
- All `.ts`/`.js` files - Utility function types
- `/src/lib/stores/*.svelte.ts` - Store types
- Route files with PageData types

**Prerequisites**:
- None

**Implementation Steps**:

1. Read `/src/lib/types/index.ts`:
   - Catalog all existing types
   - Note organization (or lack thereof)
   - Identify any documentation
   - Check for export patterns

2. Search for type definitions in components:
   - Look for `interface Props` in components
   - Note which are reusable vs component-specific
   - Identify duplicate types (same shape, different names)

3. Search for types in other files:
   - Stores: What types do they export?
   - Utils: Any function parameter/return types?
   - Data files: Are data shapes typed?

4. Review SvelteKit generated types:
   - Check `$types` imports in route files
   - Understand PageData, LayoutData patterns
   - Note which are auto-generated vs manual

5. Identify issues:
   - Duplicate types
   - Inconsistent naming
   - Missing types (any usage of `any`)
   - Poor organization
   - Lack of documentation

6. Create consolidation plan:
   - Which types should be centralized
   - Which types should stay colocated
   - How to organize into categories
   - Documentation standards to apply

**Verification Checklist**:
- [ ] All type definitions cataloged
- [ ] Current organization understood
- [ ] Duplicates identified
- [ ] SvelteKit type patterns understood
- [ ] Consolidation plan clear

**Testing Instructions**:
- No testing for audit
- Document findings as notes

**Commit Message Template**:
```
docs(types): audit TypeScript type system

- Catalog all type definitions across codebase
- Identify duplicates and inconsistencies
- Plan type consolidation and organization
- Document current state
```

**Estimated tokens**: ~8,000

---

### Task 2: Define Type Organization Structure

**Goal**: Create a clear organizational structure for `/lib/types/index.ts` with distinct categories, making types easy to find and maintain.

**Files to Modify**:
- `/src/lib/types/index.ts` - Reorganize with clear sections

**Prerequisites**:
- Task 1 complete (audit done)

**Implementation Steps**:

1. Plan type categories:
   - **Domain Types**: Core business/content types (Project, BlogPost, etc.)
   - **Component Types**: Shared component prop interfaces
   - **Store Types**: State management types
   - **Utility Types**: Helper types, generic utilities
   - **Config Types**: App configuration, settings
   - **Navigation Types**: Menu, route types
   - **Theme Types**: Theme, color scheme types

2. Create structure template:
   ```typescript
   // /src/lib/types/index.ts

   /**
    * Type Definitions
    *
    * Centralized type system for the portfolio application.
    * All shared types should be defined here and imported as:
    *
    * import type { TypeName } from '$lib/types';
    */

   /* ============================================
    * Domain Types
    * ============================================ */

   /* ============================================
    * Component Prop Types
    * ============================================ */

   /* ============================================
    * Store Types
    * ============================================ */

   /* ============================================
    * Utility Types
    * ============================================ */

   /* ============================================
    * Configuration Types
    * ============================================ */

   /* ============================================
    * Theme Types
    * ============================================ */
   ```

3. Define naming conventions:
   - Interfaces for object shapes: `Project`, `BlogPost`
   - Types for unions/aliases: `Theme`, `SortOrder`
   - Props interfaces: `ProjectCardProps`, `ImageGridProps`
   - Suffix `Props` for component prop types
   - Suffix `State` for store state types
   - Clear, descriptive names

4. Set up documentation standards:
   - Every type must have JSDoc comment
   - Explain purpose and usage
   - Document all properties
   - Include examples for complex types

5. Reorganize existing types into this structure:
   - Move types into appropriate categories
   - Add JSDoc comments to existing types
   - Ensure consistent formatting

6. Verify organization:
   - Related types are grouped together
   - Easy to scan and find types
   - Clear category boundaries

**Verification Checklist**:
- [ ] Clear category structure defined
- [ ] Naming conventions established
- [ ] Documentation standards set
- [ ] Existing types reorganized
- [ ] File is well-formatted and scannable

**Testing Instructions**:
- Read: Review types file for clarity
- Check: Run `pnpm run check` - should pass

**Commit Message Template**:
```
refactor(types): organize type system into clear categories

- Create structured sections in types/index.ts
- Establish naming conventions
- Set documentation standards
- Reorganize existing types
```

**Estimated tokens**: ~10,000

---

### Task 3: Define Domain Types

**Goal**: Create comprehensive, well-documented types for all domain entities (projects, blog posts, images, etc.).

**Files to Modify**:
- `/src/lib/types/index.ts` - Add/refine domain types

**Prerequisites**:
- Task 2 complete (structure defined)

**Implementation Steps**:

1. Review data files to understand domain entities:
   - `/src/lib/data/projects.ts` (or similar) - What is a Project?
   - Blog post files - What is a BlogPost?
   - Image data - What is an Image?
   - Navigation data - What are navigation items?

2. Define Project type:
   ```typescript
   /**
    * Represents a portfolio project (CodePen favorite).
    *
    * Used to display project cards on the home page,
    * Android showcase, and Web showcase pages.
    */
   export interface Project {
     /** Unique identifier for the project */
     id: string;

     /** Project title/name */
     title: string;

     /** Short description of the project */
     description: string;

     /** URL to the live project (CodePen, external site, etc.) */
     url: string;

     /** Path or URL to project thumbnail image */
     image: string;

     /** Technology tags (e.g., "svelte", "css", "animation") */
     tags: string[];

     /** Category: which showcase page to display on */
     category?: 'android' | 'web' | 'general';

     /** Optional date created/published */
     date?: string;
   }
   ```

3. Define BlogPost type:
   ```typescript
   /**
    * Represents a blog post.
    *
    * Blog posts are written in Markdown with frontmatter
    * and loaded via MDSvex.
    */
   export interface BlogPost {
     /** URL-friendly slug (used in route /read/post/[slug]) */
     slug: string;

     /** Post title */
     title: string;

     /** Publication date (YYYY-MM-DD format) */
     date: string;

     /** Short excerpt/summary for listing pages */
     excerpt: string;

     /** Full post content (HTML from Markdown) */
     content?: string;

     /** Optional featured image */
     image?: string;

     /** Optional tags/categories */
     tags?: string[];
   }

   /**
    * Blog post metadata (frontmatter from Markdown files).
    */
   export interface BlogPostMetadata {
     title: string;
     date: string;
     excerpt: string;
     image?: string;
     tags?: string[];
   }
   ```

4. Define Image type (if used):
   ```typescript
   /**
    * Represents an image asset.
    */
   export interface ImageAsset {
     /** Image source path or URL */
     src: string;

     /** Alt text for accessibility */
     alt: string;

     /** Optional width in pixels */
     width?: number;

     /** Optional height in pixels */
     height?: number;

     /** Optional title/caption */
     title?: string;
   }
   ```

5. Define any other domain types based on your data

6. Ensure consistency with actual data:
   - Compare types with actual data files
   - Make properties optional where data might not have them
   - Use unions for fields with limited values

7. Update data files to use these types:
   ```typescript
   // /src/lib/data/projects.ts
   import type { Project } from '$lib/types';

   export const projects: Project[] = [
     // ...
   ];
   ```

**Verification Checklist**:
- [ ] All domain entities have type definitions
- [ ] Types match actual data structure
- [ ] All properties documented with JSDoc
- [ ] Optional vs required properties correct
- [ ] Data files import and use these types
- [ ] TypeScript check passes

**Testing Instructions**:
- TypeScript: `pnpm run check` should pass
- Data: Verify data files type-check correctly
- Editor: Check IntelliSense shows type info

**Commit Message Template**:
```
feat(types): define comprehensive domain types

- Add Project interface with full documentation
- Add BlogPost and BlogPostMetadata interfaces
- Add ImageAsset and other domain types
- Update data files to use typed exports
- Ensure type safety for all domain data
```

**Estimated tokens**: ~12,000

---

### Task 4: Define Component Prop Types

**Goal**: Create TypeScript interfaces for all component props, centralizing shared prop types and ensuring type safety across components.

**Files to Modify**:
- `/src/lib/types/index.ts` - Add component prop types
- Component files - Update to import centralized types

**Prerequisites**:
- Task 3 complete (domain types defined)

**Implementation Steps**:

1. Identify components that should have centralized prop types:
   - ProjectCard - displays a project
   - ImageGrid - displays grid of images
   - GooeyButton - button with effects
   - Any other reusable components

2. Define component prop interfaces:
   ```typescript
   /* ============================================
    * Component Prop Types
    * ============================================ */

   /**
    * Props for ProjectCard component.
    *
    * Displays a single project as a card with image,
    * title, description, and tags.
    */
   export interface ProjectCardProps {
     /** The project to display */
     project: Project;

     /** Visual variant of the card */
     variant?: 'default' | 'compact' | 'featured';

     /** Whether to show tags */
     showTags?: boolean;

     /** Additional CSS classes */
     class?: string;
   }

   /**
    * Props for ImageGrid component.
    *
    * Displays a responsive grid of images with optional
    * lazy loading and animations.
    */
   export interface ImageGridProps {
     /** Array of images to display */
     images: ImageAsset[];

     /** Number of columns (responsive) */
     columns?: number | { mobile: number; tablet: number; desktop: number };

     /** Gap between images (in spacing scale units) */
     gap?: number;

     /** Enable lazy loading */
     lazy?: boolean;

     /** Animation style for image entrance */
     animation?: 'fade' | 'slide' | 'none';
   }

   /**
    * Props for GooeyButton component.
    */
   export interface GooeyButtonProps {
     /** Button variant/style */
     variant?: 'primary' | 'secondary' | 'ghost';

     /** Button size */
     size?: 'sm' | 'md' | 'lg';

     /** Disabled state */
     disabled?: boolean;

     /** Click handler */
     onclick?: () => void;

     /** Additional CSS classes */
     class?: string;
   }
   ```

3. Update components to use these types:
   ```svelte
   <!-- ProjectCard.svelte -->
   <script lang="ts">
     import type { ProjectCardProps } from '$lib/types';

     let {
       project,
       variant = 'default',
       showTags = true,
       class: className = ''
     }: ProjectCardProps = $props();
   </script>
   ```

4. For simple components, consider keeping types colocated:
   - If a component's props are unique and not reused, can keep inline
   - Only centralize truly shared or complex types
   - Use judgment

5. Ensure prop types match actual usage:
   - Check all places component is used
   - Verify all props are typed
   - Make sure optional/required is correct

**Verification Checklist**:
- [ ] All reusable components have prop types
- [ ] Prop types documented with JSDoc
- [ ] Components import and use centralized types
- [ ] Type safety enforced in component usage
- [ ] Optional vs required props correct
- [ ] TypeScript check passes

**Testing Instructions**:
- TypeScript: `pnpm run check` should pass
- Editor: IntelliSense shows prop types when using components
- Usage: Verify components are used with correct prop types

**Commit Message Template**:
```
feat(types): define component prop type interfaces

- Add ProjectCardProps, ImageGridProps, GooeyButtonProps
- Document all component prop interfaces
- Update components to use centralized types
- Ensure type safety for component usage
```

**Estimated tokens**: ~12,000

---

### Task 5: Define Store Types

**Goal**: Create comprehensive types for all store state, ensuring type safety in state management.

**Files to Modify**:
- `/src/lib/types/index.ts` - Add store types
- `/src/lib/stores/*.svelte.ts` - Update to use centralized types

**Prerequisites**:
- Task 4 complete (component types defined)

**Implementation Steps**:

1. Review current app store structure:
   ```typescript
   // Review /src/lib/stores/app.svelte.ts
   // Understand current state shape
   ```

2. Define store types in `/lib/types/index.ts`:
   ```typescript
   /* ============================================
    * Store Types
    * ============================================ */

   /**
    * User preferences state.
    *
    * Stored in localStorage and applied app-wide.
    */
   export interface PreferencesState {
     /** Theme preference: light, dark, or auto (system) */
     theme: Theme;

     /** Whether sound effects are enabled */
     soundEnabled: boolean;

     /** Whether to respect prefers-reduced-motion */
     reducedMotion: boolean;
   }

   /**
    * Navigation state.
    *
    * Tracks current route, menu state, etc.
    */
   export interface NavigationState {
     /** Current section/route */
     currentSection: string;

     /** Whether mobile menu is open */
     isMenuOpen: boolean;
   }

   /**
    * App-wide state.
    *
    * Global application state managed by app store.
    */
   export interface AppState {
     /** Navigation state */
     navigation: NavigationState;

     /** User preferences */
     preferences: PreferencesState;

     /** Global loading state */
     isLoading: boolean;
   }
   ```

3. Define theme-related types:
   ```typescript
   /**
    * Theme options.
    *
    * - `light`: Light mode
    * - `dark`: Dark mode
    * - `auto`: Follow system preference
    */
   export type Theme = 'light' | 'dark' | 'auto';

   /**
    * Applied theme (after resolving 'auto').
    */
   export type AppliedTheme = 'light' | 'dark';
   ```

4. Update app store to use these types:
   ```typescript
   // /src/lib/stores/app.svelte.ts
   import type { AppState, PreferencesState, NavigationState } from '$lib/types';

   function createAppStore() {
     let state = $state<AppState>({
       navigation: {
         currentSection: '/',
         isMenuOpen: false
       },
       preferences: {
         theme: 'auto',
         soundEnabled: true,
         reducedMotion: false
       },
       isLoading: false
     });

     // ... rest of store
   }
   ```

5. If there are other stores (sound, etc.), type them too:
   ```typescript
   /**
    * Sound state.
    */
   export interface SoundState {
     /** Whether sound is loaded */
     loaded: boolean;

     /** Whether sound is currently playing */
     playing: boolean;

     /** Current playback position */
     currentTime: number;

     /** Total duration */
     duration: number;
   }
   ```

6. Ensure type safety:
   - All store state is typed
   - No implicit `any`
   - Store methods return correct types

**Verification Checklist**:
- [ ] All store state types defined
- [ ] Theme types defined
- [ ] Store state interfaces documented
- [ ] Stores import and use centralized types
- [ ] Type safety enforced in store usage
- [ ] TypeScript check passes

**Testing Instructions**:
- TypeScript: `pnpm run check` should pass
- Store: Verify app store state is fully typed
- Usage: Check store usage across components has correct types
- Editor: IntelliSense shows store state types

**Commit Message Template**:
```
feat(types): define store state type interfaces

- Add AppState, PreferencesState, NavigationState
- Define Theme and SoundState types
- Update stores to use centralized types
- Ensure type safety for state management
```

**Estimated tokens**: ~10,000

---

### Task 6: Define Utility and Helper Types

**Goal**: Create utility types for common patterns, helpers for type transformations, and any other generic types needed across the codebase.

**Files to Modify**:
- `/src/lib/types/index.ts` - Add utility types

**Prerequisites**:
- Task 5 complete (store types defined)

**Implementation Steps**:

1. Identify common utility types needed:
   - Sort orders
   - Filter options
   - Breakpoints
   - API response shapes
   - Function parameter/return types

2. Define utility types:
   ```typescript
   /* ============================================
    * Utility Types
    * ============================================ */

   /**
    * Sort order for lists.
    */
   export type SortOrder = 'asc' | 'desc';

   /**
    * Breakpoint names matching design system.
    */
   export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

   /**
    * Loading states for async operations.
    */
   export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

   /**
    * Generic async data wrapper.
    */
   export interface AsyncData<T> {
     data: T | null;
     state: LoadingState;
     error: Error | null;
   }

   /**
    * Pagination info.
    */
   export interface Pagination {
     currentPage: number;
     totalPages: number;
     itemsPerPage: number;
     totalItems: number;
   }
   ```

3. Add helper types for common transformations:
   ```typescript
   /**
    * Make all properties optional deeply.
    */
   export type DeepPartial<T> = {
     [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
   };

   /**
    * Make specific keys required.
    */
   export type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

   /**
    * Extract props from Svelte component.
    */
   export type ComponentProps<T> = T extends new (...args: any[]) => { $set: (props: infer P) => void } ? P : never;
   ```

4. Only add utility types that are actually used:
   - Don't create types "just in case"
   - Wait until you need them
   - YAGNI principle

5. Document usage examples:
   ```typescript
   /**
    * Async data wrapper for API calls.
    *
    * @example
    * ```typescript
    * let projectsData = $state<AsyncData<Project[]>>({
    *   data: null,
    *   state: 'idle',
    *   error: null
    * });
    * ```
    */
   export interface AsyncData<T> {
     // ...
   }
   ```

**Verification Checklist**:
- [ ] Utility types defined for common patterns
- [ ] Helper types added if needed
- [ ] All utility types documented with examples
- [ ] Only necessary types included (YAGNI)
- [ ] TypeScript check passes

**Testing Instructions**:
- TypeScript: `pnpm run check` should pass
- Usage: Verify utility types work where used
- Examples: Test example code snippets in JSDoc

**Commit Message Template**:
```
feat(types): add utility and helper types

- Define SortOrder, Breakpoint, LoadingState
- Add AsyncData and Pagination interfaces
- Include TypeScript helper types
- Document with usage examples
```

**Estimated tokens**: ~8,000

---

### Task 7: Ensure Strict Type Imports

**Goal**: Verify that all type imports across the codebase use the `import type` syntax, ensuring types are not bundled in runtime JavaScript.

**Files to Modify**:
- All files importing types

**Prerequisites**:
- Tasks 1-6 complete (all types defined)

**Implementation Steps**:

1. Search for type imports without `import type`:
   ```bash
   # Look for imports from $lib/types that don't use "import type"
   grep -r "from '\$lib/types'" src/
   grep -r 'from "$lib/types"' src/
   ```

2. For each file with type imports:
   - Verify using `import type { ... }`
   - Not `import { ... }`
   - Types should not be in runtime imports

3. Correct pattern:
   ```typescript
   // ✅ Correct
   import type { Project, BlogPost } from '$lib/types';
   import { writable } from 'svelte/store';

   // ❌ Wrong
   import { Project, BlogPost } from '$lib/types';
   ```

4. Check Svelte component imports:
   ```svelte
   <script lang="ts">
     // ✅ Correct
     import type { ProjectCardProps } from '$lib/types';

     // ❌ Wrong
     import { ProjectCardProps } from '$lib/types';
   </script>
   ```

5. SvelteKit generated types should also use `import type`:
   ```typescript
   // ✅ Correct
   import type { PageData } from './$types';

   // ❌ Wrong
   import { PageData } from './$types';
   ```

6. Configure TypeScript to enforce this:
   - Check `tsconfig.json` has `"verbatimModuleSyntax": true` (if using modern TS)
   - This enforces explicit `import type`

7. Search and fix all violations:
   - Use editor find/replace if many files
   - Test after each batch of changes
   - Ensure app still works

**Verification Checklist**:
- [ ] All type imports use `import type` syntax
- [ ] No runtime imports of types
- [ ] SvelteKit $types imports use `import type`
- [ ] TypeScript config enforces this (if possible)
- [ ] No TypeScript errors
- [ ] Application runs successfully

**Testing Instructions**:
- Search: Grep for type imports without `import type`
- TypeScript: `pnpm run check` should pass
- Build: `pnpm build` should not include types in bundle
- Runtime: App works identically

**Commit Message Template**:
```
refactor(types): ensure all type imports use import type syntax

- Convert type imports to use import type
- Prevent types from bundling in runtime JavaScript
- Verify TypeScript config enforces explicit type imports
- Test application functionality
```

**Estimated tokens**: ~8,000

---

### Task 8: Add JSDoc Documentation to All Types

**Goal**: Ensure every type, interface, and property has comprehensive JSDoc documentation, making the type system self-explanatory.

**Files to Modify**:
- `/src/lib/types/index.ts` - Add/improve JSDoc comments

**Prerequisites**:
- All previous tasks complete

**Implementation Steps**:

1. Review each type in `/lib/types/index.ts`:
   - Does it have a JSDoc comment?
   - Is the comment comprehensive?
   - Are all properties documented?

2. JSDoc documentation standards:
   ```typescript
   /**
    * Brief one-line description of the type.
    *
    * More detailed explanation if needed (optional).
    * Can span multiple lines and include additional context.
    *
    * @example
    * ```typescript
    * const project: Project = {
    *   id: 'abc123',
    *   title: 'Cool Animation',
    *   description: 'A neat CSS animation',
    *   url: 'https://codepen.io/...',
    *   image: '/images/project.png',
    *   tags: ['css', 'animation']
    * };
    * ```
    */
   export interface Project {
     /** Unique identifier for the project */
     id: string;

     /** Project title/name */
     title: string;

     /** Short description of the project */
     description: string;

     /** URL to the live project */
     url: string;

     /** Path or URL to project thumbnail */
     image: string;

     /** Technology tags */
     tags: string[];

     /** Category for filtering (optional) */
     category?: 'android' | 'web' | 'general';
   }
   ```

3. Documentation checklist for each type:
   - [ ] Type has description comment
   - [ ] Purpose is explained
   - [ ] Usage context provided
   - [ ] Example included (for complex types)
   - [ ] All properties have inline comments
   - [ ] Optional vs required is clear

4. For union types:
   ```typescript
   /**
    * Theme options.
    *
    * - `light`: Light mode with light background
    * - `dark`: Dark mode with dark background
    * - `auto`: Follow system preference (prefers-color-scheme)
    */
   export type Theme = 'light' | 'dark' | 'auto';
   ```

5. For complex types, add usage examples:
   ```typescript
   /**
    * Async data wrapper for managing loading states.
    *
    * Useful for components that fetch data and need to
    * show loading, error, and success states.
    *
    * @example
    * ```typescript
    * let projects = $state<AsyncData<Project[]>>({
    *   data: null,
    *   state: 'idle',
    *   error: null
    * });
    *
    * async function loadProjects() {
    *   projects.state = 'loading';
    *   try {
    *     const response = await fetch('/api/projects');
    *     projects.data = await response.json();
    *     projects.state = 'success';
    *   } catch (err) {
    *     projects.error = err;
    *     projects.state = 'error';
    *   }
    * }
    * ```
    */
   export interface AsyncData<T> {
     // ...
   }
   ```

6. Ensure consistent style:
   - Use full sentences
   - Be concise but clear
   - Explain "why" not just "what"
   - Include context

7. Review the entire file:
   - Read through as if you were a new developer
   - Is everything clear?
   - Are there any ambiguities?
   - Would you understand how to use each type?

**Verification Checklist**:
- [ ] All types have JSDoc comments
- [ ] All properties documented inline
- [ ] Complex types have examples
- [ ] Documentation is clear and helpful
- [ ] Consistent documentation style
- [ ] File is easy to read and understand

**Testing Instructions**:
- Read: Review types file as if you're new to the codebase
- Editor: Hover over types in IDE, verify JSDoc appears
- Clarity: Ensure all types are self-explanatory
- Examples: Verify example code is correct

**Commit Message Template**:
```
docs(types): add comprehensive JSDoc documentation

- Add JSDoc comments to all types and interfaces
- Document all properties with inline comments
- Include usage examples for complex types
- Ensure consistent documentation style
- Make type system self-explanatory
```

**Estimated tokens**: ~10,000

---

## Phase Verification

Before proceeding to Phase 5, ensure:

### Type Organization
- [ ] `/lib/types/index.ts` is well-organized with clear categories
- [ ] All shared types centralized
- [ ] Naming conventions consistent
- [ ] Related types grouped together

### Type Coverage
- [ ] All domain types defined (Project, BlogPost, etc.)
- [ ] All component prop types defined
- [ ] All store state types defined
- [ ] Utility types defined where needed
- [ ] No missing types (no usage of `any` except where necessary)

### Type Safety
- [ ] All type imports use `import type` syntax
- [ ] TypeScript strict mode passes (`pnpm run check`)
- [ ] Components use typed props
- [ ] Stores use typed state
- [ ] Data files export typed data

### Documentation
- [ ] Every type has JSDoc comment
- [ ] Every property documented
- [ ] Complex types have examples
- [ ] Documentation is clear and helpful
- [ ] File header explains purpose

### Functionality
- [ ] Application builds successfully
- [ ] No TypeScript errors
- [ ] IntelliSense works correctly
- [ ] Type checking provides useful feedback

### Git
- [ ] All changes committed atomically
- [ ] Conventional commits format
- [ ] Git author is HatmanStack

## Integration Points

This phase enables:
- **Phase 5**: Performance optimization with type-safe code
- **Phase 6**: Navigation with proper type safety
- **Phase 7**: Better testing with well-typed components
- **Future**: Easier refactoring with comprehensive types

## Known Limitations

- Some types may remain colocated in components (component-specific types)
- SvelteKit generates types in `$types` (not in our control)
- Some third-party library types can't be improved (external dependencies)

## Success Metrics

Phase 4 is successful when:
- Type system is centralized and well-organized
- All shared types have single source of truth
- TypeScript provides excellent IntelliSense
- Refactoring is safer with type checking
- New developers can understand types easily
- Documentation makes type system self-explanatory
- Zero TypeScript errors in strict mode
