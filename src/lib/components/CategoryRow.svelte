<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal.js';

	const categories = [
		{ name: "Men's Sneakers", image: '/images/category-mens.jpg', alt: "Men's sneakers" },
		{ name: "Women's Sneakers", image: '/images/category-womens.jpg', alt: "Women's sneakers" },
		{ name: 'Running Shoes', image: '/images/category-running.jpg', alt: 'Running shoes' },
		{ name: 'Lifestyle', image: '/images/category-lifestyle.jpg', alt: 'Lifestyle sneakers' }
	];
</script>

<section id="categories" class="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
	<div class="reveal" use:reveal>
		<p class="text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase">
			Shop by Category
		</p>
		<h2 class="mt-3 font-display text-h2 font-bold">Find Your Fit</h2>
	</div>
	<div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
		{#each categories as category (category.name)}
			<a href="/#best-sellers" class="reveal group block" use:reveal>
				<div class="overflow-hidden rounded-2xl">
					<img
						src={category.image}
						alt={category.alt}
						width="900"
						height="700"
						loading="lazy"
						decoding="async"
						class="aspect-[9/7] w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
					/>
				</div>
				<div class="mt-4 flex items-center justify-between gap-2">
					<h3 class="font-display text-base font-semibold sm:text-lg">{category.name}</h3>
					<span class="inline-flex items-center gap-1 text-sm font-semibold text-ink-soft">
						Explore
						<ArrowRight
							class="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1"
							aria-hidden="true"
						/>
					</span>
				</div>
			</a>
		{/each}
	</div>
</section>
