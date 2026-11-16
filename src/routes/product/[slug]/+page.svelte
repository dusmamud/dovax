<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import { cart } from '#lib/stores/cart.svelte.js';
	import { recentlyViewed } from '#lib/stores/recently-viewed.svelte.js';
	import { toasts } from '#lib/stores/toasts.svelte.js';
	import { products, type ProductReview } from '#lib/data/products.js';
	import { formatCount, formatPrice } from '#lib/utils/format.js';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import FAQAccordion from '#lib/components/FAQAccordion.svelte';
	import ProductGrid from '#lib/components/ProductGrid.svelte';
	import QuantitySelector from '#lib/components/QuantitySelector.svelte';
	import RatingStars from '#lib/components/RatingStars.svelte';
	import RecentlyViewed from '#lib/components/RecentlyViewed.svelte';
	import ReviewForm, { REVIEWS_STORAGE_KEY } from '#lib/components/ReviewForm.svelte';
	import ReviewsList from '#lib/components/ReviewsList.svelte';
	import SizeSelector from '#lib/components/SizeSelector.svelte';
	import WishlistButton from '#lib/components/WishlistButton.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const product = $derived(data.product);

	// Three crops of the SAME image — never a different shoe.
	const views = [
		{ label: 'Full view', classes: 'object-cover' },
		{ label: 'Close-up of the toe', classes: 'scale-[1.8] object-left-top' },
		{ label: 'Close-up of the heel', classes: 'scale-[1.8] object-right-bottom' }
	];

	let view = $state(0);
	let selectedColor = $state(0);
	let selectedSize = $state<string | undefined>(undefined);
	let sizeError = $state<string | undefined>(undefined);
	let qty = $state(1);
	let storedReviews = $state<ProductReview[]>([]);

	const related = $derived(
		products
			.filter((item) => item.category === product.category && item.id !== product.id)
			.slice(0, 4)
	);

	// Customer-submitted reviews (localStorage) sit above the seeded ones.
	const allReviews = $derived([...storedReviews, ...product.reviews]);

	const accordionItems = $derived([
		{
			question: 'Details',
			answer: `${product.description} Features: ${product.features.join('; ')}. Materials: ${product.materials}`
		},
		{
			question: 'Shipping & Delivery',
			answer:
				'Orders over ₹999 ship free across India. Standard delivery arrives in 3–5 business days; express delivery (1–2 business days) is available at checkout. Orders placed before 2 pm IST ship the same working day.'
		},
		{
			question: 'Returns & Exchanges',
			answer:
				'Changed your mind? Return or exchange unworn shoes within 30 days of delivery for a full refund or a different size. Return pickup is free — start a return from your orders page or contact our support team.'
		}
	]);

	function readStoredReviews(slug: string): ProductReview[] {
		try {
			const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
			if (!raw) return [];
			const parsed: unknown = JSON.parse(raw);
			if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return [];
			const list = (parsed as Record<string, unknown>)[slug];
			return Array.isArray(list) ? (list as ProductReview[]) : [];
		} catch {
			return [];
		}
	}

	onMount(() => {
		// Load stored history before the effect below adds this product,
		// so the add merges with (rather than wipes) the stored list.
		recentlyViewed.load();
	});

	// Runs on mount AND on client-side navigation between products — the
	// component instance is reused across /product/[slug] pages, so onMount
	// alone would miss navigations. Resets all per-product state.
	// The writes are untracked: recentlyViewed.add() reads the store's slugs,
	// and tracking that read would re-trigger this effect on every add —
	// an infinite effect loop (effect_update_depth_exceeded).
	$effect(() => {
		const current = data.product;
		untrack(() => {
			view = 0;
			selectedColor = 0;
			selectedSize = undefined;
			sizeError = undefined;
			qty = 1;
			recentlyViewed.add(current.slug);
			storedReviews = readStoredReviews(current.slug);
		});
	});

	// Clear the size error as soon as a size is picked.
	$effect(() => {
		if (selectedSize) sizeError = undefined;
	});

	function handleAddToCart() {
		if (!selectedSize) {
			sizeError = 'Please select a size';
			return;
		}
		sizeError = undefined;
		for (let i = 0; i < qty; i++) {
			cart.add(product.id, selectedSize);
		}
		toasts.push('Added to cart');
	}

	function handleReviewSubmitted(review: ProductReview) {
		storedReviews = [review, ...storedReviews];
	}
</script>

