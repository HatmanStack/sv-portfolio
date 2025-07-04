<script lang="ts">
  import type { ImageGridItem } from '$lib/types/index.js';
  
  interface Props {
    images: ImageGridItem[];
    className?: string;
  }
  
  let { images, className = "" }: Props = $props();
</script>

<div class="scroll-container">
  <div class="stuck-grid {className}">
    {#each images as image, index (image.id)}
      <div 
        class="grid-item {image.special ? 'special' : ''}" 
        style="--animation-range: {image.animationRange}"
      >
        {#if image.special}
          <p><b>{image.content}</b></p>
        {:else}
          <img src={image.src} alt={image.alt} loading="lazy" />
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .scroll-container {
    height: 300vh; 
    position: relative;
    padding: 0;
  }

  .stuck-grid {
    block-size: 100svh;
    perspective: 1000px;
    transform-style: preserve-3d;
    display: grid;
    grid: repeat(4, 25dvh) / repeat(4, 25dvw);
    place-items: center;
    position: sticky;
    top: 0px;
    left: 0;
    overflow: clip;
    padding: 0;
    width: 100vw;
    margin: 0 auto;
  }

  .grid-item {
    transform-style: preserve-3d;
    font-size: 5vmin;
    font-weight: lighter;
    text-wrap: nowrap;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .grid-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  @supports (animation-timeline: scroll()) {
    @media (prefers-reduced-motion: no-preference) {
      .grid-item {
        animation: zoom-in linear both;
        animation-timeline: scroll(root block);
        will-change: transform, opacity, filter;
      }
    }
  }

  .special.special {
    grid-row: 2 / span 2;
    grid-column: 2 / span 2;
    margin-right: 25vw;
    margin-bottom: 32vh;
  }

  /* Animation ranges for each grid item */
  .grid-item:nth-of-type(1)  { animation-range: 40% 50% }
  .grid-item:nth-of-type(2)  { animation-range: 20% 30% }
  .grid-item:nth-of-type(3)  { animation-range: 52% 62% }
  .grid-item:nth-of-type(4)  { animation-range: 50% 60% }
  .grid-item:nth-of-type(5)  { animation-range: 45% 55% }
  .grid-item:nth-of-type(6)  { animation-range: 10% 20% }
  .grid-item:nth-of-type(7)  { animation-range: 90% 100% }
  .grid-item:nth-of-type(8)  { animation-range: 30% 40% }
  .grid-item:nth-of-type(9)  { animation-range: 80% 90% }
  .grid-item:nth-of-type(10) { animation-range: 70% 80% }
  .grid-item:nth-of-type(11) { animation-range: -10% 50% }
  .grid-item:nth-of-type(12) { animation-range: 52% 62% }
  .grid-item:nth-of-type(13) { animation-range: 15% 25% }
  .grid-item:nth-of-type(14) { animation-range: 7% 17% }
  .grid-item:nth-of-type(15) { animation-range: 75% 85% }
  .grid-item:nth-of-type(16) { animation-range: 3% 13% }
  .grid-item:nth-of-type(17) { animation-range: 87% 97% }
  .grid-item:nth-of-type(18) { animation-range: 42% 52% }
  .grid-item:nth-of-type(19) { animation-range: 57% 67% }
  .grid-item:nth-of-type(20) { animation-range: 37% 47% }
  .grid-item:nth-of-type(21) { animation-range: 12% 22% }
  .grid-item:nth-of-type(22) { animation-range: 8% 18% }
  .grid-item:nth-of-type(23) { animation-range: 84% 94% }
  .grid-item:nth-of-type(24) { animation-range: 33% 43% }
  .grid-item:nth-of-type(25) { animation-range: 48% 58% }
  .grid-item:nth-of-type(26) { animation-range: 13% 23% }
  .grid-item:nth-of-type(27) { animation-range: 78% 88% }
  .grid-item:nth-of-type(28) { animation-range: 62% 72% }
  .grid-item:nth-of-type(29) { animation-range: 31% 41% }
  .grid-item:nth-of-type(30) { animation-range: 8% 18% }
  .grid-item:nth-of-type(31) { animation-range: 4% 14% }
  .grid-item:nth-of-type(32) { animation-range: 74% 84% }
  .grid-item:nth-of-type(33) { animation-range: 61% 71% }
  .grid-item:nth-of-type(34) { animation-range: 26% 36% }
  .grid-item:nth-of-type(35) { animation-range: 63% 73% }
  .grid-item:nth-of-type(36) { animation-range: 11% 21% }
  .grid-item:nth-of-type(37) { animation-range: 89% 99% }
  .grid-item:nth-of-type(38) { animation-range: 33% 43% }
  .grid-item:nth-of-type(39) { animation-range: 88% 98% }
  .grid-item:nth-of-type(40) { animation-range: 22% 32% }
  .grid-item:nth-of-type(41) { animation-range: 16% 26% }
  .grid-item:nth-of-type(42) { animation-range: 26% 36% }
  .grid-item:nth-of-type(43) { animation-range: 66% 76% }
  .grid-item:nth-of-type(44) { animation-range: 3% 13% }
  .grid-item:nth-of-type(45) { animation-range: 44% 54% }
  .grid-item:nth-of-type(46) { animation-range: 11% 21% }
  .grid-item:nth-of-type(47) { animation-range: 23% 33% }
  .grid-item:nth-of-type(48) { animation-range: 39% 49% }
  .grid-item:nth-of-type(49) { animation-range: 59% 69% }
  .grid-item:nth-of-type(50) { animation-range: 6% 16% }
  
  @supports (animation-timeline: scroll()) {
    .grid-item:nth-of-type(1) { grid-area: 1/1 }
    .grid-item:nth-of-type(2) { grid-area: 1/2 }
    .grid-item:nth-of-type(3) { grid-area: 1/3 }
    .grid-item:nth-of-type(4) { grid-area: 1/4 }
    .grid-item:nth-of-type(5) { grid-area: 2/1 }
    .grid-item:nth-of-type(6) { grid-area: 2/2 }
    .grid-item:nth-of-type(7) { grid-area: 2/3 }
    .grid-item:nth-of-type(8) { grid-area: 2/4 }
    .grid-item:nth-of-type(9) { grid-area: 3/1 }
    .grid-item:nth-of-type(10) { grid-area: 3/2 }
    .grid-item:nth-of-type(11) { grid-area: 3/3 }
    .grid-item:nth-of-type(12) { grid-area: 3/4 }
    .grid-item:nth-of-type(13) { grid-area: 4/1 }
    .grid-item:nth-of-type(14) { grid-area: 4/2 }
    .grid-item:nth-of-type(15) { grid-area: 4/3 }
    .grid-item:nth-of-type(16) { grid-area: 4/4 }
    .grid-item:nth-of-type(17) { grid-area: 2/1 }
    .grid-item:nth-of-type(18) { grid-area: 2/2 }
    .grid-item:nth-of-type(19) { grid-area: 2/3 }
    .grid-item:nth-of-type(20) { grid-area: 2/4 }
    .grid-item:nth-of-type(21) { grid-area: 3/1 }
    .grid-item:nth-of-type(22) { grid-area: 3/2 }
    .grid-item:nth-of-type(23) { grid-area: 3/3 }
    .grid-item:nth-of-type(24) { grid-area: 3/4 }
    .grid-item:nth-of-type(25) { grid-area: 1/1 }
    .grid-item:nth-of-type(26) { grid-area: 1/2 }
    .grid-item:nth-of-type(27) { grid-area: 1/3 }
    .grid-item:nth-of-type(28) { grid-area: 1/4 }
    .grid-item:nth-of-type(29) { grid-area: 4/1 }
    .grid-item:nth-of-type(30) { grid-area: 4/2 }
    .grid-item:nth-of-type(31) { grid-area: 4/3 }
    .grid-item:nth-of-type(32) { grid-area: 4/4 }
    .grid-item:nth-of-type(33) { grid-area: 2/1 }
    .grid-item:nth-of-type(34) { grid-area: 2/2 }
    .grid-item:nth-of-type(35) { grid-area: 2/3 }
    .grid-item:nth-of-type(36) { grid-area: 2/4 }
    .grid-item:nth-of-type(37) { grid-area: 3/1 }
    .grid-item:nth-of-type(38) { grid-area: 3/2 }
    .grid-item:nth-of-type(39) { grid-area: 3/3 }
    .grid-item:nth-of-type(40) { grid-area: 3/4 }
    .grid-item:nth-of-type(41) { grid-area: 1/1 }
    .grid-item:nth-of-type(42) { grid-area: 1/2 }
    .grid-item:nth-of-type(43) { grid-area: 1/3 }
    .grid-item:nth-of-type(44) { grid-area: 1/4 }
    .grid-item:nth-of-type(45) { grid-area: 4/1 }
    .grid-item:nth-of-type(46) { grid-area: 4/2 }
    .grid-item:nth-of-type(47) { grid-area: 4/3 }
    .grid-item:nth-of-type(48) { grid-area: 4/4 }
    .grid-item:nth-of-type(49) { grid-area: 3/1 }
    .grid-item:nth-of-type(50) { grid-area: 3/2 }
    .grid-item:nth-of-type(51) { grid-area: 3/3 }
    .grid-item:nth-of-type(52) { grid-area: 3/4 }
  }

  @keyframes zoom-in {
    0% {
      transform: translateZ(-1000px);
      opacity: 0;
      filter: blur(5px);
    }
    50% {
      transform: translateZ(0px);
      opacity: 1;
      filter: blur(0px);
    }
    100% {
      transform: translateZ(1000px);
      opacity: 0;
      filter: blur(5px);
    }
  }
</style>