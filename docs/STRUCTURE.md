# Directory Structure

This document describes the organization of the codebase following type-based architecture patterns.

## Structure Overview

```
/src
├── /routes                  # SvelteKit routes (file-based routing)
│   ├── +layout.svelte      # Root layout
│   ├── +layout.ts          # Layout load function
│   ├── +page.svelte        # Home page
│   ├── +page.ts            # Home page load function
│   ├── Header.svelte       # Site navigation header
│   ├── sitemap.xml/        # Sitemap route
│   ├── /about
│   ├── /android
│   ├── /web
│   └── /read
│
└── /lib                    # Shared application code
    ├── /components         # Svelte components
    │   └── /ui            # Reusable UI components
    │       ├── AndroidFilters.svelte
    │       ├── GooeyButton.svelte
    │       ├── ImageGrid.svelte
    │       ├── ProjectCard.svelte
    │       └── SVGFilters.svelte
    │
    ├── /data              # Static data files
    │   ├── androidApps.ts
    │   ├── images.ts
    │   ├── projects.ts
    │   └── webProjects.ts
    │
    ├── /hooks             # Svelte utilities and hooks
    │   └── useSound.svelte.ts
    │
    ├── /images            # Image assets
    │   ├── *.svg          # SVG images
    │   ├── *.avif         # AVIF photos
    │   ├── *.jpg          # JPEG photos
    │   └── /slices        # Image slices
    │
    ├── /sounds            # Audio files
    │   ├── click.wav
    │   ├── expand.wav
    │   ├── switch.wav
    │   └── swoosh.mp3
    │
    ├── /stores            # State management stores
    │   └── app.svelte.ts
    │
    ├── /styles            # Global styles
    │   ├── tokens.css     # Design tokens (CSS custom properties)
    │   └── glow.css       # Shared glow effects
    │
    ├── /test-utils        # Test helpers
    │   ├── setup.ts
    │   ├── mock-factories.ts
    │   ├── render-helpers.ts
    │   ├── store-helpers.ts
    │   └── /fixtures
    │
    └── /types             # TypeScript type definitions
        └── index.ts
```

## Naming Conventions

### Components (`.svelte` files)

- **PascalCase** for all component files: `ProjectCard.svelte`, `ImageGrid.svelte`
- **Exception**: SvelteKit route files remain lowercase: `+page.svelte`, `+layout.svelte`

### JavaScript/TypeScript files

- **camelCase** for data files: `androidApps.ts`, `webProjects.ts`
- **`.svelte.ts`** suffix for files using Svelte 5 runes: `useSound.svelte.ts`, `app.svelte.ts`

## Directory Purposes

### `/lib/components`

**Purpose**: Svelte components (`.svelte` files)

**Subdirectories**:

- `/ui` - Reusable UI components (buttons, cards, grids, filters)

**What belongs here**: Any `.svelte` file that is a reusable component

### `/lib/data`

**Purpose**: Static data, configuration, and content

**Examples**:

- Project listings
- Application configuration
- Static content arrays

**What belongs here**: TypeScript files that export static data

### `/lib/hooks`

**Purpose**: Svelte-specific utilities and custom hooks

**Examples**:

- Sound effect hooks (`useSound.svelte.ts` exports `createSoundStore`)
- Reactive utilities

**What belongs here**: Functions that integrate with Svelte's reactivity or lifecycle

### `/lib/stores`

**Purpose**: Global state management

**Examples**:

- App state store (`app.svelte.ts`)

**What belongs here**: Svelte 5 runes-based stores (`$state`, `$derived`, `$effect`)

### `/lib/styles`

**Purpose**: Global styles, variables, and design tokens

**Examples**:

- CSS custom properties (`tokens.css`)
- Shared visual effects (`glow.css`)

**What belongs here**: Style files imported globally or shared across routes

### `/lib/types`

**Purpose**: TypeScript type definitions

**What belongs here**: TypeScript types used across multiple files

### `/lib/images`

**Purpose**: Static image assets

**What belongs here**: Image files (SVG, AVIF, JPEG, GIF)

### `/lib/sounds`

**Purpose**: Audio assets

**What belongs here**: Audio files (WAV, MP3)

### `/lib/test-utils`

**Purpose**: Test helpers, mock factories, and fixtures

**What belongs here**: Shared test utilities used across test files

## Quick Reference

**Where do I put...**

| Type | Location | Example |
|------|----------|---------|
| A new UI component | `/lib/components/ui/` | `NewButton.svelte` |
| A Svelte hook/action | `/lib/hooks/` | `useDebounce.svelte.ts` |
| Project data | `/lib/data/` | `projects.ts` |
| A new store | `/lib/stores/` | `theme.svelte.ts` |
| Type definitions | `/lib/types/` | `index.ts` |
| An image file | `/lib/images/` | `hero.jpg` |
| A sound effect | `/lib/sounds/` | `notification.wav` |
| Design tokens | `/lib/styles/` | `tokens.css` |
| Test helpers | `/lib/test-utils/` | `mock-factories.ts` |

## Import Examples

```typescript
// Components
import ProjectCard from '$lib/components/ui/ProjectCard.svelte';

// Hooks
import { createSoundStore } from '$lib/hooks/useSound.svelte';

// Data
import { projects } from '$lib/data/projects';

// Stores
import { createAppStore } from '$lib/stores/app.svelte';

// Types (always use "type" keyword)
import type { Project } from '$lib/types';

// Assets
import logo from '$lib/images/logo.svg';
import click from '$lib/sounds/click.wav';
```

## Architecture Decisions

This structure follows **type-based organization** rather than feature-based organization because:

1. **Scalability for portfolio size**: With ~10 components and 4 main routes, type-based organization is clearer
2. **Easier to find files**: Developers know to check `/components` for components, `/hooks` for hooks, etc.
3. **Simpler imports**: Predictable paths like `$lib/components/ui/ProjectCard.svelte`
4. **Clear separation of concerns**: Components, data, styles, and utilities are clearly separated
