"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, X, ShieldCheck, BadgeCheck, ArrowRight } from "lucide-react";
import { legal } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1];

const covered = legal.warranty.sections.find((s) => s.title === "What Is Covered")?.content ?? [];
const notCovered = legal.warranty.sections.find((s) => s.title === "What Is Not Covered")?.content ?? [];

const TABS = [
  { key: "covered", label: "What's covered", items: covered, positive: true },
  { key: "excluded", label: "What's not", items: notCovered, positive: false },
];

export default function WarrantyCoverage() {
  const reduceMotion = useReducedMotion();
  const [tab, setTab] = useState("covered");
  const active = TABS.find((t) => t.key === tab);

  return (
    <section id="warranty" className="relative py-20 sm:py-24 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* Summary card */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-mercurySurface to-mercuryBlack p-8 sm:p-10"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mercurySilver/70 to-transparent"
            />
            <div aria-hidden="true" className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-mercurySilver/[0.06] blur-3xl" />

            <div className="relative">
              <div className="mb-6 w-14 h-14 rounded-2xl bg-white/[0.06] ring-1 ring-inset ring-white/10 grid place-items-center text-mercurySilver">
                <ShieldCheck className="w-7 h-7" strokeWidth={1.8} aria-hidden="true" />
              </div>
              <p className="text-xs font-semibold tracking-[0.2em] text-mercurySilver uppercase mb-3">
                Peace of mind
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-mercuryWhite mb-4">
                Warranty <span className="text-metallic">you can trust.</span>
              </h2>
              <p className="text-mercuryGray leading-relaxed mb-8">
                Every Mercury device ships with a standard 2-year warranty against
                manufacturing defects, with extended cover available for longer
                protection.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <div className="font-display text-3xl font-bold text-mercuryWhite">2 yrs</div>
                  <div className="text-xs text-mercuryGray mt-1">Standard cover</div>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <div className="font-display text-3xl font-bold text-mercuryWhite">5 yrs</div>
                  <div className="text-xs text-mercuryGray mt-1">Extended option</div>
                </div>
              </div>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-mercuryWhite"
              >
                <BadgeCheck className="w-4 h-4 text-mercurySilver" strokeWidth={2.2} aria-hidden="true" />
                <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-mercurySilver/60">
                  Register your device
                </span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          {/* Interactive coverage lists */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="lg:col-span-3 rounded-3xl border border-white/[0.06] bg-mercurySurface/60 p-6 sm:p-8"
          >
            {/* Toggle */}
            <div className="inline-flex rounded-xl border border-white/[0.08] bg-mercuryBlack/40 p-1 mb-8">
              {TABS.map((t) => {
                const isActive = tab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercurySilver/60 ${
                      isActive ? "text-mercuryBlack" : "text-mercuryGray hover:text-mercuryWhite"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="warrantyTab"
                        className="absolute inset-0 rounded-lg bg-gradient-to-b from-mercuryWhite to-mercurySilver"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10">{t.label}</span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.ul
                key={active.key}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="grid sm:grid-cols-2 gap-3"
              >
                {active.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5"
                  >
                    <span
                      className={`mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full ${
                        active.positive
                          ? "bg-emerald-400/15 text-emerald-300 ring-1 ring-inset ring-emerald-400/25"
                          : "bg-red-400/10 text-red-300 ring-1 ring-inset ring-red-400/20"
                      }`}
                    >
                      {active.positive ? (
                        <Check className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" />
                      ) : (
                        <X className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" />
                      )}
                    </span>
                    <span className="text-sm text-mercurySilver leading-relaxed">{item}</span>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>

            <p className="text-xs text-mercuryGray mt-6 leading-relaxed">
              Extended warranties can be purchased within 30 days of your original
              purchase for up to 5 years of coverage and priority support.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
