<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import { cart } from '#lib/stores/cart.svelte.js';
	import { formatPrice } from '#lib/utils/format.js';

	let {
		shipping,
		ctaLabel,
		ctaHref,
		onCta
	}: {
		shipping: number;
		ctaLabel: string;
		ctaHref?: string;
		onCta?: () => void;
	} = $props();

	const total = $derived(cart.subtotal + shipping);
</script>

{#if cart.lines.length > 0}
	<aside aria-label="Order summary" class="rounded-2xl border border-line bg-card p-5 sm:p-6">
		<h2 class="font-display text-lg font-bold">Order summary</h2>
		<dl class="mt-4 space-y-3 text-sm">
			<div class="flex items-center justify-between">
				<dt class="text-ink-soft">Subtotal</dt>
				<dd class="font-medium">{formatPrice(cart.subtotal)}</dd>
			</div>
			<div class="flex items-center justify-between">
				<dt class="text-ink-soft">Shipping</dt>
				<dd class="font-medium">{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
			</div>
			<div class="flex items-center justify-between border-t border-line pt-3 text-base">
				<dt class="font-display font-bold">Total</dt>
				<dd class="font-display font-bold">{formatPrice(total)}</dd>
			</div>
		</dl>
		{#if ctaHref}
			<a
				href={ctaHref}
				class="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-white transition-colors hover:bg-black"
			>
				{ctaLabel}
				<ArrowRight class="size-4" aria-hidden="true" />
			</a>
		{:else}
			<button
				type="button"
				onclick={() => onCta?.()}
				class="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-white transition-colors hover:bg-black"
			>
				{ctaLabel}
				<ArrowRight class="size-4" aria-hidden="true" />
			</button>
		{/if}
	</aside>
{/if}
