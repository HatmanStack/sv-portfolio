<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
  	let mounted = false;
	
	onMount(async () => {
    console.log('page mounted');
    setTimeout(() => {
      console.log('showing content now');
      mounted = true;
    }, 1000); 
  });
</script>

<div class="page-content" class:visible={mounted}>
<div class="app">
	<main>
	  <slot />
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
