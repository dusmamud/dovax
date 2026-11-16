<script lang="ts">
	import { CheckCircle2, Clock, Mail } from '@lucide/svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import SectionHeader from '#lib/components/SectionHeader.svelte';
	import { toasts } from '#lib/stores/toasts.svelte.js';
	import { reveal } from '#lib/actions/reveal.js';

	let name = $state('');
	let email = $state('');
	let subject = $state('Order');
	let message = $state('');
	let submitted = $state(false);

	function handleSubmit(event: SubmitEvent): void {
		event.preventDefault();
		submitted = true;
		toasts.push("Message sent — we'll get back to you.");
	}

	function resetForm(): void {
		name = '';
		email = '';
		subject = 'Order';
		message = '';
		submitted = false;
	}
</script>

<svelte:head>
	<title>Contact Us — Dovax</title>
	<meta
		name="description"
		content="Get in touch with Dovax. Questions about orders, products or returns — email us or use the contact form."
	/>
</svelte:head>

<main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

	<div class="reveal mt-8" use:reveal>
		<SectionHeader
			eyebrow="Contact Us"
			title="We Would Love to Hear From You"
			description="Questions about an order, a product or a return? Send us a message and we will get back to you as soon as we can."
		/>
	</div>

	<div class="mt-12 grid gap-8 sm:mt-14 lg:grid-cols-5 lg:gap-12">
		<section class="reveal lg:col-span-3" use:reveal>
			{#if submitted}
				<div class="flex flex-col items-center rounded-2xl border border-line bg-card px-6 py-16 text-center">
					<CheckCircle2 class="size-12 text-gold" aria-hidden="true" />
					<h2 class="mt-4 font-display text-h3 font-bold">Message sent</h2>
					<p class="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft sm:text-base">
						Thank you for reaching out, {name}. We have received your message and will get
						back to you at {email} soon.
					</p>
					<button
						type="button"
						onclick={resetForm}
						class="mt-8 inline-flex min-h-11 items-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition-opacity hover:opacity-85"
					>
						Send another message
					</button>
				</div>
			{:else}
				<form
					onsubmit={handleSubmit}
					class="rounded-2xl border border-line bg-card p-6 sm:p-8"
					novalidate={false}
				>
					<div class="grid gap-5 sm:grid-cols-2">
						<div>
							<label for="contact-name" class="block text-sm font-semibold">Name</label>
							<input
								id="contact-name"
								type="text"
								bind:value={name}
								required
								autocomplete="name"
								placeholder="Your full name"
								class="mt-2 h-12 w-full rounded-xl border border-line bg-paper px-4 text-sm outline-none placeholder:text-ink-soft/60 focus:border-ink"
							/>
						</div>
						<div>
							<label for="contact-email" class="block text-sm font-semibold">Email</label>
							<input
								id="contact-email"
								type="email"
								bind:value={email}
								required
								autocomplete="email"
								placeholder="you@example.com"
								class="mt-2 h-12 w-full rounded-xl border border-line bg-paper px-4 text-sm outline-none placeholder:text-ink-soft/60 focus:border-ink"
							/>
						</div>
					</div>
					<div class="mt-5">
						<label for="contact-subject" class="block text-sm font-semibold">Subject</label>
						<select
							id="contact-subject"
							bind:value={subject}
							required
							class="mt-2 h-12 w-full rounded-xl border border-line bg-paper px-4 text-sm outline-none focus:border-ink"
						>
							<option value="Order">Order</option>
							<option value="Product">Product</option>
							<option value="Returns">Returns</option>
							<option value="Other">Other</option>
						</select>
					</div>
					<div class="mt-5">
						<label for="contact-message" class="block text-sm font-semibold">Message</label>
						<textarea
							id="contact-message"
							bind:value={message}
							required
							minlength={10}
							rows="6"
							placeholder="How can we help?"
							class="mt-2 w-full resize-y rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none placeholder:text-ink-soft/60 focus:border-ink"
						></textarea>
					</div>
					<button
						type="submit"
						class="mt-6 inline-flex min-h-11 items-center rounded-full bg-ink px-7 text-sm font-semibold text-white transition-opacity hover:opacity-85"
					>
						Send message
					</button>
				</form>
			{/if}
		</section>

		<aside class="reveal lg:col-span-2" use:reveal>
			<div class="space-y-4">
				<div class="rounded-2xl border border-line bg-card p-6">
					<span class="flex size-11 items-center justify-center rounded-full bg-cream">
						<Mail class="size-5" aria-hidden="true" />
					</span>
					<h2 class="mt-4 font-display text-lg font-semibold">Email us</h2>
					<p class="mt-2 text-sm leading-relaxed text-ink-soft">
						For orders, products and returns, email us any time.
					</p>
					<a
						href="mailto:hello@dovax.in"
						class="mt-3 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4"
					>
						hello@dovax.in
					</a>
				</div>
				<div class="rounded-2xl border border-line bg-card p-6">
					<span class="flex size-11 items-center justify-center rounded-full bg-cream">
						<Clock class="size-5" aria-hidden="true" />
					</span>
					<h2 class="mt-4 font-display text-lg font-semibold">Support hours</h2>
					<p class="mt-2 text-sm leading-relaxed text-ink-soft">
						Mon–Sat, 9am–6pm IST. Messages sent outside these hours are answered on the next
						working day.
					</p>
				</div>
				<p class="rounded-2xl border border-line bg-cream px-5 py-4 text-sm leading-relaxed text-ink-soft">
					Demo contact details for the Dovax storefront. This is a demo site, so messages
					sent through this form are not delivered to a real support team.
				</p>
			</div>
		</aside>
	</div>
</main>
