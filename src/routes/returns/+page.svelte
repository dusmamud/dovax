<script lang="ts">
	import { ArrowRight, RefreshCcw, RotateCcw, ShieldCheck, Wallet } from '@lucide/svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import SectionHeader from '#lib/components/SectionHeader.svelte';
	import { reveal } from '#lib/actions/reveal.js';

	const steps = [
		{
			title: '1. Contact us',
			text: 'Send us a message from the contact page within 30 days of delivery, with your order details and the reason for the return.'
		},
		{
			title: '2. We arrange pickup',
			text: 'We schedule a free doorstep pickup at a time that suits you. Pack the shoes in their original box, unworn and with all tags attached.'
		},
		{
			title: '3. Inspection and refund',
			text: 'Once the returned pair passes a quick condition check, your refund is processed to your original payment method within 3–5 business days.'
		}
	];
</script>

<svelte:head>
	<title>Returns &amp; Exchanges — Dovax</title>
	<meta
		name="description"
		content="Dovax returns: 30-day returns on unworn shoes, free return pickup, refunds in 3–5 business days and free size exchanges."
	/>
</svelte:head>

<main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Returns' }]} />

	<div class="reveal mt-8" use:reveal>
		<SectionHeader
			eyebrow="Returns &amp; Exchanges"
			title="30 Days to Change Your Mind"
			description="We want you to love your Dovax sneakers. If they are not right for you, returning or exchanging them is simple — and free."
		/>
	</div>

	<section class="mt-12 grid gap-4 sm:mt-14 md:grid-cols-3">
		<article class="reveal rounded-2xl border border-line bg-card p-6" use:reveal>
			<span class="flex size-11 items-center justify-center rounded-full bg-cream">
				<RotateCcw class="size-5" aria-hidden="true" />
			</span>
			<h2 class="mt-4 font-display text-lg font-bold">30-day returns</h2>
			<p class="mt-2 text-sm leading-relaxed text-ink-soft">
				You can return any unworn pair within 30 days of delivery for a full refund. Shoes
				must be in their original condition, with the box and tags intact.
			</p>
		</article>
		<article class="reveal rounded-2xl border border-line bg-card p-6" use:reveal>
			<span class="flex size-11 items-center justify-center rounded-full bg-cream">
				<RefreshCcw class="size-5" aria-hidden="true" />
			</span>
			<h2 class="mt-4 font-display text-lg font-bold">Free size exchange</h2>
			<p class="mt-2 text-sm leading-relaxed text-ink-soft">
				Wrong size? No problem. Size exchanges are completely free — we collect the old pair
				and send the new size at no extra cost to you.
			</p>
		</article>
		<article class="reveal rounded-2xl border border-line bg-card p-6" use:reveal>
			<span class="flex size-11 items-center justify-center rounded-full bg-cream">
				<Wallet class="size-5" aria-hidden="true" />
			</span>
			<h2 class="mt-4 font-display text-lg font-bold">Fast refunds</h2>
			<p class="mt-2 text-sm leading-relaxed text-ink-soft">
				Refunds are processed to your original payment method within 3–5 business days of
				the returned pair passing inspection.
			</p>
		</article>
	</section>

	<section class="reveal mt-12 sm:mt-16" use:reveal>
		<h2 class="font-display text-h3 font-bold">How to start a return</h2>
		<div class="mt-8 grid gap-4 md:grid-cols-3">
			{#each steps as step (step.title)}
				<div class="rounded-2xl border border-line bg-card p-6">
					<h3 class="font-display text-lg font-semibold">{step.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-ink-soft">{step.text}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="reveal mt-12 rounded-2xl border border-line bg-card p-6 sm:mt-16 sm:p-8" use:reveal>
		<h2 class="flex items-center gap-2 font-display text-lg font-bold">
			<ShieldCheck class="size-5" aria-hidden="true" />
			Good to know
		</h2>
		<ul class="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft sm:text-base">
			<li>
				Shoes must be unworn, with no signs of outdoor use, and returned in their original
				box with all tags and accessories.
			</li>
			<li>
				Return pickup is free across India. If pickup is unavailable in your area, we will
				arrange a courier drop-off instead.
			</li>
			<li>
				Refunds go to the original payment method. For cash-on-delivery orders, refunds are
				made by bank transfer to an account you nominate.
			</li>
			<li>
				If you received a damaged or incorrect item, please contact us within 7 days of
				delivery and we will arrange a replacement or full refund right away.
			</li>
		</ul>
	</section>

	<p class="reveal mt-8 rounded-2xl border border-line bg-cream px-5 py-4 text-sm leading-relaxed text-ink-soft" use:reveal>
		Dovax is a demo storefront, so no real returns are processed. The policy on this page
		describes how returns would work for a live store.
	</p>

	<section class="reveal mt-12 text-center sm:mt-16" use:reveal>
		<h2 class="font-display text-h3 font-bold">Ready to start a return?</h2>
		<p class="mx-auto mt-3 max-w-md text-ink-soft">
			Reach out through the contact page and we will arrange your pickup.
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
