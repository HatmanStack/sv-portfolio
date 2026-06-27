<script lang="ts">
	import { onMount } from 'svelte';

	/**
	 * BackgroundGlow
	 *
	 * The page's background highlight (the white radial on <body>, defined in
	 * app.html) tightens IN and the dark grows from one edge as the cursor moves
	 * toward that edge, easing back to the resting baseline as it moves away or
	 * leaves the page. The edge is set per route: `yFocus` > 50 darkens the top
	 * (move the cursor up to trigger it); `xFocus` < 50 darkens the right (move it
	 * right). With no directional focus (default 50/50, e.g. /about) it falls back to
	 * centre proximity. Renders nothing of its own.
	 *
	 * Disabled under prefers-reduced-motion (glow stays at the baseline).
	 */

	interface Props {
		// Where the glow centre drifts to at full effect, in %. 50 = no drift. This also
		// sets the trigger edge: xFocus < 50 → dark from the right (cursor right triggers
		// it); yFocus > 50 → dark from the top (cursor up triggers it).
		xFocus?: number;
		yFocus?: number;
	}

	let { xFocus = 50, yFocus = 50 }: Props = $props();

	const ENABLED = true;

	// Resting (cursor away from the dark edge / off-page) vs. focused (at it), in %.
	// Rest matches the app.html 65% baseline so there's no snap when the pointer enters.
	const RX_REST = 65;
	const RX_FOCUS = 54; // tightens horizontally
	const RY_REST = 65;
	const RY_FOCUS = 42; // tightens vertically
	const X_REST = 50;
	const Y_REST = 50;

	// >1 concentrates the effect near the dark edge; the rest of the travel stays low.
	const FALLOFF = 2.2;

	const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

	onMount(() => {
		if (!ENABLED) return;
		if (typeof window === 'undefined' || !window.matchMedia) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const body = document.body;
		let raf = 0;
		let target = 0; // 0 = rest (cursor away from the dark edge) .. 1 = full effect
		let current = 0;
		let running = false;

		function apply() {
			body.style.setProperty('--bg-glow-rx', `${lerp(RX_REST, RX_FOCUS, current).toFixed(2)}%`);
			body.style.setProperty('--bg-glow-ry', `${lerp(RY_REST, RY_FOCUS, current).toFixed(2)}%`);
			body.style.setProperty('--bg-glow-x', `${lerp(X_REST, xFocus, current).toFixed(2)}%`);
			body.style.setProperty('--bg-glow-y', `${lerp(Y_REST, yFocus, current).toFixed(2)}%`);
		}

		function tick() {
			current += (target - current) * 0.09;
			if (Math.abs(target - current) <= 0.0005) {
				current = target;
				running = false;
			}
			apply();
			if (running) raf = requestAnimationFrame(tick);
		}

		function start() {
			if (running) return;
			running = true;
			raf = requestAnimationFrame(tick);
		}

		function onMove(e: PointerEvent) {
			const w = window.innerWidth;
			const h = window.innerHeight;
			if (w === 0 || h === 0) return;
			// Drive the effect by how close the cursor is to the dark edge (the side the
			// glow skews toward), not the centre: yFocus > 50 darkens the top, so moving
			// up ramps it; xFocus < 50 darkens the right, so moving right ramps it. With
			// no directional focus (xFocus = yFocus = 50, e.g. /about) use centre proximity.
			let fraction: number;
			if (yFocus !== 50) {
				const ny = e.clientY / h; // 0 top .. 1 bottom
				fraction = yFocus > 50 ? 1 - ny : ny;
			} else if (xFocus !== 50) {
				const nx = e.clientX / w; // 0 left .. 1 right
				fraction = xFocus < 50 ? nx : 1 - nx;
			} else {
				const dx = (e.clientX - w / 2) / (w / 2);
				const dy = (e.clientY - h / 2) / (h / 2);
				fraction = 1 - Math.min(1, Math.hypot(dx, dy));
			}
			target = Math.pow(Math.max(0, Math.min(1, fraction)), FALLOFF);
			start();
		}

		function onLeave() {
			// Pointer left the page → ease back to the resting baseline.
			target = 0;
			start();
		}

		// Start from the resting baseline so this route never inherits a "stuck"
		// focused glow left in the CSS vars by a previously visited route.
		apply();

		window.addEventListener('pointermove', onMove, { passive: true });
		document.addEventListener('mouseleave', onLeave);

		return () => {
			window.removeEventListener('pointermove', onMove);
			document.removeEventListener('mouseleave', onLeave);
			cancelAnimationFrame(raf);
			// Reset to the resting baseline on unmount so the glow doesn't stay
			// "stuck" focused on routes that have no BackgroundGlow (e.g. /read/post).
			// We set the rest values rather than removeProperty — removing them
			// triggered a stale repaint of the fixed <body> background.
			body.style.setProperty('--bg-glow-rx', `${RX_REST}%`);
			body.style.setProperty('--bg-glow-ry', `${RY_REST}%`);
			body.style.setProperty('--bg-glow-x', `${X_REST}%`);
			body.style.setProperty('--bg-glow-y', `${Y_REST}%`);
		};
	});
</script>
