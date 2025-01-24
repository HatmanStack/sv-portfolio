<script lang="ts">
import { onMount } from 'svelte';
	import '../app.css';
	import { page } from '$app/state';
	 import { goto } from '$app/navigation';
	import logo from '$lib/images/logo.svg';
	import github from '$lib/images/github.svg';	


function navigateToContainer(event) {
  event.preventDefault();
  console.log('header');
  const currentPath = window.location.pathname;
  if (currentPath !== '/') {
    goto('/').then(() => {
      scrollToHeaderContainer();
	  
    });
  } else {
    scrollToHeaderContainer();
	
  }
}

function scrollToHeaderContainer() {
  const container = document.querySelector('.header-scroll');
  if (container) {
    container.scrollIntoView({ behavior: 'auto' });
  }
}

     onMount(() => {
        console.log('testHeader');

        const handlePopState = (event) => {
            // Add custom logic here for the back button
            console.log("Back button was pressed");
            // You can navigate or manipulate the state here as needed
        }

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    });

  
</script>

<header>
	<div class="corner">
		<a href="https://gemenielabs.com">
			<img src={logo} alt="logo for gemenie labs" />
		</a>
	</div>

	<nav class="tab-bar">
	<ul class="tab-bar__tabs">
		<li class="tab-bar__tab">
			<a class="tab-bar__tab-link" href="/" on:click={navigateToContainer} aria-current={page.url.pathname === '/#container' ? 'page' : undefined}>	<svg class="tab-bar__tab-icon tab-bar__tab-icon--home" viewBox="0 0 24 24" width="24px" height="24px" aria-hidden="true">
					<g class="tab-bar__tab-icon-1" fill="var(--focus-t)" stroke="currentColor" stroke-width="2" stroke-linejoin="round">
						<polygon points="12 1,23 10,23 23,16 23,16 14,8 14,8 23,1 23,1 10" />
					</g>
				</svg>
				<span class="tab-bar__tab-name">Home</span>
			</a>
		</li>
		<li class="tab-bar__tab">
			<a class="tab-bar__tab-link" href="/web" aria-current={page.url.pathname === '/web' ? 'page' : undefined}>
				<svg class="tab-bar__tab-icon tab-bar__tab-icon--videos" viewBox="0 0 24 24" width="24px" height="24px" aria-hidden="true">
					<g fill="var(--focus-t)" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<line class="tab-bar__tab-icon-1" x1="3" y1="1" x2="21" y2="1" />
						<line x1="2" y1="5" x2="22" y2="5" />
						<g class="tab-bar__tab-icon-2" transform="translate(1,9)">
							<polygon points="9 3,15 7.5,9 11" />
							<rect rx="2" ry="2" width="22" height="14" />
							<polygon class="tab-bar__tab-icon-3" opacity="0" points="9 3,15 7.5,9 11" />
						</g>
					</g>
				</svg>
				<span class="tab-bar__tab-name">Web</span>
			</a>
		</li>
		<li class="tab-bar__tab">
			<a class="tab-bar__tab-link" href="/android" aria-current={page.url.pathname === '/android' ? 'page' : undefined}>
				<svg class="tab-bar__tab-icon tab-bar__tab-icon--android" viewBox="0 0 24 24" width="24px" height="24px" aria-hidden="true">
				<g class="tab-bar__tab-icon-1" fill="var(--focus-t)" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle class="tab-bar__tab-icon-2" cx="7" cy="6" r="2"/>
                <circle class="tab-bar__tab-icon-2" cx="17" cy="6" r="2"/>
                <rect class="tab-bar__tab-icon-3" x="4" y="10" width="16" height="12" rx="2"/>
                <line x1="2" y1="14" x2="4" y2="14"/>
                <line x1="20" y1="14" x2="22" y2="14"/>
            </g>
				<span class="tab-bar__tab-name">Android</span>
			</a>
		</li>
		
		<li class="tab-bar__tab">
			<a class="tab-bar__tab-link" href="/about" aria-current={page.url.pathname === '/about' ? 'page' : undefined}>
				<svg class="tab-bar__tab-icon tab-bar__tab-icon--profile" viewBox="0 0 24 24" width="24px" height="24px" aria-hidden="true">
					<g fill="var(--focus-t)" stroke="currentColor" stroke-width="2">
						<circle class="tab-bar__tab-icon-1" cx="12" cy="6.5" r="5.5"/>
						<path d="M20.473,23H3.003c-1.276,0-2.228-1.175-1.957-2.422,.705-3.239,3.029-8.578,10.693-8.578s9.987,5.336,10.692,8.575c.272,1.248-.681,2.425-1.959,2.425Z"/>
					</g>
				</svg>
				<span class="tab-bar__tab-name">About</span>
			</a>
		</li>
	</ul>
