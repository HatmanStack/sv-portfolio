<script lang="ts">
	import '../app.css';
	import Header from './Header.svelte';
	import one from '$lib/images/1.png';
	import two from '$lib/images/2.png';
	import three from '$lib/images/3.png';
	import onetroll from '$lib/images/troll_1.jpg';
	import twotroll from '$lib/images/troll_2.jpg';
	import threetroll from '$lib/images/troll_3.jpg';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
<div class="scroll-container">
	<div class="stuck-grid">
  <div class="grid-item">oklch()</div>
  <div class="grid-item">scroll()</div>
  <div class="grid-item">text-box-trim</div>
  <div class="grid-item">pow()</div>
  <div class="grid-item">@property</div>
  <div class="grid-item">top-layer</div>
  <div class="grid-item">@view-transition</div>
  <div class="grid-item">var()</div>
  <div class="grid-item">clamp()</div>
  <div class="grid-item">view()</div>
  <div class="grid-item special"><b>CSS</b></div>
  <div class="grid-item">@layer</div>
  <div class="grid-item">@swash</div>
  <div class="grid-item">subgrid</div>
  <div class="grid-item">in oklab</div>
  <div class="grid-item">:popover-open</div>
  <div class="grid-item">abs()</div>
  <div class="grid-item">sin()</div>
  <div class="grid-item">:has()</div>
  <div class="grid-item">::marker</div>
  <div class="grid-item">1cap</div>
  <div class="grid-item">scrollbar-color</div>
  <div class="grid-item">scroll-timeline</div>
  <div class="grid-item">view-timeline</div>
  <div class="grid-item">overlay</div>
  <div class="grid-item">scale</div>
  <div class="grid-item">ascent-override</div>
  <div class="grid-item">initial-letter</div>
  <div class="grid-item">inset</div>
  <div class="grid-item">@container</div>
  <div class="grid-item">accent-color</div>
  <div class="grid-item">color-mix()</div>
  <div class="grid-item">@scope</div>
  <div class="grid-item">@starting-style</div>
  <div class="grid-item">override-colors</div>
  <div class="grid-item">anchor()</div>
  <div class="grid-item">scroll-snap</div>
  <div class="grid-item">::backdrop</div>
  <div class="grid-item">::cue</div>
  <div class="grid-item">:focus-visible</div>
  <div class="grid-item">:user-valid</div>
  <div class="grid-item">:fullscreen</div>
  <div class="grid-item">:dir()</div>
  <div class="grid-item">caret-color</div>
  <div class="grid-item">aspect-ratio</div>
  <div class="grid-item">cross-fade()</div>
  <div class="grid-item">image-set()</div>
  <div class="grid-item">env()</div>
  <div class="grid-item">place-content</div>
  <div class="grid-item">gap</div>
</div>
</div>

</section>



<Header />
<section class="container">

	<div class="category_container">
		<div class="content">
			<img src={one} class="professio_image" alt="Profession" />
			<img src={onetroll} class="profile_image" alt="Profile" />
			<div class="profile_detail">
				<span>John Doe</span>
				<p>UI/UX Designer + Graphic Designer</p>
			</div>

			<div class="wrapper">			
				<div class="profile_quote">
					<p>"UI is the saddle, the stirrups, & the reins. UX is the feeling you get being able to ride the horse."</p>
				</div>
			</div>

		</div>
		<div class="content">
			<img src={two} class="profession_image" alt="Profession" />
			<img src={twotroll} class="profile_image" alt="Profile" />
			<div class="profile_detail">
				<span>Prince Akashi</span>
				<p>Photographer + Model</p>
			</div>
			<div class="wrapper">				
				<div class="profile_quote">
					<p>"If you see something that moves you, and then snap it, you keep a moment."</p>
				</div>
			</div>
		</div>
		<div class="content">
			<img src={three} class="profession_image" alt="Profession" />
			<img src={threetroll} class="profile_image" alt="Profile" />
			<div class="profile_detail">
				<span>Rafaella Mendes</span>
				<p>Fashion Designer + Model</p>
			</div>
			<div class="wrapper">				
				<div class="profile_quote">
					<p>"My mission in life is not merely to survive, but to thrive and to do so with some passion, some compassion, some humor, and some style."</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");

* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

body {
	font-family: "Inter", sans-serif;
}

:root {
	--light: #ffe6e6;
	--dark: #0c0c0c;
}

.container {
	--bg-color: radial-gradient(
		circle at 50% 0%,
		rgba(50, 50, 50, 1) 0%,
		rgba(12, 12, 12, 1) 100%
	);

	overflow: clip;
	position: relative;

	display: flex;
	justify-content: center;
	align-items: center;

	padding: 2rem 5rem;

	width: 100%;
	height: 100dvh;
	background-image: var(--bg-color);
}

.category_container {
	--gap: 0.5rem;

	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: nowrap;
	gap: calc(var(--gap) * 2);

	width: 100%;
	height: 100%;
}

.content {
	--active: 0;

	cursor: pointer;
	overflow: clip;

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

	transition: width 0.5s ease-in-out;
}
.content:hover {
	--active: 1;

	width: calc(70% - var(--gap));
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
}

.content .profile_image {
	opacity: calc(1 - var(--active));

	transition: opacity 0.3s ease-in-out;
}

.profile_detail {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	width: 12rem;
	transition: transform 0.5s cubic-bezier(0.23, 0.93, 0.77, 1) 0.01s;
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

.profile_quote {
	width: 22rem;
	transform: translate(0, calc((1 - var(--active)) * (100% + 2.5rem)));
}

.profile_quote p {
	font-size: 1.5rem;
	font-weight: 600;
	color: var(--light);

	transform: translate(0, calc((1 - var(--active)) * (100% + 2.5rem)));

	transition: transform 0.5s cubic-bezier(0.23, 0.93, 0.77, 1) 0.1s;
}




.wrapper {
	display: grid;
  	grid-template-rows: 0fr;
  	overflow: hidden;
	transition: grid-template-rows 0.5s cubic-bezier(0.23, 0.93, 0.77, 1) 0.01s;
}


.profile_quote { 
	min-height: 0; 
	transform: translateY(50%);
	opacity: 0;
	transition: 
		opacity 0.8s ease-in-out,
		transform 0.8s cubic-bezier(0.23, 0.93, 0.77, 1) 0.01s
	;	
}



.content:hover .wrapper {
  	grid-template-rows: 1fr;
}


.content:hover .profile_quote {
	transform: none;
	opacity: 1;	
}








dialog { position: absolute; z-index: 1; background: none; color: white; border: 0; font-size: .8rem; padding:.5em;}
dialog a { color: whitesmoke; }
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

.scroll-container {
  height: 300vh; /* Extended scroll length */
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

    > b {
      font-size: 15vmin;
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





@layer support {
  * {
    box-sizing: border-box;
    margin: 0;
  }

  html {
    block-size: 100%;
	inline-size: 100%;
    color-scheme: dark light;
  }

  body {
    min-block-size: 400vh;
	inline-size: 100vw; /* Add width control */
    margin: 0;
    padding: 0;
    font-family: system-ui, sans-serif;
  }
}
</style>
