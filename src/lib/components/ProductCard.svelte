<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Check, ShoppingBag, Star } from '@lucide/svelte';
	import { cart } from '#lib/stores/cart.svelte.js';
	import { reveal } from '#lib/actions/reveal.js';
	import { formatPrice } from '#lib/utils/format.js';
	import type { Product } from '#lib/data/products.js';

	let { product }: { product: Product } = $props();

	let added = $state(false);
	let timeout: ReturnType<typeof setTimeout> | undefined;

	onDestroy(() => clearTimeout(timeout));

	function handleAdd() {
		cart.add(product.id);
		added = true;
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			added = false;
		}, 1200);
	}
</script>

<article class="reveal group" use:reveal>
	<div class="relative overflow-hidden rounded-2xl bg-card">
		<img
			src={product.image}
			alt={product.name}
			width="900"
			height="900"
			loading="lazy"
			decoding="async"
			class="aspect-square w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
		/>
		{#if product.badge}
			<span
				class="absolute top-3 left-3 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white"
			>
				{product.badge}
			</span>
		{/if}
	</div>
	<div class="mt-4 flex items-start justify-between gap-3">
		<div class="min-w-0">
			<h3 class="font-display text-base font-semibold">{product.name}</h3>
			<p class="mt-0.5 text-sm text-ink-soft">{product.tagline}</p>
			<p class="mt-2 font-semibold">{formatPrice(product.price)}</p>
			<p class="mt-1.5 flex items-center gap-1.5 text-sm text-ink-soft">
				<span class="flex gap-0.5" aria-hidden="true">
					{#each [0, 1, 2, 3, 4] as star (star)}
						<Star class="size-4 fill-gold text-gold" />
					{/each}
				</span>
				<span class="sr-only">Rated {product.rating} out of 5,</span>
				<span>{product.rating} ({product.reviews})</span>
			</p>
		</div>
		<button
			type="button"
			onclick={handleAdd}
			aria-label="Add {product.name} to cart"
			class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-white transition-colors hover:bg-black"
		>
			{#if added}
				<Check class="size-5" aria-hidden="true" />
			{:else}
				<ShoppingBag class="size-5" aria-hidden="true" />
			{/if}
		</button>
	</div>
</article>
