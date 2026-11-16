<script lang="ts">
	import { ShoppingBag, Trash2 } from '@lucide/svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import EmptyState from '#lib/components/EmptyState.svelte';
	import RatingStars from '#lib/components/RatingStars.svelte';
	import SectionHeader from '#lib/components/SectionHeader.svelte';
	import { wishlist } from '#lib/stores/wishlist.svelte.js';
	import { cart } from '#lib/stores/cart.svelte.js';
	import { toasts } from '#lib/stores/toasts.svelte.js';
	import { formatPrice } from '#lib/utils/format.js';

	function moveToCart(id: string, name: string): void {
		cart.add(id);
		wishlist.remove(id);
		toasts.push(`${name} moved to cart`);
	}
</script>

<svelte:head>
	<title>Wishlist — Dovax</title>
	<meta
		name="description"
		content="Your saved Dovax sneakers. Move them to your cart when you're ready, or keep browsing the collection."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Wishlist' }]} />
	<div class="mt-6">
		<SectionHeader
			eyebrow="Saved items"
			title="Your Wishlist"
			description="Sneakers you've saved for later. Move them to your cart when you're ready."
		/>
	</div>

	{#if wishlist.products.length === 0}
		<EmptyState
			icon="heart"
			title="Your wishlist is empty"
			message="Tap the heart on any product to save it here for later."
			actionLabel="Discover sneakers"
			actionHref="/shop/"
		/>
	{:else}
		<p class="mt-8 text-sm text-ink-soft" aria-live="polite">
			{wishlist.count}
			{wishlist.count === 1 ? 'item' : 'items'} saved
		</p>
		<div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each wishlist.products as product (product.id)}
				<article class="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper">
					<a href="/product/{product.slug}/" class="block overflow-hidden bg-card">
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
					<div class="flex flex-1 flex-col p-4">
						<a href="/product/{product.slug}/" class="hover:underline">
							<h2 class="font-display text-base font-semibold">{product.name}</h2>
						</a>
						<p class="mt-0.5 text-sm text-ink-soft">{product.tagline}</p>
						<p class="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
							<RatingStars rating={product.rating} />
							<span>{product.rating} ({product.reviewCount})</span>
						</p>
						<p class="mt-2 font-semibold">{formatPrice(product.price)}</p>
						<div class="mt-4 flex gap-2">
							<button
								type="button"
								onclick={() => moveToCart(product.id, product.name)}
								class="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-white transition-colors hover:bg-black"
							>
								<ShoppingBag class="size-4" aria-hidden="true" />
								Move to cart
							</button>
							<button
								type="button"
								onclick={() => {
									wishlist.remove(product.id);
									toasts.push('Removed from wishlist');
								}}
								aria-label="Remove {product.name} from wishlist"
								class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:bg-cream hover:text-ink"
							>
								<Trash2 class="size-5" aria-hidden="true" />
							</button>
						</div>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</div>
