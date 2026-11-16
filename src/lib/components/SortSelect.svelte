<script lang="ts" module>
	export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
</script>

<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';

	let { value, onChange }: { value: SortKey; onChange: (value: SortKey) => void } = $props();

	const OPTIONS: { value: SortKey; label: string }[] = [
		{ value: 'featured', label: 'Featured' },
		{ value: 'price-asc', label: 'Price: Low to High' },
		{ value: 'price-desc', label: 'Price: High to Low' },
		{ value: 'rating', label: 'Top Rated' },
		{ value: 'newest', label: 'Newest' }
	];
</script>

<div class="relative">
	<select
		{value}
		onchange={(event) => onChange(event.currentTarget.value as SortKey)}
		aria-label="Sort products"
		class="h-11 appearance-none rounded-full border border-line bg-paper pr-10 pl-5 text-sm font-semibold transition-colors hover:bg-cream"
	>
		{#each OPTIONS as option (option.value)}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
	<ChevronDown
		class="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-soft"
		aria-hidden="true"
	/>
</div>
