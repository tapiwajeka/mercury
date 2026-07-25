"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Headset, Phone, ArrowRight, ShieldCheck, Wrench, Clock } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const STATS = [
  { icon: ShieldCheck, value: "2-Year", label: "Standard warranty" },
  { icon: Wrench, value: "Local", label: "Trained technicians" },
  { icon: Clock, value: "Mon–Sat", label: "Support availability" },
];

export default function SupportHero({ phone, tel }) {
  const reduceMotion = useReducedMotion();
  const [shift, setShift] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * -20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setShift({ x, y });
  };
  const reset = () => setShift({ x: 0, y: 0 });

  return (
    <section
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-8.5rem)] lg:min-h-[calc(100vh-7rem)] flex items-center overflow-hidden"
    >
      {/* Parallax image layer */}
      <div
        className="absolute -inset-[12%] transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: `translate3d(${shift.x}px, ${shift.y}px, 0)` }}
      >
        <div
          className={`h-full w-full bg-cover bg-center bg-no-repeat ${reduceMotion ? "" : "animate-kenburns"}`}
          style={{ backgroundImage: "url(/assets/bg-support.webp)" }}
        />
      </div>

      {/* Richer, cinematic overlay to keep the headline readable over the image */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_30%),linear-gradient(90deg,rgba(5,8,12,0.85)_0%,rgba(5,8,12,0.65)_38%,rgba(5,8,12,0.28)_70%,rgba(5,8,12,0.06)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-mercuryBlack/85 via-mercuryBlack/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-mercuryBlack/80 to-transparent" />
      <div className="absolute inset-0 grid-lines opacity-30" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-24 left-[15%] w-[26rem] h-[26rem] rounded-full bg-mercurySilver/[0.08] blur-[130px] animate-blob"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-[10%] w-80 h-80 rounded-full bg-mercurySilver/[0.06] blur-[110px] animate-blob"
        style={{ animationDelay: "-6s" }}
        aria-hidden="true"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mercurySilver/50 to-transparent"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-2xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-md px-3.5 py-1.5">
            <Headset className="w-3.5 h-3.5 text-mercurySilver" strokeWidth={2.2} aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.18em] text-mercuryWhite uppercase">
              Support Center
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[0.95]">
            <span className="block text-mercuryWhite drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]">We&apos;ve got</span>
            <span className="block text-metallic drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]">your back.</span>
          </h1>

          <p className="text-mercurySilver text-lg sm:text-xl leading-relaxed max-w-xl mb-9">
            Repairs, warranty and after-sales support handled locally by trained
            technicians — for fast response times, reliable service, and help you
            can count on.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="btn-premium btn-primary group">
              Contact Support
              <ArrowRight
                className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </Link>
            <a href={`tel:${tel}`} className="btn-premium btn-outline group">
              <Phone className="mr-2 w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
              {phone}
            </a>
          </div>
        </motion.div>

        {/* Floating trust stats */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl"
        >
          {STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-mercuryBlack/40 backdrop-blur-md px-4 py-3"
            >
              <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-white/[0.06] ring-1 ring-inset ring-white/10 text-mercurySilver">
                <Icon className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-bold text-mercuryWhite leading-none">
                  {value}
                </span>
                <span className="block text-[11px] text-mercuryGray mt-1">
                  {label}
                </span>
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
