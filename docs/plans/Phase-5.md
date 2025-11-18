# Phase 5: Route & Page Testing

## Phase Goal

Test all SvelteKit route load functions, page components, and blog post loading to ensure data fetching works correctly, error handling is robust, and pages render properly. This phase focuses on the routing layer and blog functionality.

**Success criteria**:
- All route +page.ts/js files have test coverage
- Blog post loading is tested
- Error handling is validated
- Dynamic route parameters are tested
- Page components render with loaded data

**Estimated tokens**: ~25,000

## Prerequisites

- Phase 0, 1, 2, 3, and 4 completed and verified
- Understanding of SvelteKit load functions
- Familiarity with route structure in src/routes/
- Knowledge of blog post loading mechanism
- Test utilities and mock factories available

## Tasks

### Task 1: Test Blog List Page Load Function

**Goal**: Test the /read route's load function that fetches all blog posts.

**Files to Modify/Create**:
- `src/routes/read/+page.test.js` - Blog list load tests

**Prerequisites**:
- Phase 1-4 completed
- Review src/routes/read/+page.js
- Understanding of import.meta.glob behavior

**Implementation Steps**:
1. Create +page.test.js next to +page.js
2. Mock import.meta.glob to return test markdown files
3. Test successful post loading
4. Test post sorting by date (newest first)
5. Test error handling
6. Test invalid post filtering
7. Test slug extraction from file paths

**Mocking Strategy**:
```typescript
vi.mock('import.meta', () => ({
  glob: vi.fn()
}));

// In test setup
const mockPosts = {
  './post/post1.md': {
    metadata: {
      title: 'Post 1',
      date: '2024-01-15',
      description: 'First post'
    }
  },
  './post/post2.md': {
    metadata: {
      title: 'Post 2',
      date: '2024-01-20',
      description: 'Second post'
    }
  }
};
```

**Test Cases to Include**:
```typescript
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { load } from './+page.js';

describe('Blog List Load Function', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('loads all blog posts', async () => {
    const mockPosts = {
      './post/test-post.md': {
        metadata: {
          title: 'Test Post',
          date: '2024-01-15',
          description: 'Test description'
        }
      }
    };

    // Mock import.meta.glob
    const mockGlob = vi.fn(() => mockPosts);
    vi.stubGlobal('import', { meta: { glob: mockGlob } });

    const result = await load();

    expect(result.posts).toBeDefined();
    expect(result.posts.length).toBeGreaterThan(0);
  });

  test('sorts posts by date (newest first)', async () => {
    const mockPosts = {
      './post/old-post.md': {
        metadata: {
          title: 'Old Post',
          date: '2024-01-10',
          description: 'Old'
        }
      },
      './post/new-post.md': {
        metadata: {
          title: 'New Post',
          date: '2024-01-20',
          description: 'New'
        }
      }
    };

    const result = await load();

    expect(result.posts[0].date).toBe('2024-01-20');
    expect(result.posts[1].date).toBe('2024-01-10');
  });

  test('extracts slug from file path', async () => {
    const mockPosts = {
      './post/my-blog-post.md': {
        metadata: {
          title: 'My Blog Post',
          date: '2024-01-15',
          description: 'Test'
        }
      }
    };

    const result = await load();

    expect(result.posts[0].slug).toBe('my-blog-post');
  });

  test('handles invalid posts gracefully', async () => {
    const mockPosts = {
      './post/valid.md': {
        metadata: {
          title: 'Valid',
          date: '2024-01-15',
          description: 'Valid post'
        }
      },
      './post/invalid.md': null, // Invalid post
      './post/no-metadata.md': {} // No metadata
    };

    const result = await load();

    // Should filter out invalid posts
    expect(result.posts.length).toBe(1);
    expect(result.posts[0].slug).toBe('valid');
  });

  test('handles errors and returns empty array', async () => {
    // Mock glob to throw error
    const mockGlob = vi.fn(() => {
      throw new Error('Failed to load posts');
    });

    const result = await load();

    expect(result.posts).toEqual([]);
  });

  test('handles invalid dates in sorting', async () => {
    const mockPosts = {
      './post/invalid-date.md': {
        metadata: {
          title: 'Invalid Date',
          date: 'not-a-date',
          description: 'Test'
        }
      },
      './post/valid-date.md': {
        metadata: {
          title: 'Valid Date',
          date: '2024-01-15',
          description: 'Test'
        }
      }
    };

    const result = await load();

    // Should not crash, invalid dates treated as epoch (0)
    expect(result.posts).toHaveLength(2);
  });
});
```

