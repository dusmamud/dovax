<script lang="ts">
	import { ArrowRight, Clock } from '@lucide/svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import SectionHeader from '#lib/components/SectionHeader.svelte';
	import { posts } from '#lib/data/blog.js';
	import { reveal } from '#lib/actions/reveal.js';
</script>

<svelte:head>
	<title>Blog — Dovax</title>
	<meta
		name="description"
		content="Sneaker care guides, running shoe advice and styling ideas from Dovax. Practical tips for getting more from your sneakers."
	/>
</svelte:head>

<main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />

	<div class="reveal mt-8" use:reveal>
		<SectionHeader
			eyebrow="The Dovax Blog"
			title="Guides, Tips and Ideas"
			description="Practical advice on caring for your sneakers, choosing the right pair, and styling them for everyday life."
		/>
	</div>

	<section class="mt-12 grid gap-6 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
		{#each posts as post (post.slug)}
			<article
				class="reveal group flex flex-col overflow-hidden rounded-2xl border border-line bg-card"
				use:reveal
			>
				<a href="/blog/{post.slug}/" class="block overflow-hidden" aria-label={post.title}>
					<img
						src={post.image}
						alt={post.title}
						width="800"
						height="500"
						loading="lazy"
						decoding="async"
						class="aspect-[8/5] w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				</a>
				<div class="flex flex-1 flex-col p-5 sm:p-6">
					<p class="flex items-center gap-2 text-xs font-medium text-ink-soft">
						<span>{post.date}</span>
						<span aria-hidden="true">·</span>
						<Clock class="size-3.5" aria-hidden="true" />
						<span>{post.readTime}</span>
					</p>
					<h2 class="mt-3 font-display text-lg font-bold">
						<a href="/blog/{post.slug}/" class="transition-colors hover:text-ink-soft">
							{post.title}
						</a>
					</h2>
					<p class="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
					<a
						href="/blog/{post.slug}/"
						class="mt-5 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold"
					>
						Read more
						<ArrowRight class="size-4" aria-hidden="true" />
					</a>
				</div>
			</article>
		{/each}
	</section>
</main>
