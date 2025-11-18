/**
 * Navigation test fixtures
 * Static test data based on production navigation structure
 */

import type { NavigationItem } from '$lib/types';

/**
 * Fixture: Array of test navigation items
 * Maintains the same structure as real navigation but with simplified icons
 */
export const navigationItemsFixture: NavigationItem[] = [
	{
		id: 'home',
		name: 'Home',
		href: '/',
		icon: '<svg><path d="M0 0h24v24H0z"/></svg>'
	},
	{
		id: 'web',
		name: 'Web',
		href: '/web',
		icon: '<svg><rect width="24" height="24"/></svg>'
	},
	{
		id: 'android',
		name: 'Android',
		href: '/android',
		icon: '<svg><circle cx="12" cy="12" r="10"/></svg>'
	},
	{
		id: 'read',
		name: 'Read',
		href: '/read',
		icon: '<svg><line x1="0" y1="0" x2="24" y2="24"/></svg>'
	},
	{
		id: 'about',
		name: 'About',
		href: '/about',
		icon: '<svg><polygon points="12,2 22,20 2,20"/></svg>'
	}
];
