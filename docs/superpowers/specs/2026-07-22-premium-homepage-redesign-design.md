# Premium Homepage Redesign — Design Spec

Date: 2026-07-22
Scope: Design foundation (tokens, typography, primitives, Navbar, Footer) + Homepage (`app/(site)/page.js`) only. Inner pages (products, about, support, contact, news, legal, sustainability) are out of scope for this spec and will get their own spec later.

## Goal

Elevate Mercury Technologies' homepage into a flagship-quality premium tech-brand experience (in the spirit of Apple, Surface, Sony, Dell XPS, ASUS Zenbook — without copying any of them), while preserving the existing dark-first visual identity, all current functionality, content, and the `ProductStack` scroll animation exactly as-is.

## Constraints (explicit user decisions)

- **Language**: stays plain JavaScript (`.js`/`.jsx`). No TypeScript migration.
- **Stack**: Next.js 16.2.10 App Router, React 19, Tailwind v4 — unchanged. New npm dependencies are allowed: `framer-motion`, `lucide-react`.
- **Theme direction**: stays **dark-first** (not a light-first Apple-style flip). The current all-dark `mercuryBlack` base is refined into a more considered graphite palette with restrained silver/blue accents — not replaced with white backgrounds.
- **Our Products section**: `components/home/ProductStack.js` internals (the scroll-driven card-stack animation) are **not touched**. Only the section's heading/eyebrow and outer spacing wrapper are restyled for visual consistency with the rest of the redesigned page.
- **Logo**: `public/assets/logo/mercurylogotext.png` is final brand asset — not redesigned, not recolored, used as-is.
- **Admin routes** (`app/admin/**`) are entirely out of scope.

## Phase 1 — Design Foundation

### Typography

- Replace `Inter` with **Manrope** (weights 300–800) as the body/UI font, loaded via `next/font/google` with `display: "swap"`, exposed as CSS variable `--font-manrope`.
- Add **Space Grotesk** via `next/font/google` as the display/heading font, exposed as `--font-grotesk`. Used only for `h1`/`h2`/large numeric or eyebrow-adjacent display moments — not body copy.
- Both are variable, well-hinted Google fonts already optimized by `next/font`; no additional fallback stack needed beyond the standard system-font fallback `next/font` provides automatically.
- Update `app/layout.js` to load both fonts and apply their variables at the `html` level; update `tailwind`/`globals.css` `@theme` to map `--font-sans` → Manrope and add `--font-display` → Space Grotesk.

### Color tokens (`app/globals.css` `@theme` block)

