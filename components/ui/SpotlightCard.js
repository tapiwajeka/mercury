"use client";

import { useRef } from "react";

// Reusable dark card with the house silver treatment: a metallic top-edge
// hairline plus a pointer-tracking silver spotlight that fades in on hover.
export default function SpotlightCard({
  as: Tag = "div",
  className = "",
  spotlightSize = 340,
  children,
  ...props
}) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-mercurySurface transition-all duration-300 hover:border-white/[0.14] hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercurySilver/60 ${className}`}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-mercurySilver/70 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${spotlightSize}px circle at var(--mx, 50%) var(--my, 0%), rgba(199,201,206,0.16), transparent 62%)`,
        }}
      />
      {children}
    </Tag>
  );
}
