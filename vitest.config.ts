import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			// Use jsdom environment for browser API simulation
			environment: 'jsdom',

			// Enable globals (test, describe, expect)
			globals: true,

			// Setup files to run before tests
			setupFiles: ['./src/lib/test-utils/setup.ts'],

			// Include patterns for test files
			include: ['src/**/*.{test,spec}.{js,ts,svelte}'],

			// Coverage configuration
			coverage: {
				provider: 'v8',
				reporter: ['text', 'json', 'html'],
				exclude: [
					'node_modules/',
					'src/**/*.test.ts',
					'src/**/*.test.svelte.ts',
					'src/**/*.spec.ts',
					'src/lib/test-utils/**',
					'*.config.*',
					'**/types/**',
					'build/',
					'.svelte-kit/'
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
		}
	})
);
