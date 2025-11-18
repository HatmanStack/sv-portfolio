# Phase 6: CI/CD Integration & Documentation

## Phase Goal

Integrate the test suite into the CI/CD pipeline, set up automated coverage reporting, and create comprehensive documentation. This phase ensures tests run automatically on every commit, coverage is tracked, and the team understands how to use the testing infrastructure.

**Success criteria**:
- GitHub Actions workflow runs tests on every push and PR
- Coverage reports are generated and visible
- Coverage thresholds are enforced
- Documentation is complete and accessible
- Test suite is fully integrated into development workflow

**Estimated tokens**: ~18,000

## Prerequisites

- Phase 0, 1, 2, 3, 4, and 5 completed and verified
- All tests passing locally
- Coverage meeting 80% threshold
- Understanding of GitHub Actions
- Repository has GitHub Actions enabled

## Tasks

### Task 1: Create GitHub Actions Workflow

**Goal**: Set up automated test execution on every push and pull request.

**Files to Modify/Create**:
- `.github/workflows/test.yml` - CI workflow configuration

**Prerequisites**:
- All previous phases completed
- Tests passing locally with `pnpm test`
- Coverage threshold met

**Implementation Steps**:
1. Create .github/workflows directory if it doesn't exist
2. Create test.yml workflow file
3. Configure workflow to run on push and pull_request events
4. Set up Node.js and pnpm
5. Install dependencies and run tests
6. Upload coverage reports
7. Fail build if tests fail or coverage drops below threshold

**Workflow Configuration**:
```yaml
name: Test Suite

on:
  push:
    branches: [ main, claude/* ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Get pnpm store directory
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV

      - name: Setup pnpm cache
        uses: actions/cache@v4
        with:
          path: ${{ env.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run tests
        run: pnpm test

      - name: Run tests with coverage
        run: pnpm test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
          flags: unittests
          name: codecov-umbrella
          fail_ci_if_error: true

      - name: Check coverage thresholds
        run: pnpm test:coverage
```

**Verification Checklist**:
- [ ] .github/workflows/test.yml created
- [ ] Workflow runs on push and PR
- [ ] Tests execute in CI
- [ ] Coverage reports generated
- [ ] Matrix tests multiple Node versions
- [ ] Caching configured for faster builds

**Testing Instructions**:
- Push changes to trigger workflow
- Check GitHub Actions tab for results
- Verify workflow passes

**Commit Message Template**:
```
ci(tests): add github actions workflow

- Add test.yml workflow for CI/CD
- Run tests on push and pull requests
- Test on Node 18 and 20
- Upload coverage reports
- Enforce coverage thresholds
- Cache pnpm dependencies
```

**Estimated tokens**: ~5,000

---

### Task 2: Configure Coverage Reporting

**Goal**: Set up detailed coverage reporting and badge display.

**Files to Modify/Create**:
- `.github/workflows/test.yml` - Add coverage badge update
- `README.md` - Add coverage badge
- `vitest.config.ts` - Ensure coverage reporter configuration

**Prerequisites**:
- Task 1 completed (CI workflow running)
- Tests generating coverage reports

**Implementation Steps**:
1. Sign up for Codecov if not already done (free for open source)
2. Add Codecov badge to README
3. Configure coverage reporters in vitest.config.ts
4. Add coverage upload step to CI
5. Set up coverage thresholds enforcement

**Vitest Coverage Configuration**:
Update vitest.config.ts to ensure proper coverage reporting:
```typescript
coverage: {
  provider: 'v8',
  reporter: ['text', 'json', 'html', 'lcov'],
  exclude: [
    'node_modules/',
    'src/test-utils/',
    '**/*.test.ts',
    '**/*.test.js',
    '**/*.config.ts',
    '**/*.config.js',
    '**/types/',
    'build/',
    '.svelte-kit/'
  ],
  thresholds: {
    statements: 80,
    branches: 75,
    functions: 80,
    lines: 80
  }
}
```

