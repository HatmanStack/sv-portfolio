import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';

export default {
  kit: {
    adapter: adapter(),
    // Other configuration options
  },
  preprocess: sveltePreprocess({
    scss: {
      includePaths: ['src'], // Optional if you have SCSS files in subfolders
    },
  }),
};