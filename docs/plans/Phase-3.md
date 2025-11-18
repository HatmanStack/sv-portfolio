# Phase 3: Stores & Hooks Testing

## Phase Goal

Test all Svelte stores and custom hooks to ensure state management works correctly, persistence functions properly, and side effects are handled. This phase covers the reactive state layer of the application including the app store and sound hooks.

**Success criteria**:
- App store state management is fully tested
- localStorage persistence is validated with proper mocking
- Sound hooks are tested with Audio API mocks
- Side effects (DOM manipulation, event listeners) are verified
- All store methods and hook functions have test coverage

**Estimated tokens**: ~28,000

## Prerequisites

- Phase 0, 1, and 2 completed and verified
- Understanding of Svelte 5 runes ($state, $derived, $effect)
- Familiarity with src/lib/stores/app.svelte.ts structure
- Familiarity with src/lib/hooks/useSound.svelte.ts structure
- Test infrastructure working properly

## Tasks

### Task 1: Set Up Store Testing Utilities

**Goal**: Create helper utilities specifically for testing Svelte stores with runes.

**Files to Modify/Create**:
- `src/lib/test-utils/store-helpers.ts` - Store testing utilities

**Prerequisites**:
- Phase 1 completed (test-utils directory exists)
- Understanding of how Svelte 5 stores work with runes

**Implementation Steps**:
1. Create store-helpers.ts in test-utils directory
2. Build utilities for testing reactive state
3. Create helpers for mocking localStorage
4. Create helpers for mocking browser APIs (matchMedia, etc.)
5. Export all helpers for use in store tests

**Utilities to Create**:
- `createMockLocalStorage()` - Returns a localStorage mock
- `createMockMatchMedia(matches: boolean)` - Returns matchMedia mock
- `flushPromises()` - Helper to flush pending promises in tests
- `waitForStateUpdate()` - Helper to wait for reactive updates

**Example Pattern**:
```typescript
export function createMockLocalStorage() {
  const storage = new Map<string, string>();
  return {
    getItem: vi.fn((key: string) => storage.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => storage.set(key, value)),
    removeItem: vi.fn((key: string) => storage.delete(key)),
    clear: vi.fn(() => storage.clear())
  };
}
```

**Verification Checklist**:
- [ ] store-helpers.ts created
- [ ] localStorage mock helper implemented
- [ ] matchMedia mock helper implemented
- [ ] All helpers are exported
- [ ] TypeScript has no errors

**Testing Instructions**:
- Import helpers in a test to verify no import errors
- Test localStorage mock stores and retrieves values

**Commit Message Template**:
```
test(utils): add store testing utilities

- Add createMockLocalStorage helper
- Add createMockMatchMedia helper
- Add flushPromises utility
- Add waitForStateUpdate helper
- Export all store testing utilities
```

**Estimated tokens**: ~4,000

---

### Task 2: Test App Store - Navigation State

**Goal**: Test the navigation-related state and methods in app.svelte.ts.

**Files to Modify/Create**:
- `src/lib/stores/app.svelte.test.ts` - App store tests

**Prerequisites**:
- Task 1 completed (store helpers available)
- Review src/lib/stores/app.svelte.ts navigation methods

**Implementation Steps**:
1. Create app.svelte.test.ts next to app.svelte.ts
2. Import the createAppStore function (not the singleton instance)
3. Create a fresh store instance for each test
4. Test initial navigation state
5. Test setCurrentSection method
6. Test toggleMenu method
7. Test closeMenu method
8. Verify state updates are reactive

**Test Cases to Include**:
```typescript
describe('AppStore - Navigation', () => {
  test('initializes with default navigation state', () => {
    const store = createAppStore();
    expect(store.state.navigation.currentSection).toBe('home');
    expect(store.state.navigation.isMenuOpen).toBe(false);
  });

  test('setCurrentSection updates current section', () => {
    const store = createAppStore();
    store.setCurrentSection('about');
    expect(store.state.navigation.currentSection).toBe('about');
  });

  test('toggleMenu toggles menu state', () => {
    const store = createAppStore();
    expect(store.state.navigation.isMenuOpen).toBe(false);
    store.toggleMenu();
    expect(store.state.navigation.isMenuOpen).toBe(true);
    store.toggleMenu();
    expect(store.state.navigation.isMenuOpen).toBe(false);
  });

  test('closeMenu sets menu to closed', () => {
    const store = createAppStore();
    store.state.navigation.isMenuOpen = true;
    store.closeMenu();
    expect(store.state.navigation.isMenuOpen).toBe(false);
  });
});
```