**Verification Checklist**:
- [ ] Test file created for blog list route
- [ ] Post loading tested
- [ ] Sorting by date tested
- [ ] Slug extraction tested
- [ ] Error handling tested
- [ ] Invalid post filtering tested
- [ ] All tests pass

**Testing Instructions**:
- Run `pnpm test read/+page`
- Verify all blog loading scenarios work
- Check error handling is robust

**Commit Message Template**:
```
test(routes): test blog list load function

- Test blog post loading
- Test sorting by date (newest first)
- Test slug extraction from file paths
- Test invalid post filtering
- Test error handling
```

**Estimated tokens**: ~6,000

---

### Task 2: Test Individual Blog Post Load Function

**Goal**: Test the /read/post/[slug] route's load function that fetches a single blog post.

**Files to Modify/Create**:
- `src/routes/read/post/[slug]/+page.test.js` - Single post load tests

**Prerequisites**:
- Task 1 completed (blog list tested)
- Review src/routes/read/post/[slug]/+page.js

**Implementation Steps**:
1. Create +page.test.js next to +page.js
2. Mock dynamic import for markdown files
3. Test successful post loading with valid slug
4. Test error when slug doesn't exist
5. Test metadata extraction
6. Test content component returned

**Mocking Strategy**:
```typescript
vi.mock('../test-slug.md', () => ({
  metadata: {
    title: 'Test Post',
    date: '2024-01-15',
    description: 'Test description'
  },
  default: 'MockedComponent' // The rendered content
}));
```

**Test Cases to Include**:
```typescript
import { describe, test, expect, vi } from 'vitest';
import { load } from './+page.js';

describe('Single Blog Post Load Function', () => {
  test('loads post with valid slug', async () => {
    const params = { slug: 'test-post' };

    // Mock the dynamic import
    vi.mock('../test-post.md', () => ({
      metadata: {
        title: 'Test Post',
        date: '2024-01-15',
        description: 'Test description'
      },
      default: {}
    }));

    const result = await load({ params });

    expect(result.title).toBe('Test Post');
    expect(result.date).toBe('2024-01-15');
    expect(result.content).toBeDefined();
  });

  test('returns metadata and content', async () => {
    const params = { slug: 'test-post' };

    const result = await load({ params });

    expect(result).toHaveProperty('title');
    expect(result).toHaveProperty('date');
    expect(result).toHaveProperty('description');
    expect(result).toHaveProperty('content');
  });

  test('throws error for non-existent slug', async () => {
    const params = { slug: 'non-existent-post' };

    await expect(load({ params })).rejects.toThrow();
  });

  test('handles import errors gracefully', async () => {
    const params = { slug: 'error-post' };
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(load({ params })).rejects.toThrow();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
```

**Verification Checklist**:
- [ ] Test file created for single post route
- [ ] Valid slug loading tested
- [ ] Metadata extraction tested
- [ ] Content component tested
- [ ] Error handling tested
- [ ] All tests pass

**Testing Instructions**:
- Run `pnpm test read/post`
- Verify post loading works
- Check error cases handled

**Commit Message Template**:
```
test(routes): test single blog post load function

- Test loading post with valid slug
- Test metadata and content extraction
- Test error handling for non-existent posts
- Validate params.slug usage
```

**Estimated tokens**: ~5,000

---

### Task 3: Test Static Page Load Functions

**Goal**: Test load functions for static pages like /android, /web, /about.

**Files to Modify/Create**:
- `src/routes/android/+page.test.ts` - Android page load tests
- `src/routes/web/+page.test.ts` - Web page load tests
- `src/routes/about/+page.test.ts` - About page load tests
- `src/routes/+page.test.ts` - Home page tests (if load function exists)

**Prerequisites**:
- Task 2 completed (blog routes tested)
- Review all +page.ts files in routes

