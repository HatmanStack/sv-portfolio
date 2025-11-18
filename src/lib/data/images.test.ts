/**
 * Images Data Validation Tests
 *
 * Validates that image grid data is well-formed and matches the ImageGridItem type.
 */

import { describe, test, expect } from 'vitest';
import { gridImages } from './images';

describe('Images Data', () => {
	describe('Data Structure', () => {
		test('gridImages array is not empty', () => {
			expect(Array.isArray(gridImages)).toBe(true);
			expect(gridImages.length).toBeGreaterThan(0);
		});

		test('all items have required fields', () => {
			gridImages.forEach((item) => {
				expect(item).toHaveProperty('id');
				expect(item).toHaveProperty('src');
				expect(item).toHaveProperty('alt');
			});
		});
	});

	describe('Data Types', () => {
		test('all IDs are non-empty strings', () => {
			gridImages.forEach((item) => {
				expect(typeof item.id).toBe('string');
				expect(item.id.length).toBeGreaterThan(0);
			});
		});

		test('all src values are strings', () => {
			gridImages.forEach((item) => {
				expect(typeof item.src).toBe('string');
			});
		});

		test('all alt values are strings', () => {
			gridImages.forEach((item) => {
				expect(typeof item.alt).toBe('string');
			});
		});
	});

	describe('Data Uniqueness', () => {
		test('all image IDs are unique', () => {
			const ids = gridImages.map((item) => item.id);
			const uniqueIds = new Set(ids);
			expect(ids.length).toBe(uniqueIds.size);
		});
	});

	describe('Special Items', () => {
		test('special items are properly configured', () => {
			const specialItems = gridImages.filter((item) => item.special === true);

			specialItems.forEach((item) => {
				expect(item.special).toBe(true);
				expect(item.content).toBeDefined();
				expect(typeof item.content).toBe('string');
			});
		});

		test('non-special items have src values', () => {
			const normalItems = gridImages.filter((item) => !item.special);

			normalItems.forEach((item) => {
				// Some items may have empty src for spacing, but they should be defined
				expect(item.src).toBeDefined();
			});
		});
	});
});