<svelte:head>
	<title>{product.name} | Dovax</title>
	<meta name="description" content={product.description} />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<Breadcrumbs
		items={[
			{ label: 'Home', href: '/' },
			{ label: 'Shop', href: '/shop/' },
			{ label: product.name }
		]}
	/>

	<div class="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
		<!-- Gallery: three crops of the same image -->
		<div>
			<div class="overflow-hidden rounded-2xl bg-card">
				<img
					src={product.image}
					alt={product.name}
					width="900"
					height="900"
					class="aspect-square w-full object-cover transition-transform duration-300 {views[
						view
					].classes}"
				/>
			</div>
			<div class="mt-4 flex gap-3">
				{#each views as crop, index (crop.label)}
					<button
						type="button"
						onclick={() => (view = index)}
						aria-label={crop.label}
						aria-pressed={view === index}
						class="w-20 overflow-hidden rounded-xl border bg-card transition-shadow {view ===
						index
							? 'border-ink ring-2 ring-ink'
							: 'border-line hover:border-ink'}"
					>
						<img
							src={product.image}
							alt=""
							width="200"
							height="200"
							loading="lazy"
							decoding="async"
							class="aspect-square w-full object-cover {crop.classes}"
						/>
					</button>
				{/each}
			</div>
		</div>

		<!-- Buy box -->
		<div>
			<p class="text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase">
				{product.tagline}
			</p>
			<h1 class="mt-3 font-display text-h2 font-bold">{product.name}</h1>
			<a
				href="#reviews"
				class="mt-3 inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
			>
				<RatingStars rating={product.rating} size={16} />
				<span class="font-medium text-ink">{product.rating}</span>
				<span>({formatCount(product.reviewCount)} reviews)</span>
			</a>

			<div class="mt-4 flex flex-wrap items-baseline gap-3">
				<span class="font-display text-h3 font-bold">{formatPrice(product.price)}</span>
				{#if product.compareAtPrice}
					<span class="text-base text-ink-soft line-through">
						{formatPrice(product.compareAtPrice)}
					</span>
					<span class="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
						Save {formatPrice(product.compareAtPrice - product.price)}
					</span>
				{/if}
			</div>

			<p class="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
				{product.description}
			</p>

			<div class="mt-6">
				<p class="text-sm font-semibold">
					Colour:
					<span class="font-normal text-ink-soft">
						{product.colors[selectedColor]?.name ?? product.colors[0].name}
					</span>
				</p>
				<div class="mt-3 flex flex-wrap gap-2.5">
					{#each product.colors as color, index (color.name)}
						<button
							type="button"
							onclick={() => (selectedColor = index)}
							aria-label={color.name}
							aria-pressed={selectedColor === index}
							title={color.name}
							style="background-color: {color.hex}"
							class="size-11 rounded-full border border-line transition-shadow {selectedColor ===
							index
								? 'ring-2 ring-ink ring-offset-2 ring-offset-paper'
								: 'hover:ring-2 hover:ring-ink-soft hover:ring-offset-2 hover:ring-offset-paper'}"
						></button>
					{/each}
				</div>
			</div>

			<div class="mt-6">
				<p class="mb-3 text-sm font-semibold">Size</p>
				<SizeSelector sizes={product.sizes} bind:selected={selectedSize} error={sizeError} />
			</div>

			<div class="mt-6 flex flex-wrap items-center gap-3">
				<QuantitySelector bind:qty max={Math.min(10, product.stock)} />
				<button
					type="button"
					onclick={handleAddToCart}
					class="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-black"
				>
					Add to cart
				</button>
				<WishlistButton productId={product.id} size="md" />
			</div>

			{#if product.stock <= 5}
				<p class="mt-4 flex items-center gap-2 text-sm font-semibold text-gold">
					<span class="size-2 rounded-full bg-gold" aria-hidden="true"></span>
					Only {product.stock} left in stock
				</p>
			{:else}
				<p class="mt-4 flex items-center gap-2 text-sm text-ink-soft">
					<span class="size-2 rounded-full bg-green-600" aria-hidden="true"></span>
					In stock
				</p>
			{/if}

			<div class="mt-8">
				<FAQAccordion items={accordionItems} />
			</div>
		</div>
	</div>
</section>

<section
	id="reviews"
	class="mx-auto max-w-7xl scroll-mt-24 border-t border-line px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
>
	<h2 class="font-display text-h2 font-bold">Reviews</h2>
	<div class="mt-6 flex flex-wrap items-center gap-4">
		<span class="font-display text-h2 font-bold">{product.rating}</span>
		<div>
			<RatingStars rating={product.rating} size={20} />
			<p class="mt-1 text-sm text-ink-soft">
				Based on {formatCount(product.reviewCount)} reviews
			</p>
		</div>
	</div>
	<div class="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
		<ReviewsList reviews={allReviews} />
		<div>
			<h3 class="font-display text-h3 font-bold">Write a review</h3>
			<div class="mt-4">
				<ReviewForm productSlug={product.slug} onSubmitted={handleReviewSubmitted} />
			</div>
		</div>
	</div>
</section>

{#if related.length > 0}
	<section
		class="mx-auto max-w-7xl border-t border-line px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
	>
		<h2 class="font-display text-h2 font-bold">You may also like</h2>
		<div class="mt-8">
			<ProductGrid products={related} />
		</div>
	</section>
{/if}

<RecentlyViewed excludeSlug={product.slug} />
