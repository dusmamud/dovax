<script lang="ts">
	import { browser } from '$app/env';
	import { page } from '$app/state';
	import { products } from '#lib/data/products.js';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import EmptyState from '#lib/components/EmptyState.svelte';
	import ProductGrid from '#lib/components/ProductGrid.svelte';

	const POPULAR_SEARCHES = ['Running', 'Court', 'Knit', 'Bestsellers'];

	// searchParams throws during prerender — read it only in the browser.
	const q = $derived(browser ? (page.url.searchParams.get('q')?.trim() ?? '') : '');

	const results = $derived.by(() => {
		const needle = q.toLowerCase();
		if (!needle) return products;
		// Also try the singular form so "Bestsellers" matches the "bestseller" badge.
		const needles = needle.endsWith('s') ? [needle, needle.slice(0, -1)] : [needle];
		return products.filter((product) => {
			const haystack =
				`${product.name} ${product.tagline} ${product.category} ${product.description} ${product.badges.join(' ')}`.toLowerCase();
			return needles.some((term) => haystack.includes(term));
		});
	});
</script>

<svelte:head>
	<title>{q ? `Search results for '${q}'` : 'Search'} | Dovax</title>
	<meta
		name="description"
		content={q
			? `Search results for '${q}' at Dovax — find your next pair of sneakers.`
			: 'Search Dovax sneakers — find running, court, knit and lifestyle styles.'}
	/>
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
	<h1 class="mt-6 font-display text-h2 font-bold">
		{q ? `Search results for '${q}'` : 'Search'}
	</h1>
	<p class="mt-3 text-sm text-ink-soft" aria-live="polite">
		{results.length}
		{results.length === 1 ? 'product' : 'products'}
	</p>
	{#if results.length > 0}
		<div class="mt-8">
			<ProductGrid products={results} />
		</div>
	{:else}
		<div class="mt-8">
			<EmptyState
				icon="search"
				title="No results for '{q}'"
				message="Try a different search term, or browse one of these popular searches."
			/>
			<div class="mt-2 flex flex-wrap justify-center gap-2">
				{#each POPULAR_SEARCHES as term (term)}
					<a
						href="/search/?q={term}"
						class="inline-flex h-11 items-center rounded-full border border-line bg-paper px-5 text-sm font-semibold transition-colors hover:bg-cream"
					>
						{term}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</section>
