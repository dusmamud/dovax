<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal.js';

	const callouts = [
		{ label: 'Breathable Knit', position: 'top-[18%] left-[12%]' },
		{ label: 'Responsive Cushioning', position: 'top-[48%] right-[8%]' },
		{ label: 'Durable Outsole', position: 'bottom-[14%] left-[28%]' }
	];
</script>

<section
	id="technology"
	class="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
>
	<div
		class="reveal grid gap-10 rounded-3xl bg-ink px-6 py-12 text-white sm:px-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-14 lg:py-16"
		use:reveal
	>
		<div>
			<p class="text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
				Our Technology
			</p>
			<h2 class="mt-3 font-display text-h2 font-bold text-balance">
				Engineered for All-Day Comfort
			</h2>
			<p class="mt-4 max-w-md leading-relaxed text-white/75">
				Advanced cushioning, breathable materials and lightweight design — so you can go
				further in every step.
			</p>
			<a
				href="/#best-sellers"
				class="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-ink transition-colors hover:bg-cream"
			>
				Learn More
				<ArrowRight class="size-4" aria-hidden="true" />
			</a>
		</div>

		<div>
			<div class="relative">
				<img
					src="/images/tech-closeup.jpg"
					alt="Close-up of Dovax sneaker materials and cushioning"
					width="1200"
					height="900"
					loading="lazy"
					decoding="async"
					class="w-full rounded-2xl object-cover"
				/>
				{#each callouts as callout (callout.label)}
					<div
						class="absolute hidden items-center gap-2 lg:flex {callout.position}"
						aria-hidden="true"
					>
						<span class="size-3 shrink-0 rounded-full bg-white ring-4 ring-white/30"></span>
						<span class="rounded-full bg-white px-3 py-1 text-xs font-semibold whitespace-nowrap text-ink shadow-md">
							{callout.label}
						</span>
					</div>
				{/each}
			</div>
			<ul class="mt-6 space-y-3 lg:hidden">
				{#each callouts as callout (callout.label)}
					<li class="flex items-center gap-3 text-sm font-medium text-white/85">
						<span class="size-2.5 shrink-0 rounded-full bg-white" aria-hidden="true"></span>
						{callout.label}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
