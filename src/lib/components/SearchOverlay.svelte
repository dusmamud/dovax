<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import { goto } from '$app/navigation';
	import { Search, X } from '@lucide/svelte';
	import { products } from '#lib/data/products.js';
	import { formatPrice } from '#lib/utils/format.js';

	let { open = $bindable(false) }: { open?: boolean } = $props();

	const popularSearches = ['Running', 'Court', 'Knit', 'Air Pro', 'Sale'];

	let query = $state('');
	let inputEl: HTMLInputElement | undefined = $state();
	let panelEl: HTMLDivElement | undefined = $state();

	const trimmedQuery = $derived(query.trim());
	const results = $derived(
		trimmedQuery === ''
			? []
			: products
					.filter((product) => {
						const q = trimmedQuery.toLowerCase();
						return (
							product.name.toLowerCase().includes(q) ||
							product.tagline.toLowerCase().includes(q) ||
							product.category.toLowerCase().includes(q)
						);
					})
					.slice(0, 5)
	);

	function close() {
		open = false;
		query = '';
	}

	function submitSearch() {
		const q = trimmedQuery;
		close();
		if (q === '') {
			goto('/shop/');
			return;
		}
		goto(`/search/?q=${encodeURIComponent(q)}`);
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		submitSearch();
	}

	function handlePanelKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			close();
			return;
		}
		if (event.key !== 'Tab' || !panelEl) return;
		const focusable = panelEl.querySelectorAll<HTMLElement>(
			'a[href], button:not([disabled]), input:not([disabled])'
		);
		if (focusable.length === 0) return;
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	}

	// DOM work only: lock body scroll + focus the search input while open.
	$effect(() => {
		if (!open) return;
		document.body.style.overflow = 'hidden';
		inputEl?.focus();
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

{#if open}
	<div class="fixed inset-0 z-50">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="absolute inset-0 bg-black/50"
			role="presentation"
			onclick={close}
			transition:fade={{ duration: prefersReducedMotion.current ? 0 : 200 }}
		></div>
		<div
			bind:this={panelEl}
			role="dialog"
			aria-modal="true"
			aria-label="Search"
			tabindex="-1"
			onkeydown={handlePanelKeydown}
			transition:fly={{
				y: prefersReducedMotion.current ? 0 : -32,
				duration: prefersReducedMotion.current ? 0 : 300
			}}
			class="absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto bg-paper shadow-2xl"
		>
			<div class="mx-auto max-w-3xl px-4 py-6 sm:px-6">
				<form onsubmit={handleSubmit} class="flex items-center gap-2">
					<Search class="size-5 shrink-0 text-ink-soft" aria-hidden="true" />
					<input
						bind:this={inputEl}
						bind:value={query}
						type="search"
						placeholder="Search sneakers..."
						aria-label="Search products"
						autocomplete="off"
						class="h-12 min-w-0 flex-1 bg-transparent font-display text-lg font-semibold outline-none placeholder:text-ink-soft/70"
					/>
					<button
						type="submit"
						class="inline-flex h-11 shrink-0 items-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-black"
					>
						Search
					</button>
					<button
						type="button"
						onclick={close}
						aria-label="Close search"
						class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-cream"
					>
						<X class="size-5" aria-hidden="true" />
					</button>
				</form>

				{#if trimmedQuery !== '' && results.length > 0}
					<ul class="mt-6 divide-y divide-line border-t border-line">
						{#each results as product (product.id)}
							<li>
								<a
									href="/product/{product.slug}/"
									onclick={close}
									class="flex min-h-[72px] items-center gap-4 py-3"
								>
									<img
										src={product.image}
										alt={product.name}
										width="120"
										height="120"
										loading="lazy"
										decoding="async"
										class="size-14 shrink-0 rounded-xl object-cover"
									/>
									<span class="min-w-0 flex-1">
										<span class="block truncate font-display text-base font-semibold">
											{product.name}
										</span>
										<span class="block truncate text-sm text-ink-soft">
											{product.tagline}
										</span>
									</span>
									<span class="shrink-0 text-sm font-semibold">
										{formatPrice(product.price)}
									</span>
								</a>
							</li>
						{/each}
					</ul>
				{:else if trimmedQuery !== ''}
					<div class="mt-6 border-t border-line pt-6">
						<p class="text-base font-medium">No results for &lsquo;{trimmedQuery}&rsquo;</p>
						<a
							href="/shop/"
							onclick={close}
							class="mt-2 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-2"
						>
							Browse all sneakers
						</a>
					</div>
				{/if}

				<div class="mt-6 border-t border-line pt-6">
					<p class="text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase">
						Popular searches
					</p>
					<div class="mt-3 flex flex-wrap gap-2 pb-2">
						{#each popularSearches as term (term)}
							<a
								href="/search/?q={encodeURIComponent(term)}"
								onclick={close}
								class="inline-flex h-11 items-center rounded-full border border-line px-4 text-sm font-medium transition-colors hover:bg-cream"
							>
								{term}
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
