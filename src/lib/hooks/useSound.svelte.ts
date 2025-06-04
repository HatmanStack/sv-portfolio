import type { SoundOptions } from '$lib/types/index.js';

export function createSoundStore(soundFile: string, options: SoundOptions = {}) {
  let audio = $state<HTMLAudioElement | null>(null);
  let isLoaded = $state(false);
  let error = $state<Error | null>(null);
  
  const { volume = 1, loop = false, preload = true } = options;

  if (typeof window !== 'undefined' && typeof Audio !== 'undefined') {
    const audioElement = new Audio(soundFile);
    audioElement.volume = volume;
    audioElement.loop = loop;
    if (preload) audioElement.preload = 'auto';
    
    audioElement.addEventListener('canplaythrough', () => {
      isLoaded = true;
    });
    
    audioElement.addEventListener('error', (e) => {
      error = new Error(`Failed to load audio: ${e.message || 'Unknown error'}`);
    });
    
    audio = audioElement;
  }

  return {
    get isLoaded() { return isLoaded; },
    get error() { return error; },
    get audio() { return audio; },
    
    async play() {
      if (!audio || !isLoaded) {
        console.warn('Audio not ready for playback');
        return;
      }
      
      try {
        audio.currentTime = 0;
        await audio.play();
      } catch (err) {
        error = err instanceof Error ? err : new Error('Playback failed');
        console.error('Audio playback failed:', error);
      }
    },
    
    pause() {
      if (audio) {
        audio.pause();
      }
    },
    
    stop() {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    },
    
    setVolume(newVolume: number) {
      if (audio) {
        audio.volume = Math.max(0, Math.min(1, newVolume));
      }
    }
  };
}

export function useSoundAction(soundFile: string, options: SoundOptions = {}) {
  const soundStore = createSoundStore(soundFile, options);
  
  return (node: HTMLElement) => {
    const handleClick = (event: Event) => {
      event.preventDefault();
      soundStore.play();
    };

    node.addEventListener('click', handleClick);

    return {
      destroy() {
        node.removeEventListener('click', handleClick);
      }
    };
  };
}