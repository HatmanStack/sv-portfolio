# Phase 2: Data Layer & Type Testing

## Phase Goal

Test all data models, validate type safety, and ensure data integrity across the application. This phase focuses on the foundation of your application data: projects, navigation items, and type definitions. By the end, you'll have confidence that all data structures are valid and type-safe.

**Success criteria**:
- All data files have corresponding test coverage
- Type validation tests ensure data matches TypeScript interfaces
- Data integrity tests catch missing or malformed data
- Tests verify data consistency and relationships

**Estimated tokens**: ~22,000

## Prerequisites

- Phase 0 read and understood
- Phase 1 completed and verified
- Test infrastructure working (`pnpm test` passes)
- Understanding of application data structures in src/lib/data/
- Understanding of type definitions in src/lib/types/

## Tasks

### Task 1: Test Type Definitions

**Goal**: Create tests that validate TypeScript type definitions are correct and complete.

**Files to Modify/Create**:
- `src/lib/types/index.test.ts` - Type definition tests

**Prerequisites**:
- Phase 1 completed
- Review src/lib/types/index.ts to understand all type definitions

**Implementation Steps**:
1. Read src/lib/types/index.ts to see all exported types
2. Create index.test.ts in the same directory
3. Write tests that validate type completeness
4. Test that type guards work correctly if any exist
5. Ensure types are exported properly

**Type Validation Patterns**:
```typescript
import { describe, test, expect } from 'vitest';
import type { Project, AppState, NavigationState } from './index';

describe('Type Definitions', () => {
  test('Project type has required fields', () => {
    const project: Project = {
      id: 'test',
      title: 'Test',
      description: 'Description',
      category: 'Web',
      images: { profession: 'a.jpg', profile: 'b.jpg' },
      link: 'https://test.com',
      buttonText: 'Click'
    };

    expect(project).toHaveProperty('id');
    expect(project).toHaveProperty('title');
    // ... validate all required fields exist
  });
});
```

**Verification Checklist**:
- [ ] Test file created for type definitions
- [ ] Tests validate all major type interfaces
- [ ] TypeScript compiles without errors
- [ ] All type tests pass
- [ ] Coverage includes type definition file

**Testing Instructions**:
- Run `pnpm test types` to run type-related tests
- Verify TypeScript compilation succeeds
- Check that all type interfaces are validated

**Commit Message Template**:
```
test(types): validate type definitions

- Add tests for Project type structure
- Add tests for AppState type structure
- Add tests for NavigationState type structure
- Add tests for UserPreferences type structure
- Validate all required fields are present
```

**Estimated tokens**: ~3,500

---

### Task 2: Test Projects Data

**Goal**: Validate that all project data in src/lib/data/projects.ts is well-formed and matches the Project type.

**Files to Modify/Create**:
- `src/lib/data/projects.test.ts` - Project data validation tests

**Prerequisites**:
- Task 1 completed (type tests exist)
- Review src/lib/data/projects.ts structure

**Implementation Steps**:
1. Import the projects array from projects.ts
2. Test that the array is not empty
3. Validate each project has all required fields
4. Test that field values are correct types (strings, objects, etc.)
5. Validate URLs are well-formed
6. Ensure image paths exist or are valid
7. Test data consistency (no duplicate IDs, etc.)

**Test Cases to Include**:
- Projects array is not empty
- Each project has a unique ID
- Each project has all required fields (title, description, etc.)
- All links are valid URLs
- All categories are from a known set
- All button texts are non-empty strings
- Image objects have both profession and profile properties

**Verification Checklist**:
- [ ] Test file exists for projects.ts
- [ ] Tests validate array is not empty
- [ ] Tests check all required fields per project
- [ ] Tests validate data types are correct
- [ ] Tests check for duplicate IDs
- [ ] All tests pass
- [ ] Coverage includes projects.ts

**Testing Instructions**:
- Run `pnpm test projects` to run project data tests
- Verify all validations pass
- Check coverage report shows projects.ts is covered

**Commit Message Template**:
```
test(data): validate projects data integrity

- Test projects array is not empty
- Validate all required fields present
- Check for unique project IDs
- Validate URL formats
- Ensure data consistency
```

**Estimated tokens**: ~4,000

---

### Task 3: Test Android Apps Data

**Goal**: Validate android apps data structure and integrity (if androidApps.ts exists in your codebase).

