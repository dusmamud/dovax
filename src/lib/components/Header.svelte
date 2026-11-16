<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import { Menu, Search, ShoppingBag, User, X } from '@lucide/svelte';
	import { cart } from '#lib/stores/cart.svelte.js';

	const navLinks = [
		{ label: 'Men', href: '/#categories' },
		{ label: 'Women', href: '/#categories' },
		{ label: 'New Arrivals', href: '/#best-sellers' },
		{ label: 'Best Sellers', href: '/#best-sellers' },
		{ label: 'About', href: '/#technology' }
	];

	let menuOpen = $state(false);
	let hamburgerButton: HTMLButtonElement | undefined = $state();
	let drawerEl: HTMLDivElement | undefined = $state();

	function openMenu() {
		menuOpen = true;
	}

	function closeMenu() {
		menuOpen = false;
		hamburgerButton?.focus();
	}

	function handleDrawerKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeMenu();
			return;
		}
		if (event.key !== 'Tab' || !drawerEl) return;
		const focusable = drawerEl.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
		if (focusable.length === 0) return;
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	}

	// DOM work only: lock body scroll + move focus into the drawer while open.
	$effect(() => {
		if (!menuOpen) return;
		document.body.style.overflow = 'hidden';
		drawerEl?.querySelector<HTMLElement>('button, a[href]')?.focus();
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<header class="sticky top-0 z-40 border-b border-line bg-paper/90 pt-safe backdrop-blur">
	<div class="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:px-6 lg:px-8">
		<button
			type="button"
			bind:this={hamburgerButton}
			onclick={openMenu}
			aria-expanded={menuOpen}
			aria-label="Open menu"
			class="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream lg:hidden"
		>
			<Menu class="size-6" aria-hidden="true" />
		</button>

		<a href="/" class="font-display text-xl font-extrabold tracking-[0.2em] sm:text-2xl">
			DOVAX
		</a>

		<nav aria-label="Primary" class="ml-10 hidden items-center gap-8 lg:flex">
			{#each navLinks as link (link.label)}
				<a
					href={link.href}
					class="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="ml-auto flex items-center gap-1">
			<button
				type="button"
				aria-label="Search"
				class="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream"
			>
				<Search class="size-5" aria-hidden="true" />
			</button>
			<button
				type="button"
				aria-label="Account"
				class="hidden h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream sm:flex"
			>
				<User class="size-5" aria-hidden="true" />
			</button>
			<button
				type="button"
				data-cart-button
				onclick={(event) => cart.open(event.currentTarget)}
				aria-label="Open cart"
				class="relative flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream"
			>
				<ShoppingBag class="size-5" aria-hidden="true" />
				{#if cart.count > 0}
					<span
						class="absolute top-0.5 right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[11px] font-bold text-white"
					>
						{cart.count}
					</span>
				{/if}
			</button>
		</div>
	</div>
</header>

{#if menuOpen}
	<div class="fixed inset-0 z-50 lg:hidden">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="absolute inset-0 bg-black/50"
			role="presentation"
			onclick={closeMenu}
			transition:fade={{ duration: prefersReducedMotion.current ? 0 : 200 }}
		></div>
		<div
			bind:this={drawerEl}
			role="dialog"
			aria-modal="true"
			aria-label="Menu"
			tabindex="-1"
			onkeydown={handleDrawerKeydown}
			transition:fly={{
				x: prefersReducedMotion.current ? 0 : -320,
				duration: prefersReducedMotion.current ? 0 : 300
			}}
			class="absolute inset-y-0 left-0 flex w-80 max-w-[85vw] flex-col bg-paper shadow-2xl"
		>
			<div class="flex items-center justify-between border-b border-line px-4 py-3">
				<span class="font-display text-lg font-extrabold tracking-[0.2em]">DOVAX</span>
				<button
					type="button"
					onclick={closeMenu}
					aria-label="Close menu"
					class="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream"
				>
					<X class="size-5" aria-hidden="true" />
				</button>
			</div>
			<nav aria-label="Mobile" class="flex flex-col p-4">
				{#each navLinks as link (link.label)}
					<a
						href={link.href}
						onclick={closeMenu}
						class="flex h-12 items-center rounded-xl px-3 font-display text-lg font-semibold transition-colors hover:bg-cream"
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</div>
	</div>
{/if}
