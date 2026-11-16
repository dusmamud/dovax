<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import SectionHeader from '#lib/components/SectionHeader.svelte';
	import { reveal } from '#lib/actions/reveal.js';

	const sections = [
		{
			heading: 'Information we collect',
			paragraphs: [
				'When you use the Dovax storefront, the information you provide stays in your own browser. This includes the contents of your shopping cart and wishlist, your recently viewed products, and any account details you choose to enter — all stored locally using your browser’s localStorage.',
				'If you use the contact form, the details you enter (your name, email address, subject and message) are handled in your browser for the purpose of composing your message. We do not operate a server that collects, stores or processes this information.'
			]
		},
		{
			heading: 'How your information is used',
			paragraphs: [
				'Information stored in your browser is used only to make the store work for you: remembering your cart between visits, keeping your wishlist, showing recently viewed products, and remembering your theme preference. It is never sent to us or to any third party.'
			]
		},
		{
			heading: 'Cookies and localStorage',
			paragraphs: [
				'Dovax does not use tracking cookies, advertising cookies or third-party analytics. The store uses localStorage — a feature of your browser — to save your cart, wishlist, recently viewed items and preferences on your own device.',
				'You can clear this data at any time through your browser settings (usually under privacy or site data). Clearing it will empty your cart and wishlist, but will not affect anything else. No data is stored on our servers, because there are no servers collecting it.'
			]
		},
		{
			heading: 'Data sharing',
			paragraphs: [
				'We do not share, sell or rent your personal information to anyone, because we do not collect it in the first place. Your browsing data stays on your device, and no personal information leaves your browser when you use this storefront.'
			]
		},
		{
			heading: 'Your rights',
			paragraphs: [
				'Because your data lives in your own browser, you are always in control of it. You can view, change or delete your stored cart, wishlist and preferences at any time — directly in the store or through your browser settings. There is nothing to request from us, because there is nothing held about you elsewhere.'
			]
		},
		{
			heading: 'Changes to this policy',
			paragraphs: [
				'If Dovax introduces real accounts, order processing or any server-side data collection in the future, this policy will be updated to describe exactly what is collected, why, and how you can control it — before any such collection begins.'
			]
		},
		{
			heading: 'Contact',
			paragraphs: [
				'If you have any questions about this privacy policy, you can reach us at hello@dovax.in or through the contact page.'
			]
		}
	];
</script>

<svelte:head>
	<title>Privacy Policy — Dovax</title>
	<meta
		name="description"
		content="Dovax privacy policy: your data stays in your browser (localStorage). No tracking cookies, no server collection, no data sharing."
	/>
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />

	<div class="reveal mt-8" use:reveal>
		<SectionHeader
			eyebrow="Legal"
			title="Privacy Policy"
			description="Last updated: 16 November 2026. Dovax is a demo storefront — your data stays in your browser, and no server collects it."
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
