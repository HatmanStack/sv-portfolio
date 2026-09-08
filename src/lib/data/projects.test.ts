/**
 * Projects Data Validation Tests
 *
 * Validates that project data is well-formed and matches the Project type.
 * Ensures data integrity and consistency across all projects.
 */

import { describe, test, expect } from 'vitest';
import { projects, projectsRow2, projectsRow3 } from './projects';

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
			const validCategories = ['Web', 'Cross-Platform', 'Mobile', 'Desktop', 'AWS'];
			const allProjects = [...projects, ...projectsRow2, ...projectsRow3];

			allProjects.forEach((project) => {
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

		test('Family Archive - Document AI project exists in row 2', () => {
			const htt = projectsRow2.find((p) => p.id === 'hold-that-thought');
			expect(htt).toBeDefined();
			expect(htt?.title).toBe('Family Archive - Document AI');
			expect(htt?.category).toBe('Web');
		});

		test('Vocabulary project exists in row 2', () => {
			const vocab = projectsRow2.find((p) => p.id === 'vocabulary');
			expect(vocab).toBeDefined();
			expect(vocab?.title).toBe('Vocabulary');
		});

		test('RAGStack project sits in the grid centre cell', () => {
			const ragstack = projectsRow2.find((p) => p.id === 'ragstack');
			expect(ragstack).toBeDefined();
			expect(ragstack?.title).toBe('RAGStack');
			expect(ragstack?.category).toBe('AWS');
			// Middle row, middle column — the centre of the 3x3 grid.
			expect(projectsRow2.findIndex((p) => p.id === 'ragstack')).toBe(1);
		});

		test('Savor Swipe project exists in row 3', () => {
			const savorSwipe = projectsRow3.find((p) => p.id === 'savor-swipe');
			expect(savorSwipe).toBeDefined();
			expect(savorSwipe?.title).toBe('Savor Swipe');
			expect(savorSwipe?.category).toBe('Cross-Platform');
		});

		test('Material Brief project exists in row 1', () => {
			const materialBrief = projects.find((p) => p.id === 'material-brief');
			expect(materialBrief).toBeDefined();
			expect(materialBrief?.title).toBe('Material Brief');
			expect(materialBrief?.category).toBe('Web');
			expect(materialBrief?.link).toBe('https://materialbrief.com');
			// Repo is private, so the card renders no GitHub link.
			expect(materialBrief?.github).toBeUndefined();
		});

		test('WarmDegrees project exists in row 1', () => {
			const warmDegrees = projects.find((p) => p.id === 'warmdegrees');
			expect(warmDegrees).toBeDefined();
			expect(warmDegrees?.title).toBe('WarmDegrees');
			expect(warmDegrees?.category).toBe('Web');
			expect(warmDegrees?.link).toBe('https://warmdegrees.com');
			// Repo is private, so the card renders no GitHub link.
			expect(warmDegrees?.github).toBeUndefined();
		});

		test('rows form a 3-wide grid, with Material Brief centred on the top row', () => {
			expect(projects).toHaveLength(3);
			expect(projectsRow2).toHaveLength(3);
			// Last row is the partial one; ProjectCard keeps 1/3 width and the row centres.
			expect(projectsRow3).toHaveLength(2);
			expect(projects.findIndex((p) => p.id === 'material-brief')).toBe(1);
		});

		test('no project overrides the shared card halo', () => {
			[...projects, ...projectsRow2, ...projectsRow3].forEach((project) => {
				expect(project.brandColor).toBeUndefined();
			});
		});
	});
});