**Verification Checklist**:
- [ ] Test file created for app store
- [ ] Navigation state initialization tested
- [ ] setCurrentSection method tested
- [ ] toggleMenu method tested
- [ ] closeMenu method tested
- [ ] All tests pass

**Testing Instructions**:
- Run `pnpm test app.svelte`
- Verify all navigation tests pass
- Check coverage includes navigation methods

**Commit Message Template**:
```
test(stores): test app store navigation state

- Test initial navigation state
- Test setCurrentSection method
- Test toggleMenu functionality
- Test closeMenu functionality
- Verify state updates correctly
```

**Estimated tokens**: ~5,000

---

### Task 3: Test App Store - Preferences State

**Goal**: Test user preferences state management including sound, theme, and reduced motion.

**Files to Modify/Create**:
- `src/lib/stores/app.svelte.test.ts` - Add to existing test file

**Prerequisites**:
- Task 2 completed (navigation tests exist)
- Understanding of preferences structure

**Implementation Steps**:
1. Add new describe block for preferences in existing test file
2. Test initial preferences state
3. Test toggleSound method
4. Test setTheme method
5. Test toggleReducedMotion method
6. Verify preferences are independent of navigation state

**Test Cases to Include**:
```typescript
describe('AppStore - Preferences', () => {
  test('initializes with default preferences', () => {
    const store = createAppStore();
    expect(store.state.preferences.soundEnabled).toBe(true);
    expect(store.state.preferences.reducedMotion).toBe(false);
    expect(store.state.preferences.theme).toBe('auto');
  });

  test('toggleSound toggles sound preference', () => {
    const store = createAppStore();
    // Mock localStorage to avoid errors
    global.localStorage = createMockLocalStorage();

    store.toggleSound();
    expect(store.state.preferences.soundEnabled).toBe(false);
    store.toggleSound();
    expect(store.state.preferences.soundEnabled).toBe(true);
  });

  test('setTheme updates theme preference', () => {
    const store = createAppStore();
    global.localStorage = createMockLocalStorage();

    store.setTheme('dark');
    expect(store.state.preferences.theme).toBe('dark');
  });

  test('toggleReducedMotion toggles motion preference', () => {
    const store = createAppStore();
    global.localStorage = createMockLocalStorage();
    global.document = { documentElement: { style: { setProperty: vi.fn() } } } as any;

    store.toggleReducedMotion();
    expect(store.state.preferences.reducedMotion).toBe(true);
  });
});
```

**Verification Checklist**:
- [ ] Preferences initialization tested
- [ ] toggleSound tested
- [ ] setTheme tested
- [ ] toggleReducedMotion tested
- [ ] localStorage mocked properly
- [ ] All tests pass

**Testing Instructions**:
- Run `pnpm test app.svelte`
- Verify preferences tests pass
- Check that mocks prevent side effects

**Commit Message Template**:
```
test(stores): test app store preferences state

- Test initial preferences state
- Test toggleSound method
- Test setTheme method with all theme options
- Test toggleReducedMotion method
- Mock localStorage and document APIs
```

**Estimated tokens**: ~5,000

---

### Task 4: Test App Store - Persistence

**Goal**: Test that preferences are correctly saved to and loaded from localStorage.

**Files to Modify/Create**:
- `src/lib/stores/app.svelte.test.ts` - Add persistence tests

**Prerequisites**:
- Task 3 completed (preferences tests exist)
- localStorage mock helpers available

**Implementation Steps**:
1. Add describe block for persistence tests
2. Mock localStorage before each test
3. Test savePreferences method
4. Test loadPreferences method
5. Test that preference changes trigger saves
6. Test loading with existing saved preferences
7. Test loading with corrupted data (error handling)

