<script lang="ts">
	import { ArrowRight, Cloud, Feather, Grip, Wind } from '@lucide/svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import SectionHeader from '#lib/components/SectionHeader.svelte';
	import { reveal } from '#lib/actions/reveal.js';

	const technologies = [
		{
			icon: Cloud,
			title: 'CloudFoam Cushioning',
			text: 'Our signature midsole foam absorbs impact with every step and springs back instantly, so the cushioning feels as fresh on kilometre ten as it does on kilometre one. A soft heel strike, a responsive toe-off, and no flat feeling at the end of a long day.',
			specs: [
				'Responsive EVA foam midsole',
				'Air-sole cushioning unit in select styles',
				'Heel drop 8–10 mm across the range'
			]
		},
		{
			icon: Wind,
			title: 'Breathable Knit Upper',
			text: 'The engineered-knit upper is woven with open zones that let air flow where your foot runs hottest, while denser panels hold the midfoot securely. The result is a sock-like fit that breathes through warm days and long sessions.',
			specs: [
				'Engineered knit with ventilation zones',
				'Seamless construction to reduce rubbing',
				'Stretch panels that adapt to your foot'
			]
		},
		{
			icon: Grip,
			title: 'Durable Outsole',
			text: 'Every Dovax outsole is built from high-abrasion rubber with a tread pattern tuned to its purpose — herringbone grip for court styles, multi-directional lugs for trail, and all-surface traction for everyday wear. The rubber is formulated to resist wear, so grip lasts well beyond the first season.',
			specs: [
				'High-abrasion rubber compound',
				'Tread patterns tuned per style',
				'Reinforced toe caps on street styles'
			]
		},
		{
			icon: Feather,
			title: 'Lightweight Construction',
			text: 'We strip weight everywhere it does not add comfort: slimmed-down midsoles, featherlight knits, and minimal overlays. Most Dovax styles weigh between 240 g and 320 g per shoe, so you can wear them all day without feeling weighed down.',
			specs: [
				'240–320 g per shoe, depending on style',
				'Lightweight EVA midsoles throughout',
				'Flexible grooved soles for natural movement'
			]
		}
	];
</script>

<svelte:head>
	<title>Our Technology — Dovax</title>
	<meta
		name="description"
		content="CloudFoam cushioning, breathable knit uppers, durable outsoles and lightweight construction. How Dovax sneakers are engineered for all-day comfort."
	/>
</svelte:head>

<main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Technology' }]} />

	<div class="reveal mt-8" use:reveal>
		<SectionHeader
			eyebrow="Our Technology"
			title="Engineered for All-Day Comfort"
			description="Four ideas shape every Dovax sneaker: cushioning that stays responsive, uppers that breathe, outsoles that last, and a build light enough to forget you are wearing them."
		/>
	</div>

	<section class="reveal mt-12" use:reveal>
		<div class="overflow-hidden rounded-3xl">
			<img
				src="/images/tech-closeup.jpg"
				alt="Close-up of Dovax sneaker materials, cushioning and stitching"
				width="1200"
				height="900"
				loading="lazy"
				decoding="async"
				class="max-h-[480px] w-full object-cover"
			/>
		</div>
	</section>

	<section class="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2">
		{#each technologies as tech (tech.title)}
			<article class="reveal rounded-2xl border border-line bg-card p-6 sm:p-8" use:reveal>
				<span class="flex size-11 items-center justify-center rounded-full bg-cream">
					<tech.icon class="size-5" aria-hidden="true" />
				</span>
				<h2 class="mt-4 font-display text-h3 font-bold">{tech.title}</h2>
				<p class="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">{tech.text}</p>
				<ul class="mt-5 space-y-2">
					{#each tech.specs as spec (spec)}
						<li class="flex items-start gap-2.5 text-sm text-ink-soft">
							<span class="mt-2 size-1.5 shrink-0 rounded-full bg-ink" aria-hidden="true"></span>
							{spec}
						</li>
					{/each}
				</ul>
			</article>
		{/each}
	</section>

	<section class="reveal mt-16 rounded-3xl bg-ink px-6 py-12 text-center text-white sm:mt-20 sm:px-10" use:reveal>
		<h2 class="font-display text-h3 font-bold">Feel the difference yourself</h2>
		<p class="mx-auto mt-3 max-w-md text-white/75">
			Every Dovax style carries the same comfort technology, backed by a 30-day return
			promise.
		</p>
		<a
			href="/shop/"
			class="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-ink transition-colors hover:bg-cream"
		>
			Shop the collection
			<ArrowRight class="size-4" aria-hidden="true" />
		</a>
	</section>
</main>
