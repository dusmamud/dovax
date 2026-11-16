<script lang="ts">
	import { products } from '#lib/data/products.js';
	import ListingPage from '#lib/components/ListingPage.svelte';

	const newProducts = products.filter((product) => product.isNew);
</script>

<svelte:head>
	<title>New Arrivals | Dovax</title>
	<meta
		name="description"
		content="The latest Dovax drops — fresh styles, new colours and new tech, just landed."
	/>
</svelte:head>

<ListingPage
	eyebrow="Just In"
	title="New Arrivals"
	description="The latest drops from Dovax — fresh styles, new colours and new tech."
	products={newProducts}
	breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'New Arrivals' }]}
/>
