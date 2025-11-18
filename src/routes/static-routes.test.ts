import { describe, test, expect, vi, beforeEach } from 'vitest';

// Mock $app/environment
vi.mock('$app/environment', () => ({
	dev: false,
	browser: false,
	building: false,
	version: 'test'
}));

describe('Static Route Configurations', () => {
	describe('Android Page', () => {
		test('exports configuration constants', async () => {
			const androidPage = await import('./android/+page');

			expect(androidPage).toHaveProperty('csr');
			expect(androidPage).toHaveProperty('prerender');
		});

		test('prerender is set to true', async () => {
			const androidPage = await import('./android/+page');

			expect(androidPage.prerender).toBe(true);
		});

		test('csr is a boolean', async () => {
			const androidPage = await import('./android/+page');

			expect(typeof androidPage.csr).toBe('boolean');
		});
	});

	describe('Web Page', () => {
		test('exports configuration constants', async () => {
			const webPage = await import('./web/+page');

			expect(webPage).toHaveProperty('csr');
			expect(webPage).toHaveProperty('prerender');
		});

		test('prerender is set to true', async () => {
			const webPage = await import('./web/+page');

			expect(webPage.prerender).toBe(true);
		});

		test('csr is a boolean', async () => {
			const webPage = await import('./web/+page');

			expect(typeof webPage.csr).toBe('boolean');
		});
	});

	describe('About Page', () => {
		test('exports configuration constants', async () => {
			const aboutPage = await import('./about/+page');

			expect(aboutPage).toHaveProperty('csr');
			expect(aboutPage).toHaveProperty('prerender');
		});

		test('prerender is set to true', async () => {
			const aboutPage = await import('./about/+page');

			expect(aboutPage.prerender).toBe(true);
		});

		test('csr is a boolean', async () => {
			const aboutPage = await import('./about/+page');

			expect(typeof aboutPage.csr).toBe('boolean');
		});
	});

	describe('Configuration Consistency', () => {
		test('all static routes have same configuration pattern', async () => {
			const androidPage = await import('./android/+page');
			const webPage = await import('./web/+page');
			const aboutPage = await import('./about/+page');

			// All should have prerender = true
			expect(androidPage.prerender).toBe(true);
			expect(webPage.prerender).toBe(true);
			expect(aboutPage.prerender).toBe(true);

			// All should have same csr value
			expect(androidPage.csr).toBe(webPage.csr);
			expect(webPage.csr).toBe(aboutPage.csr);
		});
	});
});
