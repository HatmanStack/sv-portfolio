<script lang="ts">
	import '../app.css';
	import '$lib/styles/variables.scss';
	import '$lib/styles/components.scss';
	import { onMount } from 'svelte';
	import { appStore } from '$lib/stores/app.svelte.js';
	
	interface Props {
		children: any;
	}
	
	let { children }: Props = $props();
  	let mounted = $state(false);
	
	onMount(() => {
		console.log('page mounted');
		appStore.init();
		
		setTimeout(() => {
			console.log('showing content now');
			mounted = true;
		}, 1000); 
	});
</script>

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
