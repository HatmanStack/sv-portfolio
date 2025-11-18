import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import GooeyButton from './GooeyButton.svelte';

describe('GooeyButton - Rendering', () => {
	test('renders as button element', () => {
		const { getByRole } = render(GooeyButton, {
			props: {}
		});

		expect(getByRole('button')).toBeInTheDocument();
	});

	test('has gooey-button class', () => {
		const { getByRole } = render(GooeyButton, {
			props: {}
		});

		expect(getByRole('button')).toHaveClass('gooey-button');
	});

	test('has type="button" attribute', () => {
		const { getByRole } = render(GooeyButton, {
			props: {}
		});

		expect(getByRole('button')).toHaveAttribute('type', 'button');
	});
});

describe('GooeyButton - Interactions', () => {
	test('calls onclick when clicked', async () => {
		const onclick = vi.fn();
		const { getByRole } = render(GooeyButton, {
			props: {
				onclick
			}
		});

		const button = getByRole('button');
		await fireEvent.click(button);

		expect(onclick).toHaveBeenCalled();
	});

	test('updates CSS variables on pointer move', async () => {
		const { getByRole } = render(GooeyButton, {
			props: {}
		});

		const button = getByRole('button') as HTMLElement;

		// Mock getBoundingClientRect
		button.getBoundingClientRect = vi.fn(() => ({
			x: 0,
			y: 0,
			width: 100,
			height: 50,
			top: 0,
			right: 100,
			bottom: 50,
			left: 0,
			toJSON: () => ({})
		}));

		const mockEvent = new PointerEvent('pointermove', {
			clientX: 50,
			clientY: 25,
			bubbles: true
		});

		// Spy on setProperty
		const setPropertySpy = vi.spyOn(button.style, 'setProperty');

		await fireEvent(button, mockEvent);

		expect(setPropertySpy).toHaveBeenCalledWith('--x', expect.any(String));
		expect(setPropertySpy).toHaveBeenCalledWith('--y', expect.any(String));
	});

	test('clears animation on pointer over', async () => {
		const { getByRole } = render(GooeyButton, {
			props: {}
		});

		const button = getByRole('button') as HTMLElement;
		const setPropertySpy = vi.spyOn(button.style, 'setProperty');

		await fireEvent.pointerOver(button);

		// Should set --a to empty string to clear animation
		expect(setPropertySpy).toHaveBeenCalledWith('--a', '');
	});
});

describe('GooeyButton - Animation', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	test('runs intro animation on mount', () => {
		const setIntervalSpy = vi.spyOn(global, 'setInterval');

		render(GooeyButton, {
			props: {}
		});

		expect(setIntervalSpy).toHaveBeenCalled();
	});

	test('clears interval on unmount', () => {
		const clearIntervalSpy = vi.spyOn(global, 'clearInterval');

		const { unmount } = render(GooeyButton, {
			props: {}
		});

		unmount();

		expect(clearIntervalSpy).toHaveBeenCalled();
	});

	test('sets CSS variables during intro animation', () => {
		const { getByRole } = render(GooeyButton, {
			props: {}
		});

		const button = getByRole('button') as HTMLElement;
		const setPropertySpy = vi.spyOn(button.style, 'setProperty');

		// Advance timers to trigger intro animation
		vi.advanceTimersByTime(100);

		// Check that setProperty was called (animation is running)
		// The exact values depend on the animation timing, so just check it was called
		expect(setPropertySpy).toHaveBeenCalled();
		expect(setPropertySpy.mock.calls.length).toBeGreaterThan(0);
	});

	test('animation completes and clears --a', () => {
		const { getByRole } = render(GooeyButton, {
			props: {}
		});

		const button = getByRole('button') as HTMLElement;
		const setPropertySpy = vi.spyOn(button.style, 'setProperty');

		// Advance timers enough to complete animation (11.5 - 4) / 0.03 * 16ms
		vi.advanceTimersByTime(5000);

		// Should eventually set --a to empty string
		expect(setPropertySpy).toHaveBeenCalledWith('--a', '');
	});
});

describe('GooeyButton - SVG Filter', () => {
	test('renders SVG filter in head', () => {
		render(GooeyButton, {
			props: {}
		});

		// Check if filter exists in document
		const filter = document.querySelector('#goo');
		expect(filter).toBeInTheDocument();
	});

	test('filter has correct structure', () => {
		render(GooeyButton, {
			props: {}
		});

		const filter = document.querySelector('#goo');
		expect(filter).toBeInTheDocument();

		// Check for feGaussianBlur
		const blur = filter?.querySelector('feGaussianBlur');
		expect(blur).toBeInTheDocument();

		// Check for feColorMatrix
		const colorMatrix = filter?.querySelector('feColorMatrix');
		expect(colorMatrix).toBeInTheDocument();

		// Check for feComposite
		const composite = filter?.querySelector('feComposite');
		expect(composite).toBeInTheDocument();
	});
});
