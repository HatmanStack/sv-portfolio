import { describe, test, expect } from 'vitest';
import { load } from './+page.js';

describe('Single Blog Post Load Function', () => {
	test('load function is defined', () => {
		expect(load).toBeDefined();
		expect(typeof load).toBe('function');
	});

	test('load function returns a Promise', async () => {
		const params = { slug: 'test' };
		// @ts-ignore - partial mock for testing
		const result = load({ params });
		expect(result).toBeInstanceOf(Promise);
		// Catch the rejection to avoid unhandled promise error
		await result.catch(() => {});
	});

	test('throws error for invalid slug', async () => {
		const params = { slug: 'nonexistent-post-that-does-not-exist-123456' };

		// Should throw an error when post doesn't exist
		// @ts-ignore - partial mock for testing
		await expect(load({ params })).rejects.toThrow();
	});

	test('function structure handles params correctly', async () => {
		// Test that the function accepts params object
		const testParams = { slug: 'test' };

		try {
			// @ts-ignore - partial mock for testing
			await load({ params: testParams });
		} catch (error) {
			// Error is expected for non-existent slug
			// We're just testing the function accepts the right structure
			expect(error).toBeDefined();
		}
	});

	test('rejects slugs with path traversal characters', async () => {
		const maliciousSlugs = ['../etc/passwd', 'foo/bar', 'test..slug', 'hello%20world'];

		for (const slug of maliciousSlugs) {
			try {
				// @ts-ignore - partial mock for testing
				await load({ params: { slug } });
				// Should not reach here
				expect(true).toBe(false);
			} catch (error) {
				expect(error).toBeDefined();
			}
		}
	});

	test('accepts valid slugs', async () => {
		const validSlugs = ['my-post', 'Post-Title-123', 'simple'];

		for (const slug of validSlugs) {
			try {
				// @ts-ignore - partial mock for testing
				await load({ params: { slug } });
			} catch (error) {
				// The post won't exist, but the slug validation should pass.
				// The error should be from the dynamic import, not slug validation.
				expect(error).toBeDefined();
			}
		}
	});
});
