<script lang="ts">
	import { ArrowLeft, Clock } from '@lucide/svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const post = $derived(data.post);
</script>

<svelte:head>
	<title>{post.title} — Dovax Blog</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
	<Breadcrumbs
		items={[
			{ label: 'Home', href: '/' },
			{ label: 'Blog', href: '/blog/' },
			{ label: post.title }
		]}
	/>

	<article class="mt-8">
		<div class="overflow-hidden rounded-3xl">
			<img
				src={post.image}
				alt={post.title}
				width="1200"
				height="750"
				decoding="async"
				class="aspect-[8/5] w-full object-cover"
			/>
		</div>

		<h1 class="mt-8 font-display text-h2 font-bold text-balance">{post.title}</h1>
		<p class="mt-3 flex items-center gap-2 text-sm text-ink-soft">
			<span>{post.date}</span>
			<span aria-hidden="true">·</span>
			<Clock class="size-4" aria-hidden="true" />
			<span>{post.readTime}</span>
		</p>

		<div class="mt-8 space-y-10">
			{#each post.content as block (block.heading)}
				<section>
					<h2 class="font-display text-h3 font-bold">{block.heading}</h2>
					{#each block.paragraphs as paragraph (paragraph.slice(0, 48))}
						<p class="mt-4 text-base leading-relaxed text-ink-soft">{paragraph}</p>
					{/each}
				</section>
			{/each}
		</div>

		<a
			href="/blog/"
			class="mt-12 inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-6 text-sm font-semibold transition-colors hover:bg-cream"
		>
			<ArrowLeft class="size-4" aria-hidden="true" />
			All articles
		</a>
	</article>
</main>
