<script lang="ts">
	import { ArrowRight, X } from '@lucide/svelte';

	let dismissed = $state(false);
</script>

{#if !dismissed}
	<div class="relative flex min-h-11 items-center justify-center bg-ink px-12 py-2 text-white">
		<p class="text-center text-xs sm:text-sm">
			Free shipping on orders above ₹999
			<a
				href="/shop/"
				class="ml-2 inline-flex items-center gap-1 font-semibold underline underline-offset-2"
			>
				Shop Now
				<ArrowRight class="size-3.5" aria-hidden="true" />
			</a>
		</p>
		<button
			type="button"
			onclick={() => (dismissed = true)}
			aria-label="Dismiss announcement"
			class="absolute top-1/2 right-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-white/10"
		>
			<X class="size-5" aria-hidden="true" />
		</button>
	</div>
{/if}
