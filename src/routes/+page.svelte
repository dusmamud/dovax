<script lang="ts">
	import Hero from '#lib/components/Hero.svelte';
	import CategoryRow from '#lib/components/CategoryRow.svelte';
	import BestSellers from '#lib/components/BestSellers.svelte';
	import PromoBanners from '#lib/components/PromoBanners.svelte';
	import TrustBar from '#lib/components/TrustBar.svelte';
	import Technology from '#lib/components/Technology.svelte';
	import Testimonials from '#lib/components/Testimonials.svelte';
	import InstagramStrip from '#lib/components/InstagramStrip.svelte';
	import Newsletter from '#lib/components/Newsletter.svelte';
</script>

<svelte:head>
	<title>Dovax — Footwear for a Bolder Tomorrow</title>
	<meta
		name="description"
		content="Dovax — modern sneakers designed for everyday comfort, performance and style. Free shipping on orders above ₹999."
	/>
</svelte:head>

<Hero />
<CategoryRow />
<BestSellers />
<PromoBanners />
<TrustBar />
<Technology />
<Testimonials />
<InstagramStrip />
<Newsletter />
