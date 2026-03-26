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


describe('Cross-Data Validation', () => {
	describe('Category Consistency', () => {
		test('project categories are from valid set', () => {
			const validCategories = ['Web', 'Cross-Platform', 'Mobile', 'Desktop'];

			projects.forEach((project) => {
				expect(validCategories).toContain(project.category);
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

	});
});