**Test Cases to Include**:
```typescript
describe('AppStore - Persistence', () => {
  let mockLocalStorage;

  beforeEach(() => {
    mockLocalStorage = createMockLocalStorage();
    global.localStorage = mockLocalStorage;
  });

  test('savePreferences writes to localStorage', () => {
    const store = createAppStore();
    store.savePreferences();

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'portfolio-preferences',
      expect.any(String)
    );
  });

  test('loadPreferences reads from localStorage', () => {
    const savedPrefs = { soundEnabled: false, theme: 'dark', reducedMotion: true };
    mockLocalStorage.setItem('portfolio-preferences', JSON.stringify(savedPrefs));

    const store = createAppStore();
    global.document = { documentElement: { setAttribute: vi.fn(), style: { setProperty: vi.fn() } } } as any;
    store.loadPreferences();

    expect(store.state.preferences.soundEnabled).toBe(false);
    expect(store.state.preferences.theme).toBe('dark');
  });

  test('loadPreferences handles corrupted data gracefully', () => {
    mockLocalStorage.setItem('portfolio-preferences', 'invalid json');
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const store = createAppStore();
    store.loadPreferences();

    // Should use default preferences
    expect(store.state.preferences.soundEnabled).toBe(true);
    expect(consoleSpy).toHaveBeenCalled();
  });

  test('preference changes trigger save', () => {
    const store = createAppStore();
    store.toggleSound();

    expect(mockLocalStorage.setItem).toHaveBeenCalled();
  });
});
```

**Verification Checklist**:
- [ ] savePreferences tested
- [ ] loadPreferences tested
- [ ] Error handling tested
- [ ] Auto-save on preference changes tested
- [ ] localStorage mock captures all calls
- [ ] All tests pass

**Testing Instructions**:
- Run `pnpm test app.svelte`
- Verify localStorage interactions are correct
- Check error handling works

**Commit Message Template**:
```
test(stores): test app store persistence

- Test savePreferences writes to localStorage
- Test loadPreferences reads correctly
- Test error handling for corrupted data
- Test auto-save on preference changes
- Verify localStorage integration
```

**Estimated tokens**: ~5,000

---

### Task 5: Test App Store - Side Effects

**Goal**: Test DOM manipulation side effects like theme application and reduced motion CSS variables.

**Files to Modify/Create**:
- `src/lib/stores/app.svelte.test.ts` - Add side effects tests

**Prerequisites**:
- Task 4 completed (persistence tests exist)
- Understanding of applyTheme and applyReducedMotion methods

**Implementation Steps**:
1. Add describe block for side effects
2. Mock document.documentElement
3. Mock window.matchMedia for theme detection
4. Test applyTheme method for all theme values
5. Test applyReducedMotion method
6. Test init method and its side effects
7. Verify event listeners are attached properly

**Test Cases to Include**:
```typescript
describe('AppStore - Side Effects', () => {
  let mockDocumentElement;
  let mockMatchMedia;

  beforeEach(() => {
    mockDocumentElement = {
      setAttribute: vi.fn(),
      style: { setProperty: vi.fn() }
    };
    global.document = { documentElement: mockDocumentElement } as any;

    mockMatchMedia = vi.fn();
    global.window = { matchMedia: mockMatchMedia } as any;
  });

  test('applyTheme sets light theme', () => {
    mockMatchMedia.mockReturnValue({ matches: false, addEventListener: vi.fn() });
    const store = createAppStore();
    store.setTheme('light');
    store.applyTheme();

    expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
  });

  test('applyTheme sets dark theme', () => {
    const store = createAppStore();
    store.setTheme('dark');
    store.applyTheme();

    expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
  });

  test('applyTheme respects system preference for auto', () => {
    mockMatchMedia.mockReturnValue({ matches: true, addEventListener: vi.fn() }); // System prefers dark
    const store = createAppStore();
    store.setTheme('auto');
    store.applyTheme();

    expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
  });

  test('applyReducedMotion sets CSS variable', () => {
    const store = createAppStore();
    store.toggleReducedMotion(); // Set to true
    store.applyReducedMotion();

    expect(mockDocumentElement.style.setProperty).toHaveBeenCalledWith(
      '--motion-preference',
      'reduce'
    );
  });

  test('init sets up theme listener', () => {
    const mockListener = { addEventListener: vi.fn() };
    mockMatchMedia.mockReturnValue(mockListener);
    global.localStorage = createMockLocalStorage();

    const store = createAppStore();
    store.init();

    expect(mockListener.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
```

