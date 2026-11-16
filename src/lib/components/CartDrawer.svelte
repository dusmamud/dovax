<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from '@lucide/svelte';
	import { cart, FREE_SHIPPING_THRESHOLD } from '#lib/stores/cart.svelte.js';
	import { formatPrice } from '#lib/utils/format.js';

	let drawerEl: HTMLDivElement | undefined = $state();

	const progress = $derived(
		Math.min((cart.subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
	);
	const remaining = $derived(FREE_SHIPPING_THRESHOLD - cart.subtotal);

	function close() {
		cart.close();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			close();
			return;
		}
		if (event.key !== 'Tab' || !drawerEl) return;
		const focusable = drawerEl.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
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

	// DOM work only: lock body scroll + move focus into the drawer while open.
	$effect(() => {
		if (!cart.isOpen) return;
		document.body.style.overflow = 'hidden';
		drawerEl?.querySelector<HTMLElement>('button')?.focus();
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

{#if cart.isOpen}
	<div class="fixed inset-0 z-50">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="absolute inset-0 bg-black/50"
			role="presentation"
			onclick={close}
			transition:fade={{ duration: prefersReducedMotion.current ? 0 : 200 }}
		></div>
		<div
			bind:this={drawerEl}
			role="dialog"
			aria-modal="true"
			aria-label="Shopping cart"
			tabindex="-1"
			onkeydown={handleKeydown}
			transition:fly={{
				x: prefersReducedMotion.current ? 0 : 400,
				duration: prefersReducedMotion.current ? 0 : 300
			}}
			class="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper pb-safe shadow-2xl"
		>
			<div class="flex items-center justify-between border-b border-line px-5 py-4">
				<h2 class="font-display text-lg font-bold">Your Cart ({cart.count})</h2>
				<button
					type="button"
					onclick={close}
					aria-label="Close cart"
					class="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream"
				>
					<X class="size-5" aria-hidden="true" />
				</button>
			</div>

			{#if cart.lines.length === 0}
				<div class="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
					<span class="flex size-16 items-center justify-center rounded-full bg-cream">
						<ShoppingBag class="size-7 text-ink-soft" aria-hidden="true" />
					</span>
					<p class="text-lg font-semibold">Your cart is empty.</p>
					<button
						type="button"
						onclick={close}
						class="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-black"
					>
						Continue shopping
						<ArrowRight class="size-4" aria-hidden="true" />
					</button>
				</div>
			{:else}
				<div class="border-b border-line px-5 py-4">
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

				<ul class="flex-1 divide-y divide-line overflow-y-auto px-5">
					{#each cart.lines as line (`${line.product.id}:${line.size}`)}
						<li class="flex gap-4 py-4">
							<img
								src={line.product.image}
								alt={line.product.name}
								width="900"
								height="900"
								loading="lazy"
								decoding="async"
								class="size-20 shrink-0 rounded-lg bg-card object-cover"
							/>
							<div class="flex min-w-0 flex-1 flex-col">
								<div class="flex items-start justify-between gap-2">
									<div class="min-w-0">
										<p class="truncate font-display text-sm font-semibold">
											{line.product.name}
										</p>
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
								<div class="mt-auto flex items-center justify-between pt-3">
									<div class="flex items-center rounded-full border border-line">
										<button
											type="button"
											onclick={() => cart.setQty(line.product.id, line.size, line.qty - 1)}
											aria-label="Decrease quantity of {line.product.name}"
											class="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream"
										>
											<Minus class="size-4" aria-hidden="true" />
										</button>
										<span class="w-8 text-center text-sm font-semibold" aria-live="polite">
											{line.qty}
										</span>
										<button
											type="button"
											onclick={() => cart.setQty(line.product.id, line.size, line.qty + 1)}
											aria-label="Increase quantity of {line.product.name}"
											class="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream"
										>
											<Plus class="size-4" aria-hidden="true" />
										</button>
									</div>
									<p class="font-semibold">
										{formatPrice(line.product.price * line.qty)}
									</p>
								</div>
							</div>
						</li>
					{/each}
				</ul>

				<div class="border-t border-line px-5 pt-4">
					<div class="flex items-center justify-between">
						<p class="text-sm text-ink-soft">Subtotal</p>
						<p class="font-display text-lg font-bold">{formatPrice(cart.subtotal)}</p>
					</div>
					<a
						href="/checkout/"
						onclick={close}
						class="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-white transition-colors hover:bg-black"
					>
						Checkout
						<ArrowRight class="size-4" aria-hidden="true" />
					</a>
					<a
						href="/cart/"
						onclick={close}
						class="mt-3 flex min-h-11 w-full items-center justify-center text-sm font-semibold text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline"
					>
						View cart
					</a>
				</div>
			{/if}
		</div>
	</div>
{/if}
