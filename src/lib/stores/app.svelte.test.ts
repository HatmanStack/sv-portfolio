/**
 * App Store Tests
 *
 * Comprehensive tests for the app store covering navigation, preferences,
 * persistence, and side effects.
 */

import { describe, test, expect, beforeEach, vi } from 'vitest';
import { createMockLocalStorage, createMockMatchMedia } from '$lib/test-utils/store-helpers';
import { createAppStore } from '$lib/stores/app.svelte';

describe('AppStore', () => {
	let store: ReturnType<typeof createAppStore>;
	let mockLocalStorage: ReturnType<typeof createMockLocalStorage>;
	let mockMatchMedia: ReturnType<typeof createMockMatchMedia>;
	let mockDocumentElement: any;

	beforeEach(() => {
		// Create fresh store instance
		store = createAppStore();

		// Mock localStorage
		mockLocalStorage = createMockLocalStorage();
		(globalThis as any).localStorage = mockLocalStorage as any;

		// Mock matchMedia
		mockMatchMedia = createMockMatchMedia(false);
		(globalThis as any).window = { matchMedia: mockMatchMedia } as any;

		// Mock document
		mockDocumentElement = {
			setAttribute: vi.fn(),
			style: { setProperty: vi.fn() }
		};
		(globalThis as any).document = { documentElement: mockDocumentElement } as any;
	});

	describe('Navigation State', () => {
		test('initializes with default navigation state', () => {
			expect(store.state.navigation.currentSection).toBe('home');
			expect(store.state.navigation.isMenuOpen).toBe(false);
		});

		test('setCurrentSection updates current section', () => {
			store.setCurrentSection('about');
			expect(store.state.navigation.currentSection).toBe('about');
		});

		test('toggleMenu toggles menu state', () => {
			expect(store.state.navigation.isMenuOpen).toBe(false);
			store.toggleMenu();
			expect(store.state.navigation.isMenuOpen).toBe(true);
			store.toggleMenu();
			expect(store.state.navigation.isMenuOpen).toBe(false);
		});

		test('closeMenu sets menu to closed', () => {
			store.state.navigation.isMenuOpen = true;
			store.closeMenu();
			expect(store.state.navigation.isMenuOpen).toBe(false);
		});
	});

	describe('Preferences State', () => {
		test('initializes with default preferences', () => {
			expect(store.state.preferences.soundEnabled).toBe(true);
			expect(store.state.preferences.reducedMotion).toBe(false);
			expect(store.state.preferences.theme).toBe('auto');
		});

		test('toggleSound toggles sound preference', () => {
			store.toggleSound();
			expect(store.state.preferences.soundEnabled).toBe(false);
			store.toggleSound();
			expect(store.state.preferences.soundEnabled).toBe(true);
		});

		test('setTheme updates theme preference', () => {
			store.setTheme('dark');
			expect(store.state.preferences.theme).toBe('dark');
		});

		test('toggleReducedMotion toggles motion preference', () => {
			store.toggleReducedMotion();
			expect(store.state.preferences.reducedMotion).toBe(true);
		});
	});

	describe('Loading State', () => {
		test('initializes with loading true', () => {
			expect(store.state.isLoading).toBe(true);
		});

		test('setLoading updates loading state', () => {
			store.setLoading(false);
			expect(store.state.isLoading).toBe(false);
		});
	});

	describe('Persistence', () => {
		test('savePreferences writes to localStorage', () => {
			store.savePreferences();

			expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
				'portfolio-preferences',
				expect.any(String)
			);
		});

		test('loadPreferences reads from localStorage', () => {
			const savedPrefs = { soundEnabled: false, theme: 'dark', reducedMotion: true };
			mockLocalStorage.setItem('portfolio-preferences', JSON.stringify(savedPrefs));

			store.loadPreferences();

			expect(store.state.preferences.soundEnabled).toBe(false);
			expect(store.state.preferences.theme).toBe('dark');
			expect(store.state.preferences.reducedMotion).toBe(true);
		});

		test('loadPreferences handles corrupted data gracefully', () => {
			mockLocalStorage.setItem('portfolio-preferences', 'invalid json');
			const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

			store.loadPreferences();

			// Should keep default preferences
			expect(store.state.preferences.soundEnabled).toBe(true);
			expect(consoleSpy).toHaveBeenCalled();

			consoleSpy.mockRestore();
		});

		test('preference changes trigger save', () => {
			store.toggleSound();
			expect(mockLocalStorage.setItem).toHaveBeenCalled();
		});

		test('setTheme triggers save and apply', () => {
			store.setTheme('light');
			expect(mockLocalStorage.setItem).toHaveBeenCalled();
			expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
		});
	});

	describe('Side Effects - Theme', () => {
		test('applyTheme sets light theme', () => {
			mockMatchMedia.mockReturnValue({
				matches: false,
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				media: '',
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				dispatchEvent: vi.fn()
			});

			store.setTheme('light');
			expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
		});

		test('applyTheme sets dark theme', () => {
			store.setTheme('dark');
			expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
		});

		test('applyTheme respects system preference for auto', () => {
			mockMatchMedia.mockReturnValue({
				matches: true, // System prefers dark
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				media: '',
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				dispatchEvent: vi.fn()
			});

			store.setTheme('auto');
			expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
		});
	});

	describe('Side Effects - Reduced Motion', () => {
		test('applyReducedMotion sets CSS variable when enabled', () => {
			store.toggleReducedMotion(); // Set to true
			expect(mockDocumentElement.style.setProperty).toHaveBeenCalledWith(
				'--motion-preference',
				'reduce'
			);
		});

		test('applyReducedMotion sets CSS variable when disabled', () => {
			store.state.preferences.reducedMotion = false;
			store.applyReducedMotion();
			expect(mockDocumentElement.style.setProperty).toHaveBeenCalledWith(
				'--motion-preference',
				'no-preference'
			);
		});
	});

	describe('Initialization', () => {
		test('init loads preferences and sets loading to false', () => {
			const savedPrefs = { soundEnabled: false, theme: 'dark' as const, reducedMotion: false };
			mockLocalStorage.setItem('portfolio-preferences', JSON.stringify(savedPrefs));

			store.init();

			expect(store.state.preferences.soundEnabled).toBe(false);
			expect(store.state.isLoading).toBe(false);
		});

		test('init sets up theme change listener', () => {
			const mockAddEventListener = vi.fn();
			mockMatchMedia.mockReturnValue({
				matches: false,
				addEventListener: mockAddEventListener,
				removeEventListener: vi.fn(),
				media: '',
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				dispatchEvent: vi.fn()
			});

			store.init();

			expect(mockAddEventListener).toHaveBeenCalledWith('change', expect.any(Function));
		});
	});
});
