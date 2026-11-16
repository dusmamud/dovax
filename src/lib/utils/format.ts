const inrFormatter = new Intl.NumberFormat('en-IN', {
	style: 'currency',
	currency: 'INR',
	maximumFractionDigits: 0
});

/** Format a whole-rupee amount as INR, e.g. 7999 -> "₹7,999". */
export function formatPrice(value: number): string {
	return inrFormatter.format(value);
}
