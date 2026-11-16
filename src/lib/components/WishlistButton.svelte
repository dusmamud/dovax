<script lang="ts">
	import { Heart } from '@lucide/svelte';
	import { toasts } from '#lib/stores/toasts.svelte.js';
	import { wishlist } from '#lib/stores/wishlist.svelte.js';

	let { productId, size = 'md' }: { productId: string; size?: 'sm' | 'md' } = $props();

	const saved = $derived(wishlist.has(productId));

	function handleClick() {
		const nowSaved = wishlist.toggle(productId);
		toasts.push(nowSaved ? 'Saved to wishlist' : 'Removed from wishlist');
	}
</script>

<button
	type="button"
	onclick={handleClick}
	aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
	aria-pressed={saved}
	class="flex shrink-0 items-center justify-center rounded-full border border-line bg-paper shadow-sm transition-colors hover:bg-cream {size ===
	'sm'
		? 'h-11 w-11'
		: 'h-12 w-12'}"
>
	<Heart
		class="{size === 'sm' ? 'size-4' : 'size-5'} {saved
			? 'fill-red-600 text-red-600'
			: 'text-ink'}"
		aria-hidden="true"
	/>
</button>
