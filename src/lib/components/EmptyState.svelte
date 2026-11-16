<script lang="ts">
	import { ArrowRight, Heart, Package, Search, ShoppingBag } from '@lucide/svelte';

	export type EmptyStateIcon = 'bag' | 'heart' | 'package' | 'search';

	const icons = {
		bag: ShoppingBag,
		heart: Heart,
		package: Package,
		search: Search
	};

	let {
		icon = 'bag',
		title,
		message,
		actionLabel,
		actionHref
	}: {
		icon?: EmptyStateIcon;
		title: string;
		message: string;
		actionLabel?: string;
		actionHref?: string;
	} = $props();

	const Icon = $derived(icons[icon]);
</script>

<div class="flex flex-col items-center gap-4 px-6 py-16 text-center">
	<span class="flex size-16 items-center justify-center rounded-full bg-cream">
		<Icon class="size-7 text-ink-soft" aria-hidden="true" />
	</span>
	<h2 class="font-display text-h3 font-bold">{title}</h2>
	<p class="max-w-sm text-sm leading-relaxed text-ink-soft sm:text-base">{message}</p>
	{#if actionLabel && actionHref}
		<a
			href={actionHref}
			class="mt-2 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-black"
		>
			{actionLabel}
			<ArrowRight class="size-4" aria-hidden="true" />
		</a>
	{/if}
</div>
