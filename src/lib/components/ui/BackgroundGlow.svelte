<script lang="ts">
	import { onMount } from 'svelte';

	/**
	 * BackgroundGlow
	 *
	 * The page's background highlight (the white radial on <body>, defined in
	 * app.html) tightens IN as the cursor nears the centre of the viewport — so the
	 * dark grows inward from the edges — and eases back out to the resting baseline
	 * as the cursor moves to the edges or leaves the page. Stays centred; only the
	 * radius changes. Renders nothing of its own.
	 *
	 * Disabled under prefers-reduced-motion (glow stays at the baseline).
	 */

	const ENABLED = true;

	// Resting (cursor at edges / off-page) vs. focused (cursor at centre), in %.
	// Rest matches the app.html 65% baseline so there's no snap when the pointer enters.
	const RX_REST = 65;
	const RX_FOCUS = 54; // tightens horizontally
	const RY_REST = 65;
	const RY_FOCUS = 42; // tightens vertically
	const Y_REST = 50;
	const Y_FOCUS = 70; // centre drifts down as it tightens → dark grows more from the top

	// >1 concentrates the effect near the centre; the periphery stays at rest.
	const FALLOFF = 2.2;

	const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

	onMount(() => {
		if (!ENABLED) return;
		if (typeof window === 'undefined' || !window.matchMedia) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const body = document.body;
		let raf = 0;
		let target = 0; // 0 at edges (rest) .. 1 at centre (focused)
		let current = 0;
		let running = false;

		function apply() {
			body.style.setProperty('--bg-glow-rx', `${lerp(RX_REST, RX_FOCUS, current).toFixed(2)}%`);
			body.style.setProperty('--bg-glow-ry', `${lerp(RY_REST, RY_FOCUS, current).toFixed(2)}%`);
			body.style.setProperty('--bg-glow-y', `${lerp(Y_REST, Y_FOCUS, current).toFixed(2)}%`);
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
			const cx = window.innerWidth / 2;
			const cy = window.innerHeight / 2;
			if (cx === 0 || cy === 0) return;
			const dx = (e.clientX - cx) / cx;
			const dy = (e.clientY - cy) / cy;
			const proximity = 1 - Math.min(1, Math.hypot(dx, dy));
			target = Math.pow(proximity, FALLOFF);
			start();
		}

		function onLeave() {
			// Pointer left the page → ease back to the resting baseline.
			target = 0;
			start();
		}

		window.addEventListener('pointermove', onMove, { passive: true });
		document.addEventListener('mouseleave', onLeave);

		return () => {
			window.removeEventListener('pointermove', onMove);
			document.removeEventListener('mouseleave', onLeave);
			cancelAnimationFrame(raf);
			// --bg-glow-* values are intentionally left in place (removing them on
			// navigation triggered a stale repaint of the fixed <body> background).
		};
	});
</script>
