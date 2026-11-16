<script lang="ts">
	import { ArrowRight, Ruler } from '@lucide/svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import SectionHeader from '#lib/components/SectionHeader.svelte';
	import { reveal } from '#lib/actions/reveal.js';

	const sizes = [
		{ uk: 'UK 6', us: 'US 7', eu: 'EU 39', cm: '25.0' },
		{ uk: 'UK 7', us: 'US 8', eu: 'EU 40.5', cm: '26.0' },
		{ uk: 'UK 8', us: 'US 9', eu: 'EU 42', cm: '27.0' },
		{ uk: 'UK 9', us: 'US 10', eu: 'EU 43', cm: '28.0' },
		{ uk: 'UK 10', us: 'US 11', eu: 'EU 44.5', cm: '29.0' },
		{ uk: 'UK 11', us: 'US 12', eu: 'EU 46', cm: '30.0' },
		{ uk: 'UK 12', us: 'US 13', eu: 'EU 47', cm: '31.0' }
	];

	const steps = [
		{
			title: '1. Trace your foot',
			text: 'Place a sheet of paper on a hard floor, stand on it in the socks you usually wear, and trace around your foot with a pen held upright.'
		},
		{
			title: '2. Measure heel to toe',
			text: 'Measure the longest distance from the back of your heel to the tip of your longest toe, in centimetres. Repeat for both feet — most people have one foot slightly larger.'
		},
		{
			title: '3. Find your size',
			text: 'Use the larger of your two measurements and match it to the foot length column in the table above to find your Dovax size.'
		}
	];
</script>

<svelte:head>
	<title>Size Guide — Dovax</title>
	<meta
		name="description"
		content="Dovax size guide: UK 6–12 with US and EU equivalents and foot length in centimetres, plus how to measure your feet at home."
	/>
</svelte:head>

<main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Size Guide' }]} />

	<div class="reveal mt-8" use:reveal>
		<SectionHeader
			eyebrow="Size Guide"
			title="Find Your Perfect Fit"
			description="Dovax fits true to size. Use the table below to convert between UK, US and EU sizes, or measure your foot and match it to the length in centimetres."
		/>
	</div>

	<section class="reveal mt-12 sm:mt-14" use:reveal>
		<div class="overflow-x-auto rounded-2xl border border-line bg-card">
			<table class="w-full min-w-[560px] border-collapse text-left text-sm sm:text-base">
				<thead>
					<tr class="border-b border-line">
						<th scope="col" class="px-5 py-4 font-display font-bold sm:px-6">UK</th>
						<th scope="col" class="px-5 py-4 font-display font-bold sm:px-6">US (Men's)</th>
						<th scope="col" class="px-5 py-4 font-display font-bold sm:px-6">EU</th>
						<th scope="col" class="px-5 py-4 font-display font-bold sm:px-6">
							Foot length (cm)
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-line">
					{#each sizes as size (size.uk)}
						<tr>
							<td class="px-5 py-4 font-semibold sm:px-6">{size.uk}</td>
							<td class="px-5 py-4 text-ink-soft sm:px-6">{size.us}</td>
							<td class="px-5 py-4 text-ink-soft sm:px-6">{size.eu}</td>
							<td class="px-5 py-4 text-ink-soft sm:px-6">{size.cm} cm</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="mt-3 text-sm text-ink-soft">
			Conversions follow standard men's shoe sizing charts. Women's US sizes run 1.5 sizes
			higher than the men's US size shown (for example, UK 6 is US 8.5 in women's sizing).
		</p>
	</section>

	<section class="reveal mt-12 sm:mt-16" use:reveal>
		<h2 class="flex items-center gap-2 font-display text-h3 font-bold">
			<Ruler class="size-6" aria-hidden="true" />
			How to measure your feet
		</h2>
		<div class="mt-8 grid gap-4 md:grid-cols-3">
			{#each steps as step (step.title)}
				<div class="rounded-2xl border border-line bg-card p-6">
					<h3 class="font-display text-lg font-semibold">{step.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-ink-soft">{step.text}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="reveal mt-12 rounded-2xl border border-line bg-cream p-6 sm:mt-16 sm:p-8" use:reveal>
		<h2 class="font-display text-lg font-bold">Fit note</h2>
		<p class="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">
			Dovax fits true to size. If you are between sizes, we recommend sizing up — especially
			for running styles, where a little extra toe room keeps long runs comfortable. Measure
			your feet in the afternoon or evening, when they are at their largest. And remember,
			size exchanges are always free, so there is no risk in trying your usual size first.
		</p>
	</section>

	<section class="reveal mt-12 text-center sm:mt-16" use:reveal>
		<h2 class="font-display text-h3 font-bold">Found your size?</h2>
		<p class="mx-auto mt-3 max-w-md text-ink-soft">
			Browse the collection and find the pair that fits your day.
		</p>
		<a
			href="/shop/"
			class="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-opacity hover:opacity-85"
		>
			Shop the collection
			<ArrowRight class="size-4" aria-hidden="true" />
		</a>
	</section>
</main>
