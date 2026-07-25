"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  MonitorCheck,
  Zap,
  ShieldCheck,
  MapPinned,
  ArrowRight,
} from "lucide-react";
import { FadeIn } from "@/components/ui/Motion";

// `features` arrives in the lib/content.js order:
// 0 Windows 11 Ready · 1 Excellent Performance · 2 Local Support & Warranty
// 3 Made in Zimbabwe

/* ---------- pointer-tracking spotlight card ---------- */
function SpotlightCard({ as: Tag = "div", className = "", children, ...props }) {
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
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-mercurySurface transition-all duration-300 hover:border-white/[0.14] hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercuryAccent focus-visible:ring-offset-2 focus-visible:ring-offset-mercuryDark ${className}`}
      {...props}
    >
      {/* metallic silver top-edge highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-mercurySilver/70 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />
      {/* pointer-tracking silver spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 0%), rgba(199,201,206,0.16), transparent 62%)",
        }}
      />
      {children}
    </Tag>
  );
}

/* ---------- decorative motifs ---------- */
function WindowPanes() {
  return (
    <div
      aria-hidden="true"
      className="absolute top-6 right-6 z-0 grid grid-cols-2 gap-1.5 opacity-40 transition-opacity duration-500 group-hover:opacity-90"
    >
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-4 h-4 rounded-[4px] bg-mercuryAccent/40 transition-colors duration-500 group-hover:bg-mercuryAccent/70"
          style={{ transitionDelay: `${i * 50}ms` }}
        />
      ))}
    </div>
  );
}

function Equalizer({ animate }) {
  const bars = [0.5, 0.85, 0.35, 0.7, 0.45];
  return (
    <div
      aria-hidden="true"
      className="absolute top-7 right-6 z-0 flex items-end gap-1 h-8 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
    >
      {bars.map((h, i) =>
        animate ? (
          <motion.span
            key={i}
            className="w-1.5 h-full rounded-full bg-mercuryAccent/70 origin-bottom"
            initial={{ scaleY: h }}
            animate={{ scaleY: [h, 1, 0.28, h] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              delay: i * 0.13,
              ease: "easeInOut",
            }}
          />
        ) : (
          <span
            key={i}
            className="w-1.5 rounded-full bg-mercuryAccent/70"
            style={{ height: `${h * 100}%` }}
          />
        )
      )}
    </div>
  );
}

/* ---------- reusable flat feature card ---------- */
function FeatureCard({ index, icon: Icon, title, description, motif }) {
  return (
    <SpotlightCard className="h-full min-h-[11rem]">
      <span className="pointer-events-none absolute -bottom-6 right-3 z-0 font-display text-[7rem] leading-none font-bold text-white/[0.03] select-none">
        {index}
      </span>
      {motif}
      <div className="relative z-10 flex h-full flex-col p-6 sm:p-7">
        <div className="w-12 h-12 rounded-xl bg-mercuryAccent/10 ring-1 ring-inset ring-mercuryAccent/20 flex items-center justify-center text-mercuryWhite transition-all duration-300 group-hover:bg-mercuryAccent/20 group-hover:ring-mercuryAccent/40">
          <Icon className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-bold text-mercuryWhite mb-1.5">{title}</h3>
          <p className="text-mercuryGray text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function WhyMercury({ features }) {
  const reduceMotion = useReducedMotion();
  const [win, perf, warranty, zim] = features;

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Top row: photo-led hero + two stacked feature cards */}
      <div className="grid lg:grid-cols-5 gap-4 sm:gap-5 lg:items-stretch">
        {/* Hero — Made in Zimbabwe */}
        <FadeIn as="div" className="lg:col-span-3">
          <SpotlightCard className="h-full min-h-[22rem] lg:min-h-[26rem]">
            <Image
              src="/assets/banner.png"
              alt="Mercury device lineup with the Zimbabwean flag"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              style={{ objectPosition: "center 28%" }}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mercuryBlack from-[16%] via-mercuryBlack/70 via-[55%] to-mercuryBlack/10" />
            <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
              <div className="flex items-center gap-2 self-start rounded-full border border-white/10 bg-mercuryBlack/50 backdrop-blur-md px-3.5 py-1.5">
                <span className="flex gap-0.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-[#009739]" />
                  <span className="h-2 w-2 rounded-full bg-[#fdd116]" />
                  <span className="h-2 w-2 rounded-full bg-[#ef3340]" />
                </span>
                <span className="text-xs font-semibold tracking-[0.15em] text-mercuryWhite uppercase">
                  Proudly Zimbabwean
                </span>
              </div>

              <div>
                <div className="mb-4 w-12 h-12 rounded-xl bg-white/10 ring-1 ring-inset ring-white/15 backdrop-blur-sm flex items-center justify-center text-mercuryWhite">
                  <MapPinned className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-mercuryWhite tracking-tight mb-2">
                  {zim.title}
                </h3>
                <p className="text-mercurySilver text-sm sm:text-base leading-relaxed max-w-md">
                  {zim.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["OEM Manufacturer", "Local Assembly"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-1 text-xs font-medium text-mercurySilver"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SpotlightCard>
        </FadeIn>

        {/* Stacked feature cards */}
        <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-5">
          <FadeIn as="div" delay={0.08} className="flex-1">
            <FeatureCard
              index="01"
              icon={MonitorCheck}
              title={win.title}
              description={win.description}
              motif={<WindowPanes />}
            />
          </FadeIn>
          <FadeIn as="div" delay={0.16} className="flex-1">
            <FeatureCard
              index="02"
              icon={Zap}
              title={perf.title}
              description={perf.description}
              motif={<Equalizer animate={!reduceMotion} />}
            />
          </FadeIn>
        </div>
      </div>

      {/* Bottom row: warranty feature card */}
      <FadeIn as="div" delay={0.24}>
        <SpotlightCard>
          <span className="pointer-events-none absolute -bottom-8 left-6 z-0 font-display text-[9rem] leading-none font-bold text-white/[0.03] select-none">
            03
          </span>
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-12 p-6 sm:p-8 lg:p-10">
            <div className="flex-1">
              <div className="mb-5 w-12 h-12 rounded-xl bg-mercuryAccent/10 ring-1 ring-inset ring-mercuryAccent/20 flex items-center justify-center text-mercuryWhite transition-all duration-300 group-hover:bg-mercuryAccent/20 group-hover:ring-mercuryAccent/40">
                <ShieldCheck className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-mercuryWhite mb-2">
                {warranty.title}
              </h3>
              <p className="text-mercuryGray text-sm leading-relaxed max-w-lg mb-5">
                {warranty.description}
              </p>
              <Link
                href="/support"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-mercurySilver hover:text-mercuryWhite transition-colors group/link"
              >
                Explore support &amp; warranty
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" strokeWidth={2.5} />
              </Link>
            </div>

            {/* concentric sonar rings */}
            <div className="relative hidden sm:grid flex-shrink-0 w-40 h-40 place-items-center">
              <span className="absolute inset-0 rounded-full border border-white/[0.05]" aria-hidden="true" />
              <span className="absolute inset-5 rounded-full border border-white/[0.07]" aria-hidden="true" />
              <span className="absolute inset-10 rounded-full border border-mercuryAccent/25 animate-ring-pulse" aria-hidden="true" />
              <div className="relative w-16 h-16 rounded-2xl bg-mercuryAccent/10 ring-1 ring-inset ring-mercuryAccent/25 grid place-items-center text-mercuryWhite">
                <ShieldCheck className="w-7 h-7" strokeWidth={1.75} aria-hidden="true" />
              </div>
            </div>
          </div>
        </SpotlightCard>
      </FadeIn>
    </div>
  );
}
