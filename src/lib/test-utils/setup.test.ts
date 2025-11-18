/**
 * Test Infrastructure Validation
 *
 * This test file validates that the entire testing infrastructure is working correctly.
 * It serves as a smoke test for the setup and ensures all utilities are functional.
 */

import { describe, test, expect } from 'vitest';
import { createMockProject, createMockNavigationState, createMockUserPreferences } from './mock-factories';
import { projectsFixture, navigationItemsFixture } from './fixtures';

describe('Test Infrastructure', () => {
	test('vitest runs successfully', () => {
		expect(true).toBe(true);
	});

	test('jest-dom matchers are available', () => {
		const div = document.createElement('div');
		div.textContent = 'Hello World';
		document.body.appendChild(div);

		expect(div).toBeInTheDocument();
		expect(div).toHaveTextContent('Hello World');

		document.body.removeChild(div);
	});

	describe('Mock Factories', () => {
		test('createMockProject creates valid project data', () => {
			const project = createMockProject();

			expect(project).toHaveProperty('id');
			expect(project).toHaveProperty('title');
			expect(project).toHaveProperty('description');
			expect(project).toHaveProperty('category');
			expect(project).toHaveProperty('images');
			expect(project).toHaveProperty('link');
			expect(project).toHaveProperty('buttonText');
			expect(project.title).toBe('Test Project');
		});

		test('createMockProject supports partial overrides', () => {
			const project = createMockProject({ title: 'Custom Title', category: 'Mobile' });

			expect(project.title).toBe('Custom Title');
			expect(project.category).toBe('Mobile');
			// Other properties should still have defaults
			expect(project.id).toBe('test-project');
		});

		test('createMockNavigationState creates valid navigation state', () => {
			const navState = createMockNavigationState();

			expect(navState).toHaveProperty('currentSection');
			expect(navState).toHaveProperty('isMenuOpen');
			expect(navState.currentSection).toBe('home');
			expect(navState.isMenuOpen).toBe(false);
		});

		test('createMockUserPreferences creates valid preferences', () => {
			const prefs = createMockUserPreferences();

			expect(prefs).toHaveProperty('soundEnabled');
			expect(prefs).toHaveProperty('reducedMotion');
			expect(prefs).toHaveProperty('theme');
			expect(prefs.soundEnabled).toBe(true);
			expect(prefs.theme).toBe('auto');
		});
	});

	describe('Fixtures', () => {
		test('projectsFixture is an array of projects', () => {
			expect(Array.isArray(projectsFixture)).toBe(true);
			expect(projectsFixture.length).toBeGreaterThan(0);

			const firstProject = projectsFixture[0];
			expect(firstProject).toHaveProperty('id');
			expect(firstProject).toHaveProperty('title');
		});

		test('navigationItemsFixture is an array of navigation items', () => {
			expect(Array.isArray(navigationItemsFixture)).toBe(true);
			expect(navigationItemsFixture.length).toBeGreaterThan(0);

			const firstItem = navigationItemsFixture[0];
			expect(firstItem).toHaveProperty('id');
			expect(firstItem).toHaveProperty('name');
			expect(firstItem).toHaveProperty('href');
			expect(firstItem).toHaveProperty('icon');
		});
	});

	describe('Global Setup', () => {
		test('window.matchMedia is mocked', () => {
			expect(window.matchMedia).toBeDefined();

			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			expect(mediaQuery).toHaveProperty('matches');
			expect(mediaQuery).toHaveProperty('media');
		});

		test('IntersectionObserver is mocked', () => {
			expect(IntersectionObserver).toBeDefined();

			const observer = new IntersectionObserver(() => {});
			expect(observer).toHaveProperty('observe');
			expect(observer).toHaveProperty('disconnect');
		});

		test('ResizeObserver is mocked', () => {
			expect(ResizeObserver).toBeDefined();

			const observer = new ResizeObserver(() => {});
			expect(observer).toHaveProperty('observe');
			expect(observer).toHaveProperty('disconnect');
		});
	});
});
