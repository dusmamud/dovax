<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import FAQAccordion from '#lib/components/FAQAccordion.svelte';
	import SectionHeader from '#lib/components/SectionHeader.svelte';
	import { reveal } from '#lib/actions/reveal.js';

	const faqs = [
		{
			question: 'How long does delivery take?',
			answer:
				'Standard delivery takes 3–5 business days and is free on orders above ₹999 (₹99 on smaller orders). Express delivery takes 2–3 business days and costs ₹199. Orders placed before 2pm IST on a working day are usually dispatched the same day.'
		},
		{
			question: 'How much does shipping cost?',
			answer:
				'Standard shipping is free on every order above ₹999 and ₹99 on orders below that. Express shipping costs ₹199 regardless of order value. There are no hidden charges — the shipping cost is shown clearly at checkout before you pay.'
		},
		{
			question: 'What is your returns policy?',
			answer:
				'You can return any unworn pair within 30 days of delivery for a full refund. Return pickup is free across India, and refunds are processed to your original payment method within 3–5 business days of the returned pair passing inspection. Size exchanges are always free.'
		},
		{
			question: 'How do Dovax shoes fit?',
			answer:
				'Dovax fits true to size, so we recommend ordering the size you usually wear. If you are between sizes, size up — especially for running styles, where a little extra toe room keeps long runs comfortable. Check our size guide page for UK, US and EU conversions and how to measure your feet at home.'
		},
		{
			question: 'How can I track my order?',
			answer:
				'As soon as your order ships, you will receive a tracking link by email. You can also check your order status at any time from the account page. If tracking has not updated within 48 hours of dispatch, please contact us and we will look into it.'
		},
		{
			question: 'What payment methods do you accept?',
			answer:
				'We accept UPI, credit and debit cards (Visa, Mastercard, RuPay and American Express), net banking, popular wallets, and cash on delivery (COD) across most PIN codes. All online payments are processed over a secure, encrypted connection.'
		},
		{
			question: 'Do you offer discounts or promo codes?',
			answer:
				'Yes — we run seasonal sales and occasional promotions, which are announced on the sale page and in our newsletter. Some promotions use a promo code at checkout; others apply automatically. Only one discount can be applied per order, and sale items may be excluded from additional offers.'
		},
		{
			question: 'How should I care for my sneakers?',
			answer:
				'Brush off surface dirt, spot-clean with mild soap and cold water, and air-dry away from direct sunlight and heat. Do not machine wash or tumble dry your sneakers. Suede panels should be brushed dry with a suede brush. Our blog has a full sneaker care guide with material-by-material advice.'
		},
		{
			question: 'Where do you deliver?',
			answer:
				'We deliver to all India PIN codes, from metro cities to remote towns. Delivery to some remote or hard-to-reach areas may take a day or two longer than the standard estimate. We currently ship within India only.'
		},
		{
			question: 'Can I change or cancel my order?',
			answer:
				'You can change or cancel your order free of charge as long as it has not been dispatched yet — contact us as soon as possible and we will help. Once an order has shipped, it can no longer be changed, but you can still return it within 30 days of delivery for a full refund.'
		}
	];
</script>

<svelte:head>
	<title>Frequently Asked Questions — Dovax</title>
	<meta
		name="description"
		content="Dovax FAQs: shipping, returns, sizing, order tracking, payment methods, discounts, product care, delivery areas and order changes."
	/>
</svelte:head>

<main class="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />

	<div class="reveal mt-8" use:reveal>
		<SectionHeader
			eyebrow="FAQ"
			title="Frequently Asked Questions"
			description="Everything you need to know about ordering, shipping, returns and caring for your Dovax sneakers."
		/>
	</div>

	<div class="reveal mt-12 sm:mt-14" use:reveal>
		<FAQAccordion items={faqs} />
	</div>

	<section class="reveal mt-12 text-center sm:mt-16" use:reveal>
		<h2 class="font-display text-h3 font-bold">Still have a question?</h2>
		<p class="mx-auto mt-3 max-w-md text-ink-soft">
			Our support team is here to help, Mon–Sat, 9am–6pm IST.
		</p>
		<a
			href="/contact/"
			class="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-opacity hover:opacity-85"
		>
			Contact us
			<ArrowRight class="size-4" aria-hidden="true" />
		</a>
	</section>
</main>