**Files to Modify/Create**:
- `src/lib/data/androidApps.test.ts` - Android apps data tests

**Prerequisites**:
- Task 2 completed (projects data tested)
- Check if src/lib/data/androidApps.ts exists

**Implementation Steps**:
1. Verify androidApps.ts exists (if not, skip this task and note in commit)
2. Import the data structure from androidApps.ts
3. Write similar validation tests as projects data
4. Validate Android-specific fields (package names, versions, etc.)
5. Ensure consistency with related data structures

**Note**: If androidApps.ts doesn't exist or is empty, create a minimal test that validates this is intentional and commit noting "no Android apps data to test currently".

**Test Cases to Include** (if data exists):
- Data array is well-formed
- All required fields present
- Android package names are valid format
- Version numbers are valid
- Image paths are correct
- No duplicate entries

**Verification Checklist**:
- [ ] Test file exists (even if minimal)
- [ ] If data exists, all fields are validated
- [ ] Tests pass
- [ ] Coverage includes androidApps.ts

**Testing Instructions**:
- Run `pnpm test androidApps`
- Verify appropriate tests pass based on data presence

**Commit Message Template**:
```
test(data): validate android apps data integrity

- Test android apps data structure
- Validate required fields
- Check data consistency
- [or: Note no Android apps data currently present]
```

**Estimated tokens**: ~3,500

---

### Task 4: Test Web Projects Data

**Goal**: Validate web projects data (if webProjects.ts exists and differs from projects.ts).

**Files to Modify/Create**:
- `src/lib/data/webProjects.test.ts` - Web projects data tests

**Prerequisites**:
- Task 3 completed
- Determine if webProjects.ts exists and is distinct from projects.ts

**Implementation Steps**:
1. Check if src/lib/data/webProjects.ts exists
2. Determine if it's different from projects.ts
3. If duplicate, note this in comments and create minimal test
4. If unique, write full validation tests
5. Validate web-specific fields if any

**Note**: Your codebase may use projects.ts for all projects. If webProjects.ts doesn't exist or is redundant, document this and create a note in the test file.

**Verification Checklist**:
- [ ] Test file created
- [ ] Data structure validated if exists
- [ ] Documentation added if data doesn't exist
- [ ] Tests pass
- [ ] No redundant test code

**Testing Instructions**:
- Run `pnpm test webProjects`
- Verify tests match data structure reality

**Commit Message Template**:
```
test(data): validate web projects data

- Test web projects data structure
- Validate required fields
- [or: Note web projects consolidated in projects.ts]
```

**Estimated tokens**: ~3,000

---

### Task 5: Test Navigation Data

**Goal**: Validate navigation data structure and consistency.

**Files to Modify/Create**:
- `src/lib/data/navigation.test.ts` - Navigation data tests

**Prerequisites**:
- Task 4 completed
- Review src/lib/data/navigation.ts structure

**Implementation Steps**:
1. Import navigation data from navigation.ts
2. Validate navigation items array structure
3. Test that all navigation items have required fields
4. Validate routes/paths are well-formed
5. Check for duplicate paths
6. Ensure labels are non-empty
7. Test navigation hierarchy if nested

**Test Cases to Include**:
- Navigation array is not empty
- Each item has label and path
- Paths start with '/' or are valid routes
- No duplicate paths
- Labels are user-friendly strings
- Icon references are valid if present

**Verification Checklist**:
- [ ] Test file exists for navigation.ts
- [ ] All navigation items validated
- [ ] Path formats checked
- [ ] No duplicates detected
- [ ] Tests pass
- [ ] Coverage includes navigation.ts

**Testing Instructions**:
- Run `pnpm test navigation`
- Verify all navigation items are valid
- Check coverage report

**Commit Message Template**:
```
test(data): validate navigation data

- Test navigation items structure
- Validate paths are well-formed
- Check for duplicate routes
- Ensure labels are present
- Validate navigation consistency
```

**Estimated tokens**: ~3,500

---

### Task 6: Test Images Data

**Goal**: Validate image imports and image data structure (if images.ts exists).

**Files to Modify/Create**:
- `src/lib/data/images.test.ts` - Image data tests

**Prerequisites**:
- Task 5 completed
- Check if src/lib/data/images.ts exists

