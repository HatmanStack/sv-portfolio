import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import SVGFilters from './SVGFilters.svelte';

describe('SVGFilters', () => {
	test('renders SVG element', () => {
		const { container } = render(SVGFilters);

		const svg = container.querySelector('svg');
		expect(svg).toBeInTheDocument();
	});

	test('has filters class', () => {
		const { container } = render(SVGFilters);

		const svg = container.querySelector('svg');
		expect(svg).toHaveClass('filters');
	});

	test('renders filter definitions', () => {
		const { container } = render(SVGFilters);

		const defs = container.querySelector('defs');
		expect(defs).toBeInTheDocument();
	});

	test('filter has glow-4 ID', () => {
		const { container } = render(SVGFilters);

		const filter = container.querySelector('filter#glow-4');
		expect(filter).toBeInTheDocument();
	});

	test('filter contains feGaussianBlur elements', () => {
		const { container } = render(SVGFilters);

		const blurs = container.querySelectorAll('feGaussianBlur');
		expect(blurs.length).toBeGreaterThan(0);
	});

	test('filter contains feColorMatrix elements', () => {
		const { container } = render(SVGFilters);

		const colorMatrices = container.querySelectorAll('feColorMatrix');
		expect(colorMatrices.length).toBeGreaterThan(0);
	});

	test('filter contains feOffset elements', () => {
		const { container } = render(SVGFilters);

		const offsets = container.querySelectorAll('feOffset');
		expect(offsets.length).toBeGreaterThan(0);
	});

	test('filter contains feMerge element', () => {
		const { container } = render(SVGFilters);

		const merge = container.querySelector('feMerge');
		expect(merge).toBeInTheDocument();
	});

	test('SVG is positioned absolutely', () => {
		const { container } = render(SVGFilters);

		const svg = container.querySelector('svg') as HTMLElement;
		const styles = window.getComputedStyle(svg);

		expect(styles.position).toBe('absolute');
	});

	test('SVG has viewBox attribute', () => {
		const { container } = render(SVGFilters);

		const svg = container.querySelector('svg');
		expect(svg).toHaveAttribute('viewBox');
	});
});
