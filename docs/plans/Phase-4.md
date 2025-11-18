# Phase 4: Component Testing

## Phase Goal

Test all UI components to ensure they render correctly, handle props appropriately, respond to user interactions, and maintain visual behavior. This phase covers all components in src/lib/components/, focusing on testing observable behavior rather than implementation details.

**Success criteria**:
- All components have test coverage
- Props are validated for correct rendering
- User interactions trigger expected behavior
- Component integration with stores and hooks is tested
- Visual behavior is validated through DOM assertions

**Estimated tokens**: ~35,000

## Prerequisites

- Phase 0, 1, 2, and 3 completed and verified
- Understanding of @testing-library/svelte patterns
- Familiarity with all components in src/lib/components/
- render-helpers.ts available from Phase 1
- mock-factories.ts available from Phase 1

## Tasks

### Task 1: Test ProjectCard Component - Rendering

**Goal**: Test that ProjectCard renders project data correctly with different prop combinations.

**Files to Modify/Create**:
- `src/lib/components/ui/ProjectCard.test.ts` - ProjectCard tests

**Prerequisites**:
- Phase 1-3 completed
- Review src/lib/components/ui/ProjectCard.svelte
- createMockProject factory available

**Implementation Steps**:
1. Create ProjectCard.test.ts next to ProjectCard.svelte
2. Import render from test utilities
3. Import createMockProject factory
4. Mock the sound store to avoid Audio API issues
5. Test rendering with default props
6. Test rendering with custom lazy loading
7. Test all project data is displayed
8. Verify images have correct attributes

**Mocking Strategy**:
```typescript
vi.mock('$lib/hooks/useSound.svelte', () => ({
  createSoundStore: vi.fn(() => ({
    play: vi.fn(),
    pause: vi.fn(),
    stop: vi.fn(),
    isLoaded: true,
    error: null,
    audio: null
  }))
}));
```

**Test Cases to Include**:
```typescript
describe('ProjectCard - Rendering', () => {
  test('renders project title', () => {
    const project = createMockProject({ title: 'Test Project' });
    const { getByText } = render(ProjectCard, { props: { project } });

    expect(getByText('Test Project')).toBeInTheDocument();
  });

  test('renders project category', () => {
    const project = createMockProject({ category: 'Web' });
    const { getByText } = render(ProjectCard, { props: { project } });

    expect(getByText('Web')).toBeInTheDocument();
  });

  test('renders project description', () => {
    const project = createMockProject({ description: 'Test description' });
    const { getByText } = render(ProjectCard, { props: { project } });

    expect(getByText('Test description')).toBeInTheDocument();
  });

  test('renders profession and profile images', () => {
    const project = createMockProject({
      images: { profession: '/prof.jpg', profile: '/profile.jpg' }
    });
    const { container } = render(ProjectCard, { props: { project } });

    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', '/prof.jpg');
    expect(images[1]).toHaveAttribute('src', '/profile.jpg');
  });

  test('images have lazy loading by default', () => {
    const project = createMockProject();
    const { container } = render(ProjectCard, { props: { project } });

    const images = container.querySelectorAll('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  test('images load eagerly when lazy=false', () => {
    const project = createMockProject();
    const { container } = render(ProjectCard, { props: { project, lazy: false } });

    const images = container.querySelectorAll('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('loading', 'eager');
    });
  });

  test('renders link with correct href', () => {
    const project = createMockProject({ link: 'https://example.com' });
    const { getByRole } = render(ProjectCard, { props: { project } });

    const link = getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  test('renders button with correct text', () => {
    const project = createMockProject({ buttonText: 'Click Me' });
    const { getByRole } = render(ProjectCard, { props: { project } });

    const button = getByRole('button', { name: 'Click Me' });
    expect(button).toBeInTheDocument();
  });
});
```

**Verification Checklist**:
- [ ] Test file created for ProjectCard
- [ ] All project fields rendered and tested
- [ ] Image attributes validated
- [ ] Lazy loading prop tested
- [ ] Link and button tested
- [ ] Sound hook mocked
- [ ] All tests pass

**Testing Instructions**:
- Run `pnpm test ProjectCard`
- Verify all rendering tests pass
- Check coverage includes ProjectCard.svelte

**Commit Message Template**:
```
test(components): test ProjectCard rendering

- Test project data rendering
- Test images with lazy/eager loading
- Test link and button rendering
- Mock sound hook
- Validate all props
```

