/**
 * Store Testing Utilities
 *
 * Helper utilities specifically for testing Svelte stores with runes.
 */

import { vi } from 'vitest';

/**
 * Creates a mock localStorage implementation for testing
 */
export function createMockLocalStorage() {
	const storage = new Map<string, string>();

	return {
		getItem: vi.fn((key: string) => storage.get(key) ?? null),
		setItem: vi.fn((key: string, value: string) => {
			storage.set(key, value);
		}),
		removeItem: vi.fn((key: string) => {
			storage.delete(key);
		}),
		clear: vi.fn(() => {
			storage.clear();
		}),
		get length() {
			return storage.size;
		},
		key: vi.fn((index: number) => {
			const keys = Array.from(storage.keys());
			return keys[index] ?? null;
		})
	};
}

/**
 * Creates a mock matchMedia implementation for testing
 */
export function createMockMatchMedia(matches: boolean = false) {
	return vi.fn().mockImplementation((query: string) => ({
		matches,
		media: query,
		onchange: null,
		addListener: vi.fn(), // Deprecated
		removeListener: vi.fn(), // Deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}));
}

/**
 * Helper to flush pending promises in tests
 */
export async function flushPromises() {
	return new Promise((resolve) => setTimeout(resolve, 0));
}

/**
 * Helper to wait for reactive state updates
 */
export async function waitForStateUpdate() {
	await flushPromises();
	await new Promise((resolve) => requestAnimationFrame(resolve));
}
