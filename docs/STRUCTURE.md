# Directory Structure

This document describes the organization of the codebase following type-based architecture patterns (see [Phase-0.md](./plans/Phase-0.md#adr-002-directory-organization) for rationale).

## Structure Overview

```
/src
├── /routes                  # SvelteKit routes (file-based routing)
│   ├── +layout.svelte      # Root layout
│   ├── +page.svelte        # Home page
│   ├── Header.svelte       # Site navigation header
│   ├── /about
│   ├── /android
│   ├── /web
│   └── /read
│
└── /lib                    # Shared application code
    ├── /components         # Svelte components
    │   ├── /ui            # Reusable UI components
    │   │   ├── AndroidFilters.svelte
    │   │   ├── GooeyButton.svelte
    │   │   ├── ImageGrid.svelte
    │   │   ├── ProjectCard.svelte
    │   │   └── SVGFilters.svelte
    │   │
    │   └── /icons         # Icon components
    │       └── LinkedIn.svelte
    │
    ├── /data              # Static data files
    │   ├── androidApps.ts
    │   ├── navigation.ts
    │   └── webProjects.ts
    │
    ├── /hooks             # Svelte utilities and hooks
    │   ├── applyClickSound.js
    │   ├── useSound.js
    │   └── useSound.svelte.ts
    │
    ├── /images            # Image assets
    │   ├── *.svg          # SVG images
    │   ├── *.jpg          # Photo assets
    │   └── /slices        # Image slices
    │
    ├── /sounds            # Audio files
    │   ├── click.wav
    │   ├── expand.wav
    │   └── swoosh.mp3
    │
    ├── /stores            # State management stores
    │
    ├── /styles            # Global styles
    │   └── app.scss
    │
    └── /types             # TypeScript type definitions
        └── index.ts
```

## Naming Conventions

### Components (`.svelte` files)
- **PascalCase** for all component files: `ProjectCard.svelte`, `ImageGrid.svelte`
- **Exception**: SvelteKit route files remain lowercase: `+page.svelte`, `+layout.svelte`

### JavaScript/TypeScript files
- **camelCase** for utility files: `useSound.js`, `applyClickSound.js`
- **camelCase** for data files: `androidApps.ts`, `webProjects.ts`

## Directory Purposes

### `/lib/components`
**Purpose**: Svelte components (`.svelte` files)

**Subdirectories**:
- `/ui` - Reusable UI components (buttons, cards, grids)
- `/icons` - Icon components (SVG wrapped in Svelte)
- `/layouts` - Layout wrapper components (if needed)

**What belongs here**: Any `.svelte` file that is a reusable component

### `/lib/data`
**Purpose**: Static data, configuration, and content

**Examples**:
- Project listings
- Navigation structure
- Application configuration
- Static content arrays

**What belongs here**: TypeScript/JavaScript files that export static data

### `/lib/hooks`
**Purpose**: Svelte-specific utilities and custom hooks

**Examples**:
- Sound effect hooks
- Custom Svelte actions
- Reactive utilities
- Lifecycle helpers

**What belongs here**: Functions that integrate with Svelte's reactivity or lifecycle

### `/lib/stores`
**Purpose**: Global state management

**Examples**:
- App state stores
- User preferences
- Shared reactive state

**What belongs here**: Svelte stores (`$state`, writable, readable, derived)

### `/lib/styles`
**Purpose**: Global styles, variables, and mixins

**Examples**:
- Global CSS/SCSS
- Design tokens
- Theme variables
- Shared mixins

**What belongs here**: Style files imported globally

### `/lib/types`
**Purpose**: TypeScript type definitions

**Examples**:
- Interface definitions
- Type aliases
- Shared types

**What belongs here**: TypeScript types used across multiple files

### `/lib/images`
**Purpose**: Static image assets

**Examples**:
- SVG files
- JPG/PNG photos
- Image sprites

**What belongs here**: Image files (not icon components - those go in `/components/icons`)

### `/lib/sounds`
**Purpose**: Audio assets

**Examples**:
- Sound effects (WAV, MP3)
- Background music
- Audio clips

**What belongs here**: Audio files

## Quick Reference

**Where do I put...**

| Type | Location | Example |
|------|----------|---------|
| A new UI component | `/lib/components/ui/` | `NewButton.svelte` |
| A new icon component | `/lib/components/icons/` | `Twitter.svelte` |
| A utility function | `/lib/utils/` | `formatDate.ts` |
| A Svelte hook/action | `/lib/hooks/` | `useDebounce.js` |
| Project data | `/lib/data/` | `projects.ts` |
| A new store | `/lib/stores/` | `theme.svelte.ts` |
| Type definitions | `/lib/types/` | `index.ts` |
| An image file | `/lib/images/` | `hero.jpg` |
| A sound effect | `/lib/sounds/` | `notification.wav` |

## Import Examples

```typescript
// Components
import ProjectCard from '$lib/components/ui/ProjectCard.svelte';
import LinkedInIcon from '$lib/components/icons/LinkedIn.svelte';

// Hooks
import { useSound } from '$lib/hooks/useSound';
import { applyClickSound } from '$lib/hooks/applyClickSound';

// Data
import { projects } from '$lib/data/projects';

// Types (always use "type" keyword)
import type { Project } from '$lib/types';

// Assets
import logo from '$lib/images/logo.svg';
import click from '$lib/sounds/click.wav';
```

## Architecture Decisions

This structure follows **type-based organization** rather than feature-based organization because:

1. **Scalability for portfolio size**: With ~14 components and 4 main routes, type-based organization is clearer
2. **Easier to find files**: Developers know to check `/components` for components, `/hooks` for hooks, etc.
3. **Simpler imports**: Predictable paths like `$lib/components/ui/ProjectCard.svelte`
4. **Clear separation of concerns**: Components, data, styles, and utilities are clearly separated

For more details, see [Phase-0.md ADR-002](./plans/Phase-0.md#adr-002-directory-organization).

## Notes

- This structure was implemented in Phase 1 of the modernization refactoring
- The structure may evolve as the application grows
- Refer to [Phase-0.md](./plans/Phase-0.md) for complete architecture decisions and rationale
