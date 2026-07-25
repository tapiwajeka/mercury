# Premium Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate Mercury Technologies' homepage (`app/(site)/page.js`) and global chrome (`Navbar`, `Footer`) into a premium, dark-first, flagship-tech-brand experience, while leaving `ProductStack.js`'s scroll animation, all other pages, and the admin app untouched.

**Architecture:** No architectural change. Add a small `components/ui/` primitives layer (`Button`, `Card`, `SectionHeading`, `Motion`) consumed by the redesigned `Navbar`, `Footer`, and homepage sections. Extend the existing Tailwind v4 `@theme` token block in `app/globals.css` rather than replacing it.

**Tech Stack:** Next.js 16.2.10 (App Router), React 19, plain JavaScript (no TypeScript), Tailwind CSS v4, new deps: `framer-motion`, `lucide-react`. Fonts via `next/font/google` (Manrope, Space Grotesk).

## Global Constraints

- Stay in plain JavaScript (`.js`/`.jsx`) — no TypeScript migration.
- Do not modify `components/home/ProductStack.js`.
- Do not modify any file under `app/admin/**`.
- Do not modify any page other than `app/(site)/page.js`, and do not modify `Navbar.js`/`Footer.js` beyond what's specified here (they're shared by every page, so changes must not visually break unstyled pages — see Task 8's layout note).
- Keep the dark-first theme (`mercuryBlack` base) — no light-theme flip.
- Existing CSS utility classes (`.animate-slide-up`, `.stagger-*`, `.btn-premium`, `.btn-primary`, `.btn-outline`, `.glass-card`, `.input-premium`) are used by other, out-of-scope pages (`about`, `support`, `contact`, `news`, `legal`, `sustainability`). **Do not delete or rename them**, even where the homepage stops using them in favor of the new primitives.
- This project has no test framework (`grep` for jest/vitest/playwright in `package.json` returns nothing) and no existing test files. "Tests" in this plan are: `npm run build` (production build must succeed), `npm run lint` (must pass), and small ad-hoc Playwright verification scripts run via `node` for interactive behavior (scroll state, mobile menu, reduced motion) — mirroring the verification approach already used in this session for the Support/Contact page work. Playwright is already installed globally (confirmed earlier: `playwright --version` → `1.61.0`).
- Reference spec: `docs/superpowers/specs/2026-07-22-premium-homepage-redesign-design.md`.

---

### Task 1: Install Framer Motion and Lucide React

**Files:**
- Modify: `package.json`, `package-lock.json` (or equivalent lock file) — via `npm install`, not hand-edited.

**Interfaces:**
- Produces: `framer-motion` and `lucide-react` importable from any client component in later tasks.

- [ ] **Step 1: Install the packages**

Run: `npm install framer-motion lucide-react`
Expected: command exits 0; `package.json` now lists both under `dependencies`.

- [ ] **Step 2: Verify they resolve**

Run: `node -e "require.resolve('framer-motion'); require.resolve('lucide-react'); console.log('OK')"`
Expected output: `OK`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add framer-motion and lucide-react"
```

---

### Task 2: Add Manrope and Space Grotesk fonts

**Files:**
- Modify: `app/layout.js`
- Modify: `app/globals.css:9-10` (the `--font-sans` line inside `@theme`)

**Interfaces:**
- Produces: CSS variables `--font-manrope` and `--font-grotesk` on `<html>`, plus Tailwind theme tokens `--font-sans` (→ Manrope) and `--font-display` (→ Space Grotesk), so any component can use `font-sans` (default body) or `font-display` (headings) utility classes.

- [ ] **Step 1: Update `app/layout.js` to load both fonts**

Replace the current Inter-only setup:

```js
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
```

with:

```js
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});
```

Then update the `<html>` tag further down in the same file from:

```js
<html lang="en" className={`${inter.variable} h-full`}>
```

to:

```js
<html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable} h-full`}>
```

- [ ] **Step 2: Point Tailwind's font tokens at the new variables**

In `app/globals.css`, inside the `@theme { ... }` block, replace:

```css
  --font-sans: var(--font-inter), system-ui, -apple-system, "Segoe UI", Roboto,
    sans-serif;
```

with:

```css
  --font-sans: var(--font-manrope), system-ui, -apple-system, "Segoe UI", Roboto,
    sans-serif;
  --font-display: var(--font-grotesk), var(--font-manrope), system-ui, sans-serif;
```

