<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';

	export interface Crumb {
		label: string;
		href?: string;
	}

	let { items }: { items: Crumb[] } = $props();
</script>

<nav aria-label="Breadcrumb">
	<ol class="flex flex-wrap items-center gap-1.5 text-sm">
		{#each items as item, index (item.label)}
			<li class="flex items-center gap-1.5">
				{#if index > 0}
					<ChevronRight class="size-4 text-ink-soft" aria-hidden="true" />
				{/if}
				{#if item.href && index < items.length - 1}
					<a href={item.href} class="text-ink-soft transition-colors hover:text-ink">
						{item.label}
					</a>
				{:else}
					<span aria-current="page" class="font-medium">{item.label}</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
