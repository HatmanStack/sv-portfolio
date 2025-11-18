import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],

	test: {
		// Use jsdom environment for browser API simulation
		environment: 'jsdom',

		// Enable globals (test, describe, expect)
		globals: true,

		// Setup files to run before tests
		setupFiles: ['./src/lib/test-utils/setup.ts'],

		// Include patterns for test files
		include: ['src/**/*.{test,spec}.{js,ts}'],

		// Coverage configuration
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html', 'lcov'],
			exclude: [
				'node_modules/',
				'src/**/*.test.ts',
				'src/**/*.test.js',
				'src/**/*.test.svelte.ts',
				'src/**/*.spec.ts',
				'src/lib/test-utils/**',
				'*.config.*',
				'**/types/**',
				'build/',
				'.svelte-kit/',
				'**/*.d.ts',
				'src/app.html'
			],
			thresholds: {
				statements: 80,
				branches: 75,
				functions: 80,
				lines: 80
			}
		},

		// Handle CSS modules
		css: true
	},

	resolve: {
		conditions: ['browser']
	}
});
