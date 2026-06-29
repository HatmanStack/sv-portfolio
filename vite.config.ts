import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],

	build: {
		// Don't let esbuild downlevel modern CSS. The theme toggle relies on light-dark()
		// resolving against `color-scheme`; the default cssTarget (~chrome87) rewrites it
		// to `prefers-color-scheme` media queries, which follow the OS instead of the
		// toggle. Target browsers that support light-dark()/color-mix() so it stays intact.
		cssTarget: ['chrome123', 'edge123', 'firefox120', 'safari17.5'],

		// Minify using terser for better compression than esbuild
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: false, // Keep console logs for debugging
				drop_debugger: true,
				pure_funcs: ['console.debug'] // Only remove debug logs
			},
			format: {
				comments: false // Remove comments
			}
		},

		// Chunk size warnings at 500KB
		chunkSizeWarningLimit: 500,

		// Rollup options for better chunking
		rollupOptions: {
			output: {
				// Manual chunk splitting for better caching
				manualChunks: (id) => {
					// Vendor chunk for node_modules
					if (id.includes('node_modules')) {
						// Group all vendor code together for better caching
						return 'vendor';
					}
				}
			}
		}
	},

	// Optimize dependencies
	optimizeDeps: {
		include: ['@fontsource/fira-mono'] // Pre-bundle fonts
	}
});