**README Badge Addition**:
```markdown
# SvelteKit Portfolio

[![Test Suite](https://github.com/HatmanStack/sv-portfolio/actions/workflows/test.yml/badge.svg)](https://github.com/HatmanStack/sv-portfolio/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/HatmanStack/sv-portfolio/branch/main/graph/badge.svg)](https://codecov.io/gh/HatmanStack/sv-portfolio)

...rest of README...
```

**Verification Checklist**:
- [ ] Coverage reporters configured
- [ ] Coverage badges added to README
- [ ] Coverage uploaded to Codecov
- [ ] Thresholds enforced
- [ ] Coverage visible on PRs

**Testing Instructions**:
- Run `pnpm test:coverage` locally
- Check coverage report in coverage/ directory
- Verify badges appear in README
- Check Codecov dashboard

**Commit Message Template**:
```
ci(coverage): configure coverage reporting

- Add coverage reporters to vitest config
- Add coverage badge to README
- Configure Codecov integration
- Set coverage thresholds
- Exclude test files from coverage
```

**Estimated tokens**: ~4,000

---

### Task 3: Create Testing Documentation

**Goal**: Document testing practices, patterns, and how to write/run tests.

**Files to Modify/Create**:
- `docs/TESTING.md` - Comprehensive testing guide
- `README.md` - Add testing section

**Prerequisites**:
- All phases completed
- Test suite fully functional

**Implementation Steps**:
1. Create docs/TESTING.md with detailed guide
2. Document how to run tests
3. Explain testing patterns used
4. Provide examples of writing new tests
5. Document mocking strategies
6. Add troubleshooting section
7. Update main README with testing overview

**TESTING.md Contents**:
```markdown
# Testing Guide

## Overview

This project uses Vitest and @testing-library/svelte for comprehensive test coverage. Tests follow a unit-focused approach, prioritizing fast feedback and deployment confidence.

## Running Tests

### All Tests
\`\`\`bash
pnpm test
\`\`\`

### Watch Mode (for development)
\`\`\`bash
pnpm test:watch
\`\`\`

### Interactive UI
\`\`\`bash
pnpm test:ui
\`\`\`

### Coverage Report
\`\`\`bash
pnpm test:coverage
\`\`\`

## Test Organization

Tests are colocated with source files:
- `component.svelte` ’ `component.test.ts`
- `store.ts` ’ `store.test.ts`
- `+page.js` ’ `+page.test.js`

Shared utilities live in `src/lib/test-utils/`:
- `mock-factories.ts` - Factory functions for test data
- `render-helpers.ts` - Component rendering utilities
- `fixtures/` - Static test data

## Writing Tests

### Component Tests

Test observable behavior, not implementation:

\`\`\`typescript
import { render } from '@testing-library/svelte';
import { createMockProject } from '$lib/test-utils/mock-factories';
import ProjectCard from './ProjectCard.svelte';

test('renders project title', () => {
  const project = createMockProject({ title: 'My Project' });
  const { getByText } = render(ProjectCard, { props: { project } });

  expect(getByText('My Project')).toBeInTheDocument();
});
\`\`\`

### Store Tests

Test state mutations and side effects:

\`\`\`typescript
import { createAppStore } from './app.svelte';
import { createMockLocalStorage } from '$lib/test-utils/store-helpers';

test('toggleSound updates preference', () => {
  const store = createAppStore();
  global.localStorage = createMockLocalStorage();

  store.toggleSound();

  expect(store.state.preferences.soundEnabled).toBe(false);
});
\`\`\`

### Route Tests

Test load functions and data transformation:

\`\`\`typescript
import { load } from './+page.js';

test('loads blog posts', async () => {
  const result = await load();

  expect(result.posts).toBeDefined();
  expect(result.posts.length).toBeGreaterThan(0);
});
\`\`\`

## Mocking Strategies

### Sound Hooks
\`\`\`typescript
vi.mock('$lib/hooks/useSound.svelte', () => ({
  createSoundStore: vi.fn(() => ({
    play: vi.fn(),
    pause: vi.fn()
  }))
}));
\`\`\`

### Browser APIs
\`\`\`typescript
global.localStorage = createMockLocalStorage();
global.window = { matchMedia: vi.fn() } as any;
\`\`\`

## Coverage Goals

- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

## Troubleshooting

### Tests timing out
Increase timeout in vitest.config.ts:
\`\`\`typescript
test: {
  testTimeout: 10000
}
\`\`\`

### Import errors
Check path aliases in vitest.config.ts match svelte.config.js

### Coverage not updating
Delete coverage/ directory and re-run: `pnpm test:coverage`

## Best Practices

1. **Test behavior, not implementation** - Focus on what users see/do
2. **Keep tests fast** - Mock external dependencies
3. **One assertion per test** - Or closely related assertions
4. **Descriptive test names** - Explain what and when
5. **Use factories** - createMockX for consistent test data
6. **Clean up** - Tests should not affect each other

## CI/CD

Tests run automatically on:
- Every push to any branch
- Every pull request to main
- Both Node 18 and Node 20

Builds fail if:
- Any test fails
- Coverage drops below thresholds
- Type checking fails

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/svelte-testing-library/intro/)
- [SvelteKit Testing](https://kit.svelte.dev/docs/testing)
```

