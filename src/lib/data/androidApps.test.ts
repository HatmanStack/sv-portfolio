/**
 * Android Apps Data Validation Tests
 *
 * Validates that Android app data is well-formed and matches the AndroidApp type.
 */

import { describe, test, expect } from 'vitest';
import { androidApps } from './androidApps';

describe('Android Apps Data', () => {
	describe('Data Structure', () => {
		test('androidApps array is not empty', () => {
			expect(Array.isArray(androidApps)).toBe(true);
			expect(androidApps.length).toBeGreaterThan(0);
		});

		test('all apps have required fields', () => {
			androidApps.forEach((app) => {
				expect(app).toHaveProperty('id');
				expect(app).toHaveProperty('title');
				expect(app).toHaveProperty('initialImg');
				expect(app).toHaveProperty('activeImg');
			});
		});
	});

	describe('Data Types', () => {
		test('all IDs are non-empty strings', () => {
			androidApps.forEach((app) => {
				expect(typeof app.id).toBe('string');
				expect(app.id.length).toBeGreaterThan(0);
			});
		});

		test('all titles are non-empty strings', () => {
			androidApps.forEach((app) => {
				expect(typeof app.title).toBe('string');
				expect(app.title.length).toBeGreaterThan(0);
			});
		});
	});

	describe('Data Uniqueness', () => {
		test('all app IDs are unique', () => {
			const ids = androidApps.map((app) => app.id);
			const uniqueIds = new Set(ids);
			expect(ids.length).toBe(uniqueIds.size);
		});
	});

	describe('URL Validation', () => {
		test('all links are valid URLs when present', () => {
			androidApps.forEach((app) => {
				if (app.link) {
					const link = app.link;
					expect(() => new URL(link)).not.toThrow();
				}
			});
		});
	});
});
