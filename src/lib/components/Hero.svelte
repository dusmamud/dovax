<script lang="ts">
	import { ArrowRight, CornerLeftUp } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal.js';

	const avatars = [
		{ src: '/images/avatar-aarav.jpg', alt: 'Aarav Mehta' },
		{ src: '/images/avatar-priya.jpg', alt: 'Priya Sharma' },
		{ src: '/images/avatar-rohan.jpg', alt: 'Rohan Kapoor' }
	];
</script>

<section class="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
	<div
		class="reveal grid gap-10 rounded-3xl bg-cream px-6 py-12 sm:px-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-14 lg:py-16"
		use:reveal
	>
		<div>
			<p class="text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase">
				Move Differently
			</p>
			<h1 class="mt-4 font-display text-hero leading-[1.05] font-extrabold text-balance">
				Footwear for a Bolder Tomorrow
			</h1>
			<p class="mt-5 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
				Modern sneakers designed for everyday comfort, performance and style.
			</p>
			<a
				href="/shop/"
				class="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-black"
			>
				Shop Collection
				<ArrowRight class="size-4" aria-hidden="true" />
			</a>
			<div class="mt-10 flex items-center gap-3">
				<div class="flex -space-x-3">
					{#each avatars as avatar (avatar.src)}
						<img
							src={avatar.src}
							alt={avatar.alt}
							width="200"
							height="200"
							loading="lazy"
							decoding="async"
							class="size-10 rounded-full object-cover ring-2 ring-cream"
						/>
					{/each}
				</div>
				<p class="text-sm text-ink-soft">
					Trusted by <span class="font-semibold text-ink">50,000+</span> happy customers
				</p>
			</div>
		</div>

		<div class="relative">
			<img
				src="/images/hero-shoe.jpg"
				alt="Dovax sneaker on a clean studio background"
				width="1600"
				height="1067"
				fetchpriority="high"
				decoding="async"
				class="w-full rounded-2xl object-cover"
			/>
			<p
				class="absolute -bottom-3 left-4 hidden items-center gap-2 rounded-full bg-paper px-4 py-2 text-sm italic shadow-md sm:flex"
			>
				<CornerLeftUp class="size-4 -rotate-12" aria-hidden="true" />
				<span class="font-['Segoe_Script','Bradley_Hand',cursive]">Designed for what's next</span>
			</p>
		</div>
	</div>
</section>
