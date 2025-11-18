/**
 * Projects Data Validation Tests
 *
 * Validates that project data is well-formed and matches the Project type.
 * Ensures data integrity and consistency across all projects.
 */

import { describe, test, expect } from 'vitest';
import { projects } from './projects';
import type { Project } from '$lib/types';

describe('Projects Data', () => {
	describe('Data Structure', () => {
		test('projects array is not empty', () => {
			expect(Array.isArray(projects)).toBe(true);
			expect(projects.length).toBeGreaterThan(0);
		});

		test('all projects have required fields', () => {
			projects.forEach((project) => {
				expect(project).toHaveProperty('id');
				expect(project).toHaveProperty('title');
				expect(project).toHaveProperty('description');
				expect(project).toHaveProperty('category');
				expect(project).toHaveProperty('images');
				expect(project).toHaveProperty('link');
				expect(project).toHaveProperty('buttonText');
			});
		});

		test('all projects have valid image objects', () => {
			projects.forEach((project) => {
				expect(project.images).toHaveProperty('profession');
				expect(project.images).toHaveProperty('profile');
				expect(typeof project.images.profession).toBe('string');
				expect(typeof project.images.profile).toBe('string');
				expect(project.images.profession.length).toBeGreaterThan(0);
				expect(project.images.profile.length).toBeGreaterThan(0);
			});
		});
	});

	describe('Data Types', () => {
		test('all IDs are non-empty strings', () => {
			projects.forEach((project) => {
				expect(typeof project.id).toBe('string');
				expect(project.id.length).toBeGreaterThan(0);
			});
		});

		test('all titles are non-empty strings', () => {
			projects.forEach((project) => {
				expect(typeof project.title).toBe('string');
				expect(project.title.length).toBeGreaterThan(0);
			});
		});

		test('all descriptions are non-empty strings', () => {
			projects.forEach((project) => {
				expect(typeof project.description).toBe('string');
				expect(project.description.length).toBeGreaterThan(0);
			});
		});

		test('all categories are non-empty strings', () => {
			projects.forEach((project) => {
				expect(typeof project.category).toBe('string');
				expect(project.category.length).toBeGreaterThan(0);
			});
		});

		test('all links are non-empty strings', () => {
			projects.forEach((project) => {
				expect(typeof project.link).toBe('string');
				expect(project.link.length).toBeGreaterThan(0);
			});
		});

		test('all button texts are non-empty strings', () => {
			projects.forEach((project) => {
				expect(typeof project.buttonText).toBe('string');
				expect(project.buttonText.length).toBeGreaterThan(0);
			});
		});
	});

	describe('Data Uniqueness', () => {
		test('all project IDs are unique', () => {
			const ids = projects.map((p) => p.id);
			const uniqueIds = new Set(ids);
			expect(ids.length).toBe(uniqueIds.size);
		});

		test('all project titles are unique', () => {
			const titles = projects.map((p) => p.title);
			const uniqueTitles = new Set(titles);
			expect(titles.length).toBe(uniqueTitles.size);
		});
	});

	describe('URL Validation', () => {
		test('all links are valid URLs', () => {
			projects.forEach((project) => {
				expect(() => new URL(project.link)).not.toThrow();
			});
		});

		test('all links use HTTPS protocol', () => {
			projects.forEach((project) => {
				const url = new URL(project.link);
				expect(url.protocol).toBe('https:');
			});
		});
	});

	describe('Category Validation', () => {
		test('all categories are from a known set', () => {
			const validCategories = ['Web', 'Cross-Platform', 'Mobile', 'Desktop'];

			projects.forEach((project) => {
				expect(validCategories).toContain(project.category);
			});
		});
	});

	describe('Individual Projects', () => {
		test('Float project exists and is valid', () => {
			const float = projects.find((p) => p.id === 'float');
			expect(float).toBeDefined();
			expect(float?.title).toBe('Float');
			expect(float?.category).toBe('Cross-Platform');
		});

		test('Nova Canvas project exists and is valid', () => {
			const novaCanvas = projects.find((p) => p.id === 'nova-canvas');
			expect(novaCanvas).toBeDefined();
			expect(novaCanvas?.title).toBe('Nova Canvas');
			expect(novaCanvas?.category).toBe('Web');
		});

		test('Savor Swipe project exists and is valid', () => {
			const savorSwipe = projects.find((p) => p.id === 'savor-swipe');
			expect(savorSwipe).toBeDefined();
			expect(savorSwipe?.title).toBe('Savor Swipe');
			expect(savorSwipe?.category).toBe('Cross-Platform');
		});
	});
});
