import { browser } from '$app/env';
import { getProduct, type Product } from '#lib/data/products.js';

export interface CartItem {
	id: string;
	size: string;
	qty: number;
}

export interface CartLine {
	product: Product;
	size: string;
	qty: number;
}

const STORAGE_KEY = 'dovax-cart-v1';

/** Default size for legacy stored entries that predate size-keyed lines. */
const DEFAULT_SIZE = 'UK 9';

/** Free shipping unlocks at this subtotal (INR). */
export const FREE_SHIPPING_THRESHOLD = 999;

class CartStore {
	items = $state<CartItem[]>([]);
	isOpen = $state(false);

	/** Element that opened the drawer — focus returns here on close. */
	#trigger: HTMLElement | null = null;

	/** Items resolved to full product details (unknown ids dropped). */
	lines = $derived(
		this.items
			.map((item) => {
				const product = getProduct(item.id);
				return product ? { product, size: item.size, qty: item.qty } : null;
			})
			.filter((line): line is CartLine => line !== null)
	);

	count = $derived(this.items.reduce((total, item) => total + item.qty, 0));

	subtotal = $derived(
		this.lines.reduce((total, line) => total + line.product.price * line.qty, 0)
	);

	/** Load persisted items from localStorage. Called once from onMount in +layout. */
	load(): void {
		if (!browser) return;
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return;
			const parsed: unknown = JSON.parse(raw);
			if (!Array.isArray(parsed)) return;
			this.items = parsed
				.filter(
					(entry): entry is CartItem =>
						typeof entry === 'object' &&
						entry !== null &&
						typeof (entry as CartItem).id === 'string' &&
						typeof (entry as CartItem).qty === 'number' &&
						(entry as CartItem).qty > 0 &&
						getProduct((entry as CartItem).id) !== undefined
				)
				.map((entry) => ({
					id: entry.id,
					// Migrate pre-size entries (stored as { id, qty }) to the default size.
					size: typeof entry.size === 'string' && entry.size ? entry.size : DEFAULT_SIZE,
					qty: entry.qty
				}));
		} catch {
			// Corrupted storage — start with an empty cart.
		}
	}

	#save(): void {
		if (!browser) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
		} catch {
			// Storage unavailable — the cart still works in memory.
		}
	}

	add(id: string, size: string = DEFAULT_SIZE): void {
		const existing = this.items.find((item) => item.id === id && item.size === size);
		if (existing) {
			existing.qty += 1;
		} else {
			this.items.push({ id, size, qty: 1 });
		}
		this.#save();
	}

	remove(id: string, size: string): void {
		this.items = this.items.filter((item) => !(item.id === id && item.size === size));
		this.#save();
	}

	setQty(id: string, size: string, qty: number): void {
		if (qty <= 0) {
			this.remove(id, size);
			return;
		}
		const existing = this.items.find((item) => item.id === id && item.size === size);
		if (existing) {
			existing.qty = qty;
			this.#save();
		}
	}

	clear(): void {
		this.items = [];
		this.#save();
	}

	open(trigger?: HTMLElement | null): void {
		this.#trigger = trigger ?? null;
		this.isOpen = true;
	}

	close(): void {
		this.isOpen = false;
		const trigger = this.#trigger;
		this.#trigger = null;
		if (trigger) {
			queueMicrotask(() => trigger.focus());
		}
	}

	toggle(trigger?: HTMLElement | null): void {
		if (this.isOpen) {
			this.close();
		} else {
			this.open(trigger);
		}
	}
}

export const cart = new CartStore();
