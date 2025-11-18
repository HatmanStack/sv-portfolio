import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/svelte';
import { fireEvent } from '@testing-library/svelte';
import ProjectCard from './ProjectCard.svelte';
import { createMockProject } from '$lib/test-utils/mock-factories';

// Mock the sound hook to avoid Audio API issues
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

describe('ProjectCard - Rendering', () => {
	test('renders project title', () => {
		const project = createMockProject({ title: 'Test Project' });
		const { getByText } = render(ProjectCard, { props: { project } });

		expect(getByText('Test Project')).toBeInTheDocument();
	});

	test('renders project category', () => {
		const project = createMockProject({ category: 'Web' });
		const { getByText } = render(ProjectCard, { props: { project } });

		expect(getByText('Web')).toBeInTheDocument();
	});

	test('renders project description', () => {
		const project = createMockProject({ description: 'Test description' });
		const { getByText } = render(ProjectCard, { props: { project } });

		expect(getByText('Test description')).toBeInTheDocument();
	});

	test('renders profession and profile images', () => {
		const project = createMockProject({
			images: { profession: '/prof.jpg', profile: '/profile.jpg' }
		});
		const { container } = render(ProjectCard, { props: { project } });

		const images = container.querySelectorAll('img');
		expect(images).toHaveLength(2);
		expect(images[0]).toHaveAttribute('src', '/prof.jpg');
		expect(images[1]).toHaveAttribute('src', '/profile.jpg');
	});

	test('images have lazy loading by default', () => {
		const project = createMockProject();
		const { container } = render(ProjectCard, { props: { project } });

		const images = container.querySelectorAll('img');
		images.forEach((img) => {
			expect(img).toHaveAttribute('loading', 'lazy');
		});
	});

	test('images load eagerly when lazy=false', () => {
		const project = createMockProject();
		const { container } = render(ProjectCard, { props: { project, lazy: false } });

		const images = container.querySelectorAll('img');
		images.forEach((img) => {
			expect(img).toHaveAttribute('loading', 'eager');
		});
	});

	test('renders link with correct href', () => {
		const project = createMockProject({ link: 'https://example.com' });
		const { getByRole } = render(ProjectCard, { props: { project } });

		const link = getByRole('link');
		expect(link).toHaveAttribute('href', 'https://example.com');
	});

	test('renders button with correct text', () => {
		const project = createMockProject({ buttonText: 'Click Me' });
		const { getByRole } = render(ProjectCard, { props: { project } });

		const button = getByRole('button', { name: 'Click Me' });
		expect(button).toBeInTheDocument();
	});

	test('images have alt text with project title', () => {
		const project = createMockProject({ title: 'My Project' });
		const { getByAltText } = render(ProjectCard, { props: { project } });

		expect(getByAltText('My Project profession')).toBeInTheDocument();
		expect(getByAltText('My Project profile')).toBeInTheDocument();
	});

	test('images have decoding async attribute', () => {
		const project = createMockProject();
		const { container } = render(ProjectCard, { props: { project } });

		const images = container.querySelectorAll('img');
		images.forEach((img) => {
			expect(img).toHaveAttribute('decoding', 'async');
		});
	});
});

describe('ProjectCard - Interactions', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('clicking button plays sound', async () => {
		const { createSoundStore } = await import('$lib/hooks/useSound.svelte');
		const mockPlay = vi.fn();
		vi.mocked(createSoundStore).mockReturnValue({
			play: mockPlay,
			pause: vi.fn(),
			stop: vi.fn(),
			setVolume: vi.fn(),
			isLoaded: true,
			error: null,
			audio: null
		});

		const project = createMockProject();
		const { getByRole } = render(ProjectCard, { props: { project } });

		const button = getByRole('button');
		await fireEvent.click(button);

		expect(mockPlay).toHaveBeenCalled();
	});

	test('integrates with GooeyButton component', () => {
		const project = createMockProject();
		const { getByRole } = render(ProjectCard, { props: { project } });

		const button = getByRole('button');
		expect(button).toHaveClass('gooey-button');
	});
});
