import { browser } from '$app/env';
import { getProduct, type Product } from '#lib/data/products.js';

const STORAGE_KEY = 'dovax-wishlist-v1';

class WishlistStore {
	ids = $state<string[]>([]);

	count = $derived(this.ids.length);

	/** Wishlist items resolved to full product details (unknown ids dropped). */
	products = $derived(
		this.ids
			.map((id) => getProduct(id))
			.filter((product): product is Product => product !== undefined)
	);

	/** Load persisted ids from localStorage. Called once from onMount in +layout. */
	load(): void {
		if (!browser) return;
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return;
			const parsed: unknown = JSON.parse(raw);
			if (!Array.isArray(parsed)) return;
			this.ids = parsed.filter(
				(entry): entry is string =>
					typeof entry === 'string' && getProduct(entry) !== undefined
			);
		} catch {
			// Corrupted storage — start with an empty wishlist.
		}
	}

	#save(): void {
		if (!browser) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ids));
		} catch {
			// Storage unavailable — the wishlist still works in memory.
		}
	}

	has(id: string): boolean {
		return this.ids.includes(id);
	}

	add(id: string): void {
		if (this.has(id)) return;
		this.ids.push(id);
		this.#save();
	}

	remove(id: string): void {
		this.ids = this.ids.filter((entry) => entry !== id);
		this.#save();
	}

	/** Toggles membership; returns true when the item is now saved. */
	toggle(id: string): boolean {
		if (this.has(id)) {
			this.remove(id);
			return false;
		}
		this.add(id);
		return true;
	}
}

export const wishlist = new WishlistStore();
