<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import { products } from '#lib/data/products.js';
	import { reveal } from '#lib/actions/reveal.js';
	import ProductCard from '#lib/components/ProductCard.svelte';
</script>

<section
	id="best-sellers"
	class="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
>
	<div class="reveal flex flex-wrap items-end justify-between gap-4" use:reveal>
		<div>
			<p class="text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase">
				Popular Right Now
			</p>
			<h2 class="mt-3 font-display text-h2 font-bold">Best Sellers</h2>
		</div>
		<a
			href="/#best-sellers"
			class="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-paper px-5 text-sm font-semibold transition-colors hover:bg-cream"
		>
			View All
			<ArrowRight class="size-4" aria-hidden="true" />
		</a>
	</div>
	<div class="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
		{#each products as product (product.id)}
			<ProductCard {product} />
		{/each}
	</div>
</section>
