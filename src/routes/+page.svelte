<svelte:head>
  <title>Christopher Galliart | Developer Portfolio</title>
  <meta name="description" content="Full-stack developer portfolio showcasing Android apps, web projects, and technical blog posts on AWS, AI/ML, and modern web development." />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="CG Portfolio" />
  <meta property="og:title" content="Christopher Galliart | Developer Portfolio" />
  <meta property="og:description" content="Full-stack developer portfolio showcasing Android apps, web projects, and technical blog posts on AWS, AI/ML, and modern web development." />
  <meta property="og:image" content="https://portfolio.hatstack.fun/og-image.jpg" />
  <meta property="og:image:width" content="1024" />
  <meta property="og:image:height" content="1024" />
  <meta property="og:url" content="https://portfolio.hatstack.fun" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@HatmanStack" />
  <meta name="twitter:title" content="Christopher Galliart | Developer Portfolio" />
  <meta name="twitter:description" content="Full-stack developer portfolio showcasing Android apps, web projects, and technical blog posts." />
  <meta name="twitter:image" content="https://portfolio.hatstack.fun/og-image.jpg" />

  <!-- Preload hero image -->
  <link rel="preload" as="image" href={sloth} type="image/jpeg" />

  <!-- JSON-LD Structured Data -->
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Christopher Galliart Portfolio",
    "url": "https://portfolio.hatstack.fun",
    "author": {
      "@type": "Person",
      "name": "Christopher Galliart",
      "url": "https://www.linkedin.com/in/christopher-galliart-gemenie-labs/"
    },
    "description": "Full-stack developer portfolio showcasing Android apps, web projects, and technical blog posts."
  })}</script>`}
</svelte:head>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import '../app.css';
  import Header from './Header.svelte';
  import ImageGrid from '$lib/components/ui/ImageGrid.svelte';
  import ProjectCard from '$lib/components/ui/ProjectCard.svelte';
  import { gridImages } from '$lib/data/images.js';
  import { projects, projectsRow2 } from '$lib/data/projects.js';
  import sloth from '$lib/images/sloth_stuff.jpg';

  const REDIRECT_FLAG = 'firefoxRedirected';

  $effect(() => {
    if (browser && navigator.userAgent.includes("Firefox")) {
      const scrollContainer = document.querySelector('.scroll-container') as HTMLElement | null;
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
    {#each projects as project, index}
      <ProjectCard {project} lazy={index > 0} />
    {/each}
  </div>
  <div class="category-container row-2">
    {#each projectsRow2 as project}
      <ProjectCard {project} lazy={true} />
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
  :root {
    --dark: #121212;
    --light: #ffffff;
    --gap: 0.5rem;
  }

  .portfolio-container {
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
    min-height: 89vh;
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
    height: 45%;
    background: transparent;
  }

  .category-container.row-2 {
    justify-content: center;
    height: 40%;
  }
</style>