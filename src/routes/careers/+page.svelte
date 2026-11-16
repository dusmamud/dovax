<script lang="ts">
	import { Briefcase, MapPin } from '@lucide/svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import SectionHeader from '#lib/components/SectionHeader.svelte';
	import { reveal } from '#lib/actions/reveal.js';

	const roles = [
		{
			title: 'Footwear Designer',
			location: 'Bengaluru',
			type: 'Full-time',
			description:
				'Shape the next Dovax collections, from first sketch to final sample. You will work across lifestyle, running and court styles, balancing bold design with the comfort and durability our customers expect.',
			requirements: [
				'3+ years of footwear or product design experience',
				'Strong portfolio of original sneaker or shoe designs',
				'Working knowledge of materials, lasts and construction',
				'Comfort collaborating with suppliers and sample rooms'
			]
		},
		{
			title: 'E-commerce Operations Lead',
			location: 'Bengaluru',
			type: 'Full-time',
			description:
				'Own the day-to-day running of the Dovax store: inventory, fulfilment, shipping partners and order accuracy. You will keep every order moving smoothly from checkout to doorstep.',
			requirements: [
				'3+ years in e-commerce or retail operations',
				'Experience with inventory and fulfilment workflows',
				'Familiarity with shipping and logistics partners in India',
				'Strong attention to detail and problem-solving skills'
			]
		},
		{
			title: 'Customer Experience Associate',
			location: 'Remote',
			type: 'Full-time',
			description:
				'Be the friendly voice of Dovax. You will help customers with sizing, orders, returns and product questions, and turn great service into loyal customers.',
			requirements: [
				'Excellent written and spoken English (Hindi a plus)',
				'Experience in customer support, ideally in e-commerce',
				'Calm, patient and genuinely helpful manner',
				'Comfortable working independently from home'
			]
		}
	];

	function applyHref(title: string): string {
		return `mailto:hello@dovax.in?subject=${encodeURIComponent(`Application: ${title}`)}`;
	}
</script>

<svelte:head>
	<title>Careers — Dovax</title>
	<meta
		name="description"
		content="Join the Dovax team. Open roles in footwear design, e-commerce operations and customer experience — Bengaluru and remote."
	/>
</svelte:head>

<main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Careers' }]} />

	<div class="reveal mt-8" use:reveal>
		<SectionHeader
			eyebrow="Careers"
			title="Help Us Build Better Sneakers"
			description="Dovax is a small, growing team that cares about comfort, honest pricing and great service. If that sounds like your kind of work, we would love to hear from you."
		/>
	</div>

	<p
		class="reveal mt-8 rounded-2xl border border-line bg-cream px-5 py-4 text-sm leading-relaxed text-ink-soft"
		use:reveal
	>
		Please note: Dovax is a demo storefront, and the roles listed here are example openings
		shown to demonstrate the hiring page. Applications sent to the address below will not be
		processed as real job applications.
	</p>

	<section class="mt-10 space-y-4 sm:mt-12">
		{#each roles as role (role.title)}
			<article class="reveal rounded-2xl border border-line bg-card p-6 sm:p-8" use:reveal>
				<div class="flex flex-wrap items-start justify-between gap-4">
					<div>
						<h2 class="font-display text-h3 font-bold">{role.title}</h2>
						<p class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-soft">
							<span class="inline-flex items-center gap-1.5">
								<MapPin class="size-4" aria-hidden="true" />
								{role.location}
							</span>
							<span class="inline-flex items-center gap-1.5">
								<Briefcase class="size-4" aria-hidden="true" />
								{role.type}
							</span>
						</p>
					</div>
					<a
						href={applyHref(role.title)}
						class="inline-flex min-h-11 items-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition-opacity hover:opacity-85"
					>
						Apply
					</a>
				</div>
				<p class="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
					{role.description}
				</p>
				<h3 class="mt-5 text-sm font-semibold">What you will bring</h3>
				<ul class="mt-2 space-y-2">
					{#each role.requirements as requirement (requirement)}
						<li class="flex items-start gap-2.5 text-sm text-ink-soft">
							<span class="mt-2 size-1.5 shrink-0 rounded-full bg-ink" aria-hidden="true"></span>
							{requirement}
						</li>
					{/each}
				</ul>
			</article>
		{/each}
	</section>

	<section class="reveal mt-12 text-center sm:mt-16" use:reveal>
		<h2 class="font-display text-h3 font-bold">Do not see your role?</h2>
		<p class="mx-auto mt-3 max-w-md text-ink-soft">
			We are always happy to hear from people who love sneakers. Send us an email and tell us
			what you would bring to Dovax.
		</p>
		<a
			href="mailto:hello@dovax.in?subject=General%20enquiry"
			class="mt-6 inline-flex min-h-11 items-center rounded-full border border-line bg-card px-6 text-sm font-semibold transition-colors hover:bg-cream"
		>
			hello@dovax.in
		</a>
	</section>
</main>
