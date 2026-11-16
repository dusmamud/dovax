import type { Action } from 'svelte/action';

/**
 * Reveal-on-scroll action. Adds `is-visible` to the element (which must also
 * carry the `.reveal` class from app.css) the first time it enters the
 * viewport, then unobserves. Reveals immediately when IntersectionObserver
 * is unavailable (SSR / old browsers).
 */
export const reveal: Action<HTMLElement> = (node) => {
	if (typeof IntersectionObserver === 'undefined') {
		node.classList.add('is-visible');
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			}
		},
		{ threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
