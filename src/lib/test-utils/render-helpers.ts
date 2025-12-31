/**
 * Svelte component rendering utilities
 * Re-exports and enhances @testing-library/svelte
 */

import { render as testingLibraryRender, type RenderOptions } from '@testing-library/svelte';

/**
 * Custom render function that wraps components with common providers if needed
 * Currently just re-exports the standard render, but can be extended in the future
 */
export function render<T extends Record<string, any>>(
	component: any,
	options?: RenderOptions<T>
) {
	return testingLibraryRender(component, options);
}

// Re-export everything else from testing library
export * from '@testing-library/svelte';