**README.md Update**:
Add testing section to main README:
```markdown
## Testing

This project has comprehensive test coverage using Vitest.

### Quick Start
\`\`\`bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage
\`\`\`

### Documentation
See [docs/TESTING.md](./docs/TESTING.md) for complete testing guide.

### Coverage
Current coverage: ![codecov](https://codecov.io/gh/HatmanStack/sv-portfolio/branch/main/graph/badge.svg)
```

**Verification Checklist**:
- [ ] docs/TESTING.md created
- [ ] README.md updated with testing section
- [ ] All testing commands documented
- [ ] Examples provided
- [ ] Troubleshooting guide included

**Testing Instructions**:
- Read through TESTING.md for completeness
- Verify all commands work as documented
- Check that examples are accurate

**Commit Message Template**:
```
docs(tests): add comprehensive testing documentation

- Create docs/TESTING.md with testing guide
- Document running tests and coverage
- Provide code examples and patterns
- Add mocking strategies
- Include troubleshooting section
- Update README with testing overview
```

**Estimated tokens**: ~5,000

---

### Task 4: Add Pre-commit Hook (Optional)

**Goal**: Run tests before commits to catch issues early.

**Files to Modify/Create**:
- `.husky/pre-commit` - Git pre-commit hook
- `package.json` - Add husky scripts

**Prerequisites**:
- Task 3 completed (documentation ready)
- Understanding of git hooks

**Implementation Steps**:
1. Install husky for git hooks
2. Set up pre-commit hook to run tests
3. Configure to run only on staged files if possible
4. Make hook skippable for WIP commits

**Note**: This task is optional. Only implement if the team wants automatic pre-commit testing.

**Installation**:
```bash
pnpm add -D husky
npx husky install
npx husky add .husky/pre-commit "pnpm test"
```

**Pre-commit Hook**:
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "Running tests before commit..."
pnpm test

if [ $? -ne 0 ]; then
  echo "Tests failed. Commit aborted."
  echo "Use 'git commit --no-verify' to skip tests."
  exit 1
