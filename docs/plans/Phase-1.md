# Phase 1: Test Infrastructure & Setup

## Phase Goal

Establish the complete testing infrastructure including Vitest configuration, test utilities, mock factories, and npm scripts. By the end of this phase, you'll have a fully functional test environment ready for writing actual tests, with a working example test to validate the setup.

**Success criteria**:
- Vitest runs successfully with proper SvelteKit integration
- Test utilities and mock factories are available for reuse
- Coverage reporting is configured and functional
- Example test passes, demonstrating the testing pattern

**Estimated tokens**: ~18,000

## Prerequisites

- Phase 0 has been read and understood
- Git credentials configured:
  - Name: HatmanStack
  - Email: 82614182+HatmanStack@users.noreply.github.com
- Working branch: `claude/design-test-suite-01WFo7NCaD3Mu3DAxuTmXn1o`
- Application currently builds without errors
- pnpm is installed and available

## Tasks

### Task 1: Install Testing Dependencies

**Goal**: Install all required testing packages as dev dependencies.

**Files to Modify/Create**:
- `package.json` - Add testing dependencies and scripts

**Prerequisites**:
- None - this is the first task

**Implementation Steps**:
1. Install Vitest and core testing utilities using pnpm
2. Install Svelte testing library and DOM matchers
3. Install coverage tools and UI components
4. Verify installation by checking package.json and pnpm-lock.yaml

**Dependencies to Install**:
```bash
pnpm add -D vitest @vitest/ui @vitest/coverage-v8 \
  @testing-library/svelte @testing-library/jest-dom \
  jsdom @testing-library/user-event
```

**Verification Checklist**:
- [ ] All packages appear in package.json devDependencies
- [ ] pnpm-lock.yaml is updated
- [ ] Node modules are installed without errors
- [ ] No version conflicts reported

**Testing Instructions**:
- Run `pnpm list vitest` to confirm Vitest is installed
- Verify version is 1.0+ for optimal Vite compatibility

**Commit Message Template**:
```
chore(tests): install testing dependencies

- Add vitest as test runner
- Add @testing-library/svelte for component testing
- Add @vitest/ui and @vitest/coverage-v8 for reporting
- Add jsdom for browser environment simulation
```

**Estimated tokens**: ~2,000

---

### Task 2: Create Vitest Configuration

**Goal**: Set up vitest.config.ts to properly handle SvelteKit aliases, Svelte components, and test environment.

**Files to Modify/Create**:
- `vitest.config.ts` - New configuration file

**Prerequisites**:
- Task 1 completed (dependencies installed)

**Implementation Steps**:
1. Create vitest.config.ts in project root
2. Import and merge with existing Vite configuration
3. Configure jsdom environment for browser API simulation
4. Set up SvelteKit path aliases ($lib, $app, etc.)
5. Configure coverage thresholds and exclusions
6. Enable globals for test, describe, expect

**Configuration Requirements**:
- Extend existing vite.config.ts to inherit build settings
- Use jsdom environment
- Include SvelteKit aliases from svelte.config.js
- Set coverage thresholds: 80% statements, 75% branches, 80% functions, 80% lines
- Exclude test files, config files, and type definitions from coverage
- Enable CSS module handling

**Verification Checklist**:
- [ ] vitest.config.ts exists and imports vite.config.ts
- [ ] Configuration includes test environment set to 'jsdom'
- [ ] Path aliases are configured for $lib and $app
- [ ] Coverage thresholds are defined
- [ ] File runs without syntax errors

**Testing Instructions**:
- Run `pnpm exec vitest --version` to verify config loads
- Check for any configuration errors or warnings

**Commit Message Template**:
```
chore(tests): configure vitest for sveltekit

- Extend existing vite.config.ts
- Set jsdom as test environment
- Configure SvelteKit path aliases
- Set coverage thresholds at 80%
- Enable test globals
```

**Estimated tokens**: ~3,000

---

### Task 3: Add NPM Test Scripts

**Goal**: Create convenient npm scripts for running tests, coverage, UI, and watch mode.

**Files to Modify/Create**:
- `package.json` - Add scripts section

**Prerequisites**:
- Task 2 completed (Vitest configured)

**Implementation Steps**:
1. Open package.json
2. Add test-related scripts to the scripts section
3. Ensure scripts follow standard naming conventions
4. Test each script to verify it works

**Scripts to Add**:
- `test` - Run all tests once
- `test:watch` - Run tests in watch mode for development
- `test:ui` - Open Vitest UI for interactive test exploration
- `test:coverage` - Run tests and generate coverage report

**Verification Checklist**:
- [ ] All four scripts are added to package.json
- [ ] Scripts use correct vitest commands
- [ ] No syntax errors in package.json

