import { error } from '@sveltejs/kit';

export async function load({ params }) {
	// Validate slug to prevent path traversal
	if (!/^[a-z0-9-]+$/i.test(params.slug)) {
		throw error(404, 'Invalid slug');
	}

	try {
		const post = await import(`../${params.slug}.md`);

		return {
			...post.metadata,
			content: post.default
		};
	} catch (error) {
		console.error('Error loading post:', error);
		throw error;
	}
}
