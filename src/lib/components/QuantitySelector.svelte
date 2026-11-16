<script lang="ts">
	import { Minus, Plus } from '@lucide/svelte';

	let {
		qty = $bindable(1),
		label = 'Quantity',
		min = 1,
		max = 10
	}: {
		qty?: number;
		label?: string;
		min?: number;
		max?: number;
	} = $props();
</script>

<div class="flex items-center rounded-full border border-line">
	<button
		type="button"
		onclick={() => (qty = Math.max(min, qty - 1))}
		disabled={qty <= min}
		aria-label="Decrease {label.toLowerCase()}"
		class="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream disabled:opacity-40"
	>
		<Minus class="size-4" aria-hidden="true" />
	</button>
	<span class="w-8 text-center text-sm font-semibold" aria-live="polite" aria-label={label}>
		{qty}
	</span>
	<button
		type="button"
		onclick={() => (qty = Math.min(max, qty + 1))}
		disabled={qty >= max}
		aria-label="Increase {label.toLowerCase()}"
		class="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream disabled:opacity-40"
	>
		<Plus class="size-4" aria-hidden="true" />
	</button>
</div>
