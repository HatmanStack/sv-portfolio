<!-- Simplified Android SVG filters component -->
<svg class="filters" aria-hidden="true">
  <defs>
    <filter id="glow-4" color-interpolation-filters="sRGB" x="-50%" y="-200%" width="200%" Height="500%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur4"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="19" result="blur19"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur9"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur30"/>
      <feColorMatrix in="blur4" result="color-0-blur" type="matrix" values="1 0 0 0 0 0 0.98 0 0 0 0 0 0.96 0 0 0 0 0 0.8 0"/>
      <feOffset in="color-0-blur" result="layer-0-offsetted" dx="0" dy="0"/>
      <feColorMatrix in="blur19" result="color-1-blur" type="matrix" values="0.82 0 0 0 0 0 0.49 0 0 0 0 0 0.26 0 0 0 0 0 1 0"/>
      <feOffset in="color-1-blur" result="layer-1-offsetted" dx="0" dy="2"/>
      <feColorMatrix in="blur9" result="color-2-blur" type="matrix" values="1 0 0 0 0 0 0.67 0 0 0 0 0 0.36 0 0 0 0 0 0.65 0"/>
      <feOffset in="color-2-blur" result="layer-2-offsetted" dx="0" dy="2"/>
      <feColorMatrix in="blur30" result="color-3-blur" type="matrix" values="1 0 0 0 0 0 0.61 0 0 0 0 0 0.39 0 0 0 0 0 1 0"/>
      <feOffset in="color-3-blur" result="layer-3-offsetted" dx="0" dy="2"/>
      <feMerge>
        <feMergeNode in="layer-0-offsetted"/>
        <feMergeNode in="layer-1-offsetted"/>
        <feMergeNode in="layer-2-offsetted"/>
        <feMergeNode in="layer-3-offsetted"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
</svg>

<style>
  .filters {
    position: absolute;
    width: 0;
    height: 0;
    pointer-events: none;
    z-index: -1;
  }
</style>