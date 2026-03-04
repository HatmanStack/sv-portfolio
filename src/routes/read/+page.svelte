<svelte:head>
	<title>Blog | Christopher Galliart</title>
	<meta name="description" content="Technical blog posts on AWS, AI/ML, cloud development, and modern web technologies. Tutorials, insights, and project deep-dives by Christopher Galliart." />

	<!-- Open Graph -->
	<meta property="og:type" content="blog" />
	<meta property="og:site_name" content="CG Portfolio" />
	<meta property="og:title" content="Blog | Christopher Galliart" />
	<meta property="og:description" content="Technical blog posts on AWS, AI/ML, cloud development, and modern web technologies." />
	<meta property="og:url" content="https://portfolio.hatstack.fun/read" />
	<meta property="og:image" content="https://portfolio.hatstack.fun/og-image.jpg" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@HatmanStack" />
	<meta name="twitter:title" content="Blog | Christopher Galliart" />
	<meta name="twitter:description" content="Technical blog posts on AWS, AI/ML, cloud development, and modern web technologies." />
	<meta name="twitter:image" content="https://portfolio.hatstack.fun/og-image.jpg" />

	<!-- JSON-LD Blog -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Blog",
		"name": "Christopher Galliart Blog",
		"description": "Technical blog posts on AWS, AI/ML, cloud development, and modern web technologies",
		"url": "https://portfolio.hatstack.fun/read",
		"author": {
			"@type": "Person",
			"name": "Christopher Galliart"
		}
	})}</script>`}
</svelte:head>

<script lang="ts">
  import type { PageData } from './$types';
  import Header from '../Header.svelte';
  import SVGFilters from '$lib/components/ui/SVGFilters.svelte';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  import { useSound } from "$lib/hooks/useSound";
  import click from "$lib/sounds/click.wav";
  const click_sound = useSound(click,["click"])
</script>

<section>
  <Header />
</section>

<section>
  <div class="wrapper-column">
    <h1 class="header-text glow-filter" data-text="Blog Stuff"></h1>
    <div class="articles-list">
  {#each data.posts as post}
    <a href="/read/post/{post.slug}" class="article-link" use:click_sound>
      <div class="article-card">
        <div class="card-header">
          <h2>{post.title}</h2>
          <p class="date">{post.date}</p>
        </div>
        <div class="card-content">
          <p class="description">{post.description}</p>
          <p class="time">{post.time}</p>
        </div>
      </div>
    </a>
  {/each}
</div>
  </div>
</section>


<section>
  <SVGFilters />
</section>


<style>
:root {
  --text-color: #aaaa9f;
  --accent-color: #4c4b43;
  --transition-speed: 0.3s;
  --border-radius: 12px;
  --box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  --index: calc(1vw + 1vh);
    --transition: cubic-bezier(.1, .7, 0, 1);
}

 
 .card-header h2 {
  color: #000000;
  font-size: 1.5rem;
  margin: 0;
  flex: 1;
  white-space: normal;  
  text-align: center;  
  margin-right: 1rem;   
  line-height: 1.3;   
  text-wrap: balanced;  
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;  /* Align items to top when title wraps */
  margin-bottom: 1rem;
  min-height: 2.5rem;
}



  .card-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  .card-content .description {
    flex: 1;
    margin: 0;
  }

  .card-content .time {
    font-size: 0.9rem;
    white-space: nowrap;
    margin: 0;
  }

 .articles-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  .article-link {
    text-decoration: none;
    color: inherit;
  }

  .article-card {
    padding: .6rem;
    border-radius: var(--border-radius);
    background: rgba(255, 255, 255, 0.03);
    transition: transform 0.3s ease, background 0.3s ease;
  }

  .article-card:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.2);
  }

  .article-card h2 {
    color:rgb(51, 51, 51);
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .article-card p {
    color:rgb(51, 51, 51);
    font-size: .8rem;
    text-align: left;
  }

.wrapper-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
}

.glow-filter {
   display: flex; 
    justify-content: center; 
    align-items: center; 
  animation: onloadscale 1s ease-out forwards;
}


.header-text {
  color: #c8c2bd;
  font-size: 3em;
  text-align: center;
  line-height: 1.0625;
  font-weight: 600;
  letter-spacing: -0.009em;
  white-space: nowrap; 
}

.glow-filter::before {
  content: attr(data-text);
  position: absolute;
  pointer-events: none;
  color: #fffaf6;
  background: linear-gradient(0deg, #dfe5ee 0%, #fffaf6 50%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: url(#glow-4);
  -moz-filter: url(#glow-4);
  -webkit-filter: url(#glow-4);
  opacity: 0;
  animation: onloadopacity 1s ease-out forwards;
}

@keyframes onloadscale {
  24% { scale: 1; }
  100% { scale: 1.02; }
}

@keyframes onloadopacity {
  24% { opacity: 0; }
  100% { opacity: 1; }
}


</style>
