/**
 * Svelte component rendering utilities
 * Re-exports and enhances @testing-library/svelte
 */

import { render as testingLibraryRender, type RenderOptions } from '@testing-library/svelte';
import type { ComponentType, SvelteComponent } from 'svelte';

/**
 * Custom render function that wraps components with common providers if needed
 * Currently just re-exports the standard render, but can be extended in the future
 */
export function render<T extends SvelteComponent>(
	component: ComponentType<T>,
	options?: RenderOptions<T>
) {
	// @ts-expect-error - Type mismatch between Svelte 5 ComponentType and testing-library types
	return testingLibraryRender(component, options);
}

// Re-export everything else from testing library
export * from '@testing-library/svelte';
