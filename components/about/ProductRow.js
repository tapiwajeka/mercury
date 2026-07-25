"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

export default function ProductRow({
  index,
  title,
  tag,
  image,
  paragraph,
  reverse,
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["-8%", "8%"]
  );

  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const handleMove = (e) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -6, ry: px * 6 });
  };
  const reset = () => setTilt({ rx: 0, ry: 0 });

  return (
    <div
      ref={ref}
      className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
    >
      {/* Image card */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className={reverse ? "lg:order-2" : ""}
        style={{ perspective: 1200 }}
      >
        <div
          onMouseMove={handleMove}
          onMouseLeave={reset}
          className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/[0.06] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out will-change-transform"
          style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
        >
          {/* silver top-edge highlight */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-mercurySilver/70 to-transparent opacity-80"
          />

          {/* parallax image */}
          <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[10%]">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-mercuryBlack/60 via-transparent to-transparent" />

          {/* index / tag chip */}
          <div className="absolute top-5 left-5 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-mercuryBlack/50 backdrop-blur-md px-3 py-1.5">
            <span className="font-display text-xs font-bold text-mercuryWhite tabular-nums">
              {String(index).padStart(2, "0")}
            </span>
            <span className="text-xs font-semibold tracking-[0.15em] text-mercurySilver uppercase">
              {tag}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        className={reverse ? "lg:order-1" : ""}
      >
        <p className="text-xs font-semibold tracking-[0.2em] text-mercurySilver uppercase mb-4">
          {String(index).padStart(2, "0")} — {tag}
        </p>
        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-mercuryWhite tracking-tight mb-5">
          {title}
        </h3>
        <p className="text-mercuryGray leading-relaxed mb-8 max-w-lg">
          {paragraph}
        </p>
        <Link
          href="/products"
          className="group/link inline-flex items-center gap-2 text-sm font-semibold text-mercuryWhite"
        >
          <span className="border-b border-transparent group-hover/link:border-mercurySilver/60 transition-colors pb-0.5">
            Explore {tag}
          </span>
          <ArrowRight
            className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
            strokeWidth={2.5}
            aria-hidden="true"
          />
        </Link>
      </motion.div>
    </div>
  );
}
