<script lang="ts">
	import { onMount } from 'svelte';
	import { CheckCircle2 } from '@lucide/svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import EmptyState from '#lib/components/EmptyState.svelte';
	import { orders } from '#lib/stores/orders.svelte.js';
	import { formatPrice } from '#lib/utils/format.js';

	let loaded = $state(false);

	onMount(() => {
		orders.load();
		loaded = true;
	});

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleDateString('en-IN', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Order confirmed — Dovax</title>
	<meta
		name="description"
		content="Your Dovax order is confirmed. View your order number, items and totals."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Order confirmed' }]} />

	{#if !loaded}
		<p class="py-16 text-center text-sm text-ink-soft" aria-busy="true">Loading your order…</p>
	{:else if orders.lastOrder}
		{@const order = orders.lastOrder}
		<div class="mx-auto mt-8 max-w-2xl text-center">
			<span class="mx-auto flex size-16 items-center justify-center rounded-full bg-cream">
				<CheckCircle2 class="size-8 text-ink" aria-hidden="true" />
			</span>
			<h1 class="mt-4 font-display text-h2 font-bold">Order confirmed!</h1>
			<p class="mt-3 text-sm text-ink-soft sm:text-base">
				Thank you, {order.name}. Your order <span class="font-semibold text-ink">{order.id}</span>
				was placed on {formatDate(order.date)}. A confirmation has been sent to {order.email}.
			</p>
		</div>

		<div class="mx-auto mt-10 max-w-2xl rounded-2xl border border-line bg-card p-5 sm:p-6">
			<h2 class="font-display text-lg font-bold">Order {order.id}</h2>
			<ul class="mt-4 divide-y divide-line">
				{#each order.items as item (`${item.id}:${item.size}`)}
					<li class="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
						<img
							src={item.image}
							alt=""
							width="900"
							height="900"
							loading="lazy"
							decoding="async"
							class="size-14 shrink-0 rounded-lg bg-paper object-cover"
						/>
						<div class="min-w-0 flex-1">
							<p class="truncate text-sm font-semibold">{item.name}</p>
							<p class="mt-0.5 text-sm text-ink-soft">Size {item.size} · Qty {item.qty}</p>
						</div>
						<p class="shrink-0 text-sm font-semibold">{formatPrice(item.price * item.qty)}</p>
					</li>
				{/each}
			</ul>
			<dl class="mt-5 space-y-3 border-t border-line pt-4 text-sm">
				<div class="flex items-center justify-between">
					<dt class="text-ink-soft">Subtotal</dt>
					<dd class="font-medium">{formatPrice(order.subtotal)}</dd>
				</div>
				<div class="flex items-center justify-between">
					<dt class="text-ink-soft">Shipping</dt>
					<dd class="font-medium">
						{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}
					</dd>
				</div>
				<div class="flex items-center justify-between border-t border-line pt-3 text-base">
					<dt class="font-display font-bold">Total</dt>
					<dd class="font-display font-bold">{formatPrice(order.total)}</dd>
				</div>
				<div class="flex items-center justify-between">
					<dt class="text-ink-soft">Payment method</dt>
					<dd class="font-medium">{order.paymentMethod}</dd>
				</div>
			</dl>
		</div>

		<div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
			<a
				href="/shop/"
				class="flex h-12 items-center justify-center rounded-full bg-ink px-8 text-sm font-semibold text-white transition-colors hover:bg-black"
			>
				Continue shopping
			</a>
			<a
				href="/account/"
				class="flex h-12 items-center justify-center rounded-full border border-line px-8 text-sm font-semibold transition-colors hover:bg-cream"
			>
				View orders
			</a>
		</div>
	{:else}
		<EmptyState
			icon="package"
			title="No recent order found"
			message="Orders appear here right after checkout. If you just placed an order, it may not have been saved in this browser."
			actionLabel="Start shopping"
			actionHref="/shop/"
		/>
	{/if}
</div>
