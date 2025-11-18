# Testing Guide

## Overview

This project uses Vitest and @testing-library/svelte for comprehensive test coverage. Tests follow a unit-focused approach, prioritizing fast feedback and deployment confidence.

**Test Framework**: Vitest v4
**Component Testing**: @testing-library/svelte v5
**Environment**: jsdom
**Coverage Target**: 80%

## Running Tests

### All Tests
```bash
pnpm test
```

### Watch Mode (for development)
```bash
pnpm test:watch
```

### Interactive UI
```bash
pnpm test:ui
```

### Coverage Report
```bash
pnpm test:coverage
```

Coverage reports are generated in the `coverage/` directory.

## Test Organization

Tests are colocated with source files using the `*.test.ts` or `*.test.js` naming convention:

```
src/lib/components/ui/
├── ProjectCard.svelte
├── ProjectCard.test.ts
├── GooeyButton.svelte
└── GooeyButton.test.ts
```

### Test Utilities

Shared utilities live in `src/lib/test-utils/`:
- `setup.ts` - Global test configuration
- `mock-factories.ts` - Factory functions for test data
- `render-helpers.ts` - Component rendering utilities
- `fixtures/` - Static test data
- `store-helpers.ts` - Store testing utilities

## Writing Tests

### Component Tests

Test observable behavior, not implementation details:

```typescript
import { render } from '@testing-library/svelte';
import { createMockProject } from '$lib/test-utils/mock-factories';
import ProjectCard from './ProjectCard.svelte';

test('renders project title', () => {
  const project = createMockProject({ title: 'My Project' });
  const { getByText } = render(ProjectCard, { props: { project } });

  expect(getByText('My Project')).toBeInTheDocument();
});
```

### Store Tests

Test state mutations and side effects:

```typescript
import { createAppStore } from './app.svelte';
import { createMockLocalStorage } from '$lib/test-utils/store-helpers';

test('toggleSound updates preference', () => {
  const store = createAppStore();
  global.localStorage = createMockLocalStorage();

  store.toggleSound();

  expect(store.state.preferences.soundEnabled).toBe(false);
});
```

### Route Tests

Test load functions and data transformation:

```typescript
import { load } from './+page.js';

test('loads blog posts', async () => {
  const result = await load();

  expect(result.posts).toBeDefined();
  expect(result.posts.length).toBeGreaterThan(0);
});
```

## Mocking Strategies

### Sound Hooks

```typescript
vi.mock('$lib/hooks/useSound.svelte', () => ({
  createSoundStore: vi.fn(() => ({
    play: vi.fn(),
    pause: vi.fn()
  }))
}));
```

### Browser APIs

```typescript
global.localStorage = createMockLocalStorage();
global.window = { matchMedia: vi.fn() } as any;
```

### SvelteKit Modules

```typescript
vi.mock('$app/environment', () => ({
  browser: true,
  dev: false
}));
```

## Test Patterns

### Arrange-Act-Assert

```typescript
test('example test', () => {
  // Arrange
  const props = createMockProps();

  // Act
  const { getByRole } = render(Component, { props });
  fireEvent.click(getByRole('button'));

  // Assert
  expect(getByRole('alert')).toHaveTextContent('Expected message');
});
```

### Async Tests

```typescript
test('loads data asynchronously', async () => {
  const { findByText } = render(AsyncComponent);

  // Wait for element to appear
  const element = await findByText('Loaded content');
  expect(element).toBeInTheDocument();
});
```

### Testing User Interactions

```typescript
import { fireEvent } from '@testing-library/svelte';

test('toggles menu on button click', async () => {
  const { getByRole, getByText } = render(Navigation);

  const button = getByRole('button', { name: 'Toggle menu' });
  await fireEvent.click(button);

  expect(getByText('Menu Item')).toBeVisible();
});
```

## Coverage Goals

Current thresholds enforced in CI:
- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

## Test Suite Structure

### Phase 1: Test Infrastructure (✅ Complete)
- Vitest configuration
- Test utilities and helpers
- Mock factories
- Global setup

### Phase 2: Data Layer (✅ Complete)
- Type validation (16 tests)
- Data integrity (15 tests)
- Navigation data (13 tests)
- Project data (17 tests)

### Phase 3: Stores & Hooks (✅ Complete)
- App store (22 tests)
- Sound hooks (22 tests)

### Phase 4: Component Testing (✅ Complete)
- ProjectCard (12 tests)
- GooeyButton (12 tests)
- ImageGrid (12 tests)
- SVG Filters (20 tests)
- Icons (9 tests)
- Component integration (10 tests)

### Phase 5: Route Testing (✅ Complete)
- Blog list load (8 tests)
- Single post load (5 tests)
- Static routes (10 tests)

**Total**: 198+ tests across all layers

## Troubleshooting

### Tests Timing Out

Increase timeout in vitest.config.ts:
```typescript
test: {
  testTimeout: 10000
}
```

### Import Errors

Check path aliases in vitest.config.ts match svelte.config.js.

### Coverage Not Updating

Delete coverage directory and re-run:
```bash
rm -rf coverage
pnpm test:coverage
```

### Svelte 5 Component Issues

Ensure `resolve.conditions: ['browser']` is set in vitest.config.ts to force browser mode for Svelte components.

## Best Practices

1. **Test Behavior, Not Implementation** - Focus on what users see and do
2. **Keep Tests Fast** - Mock external dependencies
3. **One Concept Per Test** - Test one thing at a time
4. **Descriptive Test Names** - Explain what and when
5. **Use Factories** - createMockX() for consistent test data
6. **Clean Up** - Tests should not affect each other
7. **Avoid Testing Details** - Don't test internal state or CSS classes

## CI/CD

Tests run automatically on:
- Every push to any branch
- Every pull request to main
- Both Node 18 and Node 20

Builds fail if:
- Any test fails
- Coverage drops below thresholds
- Type checking fails

## Common Queries

### How to test a specific file?
```bash
pnpm test ProjectCard
```

### How to run tests matching a pattern?
```bash
pnpm test -- --grep="renders"
```

### How to see coverage for a specific file?
```bash
pnpm test:coverage
# Open coverage/index.html in browser
```

### How to debug a failing test?
```bash
# Add this to your test
test.only('my failing test', () => {
  // test code
});
```

Then run with the UI:
```bash
pnpm test:ui
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/svelte-testing-library/intro/)
- [SvelteKit Testing](https://kit.svelte.dev/docs/testing)
- [Svelte 5 Testing Guide](https://svelte.dev/docs/testing)

## Contributing

When adding new features:
1. Write tests first (TDD)
2. Ensure tests pass
3. Verify coverage meets thresholds
4. Update documentation if needed

When fixing bugs:
1. Write a failing test that reproduces the bug
2. Fix the bug
3. Verify test now passes
4. Check coverage hasn't decreased
