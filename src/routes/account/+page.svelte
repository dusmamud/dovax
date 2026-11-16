<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight, Heart } from '@lucide/svelte';
	import { browser } from '$app/env';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import EmptyState from '#lib/components/EmptyState.svelte';
	import SectionHeader from '#lib/components/SectionHeader.svelte';
	import { orders } from '#lib/stores/orders.svelte.js';
	import { toasts } from '#lib/stores/toasts.svelte.js';
	import { formatPrice } from '#lib/utils/format.js';

	const STORAGE_KEY = 'dovax-account-v1';

	interface Account {
		name: string;
		email: string;
	}

	let loaded = $state(false);
	let account = $state<Account | null>(null);

	let name = $state('');
	let email = $state('');
	let errors = $state<Record<string, string>>({});

	onMount(() => {
		orders.load();
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const parsed: unknown = JSON.parse(raw);
				if (
					typeof parsed === 'object' &&
					parsed !== null &&
					typeof (parsed as Account).name === 'string' &&
					typeof (parsed as Account).email === 'string'
				) {
					account = parsed as Account;
				}
			}
		} catch {
			// Corrupted storage — treat as signed out.
		}
		loaded = true;
	});

	function inputClass(hasError: boolean): string {
		return `h-12 w-full rounded-xl border bg-paper px-4 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-2 focus:outline-offset-0 focus:outline-ink ${hasError ? 'border-red-600' : 'border-line'}`;
	}

	function signIn(event: SubmitEvent): void {
		event.preventDefault();
		const next: Record<string, string> = {};
		if (!name.trim()) next.name = 'Please enter your name.';
		if (!email.trim()) {
			next.email = 'Please enter your email address.';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			next.email = 'Please enter a valid email address.';
		}
		errors = next;
		if (Object.keys(next).length > 0) return;
		const signedIn: Account = { name: name.trim(), email: email.trim() };
		if (browser) {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(signedIn));
			} catch {
				// Storage unavailable — the session still works in memory.
			}
		}
		account = signedIn;
		toasts.push(`Welcome back, ${signedIn.name}!`);
	}

	function signOut(): void {
		if (browser) {
			try {
				localStorage.removeItem(STORAGE_KEY);
			} catch {
				// Storage unavailable — nothing to clear.
			}
		}
		account = null;
		name = '';
		email = '';
		errors = {};
		toasts.push('Signed out.');
	}

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleDateString('en-IN', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>My Account — Dovax</title>
	<meta
		name="description"
		content="Your Dovax account: sign in, view your order history and jump to your wishlist."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Account' }]} />
	<div class="mt-6">
		<SectionHeader title="My Account" />
	</div>

	{#if !loaded}
		<p class="py-16 text-center text-sm text-ink-soft" aria-busy="true">Loading your account…</p>
	{:else if !account}
		<div class="mx-auto mt-8 max-w-md rounded-2xl border border-line bg-card p-5 sm:p-6">
			<h2 class="font-display text-h3 font-bold">Sign in</h2>
			<p class="mt-2 text-sm leading-relaxed text-ink-soft">
				Demo account — no real authentication. Your details stay in this browser.
			</p>
			<form novalidate onsubmit={signIn} class="mt-6 space-y-5">
				<div>
					<label for="accountName" class="mb-1.5 block text-sm font-semibold">Name</label>
					<input
						id="accountName"
						type="text"
						autocomplete="name"
						bind:value={name}
						aria-invalid={errors.name ? true : undefined}
						aria-describedby={errors.name ? 'accountName-error' : undefined}
						class={inputClass(Boolean(errors.name))}
						placeholder="Aarav Mehta"
					/>
					{#if errors.name}
						<p id="accountName-error" class="mt-1.5 text-sm text-red-700">{errors.name}</p>
					{/if}
				</div>
				<div>
					<label for="accountEmail" class="mb-1.5 block text-sm font-semibold">Email</label>
					<input
						id="accountEmail"
						type="email"
						autocomplete="email"
						bind:value={email}
						aria-invalid={errors.email ? true : undefined}
						aria-describedby={errors.email ? 'accountEmail-error' : undefined}
						class={inputClass(Boolean(errors.email))}
						placeholder="you@example.com"
					/>
					{#if errors.email}
						<p id="accountEmail-error" class="mt-1.5 text-sm text-red-700">{errors.email}</p>
					{/if}
				</div>
				<button
					type="submit"
					class="flex h-12 w-full items-center justify-center rounded-full bg-ink text-sm font-semibold text-white transition-colors hover:bg-black"
				>
					Sign in
				</button>
			</form>
		</div>
	{:else}
		<div class="mt-8 flex flex-wrap items-start justify-between gap-4">
			<div>
				<h2 class="font-display text-h3 font-bold">Hello, {account.name}</h2>
				<p class="mt-1 text-sm text-ink-soft">{account.email}</p>
			</div>
			<button
				type="button"
				onclick={signOut}
				class="flex h-12 items-center justify-center rounded-full border border-line px-8 text-sm font-semibold transition-colors hover:bg-cream"
			>
				Sign out
			</button>
		</div>

		<a
			href="/wishlist/"
			class="mt-8 flex min-h-11 items-center justify-between gap-4 rounded-2xl border border-line bg-card p-5 transition-colors hover:bg-cream"
		>
			<span class="flex items-center gap-3">
				<Heart class="size-5 text-ink-soft" aria-hidden="true" />
				<span>
					<span class="block font-display font-semibold">Your wishlist</span>
					<span class="mt-0.5 block text-sm text-ink-soft">View your wishlist</span>
				</span>
			</span>
			<ArrowRight class="size-5 shrink-0 text-ink-soft" aria-hidden="true" />
		</a>

		<section aria-labelledby="order-history-heading" class="mt-10">
			<h2 id="order-history-heading" class="font-display text-h3 font-bold">Order history</h2>
			{#if orders.orders.length === 0}
				<EmptyState
					icon="package"
					title="No orders yet"
					message="You haven't placed any orders yet. Your orders will show up here after checkout."
					actionLabel="Start shopping"
					actionHref="/shop/"
				/>
			{:else}
				<ul class="mt-6 space-y-4">
					{#each orders.orders as order (order.id)}
						<li class="rounded-2xl border border-line bg-card p-5 sm:p-6">
							<div class="flex flex-wrap items-start justify-between gap-3">
								<div>
									<p class="font-display font-bold">{order.id}</p>
									<p class="mt-1 text-sm text-ink-soft">{formatDate(order.date)}</p>
								</div>
								<span
									class="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white"
								>
									Confirmed
								</span>
							</div>
							<div class="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-sm">
								<p class="text-ink-soft">
									{order.items.length}
									{order.items.length === 1 ? 'item' : 'items'} · {order.paymentMethod}
								</p>
								<p class="font-display font-bold">{formatPrice(order.total)}</p>
							</div>
						</li>
					{/each}
				</ul>
			{/if}
		</section>
	{/if}
</div>
