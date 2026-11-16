<script lang="ts">
	import { ArrowRight, Clock, MapPin, Package, Truck } from '@lucide/svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import SectionHeader from '#lib/components/SectionHeader.svelte';
	import { reveal } from '#lib/actions/reveal.js';

	const options = [
		{
			icon: Truck,
			title: 'Standard Delivery',
			price: 'Free above ₹999, else ₹99',
			time: '3–5 business days',
			text: 'Our most popular option. Free on every order above ₹999, and just ₹99 on smaller orders.'
		},
		{
			icon: Package,
			title: 'Express Delivery',
			price: '₹199',
			time: '2–3 business days',
			text: 'Need your sneakers sooner? Express orders are prioritised for packing and shipped on the fastest available service.'
		}
	];
</script>

<svelte:head>
	<title>Shipping Policy — Dovax</title>
	<meta
		name="description"
		content="Dovax shipping: free standard delivery above ₹999 (3–5 business days), express delivery for ₹199 (2–3 business days). Delivery across all India PIN codes."
	/>
</svelte:head>

<main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Shipping' }]} />

	<div class="reveal mt-8" use:reveal>
		<SectionHeader
			eyebrow="Shipping Policy"
			title="Fast, Reliable Delivery Across India"
			description="We ship every order with care, tracked door to door. Here is everything you need to know about delivery times, costs and coverage."
		/>
	</div>

	<section class="mt-12 grid gap-4 sm:mt-14 md:grid-cols-2">
		{#each options as option (option.title)}
			<article class="reveal rounded-2xl border border-line bg-card p-6 sm:p-8" use:reveal>
				<span class="flex size-11 items-center justify-center rounded-full bg-cream">
					<option.icon class="size-5" aria-hidden="true" />
				</span>
				<h2 class="mt-4 font-display text-h3 font-bold">{option.title}</h2>
				<p class="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">{option.text}</p>
				<dl class="mt-5 space-y-2 text-sm">
					<div class="flex justify-between gap-4 border-t border-line pt-3">
						<dt class="text-ink-soft">Cost</dt>
						<dd class="font-semibold">{option.price}</dd>
					</div>
					<div class="flex justify-between gap-4 border-t border-line pt-3">
						<dt class="text-ink-soft">Delivery time</dt>
						<dd class="font-semibold">{option.time}</dd>
					</div>
				</dl>
			</article>
		{/each}
	</section>

	<section class="reveal mt-12 space-y-8 rounded-2xl border border-line bg-card p-6 sm:mt-16 sm:p-8" use:reveal>
		<div>
			<h2 class="flex items-center gap-2 font-display text-lg font-bold">
				<Clock class="size-5" aria-hidden="true" />
				Dispatch time
			</h2>
			<p class="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">
				Orders placed before 2pm IST on a working day are usually dispatched the same day.
				Orders placed after 2pm, on Sundays or on public holidays are dispatched on the next
				working day. Delivery times are counted from dispatch, not from the moment you place
				your order.
			</p>
		</div>
		<div>
			<h2 class="flex items-center gap-2 font-display text-lg font-bold">
				<Package class="size-5" aria-hidden="true" />
				Tracking your order
			</h2>
			<p class="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">
				As soon as your order ships, you will receive a tracking link by email. You can also
				check your order status at any time from the
				<a href="/account/" class="font-semibold underline underline-offset-4">account page</a>.
				If tracking has not updated within 48 hours of dispatch, please
				<a href="/contact/" class="font-semibold underline underline-offset-4">contact us</a>
				and we will look into it.
			</p>
		</div>
		<div>
			<h2 class="flex items-center gap-2 font-display text-lg font-bold">
				<MapPin class="size-5" aria-hidden="true" />
				Delivery coverage
			</h2>
			<p class="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">
				We deliver to all India PIN codes, from metro cities to remote towns. Delivery to
				some remote or hard-to-reach areas may take a day or two longer than the standard
				estimate. We currently ship within India only.
			</p>
		</div>
	</section>

	<p class="reveal mt-8 rounded-2xl border border-line bg-cream px-5 py-4 text-sm leading-relaxed text-ink-soft" use:reveal>
		Dovax is a demo storefront, so no real orders are shipped. The shipping details on this
		page describe how delivery would work for a live store.
	</p>

	<section class="reveal mt-12 text-center sm:mt-16" use:reveal>
		<h2 class="font-display text-h3 font-bold">Questions about delivery?</h2>
		<p class="mx-auto mt-3 max-w-md text-ink-soft">
			Our support team is happy to help with tracking, delivery times and address changes.
		</p>
		<a
			href="/contact/"
			class="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-opacity hover:opacity-85"
		>
			Contact us
			<ArrowRight class="size-4" aria-hidden="true" />
		</a>
	</section>
</main>