**Testing Instructions**:
- Run `pnpm test` - should execute even without tests (0 tests found is OK)
- Run `pnpm test:ui` - should open a browser with Vitest UI
- Verify each script executes without config errors

**Commit Message Template**:
```
chore(tests): add npm test scripts

- Add test script for CI/CD
- Add test:watch for development
- Add test:ui for interactive exploration
- Add test:coverage for coverage reporting
```

**Estimated tokens**: ~2,000

---

### Task 4: Create Test Utilities Structure

**Goal**: Set up the centralized test utilities directory with base setup and helper functions.

**Files to Modify/Create**:
- `src/lib/test-utils/setup.ts` - Global test setup
- `src/lib/test-utils/render-helpers.ts` - Svelte rendering utilities
- `src/lib/test-utils/mock-factories.ts` - Factory functions
- `src/lib/test-utils/fixtures/index.ts` - Central fixture exports
- `vitest.config.ts` - Add setupFiles configuration

**Prerequisites**:
- Task 2 completed (Vitest configured)

**Implementation Steps**:
1. Create src/lib/test-utils/ directory
2. Create setup.ts with global test configuration
3. Create render-helpers.ts with Svelte component rendering utilities
4. Create mock-factories.ts as placeholder for factories
5. Create fixtures/ subdirectory with index.ts
6. Update vitest.config.ts to include setup.ts as setupFile

**setup.ts Contents**:
- Import @testing-library/jest-dom matchers
- Set up global test environment configuration
- Mock browser APIs that are always needed (matchMedia, etc.)

**render-helpers.ts Contents**:
- Re-export render from @testing-library/svelte
- Create custom render function that wraps components with common providers if needed
- Export cleanup utilities

**Verification Checklist**:
- [ ] All files created in correct directory structure
- [ ] setup.ts imports jest-dom matchers
- [ ] render-helpers.ts exports render function
- [ ] vitest.config.ts references setup.ts in setupFiles
- [ ] No import errors when running tests

**Testing Instructions**:
- Run `pnpm test` - setup.ts should execute without errors
- Verify jest-dom matchers are available (test in next task)

**Commit Message Template**:
```
chore(tests): create test utilities structure

- Add setup.ts for global test configuration
- Add render-helpers.ts for component rendering
- Add mock-factories.ts placeholder
- Add fixtures directory for test data
- Configure vitest to run setup file
```

**Estimated tokens**: ~4,000

---

### Task 5: Create Mock Factories

**Goal**: Build reusable factory functions for creating test data that matches production data structures.

**Files to Modify/Create**:
- `src/lib/test-utils/mock-factories.ts` - Factory implementations

**Prerequisites**:
- Task 4 completed (test-utils structure exists)
- Understanding of existing data structures in src/lib/data/

**Implementation Steps**:
1. Review existing data structures in src/lib/data/projects.ts, androidApps.ts, webProjects.ts
2. Review type definitions in src/lib/types/index.ts
3. Create factory functions for each major data type
4. Ensure factories return valid data matching TypeScript interfaces
5. Use realistic but clearly fake data (e.g., "Test Project")
6. Support partial overrides for flexibility

**Factory Functions to Create**:
- `createMockProject(overrides?)` - Creates a Project object
- `createMockNavigationState(overrides?)` - Creates NavigationState
- `createMockUserPreferences(overrides?)` - Creates UserPreferences
- `createMockAppState(overrides?)` - Creates full AppState
- Any other data structures found in the codebase

**Pattern to Follow**:
```typescript
export function createMockProject(overrides: Partial<Project> = {}): Project {
  return {
    id: 'test-project',
    title: 'Test Project',
    description: 'A test project description',
    category: 'Web',
    images: {
      profession: '/test-image.jpg',
      profile: '/test-image.jpg'
    },
    link: 'https://test.example.com',
    buttonText: 'View',
    ...overrides
  };
}
```

**Verification Checklist**:
- [ ] Factory functions exist for all major data types
- [ ] Each factory returns data matching its TypeScript interface
- [ ] Factories support partial overrides
- [ ] Default values are realistic but clearly for testing
- [ ] No TypeScript errors

**Testing Instructions**:
- Import a factory and create a mock object
- Verify TypeScript doesn't complain about type mismatches
- Test partial overrides work correctly

**Commit Message Template**:
```
test(utils): create mock data factories

- Add createMockProject factory
- Add createMockNavigationState factory
- Add createMockUserPreferences factory
- Add createMockAppState factory
- Support partial overrides for flexibility
```

**Estimated tokens**: ~3,500

---

### Task 6: Create Test Fixtures

**Goal**: Build static test fixtures based on real production data for integration-style tests.

