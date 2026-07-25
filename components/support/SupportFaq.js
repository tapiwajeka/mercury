"use client";

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  Download,
  ShieldCheck,
  Headset,
  MapPin,
  BadgeCheck,
  HelpCircle,
  Plus,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

// Icons matched to the support FAQ topics (falls back to HelpCircle).
const ICONS = [Download, ShieldCheck, Headset, MapPin, BadgeCheck];

export default function SupportFaq({ items, phone, tel, email }) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative py-20 sm:py-24 border-t border-white/[0.06] scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left — heading + visual + quick contact */}
          <div className="lg:col-span-2 lg:sticky lg:top-32">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-mercurySilver uppercase mb-4">
                Answers
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-mercuryWhite mb-4">
                Frequently asked <span className="text-metallic">questions.</span>
              </h2>
              <p className="text-mercuryGray leading-relaxed mb-8">
                Quick answers to the things clients ask us most. Can&apos;t find
                what you need? Our local team is one message away.
              </p>

              {/* Visual card */}
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white to-gray-200">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-mercurySilver/70 to-transparent"
                />
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/assets/laptops.png"
                    alt="Mercury laptop"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className={`object-contain p-8 ${reduceMotion ? "" : "animate-float"}`}
                  />
                </div>
                {/* floating chips */}
                <div className="pointer-events-none absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-mercuryBlack/85 backdrop-blur-sm px-3 py-1.5">
                  <Clock className="w-3.5 h-3.5 text-mercurySilver" strokeWidth={2.2} aria-hidden="true" />
                  <span className="text-[11px] font-semibold text-mercuryWhite">Mon–Sat support</span>
                </div>
                <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-mercuryBlack/85 backdrop-blur-sm px-3 py-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" strokeWidth={2.2} aria-hidden="true" />
                  <span className="text-[11px] font-semibold text-mercuryWhite">2-year warranty</span>
                </div>
              </div>

              {/* Quick contact */}
              <div className="mt-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <a
                  href={`tel:${tel}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-mercurySurface/60 px-4 py-3 transition-colors hover:border-white/[0.16]"
                >
                  <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-white/[0.05] ring-1 ring-inset ring-white/10 text-mercurySilver group-hover:text-mercuryWhite transition-colors">
                    <Phone className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] text-mercuryGray">Call us</span>
                    <span className="block text-sm font-semibold text-mercuryWhite truncate">{phone}</span>
                  </span>
                </a>
                <a
                  href={`mailto:${email}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-mercurySurface/60 px-4 py-3 transition-colors hover:border-white/[0.16]"
                >
                  <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-white/[0.05] ring-1 ring-inset ring-white/10 text-mercurySilver group-hover:text-mercuryWhite transition-colors">
                    <Mail className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] text-mercuryGray">Email us</span>
                    <span className="block text-sm font-semibold text-mercuryWhite truncate">{email}</span>
                  </span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right — animated accordion */}
          <div className="lg:col-span-3 space-y-3">
            {items.map((item, i) => {
              const Icon = ICONS[i] ?? HelpCircle;
              const isOpen = open === i;
              return (
                <motion.div
                  key={item.question}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, ease: EASE, delay: Math.min(i * 0.07, 0.35) }}
                >
                  <div
                    className={`group relative overflow-hidden rounded-2xl border bg-mercurySurface/70 transition-colors duration-300 ${
                      isOpen ? "border-white/[0.16]" : "border-white/[0.06] hover:border-white/[0.12]"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-mercurySilver/70 to-transparent transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                      }`}
                    />
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-4 p-5 sm:p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercurySilver/50 focus-visible:ring-inset"
                    >
                      <span
                        className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl ring-1 ring-inset transition-all duration-300 ${
                          isOpen
                            ? "bg-white/[0.1] ring-white/20 text-mercuryWhite"
                            : "bg-white/[0.04] ring-white/10 text-mercurySilver group-hover:text-mercuryWhite"
                        }`}
                      >
                        <Icon className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                      </span>
                      <span className="flex-1 font-semibold text-mercuryWhite">
                        {item.question}
                      </span>
                      <span
                        className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border border-white/10 text-mercurySilver transition-all duration-300 ${
                          isOpen ? "rotate-45 bg-white/[0.08]" : "group-hover:bg-white/[0.04]"
                        }`}
                      >
                        <Plus className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="pl-[4.5rem] pr-6 pb-6 text-mercuryGray leading-relaxed">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
