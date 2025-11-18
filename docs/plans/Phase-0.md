# Phase 0: Foundation - Architecture & Testing Strategy

## Overview

This phase establishes the foundational architecture decisions, testing strategy, and shared conventions that will guide all subsequent phases. Phase 0 is a **reference document** rather than an implementation phase - no code changes occur here. Implementation engineers should read this thoroughly before beginning Phase 1.

**Estimated tokens**: ~8,000

## Architecture Decisions (ADRs)

### ADR-001: Vitest as Test Runner

**Decision**: Use Vitest as the primary test runner for this SvelteKit project.

**Rationale**:
- Native Vite integration - shares the same config, plugins, and transformations
- Significantly faster than Jest for Vite-based projects
- Modern API with excellent TypeScript support
- Built-in watch mode, UI, and coverage reporting
- Compatible with `@testing-library/svelte` ecosystem
- Growing ecosystem and active development

**Alternatives Considered**:
- Jest: Industry standard but slower with Vite, requires additional configuration
- Playwright Component Testing: Better for visual testing but heavier for unit tests

### ADR-002: Unit-Focused Testing Approach

**Decision**: Prioritize isolated unit tests with mocked dependencies over integration/E2E tests.

**Rationale**:
- Deployment confidence is the primary goal - need fast, reliable regression detection
- Unit tests execute faster, enabling rapid CI/CD feedback
- Easier to pinpoint failures and debug issues
- More maintainable with clear boundaries and minimal setup
- Better suited for testing edge cases and error conditions

**Testing Pyramid Target**:
- **80%** Unit tests (components, functions, stores, hooks)
- **15%** Integration tests (route loaders with real data)
- **5%** Manual testing (visual verification, accessibility)

### ADR-003: Colocated Test Files

**Decision**: Place test files next to the source files they test using `*.test.ts` naming convention.

**Rationale**:
- Easier to find related tests when modifying code
- Encourages writing tests as part of development workflow
- Reduces friction for maintaining test coverage
- Clear ownership and responsibility

**Pattern**:
```
src/lib/stores/
  app.svelte.ts
  app.svelte.test.ts
```

### ADR-004: Centralized Test Utilities

**Decision**: Create shared test utilities in `src/lib/test-utils/` for common setup and mocks.

**Rationale**:
- DRY principle - avoid duplicating mock factories and setup code
- Consistent testing patterns across the codebase
- Single source of truth for test fixtures
- Easier to update test infrastructure

**Structure**:
```
src/lib/test-utils/
  setup.ts          # Global test setup
  render-helpers.ts # Svelte component rendering utilities
  mock-factories.ts # Factory functions for creating test data
  fixtures/         # Static test data matching production structures
```

### ADR-005: jsdom as Browser Environment

**Decision**: Use jsdom for browser API simulation in tests.

**Rationale**:
- Lightweight and fast for unit tests
- Sufficient for testing DOM manipulation, localStorage, etc.
- Well-supported by testing-library ecosystem
- Lower resource usage than real browsers

**When Not Sufficient**: If visual rendering bugs are detected, consider adding Playwright for visual regression testing in a future phase.

### ADR-006: Coverage Thresholds

**Decision**: Set initial coverage thresholds at 80% with plans to increase iteratively.

**Coverage Targets**:
- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

**Rationale**:
- 80% provides strong confidence without diminishing returns
- Allows pragmatic exclusions (e.g., type definitions, config files)
- Room for improvement in future iterations
- Enforced in CI/CD to prevent regression

## Testing Strategy

### Component Testing Strategy

**Goal**: Verify component behavior, not implementation details.

**Patterns**:
1. **Render with realistic props** - Use fixtures that match production data
2. **Test user interactions** - Click buttons, type in inputs, navigate
3. **Assert visible output** - Check what users see, not internal state
4. **Mock external dependencies** - Stores, API calls, browser APIs

**Example Pattern**:
```typescript
// Test what users see and do, not how it works internally
test('ProjectCard displays project information', () => {
  const project = createMockProject();
  const { getByText, getByRole } = render(ProjectCard, { props: { project } });

  expect(getByText(project.title)).toBeInTheDocument();
  expect(getByRole('link')).toHaveAttribute('href', project.link);
});
```

### Store Testing Strategy

**Goal**: Verify state management logic, persistence, and side effects.

**Patterns**:
1. **Test state initialization** - Verify default values
2. **Test state mutations** - Call methods, assert state changes
3. **Test persistence** - Mock localStorage, verify save/load
4. **Test side effects** - DOM mutations, event listeners

**Isolation**: Each test should create a fresh store instance to avoid shared state.

### Hook Testing Strategy

**Goal**: Verify custom hooks return correct reactive state and handle lifecycle properly.

**Patterns**:
1. **Test initialization** - Verify initial state
2. **Test reactivity** - Assert state updates trigger re-renders
3. **Test cleanup** - Verify event listeners and resources are cleaned up
4. **Mock browser APIs** - Audio, matchMedia, etc.

### Route Testing Strategy

**Goal**: Verify data loading, error handling, and parameter parsing.

**Patterns**:
1. **Test load functions** - Mock fetch, test data transformation
2. **Test error states** - Simulate failures, verify error handling
3. **Test dynamic routes** - Verify parameter extraction
4. **Use real data structures** - Test with production-like fixtures

