<script module lang="ts">
	// Survives client-side navigation (the module stays loaded) but resets on a full
	// page reload. Lets a fresh load show the animated hero grid while any in-session
	// return to `/` starts already-released (stills) — avoiding a re-decode of every
	// animated AVIF on navigate-back, which could stall/time out. (An object, not a
	// bare `let`, so the cross-instance write isn't flagged as a useless assignment.)
	const gridState = { seen: false };
</script>

<script lang="ts">
	import type { ImageGridItem } from '$lib/types/index.js';
	import { onMount } from 'svelte';

	interface Props {
		images: ImageGridItem[];
		className?: string;
	}

	let { images, className = '' }: Props = $props();

	let containerEl: HTMLDivElement;
	// Once the grid has scrolled past (you've reached the cards below), flip
	// `released`. The {#key released} block then tears the grid down and rebuilds it
	// with the static stills — destroying the animated <img> elements, which frees
	// their AVIF decode buffers immediately. (A plain src-swap didn't: with
	// loading="lazy" the still never loads while off-screen, so the animated decode
	// lingered until you scrolled back up.) One-way: rebuilt once, never reverted.
	//
	// On a return visit (gridState.seen already set) we start released, so the grid
	// renders stills straight away instead of re-decoding the animated AVIFs.
	let released = $state(gridState.seen);
	gridState.seen = true;

	onMount(() => {
		// Already released (return visit) → nothing to watch; the grid is stills.
		if (!containerEl || released) return;
		// The grid's scroll region is ~3x the viewport, so it never fully leaves the
		// screen and an IntersectionObserver "out of view" check never fires. Instead,
		// release once we've scrolled past the grid's own height — read live from the
		// element, so the check adapts to the actual grid/viewport size, not the reverse.
		const threshold = () => containerEl.offsetHeight - window.innerHeight * 0.5;
		function check() {
			if (window.scrollY >= threshold()) {
				released = true;
				window.removeEventListener('scroll', check);
			}
		}
		window.addEventListener('scroll', check, { passive: true });
		check();
		return () => window.removeEventListener('scroll', check);
	});
</script>

