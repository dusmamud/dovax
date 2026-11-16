<script lang="ts">
	import ProductCard from '#lib/components/ProductCard.svelte';
	import type { Product } from '#lib/data/products.js';

	let { products }: { products: Product[] } = $props();
</script>

<div class="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each products as product (product.id)}
		<ProductCard {product} />
	{/each}
</div>
