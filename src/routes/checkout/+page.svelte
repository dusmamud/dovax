<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import CheckoutSteps from '#lib/components/CheckoutSteps.svelte';
	import EmptyState from '#lib/components/EmptyState.svelte';
	import OrderSummary from '#lib/components/OrderSummary.svelte';
	import SectionHeader from '#lib/components/SectionHeader.svelte';
	import { cart, FREE_SHIPPING_THRESHOLD } from '#lib/stores/cart.svelte.js';
	import { orders } from '#lib/stores/orders.svelte.js';
	import { toasts } from '#lib/stores/toasts.svelte.js';
	import { formatPrice } from '#lib/utils/format.js';

	type DeliveryMethod = 'standard' | 'express';
	type PaymentMethod = 'upi' | 'card' | 'cod';

	const STANDARD_SHIPPING_FLAT = 99;
	const EXPRESS_SHIPPING = 199;

	const PAYMENT_LABELS: Record<PaymentMethod, string> = {
		upi: 'UPI',
		card: 'Card',
		cod: 'Cash on Delivery'
	};

	let loaded = $state(false);
	let step = $state<1 | 2 | 3>(1);

	// Step 1 — shipping details (kept in memory only, never persisted).
	let fullName = $state('');
	let email = $state('');
	let phone = $state('');
	let address1 = $state('');
	let city = $state('');
	let addressState = $state('');
	let pin = $state('');

	// Step 2 — delivery method.
	let deliveryMethod = $state<DeliveryMethod>('standard');

	// Step 3 — payment details (validated for format only; no real payment).
	let paymentMethod = $state<PaymentMethod>('upi');
	let upiId = $state('');
	let cardNumber = $state('');
	let cardExpiry = $state('');
	let cardCvv = $state('');

	let errors = $state<Record<string, string>>({});

	const shipping = $derived(
		deliveryMethod === 'express'
			? EXPRESS_SHIPPING
			: cart.subtotal >= FREE_SHIPPING_THRESHOLD
				? 0
				: STANDARD_SHIPPING_FLAT
	);

	const standardShippingLabel = $derived(
		cart.subtotal >= FREE_SHIPPING_THRESHOLD
			? 'Free'
			: formatPrice(STANDARD_SHIPPING_FLAT)
	);

	onMount(() => {
		cart.load();
		orders.load();
		loaded = true;
	});

	function inputClass(hasError: boolean): string {
		return `h-12 w-full rounded-xl border bg-paper px-4 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-2 focus:outline-offset-0 focus:outline-ink ${hasError ? 'border-red-600' : 'border-line'}`;
	}

	function validEmail(value: string): boolean {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
	}

	function validPhone(value: string): boolean {
		const cleaned = value.replace(/[\s-]/g, '').replace(/^\+91/, '');
		return /^\d{10}$/.test(cleaned);
	}

	function validateShipping(): boolean {
		const next: Record<string, string> = {};
		if (!fullName.trim()) next.fullName = 'Please enter your full name.';
		if (!email.trim()) {
			next.email = 'Please enter your email address.';
		} else if (!validEmail(email)) {
			next.email = 'Please enter a valid email address.';
		}
		if (!phone.trim()) {
			next.phone = 'Please enter your phone number.';
		} else if (!validPhone(phone)) {
			next.phone = 'Please enter a valid 10-digit phone number.';
		}
		if (!address1.trim()) next.address1 = 'Please enter your address.';
		if (!city.trim()) next.city = 'Please enter your city.';
		if (!addressState.trim()) next.state = 'Please enter your state.';
		if (!pin.trim()) {
			next.pin = 'Please enter your PIN code.';
		} else if (!/^\d{6}$/.test(pin.trim())) {
			next.pin = 'PIN code must be 6 digits.';
		}
		errors = next;
		return Object.keys(next).length === 0;
	}

	function validatePayment(): boolean {
		const next: Record<string, string> = {};
		if (paymentMethod === 'upi') {
			if (!/^[^@\s]+@[^@\s]+$/.test(upiId.trim())) {
				next.upiId = 'Please enter a valid UPI ID (for example name@bank).';
			}
		} else if (paymentMethod === 'card') {
			if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
				next.cardNumber = 'Card number must be 16 digits.';
			}
			if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry.trim())) {
				next.cardExpiry = 'Expiry must be in MM/YY format.';
			}
			if (!/^\d{3,4}$/.test(cardCvv.trim())) {
				next.cardCvv = 'CVV must be 3 or 4 digits.';
			}
		}
		errors = next;
		return Object.keys(next).length === 0;
	}

	function goToDelivery(): void {
		if (!validateShipping()) return;
		step = 2;
		window.scrollTo({ top: 0 });
	}

	function goToPayment(): void {
		step = 3;
		window.scrollTo({ top: 0 });
	}

	function handleSubmit(event: SubmitEvent): void {
		event.preventDefault();
		if (step === 1) goToDelivery();
		else if (step === 2) goToPayment();
		else placeOrder();
	}

	function summaryCta(): void {
		if (step === 1) goToDelivery();
		else if (step === 2) goToPayment();
		else placeOrder();
	}

	const summaryCtaLabel = $derived(
		step === 1 ? 'Continue to delivery' : step === 2 ? 'Continue to payment' : 'Place Order'
	);

	function placeOrder(): void {
		if (!validatePayment()) return;
		orders.placeOrder({
			items: cart.lines.map((line) => ({
				id: line.product.id,
				name: line.product.name,
				size: line.size,
				qty: line.qty,
				price: line.product.price,
				image: line.product.image
			})),
			subtotal: cart.subtotal,
			shipping,
			total: cart.subtotal + shipping,
			name: fullName.trim(),
			email: email.trim(),
			paymentMethod: PAYMENT_LABELS[paymentMethod]
		});
		cart.clear();
		toasts.push('Order placed successfully!');
		void goto('/checkout/success/');
	}