**Estimated tokens**: ~6,000

---

### Task 2: Test ProjectCard Component - Interactions

**Goal**: Test user interactions with ProjectCard including button clicks and sound playback.

**Files to Modify/Create**:
- `src/lib/components/ui/ProjectCard.test.ts` - Add interaction tests

**Prerequisites**:
- Task 1 completed (rendering tests exist)

**Implementation Steps**:
1. Add describe block for interactions in existing test file
2. Set up mocks to capture sound playback calls
3. Test button click triggers sound
4. Test GooeyButton integration
5. Verify onclick handler is called

**Test Cases to Include**:
```typescript
import { fireEvent } from '@testing-library/svelte';

describe('ProjectCard - Interactions', () => {
  test('clicking button plays sound', async () => {
    const mockPlay = vi.fn();
    vi.mocked(createSoundStore).mockReturnValue({
      play: mockPlay,
      pause: vi.fn(),
      stop: vi.fn(),
      setVolume: vi.fn(),
      isLoaded: true,
      error: null,
      audio: null
    });

    const project = createMockProject();
    const { getByRole } = render(ProjectCard, { props: { project } });

    const button = getByRole('button');
    await fireEvent.click(button);

    expect(mockPlay).toHaveBeenCalled();
  });

  test('integrates with GooeyButton component', () => {
    const project = createMockProject();
    const { getByRole } = render(ProjectCard, { props: { project } });

    const button = getByRole('button');
    expect(button).toHaveClass('gooey-button');
  });
});
```

**Verification Checklist**:
- [ ] Button click tested
- [ ] Sound playback verified
- [ ] GooeyButton integration tested
- [ ] All interaction tests pass

**Testing Instructions**:
- Run `pnpm test ProjectCard`
- Verify interactions work correctly
- Check mocks capture calls

**Commit Message Template**:
```
test(components): test ProjectCard interactions

- Test button click triggers sound
- Verify sound playback is called
- Test GooeyButton integration
- Validate user interaction flow
```

**Estimated tokens**: ~4,000

---

### Task 3: Test GooeyButton Component

**Goal**: Test the GooeyButton component's rendering, props, and pointer interactions.

**Files to Modify/Create**:
- `src/lib/components/ui/GooeyButton.test.ts` - GooeyButton tests

**Prerequisites**:
- Task 2 completed (ProjectCard fully tested)
- Review src/lib/components/ui/GooeyButton.svelte

**Implementation Steps**:
1. Create GooeyButton.test.ts
2. Test rendering with children
3. Test onclick handler is called
4. Test pointer move updates CSS variables
5. Test pointer over clears animation
6. Test intro animation lifecycle
7. Mock setInterval/clearInterval for animation tests

**Mocking Strategy**:
```typescript
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});
```

**Test Cases to Include**:
```typescript
describe('GooeyButton - Rendering', () => {
  test('renders children content', () => {
    const { getByRole } = render(GooeyButton, {
      props: {
        children: () => 'Click Me'
      }
    });

    const button = getByRole('button');
    expect(button).toHaveTextContent('Click Me');
  });

  test('renders as button element', () => {
    const { getByRole } = render(GooeyButton, {
      props: { children: () => 'Test' }
    });

    expect(getByRole('button')).toBeInTheDocument();
  });

  test('has gooey-button class', () => {
    const { getByRole } = render(GooeyButton, {
      props: { children: () => 'Test' }
    });

    expect(getByRole('button')).toHaveClass('gooey-button');
  });
});

describe('GooeyButton - Interactions', () => {
  test('calls onclick when clicked', async () => {
    const onclick = vi.fn();
    const { getByRole } = render(GooeyButton, {
      props: {
        children: () => 'Test',
        onclick
      }
    });

    const button = getByRole('button');
    await fireEvent.click(button);

    expect(onclick).toHaveBeenCalled();
  });

  test('updates CSS variables on pointer move', async () => {
    const { getByRole } = render(GooeyButton, {
      props: { children: () => 'Test' }
    });

    const button = getByRole('button') as HTMLElement;
    const mockEvent = new PointerEvent('pointermove', {
      clientX: 100,
      clientY: 50
    });

    // Spy on setProperty
    const setPropertySpy = vi.spyOn(button.style, 'setProperty');

    await fireEvent(button, mockEvent);

    expect(setPropertySpy).toHaveBeenCalled();
  });
});

describe('GooeyButton - Animation', () => {
  test('runs intro animation on mount', () => {
    vi.useFakeTimers();
    const setIntervalSpy = vi.spyOn(global, 'setInterval');

    render(GooeyButton, {
      props: { children: () => 'Test' }
    });

    expect(setIntervalSpy).toHaveBeenCalled();
    vi.useRealTimers();
  });

  test('clears animation on pointer over', async () => {
    vi.useFakeTimers();
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');

    const { getByRole } = render(GooeyButton, {
      props: { children: () => 'Test' }
    });

    const button = getByRole('button');
    await fireEvent.pointerOver(button);

    expect(clearIntervalSpy).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
```

