import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import LinkedIn from './LinkedIn.svelte';

describe('LinkedIn Icon', () => {
	test('renders SVG element', () => {
		const { container } = render(LinkedIn);

		const svg = container.querySelector('svg');
		expect(svg).toBeInTheDocument();
	});

	test('has viewBox attribute', () => {
		const { container } = render(LinkedIn);

		const svg = container.querySelector('svg');
		expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
	});

	test('renders path elements', () => {
		const { container } = render(LinkedIn);

		const paths = container.querySelectorAll('path');
		expect(paths.length).toBeGreaterThan(0);
		// LinkedIn icon has 4 paths
		expect(paths).toHaveLength(4);
	});

	test('has correct dimensions', () => {
		const { container } = render(LinkedIn);

		const svg = container.querySelector('svg');
		expect(svg).toHaveAttribute('width', '100%');
		expect(svg).toHaveAttribute('height', '100%');
	});

	test('has stroke-width attribute', () => {
		const { container } = render(LinkedIn);

		const svg = container.querySelector('svg');
		expect(svg).toHaveAttribute('stroke-width', '1.5');
	});

	test('has fill="none" attribute', () => {
		const { container } = render(LinkedIn);

		const svg = container.querySelector('svg');
		expect(svg).toHaveAttribute('fill', 'none');
	});

	test('paths have currentColor stroke', () => {
		const { container } = render(LinkedIn);

		const paths = container.querySelectorAll('path');
		paths.forEach((path) => {
			expect(path).toHaveAttribute('stroke', 'currentColor');
		});
	});

	test('paths have stroke-linecap="round"', () => {
		const { container } = render(LinkedIn);

		const paths = container.querySelectorAll('path');
		paths.forEach((path) => {
			expect(path).toHaveAttribute('stroke-linecap', 'round');
		});
	});

	test('paths have stroke-linejoin="round"', () => {
		const { container } = render(LinkedIn);

		const paths = container.querySelectorAll('path');
		paths.forEach((path) => {
			expect(path).toHaveAttribute('stroke-linejoin', 'round');
		});
	});
});
