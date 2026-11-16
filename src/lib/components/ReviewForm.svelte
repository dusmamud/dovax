<script lang="ts" module>
	/** localStorage key for customer-submitted reviews, keyed by product slug. */
	export const REVIEWS_STORAGE_KEY = 'dovax-reviews-v1';
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import { Star } from '@lucide/svelte';
	import { toasts } from '#lib/stores/toasts.svelte.js';
	import type { ProductReview } from '#lib/data/products.js';

	const MONTHS = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	let {
		productSlug,
		onSubmitted
	}: {
		productSlug: string;
		onSubmitted: (review: ProductReview) => void;
	} = $props();

	let name = $state('');
	let rating = $state(0);
	let title = $state('');
	let text = $state('');
	let errors = $state<{ name?: string; rating?: string; title?: string; text?: string }>({});

	function formatToday(): string {
		const now = new Date();
		return `${String(now.getDate()).padStart(2, '0')} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`;
	}

	function clearError(field: 'name' | 'rating' | 'title' | 'text') {
		errors = { ...errors, [field]: undefined };
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		const next: typeof errors = {};
		if (!name.trim()) next.name = 'Please enter your name.';
		if (rating === 0) next.rating = 'Please select a star rating.';
		if (!title.trim()) next.title = 'Please add a review title.';
		if (!text.trim()) next.text = 'Please write your review.';
		errors = next;
		if (Object.keys(next).length > 0) return;

		const review: ProductReview = {
			author: name.trim(),
			rating,
			date: formatToday(),
			title: title.trim(),
			text: text.trim(),
			verified: false
		};

		if (browser) {
			try {
				const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
				const parsed: unknown = raw ? JSON.parse(raw) : {};
				const all: Record<string, ProductReview[]> =
					parsed && typeof parsed === 'object' && !Array.isArray(parsed)
						? (parsed as Record<string, ProductReview[]>)
						: {};
				const existing = Array.isArray(all[productSlug]) ? all[productSlug] : [];
				all[productSlug] = [review, ...existing];
				localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(all));
			} catch {
				// Storage unavailable — the review still shows this session via onSubmitted.
			}
		}

		onSubmitted(review);
		name = '';
		rating = 0;
		title = '';
		text = '';
		errors = {};
		toasts.push('Thanks! Your review is live.');
	}
</script>

<form onsubmit={handleSubmit} novalidate class="space-y-5">
	<div>
		<label for="review-name" class="mb-2 block text-sm font-semibold">Your name</label>
		<input
			id="review-name"
			type="text"
			bind:value={name}
			oninput={() => clearError('name')}
			aria-invalid={errors.name ? true : undefined}
			aria-describedby={errors.name ? 'review-name-error' : undefined}
			placeholder="e.g. Aarav Mehta"
			autocomplete="name"
			class="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none placeholder:text-ink-soft/70 focus:border-ink"
		/>
		{#if errors.name}
			<p id="review-name-error" role="alert" class="mt-2 text-sm font-medium text-red-700">
				{errors.name}
			</p>
		{/if}
	</div>

	<div>
		<span id="review-rating-label" class="mb-2 block text-sm font-semibold">Rating</span>
		<div class="flex gap-1" role="radiogroup" aria-labelledby="review-rating-label">
			{#each [1, 2, 3, 4, 5] as value (value)}
				<button
					type="button"
					onclick={() => {
						rating = value;
						clearError('rating');
					}}
					role="radio"
					aria-checked={rating === value}
					aria-label="Rate {value} star{value === 1 ? '' : 's'}"
					class="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream"
				>
					<Star
						class="size-6 {value <= rating ? 'fill-gold text-gold' : 'fill-line text-line'}"
						aria-hidden="true"
					/>
				</button>
			{/each}
		</div>
		{#if errors.rating}
			<p role="alert" class="mt-2 text-sm font-medium text-red-700">{errors.rating}</p>
		{/if}
	</div>

	<div>
		<label for="review-title" class="mb-2 block text-sm font-semibold">Review title</label>
		<input
			id="review-title"
			type="text"
			bind:value={title}
			oninput={() => clearError('title')}
			aria-invalid={errors.title ? true : undefined}
			aria-describedby={errors.title ? 'review-title-error' : undefined}
			placeholder="Sum up your experience"
			class="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none placeholder:text-ink-soft/70 focus:border-ink"
		/>
		{#if errors.title}
			<p id="review-title-error" role="alert" class="mt-2 text-sm font-medium text-red-700">
				{errors.title}
			</p>
		{/if}
	</div>

	<div>
		<label for="review-text" class="mb-2 block text-sm font-semibold">Your review</label>
		<textarea
			id="review-text"
			rows="4"
			bind:value={text}
			oninput={() => clearError('text')}
			aria-invalid={errors.text ? true : undefined}
			aria-describedby={errors.text ? 'review-text-error' : undefined}
			placeholder="How do they fit? How do they feel on long days?"
			class="w-full resize-y rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none placeholder:text-ink-soft/70 focus:border-ink"
		></textarea>
		{#if errors.text}
			<p id="review-text-error" role="alert" class="mt-2 text-sm font-medium text-red-700">
				{errors.text}
			</p>
		{/if}
	</div>

	<button
		type="submit"
		class="inline-flex h-12 w-full items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-black"
	>
		Submit review
	</button>
</form>
