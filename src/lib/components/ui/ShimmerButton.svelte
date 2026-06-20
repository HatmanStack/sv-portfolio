<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * ShimmerButton
	 *
	 * Svelte port of the Magic UI "shimmer button": a pill with a thin conic-gradient
	 * highlight that spins around the inner edge plus a sheen that slides across.
	 *
	 * Two looks via props:
	 *  - primary (default): amber shimmer on a brown fill (matches the page background)
	 *  - secondary: white shimmer on a transparent fill, no border (ghost)
	 *
	 * Renders as <a> when `href` is set, otherwise <button>.
	 */

	interface Props {
		children?: Snippet;
		href?: string;
		target?: string;
		rel?: string;
		onclick?: () => void;
		variant?: 'primary' | 'secondary';
		/** Optional fill override (any CSS color), per-use. Defaults to the variant's --bg. */
		background?: string;
		/** Rotating conic-shimmer border. Coloring is independent (see `variant`). */
		animated?: boolean;
	}

	let {
		children,
		href,
		target,
		rel,
		onclick,
		variant = 'primary',
		background,
		animated = true
	}: Props = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	class="shimmer-button {variant}"
	style={background ? `--bg: ${background};` : undefined}
	{href}
	target={href ? target : undefined}
	rel={href ? rel : undefined}
	type={href ? undefined : 'button'}
	role={href ? undefined : 'button'}
	{onclick}
>
	{#if animated}
		<span class="shimmer-container" aria-hidden="true">
			<span class="shimmer">
				<span class="spinner"></span>
			</span>
		</span>
	{/if}
	<span class="label">{@render children?.()}</span>
	<span class="highlight" aria-hidden="true"></span>
	<span class="backdrop" aria-hidden="true"></span>
</svelte:element>

<style>
	.shimmer-button {
		--spread: 90deg;
		--radius: 100px;
		--speed: 3s;
		--cut: 0.05em;
		--shimmer-color: #efb46c;
		--bg: rgba(72, 52, 34, 0.9);
		--border-color: rgba(255, 255, 255, 0.1);

		position: relative;
		z-index: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		cursor: pointer;
		white-space: nowrap;
		margin-top: 0.5rem;
		padding: 0.75rem 2rem;
		border-radius: var(--radius);
		border: 1px solid var(--border-color);
		background: var(--bg);
		color: #fff;
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 1px;
		text-transform: uppercase;
		text-decoration: none;
		transform: translateZ(0);
		transition: transform 0.3s ease-in-out;
	}

	.shimmer-button.secondary {
		--shimmer-color: #ffffff;
		--bg: transparent;
		border: 0;
	}

	.shimmer-button:active {
		transform: translateY(1px);
	}

	/* Spinning conic highlight, masked down to a hairline by the backdrop */
	.shimmer-container {
		position: absolute;
		inset: 0;
		z-index: -30;
		overflow: visible;
		filter: blur(2px);
		container-type: size;
	}

	.shimmer {
		position: absolute;
		inset: 0;
		height: 100cqh;
		aspect-ratio: 1;
		border-radius: 0;
		animation: shimmer-slide var(--speed) ease-in-out infinite alternate;
	}

	.spinner {
		position: absolute;
		inset: -100%;
		width: auto;
		translate: 0 0;
		rotate: 0deg;
		background: conic-gradient(
			from calc(270deg - (var(--spread) * 0.5)),
			transparent 0,
			var(--shimmer-color) var(--spread),
			transparent var(--spread)
		);
		animation: spin-around calc(var(--speed) * 2) infinite linear;
	}

	/* Soft inner shadow that deepens on interaction */
	.highlight {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border-radius: var(--radius);
		box-shadow: inset 0 -8px 10px #ffffff1f;
		transition: box-shadow 0.3s ease-in-out;
		pointer-events: none;
	}

	.shimmer-button:hover .highlight {
		box-shadow: inset 0 -6px 10px #ffffff3f;
	}

	.shimmer-button:active .highlight {
		box-shadow: inset 0 -10px 10px #ffffff3f;
	}

	/* Re-paints the fill on top of the spinner, leaving only a --cut border of it visible */
	.backdrop {
		position: absolute;
		inset: var(--cut);
		z-index: -20;
		border-radius: var(--radius);
		background: var(--bg);
		pointer-events: none;
	}

	.label {
		position: relative;
		z-index: 1;
	}

	@keyframes shimmer-slide {
		to {
			transform: translate(calc(100cqw - 100%));
		}
	}

	@keyframes spin-around {
		0% {
			transform: translateZ(0) rotate(0);
		}
		15%,
		35% {
			transform: translateZ(0) rotate(90deg);
		}
		65%,
		85% {
			transform: translateZ(0) rotate(270deg);
		}
		to {
			transform: translateZ(0) rotate(1turn);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.shimmer,
		.spinner {
			animation: none;
		}
	}
</style>