</nav>

	<div class="corner">
		<a href="https://github.com/hatmanstack">
			<img src={github} alt="GitHub" />
		</a>
	</div>
</header>

<style lang="scss">

	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: #171C1B;
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
		margin-bottom: 1rem;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}

$ease-in: cubic-bezier(0.32,0,0.67,0);
$ease-out: cubic-bezier(0.33,1,0.68,1);
$ease-in-out: cubic-bezier(0.65,0,0.35,1);

@mixin debug-hitbox() {
	$debug: false;

	@if $debug == true {
		$hue: floor(360 * random());
		outline: 1px solid hsl($hue,90%,50%);
	}
}
* {
	border: 0;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
:root {
	--hue: 100;
	--bg: #343347;
		--fg: #c8bdbe;
		--focus: #816769;
	
	--tab-bar-bg: #171C1B;
	--trans-dur: 0.3s;
	--trans-timing: cubic-bezier(0.65,0,0.35,1);
	font-size: calc(14px + (30 - 14) * (100vw - 280px) / (3840 - 280));
}
body {
	background-color: var(--bg);
	color: var(--fg);
	display: flex;
	font: 1em/1.5 "Noto Sans", sans-serif;
	height: 100vh;
	transition:
		background-color var(--trans-dur),
		color var(--trans-dur);
}
.tab-bar {
	background-color: var(--tab-bar-bg);
	border-radius: 2em;
	box-shadow: 0 0 0.75em hsla(var(--hue),10%,10%,0.1);
	margin: auto;
	width: calc(100% - 1.5em);
	max-width: 30em;
	transition:
		background-color var(--trans-dur),
		box-shadow var(--trans-dur);

	&__tabs {
		@include debug-hitbox();
		display: flex;
		justify-content: space-around;
		gap: 2rem; /* Added gap between items */
        list-style: none;
        padding: 0 1.5rem;
	}
	&__tab {
		@include debug-hitbox();
		text-align: center;
		width: 3em;
		min-width: 3em;
		&-icon,
		&-name {
			display: block;
			pointer-events: none;
			transition:
				opacity var(--trans-dur) var(--trans-timing),
				transform var(--trans-dur) var(--trans-timing);
		}
		&-icon {
			@include debug-hitbox();
			margin: auto;
			overflow: visible;
			width: 1.5em;
			height: auto;

			circle,
			path,
			polygon,
			rect {
				transition:
					fill calc(var(--trans-dur) / 2) var(--trans-timing),
					opacity calc(var(--trans-dur) / 2) var(--trans-timing),
					stroke calc(var(--trans-dur) / 2) var(--trans-timing),
					transform var(--trans-dur) var(--trans-timing);
			}
			&-1,
			&-2,
			&-3 {
				animation: {
					duration: calc(var(--trans-dur) * 2.5);
					timing-function: $ease-in-out;
				}
			}
			&--home &-1 {
				transform-origin: 12px 24px;
			}
			&--videos &-3 {
				fill: var(--tab-bar-bg);
				stroke: var(--tab-bar-bg);
			}
			&--android &-2,
			&--android &-3,
			&--books &-2,
			&--books &-3 {
				transform-origin: 12px 21px;
			}
		}
		&-name {
			@include debug-hitbox();
			 font-size: 0.75em;
            font-weight: 500;
            line-height: 1;
            position: absolute;
            bottom: 0.2rem; 
			left: 0;
            opacity: 0;
            text-align: center;
            width: 100%;
            transition: 
                opacity var(--trans-dur) var(--trans-timing),
                transform var(--trans-dur) var(--trans-timing);
		}
		&-link {
			@include debug-hitbox();
			color: var(--fg);
			display: flex;
			position: relative;
			text-decoration: none;
			width: 100%;
			height: 5.5em;
			transition: color calc(var(--trans-dur) / 2);
			-webkit-tap-highlight-color: transparent;

			&:hover,
			&:focus-visible {
				color: var(--focus);
			}
		}
		&-link[aria-current="page"] {
			color: var(--focus);
		}
		&-link[aria-current="page"] &-icon {
			transform: translateY(-50%);

			circle,
			path,
			polygon,
			rect {
				fill: var(--focus);
			}
		}
		&-link[aria-current="page"] &-name {
			opacity: 1;
			transform: translateY(-200%);
		}
		&-link[aria-current="page"] &-icon--home &-icon-1 {
			animation-name: home-bounce;
		}
		&-link[aria-current="page"] &-icon--videos &-icon-1 {
			animation-name: video-move-1;
		}
		&-link[aria-current="page"] &-icon--videos &-icon-2 {
			animation-name: video-move-2;
		}
		&-link[aria-current="page"] &-icon--videos &-icon-3 {
			animation-name: video-fade-slide;
			opacity: 1;
			fill: var(--tab-bar-bg);
		}
		&-link[aria-current="page"] &-icon--books &-icon-1 {
			animation-name: books-move;
		}
		&-link[aria-current="page"] &-icon--books &-icon-2 {
			animation-name: books-scale-left;
		}
		&-link[aria-current="page"] &-icon--books &-icon-3 {
			animation-name: books-scale-right;
		}
		&-link[aria-current="page"] &-icon--android &-icon-1 {
			animation-name: android-move;
		}
		&-link[aria-current="page"] &-icon--android &-icon-2 {
			animation-name: android-scale-left;
		}
		&-link[aria-current="page"] &-icon--android &-icon-3 {
			animation-name: android-scale-right;
		}
		&-link[aria-current="page"] &-icon--profile &-icon-1 {
			animation-name: profile-head-bob;
		}
		
	}
	[data-pristine] &__tab {
		&-icon {
			&-1,
			&-2,
			&-3 {
				animation: {
					duration: 0s;
				}
			}
		}
	}
}

@keyframes home-bounce {
	from,
	to {
		transform: scale(1,1) translateY(0);
	}
	20% {
		transform: scale(1.5,0.75) translateY(0);
	}
	40% {
		transform: scale(0.8,1.2) translateY(-4px);
	}
	60% {
		transform: scale(1.1,0.9) translateY(0);
	}
	80% {
		transform: scale(0.95,1.05) translateY(0);
	}
}
@keyframes video-move-1 {
	from,
	to {
		transform: translate(0,0);
	}
	20%,
	80% {
		transform: translate(0,4px);
	}
}
@keyframes video-move-2 {
	from,
	to {
		transform: translate(1px,9px);
	}
	20%,
	80% {
		transform: translate(1px,5px);
	}
}
@keyframes video-fade-slide {
	from {
		animation-timing-function: steps(1,end);
		opacity: 0;
		transform: translate(0,0);
	}
	40% {
		animation-timing-function: $ease-out;
		opacity: 1;
		stroke: hsla(0,0%,0%,0);
		transform: translate(-4px,0);
	}
	60%,
	to {
		opacity: 1;
		stroke: var(--tab-bar-bg);
		transform: translate(0,0);
	}
}
@keyframes books-move {
	from,
	60%,
	to {
		transform: translateY(0);
	}
	20% {
		transform: translateY(-1px);
	}
	40% {
		transform: translateY(0.5px);
	}
}
@keyframes books-scale-left {
	from,
	to {
		transform: skewY(0);
	}
	20% {
		transform: skewY(-16deg);
	}
	40% {
		transform: skewY(12deg);
	}
	60% {
		transform: skewY(-8deg);
	}
	80% {
		transform: skewY(4deg);
	}
}
@keyframes books-scale-right {
	from,
	to {
		transform: skewY(0);
	}
	20% {
		transform: skewY(16deg);
	}
	40% {
		transform: skewY(-12deg);
	}
	60% {
		transform: skewY(8deg);
	}
	80% {
		transform: skewY(-4deg);
	}
}
@keyframes android-move {
	from,
	60%,
	to {
		transform: translateY(0);
	}
	20% {
		transform: translateY(-1px);
	}
	40% {
		transform: translateY(0.5px);
	}
}
@keyframes android-scale-left {
	from,
	to {
		transform: skewY(0);
	}
	20% {
		transform: skewY(-16deg);
	}
	40% {
		transform: skewY(12deg);
	}
	60% {
		transform: skewY(-8deg);
	}
	80% {
		transform: skewY(4deg);
	}
}
@keyframes android-scale-right {
	from,
	to {
		transform: skewY(0);
	}
	20% {
		transform: skewY(16deg);
	}
	40% {
		transform: skewY(-12deg);
	}
	60% {
		transform: skewY(8deg);
	}
	80% {
		transform: skewY(-4deg);
	}
}
@keyframes profile-head-bob {
	from,
	to {
		transform: translateX(0);
	}
	20% {
		transform: translateX(4px);
	}
	40% {
		transform: translateX(-3px);
	}
	60% {
		transform: translateX(2px);
	}
	80% {
		transform: translateX(-1px);
	}
}

</style>