- [ ] **Step 3: Verify the build picks up the fonts**

Run: `npm run build`
Expected: build succeeds with no font-related errors; output includes the `/` route.

- [ ] **Step 4: Visually confirm the font variables are applied**

Run:
```bash
npm run dev &
sleep 3
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  const fontFamily = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
  console.log('body font-family:', fontFamily);
  await browser.close();
})();
"
```
Expected: output contains `Manrope` (the resolved font name `next/font` generates, e.g. `__Manrope_xxxxxx`).
Stop the dev server afterward: `kill %1` (or note the background task ID and stop it).

- [ ] **Step 5: Commit**

```bash
git add app/layout.js app/globals.css
git commit -m "feat: load Manrope and Space Grotesk via next/font"
```

---

### Task 3: Refine color tokens

**Files:**
- Modify: `app/globals.css:3-11` (the `@theme` block), `app/globals.css:67-75` (`.text-metallic` / `.text-gradient-animated`)

**Interfaces:**
- Produces: Tailwind color utilities `bg-mercurySurface`, `text-mercurySurface`, `border-mercurySurface`, `bg-mercuryAccent`, `text-mercuryAccent`, `ring-mercuryAccent`, alongside the existing `mercuryBlack`/`mercuryDark`/`mercuryGray`/`mercurySilver`/`mercuryWhite` tokens (kept, values refined).

- [ ] **Step 1: Update the `@theme` block**

Replace:

```css
@theme {
  --color-mercuryBlack: #18181b;
  --color-mercuryDark: #23272f;
  --color-mercuryGray: #5a5a5a;
  --color-mercurySilver: #c0c0c0;
  --color-mercuryWhite: #ffffff;
  --font-sans: var(--font-manrope), system-ui, -apple-system, "Segoe UI", Roboto,
    sans-serif;
  --font-display: var(--font-grotesk), var(--font-manrope), system-ui, sans-serif;
}
```

with:

```css
@theme {
  --color-mercuryBlack: #17181a;
  --color-mercuryDark: #1f2125;
  --color-mercurySurface: #26282d;
  --color-mercuryGray: #6b6d73;
  --color-mercurySilver: #c7c9ce;
  --color-mercuryWhite: #f5f5f7;
  --color-mercuryAccent: #4c8dff;
  --font-sans: var(--font-manrope), system-ui, -apple-system, "Segoe UI", Roboto,
    sans-serif;
  --font-display: var(--font-grotesk), var(--font-manrope), system-ui, sans-serif;
}
```

Also update the `:root` fallback block right below it (used by `body` before Tailwind utilities apply):

```css
:root {
  --background: #17181a;
  --foreground: #f5f5f7;
}
```

- [ ] **Step 2: Refresh the metallic gradient to use the new silver/white values**

Replace:

```css
.text-metallic {
  background: linear-gradient(135deg, gray, #fff, silver, #fff, gray);
  ...
}
.text-gradient-animated {
  background: linear-gradient(90deg, silver, #fff, gray, silver);
  ...
}
```

with (only the `background` lines change; keep every other line in both rules identical):

```css
.text-metallic {
  background: linear-gradient(135deg, #6b6d73, #f5f5f7, #c7c9ce, #f5f5f7, #6b6d73);
  ...
}
.text-gradient-animated {
  background: linear-gradient(90deg, #c7c9ce, #f5f5f7, #6b6d73, #c7c9ce);
  ...
}
```

- [ ] **Step 3: Verify no build-breaking typo**

Run: `npm run build`
Expected: succeeds; no "unknown utility class" warnings for `mercurySurface`/`mercuryAccent` anywhere yet (nothing consumes them until later tasks — this just confirms the CSS itself is valid).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat: refine mercury color palette and add surface/accent tokens"
```

---

### Task 4: Build the `Button` primitive

**Files:**
- Create: `components/ui/Button.js`

**Interfaces:**
- Produces: `export default function Button({ href, variant = "primary", size = "md", className = "", children, ...props })` — renders a `next/link` `<Link>` when `href` is given, otherwise a `<button type="button">`. Consumed by Task 10 (Hero CTA) and available for future use.

- [ ] **Step 1: Create the component**

```js
import Link from "next/link";

