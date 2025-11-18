/**
 * @param {string} soundFile - Path to the sound file
 * @param {any} options - Options for sound playback (currently unused)
 * @returns {(node: HTMLElement) => { destroy: () => void }} Svelte action function
 */
export function useSound(soundFile, options) {
    if (typeof Audio === 'undefined') {
      console.error('Audio is not supported in this environment');
      return () => ({ destroy: () => {} });
    }

    try {
      const audio = new Audio(soundFile);

      // Ensure the audio is loaded
      audio.addEventListener('canplaythrough', () => {
        // Audio ready for playback
      }, false);

      audio.addEventListener('error', (e) => {
        console.error('Error loading audio:', e);
      }, false);

      /**
       * @param {HTMLElement} node - DOM node to attach click handler to
       * @returns {{ destroy: () => void }} Svelte action return object
       */
      return (node) => {
        const handleClick = () => {
          audio.currentTime = 0; // Reset the audio to the start
          audio.play().catch((error) => {
            console.error('Audio playback failed:', error);
          });
        };

        node.addEventListener('click', handleClick);

        return {
          destroy() {
            node.removeEventListener('click', handleClick);
          }
        };
      };
    } catch (error) {
      console.error('Error initializing audio:', error);
      return () => ({ destroy: () => {} });
    }
  }