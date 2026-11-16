<script lang="ts">
	import { untrack } from 'svelte';
	import { browser } from '$app/env';
	import { SlidersHorizontal, X } from '@lucide/svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import EmptyState from '#lib/components/EmptyState.svelte';
	import Filters, {
		createDefaultFilters,
		DEFAULT_MAX_PRICE,
		type FilterState
	} from '#lib/components/Filters.svelte';
	import ProductGrid from '#lib/components/ProductGrid.svelte';
	import SectionHeader from '#lib/components/SectionHeader.svelte';
	import SortSelect, { type SortKey } from '#lib/components/SortSelect.svelte';
	import type { Product, ProductCategory } from '#lib/data/products.js';

	let {
		eyebrow,
		title,
		description,
		products,
		initialCategory,
		breadcrumbs
	}: {
		eyebrow?: string;
		title: string;
		description?: string;
		products: Product[];
		initialCategory?: ProductCategory;
		breadcrumbs?: { label: string; href?: string }[];
	} = $props();

	let filters = $state<FilterState>(createDefaultFilters());
	let sort = $state<SortKey>('featured');
	let drawerOpen = $state(false);
	let drawerCloseButton: HTMLButtonElement | undefined = $state();

	// Keep the category filter in sync when the page is reached with a
	// different ?category= via client-side navigation (no remount).
	// The write is untracked: without untrack, every filters reassignment
	// (e.g. the user toggling a checkbox) would re-run this effect and
	// wipe the user's selection back to the initial category.
	$effect(() => {
		const category = initialCategory;
		untrack(() => {
			filters.categories = category ? [category] : [];
		});
	});

	// Lock body scroll and focus the close button while the mobile drawer is open.
	$effect(() => {
		if (!browser || !drawerOpen) return;
		document.body.style.overflow = 'hidden';
		drawerCloseButton?.focus();
		return () => {
			document.body.style.overflow = '';
		};
	});

	const activeFilterCount = $derived(
		filters.categories.length +
			filters.sizes.length +
			filters.colors.length +
			(filters.minRating > 0 ? 1 : 0) +
			(filters.maxPrice < DEFAULT_MAX_PRICE ? 1 : 0)
	);

	const filtered = $derived(
		products.filter((product) => {
			if (
				filters.categories.length > 0 &&
				!filters.categories.includes(product.category)
			)
				return false;
			if (
				filters.sizes.length > 0 &&
				!filters.sizes.some((size) => product.sizes.includes(size))
			)
				return false;
			if (product.price > filters.maxPrice) return false;
			if (
				filters.colors.length > 0 &&
				!product.colors.some((color) => filters.colors.includes(color.name))
			)
				return false;
			if (product.rating < filters.minRating) return false;
			return true;
		})
	);

	const sorted = $derived.by(() => {
		const list = [...filtered];
		switch (sort) {
			case 'price-asc':
				return list.sort((a, b) => a.price - b.price);
			case 'price-desc':
				return list.sort((a, b) => b.price - a.price);
			case 'rating':
				return list.sort((a, b) => b.rating - a.rating);
			case 'newest':
				// Stable sort keeps the catalogue order within the new / not-new groups.
				return list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
			default:
				return list;
		}
	});

	function clearFilters() {
		filters = createDefaultFilters();
	}
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === 'Escape') drawerOpen = false;
	}}
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
	{#if breadcrumbs}
		<Breadcrumbs items={breadcrumbs} />
	{/if}
	<div class="mt-6">
		<SectionHeader {eyebrow} {title} {description} />
	</div>

	<div class="mt-8 flex flex-wrap items-center justify-between gap-4">
		<p class="text-sm text-ink-soft" aria-live="polite">
			{sorted.length}
			{sorted.length === 1 ? 'product' : 'products'}
		</p>
		<div class="flex items-center gap-3">
			<button
				type="button"
				onclick={() => (drawerOpen = true)}
				class="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-paper px-5 text-sm font-semibold transition-colors hover:bg-cream lg:hidden"
			>
				<SlidersHorizontal class="size-4" aria-hidden="true" />
				Filters
				{#if activeFilterCount > 0}
					<span
						class="flex size-5 items-center justify-center rounded-full bg-ink text-xs font-bold text-white"
					>
						{activeFilterCount}
					</span>
				{/if}
			</button>
			<SortSelect value={sort} onChange={(value) => (sort = value)} />
		</div>
	</div>

	<div class="mt-8 flex gap-10">
		<aside class="hidden w-60 shrink-0 lg:block">
			<div class="sticky top-24">
				<Filters
					{filters}
					onChange={(next) => (filters = next)}
					ratingGroupName="min-rating-desktop"
				/>
			</div>
		</aside>
		<div class="min-w-0 flex-1">
			{#if sorted.length > 0}
				<ProductGrid products={sorted} />
			{:else}
				<EmptyState
					icon="search"
					title="No products match your filters"
					message="Try adjusting your filters to see more shoes."
				/>
				<div class="flex justify-center">
					<button
						type="button"
						onclick={clearFilters}
						class="inline-flex h-11 items-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-black"
					>
						Clear all filters
					</button>
				</div>
			{/if}
		</div>
	</div>
</section>

{#if drawerOpen}
	<div class="fixed inset-0 z-50 lg:hidden">
		<button
			type="button"
			aria-label="Close filters"
			onclick={() => (drawerOpen = false)}
			class="absolute inset-0 bg-black/50"
		></button>
		<div
			role="dialog"
			aria-modal="true"
			aria-label="Filters"
			class="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-paper"
		>
			<div class="flex items-center justify-between border-b border-line px-6 py-4">
				<h2 class="font-display text-base font-semibold">Filters</h2>
				<button
					type="button"
					bind:this={drawerCloseButton}
					onclick={() => (drawerOpen = false)}
					aria-label="Close filters"
					class="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream"
				>
					<X class="size-5" aria-hidden="true" />
				</button>
			</div>
			<div class="flex-1 overflow-y-auto px-6 py-6">
				<Filters
					{filters}
					onChange={(next) => (filters = next)}
					ratingGroupName="min-rating-mobile"
				/>
			</div>
			<div class="border-t border-line px-6 py-4">
				<button
					type="button"
					onclick={() => (drawerOpen = false)}
					class="flex h-12 w-full items-center justify-center rounded-full bg-ink text-sm font-semibold text-white transition-colors hover:bg-black"
				>
					Show {sorted.length}
					{sorted.length === 1 ? 'result' : 'results'}
				</button>
			</div>
		</div>
	</div>
{/if}
