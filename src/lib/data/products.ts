export interface Product {
	id: string;
	slug: string;
	name: string;
	tagline: string;
	/** Price in INR (whole rupees). */
	price: number;
	rating: number;
	/** Display string, e.g. "1.2K" or "980". */
	reviews: string;
	image: string;
	badge?: string;
}

export const products: Product[] = [
	{
		id: 'air-pro',
		slug: 'dovax-air-pro',
		name: 'Dovax Air Pro',
		tagline: 'Everyday Comfort',
		price: 7999,
		rating: 4.8,
		reviews: '1.2K',
		image: '/images/product-air-pro.jpg',
		badge: 'Bestseller'
	},
	{
		id: 'run-2',
		slug: 'dovax-run-2-0',
		name: 'Dovax Run 2.0',
		tagline: 'Performance Running',
		price: 8999,
		rating: 4.7,
		reviews: '980',
		image: '/images/product-run-2.jpg'
	},
	{
		id: 'glide',
		slug: 'dovax-glide',
		name: 'Dovax Glide',
		tagline: 'Lightweight & Versatile',
		price: 7499,
		rating: 4.6,
		reviews: '640',
		image: '/images/product-glide.jpg'
	},
	{
		id: 'court',
		slug: 'dovax-court',
		name: 'Dovax Court',
		tagline: 'Classic Street Style',
		price: 9999,
		rating: 4.8,
		reviews: '1.1K',
		image: '/images/product-court.jpg'
	}
];

export function getProduct(id: string): Product | undefined {
	return products.find((product) => product.id === id);
}
