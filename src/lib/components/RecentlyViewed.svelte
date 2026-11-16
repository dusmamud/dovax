<script lang="ts">
	import { recentlyViewed } from '#lib/stores/recently-viewed.svelte.js';
	import ProductGrid from '#lib/components/ProductGrid.svelte';

	let { excludeSlug }: { excludeSlug?: string } = $props();

	const items = $derived(
		recentlyViewed.products.filter((product) => product.slug !== excludeSlug).slice(0, 4)
	);
</script>

{#if items.length > 0}
	<section
		class="mx-auto max-w-7xl border-t border-line px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
	>
		<h2 class="font-display text-h2 font-bold">Recently viewed</h2>
		<div class="mt-8">
			<ProductGrid products={items} />
		</div>
	</section>
{/if}