</script>

<svelte:head>
	<title>Checkout — Dovax</title>
	<meta
		name="description"
		content="Complete your Dovax order: shipping details, delivery options and payment."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
	<Breadcrumbs
		items={[
			{ label: 'Home', href: '/' },
			{ label: 'Cart', href: '/cart/' },
			{ label: 'Checkout' }
		]}
	/>
	<div class="mt-6">
		<SectionHeader title="Checkout" />
	</div>

	{#if !loaded}
		<p class="py-16 text-center text-sm text-ink-soft" aria-busy="true">Loading checkout…</p>
	{:else if cart.lines.length === 0}
		<EmptyState
			icon="bag"
			title="Your cart is empty"
			message="Add some shoes to your cart before checking out."
			actionLabel="Continue shopping"
			actionHref="/shop/"
		/>
	{:else}
		<div class="mt-8 max-w-xl">
			<CheckoutSteps {step} />
		</div>

		<div class="mt-8 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
			<form novalidate onsubmit={handleSubmit}>
				{#if step === 1}
					<fieldset>
						<legend class="font-display text-h3 font-bold">Shipping details</legend>
						<div class="mt-6 grid gap-5 sm:grid-cols-2">
							<div class="sm:col-span-2">
								<label for="fullName" class="mb-1.5 block text-sm font-semibold">Full name</label>
								<input
									id="fullName"
									type="text"
									autocomplete="name"
									bind:value={fullName}
									aria-invalid={errors.fullName ? true : undefined}
									aria-describedby={errors.fullName ? 'fullName-error' : undefined}
									class={inputClass(Boolean(errors.fullName))}
									placeholder="Aarav Mehta"
								/>
								{#if errors.fullName}
									<p id="fullName-error" class="mt-1.5 text-sm text-red-700">{errors.fullName}</p>
								{/if}
							</div>
							<div>
								<label for="email" class="mb-1.5 block text-sm font-semibold">Email</label>
								<input
									id="email"
									type="email"
									autocomplete="email"
									bind:value={email}
									aria-invalid={errors.email ? true : undefined}
									aria-describedby={errors.email ? 'email-error' : undefined}
									class={inputClass(Boolean(errors.email))}
									placeholder="you@example.com"
								/>
								{#if errors.email}
									<p id="email-error" class="mt-1.5 text-sm text-red-700">{errors.email}</p>
								{/if}
							</div>
							<div>
								<label for="phone" class="mb-1.5 block text-sm font-semibold">Phone</label>
								<input
									id="phone"
									type="tel"
									autocomplete="tel"
									bind:value={phone}
									aria-invalid={errors.phone ? true : undefined}
									aria-describedby={errors.phone ? 'phone-error' : undefined}
									class={inputClass(Boolean(errors.phone))}
									placeholder="98765 43210"
								/>
								{#if errors.phone}
									<p id="phone-error" class="mt-1.5 text-sm text-red-700">{errors.phone}</p>
								{/if}
							</div>
							<div class="sm:col-span-2">
								<label for="address1" class="mb-1.5 block text-sm font-semibold">
									Address line 1
								</label>
								<input
									id="address1"
									type="text"
									autocomplete="street-address"
									bind:value={address1}
									aria-invalid={errors.address1 ? true : undefined}
									aria-describedby={errors.address1 ? 'address1-error' : undefined}
									class={inputClass(Boolean(errors.address1))}
									placeholder="Flat, street, area"
								/>
								{#if errors.address1}
									<p id="address1-error" class="mt-1.5 text-sm text-red-700">{errors.address1}</p>
								{/if}
							</div>
							<div>
								<label for="city" class="mb-1.5 block text-sm font-semibold">City</label>
								<input
									id="city"
									type="text"
									autocomplete="address-level2"
									bind:value={city}
									aria-invalid={errors.city ? true : undefined}
									aria-describedby={errors.city ? 'city-error' : undefined}
									class={inputClass(Boolean(errors.city))}
									placeholder="Mumbai"
								/>
								{#if errors.city}
									<p id="city-error" class="mt-1.5 text-sm text-red-700">{errors.city}</p>
								{/if}
							</div>
							<div>
								<label for="state" class="mb-1.5 block text-sm font-semibold">State</label>
								<input
									id="state"
									type="text"
									autocomplete="address-level1"
									bind:value={addressState}
									aria-invalid={errors.state ? true : undefined}
									aria-describedby={errors.state ? 'state-error' : undefined}
									class={inputClass(Boolean(errors.state))}
									placeholder="Maharashtra"
								/>
								{#if errors.state}
									<p id="state-error" class="mt-1.5 text-sm text-red-700">{errors.state}</p>
								{/if}
							</div>
							<div>
								<label for="pin" class="mb-1.5 block text-sm font-semibold">PIN code</label>
								<input
									id="pin"
									type="text"
									inputmode="numeric"
									autocomplete="postal-code"
									bind:value={pin}
									aria-invalid={errors.pin ? true : undefined}
									aria-describedby={errors.pin ? 'pin-error' : undefined}
									class={inputClass(Boolean(errors.pin))}
									placeholder="400001"
								/>
								{#if errors.pin}
									<p id="pin-error" class="mt-1.5 text-sm text-red-700">{errors.pin}</p>
								{/if}
							</div>
						</div>
					</fieldset>
					<button
						type="submit"
						class="mt-8 flex h-12 w-full items-center justify-center rounded-full bg-ink text-sm font-semibold text-white transition-colors hover:bg-black sm:w-auto sm:px-8"
					>
						Continue to delivery
					</button>
				{:else if step === 2}
					<fieldset>
						<legend class="font-display text-h3 font-bold">Delivery method</legend>
						<div class="mt-6 space-y-4" role="radiogroup" aria-label="Delivery method">
							<label
								class="flex min-h-11 cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-colors {deliveryMethod ===
								'standard'
									? 'border-ink bg-card'
									: 'border-line'}"
							>
								<input
									type="radio"
									name="delivery"
									value="standard"
									bind:group={deliveryMethod}
									class="mt-1 size-5 accent-black"
								/>
								<span class="flex flex-1 items-start justify-between gap-4">
									<span>
										<span class="block font-display font-semibold">Standard delivery</span>
										<span class="mt-1 block text-sm text-ink-soft">
											4–6 business days. Free on orders above {formatPrice(
												FREE_SHIPPING_THRESHOLD
											)}.
										</span>
									</span>
									<span class="font-semibold">{standardShippingLabel}</span>
								</span>
							</label>
							<label
								class="flex min-h-11 cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-colors {deliveryMethod ===
								'express'
									? 'border-ink bg-card'
									: 'border-line'}"
							>
								<input
									type="radio"
									name="delivery"
									value="express"
									bind:group={deliveryMethod}
									class="mt-1 size-5 accent-black"
								/>
								<span class="flex flex-1 items-start justify-between gap-4">
									<span>
										<span class="block font-display font-semibold">Express delivery</span>
										<span class="mt-1 block text-sm text-ink-soft">2–3 business days.</span>
									</span>
									<span class="font-semibold">{formatPrice(EXPRESS_SHIPPING)}</span>
								</span>
							</label>
						</div>
					</fieldset>
					<div class="mt-8 flex flex-col gap-3 sm:flex-row">
						<button
							type="button"
							onclick={() => (step = 1)}
							class="flex h-12 items-center justify-center rounded-full border border-line px-8 text-sm font-semibold transition-colors hover:bg-cream"
						>
							Back
						</button>
						<button
							type="submit"
							class="flex h-12 items-center justify-center rounded-full bg-ink px-8 text-sm font-semibold text-white transition-colors hover:bg-black"
						>
							Continue to payment
						</button>
					</div>
				{:else}
					<fieldset>
						<legend class="font-display text-h3 font-bold">Payment method</legend>
						<p
							class="mt-4 rounded-xl border border-line bg-card px-4 py-3 text-sm text-ink-soft"
						>
							Demo checkout — no real payment is processed.
						</p>
						<div class="mt-6 space-y-4" role="radiogroup" aria-label="Payment method">
							<label
								class="flex min-h-11 cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-colors {paymentMethod ===
								'upi'
									? 'border-ink bg-card'
									: 'border-line'}"
							>
								<input
									type="radio"
									name="payment"
									value="upi"
									bind:group={paymentMethod}
									class="mt-1 size-5 accent-black"
								/>
								<span>
									<span class="block font-display font-semibold">UPI</span>
									<span class="mt-1 block text-sm text-ink-soft">
										Pay with any UPI app using your UPI ID.
									</span>
								</span>
							</label>
							<label
								class="flex min-h-11 cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-colors {paymentMethod ===
								'card'
									? 'border-ink bg-card'
									: 'border-line'}"
							>
								<input
									type="radio"
									name="payment"
									value="card"
									bind:group={paymentMethod}
									class="mt-1 size-5 accent-black"
								/>
								<span>
									<span class="block font-display font-semibold">Card</span>
									<span class="mt-1 block text-sm text-ink-soft">
										Credit or debit card.
									</span>
								</span>
							</label>
							<label
								class="flex min-h-11 cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-colors {paymentMethod ===
								'cod'
									? 'border-ink bg-card'
									: 'border-line'}"
							>
								<input
									type="radio"
									name="payment"
									value="cod"
									bind:group={paymentMethod}
									class="mt-1 size-5 accent-black"
								/>
								<span>
									<span class="block font-display font-semibold">Cash on Delivery</span>
									<span class="mt-1 block text-sm text-ink-soft">
										Pay in cash when your order arrives.
									</span>
								</span>
							</label>
						</div>

						{#if paymentMethod === 'upi'}
							<div class="mt-6">
								<label for="upiId" class="mb-1.5 block text-sm font-semibold">UPI ID</label>
								<input
									id="upiId"
									type="text"
									autocomplete="off"
									bind:value={upiId}
									aria-invalid={errors.upiId ? true : undefined}
									aria-describedby={errors.upiId ? 'upiId-error' : undefined}
									class={inputClass(Boolean(errors.upiId))}
									placeholder="name@bank"
								/>
								{#if errors.upiId}
									<p id="upiId-error" class="mt-1.5 text-sm text-red-700">{errors.upiId}</p>
								{/if}
							</div>
						{:else if paymentMethod === 'card'}
							<div class="mt-6 grid gap-5 sm:grid-cols-2">
								<div class="sm:col-span-2">
									<label for="cardNumber" class="mb-1.5 block text-sm font-semibold">
										Card number
									</label>
									<input
										id="cardNumber"
										type="text"
										inputmode="numeric"
										autocomplete="cc-number"
										bind:value={cardNumber}
										aria-invalid={errors.cardNumber ? true : undefined}
										aria-describedby={errors.cardNumber ? 'cardNumber-error' : undefined}
										class={inputClass(Boolean(errors.cardNumber))}
										placeholder="1234 5678 9012 3456"
									/>
									{#if errors.cardNumber}
										<p id="cardNumber-error" class="mt-1.5 text-sm text-red-700">
											{errors.cardNumber}
										</p>
									{/if}
								</div>
								<div>
									<label for="cardExpiry" class="mb-1.5 block text-sm font-semibold">
										Expiry (MM/YY)
									</label>
									<input
										id="cardExpiry"
										type="text"
										inputmode="numeric"
										autocomplete="cc-exp"
										bind:value={cardExpiry}
										aria-invalid={errors.cardExpiry ? true : undefined}
										aria-describedby={errors.cardExpiry ? 'cardExpiry-error' : undefined}
										class={inputClass(Boolean(errors.cardExpiry))}
										placeholder="08/28"
									/>
									{#if errors.cardExpiry}
										<p id="cardExpiry-error" class="mt-1.5 text-sm text-red-700">
											{errors.cardExpiry}
										</p>
									{/if}
								</div>
								<div>
									<label for="cardCvv" class="mb-1.5 block text-sm font-semibold">CVV</label>
									<input
										id="cardCvv"
										type="password"
										inputmode="numeric"
										autocomplete="cc-csc"
										bind:value={cardCvv}
										aria-invalid={errors.cardCvv ? true : undefined}
										aria-describedby={errors.cardCvv ? 'cardCvv-error' : undefined}
										class={inputClass(Boolean(errors.cardCvv))}
										placeholder="123"
									/>
									{#if errors.cardCvv}
										<p id="cardCvv-error" class="mt-1.5 text-sm text-red-700">{errors.cardCvv}</p>
									{/if}
								</div>
							</div>
						{/if}
					</fieldset>
					<div class="mt-8 flex flex-col gap-3 sm:flex-row">
						<button
							type="button"
							onclick={() => (step = 2)}
							class="flex h-12 items-center justify-center rounded-full border border-line px-8 text-sm font-semibold transition-colors hover:bg-cream"
						>
							Back
						</button>
						<button
							type="submit"
							class="flex h-12 items-center justify-center rounded-full bg-ink px-8 text-sm font-semibold text-white transition-colors hover:bg-black"
						>
							Place Order
						</button>
					</div>
				{/if}
			</form>

			<div class="space-y-6 lg:sticky lg:top-24">
				<div class="rounded-2xl border border-line bg-card p-5 sm:p-6">
					<h2 class="font-display text-lg font-bold">Items in your order</h2>
					<ul class="mt-4 divide-y divide-line">
						{#each cart.lines as line (`${line.product.id}:${line.size}`)}
							<li class="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
								<img
									src={line.product.image}
									alt=""
									width="900"
									height="900"
									loading="lazy"
									decoding="async"
									class="size-14 shrink-0 rounded-lg bg-paper object-cover"
								/>
								<div class="min-w-0 flex-1">
									<p class="truncate text-sm font-semibold">{line.product.name}</p>
									<p class="mt-0.5 text-sm text-ink-soft">
										Size {line.size} · Qty {line.qty}
									</p>
								</div>
								<p class="shrink-0 text-sm font-semibold">
									{formatPrice(line.product.price * line.qty)}
								</p>
							</li>
						{/each}
					</ul>
				</div>
				<OrderSummary {shipping} ctaLabel={summaryCtaLabel} onCta={summaryCta} />
			</div>
		</div>
	{/if}
</div>
