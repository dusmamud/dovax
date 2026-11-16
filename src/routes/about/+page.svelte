<script lang="ts">
	import { ArrowRight, Footprints, Handshake, Heart, ShieldCheck } from '@lucide/svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import SectionHeader from '#lib/components/SectionHeader.svelte';
	import { reveal } from '#lib/actions/reveal.js';

	const values = [
		{
			icon: Footprints,
			title: 'Comfort',
			text: 'Every Dovax pair is designed to feel good from the first wear to the last mile — no breaking-in period, no compromises.'
		},
		{
			icon: ShieldCheck,
			title: 'Quality',
			text: 'We use proven materials and construction, and we test every style for durability before it reaches the shelf.'
		},
		{
			icon: Handshake,
			title: 'Honesty',
			text: 'Honest prices with no inflated markups, clear product details, and a 30-day return promise we actually honour.'
		},
		{
			icon: Heart,
			title: 'Community',
			text: 'We listen to the people who wear our shoes and let their feedback shape every new collection.'
		}
	];

	const stats = [
		{ value: '16', label: 'Styles in the collection' },
		{ value: '50,000+', label: 'Happy customers' },
		{ value: '4.8', label: 'Average rating' },
		{ value: '30 days', label: 'Easy returns' }
	];
</script>

<svelte:head>
	<title>About Us — Dovax</title>
	<meta
		name="description"
		content="Dovax was founded in 2026 with a simple mission: great sneakers, honest prices and everyday comfort. Learn about our values and story."
	/>
</svelte:head>

<main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

	<div class="reveal mt-8" use:reveal>
		<SectionHeader
			eyebrow="About Dovax"
			title="Footwear for a Bolder Tomorrow"
			description="Dovax was founded in 2026 with a simple idea: great sneakers should not cost a fortune, and they should feel as good on day one hundred as they do on day one."
		/>
	</div>

	<section class="reveal mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16" use:reveal>
		<div class="space-y-4 text-base leading-relaxed text-ink-soft">
			<p>
				We started Dovax because buying sneakers had become harder than it needed to be.
				Prices kept climbing, styles chased trends instead of comfort, and finding a pair
				you could wear all day — for work, for travel, for everything in between — felt like
				luck.
			</p>
			<p>
				So we set out to make sneakers the straightforward way: proven cushioning,
				breathable materials, honest pricing, and designs that work with the clothes you
				already own. No gimmicks, no inflated launch prices, no compromises on comfort.
			</p>
			<p>
				Today, the Dovax collection covers everyday wear, running and street style — sixteen
				styles, each built around the same promise: great sneakers, honest prices, everyday
				comfort.
			</p>
		</div>
		<div class="overflow-hidden rounded-3xl">
			<img
				src="/images/hero-shoe.jpg"
				alt="A Dovax sneaker"
				width="1200"
				height="800"
				loading="lazy"
				decoding="async"
				class="h-full w-full object-cover"
			/>
		</div>
	</section>

	<section class="reveal mt-16 sm:mt-20" use:reveal>
		<h2 class="font-display text-h3 font-bold">What we stand for</h2>
		<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each values as value (value.title)}
				<div class="rounded-2xl border border-line bg-card p-6">
					<span class="flex size-11 items-center justify-center rounded-full bg-cream">
						<value.icon class="size-5" aria-hidden="true" />
					</span>
					<h3 class="mt-4 font-display text-lg font-semibold">{value.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-ink-soft">{value.text}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="reveal mt-16 sm:mt-20" use:reveal>
		<div class="grid grid-cols-2 gap-6 rounded-3xl bg-ink px-6 py-10 text-white sm:px-10 lg:grid-cols-4">
			{#each stats as stat (stat.label)}
				<div class="text-center">
					<p class="font-display text-h2 font-bold">{stat.value}</p>
					<p class="mt-1 text-sm text-white/70">{stat.label}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="reveal mt-16 text-center sm:mt-20" use:reveal>
		<h2 class="font-display text-h3 font-bold">Ready to find your pair?</h2>
		<p class="mx-auto mt-3 max-w-md text-ink-soft">
			Browse the full collection and find the sneakers that fit your day.
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
