<svelte:head>
	<title>Web</title>
	<meta name="description" content="stuff from the web" />
</svelte:head>

<script lang="ts">
  import { webProjects, webContentMap } from '$lib/data/webProjects';
  import Header from '../Header.svelte';
  import SVGFilters from '$lib/components/ui/SVGFilters.svelte';

  import { useSound } from "$lib/hooks/useSound";
  import { applyClickSound } from "$lib/hooks/applyClickSound";
  import click from "$lib/sounds/click.wav";
  import expand from "$lib/sounds/expand.wav";

  const expand_sound = useSound(expand,["expand"]);
  const click_sound = useSound(click,["click"]);

  let selectedImage = $state('Splash');
</script>

<section>
<Header />
</section>

<section>
<div class="wrapper-column">
  {#if webContentMap[selectedImage]}
    <h1 class="header-text glow-filter" data-text={webContentMap[selectedImage].title} style="margin-bottom: {selectedImage.includes('Splash') ? '10rem' : '0'}"></h1>
    {#if webContentMap[selectedImage].description}
    <p use:applyClickSound style="margin-bottom: {selectedImage.includes('Medium') ? '3rem' : '0'};margin-top: {selectedImage.includes('Medium') ? '4rem' : '2rem'}; text-wrap:balanced;">
    {@html webContentMap[selectedImage].description}</p>
    {/if}    
    {#if webContentMap[selectedImage].link}
      <a href={webContentMap[selectedImage].link} target="_blank" rel="noopener noreferrer">
        {#if click_sound}
        <button class="button" use:click_sound>More Stuff</button>
        {:else}
        <button class="button">More Stuff</button>
        {/if}
      </a>
    {/if}
  {/if}
<div class="wrapper">
  <div class="items">
    {#each webProjects as project}
      {#if expand_sound}
      <div
        class="item"
        tabindex="0"
        role="button"
        style="--initial-img: url({project.initialImg}); --active-img: url({project.activeImg});"
        onclick={(event) => {
          if (selectedImage === project.title) {
            selectedImage = 'Splash';
            const target = event.target as HTMLElement | null;
            target?.blur();
          } else {
            selectedImage = project.title;
          }
        }}
        use:expand_sound
      ></div>
      {:else}
      <div
        class="item"
        tabindex="0"
        role="button"
        style="--initial-img: url({project.initialImg}); --active-img: url({project.activeImg});"
        onclick={(event) => {
          if (selectedImage === project.title) {
            selectedImage = 'Splash';
            const target = event.target as HTMLElement | null;
            target?.blur();
          } else {
            selectedImage = project.title;
          }
        }}
      ></div>
      {/if}
    {/each}
  </div>      
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

.wrapper-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
}

.wrapper{
    margin-top: 10rem;
}

.glow-filter {
   display: flex; 
    justify-content: center; 
    align-items: center; 
  animation: onloadscale 1s ease-out forwards;
}

:global(p a) {
    color: #86868b;
    text-decoration: none;
    background: linear-gradient(0deg,#67676b 0%, #bdc2c9 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    font-weight: 600;
  }

  :global(p a::after) {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: linear-gradient(90deg,#67676b 0%, #bdc2c9 100%);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  :global(p a:hover::after) {
    transform: scaleX(1);
    transform-origin: left;
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

.button {
  padding: 15px 30px;
  color: var(--text-color);
  font-size: 14px;
  border-radius: var(--border-radius);
  transition: color var(--transition-speed), background var(--transition-speed);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: .5rem;
  background: transparent;
  color: var(--accent-color);
}

.button::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: -100%;
  background: var(--accent-color);
  z-index: -1;
  transition: all var(--transition-speed);
}

.button:hover::before {
  left: 0;
}

.button:hover {
  color: var(--text-color);
}

.items{
    display: flex;
    gap: 0.4rem;
    perspective: calc(var(--index) * 35);
}

.item{
    width: calc(var(--index) * 3);
    height: calc(var(--index) * 12);
    background-color: #222;
    background-size: cover;
    background-position: center;
    cursor: pointer;
    filter: grayscale(1) brightness(.5);
    transition: transform 1.25s var(--transition), filter 3s var(--transition), width 1.25s var(--transition);
    will-change: transform, filter, rotateY, width;
}

.item::before, .item::after{
    content: '';
    position: absolute;
    height: 100%;
    width: 20px;
    right: calc(var(--index) * -1);
}

.item::after{
    left: calc(var(--index) * -1);
}

.items .item:hover{
    filter: inherit;
    transform: translateZ(calc(var(--index) * 10));
}

/*Right*/

.items .item:hover + *{
    filter: inherit;
    transform: translateZ(calc(var(--index) * 8.5)) rotateY(35deg);
    z-index: -1;
}

.items .item:hover + * + *{
    filter: inherit;
    transform: translateZ(calc(var(--index) * 5.6)) rotateY(40deg);
    z-index: -2;
}

.items .item:hover + * + * + *{
    filter: inherit;
    transform: translateZ(calc(var(--index) * 2.5)) rotateY(30deg);
    z-index: -3;
}

.items .item:hover + * + * + * + *{
    filter: inherit;
    transform: translateZ(calc(var(--index) * .6)) rotateY(15deg);
    z-index: -4;
}


/*Left*/

.items .item:has( + :hover){
    filter: inherit;
    transform: translateZ(calc(var(--index) * 8.5)) rotateY(-35deg);
}

.items .item:has( + * + :hover){
    filter: inherit;
    transform: translateZ(calc(var(--index) * 5.6)) rotateY(-40deg);
}

.items .item:has( + * + * + :hover){
    filter: inherit;
    transform: translateZ(calc(var(--index) * 2.5)) rotateY(-30deg);
}

.items .item:has( + * + * + * + :hover){
    filter: inherit;
    transform: translateZ(calc(var(--index) * .6)) rotateY(-15deg);
}

.items .item:active, .items .item:focus {
	width: 28vw;
	filter: inherit;
	z-index: 100;
	transform: translateZ(calc(var(--index) * 10));
    margin: 0 .45vw;
}

.items .item:focus {
  background-image: var(--active-img);
  filter: brightness(1.1); 
  transform: scale(1.9); 
}

.items .item{
  background-image: var(--initial-img);
  
}

</style>