**Verification Checklist**:
- [ ] Rendering tests pass
- [ ] onclick handler tested
- [ ] Pointer interactions tested
- [ ] Animation lifecycle tested
- [ ] CSS variable updates verified
- [ ] All tests pass

**Testing Instructions**:
- Run `pnpm test GooeyButton`
- Verify timer mocks work correctly
- Check coverage includes GooeyButton.svelte

**Commit Message Template**:
```
test(components): test GooeyButton component

- Test children rendering
- Test onclick handler
- Test pointer move and over events
- Test intro animation lifecycle
- Mock timers for animation tests
```

**Estimated tokens**: ~6,000

---

### Task 4: Test ImageGrid Component

**Goal**: Test ImageGrid component renders images correctly and handles special items.

**Files to Modify/Create**:
- `src/lib/components/ui/ImageGrid.test.ts` - ImageGrid tests

**Prerequisites**:
- Task 3 completed (GooeyButton tested)
- Review src/lib/components/ui/ImageGrid.svelte
- Create mock ImageGridItem factory if needed

**Implementation Steps**:
1. Create ImageGrid.test.ts
2. Create mock ImageGridItem factory in mock-factories.ts if needed
3. Test rendering with array of images
4. Test special items render content instead of images
5. Test className prop
6. Test animation-range CSS variable
7. Validate grid structure

**Mock Factory Addition** (add to mock-factories.ts):
```typescript
export function createMockImageGridItem(overrides: Partial<ImageGridItem> = {}): ImageGridItem {
  return {
    id: 'test-image-1',
    src: '/test-image.jpg',
    alt: 'Test image',
    special: false,
    animationRange: '0% 100%',
    ...overrides
  };
}
```

**Test Cases to Include**:
```typescript
describe('ImageGrid - Rendering', () => {
  test('renders all images', () => {
    const images = [
      createMockImageGridItem({ id: '1', alt: 'Image 1' }),
      createMockImageGridItem({ id: '2', alt: 'Image 2' }),
      createMockImageGridItem({ id: '3', alt: 'Image 3' })
    ];

    const { getAllByRole } = render(ImageGrid, { props: { images } });

    const imgs = getAllByRole('img');
    expect(imgs).toHaveLength(3);
  });

  test('renders special items as text', () => {
    const images = [
      createMockImageGridItem({ id: '1' }),
      createMockImageGridItem({
        id: '2',
        special: true,
        content: 'Special Content',
        src: undefined,
        alt: undefined
      } as any)
    ];

    const { getByText, getAllByRole } = render(ImageGrid, { props: { images } });

    expect(getByText('Special Content')).toBeInTheDocument();
    expect(getAllByRole('img')).toHaveLength(1); // Only non-special item
  });

  test('applies custom className', () => {
    const images = [createMockImageGridItem()];
    const { container } = render(ImageGrid, {
      props: { images, className: 'custom-class' }
    });

    const grid = container.querySelector('.stuck-grid');
    expect(grid).toHaveClass('custom-class');
  });

  test('applies animation-range CSS variable', () => {
    const images = [
      createMockImageGridItem({ id: '1', animationRange: '10% 20%' })
    ];

    const { container } = render(ImageGrid, { props: { images } });

    const gridItem = container.querySelector('.grid-item') as HTMLElement;
    expect(gridItem.style.getPropertyValue('--animation-range')).toBe('10% 20%');
  });

  test('images have lazy loading', () => {
    const images = [createMockImageGridItem()];
    const { getByRole } = render(ImageGrid, { props: { images } });

    const img = getByRole('img');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  test('special items have special class', () => {
    const images = [
      createMockImageGridItem({
        id: '1',
        special: true,
        content: 'Special'
      } as any)
    ];

    const { container } = render(ImageGrid, { props: { images } });

    const specialItem = container.querySelector('.grid-item');
    expect(specialItem).toHaveClass('special');
  });
});
```

