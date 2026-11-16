import { error } from '@sveltejs/kit';
import { getProductBySlug, products } from '#lib/data/products.js';
import type { EntryGenerator, PageLoad } from './$types';

// Prerender one page per product slug, derived from the data (never hardcoded).
export const entries: EntryGenerator = () =>
	products.map((product) => ({ slug: product.slug }));

export const load: PageLoad = ({ params }) => {
	const product = getProductBySlug(params.slug);
	if (!product) error(404, 'Product not found');
	return { product };
};
