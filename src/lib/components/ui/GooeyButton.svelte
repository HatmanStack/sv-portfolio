<script lang="ts">
  interface Props {
    children?: any;
    onclick?: () => void;
  }

  let { children, onclick }: Props = $props();

  let buttonElement: HTMLButtonElement;
  let introInterval: number;

  function moveBg(e: PointerEvent) {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    (e.target as HTMLElement).style.setProperty('--x', `${(e.clientX - rect.x) / rect.width * 100}`);
    (e.target as HTMLElement).style.setProperty('--y', `${(e.clientY - rect.y) / rect.height * 100}`);
  }

  function intro() {
    let i = 4;
    if (!buttonElement) return;

    buttonElement.style.setProperty('--a', '100%');
    introInterval = setInterval(() => {
      if (!buttonElement) return;

      buttonElement.style.setProperty('--x', `${((Math.cos(i) + 2) / 3.6) * 100}`);
      buttonElement.style.setProperty('--y', `${((Math.sin(i) + 2) / 3.6) * 100}`);
      i += 0.03;

      if (i > 11.5) {
        clearInterval(introInterval);
        buttonElement.style.setProperty('--a', '');
      }
    }, 16);
  }

  function handlePointerOver(e: PointerEvent) {
    clearInterval(introInterval);
    (e.target as HTMLElement).style.setProperty('--a', '');
  }

  $effect(() => {
    intro();

    return () => {
      if (introInterval) {
        clearInterval(introInterval);
      }
    };
  });
</script>

<svelte:head>
  <svg style="position: absolute; width: 0; height: 0;">
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
      </filter>
    </defs>
  </svg>
</svelte:head>

<button
  bind:this={buttonElement}
  type="button"
  class="gooey-button"
  onclick={onclick}
  onpointermove={moveBg}
  onpointerover={handlePointerOver}
>
  {@render children?.()}
</button>

<style>
  /* Component-specific @property declarations */
  @property --a {
    syntax: "<percentage>";
    initial-value: 0%;
    inherits: true;
  }

  @property --hue {
    syntax: "<angle>";
    initial-value: 170deg;
    inherits: false;
  }

  /* Spring easing and duration now come from global tokens.css */

  .gooey-button {
    --a: 0%;
    --hue: 170deg;
    --x: 50;
    --y: 50;
    --button: hsl(var(--hue), 66%, 66%);
    --edge: 20px;
    --size: 2em;
    
    background: transparent;
    color: hsla(var(--hue), 80%, 30%, 0.7);
    font-size: 1.8em;
    position: relative;
    padding: calc(var(--size)) calc(var(--size)*1.5);
    animation: color 20s linear infinite both;
    transition: 
      --a .5s ease-in-out, 
      scale var(--spring-duration) var(--spring-easing);
    scale: 0.92;
    isolation: isolate;
    border: none;
    cursor: pointer;
  }

  .gooey-button:hover {
    --a: 100%;
    transition-duration: .5s, 1s;
    box-shadow: none;
    opacity: 1;
    scale: 1;
  }

  .gooey-button:before {
    content: "";
    position: absolute;
    inset: 0em;
    filter: blur(12px) url(#goo) drop-shadow(0 .25em .5em hsla(0deg, 0%, 0%, 0.8)); 
    background-image:
      linear-gradient(0deg,var(--button),var(--button)),
      radial-gradient(
        40% 70% at calc(var(--x) * 1%) calc(var(--y) * 1%),
        hsla(var(--hue), 77%, 77%, var(--a)) 0%,
        transparent 90%
      );
    background-clip: content-box, border-box;
    padding: 24px;
    z-index: -1;
    border: inherit;
    animation: color 20s linear infinite both;
  }

  @keyframes color {
    from {
      --hue: 170deg;
    }
    to {
      --hue: 530deg;
    }
  }
</style>