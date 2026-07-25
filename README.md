# Mercury Technologies — Next.js

A faithful Next.js port of [mercurytech.co.zw](https://mercurytech.co.zw) — the
original Vue 3 + Vite single-page app rebuilt on **Next.js 16 (App Router) +
Tailwind CSS v4**, keeping the same design, content, and the same **Supabase**
backend so nothing about the data or CMS changes.

## Stack

- **Next.js 16** (App Router, JavaScript)
- **Tailwind CSS v4** with the original design tokens (metallic silver `#C0C0C0`
  on near-black `#18181b` / `#23272f`, Inter font)
- **Supabase** — the same project the live site uses (products table + auth +
  `product-images` storage bucket)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Environment variables live in `.env.local` (see `.env.example`):

```
NEXT_PUBLIC_SUPABASE_URL=https://gmhrlmpzdcrmentpdmbe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
```

The anon key is the **publishable** key — the same one the live site ships to
every browser — so it is safe client-side and gated by row-level security.

## Structure

```
app/
  (site)/            Public pages (Navbar + Footer chrome)
    page.js          Home
    about/  products/  products/[slug]/
    contact/  support/  sustainability/
    news/  legal/
  admin/             Admin CMS (Supabase Auth guarded)
    login/  reset-password/  page.js (list)
    products/new/  products/[slug]/edit/
components/          Navbar, Footer, forms, admin shell, ...
lib/
  siteConfig.js      Company / contact / social config
  content.js         Static copy (home, about, sustainability, FAQ, news, legal)
  supabase.js        Supabase browser client
  products.js        Public product fetching + image URL resolver
  adminProducts.js   Admin CRUD + image upload
  useAuth.js         Auth hook + actions
public/assets/       Original site images (hero, laptops, desktop, tablet, ...)
```

## Notes on fidelity

- **Products / Product detail** load live from the same Supabase `products`
  table. The table is currently empty on the live site, so the grid shows an
  empty state until products are added via the admin CMS.
- **Contact form** and **product quote** use `mailto:` (matching the original).
- **News** content is static, exactly as it is on the live site.
- **Images** are served unoptimized to match the original's raw assets.
