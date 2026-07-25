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

  const isActive = (to) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <>
    <nav className="fixed top-0 inset-x-0 z-50 bg-mercuryBlack/85 backdrop-blur-xl border-b border-white/[0.06]">
      {/* metallic silver hairline */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-mercurySilver/40 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative flex flex-col items-center transition-all duration-300 ${
            scrolled ? "py-3" : "py-4 sm:py-5"
          }`}
        >
          {/* Logo lockup */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex flex-col items-center group focus-visible:outline-none"
          >
            <Image
              src={scrolled ? "/assets/logo/mercurylogoimage.png" : "/assets/logo/mercurylogotext.png"}
              alt="Mercury"
              width={128}
              height={128}
              priority
              className={`object-contain transition-all duration-300 group-hover:scale-105 ${
                scrolled ? "w-10 h-10 sm:w-11 sm:h-11" : "w-20 h-20 sm:w-24 sm:h-24"
              }`}
            />
          </Link>

          {/* Desktop links */}
          <ul
            className={`hidden lg:flex items-center gap-1 transition-all duration-300 ${
              scrolled ? "mt-3" : "mt-4"
            }`}
          >
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className={`relative px-4 py-2 text-sm font-medium tracking-wide rounded-lg transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercuryAccent ${
                      active
                        ? "text-mercuryWhite"
                        : "text-mercuryGray hover:text-mercuryWhite"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-mercurySilver to-transparent"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 text-mercuryWhite p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercuryAccent"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </nav>

      {/* Mobile overlay (sibling of nav so the nav bar stays on top) */}
      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          className="lg:hidden fixed inset-0 z-40 bg-mercuryBlack"
        >
          <ul className="flex flex-col items-center justify-center gap-2 h-full pb-16">
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
    </>
  );
}
