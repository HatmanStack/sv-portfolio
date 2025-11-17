import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import sveltePreprocess from 'svelte-preprocess';

const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',  // Add this for SPA fallback
      precompress: true, // Enable gzip and brotli compression
      strict: false  // Relaxing the strict mode
    }),
    prerender: {
      entries: ['*', '/read/post/*']  // Add this to handle dynamic routes
    }
  },
  extensions: ['.svelte', '.md'],
  preprocess: [
    sveltePreprocess({
      scss: {
        includePaths: ['src']
      }
    }),
    vitePreprocess(),
    mdsvex({
      extensions: ['.md']
    })
  ]
};

export default config;