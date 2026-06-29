<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import logo from '$lib/images/logo.svg';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
	import { useSoundAction } from '$lib/hooks/useSound.svelte';
	import click from '$lib/sounds/click.wav';
	const click_sound = useSoundAction(click);

	function navigateToContainer(event: MouseEvent) {
		event.preventDefault();
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
</script>

<header>
	<div class="corner">
		<a href="https://gemenielabs.hatstack.fun">
			<img src={logo} alt="logo for gemenie labs" />
		</a>
	</div>

	<nav class="tab-bar">
		<ul class="tab-bar__tabs">
			<li class="tab-bar__tab" use:click_sound>
				<a
					class="tab-bar__tab-link"
					href="/"
					onclick={navigateToContainer}
					aria-current={page.url.pathname === '/' ? 'page' : undefined}
				>
					<svg
						class="tab-bar__tab-icon tab-bar__tab-icon--home"
						viewBox="0 0 24 24"
						width="24px"
						height="24px"
						aria-hidden="true"
					>
						<g
							class="tab-bar__tab-icon-1"
							fill="var(--color-nav-focus-alt)"
							stroke="currentColor"
							stroke-width="2"
							stroke-linejoin="round"
						>
							<polygon points="12 1,23 10,23 23,16 23,16 14,8 14,8 23,1 23,1 10" />
						</g>
					</svg>
					<span class="tab-bar__tab-name">Home</span>
				</a>
			</li>
			<li class="tab-bar__tab" use:click_sound>
				<a
					class="tab-bar__tab-link"
					href="/web"
					aria-current={page.url.pathname === '/web' ? 'page' : undefined}
				>
					<svg
						class="tab-bar__tab-icon tab-bar__tab-icon--videos"
						viewBox="0 0 24 24"
						width="24px"
						height="24px"
						aria-hidden="true"
					>
						<g
							fill="var(--color-nav-focus-alt)"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
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
			<li class="tab-bar__tab" use:click_sound>
				<a
					class="tab-bar__tab-link"
					href="/android"
					aria-current={page.url.pathname === '/android' ? 'page' : undefined}
				>
					<svg
						class="tab-bar__tab-icon tab-bar__tab-icon--android"
						viewBox="0 0 24 24"
						width="24px"
						height="24px"
						aria-hidden="true"
					>
						<g
							class="tab-bar__tab-icon-1"
							fill="var(--color-nav-focus-alt)"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<circle class="tab-bar__tab-icon-2" cx="7" cy="6" r="2" />
							<circle class="tab-bar__tab-icon-2" cx="17" cy="6" r="2" />
							<rect class="tab-bar__tab-icon-3" x="4" y="10" width="16" height="12" rx="2" />
							<line x1="2" y1="14" x2="4" y2="14" />
							<line x1="20" y1="14" x2="22" y2="14" />
						</g>
					</svg>
					<span class="tab-bar__tab-name">Android</span>
				</a>
			</li>
			<li class="tab-bar__tab" use:click_sound>
				<a
					class="tab-bar__tab-link"
					href="/read"
					aria-current={page.url.pathname === '/read' ? 'page' : undefined}
				>
					<svg
						class="tab-bar__tab-icon tab-bar__tab-icon--read"
						viewBox="0 0 24 24"
						width="24px"
						height="24px"
						aria-hidden="true"
					>
						<g
							class="tab-bar__tab-icon-1"
							fill="var(--color-nav-focus-alt)"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<rect class="tab-bar__tab-icon-2" x="1" y="1" rx="2" ry="2" width="11" height="19" />
							<rect class="tab-bar__tab-icon-3" x="12" y="1" rx="2" ry="2" width="11" height="19" />
							<line x1="12" y1="21" x2="12" y2="23" />
						</g>
					</svg>
					<span class="tab-bar__tab-name">Read</span>
				</a>
			</li>

			<li class="tab-bar__tab" use:click_sound>
				<a
					class="tab-bar__tab-link"
					href="/about"
					aria-current={page.url.pathname === '/about' ? 'page' : undefined}
				>
					<svg
						class="tab-bar__tab-icon tab-bar__tab-icon--profile"
						viewBox="0 0 24 24"
						width="24px"
						height="24px"
						aria-hidden="true"
					>
						<g fill="var(--color-nav-focus-alt)" stroke="currentColor" stroke-width="2">
							<circle class="tab-bar__tab-icon-1" cx="12" cy="6.5" r="5.5" />
							<path
								d="M20.473,23H3.003c-1.276,0-2.228-1.175-1.957-2.422,.705-3.239,3.029-8.578,10.693-8.578s9.987,5.336,10.692,8.575c.272,1.248-.681,2.425-1.959,2.425Z"
							/>
						</g>
					</svg>
					<span class="tab-bar__tab-name">About</span>
				</a>
			</li>
		</ul>
	</nav>

	<div class="corner corner--actions">
		<ThemeToggle />
		<a
			class="gh-link"
			href="https://github.com/hatmanstack"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="GitHub"
		>
			<svg class="gh-icon" viewBox="-3 -3 30 30" aria-hidden="true">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2ZM0 12C0 5.3726 5.3726 0 12 0C18.6274 0 24 5.3726 24 12C24 18.6274 18.6274 24 12 24C5.3726 24 0 18.6274 0 12Z"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M9.59162 22.7357C9.49492 22.6109 9.49492 21.4986 9.59162 19.399C8.55572 19.4347 7.90122 19.3628 7.62812 19.1833C7.21852 18.9139 6.80842 18.0833 6.44457 17.4979C6.08072 16.9125 5.27312 16.8199 4.94702 16.6891C4.62091 16.5582 4.53905 16.0247 5.84562 16.4282C7.15222 16.8316 7.21592 17.9303 7.62812 18.1872C8.04032 18.4441 9.02572 18.3317 9.47242 18.1259C9.91907 17.9201 9.88622 17.1538 9.96587 16.8503C10.0666 16.5669 9.71162 16.5041 9.70382 16.5018C9.26777 16.5018 6.97697 16.0036 6.34772 13.7852C5.71852 11.5669 6.52907 10.117 6.96147 9.49369C7.24972 9.07814 7.22422 8.19254 6.88497 6.83679C8.11677 6.67939 9.06732 7.06709 9.73672 7.99999C9.73737 8.00534 10.6143 7.47854 12.0001 7.47854C13.386 7.47854 13.8777 7.90764 14.2571 7.99999C14.6365 8.09234 14.94 6.36699 17.2834 6.83679C16.7942 7.79839 16.3844 8.99999 16.6972 9.49369C17.0099 9.98739 18.2372 11.5573 17.4833 13.7852C16.9807 15.2706 15.9927 16.1761 14.5192 16.5018C14.3502 16.5557 14.2658 16.6427 14.2658 16.7627C14.2658 16.9427 14.4942 16.9624 14.8233 17.8058C15.0426 18.368 15.0585 19.9739 14.8708 22.6234C14.3953 22.7445 14.0254 22.8257 13.7611 22.8673C13.2924 22.9409 12.7835 22.9822 12.2834 22.9982C11.7834 23.0141 11.6098 23.0123 10.9185 22.948C10.4577 22.9051 10.0154 22.8343 9.59162 22.7357Z"
				/>
			</svg>
		</a>
	</div>
</header>

<style lang="scss">
	/* All design tokens now come from tokens.css */

	header {
		display: flex;
		justify-content: space-between;
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

	.corner--actions {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.35rem;
	}

	.corner--actions .gh-link {
		display: grid;
		place-items: center;
		width: auto;
		height: auto;
	}

	/* Recolour the GitHub mark via a mask so it themes with the nav foreground.
	   (The card GitHub icons in ProjectCard are separate and intentionally stay.) */
	/* Inline SVG so it themes via `fill` (no mask/data-URI fragility). The card
	   GitHub icons in ProjectCard are separate and intentionally stay. */
	.gh-icon {
		display: block;
		width: 2em;
		height: 2em;
		fill: var(--color-nav-fg);
		transition: fill calc(var(--trans-dur) / 2);
	}

	.corner--actions .gh-link:hover .gh-icon,
	.corner--actions .gh-link:focus-visible .gh-icon {
		fill: var(--color-nav-focus);
	}

	nav {
		display: flex;
		justify-content: center;
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
	}

	li {
		position: relative;
		height: 100%;
		margin-bottom: 1rem;
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
	}

	.tab-bar {
		background-color: var(--color-nav-bg);
		border-radius: var(--radius-2xl);
		box-shadow: var(--shadow-nav);
		margin: auto;
		width: calc(100% - var(--space-6));
		max-width: 30em;
		transition:
			background-color var(--trans-dur),
			box-shadow var(--trans-dur);

		&__tabs {
			display: flex;
			justify-content: space-around;
			gap: 2rem;
			list-style: none;
			padding: 0 1.5rem;
		}
		&__tab {
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
						timing-function: var(--ease-in-out-custom);
					}
				}
				&--home &-1 {
					transform-origin: 12px 24px;
				}
				&--videos &-3 {
					fill: var(--color-nav-bg);
					stroke: var(--color-nav-bg);
				}
				&--read &-2,
				&--read &-3 {
					transform-origin: 12px 21px;
				}
				&--android &-2,
				&--android &-3 {
					transform-origin: 12px 21px;
				}
			}
			&-name {
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
				color: var(--color-nav-fg);
				display: flex;
				position: relative;
				text-decoration: none;
				width: 100%;
				height: 5.5em;
				transition: color calc(var(--trans-dur) / 2);
				-webkit-tap-highlight-color: transparent;
				&:hover,
				&:focus-visible {
					color: var(--color-nav-focus);
				}
			}
			&-link[aria-current='page'] {
				color: var(--color-nav-focus);
			}
			&-link[aria-current='page'] &-icon {
				transform: translateY(-50%);

				circle,
				path,
				polygon,
				rect {
					fill: var(--color-nav-focus);
				}
			}
			&-link[aria-current='page'] &-name {
				opacity: 1;
				transform: translateY(-200%);
			}
			&-link[aria-current='page'] &-icon--home &-icon-1 {
				animation-name: home-bounce;
			}
			&-link[aria-current='page'] &-icon--videos &-icon-1 {
				animation-name: video-move-1;
			}
			&-link[aria-current='page'] &-icon--videos &-icon-2 {
				animation-name: video-move-2;
			}
			&-link[aria-current='page'] &-icon--videos &-icon-3 {
				animation-name: video-fade-slide;
				opacity: 1;
				fill: var(--color-nav-bg);
			}

			&-link[aria-current='page'] &-icon--android &-icon-1 {
				animation-name: android-move;
			}
			&-link[aria-current='page'] &-icon--android &-icon-2 {
				animation-name: android-scale-left;
			}
			&-link[aria-current='page'] &-icon--android &-icon-3 {
				animation-name: android-scale-right;
			}
			&-link[aria-current='page'] &-icon--read &-icon-1 {
				animation-name: android-move;
			}
			&-link[aria-current='page'] &-icon--read &-icon-2 {
				animation-name: android-scale-left;
			}
			&-link[aria-current='page'] &-icon--read &-icon-3 {
				animation-name: android-scale-right;
			}
			&-link[aria-current='page'] &-icon--profile &-icon-1 {
				animation-name: profile-head-bob;
			}
		}
	}

	@keyframes home-bounce {
		from,
		to {
			transform: scale(1, 1) translateY(0);
		}
		20% {
			transform: scale(1.5, 0.75) translateY(0);
		}
		40% {
			transform: scale(0.8, 1.2) translateY(-4px);
		}
		60% {
			transform: scale(1.1, 0.9) translateY(0);
		}
		80% {
			transform: scale(0.95, 1.05) translateY(0);
		}
	}
	@keyframes video-move-1 {
		from,
		to {
			transform: translate(0, 0);
		}
		20%,
		80% {
			transform: translate(0, 4px);
		}
	}
	@keyframes video-move-2 {
		from,
		to {
			transform: translate(1px, 9px);
		}
		20%,
		80% {
			transform: translate(1px, 5px);
		}
	}
	@keyframes video-fade-slide {
		from {
			animation-timing-function: steps(1, end);
			opacity: 0;
			transform: translate(0, 0);
		}
		40% {
			animation-timing-function: var(--ease-out-custom);
			opacity: 1;
			stroke: hsla(0, 0%, 0%, 0);
			transform: translate(-4px, 0);
		}
		60%,
		to {
			opacity: 1;
			stroke: var(--color-nav-bg);
			transform: translate(0, 0);
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

	@media (max-width: 768px) {
		.tab-bar__tabs {
			gap: 0.5rem;
			padding: 0 0.5rem;
		}

		.corner {
			margin: 0.25rem 0.5rem;
		}
	}
</style>
