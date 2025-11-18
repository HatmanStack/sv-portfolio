import { describe, test, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import ProjectCard from './ui/ProjectCard.svelte';
import ImageGrid from './ui/ImageGrid.svelte';
import GooeyButton from './ui/GooeyButton.svelte';
import SVGFilters from './ui/SVGFilters.svelte';
import AndroidFilters from './ui/AndroidFilters.svelte';
import { createMockProject, createMockImageGridItem } from '$lib/test-utils/mock-factories';

// Mock the sound hook for ProjectCard tests
vi.mock('$lib/hooks/useSound.svelte', () => ({
	createSoundStore: vi.fn(() => ({
		play: vi.fn(),
		pause: vi.fn(),
		stop: vi.fn(),
		setVolume: vi.fn(),
		isLoaded: true,
		error: null,
		audio: null
	}))
}));

describe('Component Integration', () => {
	describe('Multiple ProjectCards', () => {
		test('multiple ProjectCards render without conflicts', () => {
			const projects = [
				createMockProject({ id: '1', title: 'Project 1' }),
				createMockProject({ id: '2', title: 'Project 2' }),
				createMockProject({ id: '3', title: 'Project 3' })
			];

			// Render each card
			projects.forEach((project) => {
				const { getByText } = render(ProjectCard, { props: { project } });
				expect(getByText(project.title)).toBeInTheDocument();
			});
		});

		test('ProjectCards with different lazy loading settings', () => {
			const project = createMockProject();

			const { container: lazyContainer } = render(ProjectCard, {
				props: { project, lazy: true }
			});
			const { container: eagerContainer } = render(ProjectCard, {
				props: { project, lazy: false }
			});

			const lazyImages = lazyContainer.querySelectorAll('img');
			const eagerImages = eagerContainer.querySelectorAll('img');

			lazyImages.forEach((img) => {
				expect(img).toHaveAttribute('loading', 'lazy');
			});

			eagerImages.forEach((img) => {
				expect(img).toHaveAttribute('loading', 'eager');
			});
		});
	});

	describe('ProjectCard + GooeyButton Integration', () => {
		test('ProjectCard integrates correctly with GooeyButton', () => {
			const project = createMockProject({ buttonText: 'View Project' });
			const { getByRole } = render(ProjectCard, { props: { project } });

			const button = getByRole('button', { name: 'View Project' });
			expect(button).toHaveClass('gooey-button');
		});

		test('ProjectCard button is within link', () => {
			const project = createMockProject({ link: 'https://example.com' });
			const { getByRole } = render(ProjectCard, { props: { project } });

			const link = getByRole('link');
			expect(link).toHaveAttribute('href', 'https://example.com');

			const button = getByRole('button');
			expect(link).toContainElement(button);
		});
	});

	describe('ImageGrid Integration', () => {
		test('ImageGrid handles mix of special and regular items', () => {
			const images = [
				createMockImageGridItem({ id: '1' }),
				createMockImageGridItem({
					id: '2',
					special: true,
					content: 'Special'
				} as any),
				createMockImageGridItem({ id: '3' })
			];

			const { getAllByRole, getByText } = render(ImageGrid, { props: { images } });

			expect(getAllByRole('img')).toHaveLength(2);
			expect(getByText('Special')).toBeInTheDocument();
		});

		test('ImageGrid with all special items', () => {
			const images = [
				createMockImageGridItem({
					id: '1',
					special: true,
					content: 'First'
				} as any),
				createMockImageGridItem({
					id: '2',
					special: true,
					content: 'Second'
				} as any),
				createMockImageGridItem({
					id: '3',
					special: true,
					content: 'Third'
				} as any)
			];

			const { queryAllByRole, getByText } = render(ImageGrid, { props: { images } });

			// No images should be rendered
			expect(queryAllByRole('img')).toHaveLength(0);

			// All special content should be present
			expect(getByText('First')).toBeInTheDocument();
			expect(getByText('Second')).toBeInTheDocument();
			expect(getByText('Third')).toBeInTheDocument();
		});

		test('ImageGrid with custom class and animation ranges', () => {
			const images = [
				createMockImageGridItem({
					id: '1',
					animationRange: '10% 20%'
				}),
				createMockImageGridItem({
					id: '2',
					animationRange: '30% 40%'
				})
			];

			const { container } = render(ImageGrid, {
				props: { images, className: 'test-grid' }
			});

			const grid = container.querySelector('.stuck-grid');
			expect(grid).toHaveClass('test-grid');

			const gridItems = container.querySelectorAll('.grid-item');
			expect(gridItems[0]).toHaveStyle('--animation-range: 10% 20%');
			expect(gridItems[1]).toHaveStyle('--animation-range: 30% 40%');
		});
	});

	describe('SVG Filters Integration', () => {
		test('GooeyButton SVG filter is available globally', () => {
			// Render a GooeyButton which adds the goo filter to the page
			render(GooeyButton, { props: {} });

			// The filter should be in the document
			const filter = document.querySelector('#goo');
			expect(filter).toBeInTheDocument();
		});

		test('Multiple SVG filters can coexist', () => {
			render(SVGFilters);
			render(AndroidFilters);

			// Both filters should exist
			const glowFilters = document.querySelectorAll('#glow-4');
			expect(glowFilters.length).toBeGreaterThanOrEqual(1);
		});
	});

	describe('Complex Layouts', () => {
		test('Mix of multiple component types renders correctly', () => {
			// Render multiple different components
			const project = createMockProject({ title: 'Test Project' });
			const images = [createMockImageGridItem({ id: '1', alt: 'Test Image' })];

			const { getByText: getProjectText } = render(ProjectCard, { props: { project } });
			const { getByAltText } = render(ImageGrid, { props: { images } });

			expect(getProjectText('Test Project')).toBeInTheDocument();
			expect(getByAltText('Test Image')).toBeInTheDocument();
		});
	});
});