**Implementation Steps**:
1. Identify which routes have load functions
2. Create test files for each route with a load function
3. Test data loading
4. Test data transformation if any
5. Test error handling

**Note**: If a route doesn't have a load function, create a minimal test that verifies the page can be imported without errors.

**Test Cases to Include**:
```typescript
// Example for /android route
import { describe, test, expect } from 'vitest';
import { load } from './+page.ts';

describe('Android Page Load Function', () => {
  test('loads android apps data', async () => {
    const result = await load();

    expect(result).toHaveProperty('apps');
    expect(Array.isArray(result.apps)).toBe(true);
  });

  test('returns data in correct format', async () => {
    const result = await load();

    result.apps.forEach(app => {
      expect(app).toHaveProperty('id');
      expect(app).toHaveProperty('title');
      expect(app).toHaveProperty('description');
    });
  });
});

// Example for route without load function
describe('About Page', () => {
  test('page component can be imported', async () => {
    const page = await import('./+page.svelte');
    expect(page).toBeDefined();
  });
});
```

**Verification Checklist**:
- [ ] Test files created for all routes with load functions
- [ ] Data loading tested
- [ ] Data format validated
- [ ] Routes without load functions have minimal tests
- [ ] All tests pass

**Testing Instructions**:
- Run `pnpm test routes/`
- Verify all route tests pass
- Check data loading works

**Commit Message Template**:
```
test(routes): test static page load functions

- Test android page load function
- Test web page load function
- Test about page load function
- Add minimal tests for routes without load
```

**Estimated tokens**: ~5,000

---

### Task 4: Test Page Component Rendering

**Goal**: Test that page components render correctly with data from load functions.

**Files to Modify/Create**:
- `src/routes/read/+page.test.svelte.ts` - Blog list page rendering
- `src/routes/read/post/[slug]/+page.test.svelte.ts` - Blog post page rendering

**Prerequisites**:
- Task 3 completed (all load functions tested)
- Understanding of page component structure

**Implementation Steps**:
1. Create test files for page components
2. Mock the data prop that comes from load functions
3. Test rendering with mock data
4. Verify expected content appears
5. Test with empty data states

**Test Cases to Include**:
```typescript
import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import ReadPage from './+page.svelte';

describe('Blog List Page Component', () => {
  test('renders list of posts', () => {
    const data = {
      posts: [
        { slug: 'post-1', title: 'Post 1', date: '2024-01-15', description: 'Desc 1' },
        { slug: 'post-2', title: 'Post 2', date: '2024-01-20', description: 'Desc 2' }
      ]
    };

    const { getByText } = render(ReadPage, { props: { data } });

    expect(getByText('Post 1')).toBeInTheDocument();
    expect(getByText('Post 2')).toBeInTheDocument();
  });

  test('handles empty posts array', () => {
    const data = { posts: [] };

    const { container } = render(ReadPage, { props: { data } });

    // Should not crash
    expect(container).toBeInTheDocument();
  });

  test('renders post metadata correctly', () => {
    const data = {
      posts: [{
        slug: 'test',
        title: 'Test Post',
        date: '2024-01-15',
        description: 'Test description'
      }]
    };

    const { getByText } = render(ReadPage, { props: { data } });

    expect(getByText('Test Post')).toBeInTheDocument();
    expect(getByText('Test description')).toBeInTheDocument();
  });
});

describe('Single Blog Post Page Component', () => {
  test('renders post content', () => {
    const data = {
      title: 'Test Post',
      date: '2024-01-15',
      description: 'Test description',
      content: {} // Mock component
    };

    const { getByText } = render(BlogPostPage, { props: { data } });

    expect(getByText('Test Post')).toBeInTheDocument();
  });

  test('renders post metadata', () => {
    const data = {
      title: 'My Post',
      date: '2024-01-15',
      description: 'My description',
      content: {}
    };

    const { getByText } = render(BlogPostPage, { props: { data } });

    expect(getByText('My Post')).toBeInTheDocument();
    expect(getByText('My description')).toBeInTheDocument();
  });
});
```

**Verification Checklist**:
- [ ] Page component tests created
- [ ] Rendering with data tested
- [ ] Empty data states tested
- [ ] Metadata display tested
- [ ] All tests pass

