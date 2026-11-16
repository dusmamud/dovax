# Dovax — Footwear for a Bolder Tomorrow

Dovax is a modern sneakers e-commerce website. Clean storefront, real product
catalogue, working cart — no backend, fully static.

Live site: https://dovax.pages.dev/

## Stack

| Piece | Version |
| --- | --- |
| Svelte | 5.57.3 |
| SvelteKit | 3.2.0 |
| Vite | 8.3.8 |
| TypeScript | 6.0.3 |
| Tailwind CSS | 4.3.5 |
| Adapter | `@sveltejs/adapter-static` 4.0.1 (full prerender) |
| Icons | `@lucide/svelte` |

## Features

- Homepage: announcement bar, hero, category cards, Best Sellers, promo
  banners, trust bar, Technology section, testimonials, Instagram strip,
  newsletter, footer
- Working cart: add / remove / quantity, subtotal, free-shipping progress
  (free above ₹999), persisted to `localStorage`, slide-over drawer
- Mobile-first responsive, verified at 375 / 768 / 1024 / 1280 px
- Motion: Svelte built-in transitions, View Transitions API, reveal-on-scroll
  with `prefers-reduced-motion` support and a no-JS fallback
- Self-hosted fonts (Sora + Inter), AVIF-first imagery

## Developing

```sh
pnpm install
pnpm run dev
```

## Building

```sh
pnpm run build
pnpm preview
```

Type-check with `pnpm check`.

## Deploy

Every push to `main` deploys to Cloudflare Pages via
`.github/workflows/deploy.yml` (other branches get preview deployments).
The workflow needs two repository secrets:

- `CLOUDFLARE_API_TOKEN` — API token with Account -> Cloudflare Pages ->
  Edit permission (the "Edit Cloudflare Workers" template also works)
- `CLOUDFLARE_ACCOUNT_ID` — Account ID from the Cloudflare dashboard

The Pages project (`dovax`) is created automatically by the first run.

## Photos

Product and lifestyle photos are Unsplash images of real branded shoes
(Nike, Puma, Vans logos visible). They are placeholders for the demo
storefront — replace with unbranded Dovax product photography before a
real launch.