**Implementation Steps**:
1. Determine if images.ts centralizes image imports
2. If it exists, validate all imports are defined
3. Test that image objects are non-null
4. Validate image data structure if it includes metadata
5. If images are imported directly in projects.ts instead, note this

**Note**: Image handling varies by project structure. Adapt tests to match your actual implementation.

**Test Cases to Include** (if centralized images.ts exists):
- All image imports are defined
- No null or undefined images
- Image metadata is valid if present
- Paths are consistent

**Verification Checklist**:
- [ ] Test file created
- [ ] Image handling strategy is tested
- [ ] Tests match actual implementation
- [ ] Tests pass

**Testing Instructions**:
- Run `pnpm test images`
- Verify image data validation

**Commit Message Template**:
```
test(data): validate image data structure

- Test image imports are defined
- Validate image metadata if present
- [or: Note images imported directly in components]
```

**Estimated tokens**: ~2,500

---

### Task 7: Cross-Data Validation Tests

**Goal**: Create tests that validate relationships and consistency across different data files.

**Files to Modify/Create**:
- `src/lib/data/data-integrity.test.ts` - Cross-data validation tests

**Prerequisites**:
- All previous tasks in this phase completed
- Understanding of relationships between data structures

**Implementation Steps**:
1. Create a new test file for cross-data validation
2. Import all data structures (projects, navigation, etc.)
3. Test relationships between data
4. Validate consistency (e.g., project categories match navigation items)
5. Check for orphaned references
6. Ensure data totals make sense

**Test Cases to Include**:
- Project categories align with available filters/navigation
- All navigation paths correspond to actual routes
- Image references in projects exist in image data
- No orphaned data (references to non-existent items)
- Data counts are reasonable and expected

**Example Test Pattern**:
```typescript
test('all project categories are valid', () => {
  const validCategories = ['Web', 'Cross-Platform', 'Mobile'];
  projects.forEach(project => {
    expect(validCategories).toContain(project.category);
  });
});

test('navigation paths match available routes', () => {
  const expectedPaths = ['/', '/web', '/android', '/about', '/read'];
  navigation.forEach(item => {
    expect(expectedPaths).toContain(item.path);
  });
});
```

**Verification Checklist**:
- [ ] Cross-data validation test file created
- [ ] Tests validate relationships between data structures
- [ ] Tests check consistency across files
- [ ] No orphaned references detected
- [ ] All tests pass

**Testing Instructions**:
- Run `pnpm test data-integrity`
- Verify all cross-data validations pass
- Check that relationships are correctly validated

**Commit Message Template**:
```
test(data): add cross-data validation tests

- Validate project categories are consistent
- Check navigation paths match routes
- Ensure image references are valid
- Detect orphaned data references
- Verify data relationships
```

**Estimated tokens**: ~4,000

---

## Phase Verification

Before moving to Phase 3, verify:

### Test Coverage
- [ ] All data files have corresponding test files
- [ ] Type definitions are tested
- [ ] Data integrity tests pass
- [ ] Cross-data validation tests pass
- [ ] Coverage report shows all data files covered

### Data Validation
- [ ] Projects data is fully validated
- [ ] Navigation data is validated
- [ ] All data types match TypeScript interfaces
- [ ] No duplicate IDs or keys detected
- [ ] All URLs and paths are well-formed

### File Structure
```
src/lib/
  data/
    projects.ts
    projects.test.ts
    androidApps.ts
    androidApps.test.ts (if applicable)
    webProjects.ts
    webProjects.test.ts (if applicable)
    navigation.ts
    navigation.test.ts
    images.ts
    images.test.ts (if applicable)
    data-integrity.test.ts
  types/
    index.ts
    index.test.ts
```

### Test Execution
- [ ] `pnpm test` runs all data tests successfully
- [ ] `pnpm test:coverage` shows data layer coverage >80%
- [ ] No TypeScript errors in test files
- [ ] All tests are meaningful and catch real issues

### Git Validation
- [ ] All tasks committed separately with conventional commits
- [ ] Commit author is HatmanStack
- [ ] Working on correct branch
- [ ] Commit messages are descriptive and follow format

## Known Limitations

- Tests validate structure but not business logic (that comes later)
- Image file existence is not validated (would require filesystem access)
- External URL availability is not tested (would require network calls)

## Next Phase

Once Phase 2 is complete and verified, proceed to **[Phase 3: Stores & Hooks Testing](./Phase-3.md)** to test state management and custom hooks.