const VARIANT_CLASSES = {
  primary:
    "bg-gradient-to-r from-mercurySilver via-mercuryWhite to-mercurySilver bg-[length:200%_100%] text-mercuryBlack hover:bg-[position:100%_0] shadow-[0_8px_24px_-8px_rgba(199,201,206,0.5)]",
  secondary:
    "bg-mercurySurface text-mercuryWhite border border-white/10 hover:border-white/20 hover:bg-white/[0.08]",
  ghost:
    "bg-transparent text-mercuryWhite border border-white/15 hover:bg-white/5",
};

const SIZE_CLASSES = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-wide",
    "transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercuryAccent focus-visible:ring-offset-2 focus-visible:ring-offset-mercuryBlack",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Verify it lints clean**

Run: `npm run lint -- components/ui/Button.js`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/Button.js
git commit -m "feat: add Button primitive"
```

---

### Task 5: Build the `Card` primitive

**Files:**
- Create: `components/ui/Card.js`

**Interfaces:**
- Produces: `export default function Card({ as: Tag = "div", className = "", children, ...props })`. Pass `as="a"` with `href` for a clickable card. Consumed by Task 12 and Task 13.

- [ ] **Step 1: Create the component**

```js
export default function Card({
  as: Tag = "div",
  className = "",
  children,
  ...props
}) {
  const classes = [
    "group bg-mercurySurface border border-white/[0.06] rounded-2xl p-8",
    "transition-all duration-300",
    "hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercuryAccent focus-visible:ring-offset-2 focus-visible:ring-offset-mercuryDark",
    className,
  ].join(" ");

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Verify it lints clean**

Run: `npm run lint -- components/ui/Card.js`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/Card.js
git commit -m "feat: add Card primitive"
```

---

### Task 6: Build the `SectionHeading` primitive

**Files:**
- Create: `components/ui/SectionHeading.js`

**Interfaces:**
- Produces: `export default function SectionHeading({ eyebrow, title, subtitle, align = "center", className = "" })`. Consumed by Tasks 11, 12, 13.

- [ ] **Step 1: Create the component**

```js
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}) {
  const alignClasses =
    align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <div className={`flex flex-col ${alignClasses} mb-16 ${className}`}>
      {eyebrow && (
        <p className="text-xs font-semibold tracking-[0.2em] text-mercurySilver uppercase mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-mercuryWhite tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-mercuryGray text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify it lints clean**

Run: `npm run lint -- components/ui/SectionHeading.js`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/SectionHeading.js
git commit -m "feat: add SectionHeading primitive"
```

---

### Task 7: Build the Motion primitives

**Files:**
- Create: `components/ui/Motion.js`

**Interfaces:**
- Produces: `export function FadeIn({ children, delay = 0, className = "", as = "div" })`, `export function Stagger({ children, className = "" })`, `export function StaggerItem({ children, className = "" })`. All are `"use client"` components. Consumed by Tasks 10, 12, 13.

- [ ] **Step 1: Create the component**

```js
"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export function FadeIn({ children, delay = 0, className = "", as = "div" }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function Stagger({ children, className = "" }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify it lints clean**

Run: `npm run lint -- components/ui/Motion.js`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/Motion.js
git commit -m "feat: add FadeIn/Stagger motion primitives with reduced-motion support"
```

---

### Task 8: Redesign the Navbar (sticky, transparent-over-hero, solid-on-scroll)

**Files:**
- Modify: `components/Navbar.js` (full rewrite of the JSX structure; same `navLinks`/`usePathname` data source)
- Modify: `app/(site)/layout.js` (add top padding to compensate for the now-fixed nav)

**Interfaces:**
- Consumes: `navLinks` from `@/lib/siteConfig` (unchanged shape: `{ label, to }[]`), `Menu`/`X` from `lucide-react`.
- Produces: no new exports consumed elsewhere; `Navbar` remains a default export rendered once in `app/(site)/layout.js`.

**Design decision (documented here since it goes slightly beyond the spec's "keep current structure" wording):** the current Navbar stacks a large 128px logo on top of a separate link row — a two-row layout that cannot function as a compact fixed/sticky bar overlaying a hero image. This task collapses it to a single row (logo left, links right, same logo asset and same nav links/order) at a fixed height, which is the minimum structural change needed to satisfy "sticky, transparent over hero, solid on scroll" from the brief. Content and destinations are unchanged.

- [ ] **Step 1: Rewrite `components/Navbar.js`**

```js
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/siteConfig";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);
  const isHome = pathname === "/";

  const isActive = (to) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const focusable = menuRef.current?.querySelectorAll("a, button");
    focusable?.[0]?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key === "Tab" && focusable && focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 h-20 transition-colors duration-300 ${
        scrolled
          ? "bg-mercuryBlack/95 backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center group" onClick={() => setOpen(false)}>
          <Image
            src="/assets/logo/mercurylogotext.png"
            alt="Mercury Logo"
            width={112}
            height={112}
            priority
            className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                href={link.to}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide rounded-lg transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercuryAccent ${
                  isActive(link.to)
                    ? "text-mercuryWhite"
                    : "text-mercuryGray hover:text-mercuryWhite"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-mercuryWhite p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercuryAccent"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          className="lg:hidden fixed inset-0 top-20 bg-mercuryBlack/98 backdrop-blur-md"
        >
          <ul className="flex flex-col items-center justify-center gap-2 h-full pb-20">
            {navLinks.map((link) => (
              <li key={link.to} className="w-full text-center">
                <Link
                  href={link.to}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-4 text-lg font-medium tracking-wide transition-colors ${
                    isActive(link.to)
                      ? "text-mercuryWhite"
                      : "text-mercuryGray hover:text-mercuryWhite"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Compensate for the now-fixed nav in the shared site layout**

In `app/(site)/layout.js`, replace:

```js
export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
```

with:

```js
export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </>
  );
}
```

This `pt-20` (80px, matching the nav's `h-20`) keeps every other page's content clear of the now-fixed nav. The homepage Hero (Task 10) cancels it with `-mt-20` so the hero image still renders full-bleed from `y=0`, behind the transparent nav.

- [ ] **Step 3: Verify transparent-at-top / solid-on-scroll behavior on the homepage**

```bash
npm run dev &
sleep 3
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000');
  const navBg = async () => page.locator('nav').evaluate(el => getComputedStyle(el).backgroundColor);
  console.log('at top:', await navBg());
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(400);
  console.log('after scroll:', await navBg());
  await browser.close();
})();
"
```
Expected: \"at top\" prints a transparent value (`rgba(0, 0, 0, 0)`), \"after scroll\" prints a non-transparent dark color.

- [ ] **Step 4: Verify an inner page is not covered by the fixed nav**

```bash
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/support');
  const overlap = await page.evaluate(() => {
    const nav = document.querySelector('nav').getBoundingClientRect();
    const h1 = document.querySelector('h1').getBoundingClientRect();
    return h1.top >= nav.bottom;
  });
  console.log('h1 clear of nav:', overlap);
  await browser.close();
})();
"
kill %1
```
Expected: `h1 clear of nav: true`

- [ ] **Step 5: Verify mobile menu opens, focus-traps, cycles on Tab, and restores focus on Escape**

```bash
npm run dev &
sleep 3
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:3000');
  await page.getByLabel('Open menu').click();
  console.log('menu visible:', await page.locator('#mobile-menu').isVisible());
  const firstLinkFocused = await page.evaluate(() => document.activeElement.tagName === 'A');
  console.log('first link auto-focused:', firstLinkFocused);
  await page.keyboard.press('Shift+Tab');
  const wrappedToLast = await page.evaluate(() => document.activeElement.textContent);
  console.log('shift+tab from first wraps to last link:', wrappedToLast);
  await page.keyboard.press('Escape');
  console.log('menu closed:', !(await page.locator('#mobile-menu').isVisible()));
  console.log('focus restored:', await page.evaluate(() => document.activeElement.getAttribute('aria-label')));
  await browser.close();
})();
"
kill %1
```
Expected: `menu visible: true`, `first link auto-focused: true`, `shift+tab from first wraps to last link:` prints the last nav link's label (`Contact`), `menu closed: true`, `focus restored: Close menu` or `Open menu` (the toggle button, confirming focus returned to it).

- [ ] **Step 6: Commit**

```bash
git add components/Navbar.js "app/(site)/layout.js"
git commit -m "feat: redesign Navbar as sticky, transparent-over-hero, solid-on-scroll"
```

---

### Task 9: Redesign the Footer

**Files:**
- Modify: `components/Footer.js`

**Interfaces:**
- Consumes: `company` from `@/lib/siteConfig` (unchanged shape). No new exports.

- [ ] **Step 1: Update token usage and spacing**

Replace the `<footer>` and outer wrapper classes:

```js
<footer className="bg-mercuryBlack border-t border-white/10 mt-auto">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
```

with:

```js
<footer className="bg-mercuryDark border-t border-white/[0.06] mt-auto">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
```

Update the tagline paragraph from:

```js
<p className="max-w-xl text-sm text-gray-400 leading-relaxed mb-6">
```

to:

```js
<p className="max-w-xl text-sm text-mercuryGray leading-relaxed mb-8">
```

Update the social icon buttons' classes from:

```js
className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
```

to:

```js
className="w-10 h-10 rounded-full bg-mercurySurface hover:bg-white/10 flex items-center justify-center text-mercuryGray hover:text-mercuryWhite transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercuryAccent"
```

(apply to both the TikTok and Instagram `<a>` tags — the SVG paths inside stay exactly as they are, per the spec's note that these hand-drawn brand glyphs are kept, not swapped for Lucide).

Update the bottom bar from:

```js
<div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
```

to:

```js
<div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-mercuryGray">
```

and its two `Link`/`a` hover classes from `hover:text-white` to `hover:text-mercuryWhite` (three occurrences: Terms, Privacy, email).

- [ ] **Step 2: Verify it lints and renders**

Run: `npm run lint -- components/Footer.js`
Expected: no errors.

Run:
```bash
npm run dev &
sleep 3
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000
kill %1
```
Expected: `200`

- [ ] **Step 3: Commit**

```bash
git add components/Footer.js
git commit -m "feat: refresh Footer with new tokens and spacing"
```

---

### Task 10: Redesign the Hero section

**Files:**
- Modify: `app/(site)/page.js:43-69` (the `{/* ---------- Hero ---------- */}` section only)

**Interfaces:**
- Consumes: `Button` from `@/components/ui/Button`, `FadeIn`/`Stagger`/`StaggerItem` from `@/components/ui/Motion`.

- [ ] **Step 1: Add the imports**

At the top of `app/(site)/page.js`, add:

```js
import Button from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/Motion";
```

(`FadeIn` is exported from `Motion.js` for future use elsewhere but isn't needed on the homepage — every section here uses `Stagger`/`StaggerItem` instead, so it is intentionally not imported.)

- [ ] **Step 2: Replace the Hero section**

Replace:

```js
      {/* ---------- Hero ---------- */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[url('/assets/hero-image.webp')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
                <span className="block text-white">BUILT FOR</span>
                <span className="block text-metallic">WHAT&apos;S NEXT</span>
              </h1>
              <p className="text-xl sm:text-2xl text-mercuryWhite font-light mb-4 animate-slide-up stagger-1">
                Experience power, portability &amp; innovation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up stagger-3">
                <Link
                  href="/products"
                  className="group relative inline-flex items-center justify-center lg:justify-start gap-3 px-6 py-3 rounded-xl font-semibold text-mercuryBlack overflow-hidden transition-all duration-300 hover:scale-105"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-mercurySilver via-white to-mercurySilver bg-[length:200%_100%] transition-all duration-500 group-hover:bg-[position:100%_0]" />
                  <span className="relative z-10">Pre-Order</span>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>
```

with:

```js
      {/* ---------- Hero ---------- */}
      <section className="relative -mt-20 min-h-screen flex items-center overflow-hidden bg-[url('/assets/hero-image.webp')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-t from-mercuryBlack via-black/30 to-black/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Stagger className="text-center lg:text-left">
              <StaggerItem>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
                  <span className="block text-mercuryWhite">BUILT FOR</span>
                  <span className="block text-metallic">WHAT&apos;S NEXT</span>
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="text-xl sm:text-2xl text-mercuryWhite font-light mb-8">
                  Experience power, portability &amp; innovation
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button href="/products" variant="primary" size="lg">
                    Pre-Order
                  </Button>
                </div>
              </StaggerItem>
            </Stagger>
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>
```

Note: `Link` is no longer used directly in the Hero (it's inside `Button` now), but `Link` is still used elsewhere in `page.js`? Check — the `contactCards` section below uses raw `<a>`, not `Link`, so if this was the only `Link` usage in the file, remove the now-unused `import Link from "next/link";` at the top. Verify with a search before removing.

- [ ] **Step 3: Check for unused `Link` import**

Run: `grep -n "Link" "app/(site)/page.js"`
Expected: if the only remaining match is the `import Link from "next/link";` line itself, delete that import line. If other `<Link` usages remain (e.g. added in Task 12/13), keep it.

- [ ] **Step 4: Verify the page builds and the hero renders full-bleed under the transparent nav**

```bash
npm run build
npm run dev &
sleep 3
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: 'hero-check.png' });
  const heroTop = await page.locator('section').first().evaluate(el => el.getBoundingClientRect().top);
  console.log('hero top (should be 0):', heroTop);
  await browser.close();
})();
"
kill %1
```
Expected: `hero top (should be 0): 0`. Open `hero-check.png` to visually confirm the hero image fills from the very top with the nav floating transparently over it, then delete the screenshot file.

- [ ] **Step 5: Commit**

```bash
git add "app/(site)/page.js"
git commit -m "feat: redesign homepage Hero with Button and Motion primitives"
```

---

### Task 11: Redesign the "Our Products" section wrapper (animation untouched)

**Files:**
- Modify: `app/(site)/page.js` (only the `{/* ---------- Our Products ---------- */}` section's heading/wrapper markup — `ProductStack` usage itself is unchanged)

**Interfaces:**
- Consumes: `SectionHeading` from `@/components/ui/SectionHeading`. `ProductStack` import and usage (`<ProductStack />`) stays byte-for-byte identical.

- [ ] **Step 1: Add the import**

```js
import SectionHeading from "@/components/ui/SectionHeading";
```

- [ ] **Step 2: Replace the section wrapper**

Replace:

```js
      {/* ---------- Our Products (scroll-driven card stack) ---------- */}
      <section className="relative py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Our Products.
            </h2>
          </div>
          <ProductStack />
        </div>
      </section>
```

with:

```js
      {/* ---------- Our Products (scroll-driven card stack — animation untouched) ---------- */}
      <section className="relative py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Lineup" title="Our Products." />
          <ProductStack />
        </div>
      </section>
```

Do not touch the `import ProductStack from "@/components/home/ProductStack";` line, and do not open `components/home/ProductStack.js` in this task.

- [ ] **Step 3: Verify `ProductStack` still renders and scroll-stacks correctly**

```bash
npm run dev &
sleep 3
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto('http://localhost:3000');
  const cardCount = await page.locator('a[href^=\"/products/\"]').count();
  console.log('product cards found:', cardCount);
  await browser.close();
})();
"
kill %1
```
Expected: `product cards found:` a number greater than 0 (confirms `ProductStack` rendered its `productCategories` links unchanged).

- [ ] **Step 4: Commit**

```bash
git add "app/(site)/page.js"
git commit -m "feat: restyle Our Products section heading, keep ProductStack animation untouched"
```

---

### Task 12: Redesign "Why Choose Mercury"

**Files:**
- Modify: `app/(site)/page.js` (the `{/* ---------- Why Choose Mercury ---------- */}` section, and the `featureIcons` array at the top of the file)

**Interfaces:**
- Consumes: `Card` from `@/components/ui/Card`, `SectionHeading` from `@/components/ui/SectionHeading`, `Stagger`/`StaggerItem` from `@/components/ui/Motion`, `MonitorCheck`/`Zap`/`ShieldCheck`/`MapPinned` from `lucide-react`, `Image` from `next/image`. `whyChoose` from `@/lib/content` (unchanged shape: `{ title, description }[]`, 4 items in this fixed order: Windows 11 Ready, Excellent Performance & Reliability, Local Support & Warranty, Made in Zimbabwe).

- [ ] **Step 1: Add imports and replace the `featureIcons` array**

Add to the top imports:

```js
import Image from "next/image";
import { MonitorCheck, Zap, ShieldCheck, MapPinned } from "lucide-react";
import Card from "@/components/ui/Card";
```

Replace the `featureIcons` string-path array:

```js
const featureIcons = [
  // Windows 11 Ready
  "M4 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm2 12h12",
  // Excellent Performance
  "M13 10V3L4 14h7v7l9-11h-7z",
  // Local Support & Warranty
  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  // Made in Zimbabwe
  "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
];
```

with:

```js
// Same order as `whyChoose` in lib/content.js: Windows 11 Ready, Performance,
// Local Support & Warranty, Made in Zimbabwe.
const featureIcons = [MonitorCheck, Zap, ShieldCheck, MapPinned];
```

- [ ] **Step 2: Replace the section**

Replace:

```js
      {/* ---------- Why Choose Mercury ---------- */}
      <section className="relative bg-mercuryDark py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-10">
              Why Choose Mercury?
            </h2>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-full lg:w-1/2 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/banner.png"
                  alt="Mercury Features"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                {whyChoose.map((f, i) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 text-mercuryBlack mt-1">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={featureIcons[i]}
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-mercuryBlack mb-1">
                        {f.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
```

with:

```js
      {/* ---------- Why Choose Mercury ---------- */}
      <section className="relative bg-mercuryDark py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Why Mercury" title="Why Choose Mercury?" />
          <Card className="p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
              <div className="w-full lg:w-1/2 flex-shrink-0 relative aspect-[4/3]">
                <Image
                  src="/assets/banner.png"
                  alt="Mercury device lineup"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain rounded-lg"
                />
              </div>
              <Stagger className="w-full lg:w-1/2 space-y-8">
                {whyChoose.map((f, i) => {
                  const Icon = featureIcons[i];
                  return (
                    <StaggerItem key={f.title} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-mercurySilver">
                        <Icon className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-mercuryWhite mb-1">
                          {f.title}
                        </h3>
                        <p className="text-mercuryGray text-sm leading-relaxed">
                          {f.description}
                        </p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          </Card>
        </div>
      </section>
```

- [ ] **Step 3: Verify the image and icons render**

```bash
npm run build
npm run dev &
sleep 3
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto('http://localhost:3000');
  const img = await page.locator('img[alt=\"Mercury device lineup\"]').count();
  console.log('banner image present:', img);
  await browser.close();
})();
"
kill %1
```
Expected: `banner image present: 1`

- [ ] **Step 4: Commit**

```bash
git add "app/(site)/page.js"
git commit -m "feat: redesign Why Choose Mercury section with Card, Lucide icons, next/image"
```

---

### Task 13: Redesign "Let's Talk Technology" contact cards

**Files:**
- Modify: `app/(site)/page.js` (the `contactCards` array and the `{/* ---------- Let's Talk Technology ---------- */}` section)

**Interfaces:**
- Consumes: `Card` from `@/components/ui/Card`, `SectionHeading` from `@/components/ui/SectionHeading`, `Stagger`/`StaggerItem` from `@/components/ui/Motion`, `MapPin`/`Phone`/`Mail` from `lucide-react`.

- [ ] **Step 1: Add the icon imports**

Extend the `lucide-react` import from Task 12 to also include `MapPin`, `Phone`, `Mail`:

```js
import { MonitorCheck, Zap, ShieldCheck, MapPinned, MapPin, Phone, Mail } from "lucide-react";
```

- [ ] **Step 2: Replace the `contactCards` array**

Replace:

```js
const contactCards = [
  {
    icon: "📍",
    title: "Address",
    lines: [
      `${company.address.street}, ${company.address.suburb}`,
      `${company.address.city}, ${company.address.country}`,
    ],
  },
  {
    icon: "📞",
    title: "Phone",
    href: `tel:${company.phones[0].tel}`,
    lines: [company.phones[0].display],
  },
  {
    icon: "✉️",
    title: "Email",
    href: `mailto:${company.emails.general}`,
    lines: [company.emails.general],
  },
];
```

with:

```js
const contactCards = [
  {
    icon: MapPin,
    title: "Address",
    lines: [
      `${company.address.street}, ${company.address.suburb}`,
      `${company.address.city}, ${company.address.country}`,
    ],
  },
  {
    icon: Phone,
    title: "Phone",
    href: `tel:${company.phones[0].tel}`,
    lines: [company.phones[0].display],
  },
  {
    icon: Mail,
    title: "Email",
    href: `mailto:${company.emails.general}`,
    lines: [company.emails.general],
  },
];
```

- [ ] **Step 3: Replace the section**

Replace:

```js
      {/* ---------- Let's Talk Technology (contact) ---------- */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest text-mercurySilver uppercase mb-3">
              Get in Touch
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Let&apos;s Talk Technology.
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400">
              Whether you&apos;re looking for a device, a corporate solution, or
              simply want to know more — we&apos;d love to hear from you.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {contactCards.map((card) => {
              const body = (
                <>
                  <div
                    className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-2xl group-hover:bg-mercurySilver/10 transition-colors"
                    aria-hidden="true"
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {card.title}
                  </h3>
                  {card.lines.map((line) => (
                    <p key={line} className="text-gray-400 text-sm">
                      {line}
                    </p>
                  ))}
                </>
              );
              return card.href ? (
                <a
                  key={card.title}
                  href={card.href}
                  className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-colors"
                >
                  {body}
                </a>
              ) : (
                <div
                  key={card.title}
                  className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-colors"
                >
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      </section>
```

with:

```js
      {/* ---------- Let's Talk Technology (contact) ---------- */}
      <section className="relative py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Get in Touch"
            title="Let's Talk Technology."
            subtitle="Whether you're looking for a device, a corporate solution, or simply want to know more — we'd love to hear from you."
          />
          <Stagger className="grid sm:grid-cols-3 gap-6">
            {contactCards.map((card) => {
              const Icon = card.icon;
              const body = (
                <>
                  <div
                    className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-mercurySilver group-hover:bg-mercurySilver/10 transition-colors"
                    aria-hidden="true"
                  >
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-bold text-mercuryWhite mb-3">
                    {card.title}
                  </h3>
                  {card.lines.map((line) => (
                    <p key={line} className="text-mercuryGray text-sm">
                      {line}
                    </p>
                  ))}
                </>
              );
              return (
                <StaggerItem key={card.title}>
                  <Card as={card.href ? "a" : "div"} href={card.href}>
                    {body}
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>
```

- [ ] **Step 4: Verify all three cards render with correct hrefs**

```bash
npm run build
npm run dev &
sleep 3
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1400 } });
  await page.goto('http://localhost:3000');
  const tel = await page.locator('a[href^=\"tel:\"]').count();
  const mail = await page.locator('a[href^=\"mailto:\"]').count();
  console.log('tel link:', tel, 'mail link:', mail);
  await browser.close();
})();
"
kill %1
```
Expected: `tel link: 1 mail link: 1` (Address card renders as a plain `div` since it has no `href`).

- [ ] **Step 5: Commit**

```bash
git add "app/(site)/page.js"
git commit -m "feat: redesign contact cards with Card, Lucide icons, staggered reveal"
```

---

### Task 14: Final verification pass

**Files:** none (verification only)

- [ ] **Step 1: Full production build**

Run: `npm run build`
Expected: exits 0, all routes (including `/`) listed as successfully generated, no warnings about missing `mercurySurface`/`mercuryAccent`/`font-display` utilities.

- [ ] **Step 2: Full lint pass**

Run: `npm run lint`
Expected: no errors (warnings acceptable only if they pre-existed before this plan — compare against `git stash` if unsure).

- [ ] **Step 3: Reduced-motion check on the homepage**

```bash
npm run dev &
sleep 3
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000');
  const heroVisible = await page.locator('h1', { hasText: 'BUILT FOR' }).isVisible();
  console.log('hero visible with reduced motion:', heroVisible);
  await browser.close();
})();
"
```
Expected: `hero visible with reduced motion: true` (confirms the `FadeIn`/`Stagger` reduced-motion fallback renders content immediately, not stuck at `opacity: 0`).

- [ ] **Step 4: Full-page visual screenshots, desktop and mobile**

```bash
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto('http://localhost:3000');
  await desktop.waitForTimeout(800);
  await desktop.screenshot({ path: 'homepage-desktop-final.png', fullPage: true });
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto('http://localhost:3000');
  await mobile.waitForTimeout(800);
  await mobile.screenshot({ path: 'homepage-mobile-final.png', fullPage: true });
  await browser.close();
})();
"
kill %1
```

Read both screenshots (`homepage-desktop-final.png`, `homepage-mobile-final.png`) to visually confirm: sticky nav is transparent at the top of the hero, hero copy/CTA are legible, Our Products cards stack correctly, Why Choose Mercury and contact cards use the new dark-surface Card styling, spacing feels generous (no cramped sections). Then delete both screenshot files — they're verification artifacts, not project assets.

- [ ] **Step 5: Confirm other pages still render (Navbar/Footer are shared chrome)**

```bash
npm run dev &
sleep 3
for path in / /products /about /support /contact /news /legal /sustainability; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$path")
  echo "$path -> $code"
done
kill %1
```
Expected: every path returns `200`.

- [ ] **Step 6: Final commit (only if any cleanup edits were needed in this task)**

If Steps 1–5 required no code changes, skip committing. If any fix was needed, stage exactly those files and commit with a message describing the fix (e.g. `fix: remove unused import surfaced by final lint pass`).
