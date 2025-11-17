# Phase 1: File Structure & Naming Conventions

## Phase Goal

Standardize all component file names to PascalCase and reorganize the `/lib/` directory structure to follow a clean type-based organization. This creates a consistent foundation for all future refactoring work. At the end of this phase, every component will have a clear, predictable location and name, making the codebase easier to navigate and maintain.

**Success Criteria**:
- All component `.svelte` files use PascalCase naming
- Directory structure matches the design from Phase-0 (ADR-002)
- All imports are updated and working
- Application builds and runs without errors

**Estimated tokens**: ~85,000

---

## Prerequisites

- Phase-0.md has been read and understood
- Development environment is set up (Node.js, pnpm, Git)
- Git is configured with HatmanStack credentials
- Working branch: `claude/refactor-svelte-modernize-01LsR5kgWUuPzQD8SZQteBbw`

---

## Tasks

### Task 1: Audit Current File Structure

**Goal**: Create a complete inventory of all files that need renaming or reorganization, identifying which files are already correctly named and which need changes.

**Files to Review**:
- All `.svelte` files in `/src/lib/components/`
- All `.svelte` files in `/src/lib/images/icons/`
- All files in `/src/lib/` subdirectories
- Route component files (note: these stay as-is)

**Prerequisites**:
- None

**Implementation Steps**:

1. Use file search tools to list all `.svelte` files in the codebase
2. For each component file, determine:
   - Current name and location
   - Whether it follows PascalCase convention (e.g., `ProjectCard.svelte` ✅ vs `project-card.svelte` ❌)
   - Whether it's in the correct directory per ADR-002
   - How many files import it (to understand refactoring scope)
3. Create a mental map or note file listing:
   - Files that need renaming
   - Files that are already correct
   - Files that are exceptions (route files like `+page.svelte`)
4. Identify any potential conflicts or edge cases

**Verification Checklist**:
- [ ] All `.svelte` component files have been identified
- [ ] Rename requirements are clear (which files need PascalCase)
- [ ] Route files (`+page.svelte`, `+layout.svelte`, `Header.svelte`) are identified as exceptions or needing special handling
- [ ] You understand the scope of import updates needed

**Testing Instructions**:
- No tests needed for audit phase
- Document findings for reference in subsequent tasks

**Commit Message Template**:
```
docs(refactor): audit file structure for Phase 1

- Identified components needing PascalCase rename
- Mapped current directory structure
- Documented reorganization scope
```

**Estimated tokens**: ~5,000

---

### Task 2: Rename Icon Components

**Goal**: Rename all icon components in `/src/lib/images/icons/` to PascalCase and update their imports.

**Files to Modify/Create**:
- `/src/lib/images/icons/*.svelte` - Rename to PascalCase
- Any files importing these icons - Update import statements

**Prerequisites**:
- Task 1 complete (audit done)

**Implementation Steps**:

1. Navigate to `/src/lib/images/icons/` directory
2. For each icon file (currently `linkedin.svelte` based on file listing):
   - Identify current naming convention
   - Determine correct PascalCase name (e.g., `linkedin.svelte` → `LinkedIn.svelte`)
3. Before renaming, search the entire codebase for imports of each icon:
   - Use grep/search to find all files importing the icon
   - Note the import paths
4. Rename each icon file to PascalCase:
   - Use `git mv` command to preserve Git history
   - Example: `git mv linkedin.svelte LinkedIn.svelte`
5. Update all import statements:
   - Change import paths to match new PascalCase names
   - Verify TypeScript/editor shows no errors
6. Test the application:
   - Run `pnpm dev`
   - Navigate to pages using these icons
   - Verify icons still display correctly
   - Check browser console for errors

**Verification Checklist**:
- [ ] All icon files use PascalCase naming (e.g., `LinkedIn.svelte`)
- [ ] All imports updated to match new names
- [ ] No TypeScript errors in editor
- [ ] Application runs without errors (`pnpm dev`)
- [ ] Icons display correctly on all pages

**Testing Instructions**:
- Manual: Visit all routes and verify icon components render
- Check: Browser console shows no 404s or module errors
- Visual: Icons appear and are styled correctly

**Commit Message Template**:
```
refactor(icons): rename icon components to PascalCase

- Rename linkedin.svelte to LinkedIn.svelte
- Update all icon imports
- Verify icons render correctly
```

**Estimated tokens**: ~8,000

---

### Task 3: Reorganize Icons into Components Directory

**Goal**: Move icon components from `/src/lib/images/icons/` to `/src/lib/components/icons/` to align with type-based organization where components live under `/lib/components/`.

