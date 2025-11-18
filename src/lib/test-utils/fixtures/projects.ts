/**
 * Project test fixtures
 * Static test data based on production project structure
 */

import type { Project } from '$lib/types';

/**
 * Fixture: Array of test projects
 * Maintains the same structure as real projects but with test data
 */
export const projectsFixture: Project[] = [
	{
		id: 'test-project-1',
		title: 'Test Project One',
		description:
			'This is a test project description for testing purposes. It contains enough text to simulate a real project description.',
		category: 'Web',
		images: {
			profession: '/test-images/project1-active.jpg',
			profile: '/test-images/project1-default.jpg'
		},
		link: 'https://test-project-1.example.com',
		buttonText: 'View Demo'
	},
	{
		id: 'test-project-2',
		title: 'Test Project Two',
		description:
			'Another test project with a cross-platform category. This simulates mobile and web applications.',
		category: 'Cross-Platform',
		images: {
			profession: '/test-images/project2-active.jpg',
			profile: '/test-images/project2-default.jpg'
		},
		link: 'https://test-project-2.example.com',
		buttonText: 'Launch App'
	},
	{
		id: 'test-project-3',
		title: 'Test Project Three',
		description: 'A third test project to ensure fixtures support multiple items in arrays.',
		category: 'Mobile',
		images: {
			profession: '/test-images/project3-active.jpg',
			profile: '/test-images/project3-default.jpg'
		},
		link: 'https://test-project-3.example.com',
		buttonText: 'Explore'
	}
];
