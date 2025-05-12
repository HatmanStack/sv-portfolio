<svelte:head>
<title>Home</title>
	<meta name="description" content="CG - Portfolio with Stuff" />
  <meta property="og:title" content="CG - Portfolio with Stuff" />
  <meta property="og:description" content="A portfolio made with some of my favorite Codepen.io's from 2024" />
  <meta property="og:image" content={sloth} /> 
  <meta property="og:url" content="https://www.cg-portfolio.com" />
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="CG - Portfolio with Stuff">
  <meta name="twitter:description" content="A portfolio made with some of my favorite Codepen.io's from 2024">
  <meta name="twitter:image" content={sloth} />
</svelte:head>



<script lang="ts">

  import { onMount } from 'svelte';
  import { goto } from '$app//navigation';
  import { browser } from '$app/environment';

  const REDIRECT_FLAG = 'firefoxRedirected';
  

  onMount(() => {
   if (browser && navigator.userAgent.includes("Firefox")) {
   const scrollContainer = document.querySelector('.scroll-container');
   if (scrollContainer) { // Check if the element was found
    scrollContainer.style.display = 'none';
  }
   
   if (!sessionStorage.getItem(REDIRECT_FLAG)) {
     
        goto('/read'); 
        sessionStorage.setItem(REDIRECT_FLAG, 'true');
      }
    }
  });
	import '../app.css';
	import Header from './Header.svelte';

  import nba from '$lib/images/nba.gif';
  import novaCanvas from '$lib/images/nova-canvas.gif';
  import pixelPrompt from '$lib/images/pixel-prompt.gif';
  import italian from '$lib/images/italian_short.avif';
  import plotPalette from '$lib/images/plotpalette.gif';
  import ppMedium from '$lib/images/pp-medium.gif';
  import savorSwipe from '$lib/images/savorswipe.gif';
  import stockLog from '$lib/images/stock-log.gif';
  import stocks from '$lib/images/stock.gif';
  import stockSent from '$lib/images/stock-sent.gif';
  import studioBrowser from '$lib/images/as-medium.gif';
  import trachtenberg from '$lib/images/trachtenberg.gif';
  import twa from '$lib/images/twa_short.avif';
  import vocab from '$lib/images/vocabulary.gif';
  import whoami from '$lib/images/name-check.gif';
  import credentials from '$lib/images/credentials_short.avif';
  import canvasMedium from '$lib/images/canvas-medium.gif';
  import cbExpoMedium from '$lib/images/cb-expo-medium.gif';
  import cbRnFastMedium from '$lib/images/cb-rn-fast-medium.gif';
  import connector from '$lib/images/connector.gif';
  import connectorMedium from '$lib/images/connector-medium.gif';
  import float from '$lib/images/float.gif';
  import hugMedium from '$lib/images/hug-medium.gif';
  import instant from '$lib/images/instant.avif';
  import looper from '$lib/images/looper_short.avif';
  import movies from '$lib/images/movies_short.avif';
  import floata from '$lib/images/float.avif';
  import novaCanvasa from '$lib/images/nova-canvas.avif';
  import savorSwipea from '$lib/images/savorswipe.avif';
  import floatj from '$lib/images/float.jpg';
  import novaCanvasj from '$lib/images/nova-canvas.jpg';
  import savorSwipej from '$lib/images/savorswipe.jpg';
  import sloth from '$lib/images/sloth_stuff.jpg'

  import { useSound } from "$lib/components/useSound";
  import click from "$lib/sounds/click.wav";
  const click_sound = useSound(click,["click"])

  
</script>


