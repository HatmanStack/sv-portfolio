/**
 * Web Projects Data Validation Tests
 *
 * Validates that web project data is well-formed and matches the WebProject type.
 */

import { describe, test, expect } from 'vitest';
import { webProjects } from './webProjects';

describe('Web Projects Data', () => {
	describe('Data Structure', () => {
		test('webProjects array is not empty', () => {
			expect(Array.isArray(webProjects)).toBe(true);
			expect(webProjects.length).toBeGreaterThan(0);
		});

		test('all projects have required fields', () => {
			webProjects.forEach((project) => {
				expect(project).toHaveProperty('id');
				expect(project).toHaveProperty('title');
				expect(project).toHaveProperty('initialImg');
				expect(project).toHaveProperty('activeImg');
			});
		});
	});

	describe('Data Types', () => {
		test('all IDs are non-empty strings', () => {
			webProjects.forEach((project) => {
				expect(typeof project.id).toBe('string');
				expect(project.id.length).toBeGreaterThan(0);
			});
		});

		test('all titles are non-empty strings', () => {
			webProjects.forEach((project) => {
				expect(typeof project.title).toBe('string');
				expect(project.title.length).toBeGreaterThan(0);
			});
		});
	});

	describe('Data Uniqueness', () => {
		test('all project IDs are unique', () => {
			const ids = webProjects.map((p) => p.id);
			const uniqueIds = new Set(ids);
			expect(ids.length).toBe(uniqueIds.size);
		});
	});

	describe('URL Validation', () => {
		test('all links are valid URLs when present', () => {
			webProjects.forEach((project) => {
				if (project.link) {
					expect(() => new URL(project.link)).not.toThrow();
				}
			});
		});
	});
});
