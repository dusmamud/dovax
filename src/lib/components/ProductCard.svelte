<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Check, ShoppingBag } from '@lucide/svelte';
	import { cart } from '#lib/stores/cart.svelte.js';
	import { toasts } from '#lib/stores/toasts.svelte.js';
	import { reveal } from '#lib/actions/reveal.js';
	import { formatCount, formatPrice } from '#lib/utils/format.js';
	import RatingStars from '#lib/components/RatingStars.svelte';
	import WishlistButton from '#lib/components/WishlistButton.svelte';
	import type { Product } from '#lib/data/products.js';

	let { product }: { product: Product } = $props();

	// Badge priority: sale > new > bestseller.
	const badge = $derived(
		product.compareAtPrice
			? 'Sale'
			: product.badges.includes('new')
				? 'New'
				: product.badges.includes('bestseller')
					? 'Bestseller'
					: null
	);

	let added = $state(false);
	let timeout: ReturnType<typeof setTimeout> | undefined;

	onDestroy(() => clearTimeout(timeout));

	function handleAdd() {
		// Quick add uses the default size (UK 9) — the product page offers full size choice.
		cart.add(product.id);
		toasts.push('Added to cart');
		added = true;
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			added = false;
		}, 1200);
	}
</script>

<article class="reveal group" use:reveal>
	<div class="relative overflow-hidden rounded-2xl bg-card">
		<a href="/product/{product.slug}/">
			<img
				src={product.image}
				alt={product.name}
				width="900"
				height="900"
				loading="lazy"
				decoding="async"
				class="aspect-square w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
			/>
		</a>
		{#if badge}
			<span
				class="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold text-white {badge ===
				'Sale'
					? 'bg-red-600'
					: 'bg-ink'}"
			>
				{badge}
			</span>
		{/if}
		<div class="absolute top-3 right-3">
			<WishlistButton productId={product.id} size="sm" />
		</div>
	</div>
	<div class="mt-4 flex items-start justify-between gap-3">
		<div class="min-w-0">
			<h3 class="font-display text-base font-semibold">
				<a href="/product/{product.slug}/" class="transition-colors hover:text-ink-soft">
					{product.name}
				</a>
			</h3>
			<p class="mt-0.5 text-sm text-ink-soft">{product.tagline}</p>
			<p class="mt-2 flex flex-wrap items-baseline gap-2">
				<span class="font-semibold">{formatPrice(product.price)}</span>
				{#if product.compareAtPrice}
					<span class="text-sm text-ink-soft line-through">
						{formatPrice(product.compareAtPrice)}
					</span>
				{/if}
			</p>
			<p class="mt-1.5 flex items-center gap-1.5 text-sm text-ink-soft">
				<RatingStars rating={product.rating} size={16} />
				<span>{product.rating} ({formatCount(product.reviewCount)})</span>
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
