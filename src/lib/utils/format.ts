const inrFormatter = new Intl.NumberFormat('en-IN', {
	style: 'currency',
	currency: 'INR',
	maximumFractionDigits: 0
});

/** Format a whole-rupee amount as INR, e.g. 7999 -> "₹7,999". */
export function formatPrice(value: number): string {
	return inrFormatter.format(value);
}

/**
 * Format a count compactly, e.g. 1240 -> "1.2K", 1000 -> "1K", 980 -> "980".
 */
export function formatCount(value: number): string {
	if (value < 1000) return String(value);
	const trimmed = (value / 1000).toFixed(1).replace(/\.0$/, '');
	return `${trimmed}K`;
}
