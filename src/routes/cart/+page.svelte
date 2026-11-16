<script lang="ts">
	import { onMount } from 'svelte';
	import { Trash2 } from '@lucide/svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import EmptyState from '#lib/components/EmptyState.svelte';
	import OrderSummary from '#lib/components/OrderSummary.svelte';
	import QuantitySelector from '#lib/components/QuantitySelector.svelte';
	import SectionHeader from '#lib/components/SectionHeader.svelte';
	import { cart, FREE_SHIPPING_THRESHOLD, type CartLine } from '#lib/stores/cart.svelte.js';
	import { formatPrice } from '#lib/utils/format.js';

	/** Local per-line quantities bound to the QuantitySelector controls. */
	let qtys = $state<Record<string, number>>({});
	/** Last cart qty seen per line — distinguishes drawer edits from local edits. */
	let lastCartQty = $state<Record<string, number>>({});
	let loaded = $state(false);

	const progress = $derived(
		Math.min((cart.subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
	);
	const remaining = $derived(FREE_SHIPPING_THRESHOLD - cart.subtotal);

	function lineKey(line: CartLine): string {
		return `${line.product.id}:${line.size}`;
	}

	onMount(() => {
		cart.load();
		for (const line of cart.lines) {
			const key = lineKey(line);
			qtys[key] = line.qty;
			lastCartQty[key] = line.qty;
		}
		loaded = true;
	});

	// Keep local quantities and the cart in sync, both ways:
	// - local edits (QuantitySelector) push into the cart via setQty
	// - cart edits from elsewhere (e.g. the drawer) are adopted locally
	// Each branch only writes when its values differ, so the effect settles.
	$effect(() => {
		const lines = cart.lines;
		const currentKeys = new Set(lines.map(lineKey));
		for (const key of Object.keys(qtys)) {
			if (!currentKeys.has(key)) {
				delete qtys[key];
				delete lastCartQty[key];
			}
		}
		for (const line of lines) {
			const key = lineKey(line);
			const local = qtys[key];
			if (local === undefined) {
				qtys[key] = line.qty;
				lastCartQty[key] = line.qty;
			} else if (line.qty !== lastCartQty[key]) {
				qtys[key] = line.qty;
				lastCartQty[key] = line.qty;
			} else if (local !== line.qty) {
				cart.setQty(line.product.id, line.size, local);
				lastCartQty[key] = local;
			}
		}
	});
</script>

<svelte:head>
	<title>Your Cart — Dovax</title>
	<meta
		name="description"
		content="Review the shoes in your Dovax cart, adjust quantities and sizes, then head to checkout."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />
	<div class="mt-6">
		<SectionHeader title="Your Cart" />
	</div>

	{#if !loaded}
		<p class="py-16 text-center text-sm text-ink-soft" aria-busy="true">Loading your cart…</p>
	{:else if cart.lines.length === 0}
		<EmptyState
			icon="bag"
			title="Your cart is empty"
			message="Add some shoes to your cart to get started."
			actionLabel="Continue shopping"
			actionHref="/shop/"
		/>
	{:else}
		<div class="mt-8 rounded-2xl border border-line bg-card px-5 py-4">
			<p class="text-sm font-medium">Free shipping above {formatPrice(FREE_SHIPPING_THRESHOLD)}</p>
			<div
				class="mt-2 h-2 overflow-hidden rounded-full bg-line"
				role="progressbar"
				aria-valuenow={Math.round(progress)}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label="Progress towards free shipping"
			>
				<div
					class="h-full rounded-full bg-ink transition-all duration-300"
					style="width: {progress}%"
				></div>
			</div>
			<p class="mt-2 text-sm text-ink-soft">
				{#if remaining > 0}
					{formatPrice(remaining)} away from free shipping
				{:else}
					You&apos;ve unlocked free shipping!
				{/if}
			</p>
		</div>

		<div class="mt-8 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
			<ul class="divide-y divide-line">
				{#each cart.lines as line (lineKey(line))}
					{@const key = lineKey(line)}
					<li class="flex gap-4 py-6 first:pt-0 sm:gap-5">
						<a
							href="/product/{line.product.slug}/"
							class="shrink-0"
							aria-label="View {line.product.name}"
						>
							<img
								src={line.product.image}
								alt={line.product.name}
								width="900"
								height="900"
								loading="lazy"
								decoding="async"
								class="size-24 rounded-lg bg-card object-cover sm:size-28"
							/>
						</a>
						<div class="flex min-w-0 flex-1 flex-col">
							<div class="flex items-start justify-between gap-2">
								<div class="min-w-0">
									<a
										href="/product/{line.product.slug}/"
										class="font-display text-base font-semibold hover:underline"
									>
										{line.product.name}
									</a>
									<p class="mt-0.5 text-sm text-ink-soft">Size {line.size}</p>
									<p class="mt-0.5 text-sm text-ink-soft">
										{formatPrice(line.product.price)} each
									</p>
								</div>
								<button
									type="button"
									onclick={() => cart.remove(line.product.id, line.size)}
									aria-label="Remove {line.product.name}"
									class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream hover:text-ink"
								>
									<Trash2 class="size-5" aria-hidden="true" />
								</button>
							</div>
							<div class="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
								<QuantitySelector bind:qty={qtys[key]} label="Quantity for {line.product.name}" />
								<p class="font-display font-bold">
									{formatPrice(line.product.price * line.qty)}
								</p>
							</div>
						</div>
					</li>
				{/each}
			</ul>

			<OrderSummary shipping={0} ctaLabel="Checkout" ctaHref="/checkout/" />
		</div>
	{/if}
</div>