**Testing Instructions**:
- Run `pnpm test routes/read`
- Verify page rendering works
- Check edge cases handled

**Commit Message Template**:
```
test(routes): test page component rendering

- Test blog list page renders posts
- Test single post page renders content
- Test empty data state handling
- Verify metadata display
```

**Estimated tokens**: ~5,000

---

### Task 5: Test Route Navigation and Params

**Goal**: Test that route parameters are correctly extracted and passed to load functions.

**Files to Modify/Create**:
- `src/routes/route-params.test.ts` - Route parameter tests

**Prerequisites**:
- Task 4 completed (page rendering tested)

**Implementation Steps**:
1. Create centralized test file for route parameter handling
2. Test [slug] parameter extraction
3. Test param validation
4. Test special characters in slugs
5. Verify params reach load functions correctly

**Test Cases to Include**:
```typescript
import { describe, test, expect } from 'vitest';
import { load } from './read/post/[slug]/+page.js';

describe('Route Parameters', () => {
  test('slug parameter is extracted correctly', async () => {
    const params = { slug: 'my-test-post' };

    // Mock the import
    vi.mock('./read/post/my-test-post.md', () => ({
      metadata: { title: 'Test' },
      default: {}
    }));

    const result = await load({ params });
    expect(result).toBeDefined();
  });

  test('handles slug with hyphens', async () => {
    const params = { slug: 'multi-word-post-title' };

    const result = await load({ params });
    // Should attempt to load ./read/post/multi-word-post-title.md
    expect(result).toBeDefined();
  });

  test('handles slug with numbers', async () => {
    const params = { slug: 'post-123' };

    const result = await load({ params });
    expect(result).toBeDefined();
  });

  test('throws error for empty slug', async () => {
    const params = { slug: '' };

    await expect(load({ params })).rejects.toThrow();
  });
});
```

**Verification Checklist**:
- [ ] Route parameter extraction tested
- [ ] Different slug formats tested
- [ ] Edge cases handled
- [ ] All tests pass

**Testing Instructions**:
- Run `pnpm test route-params`
- Verify parameter handling works

**Commit Message Template**:
```
test(routes): test route parameters

- Test slug parameter extraction
- Test various slug formats (hyphens, numbers)
- Test edge cases (empty slug)
- Verify params reach load functions
```

**Estimated tokens**: ~4,000

---

## Phase Verification

Before moving to Phase 6, verify:

### Test Coverage
- [ ] All route +page.js/ts files have tests
- [ ] Blog list load function tested
- [ ] Single post load function tested
- [ ] Static page load functions tested
- [ ] Page components tested
- [ ] Route parameters tested
- [ ] Coverage >80% for routes

### Functionality Validation
- [ ] Blog posts load correctly
- [ ] Posts sorted by date
- [ ] Slugs extracted properly
- [ ] Single posts load by slug
- [ ] Error handling works
- [ ] Empty states handled

### Data Validation
- [ ] Load functions return correct data shape
- [ ] Metadata is properly extracted
- [ ] Content components are returned
- [ ] Invalid data is filtered out

### File Structure
```
src/routes/
  +page.test.ts (if load exists)
  read/
    +page.js
    +page.test.js
    +page.svelte
    +page.test.svelte.ts
    post/
      [slug]/
        +page.js
        +page.test.js
        +page.svelte
        +page.test.svelte.ts
  android/
    +page.ts
    +page.test.ts
  web/
    +page.ts
    +page.test.ts
  about/
    +page.test.ts (minimal if no load)
  route-params.test.ts
```

### Test Execution
- [ ] `pnpm test routes` passes all tests
- [ ] Tests run quickly
- [ ] No console errors
- [ ] Coverage report shows route coverage

### Git Validation
- [ ] All tasks committed separately
- [ ] Commit author is HatmanStack
- [ ] Conventional commit format used
- [ ] Working on correct branch

## Known Limitations

- Markdown file imports are mocked, not actual files
- import.meta.glob behavior is simulated
- File system operations not tested
- Dynamic imports may need special handling per environment

## Next Phase

Once Phase 5 is complete and verified, proceed to **[Phase 6: CI/CD Integration & Documentation](./Phase-6.md)** to set up continuous integration and finalize documentation.
