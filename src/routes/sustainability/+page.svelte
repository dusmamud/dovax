<script lang="ts">
	import { ArrowRight, Leaf, Package, Recycle, Truck } from '@lucide/svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import SectionHeader from '#lib/components/SectionHeader.svelte';
	import { reveal } from '#lib/actions/reveal.js';

	const commitments = [
		{
			icon: Package,
			title: 'Recycled Packaging',
			text: 'We are working towards packaging made entirely from recycled and recyclable materials, with no single-use plastic in our boxes. Our goal is to make every Dovax delivery plastic-free.'
		},
		{
			icon: Leaf,
			title: 'Responsible Materials',
			text: 'We are increasing the share of responsibly sourced and recycled materials across the collection — recycled yarns in our knit uppers and responsibly managed leather-look alternatives in our court styles.'
		},
		{
			icon: Recycle,
			title: 'Recycling Programme',
			text: 'We are building a take-back programme so worn-out Dovax pairs can be returned to us for recycling instead of going to landfill. Details will be announced here as the programme launches.'
		},
		{
			icon: Truck,
			title: 'Carbon-Aware Shipping',
			text: 'We consolidate shipments where possible, choose efficient delivery routes, and are working with our logistics partners to measure and reduce the carbon footprint of every order.'
		}
	];
</script>

<svelte:head>
	<title>Sustainability — Dovax</title>
	<meta
		name="description"
		content="Dovax sustainability commitments: recycled packaging, responsible materials, a recycling programme and carbon-aware shipping. Goals we are working towards."
	/>
</svelte:head>

<main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Sustainability' }]} />

	<div class="reveal mt-8" use:reveal>
		<SectionHeader
			eyebrow="Sustainability"
			title="Small Steps, Honest Goals"
			description="We are a young brand, and we would rather share honest commitments than polished claims. Here is what we are working towards — and we will report our progress as we go."
		/>
	</div>

	<section class="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2">
		{#each commitments as commitment (commitment.title)}
			<article class="reveal rounded-2xl border border-line bg-card p-6 sm:p-8" use:reveal>
				<span class="flex size-11 items-center justify-center rounded-full bg-cream">
					<commitment.icon class="size-5" aria-hidden="true" />
				</span>
				<h2 class="mt-4 font-display text-h3 font-bold">{commitment.title}</h2>
				<p class="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
					{commitment.text}
				</p>
			</article>
		{/each}
	</section>

	<section class="reveal mt-12 rounded-2xl border border-line bg-cream p-6 sm:mt-16 sm:p-8" use:reveal>
		<h2 class="font-display text-h3 font-bold">Our approach</h2>
		<p class="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft sm:text-base">
			Sustainability is a journey, not a badge. The commitments above are goals we are
			actively working towards — they are not certifications we have already earned. We
			believe in being upfront about where we are, so that customers can hold us to the
			progress we promise.
		</p>
		<p class="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft sm:text-base">
			One thing we can do today: build shoes that last. A durable pair that stays in rotation
			for years is the most sustainable pair of all, and it is why we test every style for
			longevity before it reaches the shelf.
		</p>
	</section>

	<section class="reveal mt-16 text-center sm:mt-20" use:reveal>
		<h2 class="font-display text-h3 font-bold">Shoes built to last</h2>
		<p class="mx-auto mt-3 max-w-md text-ink-soft">
			Browse the collection and find a pair you will keep wearing for years.
		</p>
		<a
			href="/shop/"
			class="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-opacity hover:opacity-85"
		>
			Shop the collection
			<ArrowRight class="size-4" aria-hidden="true" />
		</a>
	</section>
</main>
