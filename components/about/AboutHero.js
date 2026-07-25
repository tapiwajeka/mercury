"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

export default function AboutHero() {
  const reduceMotion = useReducedMotion();
  const [shift, setShift] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * -26;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -26;
    setShift({ x, y });
  };

  const reset = () => setShift({ x: 0, y: 0 });

  return (
    <section
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-8.5rem)] lg:min-h-[calc(100vh-7rem)] flex items-center overflow-hidden"
    >
      {/* Parallax image layer — the products in the image drift with the cursor */}
      <div
        className="absolute -inset-[12%] transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: `translate3d(${shift.x}px, ${shift.y}px, 0)` }}
      >
        <div
          className={`relative h-full w-full ${reduceMotion ? "" : "animate-kenburns"}`}
        >
          <Image
            src="/assets/bg-products.webp"
            alt="Mercury device lineup with the Zimbabwean flag"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_30%),linear-gradient(90deg,rgba(5,8,12,0.85)_0%,rgba(5,8,12,0.65)_38%,rgba(5,8,12,0.28)_70%,rgba(5,8,12,0.06)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-mercuryBlack/85 via-mercuryBlack/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-mercuryBlack/80 to-transparent" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mercurySilver/50 to-transparent"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-2xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-md px-3.5 py-1.5">
            <span className="flex gap-0.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-[#009739]" />
              <span className="h-2 w-2 rounded-full bg-[#fdd116]" />
              <span className="h-2 w-2 rounded-full bg-[#ef3340]" />
            </span>
            <span className="text-xs font-semibold tracking-[0.18em] text-mercuryWhite uppercase">
              Proudly Zimbabwean
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[0.95]">
            <span className="block text-mercuryWhite drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]">Engineered for Africa.</span>
            <span className="block text-metallic drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]">Built to last.</span>
          </h1>

          <p className="text-mercurySilver text-lg sm:text-xl leading-relaxed max-w-xl">
            High-performance ICT devices designed for modern African markets —
            locally assembled to international standards, with global quality
            and support you can count on.
          </p>
        </motion.div>
      </div>

      {/* Scroll cue */}
      {!reduceMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-mercurySilver"
        >
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          </motion.span>
        </motion.div>
      )}
    </section>
  );
}
