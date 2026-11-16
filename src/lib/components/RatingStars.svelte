<script lang="ts">
	import { Star } from '@lucide/svelte';

	let { rating, size = 16 }: { rating: number; size?: number } = $props();

	const filled = $derived(Math.round(rating));
</script>

<span class="inline-flex items-center gap-0.5" role="img" aria-label="Rated {rating} out of 5">
	{#each [0, 1, 2, 3, 4] as index (index)}
		<Star
			size={size}
			aria-hidden="true"
			class={index < filled ? 'fill-gold text-gold' : 'fill-line text-line'}
		/>
	{/each}
</span>
