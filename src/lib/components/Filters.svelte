<script lang="ts" module>
	import type { ProductCategory } from '#lib/data/products.js';

	export interface FilterState {
		categories: ProductCategory[];
		sizes: string[];
		maxPrice: number;
		colors: string[];
		minRating: number;
	}

	/** Top of the price slider — above the most expensive product (₹11,499). */
	export const DEFAULT_MAX_PRICE = 12000;

	export function createDefaultFilters(): FilterState {
		return {
			categories: [],
			sizes: [],
			maxPrice: DEFAULT_MAX_PRICE,
			colors: [],
			minRating: 0
		};
	}
</script>

<script lang="ts">
	import { SIZES } from '#lib/data/products.js';
	import { formatPrice } from '#lib/utils/format.js';

	let {
		filters,
		onChange,
		ratingGroupName = 'min-rating'
	}: {
		filters: FilterState;
		onChange: (filters: FilterState) => void;
		/** Distinct per instance — the sidebar and the mobile drawer both render Filters. */
		ratingGroupName?: string;
	} = $props();

	const CATEGORIES: { value: ProductCategory; label: string }[] = [
		{ value: 'men', label: 'Men' },
		{ value: 'women', label: 'Women' },
		{ value: 'running', label: 'Running' },
		{ value: 'lifestyle', label: 'Lifestyle' }
	];

	// Fixed palette of colours used across the catalogue (names match product data).
	const PALETTE: { name: string; hex: string }[] = [
		{ name: 'Cloud White', hex: '#f5f5f4' },
		{ name: 'Classic White', hex: '#ffffff' },
		{ name: 'Cream', hex: '#fef3c7' },
		{ name: 'Jet Black', hex: '#0a0a0a' },
		{ name: 'Carbon Black', hex: '#171717' },
		{ name: 'Charcoal', hex: '#374151' },
		{ name: 'Slate Grey', hex: '#64748b' },
		{ name: 'Navy', hex: '#1e3a8a' },
		{ name: 'Ocean Blue', hex: '#2563eb' },
		{ name: 'Glacier Blue', hex: '#7dd3fc' },
		{ name: 'Forest Green', hex: '#166534' },
		{ name: 'Olive', hex: '#556b2f' },
		{ name: 'Sage', hex: '#9caf88' },
		{ name: 'Volt Lime', hex: '#84cc16' },
		{ name: 'Blush Pink', hex: '#f9a8d4' },
		{ name: 'Coral', hex: '#fb7185' },
		{ name: 'Tan Leather', hex: '#b45309' },
		{ name: 'Rust', hex: '#b7410e' }
	];

	const RATINGS: { value: number; label: string }[] = [
		{ value: 0, label: 'Any' },
		{ value: 4, label: '4+' },
		{ value: 4.5, label: '4.5+' }
	];

	const hasActive = $derived(
		filters.categories.length > 0 ||
			filters.sizes.length > 0 ||
			filters.colors.length > 0 ||
			filters.minRating > 0 ||
			filters.maxPrice < DEFAULT_MAX_PRICE
	);

	function toggleInList<T>(list: T[], value: T): T[] {
		return list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value];
	}

	function toggleCategory(category: ProductCategory) {
		onChange({ ...filters, categories: toggleInList(filters.categories, category) });
	}

	function toggleSize(size: string) {
		onChange({ ...filters, sizes: toggleInList(filters.sizes, size) });
	}

	function toggleColor(color: string) {
		onChange({ ...filters, colors: toggleInList(filters.colors, color) });
	}
</script>

<div class="space-y-8">
	<div class="flex items-center justify-between">
		<h2 class="font-display text-base font-semibold">Filters</h2>
		{#if hasActive}
			<button
				type="button"
				onclick={() => onChange(createDefaultFilters())}
				class="text-sm font-medium text-ink-soft underline-offset-2 hover:text-ink hover:underline"
			>
				Clear all
			</button>
		{/if}
	</div>

	<fieldset>
		<legend class="text-sm font-semibold">Category</legend>
		<div class="mt-3 space-y-2.5">
			{#each CATEGORIES as category (category.value)}
				<label class="flex cursor-pointer items-center gap-2.5 text-sm">
					<input
						type="checkbox"
						checked={filters.categories.includes(category.value)}
						onchange={() => toggleCategory(category.value)}
						class="size-4 shrink-0 accent-ink"
					/>
					{category.label}
				</label>
			{/each}
		</div>
	</fieldset>

	<fieldset>
		<legend class="text-sm font-semibold">Size</legend>
		<div class="mt-3 flex flex-wrap gap-2">
			{#each SIZES as size (size)}
				<button
					type="button"
					onclick={() => toggleSize(size)}
					aria-pressed={filters.sizes.includes(size)}
					class="flex h-11 min-w-14 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition-colors {filters.sizes.includes(
						size
					)
						? 'border-ink bg-ink text-white'
						: 'border-line bg-paper hover:border-ink'}"
				>
					{size}
				</button>
			{/each}
		</div>
	</fieldset>

	<fieldset>
		<legend class="text-sm font-semibold">Max price</legend>
		<input
			type="range"
			min="5000"
			max={DEFAULT_MAX_PRICE}
			step="500"
			value={filters.maxPrice}
			oninput={(event) =>
				onChange({ ...filters, maxPrice: Number(event.currentTarget.value) })}
			aria-label="Maximum price"
			class="mt-3 w-full accent-ink"
		/>
		<p class="mt-2 text-sm text-ink-soft">
			Up to <span class="font-semibold text-ink">{formatPrice(filters.maxPrice)}</span>
		</p>
	</fieldset>

	<fieldset>
		<legend class="text-sm font-semibold">Colour</legend>
		<div class="mt-3 flex flex-wrap gap-2.5">
			{#each PALETTE as color (color.name)}
				<button
					type="button"
					onclick={() => toggleColor(color.name)}
					aria-pressed={filters.colors.includes(color.name)}
					aria-label={color.name}
					title={color.name}
					style="background-color: {color.hex}"
					class="size-9 rounded-full border border-line transition-shadow {filters.colors.includes(
						color.name
					)
						? 'ring-2 ring-ink ring-offset-2 ring-offset-paper'
						: 'hover:ring-2 hover:ring-ink-soft hover:ring-offset-2 hover:ring-offset-paper'}"
				></button>
			{/each}
		</div>
	</fieldset>

	<fieldset>
		<legend class="text-sm font-semibold">Rating</legend>
		<div class="mt-3 space-y-2.5">
			{#each RATINGS as option (option.value)}
				<label class="flex cursor-pointer items-center gap-2.5 text-sm">
					<input
						type="radio"
						name={ratingGroupName}
						checked={filters.minRating === option.value}
						onchange={() => onChange({ ...filters, minRating: option.value })}
						class="size-4 shrink-0 accent-ink"
					/>
					{option.label}
				</label>
			{/each}
		</div>
	</fieldset>
</div>
