/**
 * Cross-Data Validation Tests
 *
 * Validates relationships and consistency across different data structures.
 * Ensures data integrity throughout the application.
 */

import { describe, test, expect } from 'vitest';
import { projects } from './projects';
import { androidApps } from './androidApps';
import { webProjects } from './webProjects';
import { navigationItems } from './navigation';

describe('Cross-Data Validation', () => {
	describe('Category Consistency', () => {
		test('project categories are from valid set', () => {
			const validCategories = ['Web', 'Cross-Platform', 'Mobile', 'Desktop'];

			projects.forEach((project) => {
				expect(validCategories).toContain(project.category);
			});
		});
	});

	describe('Navigation Path Coverage', () => {
		test('all primary navigation paths are defined', () => {
			const expectedPaths = ['/', '/web', '/android', '/read', '/about'];

			const actualPaths = navigationItems.map((item) => item.href);

			expectedPaths.forEach((expectedPath) => {
				expect(actualPaths).toContain(expectedPath);
			});
		});

		test('navigation paths match expected route structure', () => {
			const validPathPattern = /^\/[a-z]*$/;

			navigationItems.forEach((item) => {
				expect(item.href).toMatch(validPathPattern);
			});
		});
	});

	describe('Data Totals', () => {
		test('total projects count is reasonable', () => {
			const totalProjects = projects.length;
			expect(totalProjects).toBeGreaterThan(0);
			expect(totalProjects).toBeLessThan(50); // Sanity check
		});

		test('total android apps count is reasonable', () => {
			const totalApps = androidApps.length;
			expect(totalApps).toBeGreaterThan(0);
			expect(totalApps).toBeLessThan(50); // Sanity check
		});

		test('total web projects count is reasonable', () => {
			const totalWebProjects = webProjects.length;
			expect(totalWebProjects).toBeGreaterThan(0);
			expect(totalWebProjects).toBeLessThan(50); // Sanity check
		});

		test('total navigation items match expected count', () => {
			// Should have main navigation items: home, web, android, read, about
			expect(navigationItems.length).toBe(5);
		});
	});

	describe('ID Uniqueness Across Data Sets', () => {
		test('no ID collisions between projects and android apps', () => {
			const projectIds = new Set(projects.map((p) => p.id));
			const androidIds = new Set(androidApps.map((a) => a.id));

			androidIds.forEach((androidId) => {
				expect(projectIds.has(androidId)).toBe(false);
			});
		});

		test('no ID collisions between projects and web projects', () => {
			const projectIds = new Set(projects.map((p) => p.id));
			const webIds = new Set(webProjects.map((w) => w.id));

			webIds.forEach((webId) => {
				expect(projectIds.has(webId)).toBe(false);
			});
		});

		test('no ID collisions between android apps and web projects', () => {
			const androidIds = new Set(androidApps.map((a) => a.id));
			const webIds = new Set(webProjects.map((w) => w.id));

			webIds.forEach((webId) => {
				expect(androidIds.has(webId)).toBe(false);
			});
		});
	});

	describe('Data Quality', () => {
		test('all projects have meaningful descriptions', () => {
			projects.forEach((project) => {
				// Descriptions should be substantial (at least 50 characters)
				expect(project.description.length).toBeGreaterThan(50);
			});
		});

		test('all button texts are action-oriented', () => {
			projects.forEach((project) => {
				// Button text should not be empty and should be reasonably short
				expect(project.buttonText.length).toBeGreaterThan(0);
				expect(project.buttonText.length).toBeLessThan(20);
			});
		});

		test('all navigation items have meaningful names', () => {
			navigationItems.forEach((item) => {
				// Names should be capitalized and meaningful
				expect(item.name.length).toBeGreaterThan(0);
				expect(item.name[0]).toBe(item.name[0].toUpperCase());
			});
		});
	});

	describe('Content Completeness', () => {
		test('all main projects have complete data', () => {
			projects.forEach((project) => {
				// Verify all critical fields are populated
				expect(project.id).toBeTruthy();
				expect(project.title).toBeTruthy();
				expect(project.description).toBeTruthy();
				expect(project.category).toBeTruthy();
				expect(project.images.profession).toBeTruthy();
				expect(project.images.profile).toBeTruthy();
				expect(project.link).toBeTruthy();
				expect(project.buttonText).toBeTruthy();
			});
		});

		test('all navigation items have complete data', () => {
			navigationItems.forEach((item) => {
				expect(item.id).toBeTruthy();
				expect(item.name).toBeTruthy();
				expect(item.href).toBeTruthy();
				expect(item.icon).toBeTruthy();
			});
		});
	});
});
