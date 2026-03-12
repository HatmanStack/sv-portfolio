import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import sveltePreprocess from 'svelte-preprocess';

const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '200.html',  // SPA fallback (must not be index.html to avoid overwriting prerendered homepage)
      precompress: true, // Enable gzip and brotli compression
      strict: false  // Relaxing the strict mode
    }),
    prerender: {
      entries: ['*', '/read/post/*', '/sitemap.xml']
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
      extensions: ['.md'],
      rehypePlugins: [rehypeSlug]
    })
  ]
};

export default config;