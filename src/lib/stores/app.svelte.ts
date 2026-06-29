import type { AppState, Theme } from '$lib/types/index.js';

function createAppStore() {
	const state = $state<AppState>({
		navigation: {
			currentSection: 'home',
			isMenuOpen: false
		},
		preferences: {
			soundEnabled: true,
			reducedMotion: false,
			theme: 'auto'
		},
		isLoading: true
	});

	return {
		get state() {
			return state;
		},

		// Navigation methods
		setCurrentSection(section: string) {
			state.navigation.currentSection = section;
		},

		toggleMenu() {
			state.navigation.isMenuOpen = !state.navigation.isMenuOpen;
		},

		closeMenu() {
			state.navigation.isMenuOpen = false;
		},

		// Preferences methods
		toggleSound() {
			state.preferences.soundEnabled = !state.preferences.soundEnabled;
			this.savePreferences();
		},

		setTheme(theme: Theme) {
			state.preferences.theme = theme;
			this.savePreferences();
			this.applyTheme();
		},

		toggleReducedMotion() {
			state.preferences.reducedMotion = !state.preferences.reducedMotion;
			this.savePreferences();
			this.applyReducedMotion();
		},

		// Loading state
		setLoading(loading: boolean) {
			state.isLoading = loading;
		},

		// Persistence
		savePreferences() {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('portfolio-preferences', JSON.stringify(state.preferences));
			}
		},

		loadPreferences() {
			if (typeof localStorage !== 'undefined') {
				const saved = localStorage.getItem('portfolio-preferences');
				if (saved) {
					try {
						const preferences = JSON.parse(saved);
						Object.assign(state.preferences, preferences);
						this.applyTheme();
						this.applyReducedMotion();
					} catch (e) {
						console.warn('Failed to load preferences:', e);
					}
				}
			}
		},

		// Theme application
		applyTheme() {
			if (typeof document !== 'undefined') {
				const { theme } = state.preferences;
				// Drive light-dark() via color-scheme on <html>. 'auto' uses both keywords
				// so it follows the OS; 'light'/'dark' force one. (Replaces data-theme.)
				document.documentElement.style.colorScheme = theme === 'auto' ? 'light dark' : theme;
			}
		},

		// Reduced motion application
		applyReducedMotion() {
			if (typeof document !== 'undefined') {
				const root = document.documentElement;
				root.style.setProperty(
					'--motion-preference',
					state.preferences.reducedMotion ? 'reduce' : 'no-preference'
				);
			}
		},

		// Initialize
		init() {
			this.loadPreferences();

			if (typeof window !== 'undefined') {
				// Listen for system theme changes
				const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
				mediaQuery.addEventListener('change', () => {
					if (state.preferences.theme === 'auto') {
						this.applyTheme();
					}
				});

				// Check for reduced motion preference
				const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
				if (reducedMotionQuery.matches && !state.preferences.reducedMotion) {
					state.preferences.reducedMotion = true;
					this.applyReducedMotion();
				}
			}

			this.setLoading(false);
		}
	};
}

export { createAppStore };
export const appStore = createAppStore();
