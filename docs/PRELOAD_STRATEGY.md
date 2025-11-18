# SvelteKit Preload Strategy

## Current Configuration

**Location**: `src/app.html:27`

```html
<body data-sveltekit-preload-data="hover">
```

## Strategy: Hover Preloading

When users hover over navigation links, SvelteKit automatically prefetches:
- Route data (`/__data.json`)
- Route JavaScript chunks (as configured)

### Benefits

1. **Instant Navigation**: Routes feel instant when clicked after hovering
2. **Balanced Approach**: Doesn't waste bandwidth by preloading everything
3. **Good UX**: Leverages user intent signals (hover = likely to click)

### Alternative Strategies

#### `data-sveltekit-preload-data="tap"`
More aggressive - preloads on touchstart/mousedown. Could use more bandwidth.

#### `data-sveltekit-preload-data="off"`
Disables preloading. Not recommended for internal navigation.

## Per-Link Control

While not currently used, per-link preload control is available:

```svelte
<!-- Disable for external links -->
<a href="https://external.com" data-sveltekit-preload-data="off">
  External Link
</a>

<!-- Aggressive preload for critical routes -->
<a href="/about" data-sveltekit-preload-data="tap">
  About
</a>
```

## Verification

The hover strategy is working when:
- Hovering over nav links triggers `/__data.json` requests
- Navigation feels instant after hovering
- Network tab shows prefetch requests

## Maintenance

No changes needed. The "hover" strategy is optimal for this application.