<section>
<div class="scroll-container">
	<div class="stuck-grid">
  <div class="grid-item"><img src={nba} alt="nba" /></div>
  <div class="grid-item"><img src={novaCanvas} alt="nova-canvas" /></div>
  <div class="grid-item"><img src={pixelPrompt} alt="pixel-prompt" /></div>
  <div class="grid-item"><img src={italian} alt="italian" /></div>
  <div class="grid-item"><img src={plotPalette} alt="plotpalette" /></div>
  <div class="grid-item"><img src={ppMedium} alt="pp-medium" /></div>
  <div class="grid-item"><img src={savorSwipe} alt="savorswipe" /></div>
  <div class="grid-item"><img src={stockLog} alt="stock-log" /></div>
  <div class="grid-item"><img src={stocks} alt="stocks" /></div>
  <div class="grid-item"><img src={stockSent} alt="stock-sent" /></div>
  <div class="grid-item special"><p ><b>I'm Chris...Here's Some Stuff.</b></p></div>
  <div class="grid-item"><img src={studioBrowser} alt="studio-browser" /></div>
  <div class="grid-item"><img src={trachtenberg} alt="trachtenberg" /></div>
  <div class="grid-item"><img src={credentials} alt="credentials" /></div>
  <div class="grid-item"><img src={twa} alt="twa" /></div>
  <div class="grid-item"><img src={vocab} alt="vocab" /></div>
  <div class="grid-item"><img src={whoami} alt="whoami" /></div>
  <div class="grid-item"><img src={canvasMedium} alt="canvas-medium" /></div>
  <div class="grid-item"><img src={cbExpoMedium} alt="cb-expo-medium" /></div>
  <div class="grid-item"><img src={cbRnFastMedium} alt="cb-rn-fast" /></div>
  <div class="grid-item"><img src={connector} alt="connector" /></div>
  <div class="grid-item"><img src={connectorMedium} alt="connector-medium" /></div>
  <div class="grid-item"><img src={float} alt="float" /></div>
  <div class="grid-item"><img src={hugMedium} alt="hug-medium" /></div>
  <div class="grid-item"><img src={instant} alt="instant" /></div>
  <div class="grid-item"><img src={looper} alt="looper" /></div>
  <div class="grid-item"><img src={credentials} alt="credentials" /></div>
  <div class="grid-item"><img src={movies} alt="movies" /></div>
  <div class="grid-item"><img src={nba} alt="nba" /></div>
  <div class="grid-item"></div>
  <div class="grid-item"><img src={pixelPrompt} alt="pixel-prompt" /></div>
  <div class="grid-item"><img src={italian} alt="italian" /></div>
  <div class="grid-item"><img src={plotPalette} alt="plotpalette" /></div>
  <div class="grid-item"><img src={ppMedium} alt="pp-medium" /></div>
  <div class="grid-item"><img src={savorSwipe} alt="savorswipe" /></div>
  <div class="grid-item"><img src={stockLog} alt="stock-log" /></div>
  <div class="grid-item"><img src={stocks} alt="stocks" /></div>
  <div class="grid-item"><img src={stockSent} alt="stock-sent" /></div>
  <div class="grid-item"><img src={studioBrowser} alt="studio-browser" /></div>
  <div class="grid-item"><img src={trachtenberg} alt="trachtenberg" /></div>
  <div class="grid-item"><img src={twa} alt="twa" /></div>
  <div class="grid-item"><img src={whoami} alt="whoami" /></div>
  <div class="grid-item"><img src={cbRnFastMedium} alt="cb-rn-fast" /></div>
  <div class="grid-item"><img src={connector} alt="connector" /></div>
  <div class="grid-item"><img src={connectorMedium} alt="connector-medium" /></div>
  <div class="grid-item"><img src={float} alt="float" /></div>
  <div class="grid-item"><img src={hugMedium} alt="hug-medium" /></div>
  <div class="grid-item"><img src={instant} alt="instant" /></div>
  <div class="grid-item"><img src={novaCanvas} alt="nova-canvas" /></div>
</div>
</div>

</section>
<section class="header-scroll">
<Header />
</section>

