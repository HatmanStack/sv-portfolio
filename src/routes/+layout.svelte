<script lang="ts">
	import '../app.css';
	import { appStore } from '$lib/stores/app.svelte.js';
	import { page } from '$app/stores';

	interface Props {
		children: any;
	}

	let { children }: Props = $props();
	let mounted = $state(false);

	const SITE_URL = 'https://portfolio.hatstack.fun';
	let canonicalUrl = $derived(SITE_URL + $page.url.pathname);

	$effect(() => {
		appStore.init(); // Initializes theme, preferences, and listeners

		const timeoutId = setTimeout(() => {
			mounted = true;
		}, 1000);

		return () => clearTimeout(timeoutId);
	});
</script>

<svelte:head>
	<link rel="canonical" href={canonicalUrl} />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Christopher Galliart" />
</svelte:head>

<div class="page-content" class:visible={mounted}>
<div class="app">
	<main>
	  {@render children()}
	</main>
  </div>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.page-content {
    opacity: 0;
    transition: opacity 0.5s ease-out;
  }
  
  .visible {
    opacity: 1;
  }

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}
	
</style>
