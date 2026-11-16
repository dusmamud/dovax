<script lang="ts">
	import { products } from '#lib/data/products.js';
	import ListingPage from '#lib/components/ListingPage.svelte';

	const womenProducts = products.filter(
		(product) => product.gender === 'women' || product.gender === 'unisex'
	);
</script>

<svelte:head>
	<title>Women's Sneakers | Dovax</title>
	<meta
		name="description"
		content="Shop Dovax sneakers for women — lightweight knit, running and court styles designed for comfort and everyday wear."
	/>
</svelte:head>

<ListingPage
	eyebrow="Women"
	title="Women's Sneakers"
	description="Lightweight knit, running and court styles designed for comfort and everyday wear."
	products={womenProducts}
	breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Women' }]}
/>
