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

	test('resets its background custom properties to the resting baseline on unmount', () => {
		// On unmount we reset the vars to baseline (rest), not removeProperty, so the
		// glow doesn't stay "stuck" focused on routes without a BackgroundGlow (e.g.
		// /read/post). removeProperty is avoided: it triggered a stale repaint of the
		// fixed <body> background (it would vanish).
		const { unmount } = render(BackgroundGlow);
		const removeSpy = vi.spyOn(document.body.style, 'removeProperty');
		const setSpy = vi.spyOn(document.body.style, 'setProperty');

		unmount();

		expect(removeSpy).not.toHaveBeenCalledWith('--bg-glow-y');
		expect(removeSpy).not.toHaveBeenCalledWith('--bg-glow-rx');
		expect(removeSpy).not.toHaveBeenCalledWith('--bg-glow-ry');

		expect(setSpy).toHaveBeenCalledWith('--bg-glow-rx', '65%');
		expect(setSpy).toHaveBeenCalledWith('--bg-glow-ry', '65%');
		expect(setSpy).toHaveBeenCalledWith('--bg-glow-y', '50%');

		removeSpy.mockRestore();
		setSpy.mockRestore();
	});
});
