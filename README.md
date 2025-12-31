
<div align="center">
<h1>❤️‍🔥 CodePen Favorites ❤️‍🔥</h1>
<h4>
  <a href="https://www.apache.org/licenses/LICENSE-2.0.html">
    <img src="https://img.shields.io/badge/license-Apache2.0-blue" alt="float is under the Apache 2.0 license" />
  </a>
  <a href="https://svelte.dev/">
    <img src="https://img.shields.io/badge/Svelte%205.0-orange" alt="Svelte 5" />
  </a>
  <a href="https://kit.svelte.dev/">
    <img src="https://img.shields.io/badge/SvelteKit%202.0-red" alt="SvelteKit 2" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript%205.0-blue" alt="TypeScript" />
  </a>
</h4>
<p>A collection of some CodePens from 2024 and their Designers.<br></br>🌎 <b>Live Site:</b> <a href="https://portfolio.hatstack.fun">Portfolio</a></p></div>

Modern portfolio showcasing CodePen favorites, built with Svelte 5 and SvelteKit 2.

## Features

- 🎨 Modern Svelte 5 with runes-based reactivity
- 🎯 Type-safe with comprehensive TypeScript types
- 🌓 Light/dark theme with CSS custom properties
- ⚡ Optimized performance with code splitting and lazy loading
- 📱 Fully responsive design
- ♿ Accessibility-focused (reduced motion support)
- 📝 Blog with MDSvex

## Tech Stack

- **Framework**: Svelte 5.0, SvelteKit 2.0
- **Language**: TypeScript 5.0
- **Styling**: CSS custom properties, SCSS preprocessing
- **Build**: Vite 5.4
- **Deployment**: Static adapter for any static host
- **Package Manager**: pnpm

## Project Structure

```
/src
  /lib
    /components   # Reusable components (PascalCase)
      /ui         # UI components (ProjectCard, ImageGrid, GooeyButton)
      /icons      # SVG icon components
    /stores       # Svelte 5 runes-based stores
    /types        # Centralized TypeScript types
    /data         # Static data files
    /styles       # Global styles and design tokens
    /hooks        # Custom hooks and utilities
    /utils        # Helper functions
    /images       # Image assets
    /sounds       # Audio files
  /routes         # SvelteKit file-based routing
```

See [STRUCTURE.md](./docs/STRUCTURE.md) for detailed structure.

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type check
pnpm run check
```

## Documentation

- [Structure](./docs/STRUCTURE.md) - Directory organization
- [Performance](./docs/PERFORMANCE.md) - Performance metrics and optimizations
- [Refactoring Summary](./docs/REFACTORING_SUMMARY.md) - Complete refactoring details

## Recent Refactoring

This project recently underwent a comprehensive 7-phase refactoring to modernize all aspects of the codebase:

**Key Improvements**:
- ✅ Migrated to Svelte 5 runes patterns
- ✅ Implemented CSS custom properties for theming
- ✅ Centralized TypeScript type system
- ✅ Performance optimizations (bundle size, lazy loading)
- ✅ Consistent PascalCase component naming
- ✅ Fixed all TypeScript errors (0 errors)

See [REFACTORING_SUMMARY.md](./docs/REFACTORING_SUMMARY.md) for complete details.

## Featured CodePens

### Spatial Scroll
- **Creator**: Adam Argyle
- **Original Pen**: [Spatial Scroll](https://codepen.io/argyleink/pen/ZEdrzJZ)

### No Script Accordion Animation
- **Creator**: Jakob Eriksen
- **Original Pen**: [No Script Accordion Animation](https://codepen.io/jakob-e/pen/vYMEapr)

### Bouncey Image Radio Group
- **Creator**: Adam Argyle
- **Original Pen**: [Bouncey Image Radio Group](https://codepen.io/argyleink/pen/ExMgWLe)

### Text Illumination
- **Creator**: @Rafa
- **Original Pen**: [Text Illumination](https://codepen.io/RAFA3L/pen/YzomKrR)

### Outline-to-Fill Tab Animations
- **Creator**: Jon Kantner
- **Original Pen**: [Outline-to-Fill Tab Animations](https://codepen.io/jkantner/pen/rNbeEXg)

### 3D Wave Animation
- **Creator**: Teona Mushambadze
- **Original Pen**: [3D Wave Animation](https://codepen.io/HighFlyer/pen/GRLZYKw)

### Gooey Button
- **Creator**: Simon Goellner
- **Original Pen**: [Gooey Button](https://codepen.io/simeydotme/pen/pomRJeE)

## License

Apache 2.0

## Credits

All original CodePen creations belong to their respective creators. This project showcases their amazing work with proper attribution.
