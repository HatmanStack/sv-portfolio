<svelte:head>
	<title>Android</title>
	<meta name="description" content="stuff from google play" />
</svelte:head>

<script>
  import { androidApps, androidContentMap } from '$lib/data/androidApps';
  import Header from '../Header.svelte';
  import AndroidFilters from '$lib/components/ui/AndroidFilters.svelte';
  
  let selectedImage = 'Android Stuff';

  import { useSound } from "$lib/components/useSound";
  import click from "$lib/sounds/click.wav";
  import swoosh from "$lib/sounds/swoosh.mp3";
  const click_sound = useSound(click,["click"])
  const swoosh_sound = useSound(swoosh,["swoosh"])
</script>

<section style="margin-bottom:1rem;">
<Header />
</section>


<section>
  <fieldset class="app-grid">
    {#each androidApps as app}
      <label class="app-item" style="--initial-img: url({app.initialImg}); --active-img: url({app.activeImg});">
         <input type="radio" name="images" on:change="{() => selectedImage = app.title}" use:swoosh_sound>
      </label>
    {/each}
    <div class="content-panel">
      {#if androidContentMap[selectedImage]}
        <h1 class="app-title" data-text={androidContentMap[selectedImage].title}>{androidContentMap[selectedImage].title}</h1>
        {#if androidContentMap[selectedImage].description}
        <p class="app-description">{androidContentMap[selectedImage].description}</p>
        {/if}
        {#if androidContentMap[selectedImage].link}
        <a href={androidContentMap[selectedImage].link} target="_blank" rel="noopener noreferrer">
          <button class="cta-button" use:click_sound>Play Store Stuff</button>
        </a>
        {/if}
      {/if}
    </div>
  </fieldset>

  <AndroidFilters />
</section>

<style>
  /* CSS Variables */
  :root {
    --text-color: #aaaa9f;
    --accent-color: #4c4b43;
    --transition-speed: 0.3s;
    --border-radius: 50px;
    --glow-color: #fffaf6;
    --ease-spring: cubic-bezier(0.1, 0.7, 0, 1);
  }

  /* Layout Components */
  .header-section {
    margin-bottom: 1rem;
  }

  .android-gallery {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  /* App Grid */
  .app-grid {
    display: grid;
    width: 100vw;
    max-width: 100%; 
    height: 89vh;
    border: none;
    margin: 0;
    padding: 0;
    gap: 1rem;
    grid-template-columns: 
      var(--col-1, 1fr) 
      var(--col-2, 1fr) 
      var(--col-3, 1fr) 
      var(--col-4, 1fr) 
      var(--col-5, 1fr)
      var(--col-6, 1fr)
      var(--col-7, 4fr);
    
    transition: grid-template-columns 2s var(--ease-spring);
  }

  .app-item {
    background-image: var(--initial-img);
    background-position: center;
    background-size: auto 125%;
    background-repeat: no-repeat;
    position: relative;
    cursor: pointer;
    border-radius: 50px;
    transition: background-image 0.3s ease;
  }

  .app-item:focus-within {
    outline: 3px solid var(--accent-color);
    outline-offset: 5px;
  }

  .app-item input {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    cursor: pointer;
  }

  /* Grid State Changes */
  .app-grid:has(.app-item:nth-child(1) input:checked) {
    --col-1: 5fr;
    --col-2: 3fr;
  }
  .app-grid:has(.app-item:nth-child(1) input:checked) .app-item:nth-child(1) {
    background-image: var(--active-img);
    background-size: cover;
  }

  .app-grid:has(.app-item:nth-child(2) input:checked) {
    --col-1: 2fr;
    --col-2: 5fr;
    --col-3: 2fr;
  }
  .app-grid:has(.app-item:nth-child(2) input:checked) .app-item:nth-child(2) {
    background-image: var(--active-img);
    background-size: cover;
  }

  .app-grid:has(.app-item:nth-child(3) input:checked) {
    --col-2: 2fr;
    --col-3: 5fr;
    --col-4: 2fr;
  }
  .app-grid:has(.app-item:nth-child(3) input:checked) .app-item:nth-child(3) {
    background-image: var(--active-img);
    background-size: cover;
  }

  .app-grid:has(.app-item:nth-child(4) input:checked) {
    --col-3: 2fr;
    --col-4: 5fr;
    --col-5: 2fr;
  }
  .app-grid:has(.app-item:nth-child(4) input:checked) .app-item:nth-child(4) {
    background-image: var(--active-img);
    background-size: cover;
  }

  .app-grid:has(.app-item:nth-child(5) input:checked) {
    --col-4: 2fr;
    --col-5: 5fr;
    --col-6: 2fr;
  }
  .app-grid:has(.app-item:nth-child(5) input:checked) .app-item:nth-child(5) {
    background-image: var(--active-img);
    background-size: cover;
  }

  .app-grid:has(.app-item:nth-child(6) input:checked) {
    --col-5: 3fr;
    --col-6: 5fr;
  }
  .app-grid:has(.app-item:nth-child(6) input:checked) .app-item:nth-child(6) {
    background-image: var(--active-img);
    background-size: cover;
  }

  /* Content Panel */
  .content-panel {
    display: flex;
    align-items: center;
    flex-direction: column; 
    justify-content: space-around; 
    height: 100%;
    padding: 2rem;
    text-align: center;
  }

  /* Typography */
  .app-title {
    color: #c8c2bd;
    font-size: 3em;
    font-weight: 600;
    letter-spacing: -0.009em;
    line-height: 1.0625;
    margin: 0;
    position: relative;
    animation: titleScale 1s ease-out forwards;
  }

  .app-title::before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    color: var(--glow-color);
    background: linear-gradient(0deg, #dfe5ee 0%, var(--glow-color) 50%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: url(#glow-4);
    opacity: 0;
    animation: titleGlow 1s ease-out forwards;
  }

  .app-description {
    color: #86868b;
    font-weight: 600;
    background: linear-gradient(0deg, #86868b 0%, #bdc2c9 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    max-width: 28em;
    text-wrap: pretty;
    margin: 1rem 0;
  }

  /* CTA Button */
  .cta-button {
    padding: 15px 30px;
    background: transparent;
    border: 2px solid var(--accent-color);
    color: var(--accent-color);
    border-radius: 50px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
    transition: color var(--transition-speed);
  }

  .cta-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: var(--accent-color);
    z-index: -1;
    transition: left var(--transition-speed);
  }

  .cta-button:hover::before {
    left: 0;
  }

  .cta-button:hover {
    color: var(--text-color);
  }


  /* Animations */
  @keyframes titleScale {
    0% { transform: scale(1); }
    24% { transform: scale(1); }
    100% { transform: scale(1.02); }
  }

  @keyframes titleGlow {
    0% { opacity: 0; }
    24% { opacity: 0; }
    100% { opacity: 1; }
  }

  /* Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    .app-grid {
      transition: none;
    }
    
    .app-item {
      transition: none;
    }
    
    .app-title,
    .app-title::before {
      animation: none;
    }
  }
</style>