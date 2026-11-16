<script lang="ts">
	import { products } from '#lib/data/products.js';
	import ListingPage from '#lib/components/ListingPage.svelte';

	const saleProducts = products.filter((product) => product.badges.includes('sale'));
</script>

<svelte:head>
	<title>Sale | Dovax</title>
	<meta
		name="description"
		content="Dovax sneakers on sale — our best-loved styles at reduced prices, while stocks last."
	/>
</svelte:head>

<ListingPage
	eyebrow="Limited Time"
	title="Sale"
	description="Our best-loved styles at reduced prices — while stocks last."
	products={saleProducts}
	breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Sale' }]}
/>