### Data Testing Strategy

**Goal**: Validate data integrity and type safety.

**Patterns**:
1. **Type validation** - Ensure data matches TypeScript interfaces
2. **Required fields** - Verify no missing data
3. **Data consistency** - Check relationships between data structures

## Shared Conventions

### File Naming
- Test files: `*.test.ts` or `*.test.svelte.ts`
- Test utilities: `kebab-case.ts`
- Fixtures: `kebab-case.ts` in `fixtures/` subdirectory

### Test Structure
Use descriptive test names following this pattern:
```typescript
describe('ComponentName', () => {
  describe('featureOrBehavior', () => {
    test('should do something specific when condition', () => {
      // Arrange
      const props = createMockProps();

      // Act
      const { getByRole } = render(Component, { props });
      fireEvent.click(getByRole('button'));

      // Assert
      expect(getByRole('alert')).toHaveTextContent('Expected message');
    });
  });
});
```

### Mock Naming
- Mock functions: `mockFunctionName`
- Mock data: `createMockEntityName()` (factory function)
- Fixtures: `entityNameFixture` (static data)

### Assertions
- Prefer semantic queries: `getByRole`, `getByLabelText`, `getByText`
- Avoid implementation details: No `container.querySelector('.class')`
- Use jest-dom matchers: `toBeInTheDocument()`, `toHaveTextContent()`, etc.

## Common Pitfalls to Avoid

### 1. Testing Implementation Details
L **Don't**: Test internal state, private methods, or CSS classes
```typescript
// Bad
expect(component.instance().state.count).toBe(5);
```

 **Do**: Test observable behavior
```typescript
// Good
expect(getByText('Count: 5')).toBeInTheDocument();
```

### 2. Overmocking
L **Don't**: Mock everything, including trivial utilities
```typescript
// Bad - unnecessarily complex
vi.mock('$lib/utils/format', () => ({ formatDate: vi.fn() }));
```

 **Do**: Mock only external dependencies (API calls, browser APIs, stores)
```typescript
// Good - mock real external dependency
vi.mock('$app/environment', () => ({ browser: true }));
```

### 3. Shared State Between Tests
L **Don't**: Reuse stores or global state across tests
```typescript
// Bad
const store = createStore();
test('test1', () => { store.set('value1') });
test('test2', () => { /* store still has value1! */ });
```

 **Do**: Create fresh instances in beforeEach or per-test
```typescript
// Good
beforeEach(() => {
  store = createStore();
});
```

### 4. Brittle Selectors
L **Don't**: Query by CSS classes or element types
```typescript
// Bad
container.querySelector('.btn-primary');
```

 **Do**: Use accessible queries
```typescript
// Good
getByRole('button', { name: 'Submit' });
```

### 5. Not Testing Error States
L **Don't**: Only test happy paths
```typescript
// Bad - no error handling tested
test('loads data', async () => {
  const data = await load({ params: { id: '1' } });
  expect(data.post).toBeDefined();
});
```

 **Do**: Test error conditions explicitly
```typescript
// Good
test('handles missing post gracefully', async () => {
  const result = await load({ params: { id: 'nonexistent' } });
  expect(result.error).toBeDefined();
});
```

## Testing Patterns Reference

### Pattern: Mocking Stores
```typescript
import { vi } from 'vitest';

vi.mock('$lib/stores/app.svelte', () => ({
  appStore: {
    state: {
      preferences: { soundEnabled: true }
    },
    toggleSound: vi.fn()
  }
}));
```

### Pattern: Mocking SvelteKit Modules
```typescript
vi.mock('$app/environment', () => ({
  browser: true,
  dev: false
}));

vi.mock('$app/navigation', () => ({
  goto: vi.fn()
}));
```

### Pattern: Testing localStorage
```typescript
beforeEach(() => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn()
  };
  global.localStorage = localStorageMock as any;
});
```

### Pattern: Testing Async Components
```typescript
test('loads data asynchronously', async () => {
  const { findByText } = render(AsyncComponent);

  // Wait for element to appear
  const element = await findByText('Loaded content');
  expect(element).toBeInTheDocument();
});
```

### Pattern: Testing User Interactions
```typescript
import { fireEvent } from '@testing-library/svelte';

test('toggles menu on button click', async () => {
  const { getByRole, getByText } = render(Navigation);

  const button = getByRole('button', { name: 'Toggle menu' });
  await fireEvent.click(button);

  expect(getByText('Menu Item')).toBeVisible();
});
```

## TDD Workflow Recommendation

While not required, Test-Driven Development can be beneficial:

1. **Red**: Write a failing test that defines desired behavior
2. **Green**: Write minimal code to make the test pass
3. **Refactor**: Improve code while keeping tests green
4. **Commit**: Atomic commit with both test and implementation

For this project, we're retrofitting tests to existing code, so:
1. Write tests for current behavior first
2. Ensure tests pass (confirms understanding)
3. Refactor with confidence
4. Add new tests for edge cases

## Next Steps

Once you've read and understood Phase 0, proceed to **[Phase 1: Test Infrastructure & Setup](./Phase-1.md)** to begin implementation.
