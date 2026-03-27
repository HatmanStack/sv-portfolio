import { error } from '@sveltejs/kit';

export async function load({ params }) {
	// Validate slug to prevent path traversal
	if (!/^[a-z0-9+=_-]+$/i.test(params.slug)) {
		throw error(404, 'Invalid slug');
	}

	try {
		const post = await import(`../${params.slug}.md`);

		return {
			...post.metadata,
			content: post.default
		};
	} catch (err) {
		console.error('Error loading post:', err);
		throw err;
	}
}
