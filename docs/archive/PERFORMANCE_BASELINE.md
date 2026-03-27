# Performance Baseline - Phase 5 Start

**Date**: 2025-11-17
**Commit**: c0e647b

## Build Analysis

### JavaScript Bundle Sizes

**Largest Chunks**:
- `CTQz9BmY.js`: 28.07 KB (gzipped: 11.04 KB) - Largest chunk
- `DohSiYks.js`: 21.78 KB (gzipped: 8.50 KB)
- `CSl46ha0.js`: 20.75 KB (gzipped: 4.70 KB)
- `sL0VYJ0Y.js`: 16.66 KB (gzipped: 4.65 KB)
- `CM8WNeVo.js`: 11.76 KB (gzipped: 3.49 KB)
- `DFq3cAlB.js`: 10.78 KB (gzipped: 4.43 KB)

**Route-Specific Nodes**:
- `2.DfpRhJb1.js`: 13.17 KB (gzipped: 4.87 KB) - Home page
- `4.9dm3j4b3.js`: 9.27 KB (gzipped: 4.13 KB) - Android route
- `7.CLZ79Umz.js`: 9.65 KB (gzipped: 4.20 KB) - Web route
- `6.DN_tq3cc.js`: 8.10 KB (gzipped: 2.24 KB) - Blog post route

**Entry Points**:
- `app.BFG0whDn.js`: 5.76 KB (gzipped: 2.43 KB)
- `start.GP3xguSZ.js`: 0.08 KB (gzipped: 0.09 KB)

**Total Estimated JS**: ~180 KB (raw) / ~65 KB (gzipped)

### CSS Bundle Sizes

- `_page.C7mQZNvc.css`: 11.82 KB (gzipped: 2.50 KB) - Largest CSS
- `app.D-cWXZsF.css`: 9.34 KB (gzipped: 2.83 KB) - Global app styles
- `Header.C7v1Yefc.css`: 7.80 KB (gzipped: 1.36 KB)
- `_page.eHwYUOrp.css`: 5.20 KB (gzipped: 1.26 KB)
- `_page.DOricVFI.css`: 5.11 KB (gzipped: 1.23 KB)

**Total CSS**: ~45 KB (raw) / ~11 KB (gzipped)

### Image Assets

**Heaviest Images** (candidates for lazy loading):
- `credentials.C8MbQMIt.avif`: 4,098 KB (~4.0 MB)
- `twa.CkZsHqnj.avif`: 3,679 KB (~3.7 MB)
- `movies.CYaiyv3e.avif`: 2,103 KB (~2.1 MB)
- `canvas-medium.CoT0N_-t.gif`: 1,805 KB (~1.8 MB)
- `connector-medium.c46m_O-R.gif`: 1,743 KB (~1.7 MB)
- `cb-rn-fast-medium.BWheek2C.gif`: 1,593 KB (~1.6 MB)
- `cb-expo-medium.CxdcKwqZ.gif`: 1,576 KB (~1.5 MB)
- `italian.BNsh35Tp.avif`: 1,546 KB (~1.5 MB)
- `looper.C61jfS7T.avif`: 1,529 KB (~1.5 MB)
- `savorswipe.D3yce3fC.avif`: 1,450 KB (~1.4 MB)
- `hug-medium.BCjFgejz.gif`: 1,452 KB (~1.4 MB)

**Total Image Assets**: ~40+ MB of images

### Font Assets

**Fira Mono variants** (multiple weights/languages):
- `fira-mono-latin-400-normal.DKjLVgQi.woff2`: 16.28 KB
- `fira-mono-cyrillic-ext-400-normal.B04YIrm4.woff2`: 15.77 KB
- `fira-mono-latin-400-normal.g4W12wf9.woff`: 13.51 KB
- `fira-mono-cyrillic-ext-400-normal.0xXfcOOq.woff`: 12.91 KB
- Plus Greek, Greek Extended, Latin Extended variants

**Total Fonts**: ~100 KB (multiple variants)

## Bottlenecks Identified

### 1. No Code Splitting
- All route-specific code loads on initial page load
- Heavy routes (Android, Web) bundled in initial chunks
- No lazy loading of route components
- Dependencies (swiper, neoconfetti) in package.json but not used - potential dead code

### 2. Image Loading Strategy
- ✅ ImageGrid component already has `loading="lazy"`
- ❌ Other route pages may not have lazy loading
- ❌ No preloading of critical/hero images
- ❌ Very large image files (4MB, 3.7MB, 2.1MB)

### 3. Font Loading
- ❌ No font preloading
- ❌ Multiple font variants loaded (may not all be needed)
- ❌ No font-display strategy

### 4. Build Configuration
- ❌ No minification strategy (using default esbuild)
- ❌ No manual chunking for vendor libraries
- ❌ `precompress: false` in svelte.config.js (should be true)
- ❌ No terser for better compression

### 5. SvelteKit Preloading
- ✅ `data-sveltekit-preload-data="hover"` already configured
- No additional preload optimizations needed

## Improvement Targets

Based on analysis, we should aim for:

1. **Bundle Size Reduction**: 15-20% reduction through:
   - Manual chunking for vendor code
   - Better minification (terser)
   - Removing unused dependencies

2. **Initial Load Reduction**: 30-50% reduction in initial transfer through:
   - Lazy loading images (especially 4MB+ images)
   - Code splitting for routes
   - Precompression enabled

3. **First Contentful Paint (FCP)**: Improve by 200-300ms through:
   - Font preloading
   - Critical asset preloading
   - Optimized font loading strategy

4. **Time to Interactive (TTI)**: Improve through:
   - Smaller initial bundle
   - Deferred loading of non-critical code

## Current Configuration

### vite.config.ts
```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()]
});
```
**Status**: Minimal configuration, no optimizations

### svelte.config.js
```javascript
precompress: false,  // Should be TRUE
```
**Status**: Precompression disabled

## Next Steps

1. Enable precompression in svelte.config.js
2. Add build optimizations to vite.config.ts
3. Implement code splitting for routes
4. Add lazy loading to all images
5. Preload critical fonts
6. Manual chunk splitting for better caching

## Notes

- Swiper and neoconfetti are in dependencies but not actively used
- May be able to remove or they're dynamically imported
- ImageGrid already has lazy loading implemented (good!)
- app.html already has hover preloading configured