**Verification Checklist**:
- [ ] Image rendering tested
- [ ] Special items tested
- [ ] className prop tested
- [ ] CSS variables tested
- [ ] Grid structure validated
- [ ] All tests pass

**Testing Instructions**:
- Run `pnpm test ImageGrid`
- Verify grid rendering works
- Check special item handling

**Commit Message Template**:
```
test(components): test ImageGrid component

- Test image rendering
- Test special items with text content
- Test className prop
- Test animation-range CSS variables
- Validate grid structure
```

**Estimated tokens**: ~5,000

---

### Task 5: Test SVG Filter Components

**Goal**: Test SVGFilters and AndroidFilters components render correct SVG filter definitions.

**Files to Modify/Create**:
- `src/lib/components/ui/SVGFilters.test.ts` - SVGFilters tests
- `src/lib/components/ui/AndroidFilters.test.ts` - AndroidFilters tests (if exists)

**Prerequisites**:
- Task 4 completed (ImageGrid tested)
- Review filter components

**Implementation Steps**:
1. Create test files for filter components
2. Test that SVG elements are rendered
3. Test that filter IDs are correct
4. Validate filter definitions exist
5. Check for required filter elements (feGaussianBlur, feColorMatrix, etc.)

**Test Cases to Include**:
```typescript
describe('SVGFilters', () => {
  test('renders SVG element', () => {
    const { container } = render(SVGFilters);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('renders filter definitions', () => {
    const { container } = render(SVGFilters);

    const defs = container.querySelector('defs');
    expect(defs).toBeInTheDocument();
  });

  test('filter has correct ID', () => {
    const { container } = render(SVGFilters);

    // Check for specific filter IDs based on actual component
    const filter = container.querySelector('filter');
    expect(filter).toHaveAttribute('id');
  });

  test('renders hidden SVG (position absolute)', () => {
    const { container } = render(SVGFilters);

    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle({ position: 'absolute' });
  });
});
```

**Note**: Adapt tests based on actual filter component implementation. If AndroidFilters doesn't exist, skip and document in commit.

**Verification Checklist**:
- [ ] SVGFilters test file created
- [ ] SVG rendering tested
- [ ] Filter definitions validated
- [ ] All tests pass

**Testing Instructions**:
- Run `pnpm test SVGFilters`
- Verify SVG structure is correct

**Commit Message Template**:
```
test(components): test SVG filter components

- Test SVGFilters SVG rendering
- Validate filter definitions exist
- Check filter IDs
- Test hidden SVG positioning
```

**Estimated tokens**: ~4,000

---

### Task 6: Test Icon Components

**Goal**: Test icon components render correct SVG paths and attributes.

**Files to Modify/Create**:
- `src/lib/components/icons/LinkedIn.test.ts` - LinkedIn icon test
- Additional icon tests if other icons exist

**Prerequisites**:
- Task 5 completed (filter components tested)
- Review src/lib/components/icons/

**Implementation Steps**:
1. Find all icon components in icons directory
2. Create test file for each icon
3. Test SVG rendering
4. Test viewBox attribute
5. Test path elements exist
6. Test aria labels if present

**Test Cases to Include**:
```typescript
describe('LinkedIn Icon', () => {
  test('renders SVG element', () => {
    const { container } = render(LinkedIn);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('has viewBox attribute', () => {
    const { container } = render(LinkedIn);

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox');
  });

  test('renders path elements', () => {
    const { container } = render(LinkedIn);

    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  test('has accessible role', () => {
    const { container } = render(LinkedIn);

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('role', 'img');
  });
});
```

**Verification Checklist**:
- [ ] Icon tests created for all icons
- [ ] SVG rendering validated
- [ ] Paths verified
- [ ] Accessibility checked
- [ ] All tests pass

**Testing Instructions**:
- Run `pnpm test icons/`
- Verify all icon components tested

**Commit Message Template**:
```
test(components): test icon components

- Test LinkedIn icon SVG rendering
- Test [other icons] if present
- Validate viewBox and paths
- Check accessibility attributes
```

**Estimated tokens**: ~3,000

---

### Task 7: Component Integration Tests