<div class="scroll-container" bind:this={containerEl}>
	{#key released}
		<div class="stuck-grid {className}">
			{#each images as image (image.id)}
				<div
					class="grid-item {image.special ? 'special' : ''}"
					style="--animation-range: {image.animationRange}"
				>
					{#if image.special}
						<p><b>{image.content}</b></p>
					{:else}
						<img
							src={released && image.still ? image.still : image.src}
							alt={image.alt}
							loading="lazy"
							decoding="async"
						/>
					{/if}
				</div>
			{/each}
		</div>
	{/key}
</div>

<style>
	.scroll-container {
		height: 300vh;
		position: relative;
		padding: 0;
	}

	.stuck-grid {
		block-size: 100svh;
		perspective: 1000px;
		transform-style: preserve-3d;
		display: grid;
		grid: repeat(4, 25dvh) / repeat(4, 25dvw);
		place-items: center;
		position: sticky;
		top: 0px;
		left: 0;
		overflow: clip;
		padding: 0;
		width: 100vw;
		margin: 0 auto;
	}

	.grid-item {
		transform-style: preserve-3d;
		font-size: 5vmin;
		font-weight: lighter;
		text-wrap: nowrap;
		text-align: left;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.grid-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	@supports (animation-timeline: scroll()) {
		@media (prefers-reduced-motion: no-preference) {
			.grid-item {
				animation: zoom-in linear both;
				animation-timeline: scroll(root block);
				/* No `filter` here on purpose: keeping it in will-change pins a
				   permanent offscreen blur buffer per tile (big memory cost). The
				   blur still renders from the keyframes; it just isn't pre-promoted. */
				will-change: transform, opacity;
			}
		}
	}

	.special.special {
		grid-row: 2 / span 2;
		grid-column: 2 / span 2;
		margin-right: 25vw;
		margin-bottom: 32vh;
	}

	/* Animation ranges. Most animated tiles (6, 7, 10, 19, 22, 23) are
	   front-loaded into the first ~55% of the scroll, staggered, so they're seen
	   while attention is high instead of being wasted near the bottom; tiles 18
	   (twa, 57-71%) and 15 (vocab, 72-86%) are exceptions, animated in the back
	   half by choice. The rest of the back half is carried by stills, and the
	   late animated pair never overlaps its early still twin. Every window is ~14% wide and
	   the starts step ~3-4% apart across all 26 tiles, so coverage stays
	   continuous 0-100% with no dead spot. Item 11 (title) lingers early. */
	.grid-item:nth-of-type(1) {
		animation-range: 0% 14%;
	}
	.grid-item:nth-of-type(2) {
		animation-range: 36% 50%;
	}
	.grid-item:nth-of-type(3) {
		animation-range: 18% 32%;
	}
	.grid-item:nth-of-type(4) {
		animation-range: 11% 25%;
	}
	.grid-item:nth-of-type(5) {
		animation-range: 43% 57%;
	}
	.grid-item:nth-of-type(6) {
		animation-range: 4% 18%;
	}
	.grid-item:nth-of-type(7) {
		animation-range: 25% 39%;
	}
	.grid-item:nth-of-type(8) {
		animation-range: 7% 21%;
	}
	.grid-item:nth-of-type(9) {
		animation-range: 22% 36%;
	}
	.grid-item:nth-of-type(10) {
		animation-range: 39% 53%;
	}
	.grid-item:nth-of-type(11) {
		animation-range: -10% 50%;
	}
	.grid-item:nth-of-type(12) {
		animation-range: 54% 68%;
	}
	.grid-item:nth-of-type(13) {
		animation-range: 29% 43%;
	}
	.grid-item:nth-of-type(14) {
		animation-range: 50% 64%;
	}
	.grid-item:nth-of-type(15) {
		animation-range: 72% 86%;
	}
	.grid-item:nth-of-type(16) {
		animation-range: 86% 100%;
	}
	.grid-item:nth-of-type(17) {
		animation-range: 65% 79%;
	}
	.grid-item:nth-of-type(18) {
		animation-range: 57% 71%;
	}
	.grid-item:nth-of-type(19) {
		animation-range: 46% 60%;
	}
	.grid-item:nth-of-type(20) {
		animation-range: 61% 75%;
	}
	.grid-item:nth-of-type(21) {
		animation-range: 75% 89%;
	}
	.grid-item:nth-of-type(22) {
		animation-range: 14% 28%;
	}
	.grid-item:nth-of-type(23) {
		animation-range: 32% 46%;
	}
	.grid-item:nth-of-type(24) {
		animation-range: 79% 93%;
	}
	.grid-item:nth-of-type(25) {
		animation-range: 68% 82%;
	}
	.grid-item:nth-of-type(26) {
		animation-range: 82% 96%;
	}

	@supports (animation-timeline: scroll()) {
		.grid-item:nth-of-type(1) {
			grid-area: 1/1;
		}
		.grid-item:nth-of-type(2) {
			grid-area: 1/2;
		}
		.grid-item:nth-of-type(3) {
			grid-area: 1/3;
		}
		.grid-item:nth-of-type(4) {
			grid-area: 1/4;
		}
		.grid-item:nth-of-type(5) {
			grid-area: 2/1;
		}
		.grid-item:nth-of-type(6) {
			grid-area: 2/2;
		}
		.grid-item:nth-of-type(7) {
			grid-area: 2/3;
		}
		.grid-item:nth-of-type(8) {
			grid-area: 2/4;
		}
		.grid-item:nth-of-type(9) {
			grid-area: 3/1;
		}
		.grid-item:nth-of-type(10) {
			grid-area: 3/2;
		}
		.grid-item:nth-of-type(11) {
			grid-area: 3/3;
		}
		.grid-item:nth-of-type(12) {
			grid-area: 3/4;
		}
		.grid-item:nth-of-type(13) {
			grid-area: 4/1;
		}
		.grid-item:nth-of-type(14) {
			grid-area: 4/2;
		}
		.grid-item:nth-of-type(15) {
			grid-area: 4/3;
		}
		.grid-item:nth-of-type(16) {
			grid-area: 4/4;
		}
		.grid-item:nth-of-type(17) {
			grid-area: 2/1;
		}
		.grid-item:nth-of-type(18) {
			grid-area: 2/2;
		}
		.grid-item:nth-of-type(19) {
			grid-area: 2/3;
		}
		.grid-item:nth-of-type(20) {
			grid-area: 2/4;
		}
		.grid-item:nth-of-type(21) {
			grid-area: 3/1;
		}
		.grid-item:nth-of-type(22) {
			grid-area: 3/2;
		}
		.grid-item:nth-of-type(23) {
			grid-area: 3/3;
		}
		.grid-item:nth-of-type(24) {
			grid-area: 3/4;
		}
		.grid-item:nth-of-type(25) {
			grid-area: 1/1;
		}
		.grid-item:nth-of-type(26) {
			grid-area: 1/2;
		}
		.grid-item:nth-of-type(27) {
			grid-area: 1/3;
		}
		.grid-item:nth-of-type(28) {
			grid-area: 1/4;
		}
		.grid-item:nth-of-type(29) {
			grid-area: 4/1;
		}
		.grid-item:nth-of-type(30) {
			grid-area: 4/2;
		}
		.grid-item:nth-of-type(31) {
			grid-area: 4/3;
		}
		.grid-item:nth-of-type(32) {
			grid-area: 4/4;
		}
		.grid-item:nth-of-type(33) {
			grid-area: 2/1;
		}
		.grid-item:nth-of-type(34) {
			grid-area: 2/2;
		}
		.grid-item:nth-of-type(35) {
			grid-area: 2/3;
		}
		.grid-item:nth-of-type(36) {
			grid-area: 2/4;
		}
		.grid-item:nth-of-type(37) {
			grid-area: 3/1;
		}
		.grid-item:nth-of-type(38) {
			grid-area: 3/2;
		}
		.grid-item:nth-of-type(39) {
			grid-area: 3/3;
		}
		.grid-item:nth-of-type(40) {
			grid-area: 3/4;
		}
		.grid-item:nth-of-type(41) {
			grid-area: 1/1;
		}
		.grid-item:nth-of-type(42) {
			grid-area: 1/2;
		}
		.grid-item:nth-of-type(43) {
			grid-area: 1/3;
		}
		.grid-item:nth-of-type(44) {
			grid-area: 1/4;
		}
		.grid-item:nth-of-type(45) {
			grid-area: 4/1;
		}
		.grid-item:nth-of-type(46) {
			grid-area: 4/2;
		}
		.grid-item:nth-of-type(47) {
			grid-area: 4/3;
		}
		.grid-item:nth-of-type(48) {
			grid-area: 4/4;
		}
		.grid-item:nth-of-type(49) {
			grid-area: 3/1;
		}
		.grid-item:nth-of-type(50) {
			grid-area: 3/2;
		}
		.grid-item:nth-of-type(51) {
			grid-area: 3/3;
		}
		.grid-item:nth-of-type(52) {
			grid-area: 3/4;
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
</style>
