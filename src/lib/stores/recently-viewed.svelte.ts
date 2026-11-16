import { browser } from '$app/env';
import { getProductBySlug, type Product } from '#lib/data/products.js';

const STORAGE_KEY = 'dovax-recent-v1';
const MAX_ITEMS = 8;

class RecentlyViewedStore {
	slugs = $state<string[]>([]);

	/** Recently viewed products, most recent first (unknown slugs dropped). */
	products = $derived(
		this.slugs
			.map((slug) => getProductBySlug(slug))
			.filter((product): product is Product => product !== undefined)
	);

	/** Load persisted slugs from localStorage. Called once from onMount in +layout. */
	load(): void {
		if (!browser) return;
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return;
			const parsed: unknown = JSON.parse(raw);
			if (!Array.isArray(parsed)) return;
			this.slugs = parsed
				.filter(
					(entry): entry is string =>
						typeof entry === 'string' && getProductBySlug(entry) !== undefined
				)
				.slice(0, MAX_ITEMS);
		} catch {
			// Corrupted storage — start with no history.
		}
	}

	#save(): void {
		if (!browser) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.slugs));
		} catch {
			// Storage unavailable — history still works in memory.
		}
	}

	add(slug: string): void {
		// No-op when already most recent — avoids redundant writes (and
		// re-triggering any $effect that calls add() while reading the store).
		if (this.slugs[0] === slug) return;
		this.slugs = [slug, ...this.slugs.filter((entry) => entry !== slug)].slice(0, MAX_ITEMS);
		this.#save();
	}
}

export const recentlyViewed = new RecentlyViewedStore();
