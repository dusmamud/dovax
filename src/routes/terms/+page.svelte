<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import SectionHeader from '#lib/components/SectionHeader.svelte';
	import { reveal } from '#lib/actions/reveal.js';

	const sections = [
		{
			heading: 'About these terms',
			paragraphs: [
				'These terms of service govern your use of the Dovax website. By browsing or using this site, you agree to these terms. Dovax is a demo storefront: no real products are sold, no real payments are processed, and no real orders are fulfilled through this site.'
			]
		},
		{
			heading: 'Products and pricing',
			paragraphs: [
				'Product descriptions, images, prices and availability shown on this site are for demonstration purposes. We aim to keep product information accurate, but colours may vary slightly from what you see on screen, and prices and availability may change without notice.',
				'All prices are shown in Indian Rupees (₹) and are inclusive of applicable taxes, as they would be for a live store.'
			]
		},
		{
			heading: 'Orders',
			paragraphs: [
				'Because Dovax is a demo storefront, orders placed through this site are simulated and stored only in your browser. No order is transmitted to us, no payment is taken, and no goods are dispatched.',
				'For a live store, placing an order would constitute an offer to purchase, and an order would be confirmed only once payment is accepted and a confirmation is issued.'
			]
		},
		{
			heading: 'Payments',
			paragraphs: [
				'No real payments are processed on this demo site. The payment methods described at checkout (UPI, cards, net banking, wallets and cash on delivery) illustrate how payment would work for a live store.',
				'For a live store, payments would be processed securely by a licensed payment provider, and you would be responsible for providing accurate payment details.'
			]
		},
		{
			heading: 'Shipping and delivery',
			paragraphs: [
				'No goods are shipped from this demo site. The shipping options and delivery times described on the shipping page illustrate how delivery would work for a live store, including free standard delivery above ₹999 and express delivery options.'
			]
		},
		{
			heading: 'Returns and refunds',
			paragraphs: [
				'No real returns are processed on this demo site. The returns policy described on the returns page — 30-day returns on unworn shoes, free return pickup, free size exchanges and refunds within 3–5 business days — illustrates how returns would work for a live store.'
			]
		},
		{
			heading: 'Acceptable use',
			paragraphs: [
				'You agree not to use this site for any unlawful purpose, to attempt to gain unauthorised access to any part of it, or to interfere with its normal operation. The Dovax name, logo and site content are the property of their respective owners and may not be reproduced without permission.'
			]
		},
		{
			heading: 'Liability',
			paragraphs: [
				'This site is provided “as is” for demonstration purposes, without warranties of any kind. To the fullest extent permitted by law, Dovax is not liable for any loss or damage arising from your use of this demo site, including any reliance on product information, prices or availability shown here.'
			]
		},
		{
			heading: 'Governing law',
			paragraphs: [
				'These terms are governed by the laws of India. Any disputes arising from or relating to these terms or your use of this site shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka, India.'
			]
		},
		{
			heading: 'Changes to these terms',
			paragraphs: [
				'We may update these terms from time to time. The current version will always be published on this page, with the last-updated date shown above.'
			]
		},
		{
			heading: 'Contact',
			paragraphs: [
				'If you have any questions about these terms, you can reach us at hello@dovax.in or through the contact page.'
			]
		}
	];
</script>

<svelte:head>
	<title>Terms of Service — Dovax</title>
	<meta
		name="description"
		content="Dovax terms of service: products and pricing, orders, payments, shipping, returns, liability and governing law (India). Demo storefront."
	/>
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} />

	<div class="reveal mt-8" use:reveal>
		<SectionHeader
			eyebrow="Legal"
			title="Terms of Service"
			description="Last updated: 16 November 2026. Dovax is a demo storefront — please read these terms before using the site."
		/>
	</div>

	<div class="reveal mt-12 space-y-10 sm:mt-14" use:reveal>
		{#each sections as section (section.heading)}
			<section>
				<h2 class="font-display text-h3 font-bold">{section.heading}</h2>
				{#each section.paragraphs as paragraph (paragraph.slice(0, 48))}
					<p class="mt-3 text-base leading-relaxed text-ink-soft">{paragraph}</p>
				{/each}
			</section>
		{/each}
	</div>
</main>
