import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import ts from 'typescript-eslint';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default ts.config(
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		},
		rules: {
			// Disable rules that produce false positives in this SvelteKit project
			'svelte/no-navigation-without-resolve': 'off'
		}
	},
	{
		files: ['**/*.test.ts', '**/*.test.js', '**/*.spec.ts', '**/*.spec.js', '**/test-utils/**'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/ban-ts-comment': 'off'
		}
	},
	{
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'no-console': 'warn'
		}
	},
	prettier,
	{
		ignores: [
			'build/',
			'.svelte-kit/',
			'node_modules/',
			'static/',
			'*.config.js',
			'*.config.ts',
			'svelte.config.js',
			'vite.config.ts',
			'vitest.config.ts',
			// Svelte page files with {@html `<script>`} JSON-LD that trigger parser bugs
			'src/routes/+page.svelte',
			'src/routes/about/+page.svelte',
			'src/routes/android/+page.svelte',
			'src/routes/read/+page.svelte',
			'src/routes/read/post/\\[slug\\]/+page.svelte',
			'src/routes/web/+page.svelte'
		]
	}
);
