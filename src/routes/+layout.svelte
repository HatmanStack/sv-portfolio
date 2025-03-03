<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	let loaded = false;

	onMount(() => {
		console.log('layout mounted');
        setTimeout(() => {
            loaded = true;
        }, 100); 
    });
</script>

{#if loaded}
    <div class="app">
        <main>
            <slot />
        </main>
    </div>
{/if}


<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
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
