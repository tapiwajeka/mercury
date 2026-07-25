"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Phone,
  Mail,
  Wrench,
  ShieldCheck,
  MapPin,
  Download,
  ArrowUpRight,
} from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";

const EASE = [0.16, 1, 0.3, 1];

export default function SupportChannels({ phone, tel, email, sales, mapUrl }) {
  const reduceMotion = useReducedMotion();

  const channels = [
    {
      icon: Phone,
      title: "Call the support line",
      desc: "Talk to a technician directly for urgent help and quick answers.",
      action: phone,
      href: `tel:${tel}`,
    },
    {
      icon: Mail,
      title: "Email support",
      desc: "Send us the details and we'll get back to you with next steps.",
      action: email,
      href: `mailto:${email}`,
    },
    {
      icon: Wrench,
      title: "Book a repair",
      desc: "Log a repair or diagnostic request and we'll arrange the rest.",
      action: "Start a request",
      href: "/contact",
      internal: true,
    },
    {
      icon: ShieldCheck,
      title: "Warranty & registration",
      desc: "Register your device and check what your 2-year cover includes.",
      action: "View warranty",
      href: "#warranty",
    },
    {
      icon: Download,
      title: "Drivers & manuals",
      desc: "Request the latest drivers and documentation for your model.",
      action: "Request downloads",
      href: `mailto:${sales}?subject=Drivers%20%26%20manuals%20request`,
    },
    {
      icon: MapPin,
      title: "Visit a service center",
      desc: "7 Helsdon Road, Alexandra Park, Harare — Monday to Saturday.",
      action: "Get directions",
      href: mapUrl,
    },
  ];

  return (
    <section className="relative py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-2xl mb-12"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-mercurySilver uppercase mb-4">
            Get in touch
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-mercuryWhite">
            How can we <span className="text-metallic">help?</span>
          </h2>
          <p className="text-mercuryGray text-lg leading-relaxed mt-4">
            Pick the channel that suits you. However you reach out, you&apos;re
            talking to a local team that knows your device.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {channels.map((c, i) => {
            const external = !c.internal && c.href?.startsWith("http");
            return (
              <motion.a
                key={c.title}
                href={c.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: EASE, delay: Math.min(i * 0.06, 0.3) }}
                className="block"
              >
                <SpotlightCard as="div" className="h-full">
                  <div className="relative z-10 flex h-full flex-col p-6 sm:p-7">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/[0.05] ring-1 ring-inset ring-white/10 text-mercurySilver transition-all duration-300 group-hover:bg-white/[0.1] group-hover:ring-white/20 group-hover:text-mercuryWhite">
                        <c.icon className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                      </span>
                      <ArrowUpRight
                        className="w-5 h-5 text-mercuryGray transition-all duration-300 group-hover:text-mercuryWhite group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-mercuryWhite mb-2">
                      {c.title}
                    </h3>
                    <p className="text-mercuryGray text-sm leading-relaxed mb-6">
                      {c.desc}
                    </p>
                    <span className="mt-auto text-sm font-semibold text-mercurySilver group-hover:text-mercuryWhite transition-colors">
                      {c.action}
                    </span>
                  </div>
                </SpotlightCard>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
