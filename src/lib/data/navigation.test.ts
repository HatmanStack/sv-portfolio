/**
 * Navigation Data Validation Tests
 *
 * Validates that navigation data is well-formed and matches the NavigationItem type.
 */

import { describe, test, expect } from 'vitest';
import { navigationItems } from './navigation';

describe('Navigation Data', () => {
	describe('Data Structure', () => {
		test('navigationItems array is not empty', () => {
			expect(Array.isArray(navigationItems)).toBe(true);
			expect(navigationItems.length).toBeGreaterThan(0);
		});

		test('all items have required fields', () => {
			navigationItems.forEach((item) => {
				expect(item).toHaveProperty('id');
				expect(item).toHaveProperty('name');
				expect(item).toHaveProperty('href');
				expect(item).toHaveProperty('icon');
			});
		});
	});

	describe('Data Types', () => {
		test('all IDs are non-empty strings', () => {
			navigationItems.forEach((item) => {
				expect(typeof item.id).toBe('string');
				expect(item.id.length).toBeGreaterThan(0);
			});
		});

		test('all names are non-empty strings', () => {
			navigationItems.forEach((item) => {
				expect(typeof item.name).toBe('string');
				expect(item.name.length).toBeGreaterThan(0);
			});
		});

		test('all hrefs are non-empty strings starting with /', () => {
			navigationItems.forEach((item) => {
				expect(typeof item.href).toBe('string');
				expect(item.href.length).toBeGreaterThan(0);
				expect(item.href.startsWith('/')).toBe(true);
			});
		});

		test('all icons are non-empty strings containing svg', () => {
			navigationItems.forEach((item) => {
				expect(typeof item.icon).toBe('string');
				expect(item.icon.length).toBeGreaterThan(0);
				expect(item.icon).toContain('svg');
			});
		});
	});

	describe('Data Uniqueness', () => {
		test('all navigation IDs are unique', () => {
			const ids = navigationItems.map((item) => item.id);
			const uniqueIds = new Set(ids);
			expect(ids.length).toBe(uniqueIds.size);
		});

		test('all navigation paths are unique', () => {
			const hrefs = navigationItems.map((item) => item.href);
			const uniqueHrefs = new Set(hrefs);
			expect(hrefs.length).toBe(uniqueHrefs.size);
		});
	});

	describe('Expected Navigation Items', () => {
		test('home navigation exists', () => {
			const home = navigationItems.find((item) => item.id === 'home');
			expect(home).toBeDefined();
			expect(home?.href).toBe('/');
		});

		test('web navigation exists', () => {
			const web = navigationItems.find((item) => item.id === 'web');
			expect(web).toBeDefined();
			expect(web?.href).toBe('/web');
		});

		test('android navigation exists', () => {
			const android = navigationItems.find((item) => item.id === 'android');
			expect(android).toBeDefined();
			expect(android?.href).toBe('/android');
		});

		test('read navigation exists', () => {
			const read = navigationItems.find((item) => item.id === 'read');
			expect(read).toBeDefined();
			expect(read?.href).toBe('/read');
		});

		test('about navigation exists', () => {
			const about = navigationItems.find((item) => item.id === 'about');
			expect(about).toBeDefined();
			expect(about?.href).toBe('/about');
		});
	});
});
