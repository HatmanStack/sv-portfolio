import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import AndroidFilters from './AndroidFilters.svelte';

describe('AndroidFilters', () => {
	test('renders SVG element', () => {
		const { container } = render(AndroidFilters);

		const svg = container.querySelector('svg');
		expect(svg).toBeInTheDocument();
	});

	test('has filters class', () => {
		const { container } = render(AndroidFilters);

		const svg = container.querySelector('svg');
		expect(svg).toHaveClass('filters');
	});

	test('SVG is aria-hidden', () => {
		const { container } = render(AndroidFilters);

		const svg = container.querySelector('svg');
		expect(svg).toHaveAttribute('aria-hidden', 'true');
	});

	test('renders filter definitions', () => {
		const { container } = render(AndroidFilters);

		const defs = container.querySelector('defs');
		expect(defs).toBeInTheDocument();
	});

	test('filter has glow-4 ID', () => {
		const { container } = render(AndroidFilters);

		const filter = container.querySelector('filter#glow-4');
		expect(filter).toBeInTheDocument();
	});

	test('filter contains feGaussianBlur elements', () => {
		const { container } = render(AndroidFilters);

		const blurs = container.querySelectorAll('feGaussianBlur');
		expect(blurs.length).toBeGreaterThan(0);
		// Should have 4 blur elements
		expect(blurs).toHaveLength(4);
	});

	test('filter contains feColorMatrix elements', () => {
		const { container } = render(AndroidFilters);

		const colorMatrices = container.querySelectorAll('feColorMatrix');
		expect(colorMatrices.length).toBeGreaterThan(0);
	});

	test('filter contains feOffset elements', () => {
		const { container } = render(AndroidFilters);

		const offsets = container.querySelectorAll('feOffset');
		expect(offsets.length).toBeGreaterThan(0);
	});

	test('filter contains feMerge element', () => {
		const { container } = render(AndroidFilters);

		const merge = container.querySelector('feMerge');
		expect(merge).toBeInTheDocument();
	});

	test('SVG is positioned absolutely', () => {
		const { container } = render(AndroidFilters);

		const svg = container.querySelector('svg') as unknown as Element;
		const styles = window.getComputedStyle(svg);

		expect(styles.position).toBe('absolute');
	});
});
