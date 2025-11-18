import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import ImageGrid from './ImageGrid.svelte';
import { createMockImageGridItem } from '$lib/test-utils/mock-factories';

describe('ImageGrid - Rendering', () => {
	test('renders all images', () => {
		const images = [
			createMockImageGridItem({ id: '1', alt: 'Image 1' }),
			createMockImageGridItem({ id: '2', alt: 'Image 2' }),
			createMockImageGridItem({ id: '3', alt: 'Image 3' })
		];

		const { getAllByRole } = render(ImageGrid, { props: { images } });

		const imgs = getAllByRole('img');
		expect(imgs).toHaveLength(3);
	});

	test('renders special items as text', () => {
		const images = [
			createMockImageGridItem({ id: '1' }),
			createMockImageGridItem({
				id: '2',
				special: true,
				content: 'Special Content',
				src: undefined,
				alt: undefined
			} as any)
		];

		const { getByText, getAllByRole } = render(ImageGrid, { props: { images } });

		expect(getByText('Special Content')).toBeInTheDocument();
		expect(getAllByRole('img')).toHaveLength(1); // Only non-special item
	});

	test('applies custom className', () => {
		const images = [createMockImageGridItem()];
		const { container } = render(ImageGrid, {
			props: { images, className: 'custom-class' }
		});

		const grid = container.querySelector('.stuck-grid');
		expect(grid).toHaveClass('custom-class');
	});

	test('applies animation-range CSS variable', () => {
		const images = [createMockImageGridItem({ id: '1', animationRange: '10% 20%' })];

		const { container } = render(ImageGrid, { props: { images } });

		const gridItem = container.querySelector('.grid-item') as HTMLElement;
		expect(gridItem.style.getPropertyValue('--animation-range')).toBe('10% 20%');
	});

	test('images have lazy loading', () => {
		const images = [createMockImageGridItem()];
		const { getByRole } = render(ImageGrid, { props: { images } });

		const img = getByRole('img');
		expect(img).toHaveAttribute('loading', 'lazy');
	});

	test('special items have special class', () => {
		const images = [
			createMockImageGridItem({
				id: '1',
				special: true,
				content: 'Special'
			} as any)
		];

		const { container } = render(ImageGrid, { props: { images } });

		const specialItem = container.querySelector('.grid-item');
		expect(specialItem).toHaveClass('special');
	});

	test('renders with multiple special and regular items', () => {
		const images = [
			createMockImageGridItem({ id: '1', src: '/img1.jpg' }),
			createMockImageGridItem({
				id: '2',
				special: true,
				content: 'First Special'
			} as any),
			createMockImageGridItem({ id: '3', src: '/img3.jpg' }),
			createMockImageGridItem({
				id: '4',
				special: true,
				content: 'Second Special'
			} as any),
			createMockImageGridItem({ id: '5', src: '/img5.jpg' })
		];

		const { getAllByRole, getByText } = render(ImageGrid, { props: { images } });

		// Should have 3 regular images
		expect(getAllByRole('img')).toHaveLength(3);

		// Should have 2 special items
		expect(getByText('First Special')).toBeInTheDocument();
		expect(getByText('Second Special')).toBeInTheDocument();
	});

	test('renders grid structure correctly', () => {
		const images = [createMockImageGridItem()];
		const { container } = render(ImageGrid, { props: { images } });

		const scrollContainer = container.querySelector('.scroll-container');
		expect(scrollContainer).toBeInTheDocument();

		const grid = container.querySelector('.stuck-grid');
		expect(grid).toBeInTheDocument();

		const gridItem = container.querySelector('.grid-item');
		expect(gridItem).toBeInTheDocument();
	});

	test('images have correct alt text', () => {
		const images = [createMockImageGridItem({ id: '1', alt: 'Test Alt Text' })];

		const { getByAltText } = render(ImageGrid, { props: { images } });

		expect(getByAltText('Test Alt Text')).toBeInTheDocument();
	});

	test('images have correct src', () => {
		const images = [createMockImageGridItem({ id: '1', src: '/test.jpg' })];

		const { getByRole } = render(ImageGrid, { props: { images } });

		const img = getByRole('img');
		expect(img).toHaveAttribute('src', '/test.jpg');
	});

	test('special content is wrapped in bold tags', () => {
		const images = [
			createMockImageGridItem({
				id: '1',
				special: true,
				content: 'Bold Content'
			} as any)
		];

		const { container } = render(ImageGrid, { props: { images } });

		const bold = container.querySelector('b');
		expect(bold).toBeInTheDocument();
		expect(bold).toHaveTextContent('Bold Content');
	});

	test('handles empty images array', () => {
		const { container } = render(ImageGrid, { props: { images: [] } });

		const grid = container.querySelector('.stuck-grid');
		expect(grid).toBeInTheDocument();

		// Should have no grid items
		const gridItems = container.querySelectorAll('.grid-item');
		expect(gridItems).toHaveLength(0);
	});
});
