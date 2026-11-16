<script lang="ts">
	import { products } from '#lib/data/products.js';
	import ListingPage from '#lib/components/ListingPage.svelte';

	const bestSellers = products
		.filter((product) => product.badges.includes('bestseller'))
		.sort((a, b) => b.reviewCount - a.reviewCount);
</script>

<svelte:head>
	<title>Best Sellers | Dovax</title>
	<meta
		name="description"
		content="Our most-loved Dovax sneakers, ranked by what customers buy and review most."
	/>
</svelte:head>

<ListingPage
	eyebrow="Popular Right Now"
	title="Best Sellers"
	description="The pairs our customers keep coming back for, ranked by reviews."
	products={bestSellers}
	breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Best Sellers' }]}
/>
