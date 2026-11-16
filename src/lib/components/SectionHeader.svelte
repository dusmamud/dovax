<script lang="ts">
	let {
		eyebrow,
		title,
		description,
		align = 'left'
	}: {
		eyebrow?: string;
		title: string;
		description?: string;
		align?: 'left' | 'center';
	} = $props();
</script>

<div class={align === 'center' ? 'text-center' : ''}>
	{#if eyebrow}
		<p class="text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase">{eyebrow}</p>
	{/if}
	<h1 class="mt-3 font-display text-h2 font-bold">{title}</h1>
	{#if description}
		<p
			class="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base {align ===
			'center'
				? 'mx-auto'
				: ''}"
		>
			{description}
		</p>
	{/if}
</div>
