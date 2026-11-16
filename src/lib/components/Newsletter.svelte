<script lang="ts">
	import { ArrowRight, Check } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal.js';

	let email = $state('');
	let error = $state('');
	let subscribed = $state(false);
	let inputEl: HTMLInputElement | undefined = $state();

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			error = 'Please enter a valid email address.';
			inputEl?.focus();
			return;
		}
		error = '';
		subscribed = true;
	}
</script>

<section class="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8">
	<div class="reveal rounded-3xl bg-cream px-6 py-12 text-center sm:px-10 lg:py-16" use:reveal>
		<p class="text-xs font-semibold tracking-[0.2em] text-ink-soft uppercase">
			Stay in the Loop
		</p>
		<h2 class="mx-auto mt-3 max-w-xl font-display text-h2 font-bold text-balance">
			Get Exclusive Drops &amp; Offers
		</h2>
		<p class="mx-auto mt-3 max-w-md text-ink-soft">
			Be the first to know about new arrivals, special offers and more.
		</p>

		{#if subscribed}
			<p class="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">
				<Check class="size-5" aria-hidden="true" />
				You&apos;re in! Watch your inbox for the next drop.
			</p>
		{:else}
			<form
				onsubmit={handleSubmit}
				novalidate
				class="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
			>
				<label for="newsletter-email" class="sr-only">Email address</label>
				<input
					id="newsletter-email"
					type="email"
					bind:this={inputEl}
					bind:value={email}
					required
					placeholder="Enter your email"
					aria-invalid={error ? 'true' : undefined}
					aria-describedby={error ? 'newsletter-error' : undefined}
					class="h-12 flex-1 rounded-full border border-line bg-paper px-5 text-sm outline-none placeholder:text-ink-soft/70 focus:border-ink focus:ring-2 focus:ring-ink"
				/>
				<button
					type="submit"
					class="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-black"
				>
					Subscribe
					<ArrowRight class="size-4" aria-hidden="true" />
				</button>
			</form>
			{#if error}
				<p id="newsletter-error" role="alert" class="mt-3 text-sm font-medium text-red-700">
					{error}
				</p>
			{/if}
		{/if}
	</div>
</section>
