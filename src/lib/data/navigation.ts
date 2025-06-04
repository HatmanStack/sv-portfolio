import type { NavigationItem } from '$lib/types/index.js';

export const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    name: 'Home',
    href: '/',
    icon: `<svg class="tab-bar__tab-icon tab-bar__tab-icon--home" viewBox="0 0 24 24" width="24px" height="24px" aria-hidden="true">
      <g class="tab-bar__tab-icon-1" fill="var(--focus-t)" stroke="currentColor" stroke-width="2" stroke-linejoin="round">
        <polygon points="12 1,23 10,23 23,16 23,16 14,8 14,8 23,1 23,1 10" />
      </g>
    </svg>`
  },
  {
    id: 'web',
    name: 'Web',
    href: '/web',
    icon: `<svg class="tab-bar__tab-icon tab-bar__tab-icon--videos" viewBox="0 0 24 24" width="24px" height="24px" aria-hidden="true">
      <g fill="var(--focus-t)" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line class="tab-bar__tab-icon-1" x1="3" y1="1" x2="21" y2="1" />
        <line x1="2" y1="5" x2="22" y2="5" />
        <g class="tab-bar__tab-icon-2" transform="translate(1,9)">
          <polygon points="9 3,15 7.5,9 11" />
          <rect rx="2" ry="2" width="22" height="14" />
          <polygon class="tab-bar__tab-icon-3" opacity="0" points="9 3,15 7.5,9 11" />
        </g>
      </g>
    </svg>`
  },
  {
    id: 'android',
    name: 'Android',
    href: '/android',
    icon: `<svg class="tab-bar__tab-icon tab-bar__tab-icon--android" viewBox="0 0 24 24" width="24px" height="24px" aria-hidden="true">
      <g class="tab-bar__tab-icon-1" fill="var(--focus-t)" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle class="tab-bar__tab-icon-2" cx="7" cy="6" r="2"/>
        <circle class="tab-bar__tab-icon-2" cx="17" cy="6" r="2"/>
        <rect class="tab-bar__tab-icon-3" x="4" y="10" width="16" height="12" rx="2"/>
        <line x1="2" y1="14" x2="4" y2="14"/>
        <line x1="20" y1="14" x2="22" y2="14"/>
      </g>
    </svg>`
  },
  {
    id: 'read',
    name: 'Read',
    href: '/read',
    icon: `<svg class="tab-bar__tab-icon tab-bar__tab-icon--read" viewBox="0 0 24 24" width="24px" height="24px" aria-hidden="true">
      <g class="tab-bar__tab-icon-1" fill="var(--focus-t)" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect class="tab-bar__tab-icon-2" x="1" y="1" rx="2" ry="2" width="11" height="19" />
        <rect class="tab-bar__tab-icon-3" x="12" y="1" rx="2" ry="2" width="11" height="19" />
        <line x1="12" y1="21" x2="12" y2="23" />
      </g>
    </svg>`
  },
  {
    id: 'about',
    name: 'About',
    href: '/about',
    icon: `<svg class="tab-bar__tab-icon tab-bar__tab-icon--profile" viewBox="0 0 24 24" width="24px" height="24px" aria-hidden="true">
      <g fill="var(--focus-t)" stroke="currentColor" stroke-width="2">
        <circle class="tab-bar__tab-icon-1" cx="12" cy="6.5" r="5.5"/>
        <path d="M20.473,23H3.003c-1.276,0-2.228-1.175-1.957-2.422,.705-3.239,3.029-8.578,10.693-8.578s9.987,5.336,10.692,8.575c.272,1.248-.681,2.425-1.959,2.425Z"/>
      </g>
    </svg>`
  }
];