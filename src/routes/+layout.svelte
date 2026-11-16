<script lang="ts">
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import AnnouncementBar from '#lib/components/AnnouncementBar.svelte';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import CartDrawer from '#lib/components/CartDrawer.svelte';
	import Toasts from '#lib/components/Toasts.svelte';
	import { cart } from '#lib/stores/cart.svelte.js';
	import { wishlist } from '#lib/stores/wishlist.svelte.js';
	import { orders } from '#lib/stores/orders.svelte.js';
	import { recentlyViewed } from '#lib/stores/recently-viewed.svelte.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	onMount(() => {
		cart.load();
		wishlist.load();
		orders.load();
		recentlyViewed.load();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
>
	Skip to content
</a>

<AnnouncementBar />
<Header />
<main id="main-content">
	{@render children()}
</main>
<Footer />
<CartDrawer />
<Toasts />
