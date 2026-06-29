<script lang="ts">
	import { appStore } from '$lib/stores/app.svelte.js';
	import type { Theme } from '$lib/types/index.js';

	// Cycles auto -> light -> dark. setTheme() persists the choice and sets
	// `color-scheme` on <html>, which the light-dark() tokens resolve against.
	const ORDER: Theme[] = ['auto', 'light', 'dark'];
	const LABEL: Record<Theme, string> = { auto: 'Auto', light: 'Light', dark: 'Dark' };
	const ICON: Record<Theme, string> = { auto: '◐', light: '☀', dark: '☾' };

	let theme = $derived(appStore.state.preferences.theme);

	function cycle() {
		appStore.setTheme(ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]);
	}
</script>

<button
	class="theme-toggle"
	type="button"
	onclick={cycle}
	title="Theme: {LABEL[theme]} — click to change"
	aria-label="Theme: {LABEL[theme]}. Click to change."
>
	<span aria-hidden="true">{ICON[theme]}</span>
</button>

<style>
	.theme-toggle {
		display: grid;
		place-items: center;
		width: 2em;
		height: 2em;
		padding: 0;
		border: none;
		background: transparent;
		color: var(--color-nav-fg);
		line-height: 1;
		cursor: pointer;
		opacity: 0.85;
		transition:
			color calc(var(--trans-dur) / 2),
			opacity 0.2s ease,
			transform 0.2s ease;
	}

	.theme-toggle span {
		font-size: 1.4em;
	}

	.theme-toggle:hover,
	.theme-toggle:focus-visible {
		opacity: 1;
		color: var(--color-nav-focus);
		transform: scale(1.08);
	}
</style>
