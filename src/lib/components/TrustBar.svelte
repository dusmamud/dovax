<script lang="ts">
	import { Headphones, RotateCcw, ShieldCheck, Truck } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal.js';

	const items = [
		{ icon: Truck, title: 'Free Shipping', text: 'On orders above ₹999' },
		{ icon: RotateCcw, title: 'Easy Returns', text: 'Hassle-free 30 days' },
		{ icon: ShieldCheck, title: 'Secure Payments', text: '100% safe & encrypted' },
		{ icon: Headphones, title: '24/7 Support', text: "We're here to help" }
	];
</script>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
	<div class="reveal grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4" use:reveal>
		{#each items as item (item.title)}
			<div class="flex flex-col items-center gap-3 text-center">
				<span class="flex size-12 items-center justify-center rounded-full bg-cream">
					<item.icon class="size-6" aria-hidden="true" />
				</span>
				<div>
					<h3 class="font-display text-base font-semibold">{item.title}</h3>
					<p class="mt-1 text-sm text-ink-soft">{item.text}</p>
				</div>
			</div>
		{/each}
	</div>
</section>
