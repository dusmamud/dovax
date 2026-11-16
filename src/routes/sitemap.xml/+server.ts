import { posts } from '#lib/data/blog.js';
import { products } from '#lib/data/products.js';

export const prerender = true;

const BASE_URL = 'https://dovax.pages.dev';
const LAST_MOD = '2026-11-16';

const staticRoutes = [
	'/',
	'/shop/',
	'/men/',
	'/women/',
	'/new-arrivals/',
	'/best-sellers/',
	'/sale/',
	'/cart/',
	'/checkout/',
	'/search/',
	'/wishlist/',
	'/account/',
	'/about/',
	'/technology/',
	'/sustainability/',
	'/careers/',
	'/blog/',
	'/contact/',
	'/shipping/',
	'/returns/',
	'/size-guide/',
	'/faq/',
	'/privacy/',
	'/terms/'
];

export function GET(): Response {
	const urls = [
		...staticRoutes,
		...products.map((product) => `/product/${product.slug}/`),
		...posts.map((post) => `/blog/${post.slug}/`)
	];

	const entries = urls
		.map(
			(url) =>
				`  <url>\n    <loc>${BASE_URL}${url}</loc>\n    <lastmod>${LAST_MOD}</lastmod>\n  </url>`
		)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml' }
	});
}
