/**
 * Mock data factory functions
 * Create test data that matches production data structures
 */

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
	Theme
} from '$lib/types';

/**
 * Creates a mock Project object with default values that can be overridden
 */
export function createMockProject(overrides: Partial<Project> = {}): Project {
	return {
		id: 'test-project',
		title: 'Test Project',
		description: 'A test project description for testing purposes',
		category: 'Web',
		images: {
			profession: '/test-profession.jpg',
			profile: '/test-profile.jpg'
		},
		link: 'https://test.example.com',
		buttonText: 'View',
		...overrides
	};
}

/**
 * Creates a mock AndroidApp object with default values that can be overridden
 */
export function createMockAndroidApp(overrides: Partial<AndroidApp> = {}): AndroidApp {
	return {
		id: 'test-android-app',
		title: 'Test Android App',
		link: 'https://play.google.com/store/apps/test',
		description: 'A test Android app description',
		initialImg: '/test-initial.jpg',
		activeImg: '/test-active.jpg',
		...overrides
	};
}

/**
 * Creates a mock WebProject object with default values that can be overridden
 */
export function createMockWebProject(overrides: Partial<WebProject> = {}): WebProject {
	return {
		id: 'test-web-project',
		title: 'Test Web Project',
		link: 'https://test-web.example.com',
		description: 'A test web project description',
		initialImg: '/test-initial.jpg',
		activeImg: '/test-active.jpg',
		...overrides
	};
}

/**
 * Creates a mock BlogPost object with default values that can be overridden
 */
export function createMockBlogPost(overrides: Partial<BlogPost> = {}): BlogPost {
	return {
		slug: 'test-blog-post',
		title: 'Test Blog Post',
		date: '2025-01-01',
		description: 'A test blog post description',
		time: '5 min read',
		link: undefined,
		...overrides
	};
}

/**
 * Creates a mock ImageGridItem object with default values that can be overridden
 */
export function createMockImageGridItem(overrides: Partial<ImageGridItem> = {}): ImageGridItem {
	return {
		id: 'test-image',
		src: '/test-image.jpg',
		alt: 'Test image',
		animationRange: undefined,
		special: false,
		content: undefined,
		...overrides
	};
}

/**
 * Creates a mock NavigationItem object with default values that can be overridden
 */
export function createMockNavigationItem(overrides: Partial<NavigationItem> = {}): NavigationItem {
	return {
		id: 'test-nav',
		name: 'Test Nav',
		href: '/test',
		icon: '<svg></svg>',
		...overrides
	};
}

/**
 * Creates a mock NavigationState object with default values that can be overridden
 */
export function createMockNavigationState(
	overrides: Partial<NavigationState> = {}
): NavigationState {
	return {
		currentSection: 'home',
		isMenuOpen: false,
		...overrides
	};
}

/**
 * Creates a mock UserPreferences object with default values that can be overridden
 */
export function createMockUserPreferences(
	overrides: Partial<UserPreferences> = {}
): UserPreferences {
	return {
		soundEnabled: true,
		reducedMotion: false,
		theme: 'auto' as Theme,
		...overrides
	};
}

/**
 * Creates a mock AppState object with default values that can be overridden
 */
export function createMockAppState(overrides: Partial<AppState> = {}): AppState {
	return {
		navigation: createMockNavigationState(overrides.navigation),
		preferences: createMockUserPreferences(overrides.preferences),
		isLoading: false,
		...overrides
	};
}
