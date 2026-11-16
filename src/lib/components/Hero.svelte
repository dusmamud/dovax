<script lang="ts">
	import { ArrowRight, CornerLeftUp, Star } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal.js';

	const avatars = [
		{ src: '/images/avatar-aarav.jpg', alt: 'Aarav Mehta' },
		{ src: '/images/avatar-priya.jpg', alt: 'Priya Sharma' },
		{ src: '/images/avatar-rohan.jpg', alt: 'Rohan Kapoor' }
	];
</script>

<section class="relative overflow-hidden bg-cream">
	<span
		aria-hidden="true"
		class="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 font-display text-[26vw] leading-none font-extrabold tracking-tight whitespace-nowrap text-ink/[0.05] select-none lg:text-[17rem]"
	>
		DOVAX
	</span>
	<div
		class="reveal relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16 lg:px-8 lg:py-20"
		use:reveal
	>
		<div>
			<p class="text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase">
				Move Differently
			</p>
			<h1 class="mt-4 font-display text-hero leading-[1.05] font-extrabold text-balance">
				Footwear for a Bolder
				<span class="relative inline-block">
					Tomorrow
					<svg
						class="absolute -bottom-2 left-0 h-[0.22em] w-full"
						viewBox="0 0 200 14"
						fill="none"
						preserveAspectRatio="none"
						aria-hidden="true"
					>
						<path
							d="M3 10 C 60 3, 140 3, 197 8"
							stroke="#dc2626"
							stroke-width="6"
							stroke-linecap="round"
						/>
					</svg>
				</span>
			</h1>
			<p class="mt-5 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
				Modern sneakers designed for everyday comfort, performance and style.
			</p>
			<div class="mt-8 flex flex-wrap items-center gap-5">
				<a
					href="/shop/"
					class="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-black"
				>
					Shop Collection
					<ArrowRight class="size-4" aria-hidden="true" />
				</a>
				<a
					href="/best-sellers/"
					class="inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
				>
					Explore Best Sellers
					<ArrowRight class="size-4" aria-hidden="true" />
				</a>
			</div>
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
			<div
				class="absolute top-1/2 left-1/2 aspect-square w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.30),rgba(220,38,38,0.10)_55%,transparent_70%)]"
				aria-hidden="true"
			></div>
			<div
				class="absolute bottom-[6%] left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-black/15 blur-xl"
				aria-hidden="true"
			></div>
			<img
				src="/images/hero-shoe.png"
				alt="Red Dovax sneaker"
				width="876"
				height="541"
				fetchpriority="high"
				decoding="async"
				class="relative w-full animate-float drop-shadow-xl"
			/>
			<div
				class="absolute top-0 right-2 hidden animate-float items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-lg [animation-delay:1.5s] sm:flex"
				aria-hidden="true"
			>
				<Star class="size-4 fill-gold text-gold" aria-hidden="true" />
				4.8 · 12,000+ reviews
			</div>
			<p
				class="absolute -bottom-2 left-2 hidden items-center gap-2 rounded-full bg-paper px-4 py-2 text-sm italic shadow-md sm:flex"
			>
				<CornerLeftUp class="size-4 -rotate-12" aria-hidden="true" />
				<span class="font-['Segoe_Script','Bradley_Hand',cursive]">Designed for what's next</span>
			</p>
		</div>
	</div>
</section>