**Files to Modify/Create**:
- Create `/src/lib/components/icons/` directory
- Move `/src/lib/images/icons/*.svelte` to new location
- Update all imports throughout codebase

**Prerequisites**:
- Task 2 complete (icons renamed to PascalCase)

**Implementation Steps**:

1. Create new directory structure:
   - Create `/src/lib/components/icons/` directory
2. Move icon components:
   - Use `git mv` to move each icon from `/src/lib/images/icons/` to `/src/lib/components/icons/`
   - Preserve Git history
3. Search for all imports of icon components:
   - Find patterns like `from '$lib/images/icons/LinkedIn.svelte'`
   - Update to `from '$lib/components/icons/LinkedIn.svelte'`
4. Clean up old directory:
   - If `/src/lib/images/icons/` is now empty, consider removing it
   - Or keep `/src/lib/images/` for actual image assets (PNGs, JPGs, etc.)
5. Test thoroughly:
   - Run `pnpm dev`
   - Check all routes using icons
   - Verify no import errors

**Verification Checklist**:
- [ ] `/src/lib/components/icons/` directory exists
- [ ] All icon `.svelte` files moved to new location
- [ ] All imports updated to new path
- [ ] No TypeScript errors
- [ ] Application builds and runs successfully
- [ ] Icons display correctly

**Testing Instructions**:
- Manual: Test all pages with icon components
- Build: Run `pnpm build` to catch any import errors
- Preview: Run `pnpm preview` and test production build

**Commit Message Template**:
```
refactor(icons): move icon components to /components/icons/

- Move icons from /images/icons/ to /components/icons/
- Update all import paths
- Align with type-based organization structure
```

**Estimated tokens**: ~10,000

---

### Task 4: Rename UI Components to PascalCase

**Goal**: Rename all UI components in `/src/lib/components/ui/` to PascalCase, ensuring consistency across the component library.

**Files to Modify/Create**:
- `/src/lib/components/ui/*.svelte` - Rename any non-PascalCase files
- All files importing these components - Update import statements

**Prerequisites**:
- Task 1 complete (audit done)

**Implementation Steps**:

1. Review components in `/src/lib/components/ui/`:
   - Current files: `GooeyButton.svelte`, `AndroidFilters.svelte`, `ImageGrid.svelte`, `SVGFilters.svelte`, `ProjectCard.svelte`
   - These already appear to be PascalCase! Verify they all follow the convention correctly
2. If any files are not PascalCase (check for inconsistencies like wrong capitalization):
   - Search codebase for all imports
   - Use `git mv` to rename
   - Update all import paths
3. Verify component names make sense:
   - `GooeyButton` ✅
   - `AndroidFilters` ✅
   - `ImageGrid` ✅
   - `SVGFilters` ✅
   - `ProjectCard` ✅
4. If all are already correct, verify imports use the correct casing throughout the codebase
5. Test application:
   - Run `pnpm dev`
   - Navigate to all routes
   - Verify all UI components render correctly

**Verification Checklist**:
- [ ] All UI component files use strict PascalCase
- [ ] Component names are semantically clear
- [ ] All imports reference correct casing
- [ ] No TypeScript/lint errors
- [ ] Application runs successfully

**Testing Instructions**:
- Manual: Visit home page, Android, Web, About, and Blog routes
- Visual: Verify all UI components display correctly
- Console: Check for no errors or warnings

**Commit Message Template**:
```
refactor(components): verify UI components use PascalCase

- Confirm all components in /ui/ follow naming convention
- Update any inconsistent imports
- Verify component rendering
```

**Estimated tokens**: ~10,000

---

### Task 5: Reorganize /lib/ Directory Structure

**Goal**: Ensure `/src/lib/` follows the clean type-based structure defined in ADR-002, creating any missing directories and organizing files appropriately.

