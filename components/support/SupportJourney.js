"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ClipboardList, Search, Wrench, PackageCheck } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const STEPS = [
  {
    icon: ClipboardList,
    title: "Log your request",
    desc: "Reach out by phone, email or the contact form with your device details and the issue.",
  },
  {
    icon: Search,
    title: "Diagnosis",
    desc: "Our technicians assess the device, confirm the fault and share a clear way forward.",
  },
  {
    icon: Wrench,
    title: "Repair or replace",
    desc: "Covered issues are repaired or replaced using genuine parts, all handled locally.",
  },
  {
    icon: PackageCheck,
    title: "Return & follow-up",
    desc: "You get your device back tested and ready, with follow-up support if you need it.",
  },
];

export default function SupportJourney() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative py-20 sm:py-24 border-t border-white/[0.06]">
      <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-2xl mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-mercurySilver uppercase mb-4">
            The process
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-mercuryWhite">
            How a repair <span className="text-metallic">works.</span>
          </h2>
          <p className="text-mercuryGray text-lg leading-relaxed mt-4">
            Four simple steps from the moment you get in touch to the day your
            device is back in your hands.
          </p>
        </motion.div>

        <div className="relative">
          {/* connecting line (desktop) */}
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-px">
            <div className="absolute inset-0 bg-white/[0.08]" />
            <motion.div
              className="absolute inset-y-0 left-0 origin-left bg-gradient-to-r from-mercurySilver/60 via-mercurySilver to-mercurySilver/60"
              initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            />
          </div>

          <ol className="grid gap-10 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.title}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.12 }}
                className="relative"
              >
                <div className="flex items-center gap-4 lg:block">
                  {/* node */}
                  <div className="relative grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl border border-white/10 bg-mercurySurface text-mercuryWhite lg:mb-6">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mercurySilver/70 to-transparent"
                    />
                    <step.icon className="w-6 h-6" strokeWidth={1.9} aria-hidden="true" />
                    <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-b from-mercuryWhite to-mercurySilver text-[11px] font-bold text-mercuryBlack tabular-nums">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-mercuryWhite lg:mb-2">
                    {step.title}
                  </h3>
                </div>
                <p className="text-mercuryGray text-sm leading-relaxed mt-3 lg:mt-0 pl-18 lg:pl-0">
                  {step.desc}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
