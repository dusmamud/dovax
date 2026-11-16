<script lang="ts">
	import BrandIcon, { type Brand } from '#lib/components/BrandIcon.svelte';

	const socials: { label: string; href: string; brand: Brand }[] = [
		{ label: 'Instagram', href: 'https://www.instagram.com/', brand: 'instagram' },
		{ label: 'Facebook', href: 'https://www.facebook.com/', brand: 'facebook' },
		{ label: 'YouTube', href: 'https://www.youtube.com/', brand: 'youtube' },
		{ label: 'X (Twitter)', href: 'https://x.com/', brand: 'x' },
		{ label: 'Pinterest', href: 'https://www.pinterest.com/', brand: 'pinterest' }
	];

	const columns = [
		{
			title: 'Shop',
			links: [
				{ label: 'Men', href: '/men/' },
				{ label: 'Women', href: '/women/' },
				{ label: 'New Arrivals', href: '/new-arrivals/' },
				{ label: 'Best Sellers', href: '/best-sellers/' },
				{ label: 'Sale', href: '/sale/' }
			]
		},
		{
			title: 'Support',
			links: [
				{ label: 'Contact Us', href: '/contact/' },
				{ label: 'Shipping', href: '/shipping/' },
				{ label: 'Returns', href: '/returns/' },
				{ label: 'Size Guide', href: '/size-guide/' },
				{ label: 'FAQs', href: '/faq/' }
			]
		},
		{
			title: 'Company',
			links: [
				{ label: 'About', href: '/about/' },
				{ label: 'Our Technology', href: '/technology/' },
				{ label: 'Sustainability', href: '/sustainability/' },
				{ label: 'Careers', href: '/careers/' },
				{ label: 'Blog', href: '/blog/' }
			]
		}
	];
</script>

<footer class="border-t border-line bg-paper">
	<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
		<div class="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
			<div>
				<p class="font-display text-2xl font-extrabold tracking-[0.2em]">DOVAX</p>
				<p class="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
					Modern footwear for a bolder tomorrow. Designed for comfort, performance and
					everyday style.
				</p>
				<div class="mt-6 flex gap-2">
					{#each socials as social (social.label)}
						<a
							href={social.href}
							target="_blank"
							rel="noopener"
							aria-label={social.label}
							class="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors hover:bg-cream"
						>
							<BrandIcon brand={social.brand} size={20} />
						</a>
					{/each}
				</div>
			</div>

			<div class="grid grid-cols-2 gap-8 sm:grid-cols-3">
				{#each columns as column (column.title)}
					<nav aria-label={column.title}>
						<h3 class="font-display text-sm font-semibold tracking-wide uppercase">
							{column.title}
						</h3>
						<ul class="mt-4 space-y-1">
							{#each column.links as link (link.label)}
								<li>
									<a
										href={link.href}
										class="inline-flex min-h-11 items-center text-sm text-ink-soft transition-colors hover:text-ink"
									>
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					</nav>
				{/each}
			</div>
		</div>

		<div
			class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-sm text-ink-soft sm:flex-row"
		>
			<p>© 2026 Dovax. All rights reserved.</p>
			<div class="flex gap-6">
				<a
					href="/privacy/"
					class="inline-flex min-h-11 items-center transition-colors hover:text-ink"
				>
					Privacy Policy
				</a>
				<a href="/terms/" class="inline-flex min-h-11 items-center transition-colors hover:text-ink">
					Terms of Service
				</a>
			</div>
		</div>
	</div>
</footer>
