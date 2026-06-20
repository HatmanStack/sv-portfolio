import { describe, test, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import BackgroundGlow from './BackgroundGlow.svelte';

describe('BackgroundGlow - Mounting', () => {
	test('renders no element of its own (only drives <body> background vars)', () => {
		const { container } = render(BackgroundGlow);
		expect(container.querySelector('.bg-glow')).toBeNull();
	});
});

describe('BackgroundGlow - Pointer tracking', () => {
	test('registers a pointermove listener and removes it on unmount', () => {
		const addSpy = vi.spyOn(window, 'addEventListener');
		const removeSpy = vi.spyOn(window, 'removeEventListener');

		const { unmount } = render(BackgroundGlow);
		expect(addSpy).toHaveBeenCalledWith('pointermove', expect.any(Function), expect.anything());

		unmount();
		expect(removeSpy).toHaveBeenCalledWith('pointermove', expect.any(Function));

		addSpy.mockRestore();
		removeSpy.mockRestore();
	});

	test('leaves its background custom properties in place on unmount', () => {
		// Deliberate: removing them on navigation triggered a stale repaint of the
		// fixed <body> background (it would vanish). Leaving them keeps it painted.
		const { unmount } = render(BackgroundGlow);
		const removeSpy = vi.spyOn(document.body.style, 'removeProperty');

		unmount();

		expect(removeSpy).not.toHaveBeenCalledWith('--bg-glow-y');
		expect(removeSpy).not.toHaveBeenCalledWith('--bg-glow-rx');
		expect(removeSpy).not.toHaveBeenCalledWith('--bg-glow-ry');

		removeSpy.mockRestore();
	});
});
