<script lang="ts">
	import { products } from '#lib/data/products.js';
	import ListingPage from '#lib/components/ListingPage.svelte';

	const menProducts = products.filter(
		(product) => product.gender === 'men' || product.gender === 'unisex'
	);
</script>

<svelte:head>
	<title>Men's Sneakers | Dovax</title>
	<meta
		name="description"
		content="Shop Dovax sneakers for men — running, court and lifestyle styles built for all-day comfort."
	/>
</svelte:head>

<ListingPage
	eyebrow="Men"
	title="Men's Sneakers"
	description="Running, court and lifestyle sneakers built for all-day comfort."
	products={menProducts}
	breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Men' }]}
/>
