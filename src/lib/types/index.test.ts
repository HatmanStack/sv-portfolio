/**
 * Type Definition Tests
 *
 * Validates that TypeScript type definitions are correct and complete.
 * These tests ensure that all required fields exist and match expected structures.
 */

import { describe, test, expect } from 'vitest';
import type {
	Project,
	AndroidApp,
	WebProject,
	BlogPost,
	ImageGridItem,
	NavigationItem,
	NavigationState,
	UserPreferences,
	AppState,
	Theme,
	AppliedTheme
} from './index';

describe('Type Definitions', () => {
	describe('Project Type', () => {
		test('has all required fields', () => {
			const project: Project = {
				id: 'test',
				title: 'Test Project',
				description: 'A test description',
				category: 'Web',
				images: {
					profession: '/test-prof.jpg',
					profile: '/test-profile.jpg'
				},
				link: 'https://test.com',
				buttonText: 'Click'
			};

			expect(project).toHaveProperty('id');
			expect(project).toHaveProperty('title');
			expect(project).toHaveProperty('description');
			expect(project).toHaveProperty('category');
			expect(project).toHaveProperty('images');
			expect(project.images).toHaveProperty('profession');
			expect(project.images).toHaveProperty('profile');
			expect(project).toHaveProperty('link');
			expect(project).toHaveProperty('buttonText');
		});
	});

	describe('AndroidApp Type', () => {
		test('has all required fields', () => {
			const app: AndroidApp = {
				id: 'test-app',
				title: 'Test App',
				initialImg: '/initial.jpg',
				activeImg: '/active.jpg'
			};

			expect(app).toHaveProperty('id');
			expect(app).toHaveProperty('title');
			expect(app).toHaveProperty('initialImg');
			expect(app).toHaveProperty('activeImg');
		});

		test('supports optional fields', () => {
			const app: AndroidApp = {
				id: 'test-app',
				title: 'Test App',
				link: 'https://play.google.com/store/apps/test',
				description: 'Test description',
				initialImg: '/initial.jpg',
				activeImg: '/active.jpg'
			};

			expect(app.link).toBeDefined();
			expect(app.description).toBeDefined();
		});
	});

	describe('WebProject Type', () => {
		test('has all required fields', () => {
			const project: WebProject = {
				id: 'test-web',
				title: 'Test Web Project',
				initialImg: '/initial.jpg',
				activeImg: '/active.jpg'
			};

			expect(project).toHaveProperty('id');
			expect(project).toHaveProperty('title');
			expect(project).toHaveProperty('initialImg');
			expect(project).toHaveProperty('activeImg');
		});

		test('supports optional fields', () => {
			const project: WebProject = {
				id: 'test-web',
				title: 'Test Web Project',
				link: 'https://test.com',
				description: 'Test description',
				initialImg: '/initial.jpg',
				activeImg: '/active.jpg'
			};

			expect(project.link).toBeDefined();
			expect(project.description).toBeDefined();
		});
	});

	describe('BlogPost Type', () => {
		test('has all required fields', () => {
			const post: BlogPost = {
				slug: 'test-post',
				title: 'Test Post',
				date: '2025-01-01',
				description: 'Test description',
				time: '5 min read'
			};

			expect(post).toHaveProperty('slug');
			expect(post).toHaveProperty('title');
			expect(post).toHaveProperty('date');
			expect(post).toHaveProperty('description');
			expect(post).toHaveProperty('time');
		});

		test('supports optional link field', () => {
			const post: BlogPost = {
				slug: 'test-post',
				title: 'Test Post',
				date: '2025-01-01',
				description: 'Test description',
				time: '5 min read',
				link: 'https://medium.com/@test/post'
			};

			expect(post.link).toBeDefined();
		});
	});

	describe('ImageGridItem Type', () => {
		test('has all required fields', () => {
			const item: ImageGridItem = {
				id: 'test-image',
				src: '/test.jpg',
				alt: 'Test image'
			};

			expect(item).toHaveProperty('id');
			expect(item).toHaveProperty('src');
			expect(item).toHaveProperty('alt');
		});

		test('supports optional fields', () => {
			const item: ImageGridItem = {
				id: 'test-image',
				src: '/test.jpg',
				alt: 'Test image',
				animationRange: '10% 20%',
				special: true,
				content: 'Special content'
			};

			expect(item.animationRange).toBeDefined();
			expect(item.special).toBe(true);
			expect(item.content).toBeDefined();
		});
	});

	describe('NavigationItem Type', () => {
		test('has all required fields', () => {
			const navItem: NavigationItem = {
				id: 'home',
				name: 'Home',
				href: '/',
				icon: '<svg></svg>'
			};

			expect(navItem).toHaveProperty('id');
			expect(navItem).toHaveProperty('name');
			expect(navItem).toHaveProperty('href');
			expect(navItem).toHaveProperty('icon');
		});
	});

	describe('NavigationState Type', () => {
		test('has all required fields', () => {
			const state: NavigationState = {
				currentSection: 'home',
				isMenuOpen: false
			};

			expect(state).toHaveProperty('currentSection');
			expect(state).toHaveProperty('isMenuOpen');
			expect(typeof state.currentSection).toBe('string');
			expect(typeof state.isMenuOpen).toBe('boolean');
		});
	});

	describe('UserPreferences Type', () => {
		test('has all required fields', () => {
			const prefs: UserPreferences = {
				soundEnabled: true,
				reducedMotion: false,
				theme: 'auto'
			};

			expect(prefs).toHaveProperty('soundEnabled');
			expect(prefs).toHaveProperty('reducedMotion');
			expect(prefs).toHaveProperty('theme');
			expect(typeof prefs.soundEnabled).toBe('boolean');
			expect(typeof prefs.reducedMotion).toBe('boolean');
		});

		test('theme accepts valid values', () => {
			const lightPrefs: UserPreferences = {
				soundEnabled: true,
				reducedMotion: false,
				theme: 'light'
			};

			const darkPrefs: UserPreferences = {
				soundEnabled: true,
				reducedMotion: false,
				theme: 'dark'
			};

			const autoPrefs: UserPreferences = {
				soundEnabled: true,
				reducedMotion: false,
				theme: 'auto'
			};

			expect(lightPrefs.theme).toBe('light');
			expect(darkPrefs.theme).toBe('dark');
			expect(autoPrefs.theme).toBe('auto');
		});
	});

	describe('AppState Type', () => {
		test('has all required fields', () => {
			const state: AppState = {
				navigation: {
					currentSection: 'home',
					isMenuOpen: false
				},
				preferences: {
					soundEnabled: true,
					reducedMotion: false,
					theme: 'auto'
				},
				isLoading: false
			};

			expect(state).toHaveProperty('navigation');
			expect(state).toHaveProperty('preferences');
			expect(state).toHaveProperty('isLoading');
			expect(typeof state.isLoading).toBe('boolean');
		});
	});

	describe('Theme Type', () => {
		test('accepts valid theme values', () => {
			const light: Theme = 'light';
			const dark: Theme = 'dark';
			const auto: Theme = 'auto';

			expect(light).toBe('light');
			expect(dark).toBe('dark');
			expect(auto).toBe('auto');
		});
	});

	describe('AppliedTheme Type', () => {
		test('accepts only light or dark', () => {
			const light: AppliedTheme = 'light';
			const dark: AppliedTheme = 'dark';

			expect(light).toBe('light');
			expect(dark).toBe('dark');
		});
	});
});
