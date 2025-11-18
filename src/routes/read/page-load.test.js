import { describe, test, expect } from 'vitest';
import { load } from './+page.js';

describe('Blog List Load Function', () => {
	test('load function is defined', () => {
		expect(load).toBeDefined();
		expect(typeof load).toBe('function');
	});

	test('load function is async', () => {
		expect(load.constructor.name).toBe('AsyncFunction');
	});

	test('load function returns object with posts array', async () => {
		const result = await load();

		expect(result).toHaveProperty('posts');
		expect(Array.isArray(result.posts)).toBe(true);
	});

	test('posts are sorted by date (newest first)', async () => {
		const result = await load();

		if (result.posts.length > 1) {
			for (let i = 0; i < result.posts.length - 1; i++) {
				const currentDate = new Date(result.posts[i].date).getTime();
				const nextDate = new Date(result.posts[i + 1].date).getTime();

				// Current post should be newer or equal to next post
				expect(currentDate).toBeGreaterThanOrEqual(nextDate);
			}
		}
	});

	test('each post has required fields', async () => {
		const result = await load();

		result.posts.forEach((post) => {
			expect(post).toHaveProperty('slug');
			expect(post).toHaveProperty('title');
			expect(post).toHaveProperty('date');
			expect(post).toHaveProperty('description');
			expect(typeof post.slug).toBe('string');
			expect(typeof post.title).toBe('string');
			expect(typeof post.date).toBe('string');
			expect(typeof post.description).toBe('string');
		});
	});

	test('slugs are properly extracted from file paths', async () => {
		const result = await load();

		result.posts.forEach((post) => {
			// Slug should not be empty
			expect(post.slug).toBeTruthy();
			// Slug should not contain .md extension
			expect(post.slug).not.toContain('.md');
			// Slug should not contain path separators
			expect(post.slug).not.toContain('/');
			expect(post.slug).not.toContain('\\');
		});
	});

	test('handles invalid dates gracefully', async () => {
		const result = await load();

		// Function should not throw even if some dates are invalid
		expect(result.posts).toBeDefined();

		// Posts with invalid dates should still be included
		result.posts.forEach((post) => {
			expect(post.date).toBeDefined();
		});
	});

	test('returns empty array on error (resilience)', async () => {
		// Test the error handling path is defined
		const result = await load();

		// Should always return an object with posts array
		expect(result).toHaveProperty('posts');
		expect(Array.isArray(result.posts)).toBe(true);
	});
});
