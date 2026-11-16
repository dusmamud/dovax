<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal.js';
	import RatingStars from '#lib/components/RatingStars.svelte';

	interface Testimonial {
		name: string;
		avatar: string;
		quote: string;
	}

	const testimonials: Testimonial[] = [
		{
			name: 'Aarav Mehta',
			avatar: '/images/avatar-aarav.jpg',
			quote: 'Super comfortable and stylish. I wear them everywhere!'
		},
		{
			name: 'Priya Sharma',
			avatar: '/images/avatar-priya.jpg',
			quote: "Best sneakers I've owned. The quality is amazing."
		},
		{
			name: 'Rohan Kapoor',
			avatar: '/images/avatar-rohan.jpg',
			quote: 'Great fit and looks premium. Highly recommend.'
		}
	];

	let index = $state(0);

	function prev() {
		index = (index - 1 + testimonials.length) % testimonials.length;
	}

	function next() {
		index = (index + 1) % testimonials.length;
	}
</script>

{#snippet card(testimonial: Testimonial)}
	<figure class="flex h-full flex-col rounded-2xl border border-line bg-card p-6 sm:p-8">
		<RatingStars rating={5} size={16} />
		<blockquote class="mt-4 flex-1 text-base leading-relaxed sm:text-lg">
			“{testimonial.quote}”
		</blockquote>
		<figcaption class="mt-6 flex items-center gap-3">
			<img
				src={testimonial.avatar}
				alt={testimonial.name}
				width="200"
				height="200"
				loading="lazy"
				decoding="async"
				class="size-11 rounded-full object-cover"
			/>
			<div>
				<p class="font-display text-sm font-semibold">{testimonial.name}</p>
				<p class="text-xs text-ink-soft">Verified Buyer</p>
			</div>
		</figcaption>
	</figure>
{/snippet}

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
	<div class="reveal flex flex-wrap items-end justify-between gap-4" use:reveal>
		<div>
			<p class="text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase">
				Real People. Real Stories.
			</p>
			<h2 class="mt-3 font-display text-h2 font-bold">Loved by Our Community</h2>
		</div>
		<div class="flex gap-2 md:hidden">
			<button
				type="button"
				onclick={prev}
				aria-label="Previous testimonial"
				class="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper transition-colors hover:bg-cream"
			>
				<ChevronLeft class="size-5" aria-hidden="true" />
			</button>
			<button
				type="button"
				onclick={next}
				aria-label="Next testimonial"
				class="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper transition-colors hover:bg-cream"
			>
				<ChevronRight class="size-5" aria-hidden="true" />
			</button>
		</div>
	</div>

	<!-- Mobile: one card at a time -->
	<div class="reveal mt-8 md:hidden" use:reveal>
		{@render card(testimonials[index])}
	</div>

	<!-- md+: all three in a grid -->
	<div class="reveal mt-8 hidden gap-5 md:grid md:grid-cols-3" use:reveal>
		{#each testimonials as testimonial (testimonial.name)}
			{@render card(testimonial)}
		{/each}
	</div>
</section>
