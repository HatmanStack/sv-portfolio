<script>
  import { onMount, onDestroy } from 'svelte';
  import { PointerParticle } from './PointerParticle.js';

  let canvas;
  let ctx;
  let particles = [];
  let pointer = { x: 0, y: 0, mx: 0, my: 0 };
  let hue = 0;
  const fps = 60;
  const msPerFrame = 1000 / fps;
  let timePrevious;

  function setCanvasDimensions() {
    if (canvas) {
      const rect = canvas.parentNode.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      console.log('Canvas resized:', rect.width, rect.height);
    }
  }

  function createParticles(event, { count, speed, spread }) {
    console.log('Event received:', event);
    setPointerValues(event);
    console.log('Creating particles:', count, speed, spread);
    for (let i = 0; i < count; i++) {
      particles.push(new PointerParticle(spread, speed, { ctx, pointer, hue }));
    }
  }

  function setPointerValues(event) {
    if (canvas) {
      pointer.x = event.clientX - canvas.offsetLeft;
      pointer.y = event.clientY - canvas.offsetTop;
      pointer.mx = event.movementX;
      pointer.my = event.movementY;
      console.log('Pointer values set:', pointer);
    }
  }

  function getPointerVelocity(event) {
    const a = event.movementX;
    const b = event.movementY;
    return Math.floor(Math.sqrt(a * a + b * b));
  }

  function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      if (particles[i].size <= 0.1) {
        particles.splice(i, 1);
        console.log('Particle removed:', i);
        i--;
      }
    }
  }

  function animateParticles() {
    requestAnimationFrame(() => {
      if (canvas) {
        const timeNow = performance.now();
        const timePassed = timeNow - timePrevious;

        if (timePassed < msPerFrame) return;

        const excessTime = timePassed % msPerFrame;
        timePrevious = timeNow - excessTime;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hue = hue > 360 ? 0 : (hue += 3);

        handleParticles();
        animateParticles();
      }
    });
  }
  
  function setupEvents() {
    if (canvas) {
      const parent = canvas.parentNode;
      parent.addEventListener("click", (event) => {
        createParticles(event, { count: 300, speed: Math.random() + 1, spread: Math.random() + 50 });
      });

      parent.addEventListener("pointermove", (event) => {
        createParticles(event, { count: 20, speed: getPointerVelocity(event), spread: 1 });
      });

      window.addEventListener("resize", setCanvasDimensions);
    }
  }

  onMount(() => {
    if (canvas) {
      ctx = canvas.getContext("2d");
      console.log('Canvas context initialized');
      setCanvasDimensions();
      setupEvents();
      timePrevious = performance.now();
      animateParticles();
    }
  });

  onDestroy(() => {
    if (canvas) {
      window.removeEventListener("resize", setCanvasDimensions);
      console.log('Component destroyed and events removed.');
    }
  });
</script>

<style>
  :global(body) {
    margin: 0;
    overflow: hidden;
  }
  canvas {
    display: grid;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>

<canvas bind:this={canvas}></canvas>