**Verification Checklist**:
- [ ] applyTheme tested for all theme values
- [ ] applyReducedMotion tested
- [ ] init method tested
- [ ] Event listeners verified
- [ ] document and window properly mocked
- [ ] All tests pass

**Testing Instructions**:
- Run `pnpm test app.svelte`
- Verify side effects are correctly tested
- Check mocks prevent actual DOM manipulation

**Commit Message Template**:
```
test(stores): test app store side effects

- Test applyTheme for light/dark/auto
- Test system theme preference detection
- Test applyReducedMotion CSS updates
- Test init method setup
- Verify event listener registration
```

**Estimated tokens**: ~5,000

---

### Task 6: Test Sound Hook - createSoundStore

**Goal**: Test the createSoundStore function from useSound.svelte.ts.

**Files to Modify/Create**:
- `src/lib/hooks/useSound.svelte.test.ts` - Sound hook tests

**Prerequisites**:
- Task 5 completed (app store fully tested)
- Understanding of useSound.svelte.ts structure

**Implementation Steps**:
1. Create useSound.svelte.test.ts
2. Mock the Audio API constructor
3. Mock audio element methods (play, pause, etc.)
4. Test createSoundStore initialization
5. Test audio loading events
6. Test play, pause, stop methods
7. Test setVolume method
8. Test error handling

**Audio API Mocking Pattern**:
```typescript
function createMockAudio() {
  const mockAudio = {
    play: vi.fn().mockResolvedValue(undefined),
    pause: vi.fn(),
    load: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    volume: 1,
    loop: false,
    preload: '',
    currentTime: 0
  };
  return mockAudio;
}

beforeEach(() => {
  global.Audio = vi.fn(() => createMockAudio()) as any;
  global.window = {} as any;
});
```

**Test Cases to Include**:
```typescript
describe('createSoundStore', () => {
  test('initializes with audio element', () => {
    const soundStore = createSoundStore('/sound.mp3');
    expect(soundStore.audio).toBeDefined();
    expect(global.Audio).toHaveBeenCalledWith('/sound.mp3');
  });

  test('sets volume from options', () => {
    const soundStore = createSoundStore('/sound.mp3', { volume: 0.5 });
    expect(soundStore.audio.volume).toBe(0.5);
  });

  test('play method calls audio.play', async () => {
    const soundStore = createSoundStore('/sound.mp3');
    // Simulate loaded state
    soundStore.audio.addEventListener.mock.calls[0][1](); // trigger canplaythrough

    await soundStore.play();
    expect(soundStore.audio.play).toHaveBeenCalled();
  });

  test('pause method calls audio.pause', () => {
    const soundStore = createSoundStore('/sound.mp3');
    soundStore.pause();
    expect(soundStore.audio.pause).toHaveBeenCalled();
  });

  test('stop method pauses and resets time', () => {
    const soundStore = createSoundStore('/sound.mp3');
    soundStore.stop();
    expect(soundStore.audio.pause).toHaveBeenCalled();
    expect(soundStore.audio.currentTime).toBe(0);
  });

  test('setVolume clamps value between 0 and 1', () => {
    const soundStore = createSoundStore('/sound.mp3');
    soundStore.setVolume(1.5);
    expect(soundStore.audio.volume).toBe(1);
    soundStore.setVolume(-0.5);
    expect(soundStore.audio.volume).toBe(0);
  });
});
```

**Verification Checklist**:
- [ ] createSoundStore initialization tested
- [ ] All methods tested (play, pause, stop, setVolume)
- [ ] Options handling tested
- [ ] Audio API properly mocked
- [ ] All tests pass

