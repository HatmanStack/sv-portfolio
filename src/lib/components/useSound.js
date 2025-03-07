export function useSound(soundFile, options) {
    if (typeof Audio === 'undefined') {
      console.error('Audio is not supported in this environment');
      return () => ({ destroy: () => {} });
    }
  
    try {
      const audio = new Audio(soundFile);
  
      // Ensure the audio is loaded
      audio.addEventListener('canplaythrough', () => {
        console.log('Audio loaded successfully');
      }, false);
  
      audio.addEventListener('error', (e) => {
        console.error('Error loading audio:', e);
      }, false);
  
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
    }
  }