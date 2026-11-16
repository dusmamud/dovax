export interface Toast {
	id: number;
	message: string;
	type: 'success' | 'info';
}

const AUTO_DISMISS_MS = 3500;

let nextId = 1;

class ToastStore {
	toasts = $state<Toast[]>([]);

	push(message: string, type: Toast['type'] = 'success'): void {
		const id = nextId++;
		this.toasts.push({ id, message, type });
		setTimeout(() => this.dismiss(id), AUTO_DISMISS_MS);
	}

	dismiss(id: number): void {
		this.toasts = this.toasts.filter((toast) => toast.id !== id);
	}
}

export const toasts = new ToastStore();
