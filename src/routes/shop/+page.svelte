<script lang="ts">
	import { browser } from '$app/env';
	import { page } from '$app/state';
	import { products, type ProductCategory } from '#lib/data/products.js';
	import ListingPage from '#lib/components/ListingPage.svelte';

	const CATEGORIES: ProductCategory[] = ['men', 'women', 'running', 'lifestyle'];

	// The initial category filter comes from ?category= (e.g. /shop/?category=running).
	// Invalid values are ignored and show the full catalogue. searchParams throws
	// during prerender, so it is read only in the browser.
	const initialCategory = $derived.by(() => {
		if (!browser) return undefined;
		const raw = page.url.searchParams.get('category');
		return raw && (CATEGORIES as string[]).includes(raw)
			? (raw as ProductCategory)
			: undefined;
	});
</script>

<svelte:head>
	<title>Shop All Sneakers | Dovax</title>
	<meta
		name="description"
		content="Shop the full Dovax sneaker collection — running, court, knit and lifestyle styles for men and women, with free shipping over ₹999."
	/>
</svelte:head>

<ListingPage
	eyebrow="Shop"
	title="All Sneakers"
	description="Every Dovax style in one place. Filter by category, size, price, colour or rating to find your pair."
	products={products}
	{initialCategory}
	breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Shop' }]}
/>
