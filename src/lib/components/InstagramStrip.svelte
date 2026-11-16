<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal.js';

	const photos = [
		{ src: '/images/insta-1.jpg', alt: 'Dovax sneakers worn on city streets' },
		{ src: '/images/insta-2.jpg', alt: 'Dovax sneakers styled for the weekend' },
		{ src: '/images/insta-3.jpg', alt: 'Close-up of Dovax sneakers' },
		{ src: '/images/insta-4.jpg', alt: 'Dovax sneakers on the move' },
		{ src: '/images/insta-5.jpg', alt: 'Dovax sneakers in everyday style' }
	];
</script>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
	<div class="reveal flex flex-wrap items-end justify-between gap-4" use:reveal>
		<div>
			<p class="text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase">#DovaxMoves</p>
			<h2 class="mt-3 font-display text-h2 font-bold">Tag us @dovaxsneakers</h2>
		</div>
		<a
			href="https://www.instagram.com/"
			target="_blank"
			rel="noopener"
			class="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-paper px-5 text-sm font-semibold transition-colors hover:bg-cream"
		>
			View on Instagram
			<ArrowRight class="size-4" aria-hidden="true" />
		</a>
	</div>
	<div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
		{#each photos as photo (photo.src)}
			<a
				href="https://www.instagram.com/"
				target="_blank"
				rel="noopener"
				aria-label="View Dovax on Instagram"
				class="reveal group block overflow-hidden rounded-xl"
				use:reveal
			>
				<img
					src={photo.src}
					alt={photo.alt}
					width="900"
					height="900"
					loading="lazy"
					decoding="async"
					class="aspect-square w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
				/>
			</a>
		{/each}
	</div>
</section>