<section class="container">
	<div class="category_container">
		<div class="content">
			<img src={floata} class="profession_image" alt="Profession" />
			<img src={floatj} class="profile_image" alt="Profile" />
			<div class="profile_detail">
				<span>Float</span>
				<p>Cross-Platform</p>
			</div>
			<div class="wrapper" >			
				<div class="profile_quote">
					<p style="font-size:.8em" class="fade-in">Float is a cross-platform meditation app built with React Native and Expo. It uses Google Generative AI, Google TTS, and a library of sound files to create personalized meditation experiences based on user-submitted incidents that have affected them emotionally, which we refer to as “floats”. Floats are categorized by emotion and intensity, featuring a timer and a color scheme that convey the duration, summary, and reasoning for the category.</p>
				<a href="https://float-app.fun" >
        <button type="button" class="gooey-button" use:click_sound>
            Meditate
        </button></a>
        </div>
			</div>
		</div>
		<div class="content">
			<img src={novaCanvasa} class="profession_image" alt="Profession" />
			<img src={novaCanvasj} class="profile_image" alt="Profile" />
			<div class="profile_detail">
				<span>Nova Canvas</span>
				<p>Web</p>
			</div>
			<div class="wrapper" >				
				<div class="profile_quote">
					<p style="font-size:.8em" class="fade-in">The AWS Nova Canvas foundation model presented in a gradio app. The model enables users to generate, edit, and refine images through sophisticated tools like text-to-image generation, inpainting, outpainting, and background removal. Users can explore innovative image creation methods, including color-guided content manipulation and image conditioning, providing control over visual design and artistic expression.</p>

				<a href="https://t7bmxtdc6ojbkd3zgknxe32xdm0oqxkw.lambda-url.us-west-2.on.aws/" >

        <button type="button" class="gooey-button" use:click_sound>
            Infer
        </button></a>
        </div>
			</div>
		</div>
		<div class="content">
			<img src={savorSwipea} class="profession_image" alt="Profession" />
			<img src={savorSwipej} class="profile_image" alt="Profile" />
			<div class="profile_detail">
				<span>Savor Swipe</span>
				<p>Cross-Platform</p>
			</div>
			<div class="wrapper" >				
				<div class="profile_quote">
					<p style="font-size:.8em" class="fade-in">SavorSwipe is a recipe discovery app that lets you swipe through dishes to decide what to make. When adding a recipe, simply take a picture of either the ingredients or the directions. The app uses OpenAI’s OCR technology to automatically extract the relevant information, then leverages Google’s Custom Search API to find matching food images. This creates a visual collection of dishes that you can easily swipe through.</p>
				<a href="https://savorswipe.fun" >
        <button type="button" class="gooey-button" use:click_sound>
            Eat
        </button></a>
        </div>
			</div>
		</div>
	</div>
</section>


<svg width="0" height="0" style="position: absolute;">
  <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
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
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");
:root {
  --dark: #121212;
  --light: #ffffff;
  --gap: 0.5rem;
}

.container {
  overflow: hidden; 
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 89vh;
  background-image: var(--bg-color);
}

.category_container {
  display: flex;
  justify-content: space-between;
  align-items: stretch; 
  flex-wrap: nowrap;
  gap: calc(var(--gap) * 2);
  width: 100%;
  height: 80%; 
}

.content {
  --active: 0;
  cursor: pointer;
  overflow: hidden; 
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1.5rem;
  padding: 2.5rem;
  width: calc((100% / 3) - var(--gap));
  height: 100%;
  border-radius: 1rem;
  transition: all 0.5s ease-in-out;
}

.content:hover {
  --active: 1;
  width: calc(90% - var(--gap));
}

.content::before {
  content: "";
  position: absolute;
  z-index: -10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark);
  opacity: 0.6;
  transition: opacity 0.3s ease-in-out;
}

.content:hover::before {
  opacity: 0.8;
}

.content img {
  position: absolute;
  z-index: -20;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s ease-in-out;
}

.content .profession_image {
  opacity: var(--active);
  transform: scale(1.1);
  transition: 
    opacity 0.3s ease-in-out,
    transform 0.5s ease-in-out;
}

.content .profile_image {
  opacity: calc(1 - var(--active));
  transition: 
    opacity 0.3s ease-in-out,
    transform 0.5s ease-in-out;
}

.content:hover .profession_image {
  transform: scale(1);
}

.profile_detail {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 12rem;
  transition: transform 0.5s cubic-bezier(0.23, 0.93, 0.77, 1) 0.01s;
  z-index: 1;
}

.profile_detail span {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--light);
  text-wrap: nowrap;
}

.profile_detail p {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--light);
}

.wrapper {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: grid-template-rows 0.5s cubic-bezier(0.23, 0.93, 0.77, 1) 0.01s;
}

.profile_quote {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-height: 0;
  width: 100%;
  transform: translateY(50%);
  opacity: 0;
  transition: 
    opacity 0.8s ease-in-out,
    transform 0.8s cubic-bezier(0.23, 0.93, 0.77, 1) 0.01s;
  z-index: 1;
}

.profile_quote p {
  flex: 1;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--light);
}

.profile_quote button {
    flex-shrink: 0;
  }

.content:hover .wrapper {
  grid-template-rows: 1fr;
}

.content:hover .profile_quote {
  transform: none;
  opacity: 1;
}

.fade-in  {
    opacity: 0;
}

.content:hover .profile_detail{
    opacity: 0;
    animation: fadeIn 1s ease-in 0.3s forwards;
}