fi
```

**package.json Update**:
```json
{
  "scripts": {
    "prepare": "husky install",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

**Verification Checklist**:
- [ ] Husky installed (if implementing)
- [ ] Pre-commit hook created
- [ ] Hook runs tests before commit
- [ ] Can be skipped with --no-verify
- [ ] Team agrees to use pre-commit hooks

**Testing Instructions**:
- Make a change and try to commit
- Verify tests run automatically
- Test --no-verify flag works

**Commit Message Template**:
```
chore(tests): add pre-commit hook for testing

- Install husky for git hooks
- Add pre-commit hook to run tests
- Allow skip with --no-verify flag
- Update package.json with prepare script
```

**Estimated tokens**: ~3,000

---

### Task 5: Final Verification and Cleanup

**Goal**: Ensure everything is working end-to-end and clean up any temporary files or comments.

**Files to Modify/Create**:
- Various files may need cleanup

**Prerequisites**:
- All previous tasks in all phases completed

**Implementation Steps**:
1. Run full test suite locally and verify all pass
2. Run coverage and verify thresholds met
3. Push to trigger CI and verify workflow passes
4. Review all test files for TODO comments or debug code
5. Remove any console.logs added during testing
6. Verify all documentation is accurate
7. Create a final summary of what was accomplished

**Verification Checklist**:
- [ ] All tests pass locally
- [ ] Coverage meets 80% threshold
- [ ] CI workflow passes on GitHub
- [ ] No console.logs or debug code in tests
- [ ] No TODO comments left unaddressed
- [ ] Documentation is complete and accurate
- [ ] README badges display correctly

**Final Tests to Run**:
```bash
# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Run all tests
pnpm test

# Generate coverage
pnpm test:coverage

# Run type checking
pnpm check

# Build application
pnpm build
```

**Testing Instructions**:
- Run all verification commands
- Push to GitHub and watch CI
- Review GitHub Actions output
- Check coverage on Codecov
- Verify badges in README

**Commit Message Template**:
```
chore(tests): final verification and cleanup

- Verify all tests pass locally and in CI
- Confirm coverage thresholds met
- Remove debug code and console.logs
- Clean up TODO comments
- Validate documentation accuracy
- Test full build pipeline
```

**Estimated tokens**: ~3,000

---

## Phase Verification

Before declaring the project complete, verify:

### CI/CD Integration
- [ ] GitHub Actions workflow created
- [ ] Tests run on every push
- [ ] Tests run on pull requests
- [ ] Matrix testing multiple Node versions
- [ ] Workflow passes successfully

### Coverage Reporting
- [ ] Coverage uploaded to Codecov
- [ ] Coverage badges in README
- [ ] Thresholds enforced in CI
- [ ] Coverage reports accessible
- [ ] Coverage meets 80% target

### Documentation
- [ ] docs/TESTING.md comprehensive and accurate
- [ ] README includes testing section
- [ ] All commands documented
- [ ] Examples provided
- [ ] Troubleshooting guide helpful

### Clean Code
- [ ] No debug code left in files
- [ ] No TODO comments unresolved
- [ ] No console.logs in production code
- [ ] All files properly formatted

### End-to-End Validation
- [ ] Fresh install works
- [ ] All tests pass
- [ ] Coverage meets thresholds
- [ ] Type checking passes
- [ ] Application builds successfully
- [ ] CI workflow green

### Git Validation
- [ ] All work committed
- [ ] Commit author is HatmanStack
- [ ] Conventional commit format used
- [ ] Branch is claude/design-test-suite-01WFo7NCaD3Mu3DAxuTmXn1o

## Final Deliverables

This test suite implementation delivers:

1. **Comprehensive Test Coverage**: 80%+ coverage across all application layers
2. **Fast Feedback Loop**: Tests run in under 30 seconds
3. **Automated CI/CD**: Tests run on every commit and PR
4. **Coverage Tracking**: Codecov integration with badges
5. **Clear Documentation**: Complete testing guide and examples
6. **Maintainable Tests**: Reusable utilities, factories, and fixtures
7. **Deployment Confidence**: Catch regressions before production

## Success Metrics

-  154,000 tokens of implementation work completed
-  100+ tests written across all layers
-  80% code coverage achieved
-  <30 second test execution time
-  CI/CD pipeline integrated
-  Zero regressions detected
-  Complete documentation

## Next Steps (Post-Implementation)

After this plan is complete, consider:

1. **E2E Testing**: Add Playwright for critical user flows
2. **Visual Regression**: Add Percy or Chromatic for visual testing
3. **Performance Testing**: Add lighthouse CI for performance budgets
4. **Accessibility Testing**: Add automated a11y testing
5. **Mutation Testing**: Add Stryker for test quality validation

## Celebration

Congratulations! You've built a comprehensive, maintainable test suite that will provide deployment confidence and enable fearless refactoring. The application is now protected against regressions and ready for continuous delivery.
