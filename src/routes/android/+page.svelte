<script lang="ts">
	import type { AndroidApp } from '$lib/types/index.js';
	import { androidApps, androidContentMap } from '$lib/data/androidApps';
	import Header from '../Header.svelte';
	import AndroidFilters from '$lib/components/ui/AndroidFilters.svelte';
	import ShimmerButton from '$lib/components/ui/ShimmerButton.svelte';
	import BackgroundGlow from '$lib/components/ui/BackgroundGlow.svelte';

	let selectedImage = $state('Android Stuff');
	let selectedEntry = $derived(androidContentMap[selectedImage]);

	function isAndroidApp(entry: unknown): entry is AndroidApp {
		return entry != null && typeof entry === 'object' && 'id' in entry;
	}

	import { useSoundAction, createSoundStore } from '$lib/hooks/useSound.svelte';
	import click from '$lib/sounds/click.wav';
	import swoosh from '$lib/sounds/swoosh.mp3';
	const clickSound = createSoundStore(click);
	const swoosh_sound = useSoundAction(swoosh);
</script>

<svelte:head>
	<title>Android Apps | Christopher Galliart</title>
	<meta
		name="description"
		content="Android applications built by Christopher Galliart. Browse mobile apps available on Google Play Store featuring AI, productivity, and utility tools."
	/>

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="CG Portfolio" />
	<meta property="og:title" content="Android Apps | Christopher Galliart" />
	<meta
		property="og:description"
		content="Android applications built by Christopher Galliart. Browse mobile apps available on Google Play Store."
	/>
	<meta property="og:url" content="https://portfolio.hatstack.fun/android" />
	<meta property="og:image" content="https://portfolio.hatstack.fun/og-image.jpg" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@HatmanStack" />
	<meta name="twitter:title" content="Android Apps | Christopher Galliart" />
	<meta
		name="twitter:description"
		content="Android applications built by Christopher Galliart. Browse mobile apps on Google Play Store."
	/>
	<meta name="twitter:image" content="https://portfolio.hatstack.fun/og-image.jpg" />

	<!-- JSON-LD -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: 'Android Apps',
		description: 'Android applications built by Christopher Galliart',
		url: 'https://portfolio.hatstack.fun/android',
		author: {
			'@type': 'Person',
			name: 'Christopher Galliart'
		}
	})}</script>`}
</svelte:head>

<BackgroundGlow xFocus={30} />

<section style="margin-bottom:1rem;">
	<Header />
</section>

<section>
	<fieldset class="app-grid">
		{#each androidApps as app}
			<label
				class="app-item"
				style="--initial-img: url({app.initialImg}); --active-img: url({app.activeImg});"
			>
				<input
					type="radio"
					name="images"
					onchange={() => (selectedImage = app.title)}
					use:swoosh_sound
				/>
			</label>
		{/each}
		<div class="content-panel">
			{#if selectedEntry}
				<h1 class="app-title" data-text={selectedEntry.title}>{selectedEntry.title}</h1>
				{#if isAndroidApp(selectedEntry) && selectedEntry.description}
					<p class="app-description">{selectedEntry.description}</p>
				{/if}
				{#if isAndroidApp(selectedEntry) && selectedEntry.webLink}
					<ShimmerButton
						href={selectedEntry.webLink}
						target="_blank"
						rel="noopener noreferrer"
						onclick={() => clickSound.play()}
					>
						Web Version
					</ShimmerButton>
				{/if}
				{#if isAndroidApp(selectedEntry) && selectedEntry.link}
					<ShimmerButton
						animated={false}
						href={selectedEntry.link}
						target="_blank"
						rel="noopener noreferrer"
						onclick={() => clickSound.play()}
					>
						Play Store Stuff
					</ShimmerButton>
				{/if}
			{/if}
		</div>
	</fieldset>

	<AndroidFilters />
</section>

<style>
	/* CSS Variables */
	:root {
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
		transition:
			background-image 0.3s ease,
			transform 150ms ease,
			box-shadow 150ms ease;
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
		background-size: auto 125%;
	}

	.app-grid:has(.app-item:nth-child(2) input:checked) {
		--col-1: 2fr;
		--col-2: 5fr;
		--col-3: 2fr;
	}
	.app-grid:has(.app-item:nth-child(2) input:checked) .app-item:nth-child(2) {
		background-image: var(--active-img);
		background-size: auto 125%;
	}

	.app-grid:has(.app-item:nth-child(3) input:checked) {
		--col-2: 2fr;
		--col-3: 5fr;
		--col-4: 2fr;
	}
	.app-grid:has(.app-item:nth-child(3) input:checked) .app-item:nth-child(3) {
		background-image: var(--active-img);
		background-size: auto 125%;
	}

	.app-grid:has(.app-item:nth-child(4) input:checked) {
		--col-3: 2fr;
		--col-4: 5fr;
		--col-5: 2fr;
	}
	.app-grid:has(.app-item:nth-child(4) input:checked) .app-item:nth-child(4) {
		background-image: var(--active-img);
		background-size: auto 125%;
	}

	.app-grid:has(.app-item:nth-child(5) input:checked) {
		--col-4: 2fr;
		--col-5: 5fr;
		--col-6: 2fr;
	}
	.app-grid:has(.app-item:nth-child(5) input:checked) .app-item:nth-child(5) {
		background-image: var(--active-img);
		background-size: auto 125%;
	}

	.app-grid:has(.app-item:nth-child(6) input:checked) {
		--col-5: 3fr;
		--col-6: 5fr;
	}
	.app-grid:has(.app-item:nth-child(6) input:checked) .app-item:nth-child(6) {
		background-image: var(--active-img);
		background-size: auto 125%;
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
		color: light-dark(#3a3328, #86868b);
		font-weight: 600;
		background: linear-gradient(
			0deg,
			light-dark(#3a3328, #86868b) 0%,
			light-dark(#5a5044, #bdc2c9) 100%
		);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		max-width: 28em;
		text-wrap: pretty;
		margin: 1rem 0;
	}

	/* Animations */
	@keyframes titleScale {
		0% {
			transform: scale(1);
		}
		24% {
			transform: scale(1);
		}
		100% {
			transform: scale(1.02);
		}
	}

	@keyframes titleGlow {
		0% {
			opacity: 0;
		}
		24% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	/* Mobile Layout */
	@media (max-width: 768px) {
		.app-grid {
			grid-template-columns: repeat(6, 1fr);
			grid-template-rows: 50vh auto;
			height: auto;
			min-height: 100vh;
		}

		.app-item {
			border-radius: 12px;
			background-size: cover;
		}

		.content-panel {
			grid-column: 1 / -1;
			padding: 1.5rem 1rem;
			min-height: 30vh;
		}

		.app-title {
			font-size: 2em;
		}

		.app-description {
			max-width: 90vw;
		}

		/* Override desktop :has() column resizing for mobile two-row layout */
		.app-grid:has(.app-item:nth-child(1) input:checked) {
			grid-template-columns: 3fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr;
		}
		.app-grid:has(.app-item:nth-child(2) input:checked) {
			grid-template-columns: 0.5fr 3fr 0.5fr 0.5fr 0.5fr 0.5fr;
		}
		.app-grid:has(.app-item:nth-child(3) input:checked) {
			grid-template-columns: 0.5fr 0.5fr 3fr 0.5fr 0.5fr 0.5fr;
		}
		.app-grid:has(.app-item:nth-child(4) input:checked) {
			grid-template-columns: 0.5fr 0.5fr 0.5fr 3fr 0.5fr 0.5fr;
		}
		.app-grid:has(.app-item:nth-child(5) input:checked) {
			grid-template-columns: 0.5fr 0.5fr 0.5fr 0.5fr 3fr 0.5fr;
		}
		.app-grid:has(.app-item:nth-child(6) input:checked) {
			grid-template-columns: 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr 3fr;
		}
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