**Testing Instructions**:
- Run `pnpm test useSound`
- Verify Audio mock is working
- Check all sound methods are tested

**Commit Message Template**:
```
test(hooks): test createSoundStore

- Test sound store initialization
- Test play/pause/stop methods
- Test setVolume with clamping
- Test options handling
- Mock Audio API
```

**Estimated tokens**: ~5,000

---

### Task 7: Test Sound Hook - useSoundAction

**Goal**: Test the useSoundAction Svelte action from useSound.svelte.ts.

**Files to Modify/Create**:
- `src/lib/hooks/useSound.svelte.test.ts` - Add action tests

**Prerequisites**:
- Task 6 completed (createSoundStore tested)

**Implementation Steps**:
1. Add describe block for useSoundAction
2. Create mock HTMLElement
3. Test that action attaches click listener
4. Test that click triggers sound playback
5. Test that destroy removes event listener
6. Verify action lifecycle

**Test Cases to Include**:
```typescript
describe('useSoundAction', () => {
  test('attaches click listener to element', () => {
    const mockElement = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    };

    const action = useSoundAction('/sound.mp3');
    action(mockElement as any);

    expect(mockElement.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
  });

  test('click triggers sound playback', () => {
    const mockElement = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    };
    const mockEvent = { preventDefault: vi.fn() };

    const action = useSoundAction('/sound.mp3');
    action(mockElement as any);

    // Get the click handler and call it
    const clickHandler = mockElement.addEventListener.mock.calls[0][1];
    clickHandler(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  test('destroy removes event listener', () => {
    const mockElement = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    };

    const action = useSoundAction('/sound.mp3');
    const result = action(mockElement as any);
    result.destroy();

    expect(mockElement.removeEventListener).toHaveBeenCalledWith('click', expect.any(Function));
  });
});
```

**Verification Checklist**:
- [ ] useSoundAction lifecycle tested
- [ ] Event listener attachment tested
- [ ] Click handler tested
- [ ] Cleanup tested
- [ ] All tests pass

**Testing Instructions**:
- Run `pnpm test useSound`
- Verify action tests pass
- Check event listener mocking works

**Commit Message Template**:
```
test(hooks): test useSoundAction

- Test click listener attachment
- Test sound playback on click
- Test event.preventDefault call
- Test cleanup on destroy
- Verify action lifecycle
```

**Estimated tokens**: ~4,000

---

## Phase Verification

Before moving to Phase 4, verify:

### Test Coverage
- [ ] App store has comprehensive test coverage
- [ ] All store methods tested
- [ ] All side effects tested
- [ ] Sound hooks fully tested
- [ ] Coverage >80% for stores and hooks

### Functionality Validation
- [ ] Navigation state management works
- [ ] Preferences state management works
- [ ] localStorage persistence works
- [ ] Theme application works
- [ ] Sound hooks work correctly

### Mocking Validation
- [ ] localStorage properly mocked
- [ ] document properly mocked
- [ ] window.matchMedia properly mocked
- [ ] Audio API properly mocked
- [ ] No actual browser APIs called

### File Structure
```
src/lib/
  stores/
    app.svelte.ts
    app.svelte.test.ts
  hooks/
    useSound.svelte.ts
    useSound.svelte.test.ts
  test-utils/
    store-helpers.ts
```

### Test Execution
- [ ] `pnpm test stores` passes
- [ ] `pnpm test hooks` passes
- [ ] No console errors or warnings
- [ ] Tests run quickly (<5 seconds)

### Git Validation
- [ ] All tasks committed separately
- [ ] Commit author is HatmanStack
- [ ] Conventional commit format used
- [ ] Working on correct branch

## Known Limitations

- Event listener callbacks are tested but not their actual behavior with real events
- Audio playback is mocked, not actually tested for sound output
- Timing-based behavior (debounce, throttle) not tested if present

## Next Phase

Once Phase 3 is complete and verified, proceed to **[Phase 4: Component Testing](./Phase-4.md)** to test UI components.
