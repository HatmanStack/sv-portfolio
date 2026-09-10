<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import Header from './Header.svelte';
	import ImageGrid from '$lib/components/ui/ImageGrid.svelte';
	import ProjectCard from '$lib/components/ui/ProjectCard.svelte';
	import { gridImages } from '$lib/data/images.js';
	import { projects, projectsRow2, projectsRow3 } from '$lib/data/projects.js';
	import sloth from '$lib/images/sloth_stuff.jpg';

	// Temporarily disabled to isolate home-page CPU usage. Set back to true to re-enable.
	const SHOW_GRID = true;

	const REDIRECT_FLAG = 'noScrollAnimRedirected';

	$effect(() => {
		if (browser && !CSS.supports('animation-timeline', 'scroll()')) {
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

<svelte:head>
	<title>Christopher Galliart | Developer Portfolio</title>
	<meta
		name="description"
		content="Full-stack developer portfolio showcasing Android apps, web projects, and technical blog posts on AWS, AI/ML, and modern web development."
	/>

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="CG Portfolio" />
	<meta property="og:title" content="Christopher Galliart | Developer Portfolio" />
	<meta
		property="og:description"
		content="Full-stack developer portfolio showcasing Android apps, web projects, and technical blog posts on AWS, AI/ML, and modern web development."
	/>
	<meta property="og:image" content="https://portfolio.hatstack.fun/og-image.jpg" />
	<meta property="og:image:width" content="1024" />
	<meta property="og:image:height" content="1024" />
	<meta property="og:url" content="https://portfolio.hatstack.fun" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@HatmanStack" />
	<meta name="twitter:title" content="Christopher Galliart | Developer Portfolio" />
	<meta
		name="twitter:description"
		content="Full-stack developer portfolio showcasing Android apps, web projects, and technical blog posts."
	/>
	<meta name="twitter:image" content="https://portfolio.hatstack.fun/og-image.jpg" />

	<!-- Preload hero image -->
	<link rel="preload" as="image" href={sloth} type="image/jpeg" />

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Christopher Galliart Portfolio',
		url: 'https://portfolio.hatstack.fun',
		author: {
			'@type': 'Person',
			name: 'Christopher Galliart',
			url: 'https://www.linkedin.com/in/christopher-galliart-gemenie-labs/'
		},
		description:
			'Full-stack developer portfolio showcasing Android apps, web projects, and technical blog posts.'
	})}</script>`}
</svelte:head>

{#if SHOW_GRID}
	<section>
		<ImageGrid images={gridImages} />
	</section>
{/if}

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
	<div class="category-container row-3">
		{#each projectsRow3 as project}
			<ProjectCard {project} lazy={true} />
		{/each}
	</div>
</section>

<!-- SVG "goo" filter for page-level effects. Simplified variant (feComponentTransfer-based)
     separate from GooeyButton's own "goo" filter (feGaussianBlur+feColorMatrix-based). -->
<svg width="0" height="0" style="position: absolute;">
	<filter id="goo-page" x="-50%" y="-50%" width="200%" height="200%">
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

	/* Desktop: a hovered card grows its row, and three rows leave no slack for that
	   inside the viewport, so the grid spills below the fold. Pin the nav so reaching
	   the rest of the grid can't scroll it off screen. Mobile keeps a normal header:
	   its single-column list scrolls by design and hover expansion is off there. */
	@media (min-width: 769px) {
		.header-scroll {
			position: sticky;
			top: 0;
			z-index: var(--z-sticky);
			container-type: scroll-state;
		}

		/* Only a pinned header needs a ground. At rest it sits on the page background as
		   before; pinned, it floats over the cards, which read straight through the logo,
		   the icons and the gaps around the nav without one. */
		@container scroll-state(stuck: top) {
			.header-scroll > :global(header) {
				background: color-mix(in srgb, var(--color-bg-layer-0) 70%, transparent);
				backdrop-filter: blur(12px);
			}
		}
	}

	/* Without scroll-state queries a browser can't tell pinned from resting, so the
	   ground stays on; at rest it is the page's own colour and barely shows. */
	@supports not (container-type: scroll-state) {
		@media (min-width: 769px) {
			.header-scroll > :global(header) {
				background: color-mix(in srgb, var(--color-bg-layer-0) 70%, transparent);
				backdrop-filter: blur(12px);
			}
		}
	}

	.portfolio-container {
		/* Visible so the cards' brand outline / elevation shadows aren't clipped. */
		overflow: visible;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		width: 100%;
		min-height: 89vh;
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

	.category-container.row-2,
	.category-container.row-3 {
		justify-content: center;
		height: 40%;
	}

	@media (max-width: 768px) {
		.portfolio-container {
			min-height: auto;
			padding: 1rem 0;
		}

		.category-container {
			flex-direction: column;
			align-items: center;
			gap: 1rem;
			height: auto;
		}

		.category-container.row-2,
		.category-container.row-3 {
			height: auto;
		}
	}
</style>