**Files to Modify/Create**:
- Ensure these directories exist with correct organization:
  - `/src/lib/components/ui/`
  - `/src/lib/components/icons/`
  - `/src/lib/components/layouts/` (if needed)
  - `/src/lib/stores/`
  - `/src/lib/data/`
  - `/src/lib/hooks/`
  - `/src/lib/utils/` (create if doesn't exist)
  - `/src/lib/types/`
  - `/src/lib/styles/`
  - `/src/lib/images/` (for actual images, not icon components)
  - `/src/lib/sounds/`

**Prerequisites**:
- Tasks 1-4 complete

**Implementation Steps**:

1. Review current `/src/lib/` structure:
   - List all subdirectories
   - Identify any files in wrong locations
   - Note any missing directories from ADR-002
2. Create missing directories:
   - If `/src/lib/utils/` doesn't exist and utility files are scattered, create it
   - If layout components exist, ensure `/src/lib/components/layouts/` exists
3. Move misplaced files:
   - If any utility functions are in root `/lib/`, move to `/lib/utils/`
   - Ensure all components are under `/lib/components/`
   - Verify all stores are in `/lib/stores/`
4. Verify directory purposes:
   - `/components/` - only Svelte components
   - `/data/` - only static data files (JSON, TS data exports)
   - `/types/` - only TypeScript type definitions
   - `/utils/` - only helper functions
   - `/hooks/` - only Svelte-specific utilities
5. Update imports affected by any moves
6. Test application:
   - Run `pnpm dev` and verify everything works
   - Run `pnpm build` to catch import errors

**Verification Checklist**:
- [ ] All directories from ADR-002 exist
- [ ] Files are in semantically correct locations
- [ ] No files in `/lib/` root (everything is categorized)
- [ ] All imports updated for any moved files
- [ ] Application builds and runs successfully

**Testing Instructions**:
- Build: `pnpm build` should succeed
- Dev: `pnpm dev` should run without errors
- Manual: Test all routes

**Commit Message Template**:
```
refactor(structure): reorganize /lib/ to type-based structure

- Ensure all directories from ADR-002 exist
- Move misplaced files to correct locations
- Update imports for moved files
- Verify clean directory organization
```

**Estimated tokens**: ~12,000

---

### Task 6: Update Route Component Organization

**Goal**: Review route components (`Header.svelte`, `+page.svelte` files, `+layout.svelte` files) and ensure they're organized appropriately. Note: these files don't get renamed (SvelteKit convention), but we verify their organization makes sense.

**Files to Review**:
- `/src/routes/Header.svelte` - Verify location and naming
- `/src/routes/+layout.svelte` - Verify usage
- All `/src/routes/*/+page.svelte` files - Verify organization

**Prerequisites**:
- Tasks 1-5 complete

**Implementation Steps**:

1. Review route component files:
   - `Header.svelte` - This is route-specific, location is correct
   - `+layout.svelte` - Root layout, location is correct
   - `+page.svelte` files in various routes - All correct per SvelteKit conventions
2. Consider if `Header.svelte` should move:
   - Option A: Keep in `/routes/` (route-specific component)
   - Option B: Move to `/lib/components/layouts/Header.svelte` (reusable layout component)
   - Decision: Keep in `/routes/` since it's tightly coupled to route structure
3. Verify no route components are misplaced in `/lib/`
4. Document route component organization:
   - `/routes/Header.svelte` - Site navigation header
   - `/routes/+layout.svelte` - Root layout wrapper
   - `/routes/+page.svelte` - Home page
   - `/routes/[route]/+page.svelte` - Route-specific pages
5. Ensure consistency:
   - All route components use proper imports
   - No confusion between route and lib components

**Verification Checklist**:
- [ ] All route components are in `/routes/` directory
- [ ] No route-specific components misplaced in `/lib/`
- [ ] Organization is clear and follows SvelteKit conventions
- [ ] Header.svelte location is intentional and documented

**Testing Instructions**:
- Manual: Navigate through all routes
- Visual: Verify header appears on all pages
- Layout: Verify layout wrapper works correctly

**Commit Message Template**:
```
docs(routes): document route component organization

- Verify route components follow SvelteKit conventions
- Document Header.svelte location decision
- Ensure clear separation between route and lib components
```

**Estimated tokens**: ~10,000

---

### Task 7: Create Directory Structure Documentation

**Goal**: Create a simple reference document showing the final directory structure, making it easy for future developers (or yourself) to understand the organization at a glance.

**Files to Create**:
- `/docs/STRUCTURE.md` - Directory structure documentation

**Prerequisites**:
- All previous tasks in Phase 1 complete

**Implementation Steps**:

1. Create `/docs/STRUCTURE.md` file
2. Document the directory structure with explanations:
   - Show tree structure of `/src/lib/`
   - Explain purpose of each directory
   - Provide examples of what belongs where
   - Reference ADR-002 from Phase-0
3. Include conventions:
   - PascalCase for component files
   - Type-based organization
   - Where to put new files
4. Keep it concise and scannable (developers should find info in < 30 seconds)
5. Add quick reference for common scenarios:
   - "Where do I put a new UI component?" → `/lib/components/ui/`
   - "Where do I put a new icon?" → `/lib/components/icons/`
   - "Where do I put helper functions?" → `/lib/utils/`

**Verification Checklist**:
- [ ] `/docs/STRUCTURE.md` file exists
- [ ] Document is clear and concise
- [ ] All directories are explained
- [ ] Examples are provided
- [ ] Quick reference section exists

**Testing Instructions**:
- Review: Read the document and ensure it's understandable
- Verify: Check that documented structure matches actual codebase

**Commit Message Template**:
```
docs(structure): add directory structure documentation

- Create STRUCTURE.md with directory explanations
- Document organization conventions
- Add quick reference guide
```

**Estimated tokens**: ~8,000

---

### Task 8: Verify All Imports and Build

**Goal**: Comprehensive verification that all file renames and reorganization didn't break anything. Ensure the application builds, runs, and all imports resolve correctly.

**Files to Verify**:
- All `.svelte` component files
- All `.ts`/`.js` files
- Build output
- Development server

**Prerequisites**:
- All previous Phase 1 tasks complete

**Implementation Steps**:

1. Static checks:
   - Run TypeScript type checking: `pnpm run check`
   - Look for any import errors or type errors
   - Fix any issues found
2. Development build:
   - Stop any running dev server
   - Clear cache: `rm -rf .svelte-kit`
   - Start fresh: `pnpm dev`
   - Watch for errors in terminal
   - Open browser and check console for errors
3. Production build:
   - Run `pnpm build`
   - Verify build succeeds without errors
   - Check build output for any warnings
   - Run `pnpm preview`
   - Test the production build
4. Manual testing:
   - Navigate to every route:
     - Home (`/`)
     - About (`/about`)
     - Android (`/android`)
     - Web (`/web`)
     - Blog (`/read`)
     - Individual blog post (`/read/post/[slug]`)
   - Verify all components render
   - Verify all icons display
   - Check browser console on each page (no errors)
5. Visual verification:
   - Ensure styling is intact
   - Verify layout is correct
   - Check responsive behavior
6. Document any issues:
   - If anything is broken, debug and fix
   - Don't proceed until everything works

**Verification Checklist**:
- [ ] `pnpm run check` passes with no errors
- [ ] `pnpm dev` runs without errors
- [ ] `pnpm build` succeeds
- [ ] `pnpm preview` production build works
- [ ] All routes accessible and functional
- [ ] All components render correctly
- [ ] All icons display
- [ ] No console errors
- [ ] Styling/layout intact

**Testing Instructions**:
- TypeScript: `pnpm run check`
- Build: `pnpm build`
- Dev: `pnpm dev` - test manually
- Preview: `pnpm preview` - test production build

**Commit Message Template**:
```
test(phase-1): verify all imports and builds after restructure

- Run TypeScript checks
- Verify development build
- Test production build
- Confirm all routes functional
```

**Estimated tokens**: ~12,000

---

## Phase Verification

Before proceeding to Phase 2, ensure:

### Structure Verification
- [ ] All component files use PascalCase naming
- [ ] Directory structure matches ADR-002
- [ ] `/docs/STRUCTURE.md` exists and is accurate
- [ ] No files in wrong locations

### Import Verification
- [ ] All imports updated to new file names
- [ ] All imports updated to new paths
- [ ] No import errors in TypeScript
- [ ] No 404s for modules in browser console

### Build Verification
- [ ] `pnpm run check` passes
- [ ] `pnpm dev` runs without errors
- [ ] `pnpm build` succeeds
- [ ] `pnpm preview` works correctly

### Functional Verification
- [ ] All routes load successfully
- [ ] All components render correctly
- [ ] All icons display properly
- [ ] Navigation works (Header component functional)
- [ ] No visual regressions
- [ ] No console errors

### Git Verification
- [ ] All changes committed with conventional commit messages
- [ ] Git author is HatmanStack (not Claude Code)
- [ ] Commit history is clean and atomic
- [ ] Working branch is `claude/refactor-svelte-modernize-01LsR5kgWUuPzQD8SZQteBbw`

## Integration Points

This phase creates the foundation for:
- **Phase 2**: Component modernization with runes (clean file names make this easier)
- **Phase 3**: Styling architecture (organized structure for style files)
- **Phase 4**: Type system organization (clear types directory)
- **Phase 5**: Performance optimizations (clear structure for code splitting)

## Known Limitations

- Route components (`+page.svelte`, etc.) remain lowercase per SvelteKit conventions
- Some legacy naming might exist in data files or non-component files (acceptable)
- Documentation is basic - can be enhanced in Phase 7 if needed

## Success Metrics

Phase 1 is successful when:
- A developer can find any component in < 10 seconds
- All file names are consistent and predictable
- Directory structure is clear and logical
- Zero import errors
- Application works identically to before refactoring
