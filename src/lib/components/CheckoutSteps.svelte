<script lang="ts">
	import { Check } from '@lucide/svelte';

	let { step }: { step: 1 | 2 | 3 } = $props();

	const steps = [
		{ number: 1, label: 'Shipping' },
		{ number: 2, label: 'Delivery' },
		{ number: 3, label: 'Payment' }
	] as const;
</script>

<ol aria-label="Checkout steps" class="flex items-start">
	{#each steps as item, index (item.number)}
		<li class="flex flex-1 items-start gap-2 last:flex-none" aria-current={step === item.number ? 'step' : undefined}>
			<span class="flex flex-col items-center gap-2">
				<span
					class="flex size-11 items-center justify-center rounded-full border text-sm font-bold transition-colors {item.number < step
						? 'border-ink bg-ink text-white'
						: item.number === step
							? 'border-ink bg-paper text-ink'
							: 'border-line bg-card text-ink-soft'}"
				>
					{#if item.number < step}
						<Check class="size-5" aria-hidden="true" />
						<span class="sr-only">Completed:</span>
					{:else}
						{item.number}
					{/if}
				</span>
				<span
					class="text-center text-xs font-semibold sm:text-sm {item.number === step
						? 'text-ink'
						: 'text-ink-soft'}"
				>
					{item.label}
				</span>
			</span>
			{#if index < steps.length - 1}
				<span
					aria-hidden="true"
					class="mt-[22px] h-px min-w-6 flex-1 {item.number < step ? 'bg-ink' : 'bg-line'}"
				></span>
			{/if}
		</li>
	{/each}
</ol>
