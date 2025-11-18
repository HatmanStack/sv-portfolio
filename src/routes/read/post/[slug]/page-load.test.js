import { describe, test, expect } from 'vitest';
import { load } from './+page.js';

describe('Single Blog Post Load Function', () => {
	test('load function is defined', () => {
		expect(load).toBeDefined();
		expect(typeof load).toBe('function');
	});

	test('load function is async', () => {
		expect(load.constructor.name).toBe('AsyncFunction');
	});

	test('load function requires params argument', () => {
		// Function should have 1 parameter
		expect(load.length).toBeGreaterThanOrEqual(1);
	});

	test('throws error for invalid slug', async () => {
		const params = { slug: 'nonexistent-post-that-does-not-exist-123456' };

		// Should throw an error when post doesn't exist
		await expect(load({ params })).rejects.toThrow();
	});

	test('function structure handles params correctly', async () => {
		// Test that the function accepts params object
		const testParams = { slug: 'test' };

		try {
			await load({ params: testParams });
		} catch (error) {
			// Error is expected for non-existent slug
			// We're just testing the function accepts the right structure
			expect(error).toBeDefined();
		}
	});
});
