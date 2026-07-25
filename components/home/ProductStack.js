"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { productCategories } from "@/lib/content";

const categorySlug = (name) => name.toLowerCase().replace(/s$/, "");

// Sticky offset each card pins at, plus a small per-card peek so the stacked
// deck shows the top edge of the cards beneath.
const STICK_BASE = 100;
const PEEK = 16;
const MAX_DEPTH = 3;

export default function ProductStack() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cards = Array.from(container.querySelectorAll("[data-card]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const clear = () =>
      cards.forEach((c) => {
        c.style.transform = "";
        c.style.filter = "";
      });

    const update = () => {
      raf = 0;
      const wide = window.innerWidth >= 1024;
      if (!wide || reduce) {
        clear();
        return;
      }
      const vh = window.innerHeight;
      const rect = container.getBoundingClientRect();
      const total = container.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const progress = total > 0 ? scrolled / total : 0;
      const active = progress * (cards.length - 1);

      cards.forEach((card, i) => {
        const depth = active - i; // >0 => this card is behind the active one
        if (depth <= 0) {
          card.style.transform = "translateY(0) scale(1)";
          card.style.filter = "brightness(1)";
        } else {
          const d = Math.min(depth, MAX_DEPTH);
          const scale = 1 - 0.05 * d;
          const ty = -6 * d;
          const brightness = 1 - 0.12 * d;
          card.style.transform = `translateY(${ty}px) scale(${scale})`;
          card.style.filter = `brightness(${brightness})`;
        }
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={containerRef} className="space-y-8 lg:space-y-14">
      {productCategories.map((cat, i) => (
        <div
          key={cat.name}
          data-card
          className="lg:sticky"
          style={{
            top: `${STICK_BASE + i * PEEK}px`,
            transformOrigin: "center top",
            willChange: "transform",
          }}
        >
          <Link
            href={`/products?category=${categorySlug(cat.name)}`}
            className="group bg-white rounded-2xl p-6 block overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <div
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full lg:w-1/2 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-bold text-mercuryBlack mb-4 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  {cat.description}
                </p>
                <div className="mt-6">
                  <span className="inline-flex items-center px-6 py-3 rounded-lg bg-mercuryBlack text-white text-sm font-semibold group-hover:bg-mercurySilver group-hover:text-mercuryBlack transition-colors">
                    View Products
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
