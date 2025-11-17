<svelte:head>
  <title>Home</title>
  <meta name="description" content="CG - Portfolio with Stuff" />
  <meta property="og:title" content="CG - Portfolio with Stuff" />
  <meta property="og:description" content="A portfolio made with some of my favorite Codepen.io's from 2024" />
  <meta property="og:image" content={sloth} /> 
  <meta property="og:url" content="https://www.cg-portfolio.com" />
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="CG - Portfolio with Stuff">
  <meta name="twitter:description" content="A portfolio made with some of my favorite Codepen.io's from 2024">
  <meta name="twitter:image" content={sloth} />
</svelte:head>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import '../app.css';
  import Header from './Header.svelte';
  import ImageGrid from '$lib/components/ui/ImageGrid.svelte';
  import ProjectCard from '$lib/components/ui/ProjectCard.svelte';
  import { gridImages } from '$lib/data/images.js';
  import { projects } from '$lib/data/projects.js';
  import sloth from '$lib/images/sloth_stuff.jpg';

  const REDIRECT_FLAG = 'firefoxRedirected';

  $effect(() => {
    if (browser && navigator.userAgent.includes("Firefox")) {
      const scrollContainer = document.querySelector('.scroll-container');
      if (scrollContainer) {
        scrollContainer.style.display = 'none';
      }

      if (!sessionStorage.getItem(REDIRECT_FLAG)) {
        goto('/read');
        sessionStorage.setItem(REDIRECT_FLAG, 'true');
      }
    }
  });
</script>

<section>
    <ImageGrid images={gridImages} />
</section>

<section class="header-scroll">
  <Header />
</section>

<section class="portfolio-container">
  <div class="category-container">
    {#each projects as project}
      <ProjectCard {project} />
    {/each}
  </div>
</section>

<!-- SVG filter for gooey buttons -->
<svg width="0" height="0" style="position: absolute;">
  <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
    <feComponentTransfer>
      <feFuncA type="discrete" tableValues="0 1"></feFuncA>
    </feComponentTransfer>
    <feGaussianBlur stdDeviation="5"></feGaussianBlur>
    <feComponentTransfer>
      <feFuncA type="table" tableValues="-5 11"></feFuncA>
    </feComponentTransfer>
  </filter>
</svg>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");
  
  :root {
    --dark: #121212;
    --light: #ffffff;
    --gap: 0.5rem;
  }

  .portfolio-container {
    overflow: hidden; 
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 89vh;
    background-image: var(--bg-color);
    background: transparent;
  }

  .category-container {
    display: flex;
    justify-content: space-between;
    align-items: stretch; 
    flex-wrap: nowrap;
    gap: calc(var(--gap) * 2);
    width: 100%;
    height: 80%;
    background: transparent;
  }
</style>