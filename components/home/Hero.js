"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/Motion";

// Home hero — matches the live site: a full-bleed cover backdrop
// (bg-cover / bg-center). Motion is limited to the text reveal and scroll cue
// so the image framing is unchanged.
export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[calc(100vh-9rem)] sm:min-h-[calc(100vh-10rem)] flex items-center overflow-hidden bg-[url('/assets/hero-image.webp')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-t from-mercuryBlack via-black/30 to-black/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Stagger immediate className="text-center lg:text-left">
            <StaggerItem>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
                <span className="block text-mercuryWhite">BUILT FOR</span>
                <span className="block text-metallic">WHAT&apos;S NEXT</span>
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="text-xl sm:text-2xl text-mercuryWhite font-light mb-8">
                Experience power, portability &amp; innovation
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button href="/products" variant="primary" size="lg">
                  Pre-Order
                </Button>
              </div>
            </StaggerItem>
          </Stagger>
          <div className="hidden lg:block" />
        </div>
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