**Goal**: Test how components work together in realistic scenarios.

**Files to Modify/Create**:
- `src/lib/components/component-integration.test.ts` - Integration tests

**Prerequisites**:
- All previous component tasks completed
- Understanding of how components are used together

**Implementation Steps**:
1. Create integration test file
2. Test ProjectCard with real GooeyButton
3. Test multiple ProjectCards rendering together
4. Test ImageGrid with mixed normal and special items
5. Verify no conflicts between components

**Test Cases to Include**:
```typescript
describe('Component Integration', () => {
  test('multiple ProjectCards render without conflicts', () => {
    const projects = [
      createMockProject({ id: '1', title: 'Project 1' }),
      createMockProject({ id: '2', title: 'Project 2' }),
      createMockProject({ id: '3', title: 'Project 3' })
    ];

    const { getByText } = render({
      Component: class TestComponent {
        // Render multiple ProjectCards
      }
    });

    expect(getByText('Project 1')).toBeInTheDocument();
    expect(getByText('Project 2')).toBeInTheDocument();
    expect(getByText('Project 3')).toBeInTheDocument();
  });

  test('ProjectCard integrates correctly with GooeyButton', () => {
    const project = createMockProject();
    const { getByRole } = render(ProjectCard, { props: { project } });

    const button = getByRole('button');
    expect(button).toHaveClass('gooey-button');
  });

  test('ImageGrid handles mix of special and regular items', () => {
    const images = [
      createMockImageGridItem({ id: '1' }),
      createMockImageGridItem({ id: '2', special: true, content: 'Special' } as any),
      createMockImageGridItem({ id: '3' })
    ];

    const { getAllByRole, getByText } = render(ImageGrid, { props: { images } });

    expect(getAllByRole('img')).toHaveLength(2);
    expect(getByText('Special')).toBeInTheDocument();
  });
});
```

**Verification Checklist**:
- [ ] Integration test file created
- [ ] Multiple component scenarios tested
- [ ] Component interactions validated
- [ ] All tests pass

**Testing Instructions**:
- Run `pnpm test component-integration`
- Verify components work together

**Commit Message Template**:
```
test(components): add component integration tests

- Test multiple ProjectCards together
- Test ProjectCard + GooeyButton integration
- Test ImageGrid with mixed items
- Validate component interactions
```

**Estimated tokens**: ~4,000

---

## Phase Verification

Before moving to Phase 5, verify:

### Test Coverage
- [ ] All components in src/lib/components/ have tests
- [ ] ProjectCard fully tested (rendering + interactions)
- [ ] GooeyButton fully tested
- [ ] ImageGrid fully tested
- [ ] SVG filters tested
- [ ] Icons tested
- [ ] Integration tests pass
- [ ] Coverage >80% for components

### Component Validation
- [ ] All components render correctly
- [ ] Props are validated
- [ ] User interactions work
- [ ] CSS classes and styles applied
- [ ] Accessibility attributes present
- [ ] No actual sound playback in tests

### Mocking Validation
- [ ] Sound hooks properly mocked
- [ ] No Audio API calls in tests
- [ ] Timers mocked for animations
- [ ] No side effects leak between tests

### File Structure
```
src/lib/components/
  ui/
    ProjectCard.svelte
    ProjectCard.test.ts
    GooeyButton.svelte
    GooeyButton.test.ts
    ImageGrid.svelte
    ImageGrid.test.ts
    SVGFilters.svelte
    SVGFilters.test.ts
    AndroidFilters.svelte
    AndroidFilters.test.ts (if exists)
  icons/
    LinkedIn.svelte
    LinkedIn.test.ts
  component-integration.test.ts
```

### Test Execution
- [ ] `pnpm test components` passes all tests
- [ ] Tests run quickly (<10 seconds)
- [ ] No console errors or warnings
- [ ] Coverage report shows component coverage

### Git Validation
- [ ] All tasks committed separately
- [ ] Commit author is HatmanStack
- [ ] Conventional commit format used
- [ ] Working on correct branch

## Known Limitations

- Visual appearance not tested (CSS rendering)
- Animation timing not precisely tested
- Hover states simulated, not actually triggered
- Some complex CSS interactions may not be fully validated

## Next Phase

Once Phase 4 is complete and verified, proceed to **[Phase 5: Route & Page Testing](./Phase-5.md)** to test routing and page load functions.
