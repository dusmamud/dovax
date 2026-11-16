<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';

	export interface FaqItem {
		question: string;
		answer: string;
	}

	let { items }: { items: FaqItem[] } = $props();

	let openIndex = $state<number | null>(null);

	function toggle(index: number): void {
		openIndex = openIndex === index ? null : index;
	}
</script>

<div class="divide-y divide-line rounded-2xl border border-line bg-card">
	{#each items as item, index (item.question)}
		<div>
			<h3>
				<button
					type="button"
					class="flex min-h-11 w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-semibold sm:px-6 sm:text-lg"
					aria-expanded={openIndex === index}
					aria-controls="faq-panel-{index}"
					id="faq-button-{index}"
					onclick={() => toggle(index)}
				>
					<span>{item.question}</span>
					<ChevronDown
						class="size-5 shrink-0 text-ink-soft transition-transform duration-300 {openIndex ===
						index
							? 'rotate-180'
							: ''}"
						aria-hidden="true"
					/>
				</button>
			</h3>
			{#if openIndex === index}
				<div id="faq-panel-{index}" role="region" aria-labelledby="faq-button-{index}">
					<p class="px-5 pb-5 text-sm leading-relaxed text-ink-soft sm:px-6 sm:text-base">
						{item.answer}
					</p>
				</div>
			{/if}
		</div>
	{/each}
</div>