Refine the existing tokens (keep the same variable names where they're already used across the codebase, to avoid a sweeping rename):

| Token | Old | New | Purpose |
|---|---|---|---|
| `--color-mercuryBlack` | `#18181b` | `#17181A` | Base page background |
| `--color-mercuryDark` | `#23272f` | `#1F2125` | Section-level surface |
| `--color-mercurySurface` | *(new)* | `#26282D` | Elevated card surface (replaces ad-hoc `bg-white/5`) |
| `--color-mercuryGray` | `#5a5a5a` | `#6B6D73` | Secondary text, muted borders |
| `--color-mercurySilver` | `#c0c0c0` | `#C7C9CE` | Accent only — dividers, hover states, metallic headline gradient |
| `--color-mercuryWhite` | `#ffffff` | `#F5F5F7` | Primary text on dark surfaces |
| `--color-mercuryAccent` | *(new)* | `#4C8DFF` | Minimal blue accent — focus rings and rare interactive highlight only, never decorative |

`text-metallic` gradient utility (already in `globals.css`) is kept but its stops are updated to use the refined silver/white tokens above.

### Spacing & layout system

- Standardize section vertical rhythm on an 8px scale: sections use `py-24 sm:py-32` (up from the current inconsistent `py-16`/`py-20`/`py-10` mix) for the generous premium whitespace the brief asks for.
- All homepage sections keep `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` (already the site convention — kept as-is).

### Reusable primitives (new `components/ui/` directory)

1. **`Button.js`** — `variant: "primary" | "secondary" | "ghost"`, `size: "md" | "lg"`. Replaces the repeated inline gradient-span CTA markup (currently duplicated in the hero and elsewhere). Renders as `<Link>` when `href` is passed, `<button>` otherwise. Tactile hover/active states via `transition-transform` + subtle shadow, no scale-jump beyond `hover:scale-[1.02]`.
2. **`Card.js`** — elevated `mercurySurface` background, `rounded-2xl`, `border border-white/[0.06]`, soft shadow, `hover:-translate-y-1 hover:shadow-lg` transition. Replaces the inconsistent `bg-white/5 border border-white/10` pattern used ad-hoc across the homepage.
3. **`SectionHeading.js`** — `eyebrow`, `title`, `subtitle` props, renders eyebrow in uppercase tracked Manrope, title in Space Grotesk. Replaces the hand-rolled heading markup duplicated in every homepage section.

All three are plain function components (no new architectural layer), colocated in `components/ui/`, imported directly — consistent with the existing flat `components/` structure.

### Icons

- Install `lucide-react`. Replace:
  - Emoji icons in homepage contact cards (📍📞✉️) → `MapPin`, `Phone`, `Mail`.
  - Inline hand-drawn feature SVGs on "Why Choose Mercury" → closest matching Lucide icons (`MonitorCheck`, `Zap`, `ShieldCheck`, `MapPinned`).
  - Navbar hamburger/close SVGs → `Menu`, `X`.
  - Footer social icons **stay as hand-drawn brand SVGs** (TikTok/Instagram glyphs aren't in Lucide's generic icon set — swapping them for generic placeholders would be a regression, not an improvement).

### Motion (Framer Motion)

- Install `framer-motion`.
- Add `components/ui/Motion.js` exporting two small wrappers:
  - `FadeIn` — opacity + 12px rise, `viewport={{ once: true, margin: "-80px" }}`, duration 0.5s, honors `useReducedMotion()` (renders instantly, no transform, when reduced motion is requested).
  - `Stagger` — wraps a list of children with a `staggerChildren: 0.08` container variant, used for the "Why Choose Mercury" feature list and the 3 contact cards.
- Existing CSS-only `animate-slide-up`/`stagger-*` utility classes in `globals.css` are removed once their call sites are migrated to `FadeIn`/`Stagger`, to avoid two parallel animation systems.

### Navbar (`components/Navbar.js`)

- Becomes `fixed` (not `relative`) and sticky across the viewport.
- **Transparent over the hero**: no background/border while `scrollY < threshold` (threshold = hero height minus nav height, measured via a scroll listener with a passive listener + rAF throttle — no new dependency needed for this).
- **Solid on scroll**: past the threshold, background transitions to `mercuryBlack/95` with `backdrop-blur` and a bottom hairline border (`border-white/[0.06]`), animated via a CSS transition (not Framer Motion — this is a simple binary state, CSS is cheaper).
- Logo, nav links, and mobile toggle keep their current structure/content; only visual treatment, positioning (fixed vs relative), and the mobile menu change.
- Mobile menu becomes a full-screen overlay (`fixed inset-0`) with a fade+slide transition (via `FadeIn`-style motion), trapping focus while open and restoring focus to the toggle button on close, closing on `Escape`.
- Homepage content padding-top adjusts to account for the now-fixed nav (previously the nav pushed content down in normal flow).

### Footer (`components/Footer.js`)

- Same content, links, and structure. Token/spacing refresh only: `mercurySurface`-based hairline border, Manrope/Space Grotesk typography, Lucide-free (keeps hand-drawn social icons per above).

## Phase 2 — Homepage sections (`app/(site)/page.js`)

### Hero

- Same background image (`/assets/hero-image.webp`) and copy ("BUILT FOR WHAT'S NEXT" / "Experience power, portability & innovation").
- Headline moves to Space Grotesk, tightened tracking, refined two-line composition.
- Overlay scrim changes from a flat `bg-black/20` to a layered gradient (`bg-gradient-to-t from-mercuryBlack via-black/30 to-black/10`) for better text legibility without darkening the whole image uniformly.
- CTA ("Pre-Order") becomes a `Button variant="primary" size="lg"`.
- Entrance motion: a single `FadeIn` on the headline/subhead/CTA block (staggered via `Stagger`), fires once on load, respects reduced motion.

### Our Products

- `ProductStack.js` is imported and rendered exactly as today — **zero changes** to that file.
- The surrounding section (`<h2>Our Products.</h2>` + spacing) is rebuilt using `SectionHeading`, matching the new py-24/32 rhythm, so it doesn't look visually orphaned next to the redesigned hero and next section.

### Why Choose Mercury

- Replaces the current plain white card (visually inconsistent with the rest of the all-dark page) with a `Card`-based layout on the `mercurySurface` token — fixes an existing inconsistency rather than introducing a new one.
- Feature list icons move from inline SVG to Lucide; list items reveal via `Stagger`.
- Image (`/assets/banner.png`) is wrapped in `next/image` with explicit `sizes` for responsive loading (currently a raw `<img>` tag with a lint-disable comment — this also resolves that existing lint suppression).

### Let's Talk Technology (contact cards)

- The 3 cards (`Address`, `Phone`, `Email`) move to the `Card` primitive, Lucide icons (`MapPin`, `Phone`, `Mail`) replace emoji, consistent hover elevation, staggered reveal via `Stagger`.

## Accessibility & performance notes

- All interactive elements (nav links, mobile toggle, CTA buttons) keep/gain visible `focus-visible` rings using the new `mercuryAccent` token.
- Mobile nav overlay gets `role="dialog"` + `aria-modal="true"` + focus trap + `Escape`-to-close.
- `next/image` used for the "Why Choose Mercury" banner image (previously a raw `<img>`); the hero keeps its existing plain CSS background-image declaration since it's a full-bleed decorative background, not content-critical — this avoids an LCP regression risk from swapping a simple, already-cached background image for a JS-managed one.
- All new motion is `viewport={{ once: true }}` (no repeat-on-scroll thrash) and gated by `useReducedMotion()`.
- No new heading-hierarchy issues introduced — existing `h1`/`h2`/`h3` structure is preserved, only re-styled.

## Out of scope (explicitly, for this spec)

- TypeScript migration.
- Light-first theme flip.
- Any page other than the homepage and global chrome (Navbar/Footer).
- `ProductStack.js` internals.
- Admin routes.
- SEO/metadata changes beyond what already exists in `app/layout.js`.
