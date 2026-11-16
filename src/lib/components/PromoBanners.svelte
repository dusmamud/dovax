<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal.js';

	const banners = [
		{
			eyebrow: 'Built for Real Life',
			copy: 'From city streets to weekend escapes, our sneakers move with you.',
			cta: "Shop Men's",
			image: '/images/banner-mens.jpg',
			alt: "Man wearing Dovax sneakers",
			buttonClass: 'bg-white text-ink hover:bg-cream'
		},
		{
			eyebrow: 'Style in Every Step',
			copy: 'Designed for comfort, made for your everyday.',
			cta: "Shop Women's",
			image: '/images/banner-womens.jpg',
			alt: "Woman wearing Dovax sneakers",
			buttonClass: 'bg-ink text-white hover:bg-black'
		}
	];
</script>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
	<div class="grid grid-cols-1 gap-5 md:grid-cols-2">
		{#each banners as banner (banner.eyebrow)}
			<div class="reveal relative overflow-hidden rounded-3xl" use:reveal>
				<img
					src={banner.image}
					alt={banner.alt}
					width="1600"
					height="1067"
					loading="lazy"
					decoding="async"
					class="absolute inset-0 h-full w-full object-cover"
				/>
				<div class="absolute inset-0 bg-black/45" aria-hidden="true"></div>
				<div class="relative flex min-h-[320px] flex-col justify-end p-8 sm:min-h-[360px] sm:p-10">
					<h3 class="font-display text-h3 font-bold text-white uppercase">
						{banner.eyebrow}
					</h3>
					<p class="mt-2 max-w-sm text-sm leading-relaxed text-white/85 sm:text-base">
						{banner.copy}
					</p>
					<a
						href="/#categories"
						class="mt-6 inline-flex h-11 w-fit items-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors {banner.buttonClass}"
					>
						{banner.cta}
						<ArrowRight class="size-4" aria-hidden="true" />
					</a>
				</div>
			</div>
		{/each}
	</div>
</section>
