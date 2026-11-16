<script lang="ts">
	import { fly } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import { CheckCircle2, Info, X } from '@lucide/svelte';
	import { toasts } from '#lib/stores/toasts.svelte.js';
</script>

<div
	aria-live="polite"
	class="pointer-events-none fixed inset-x-4 bottom-4 z-[70] flex flex-col items-center gap-2 sm:items-end"
>
	{#each toasts.toasts as toast (toast.id)}
		<div
			role="status"
			transition:fly={{
				y: prefersReducedMotion.current ? 0 : 16,
				duration: prefersReducedMotion.current ? 0 : 250
			}}
			class="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl bg-ink px-4 py-3 text-white shadow-2xl"
		>
			{#if toast.type === 'success'}
				<CheckCircle2 class="size-5 shrink-0" aria-hidden="true" />
			{:else}
				<Info class="size-5 shrink-0" aria-hidden="true" />
			{/if}
			<p class="min-w-0 flex-1 text-sm font-medium">{toast.message}</p>
			<button
				type="button"
				onclick={() => toasts.dismiss(toast.id)}
				aria-label="Dismiss notification"
				class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/15"
			>
				<X class="size-4" aria-hidden="true" />
			</button>
		</div>
	{/each}
</div>