.content:hover .fade-in {
    animation: fadeIn 1s ease-in 0.3s forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

	@keyframes zoom-in {
  0% {
    transform: translateZ(-1000px);
    opacity: 0;
    filter: blur(5px);
  }
  50% {
    transform: translateZ(0px);
    opacity: 1;
    filter: blur(0px);
  }
  100% {
    transform: translateZ(1000px);
    opacity: 0;
    filter: blur(5px);
  }
}

button {
    --hue: 170deg;
    --button: hsl(var(--hue), 66%, 66%);
    --size: 1em;
    border: none;
    background: transparent;
    color: hsla(var(--hue), 80%, 30%, 0.7);
    font-size: 1.8em;
    position: relative;
    padding: calc(var(--size)) calc(var(--size)*1.5);
    animation: color 20s linear infinite both;
    scale: 0.92;
    isolation: isolate;
    &:hover {
        transition-duration: .5s, 1s;
        box-shadow: none;
        opacity: 1;
        scale: 1;
    }
}

button:before {
    content: "";
    position: absolute;
    pointer-events: none;
    inset: 0em;
    border: none;
    filter: blur(12px) url(#goo) drop-shadow(0 .25em .5em hsla(0deg, 0%, 0%, 0.8)); 
    background-image:
        linear-gradient(0deg,var(--button),var(--button));
    background-clip: content-box, border-box;
    padding: 20px;
    z-index: -1;
    border: inherit;
    animation: color 20s linear infinite both; 
}

@property --hue {
    syntax: "<angle>";
    initial-value: 170deg;
    inherits: false;
}

@keyframes color {
    from {
        --hue: 170deg;
    }
    to {
        --hue: 530deg;
    }
}


.scroll-container {
  height: 300vh; 
  position: relative;
}

.stuck-grid {
  block-size: 100svh;
  perspective: 1000px;
  transform-style: preserve-3d;

  display: grid;
  grid: repeat(4, 25dvh) / repeat(4, 25dvw);;
  place-items: center;

  position: sticky;
  top: 0;

  overflow: clip;

  > .grid-item {
    transform-style: preserve-3d;

    font-size: 5vmin;
    font-weight: lighter;

    text-wrap: nowrap;

    @supports (animation-timeline: scroll()) {
      @media (prefers-reduced-motion: no-preference) {
        animation: zoom-in linear both;
        animation-timeline: scroll(root block);
        will-change: transform, opacity, filter;
      }
    }

    &.special.special {
      grid-row: 2 / span 2;
      grid-column: 2 / span 2;
    }
    &:nth-of-type(1)  { animation-range: 40% 50% }
    &:nth-of-type(2)  { animation-range: 20% 30% }
    &:nth-of-type(3)  { animation-range: 52% 62% }
    &:nth-of-type(4)  { animation-range: 50% 60% }
    &:nth-of-type(5)  { animation-range: 45% 55% }
    &:nth-of-type(6)  { animation-range: 10% 20% }
    &:nth-of-type(7)  { animation-range: 90% 100% }
    &:nth-of-type(8)  { animation-range: 30% 40% }
    &:nth-of-type(9)  { animation-range: 80% 90% }
    &:nth-of-type(10) { animation-range: 70% 80% }
    &:nth-of-type(11) { animation-range: -10% 50% }
    &:nth-of-type(12) { animation-range: 52% 62% }
    &:nth-of-type(13) { animation-range: 15% 25% }
    &:nth-of-type(14) { animation-range: 7% 17% }
    &:nth-of-type(15) { animation-range: 75% 85% }
    &:nth-of-type(16) { animation-range: 3% 13% }
    &:nth-of-type(17) { animation-range: 87% 97% }
    &:nth-of-type(18) { animation-range: 42% 52% }
    &:nth-of-type(19) { animation-range: 57% 67% }
    &:nth-of-type(20) { animation-range: 37% 47% }
    &:nth-of-type(21) { animation-range: 12% 22% }
    &:nth-of-type(22) { animation-range: 8% 18% }
    &:nth-of-type(23) { animation-range: 84% 94% }
    &:nth-of-type(24) { animation-range: 33% 43% }
    &:nth-of-type(25) { animation-range: 48% 58% }
    &:nth-of-type(26) { animation-range: 13% 23% }
    &:nth-of-type(27) { animation-range: 78% 88% }
    &:nth-of-type(28) { animation-range: 62% 72% }
    &:nth-of-type(29) { animation-range: 31% 41% }
    &:nth-of-type(30) { animation-range: 8% 18% }
    &:nth-of-type(31) { animation-range: 4% 14% }
    &:nth-of-type(32) { animation-range: 74% 84% }
    &:nth-of-type(33) { animation-range: 61% 71% }
    &:nth-of-type(34) { animation-range: 26% 36% }
    &:nth-of-type(35) { animation-range: 63% 73% }
    &:nth-of-type(36) { animation-range: 11% 21% }
    &:nth-of-type(37) { animation-range: 89% 99% }
    &:nth-of-type(38) { animation-range: 33% 43% }
    &:nth-of-type(39) { animation-range: 88% 98% }
    &:nth-of-type(40) { animation-range: 22% 32% }
    &:nth-of-type(41) { animation-range: 16% 26% }
    &:nth-of-type(42) { animation-range: 26% 36% }
    &:nth-of-type(43) { animation-range: 66% 76% }
    &:nth-of-type(44) { animation-range: 3% 13% }
    &:nth-of-type(45) { animation-range: 44% 54% }
    &:nth-of-type(46) { animation-range: 11% 21% }
    &:nth-of-type(47) { animation-range: 23% 33% }
    &:nth-of-type(48) { animation-range: 39% 49% }
    &:nth-of-type(49) { animation-range: 59% 69% }
    &:nth-of-type(50) { animation-range: 6% 16% }
    
    @supports (animation-timeline: scroll()) {

      &:nth-of-type(1) { grid-area: 1/1 }
      &:nth-of-type(2) { grid-area: 1/2 }
      &:nth-of-type(3) { grid-area: 1/3 }
      &:nth-of-type(4) { grid-area: 1/4 }
      &:nth-of-type(5) { grid-area: 2/1 }
      &:nth-of-type(6) { grid-area: 2/2 }
      &:nth-of-type(7) { grid-area: 2/3 }
      &:nth-of-type(8) { grid-area: 2/4 }
      &:nth-of-type(9) { grid-area: 3/1 }
      &:nth-of-type(10) { grid-area: 3/2 }
      &:nth-of-type(11) { grid-area: 3/3 }
      &:nth-of-type(12) { grid-area: 3/4 }
      &:nth-of-type(13) { grid-area: 4/1 }
      &:nth-of-type(14) { grid-area: 4/2 }
      &:nth-of-type(15) { grid-area: 4/3 }
      &:nth-of-type(16) { grid-area: 4/4 }
      &:nth-of-type(17) { grid-area: 2/1 }
      &:nth-of-type(18) { grid-area: 2/2 }
      &:nth-of-type(19) { grid-area: 2/3 }
      &:nth-of-type(20) { grid-area: 2/4 }
      &:nth-of-type(21) { grid-area: 3/1 }
      &:nth-of-type(22) { grid-area: 3/2 }
      &:nth-of-type(23) { grid-area: 3/3 }
      &:nth-of-type(24) { grid-area: 3/4 }
      &:nth-of-type(25) { grid-area: 1/1 }
      &:nth-of-type(26) { grid-area: 1/2 }
      &:nth-of-type(27) { grid-area: 1/3 }
      &:nth-of-type(28) { grid-area: 1/4 }
      &:nth-of-type(29) { grid-area: 4/1 }
      &:nth-of-type(30) { grid-area: 4/2 }
      &:nth-of-type(31) { grid-area: 4/3 }
      &:nth-of-type(32) { grid-area: 4/4 }
      &:nth-of-type(33) { grid-area: 2/1 }
      &:nth-of-type(34) { grid-area: 2/2 }
      &:nth-of-type(35) { grid-area: 2/3 }
      &:nth-of-type(36) { grid-area: 2/4 }
      &:nth-of-type(37) { grid-area: 3/1 }
      &:nth-of-type(38) { grid-area: 3/2 }
      &:nth-of-type(39) { grid-area: 3/3 }
      &:nth-of-type(40) { grid-area: 3/4 }
      &:nth-of-type(41) { grid-area: 1/1 }
      &:nth-of-type(42) { grid-area: 1/2 }
      &:nth-of-type(43) { grid-area: 1/3 }
      &:nth-of-type(44) { grid-area: 1/4 }
      &:nth-of-type(45) { grid-area: 4/1 }
      &:nth-of-type(46) { grid-area: 4/2 }
      &:nth-of-type(47) { grid-area: 4/3 }
      &:nth-of-type(48) { grid-area: 4/4 }
      &:nth-of-type(49) { grid-area: 3/1 }
      &:nth-of-type(50) { grid-area: 3/2 }
      &:nth-of-type(51) { grid-area: 3/3 }
      &:nth-of-type(52) { grid-area: 3/4 }
    }
  }
}

</style>
