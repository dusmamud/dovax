<script lang="ts">
	let {
		sizes,
		selected = $bindable<string | undefined>(undefined),
		error
	}: {
		sizes: string[];
		selected?: string | undefined;
		error?: string;
	} = $props();
</script>

<div>
	<div class="flex flex-wrap gap-2" role="group" aria-label="Select size">
		{#each sizes as size (size)}
			<button
				type="button"
				onclick={() => (selected = size)}
				aria-pressed={selected === size}
				class="flex h-11 min-w-14 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition-colors {selected ===
				size
					? 'border-ink bg-ink text-white'
					: 'border-line bg-paper hover:border-ink'}"
			>
				{size}
			</button>
		{/each}
	</div>
	{#if error}
		<p role="alert" class="mt-2 text-sm font-medium text-red-700">{error}</p>
	{/if}
</div>
