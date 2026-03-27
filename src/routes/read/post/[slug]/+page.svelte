<script lang="ts">
	import type { PageData } from './$types';
	import Header from '../../../Header.svelte';
	import SVGFilters from '$lib/components/ui/SVGFilters.svelte';
	import { createApplyClickSound } from '$lib/hooks/useSound.svelte';
	import click from '$lib/sounds/click.wav';
	import { page } from '$app/stores';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let titleWords = $derived(data.title.split(' '));
	let firstHalf = $derived(titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(' '));
	let secondHalf = $derived(titleWords.slice(Math.ceil(titleWords.length / 2)).join(' '));
	let needsSplit = $derived(titleWords.length > 6);

	const applyClickSound = createApplyClickSound(click);

	const SITE_URL = 'https://portfolio.hatstack.fun';
	let postUrl = $derived(SITE_URL + $page.url.pathname);

	let jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			headline: data.title,
			description: data.description,
			datePublished: data.date,
			author: {
				'@type': 'Person',
				name: 'Christopher Galliart',
				url: 'https://www.linkedin.com/in/christopher-galliart-gemenie-labs/'
			},
			publisher: {
				'@type': 'Person',
				name: 'Christopher Galliart'
			},
			url: postUrl,
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': postUrl
			}
		})
	);
</script>

<svelte:head>
	<title>{data.title} | Christopher Galliart</title>
	<meta name="description" content={data.description} />

	<!-- Open Graph -->
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="CG Portfolio" />
	<meta property="og:title" content={data.title} />
	<meta property="og:description" content={data.description} />
	<meta property="og:url" content={postUrl} />
	<meta property="article:author" content="Christopher Galliart" />
	<meta property="article:published_time" content={data.date} />
	<meta property="og:image" content="https://portfolio.hatstack.fun/og-image.jpg" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@HatmanStack" />
	<meta name="twitter:title" content={data.title} />
	<meta name="twitter:description" content={data.description} />
	<meta name="twitter:image" content="https://portfolio.hatstack.fun/og-image.jpg" />

	<!-- JSON-LD BlogPosting -->
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<article>
	<Header />
	<div class="title-desktop">
		{#if needsSplit}
			<h1
				class="header-text glow-filter"
				style="margin-top:.3em;"
				data-text={firstHalf}
				aria-label={firstHalf}
			></h1>
			<h1
				class="header-text glow-filter"
				style="margin-top:1.3em;"
				data-text={secondHalf}
				aria-label={secondHalf}
			></h1>
		{:else}
			<h1
				class="header-text glow-filter"
				style="margin-top:.3em;"
				data-text={data.title}
				aria-label={data.title}
			></h1>
		{/if}
	</div>
	<div class="title-mobile">
		<h1 class="header-text glow-filter" data-text={data.title} aria-label={data.title}></h1>
	</div>
	<div class="post-layout" use:applyClickSound>
		<br />
		<data.content />
		{#if data.link}
			<p style="text-align: center;">
				<a href={data.link} target="_blank" rel="noopener noreferrer">Read on Medium</a>
			</p>
		{/if}
	</div>
</article>

<section>
	<SVGFilters />
</section>

<style>
	.post-layout {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}

	:global(.post-layout a) {
		color: #bdc2c9;
		-webkit-text-fill-color: #bdc2c9;
		text-decoration: none;
		background: rgba(75, 50, 35, 0.35);
		padding: 0.15em 0.4em;
		border-radius: 4px;
		font-weight: 600;
		transition: background 0.3s ease;
	}

	:global(.post-layout a:hover) {
		background: rgba(95, 65, 45, 0.5);
	}

	:global(.post-layout p) {
		margin-bottom: 1.5rem;
	}

	:global(.post-layout h2) {
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	:global(.post-layout pre) {
		margin: 1.5rem 0;
	}

	:global(.post-layout img) {
		display: block;
		margin: 2rem auto;
	}

	:global(.post-layout pre) {
		background: rgba(255, 255, 255, 0.03);
		border-radius: 8px;
		padding: 1rem;
		margin: 1.5rem 0;
		overflow-x: auto;
	}

	:global(.post-layout pre code) {
		color: rgb(0, 0, 0);
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.8em;
		line-height: 1.5;
	}

	:global(.post-layout iframe) {
		display: block;
		margin: 2rem auto;
		max-width: 100%;
		aspect-ratio: 16/9;
	}

	@media (max-width: 600px) {
		:global(.post-layout iframe) {
			width: 100%;
			height: auto;
		}
	}

	p {
		color: #86868b;
		font-weight: 600;
		background: linear-gradient(0deg, #86868b 0%, #bdc2c9 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		max-width: 60em;
		text-align: center;
	}

	.title-mobile {
		display: none;
	}

	@media (max-width: 768px) {
		.title-desktop {
			display: none;
		}

		.title-mobile {
			display: block;
		}

		.header-text {
			white-space: normal;
			font-size: 2em;
		}

		.glow-filter::before {
			position: relative;
		}
	}
</style>
