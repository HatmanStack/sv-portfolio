<script>
  export let data;
  import Header from '../../../Header.svelte';

  $: titleWords = data.title.split(' ');
  $: firstHalf = titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(' ');
  $: secondHalf = titleWords.slice(Math.ceil(titleWords.length / 2)).join(' ');
  $: needsSplit = titleWords.length > 6;
  import { applyClickSound } from "$lib/hooks/applyClickSound";
  import { useSound } from "$lib/hooks/useSound";
	import click from "$lib/sounds/click.wav";
	const click_sound = useSound(click,["click"])

</script>

<article>
<Header />
{#if needsSplit}
    <h1 class="header-text glow-filter" style="margin-top:.3em;" data-text={firstHalf}/>
    <h1 class="header-text glow-filter" style="margin-top:1.3em;" data-text={secondHalf}/>
  {:else}
    <h1 class="header-text glow-filter" style="margin-top:.3em;" data-text={data.title}/>
  {/if}
<div class="post-layout" use:applyClickSound><br>
   <svelte:component this={data.content} />
  <p text-align="center"><a href={data.link} target="_blank" rel="noopener noreferrer">Read on Medium</a></p>
  </div>
</article>

<section>
    <svg class="filters" width='1440px' height='300px' viewBox='0 0 1440 300' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <filter id="glow-4" color-interpolation-filters="sRGB" x="-50%" y="-200%" width="200%" Height="500%">
            <feGaussianBlur in="SourceGraphic" data-target-blur="4" stdDeviation="4" result="blur4"/>
            <feGaussianBlur in="SourceGraphic" data-target-blur="19" stdDeviation="19" result="blur19"/>
            <feGaussianBlur in="SourceGraphic" data-target-blur="9" stdDeviation="9" result="blur9"/>
            <feGaussianBlur in="SourceGraphic" data-target-blur="30" stdDeviation="30" result="blur30"/>
            <feColorMatrix in="blur4" result="color-0-blur" type="matrix" values="1 0 0 0 0
                      0 0.9803921568627451 0 0 0
                      0 0 0.9647058823529412 0 0
                      0 0 0 0.8 0"/>
            <feOffset in="color-0-blur" result="layer-0-offsetted" dx="0" dy="0" data-target-offset-y="0"/>
            <feColorMatrix in="blur19" result="color-1-blur" type="matrix" values="0.8156862745098039 0 0 0 0
                      0 0.49411764705882355 0 0 0
                      0 0 0.2627450980392157 0 0
                      0 0 0 1 0"/>
            <feOffset in="color-1-blur" result="layer-1-offsetted" dx="0" dy="2" data-target-offset-y="2"/>
            <feColorMatrix in="blur9" result="color-2-blur" type="matrix" values="1 0 0 0 0
                      0 0.6666666666666666 0 0 0
                      0 0 0.36470588235294116 0 0
                      0 0 0 0.65 0"/>
            <feOffset in="color-2-blur" result="layer-2-offsetted" dx="0" dy="2" data-target-offset-y="2"/>
            <feColorMatrix in="blur30" result="color-3-blur" type="matrix" values="1 0 0 0 0
                      0 0.611764705882353 0 0 0
                      0 0 0.39215686274509803 0 0
                      0 0 0 1 0"/>
            <feOffset in="color-3-blur" result="layer-3-offsetted" dx="0" dy="2" data-target-offset-y="2"/>
            <feColorMatrix in="blur30" result="color-4-blur" type="matrix" values="0.4549019607843137 0 0 0 0
                      0 0.16470588235294117 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"/>
            <feOffset in="color-4-blur" result="layer-4-offsetted" dx="0" dy="16" data-target-offset-y="16"/>
            <feColorMatrix in="blur30" result="color-5-blur" type="matrix" values="0.4235294117647059 0 0 0 0
                      0 0.19607843137254902 0 0 0
                      0 0 0.11372549019607843 0 0
                      0 0 0 1 0"/>
            <feOffset in="color-5-blur" result="layer-5-offsetted" dx="0" dy="64" data-target-offset-y="64"/>
            <feColorMatrix in="blur30" result="color-6-blur" type="matrix" values="0.21176470588235294 0 0 0 0
                      0 0.10980392156862745 0 0 0
                      0 0 0.07450980392156863 0 0
                      0 0 0 1 0"/>
            <feOffset in="color-6-blur" result="layer-6-offsetted" dx="0" dy="64" data-target-offset-y="64"/>
            <feColorMatrix in="blur30" result="color-7-blur" type="matrix" values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0.68 0"/>
            <feOffset in="color-7-blur" result="layer-7-offsetted" dx="0" dy="64" data-target-offset-y="64"/>
            <feMerge>
                <feMergeNode in="layer-0-offsetted"/>
                <feMergeNode in="layer-1-offsetted"/>
                <feMergeNode in="layer-2-offsetted"/>
                <feMergeNode in="layer-3-offsetted"/>
                <feMergeNode in="layer-4-offsetted"/>
                <feMergeNode in="layer-5-offsetted"/>
                <feMergeNode in="layer-6-offsetted"/>
                <feMergeNode in="layer-7-offsetted"/>
                <feMergeNode in="layer-0-offsetted"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    </defs>
</svg>
</section>


<style>
  .post-layout {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  :global(.post-layout a) {
    color: #86868b;
    text-decoration: none;
    background: linear-gradient(0deg,#67676b 0%, #bdc2c9 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    font-weight: 600;
  }

  :global(.post-layout a::after) {
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

  :global(.post-layout a:hover::after) {
    transform: scaleX(1);
    transform-origin: left;
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
    color:rgb(0, 0, 0);
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

  .glow-filter {
   display: flex; 
    justify-content: center; 
    align-items: center; 
  animation: onloadscale 1s ease-out forwards;
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

svg.filters {
  height: 0;
  width: 0;
  position: absolute;
  z-index: -1;
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