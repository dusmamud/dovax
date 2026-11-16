import { browser } from '$app/env';

export interface OrderItem {
	id: string;
	name: string;
	size: string;
	qty: number;
	price: number;
	image: string;
}

export interface Order {
	id: string;
	/** ISO date string. */
	date: string;
	items: OrderItem[];
	subtotal: number;
	shipping: number;
	total: number;
	name: string;
	email: string;
	paymentMethod: string;
}

const STORAGE_KEY = 'dovax-orders-v1';

class OrderStore {
	orders = $state<Order[]>([]);

	lastOrder = $derived(this.orders[0]);

	/** Load persisted orders from localStorage. Called once from onMount in +layout. */
	load(): void {
		if (!browser) return;
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return;
			const parsed: unknown = JSON.parse(raw);
			if (!Array.isArray(parsed)) return;
			this.orders = parsed.filter(
				(entry): entry is Order =>
					typeof entry === 'object' &&
					entry !== null &&
					typeof (entry as Order).id === 'string' &&
					Array.isArray((entry as Order).items)
			);
		} catch {
			// Corrupted storage — start with no orders.
		}
	}

	#save(): void {
		if (!browser) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.orders));
		} catch {
			// Storage unavailable — the order still exists in memory.
		}
	}

	getOrder(id: string): Order | undefined {
		return this.orders.find((order) => order.id === id);
	}

	/** Creates an order with a generated id (DVX- + 6 digits) and today's date. */
	placeOrder(order: Omit<Order, 'id' | 'date'>): Order {
		const created: Order = {
			...order,
			id: `DVX-${Math.floor(100000 + Math.random() * 900000)}`,
			date: new Date().toISOString()
		};
		this.orders = [created, ...this.orders];
		this.#save();
		return created;
	}
}

export const orders = new OrderStore();
