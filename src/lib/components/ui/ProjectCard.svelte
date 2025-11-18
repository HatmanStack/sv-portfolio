<script lang="ts">
  import type { Project } from '$lib/types/index.js';
  import { createSoundStore } from '$lib/hooks/useSound.svelte.js';
  import GooeyButton from './GooeyButton.svelte';
  import click from '$lib/sounds/click.wav';

  interface Props {
    project: Project;
    lazy?: boolean;
  }

  let { project, lazy = true }: Props = $props();
  
  const clickSound = createSoundStore(click);
  
  function handleClick() {
    clickSound.play();
  }
</script>

<div class="content">
  <img
    src={project.images.profession}
    class="profession_image"
    alt="{project.title} profession"
    loading={lazy ? 'lazy' : 'eager'}
    decoding="async"
  />
  <img
    src={project.images.profile}
    class="profile_image"
    alt="{project.title} profile"
    loading={lazy ? 'lazy' : 'eager'}
    decoding="async"
  />
  <div class="profile_detail">
    <span>{project.title}</span>
    <p>{project.category}</p>
  </div>
  <div class="wrapper">			
    <div class="profile_quote">
      <p style="font-size:.8em" class="fade-in">{project.description}</p>
      <a href={project.link}>
        <GooeyButton onclick={handleClick}>
          {project.buttonText}
        </GooeyButton>
      </a>
    </div>
  </div>
</div>

<style>
  .content {
    --active: 0;
    cursor: pointer;
    overflow: hidden; 
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 1.5rem;
    padding: 2.5rem;
    width: calc((100% / 3) - var(--gap));
    height: 100%;
    border-radius: 1rem;
    transition: all 0.5s ease-in-out;
  }

  .content:hover {
    --active: 1;
    width: calc(90% - var(--gap));
  }

  .content::before {
    content: "";
    position: absolute;
    z-index: -10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-card-dark);
    opacity: 0.6;
    transition: opacity var(--transition-slow) ease-in-out;
  }

  .content:hover::before {
    opacity: 0.8;
  }

  .content img {
    position: absolute;
    z-index: -20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.5s ease-in-out;
  }

  .content .profession_image {
    opacity: var(--active);
    transform: scale(1.1);
    transition: 
      opacity 0.3s ease-in-out,
      transform 0.5s ease-in-out;
  }

  .content .profile_image {
    opacity: calc(1 - var(--active));
    transition: 
      opacity 0.3s ease-in-out,
      transform 0.5s ease-in-out;
  }

  .content:hover .profession_image {
    transform: scale(1);
  }

  .profile_detail {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 12rem;
    transition: transform 0.5s cubic-bezier(0.23, 0.93, 0.77, 1) 0.01s;
    z-index: 1;
  }

  .profile_detail span {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-card-light);
    text-wrap: nowrap;
  }

  .profile_detail p {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    color: var(--color-card-light);
  }

  .wrapper {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: grid-template-rows 0.5s cubic-bezier(0.23, 0.93, 0.77, 1) 0.01s;
  }

  .profile_quote {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-height: 0;
    width: 100%;
    transform: translateY(50%);
    opacity: 0;
    transition: 
      opacity 0.8s ease-in-out,
      transform 0.8s cubic-bezier(0.23, 0.93, 0.77, 1) 0.01s;
    z-index: 1;
  }

  .profile_quote p {
    flex: 1;
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-card-light);
  }

  .profile_quote button {
    flex-shrink: 0;
  }

  .content:hover .wrapper {
    grid-template-rows: 1fr;
  }

  .content:hover .profile_quote {
    transform: none;
    opacity: 1;
  }

  .fade-in {
    opacity: 0;
  }

  .content:hover .profile_detail {
    opacity: 0;
    animation: fadeIn 1s ease-in 0.3s forwards;
  }

  .content:hover .fade-in {
    animation: fadeIn 1s ease-in 0.3s forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>