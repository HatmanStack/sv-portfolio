export const prerender = true;

const SITE_URL = 'https://portfolio.hatstack.fun';

interface Post {
	slug: string;
	date: string;
}

export async function GET() {
	const posts = import.meta.glob('../read/post/*.md', { eager: true });

	const blogPosts: Post[] = Object.entries(posts)
		.map(([path, post]) => {
			const slug = path.split('/').pop()?.replace('.md', '') || '';
			const metadata = (post as { metadata: { date: string } }).metadata;
			return {
				slug,
				date: metadata?.date || ''
			};
		})
		.filter((post) => post.slug);

	const staticPages = [
		{ path: '', priority: '1.0', changefreq: 'weekly' },
		{ path: '/about', priority: '0.8', changefreq: 'monthly' },
		{ path: '/read', priority: '0.9', changefreq: 'weekly' },
		{ path: '/android', priority: '0.8', changefreq: 'monthly' },
		{ path: '/web', priority: '0.8', changefreq: 'monthly' }
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
	.map(
		(page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
${blogPosts
	.map(
		(post) => `  <url>
    <loc>${SITE_URL}/read/post/${encodeURIComponent(post.slug)}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
}
