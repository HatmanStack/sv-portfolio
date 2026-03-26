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
		const testParams = { slug: 'test' };

		// @ts-ignore - partial mock for testing
		await expect(load({ params: testParams })).rejects.toThrow();
	});

	test('rejects slugs with path traversal characters', async () => {
		const maliciousSlugs = ['../etc/passwd', 'foo/bar', 'test..slug', 'hello%20world'];

		for (const slug of maliciousSlugs) {
			try {
				// @ts-ignore - partial mock for testing
				await load({ params: { slug } });
				expect.unreachable('Should have thrown');
			} catch (/** @type {any} */ err) {
				// SvelteKit error() throws HttpError with status/body, not standard Error
				expect(err).toBeDefined();
				expect(err.status).toBe(404);
			}
		}
	});

	test('accepts valid slugs without triggering validation error', async () => {
		const validSlugs = ['my-post', 'Post-Title-123', 'simple'];

		for (const slug of validSlugs) {
			try {
				// @ts-ignore - partial mock for testing
				await load({ params: { slug } });
				expect.unreachable('Should have thrown');
			} catch (/** @type {any} */ err) {
				// Slug passes validation; error is from dynamic import, not slug check
				// HttpError from validation has status 404, import errors don't
				expect(err.status).toBeUndefined();
			}
		}
	});
});
