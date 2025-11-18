import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],

	build: {
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