**Files to Modify/Create**:
- `src/lib/test-utils/fixtures/projects.ts` - Project fixtures
- `src/lib/test-utils/fixtures/navigation.ts` - Navigation fixtures
- `src/lib/test-utils/fixtures/index.ts` - Export all fixtures

**Prerequisites**:
- Task 5 completed (mock factories exist)
- Access to real data in src/lib/data/

**Implementation Steps**:
1. Review real project data in src/lib/data/projects.ts
2. Create fixture versions with test data instead of real data
3. Maintain the same structure as production data
4. Export fixtures from index.ts for easy importing
5. Document the difference between fixtures (static) and factories (dynamic)

**Fixtures to Create**:
- `projectsFixture` - Array of 2-3 test projects
- `navigationItemsFixture` - Array of navigation items
- Any other structured data used in the app

**Verification Checklist**:
- [ ] Fixtures match production data structure
- [ ] Fixtures use test data, not real data
- [ ] All fixtures exported from index.ts
- [ ] TypeScript types are satisfied
- [ ] Documentation comment explains fixtures vs factories

**Testing Instructions**:
- Import fixtures and verify they match expected types
- Ensure fixtures can be used in place of real data

**Commit Message Template**:
```
test(fixtures): create static test fixtures

- Add projects fixture with test data
- Add navigation items fixture
- Export all fixtures from index
- Document fixtures vs factories usage
```

**Estimated tokens**: ~2,500

---

### Task 7: Write Example Test

**Goal**: Create a simple example test to validate the entire testing infrastructure works correctly.

**Files to Modify/Create**:
- `src/lib/test-utils/setup.test.ts` - Example test file

**Prerequisites**:
- All previous tasks completed
- Understanding of testing patterns from Phase 0

**Implementation Steps**:
1. Create a simple test file that doesn't require complex setup
2. Write tests that validate:
   - Vitest is running
   - jest-dom matchers are available
   - Imports work correctly
   - Basic assertions pass
3. Run the test and verify it passes
4. This test serves as a smoke test for the infrastructure

**Test Cases to Include**:
```typescript
import { describe, test, expect } from 'vitest';
import { createMockProject } from './mock-factories';

describe('Test Infrastructure', () => {
  test('vitest runs successfully', () => {
    expect(true).toBe(true);
  });

  test('mock factories create valid data', () => {
    const project = createMockProject();
    expect(project).toHaveProperty('id');
    expect(project).toHaveProperty('title');
    expect(project.title).toBe('Test Project');
  });

  test('factory overrides work', () => {
    const project = createMockProject({ title: 'Custom Title' });
    expect(project.title).toBe('Custom Title');
  });
});
```

**Verification Checklist**:
- [ ] Test file created with at least 3 test cases
- [ ] All tests pass when running `pnpm test`
- [ ] Coverage report is generated
- [ ] No errors or warnings in test output

**Testing Instructions**:
- Run `pnpm test` - all tests should pass
- Run `pnpm test:coverage` - should generate coverage report
- Run `pnpm test:ui` - should show passing tests in UI

**Commit Message Template**:
```
test(infrastructure): add example tests

- Create setup.test.ts with infrastructure validation
- Test vitest execution
- Test mock factories
- Test factory overrides
- Validate entire testing pipeline
```

**Estimated tokens**: ~3,000

---

## Phase Verification

Before moving to Phase 2, verify:

### Infrastructure Validation
- [ ] `pnpm test` executes without errors
- [ ] `pnpm test:ui` opens interactive UI
- [ ] `pnpm test:coverage` generates report
- [ ] All example tests pass
- [ ] Coverage thresholds are configured

### File Structure Validation
```
src/lib/test-utils/
     setup.ts
     render-helpers.ts
     mock-factories.ts
     setup.test.ts
     fixtures/
         index.ts
         projects.ts
         navigation.ts
vitest.config.ts
package.json (updated with scripts and deps)
```

### Functional Validation
- [ ] Can import test utilities in any test file
- [ ] Mock factories create valid test data
- [ ] Fixtures are accessible and correctly typed
- [ ] jest-dom matchers work (toBeInTheDocument, etc.)
- [ ] TypeScript has no errors in test files

### Git Validation
- [ ] All changes committed with conventional commit messages
- [ ] Commits are atomic (one task per commit)
- [ ] Working on correct branch: `claude/design-test-suite-01WFo7NCaD3Mu3DAxuTmXn1o`
- [ ] Git author is HatmanStack <82614182+HatmanStack@users.noreply.github.com>

## Known Limitations

- No actual component or store tests yet (those come in later phases)
- Coverage will be 0% or very low (only testing infrastructure itself)
- Some warnings about unused utilities are expected

## Next Phase

Once Phase 1 is complete and verified, proceed to **[Phase 2: Data Layer & Type Testing](./Phase-2.md)** to begin testing actual application code.
