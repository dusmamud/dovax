<script lang="ts">
	import { BadgeCheck } from '@lucide/svelte';
	import RatingStars from '#lib/components/RatingStars.svelte';
	import type { ProductReview } from '#lib/data/products.js';

	let { reviews }: { reviews: ProductReview[] } = $props();
</script>

<ul class="divide-y divide-line">
	{#each reviews as review (review.author + review.date + review.title)}
		<li class="py-6 first:pt-0 last:pb-0">
			<div class="flex flex-wrap items-center gap-2">
				<RatingStars rating={review.rating} size={16} />
				<span class="text-sm font-semibold">{review.author}</span>
				{#if review.verified}
					<span class="inline-flex items-center gap-1 text-xs font-medium text-ink-soft">
						<BadgeCheck class="size-4 text-gold" aria-hidden="true" />
						Verified Buyer
					</span>
				{/if}
				<span class="ml-auto text-sm text-ink-soft">{review.date}</span>
			</div>
			<p class="mt-2 font-semibold">{review.title}</p>
			<p class="mt-1 text-sm leading-relaxed text-ink-soft">{review.text}</p>
		</li>
	{/each}
</ul>
