"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "./Icons";
import { CTA_PARTICLES } from "../lib/tokens";
import { staggerContainer, fadeUp, viewport } from "../lib/motion";

interface CTABannerProps {
  heading: string;
  text: string;
  buttonLabel: string;
  /** Extra Tailwind classes, e.g. `"mt-8"` */
  className?: string;
}

export function CTABanner({ heading, text, buttonLabel, className = "" }: CTABannerProps) {
  return (
    <motion.section
      id="cta"
      className={`w-full rounded-tl-[8px] rounded-tr-[8px] rounded-br-[80px] rounded-bl-[8px] overflow-hidden
        py-12 sm:py-16 lg:py-20 px-6 lg:px-24 flex flex-col items-center justify-center text-center gap-8 relative ${className}`}
      style={{
        minHeight: 280,
        backgroundImage:
          "linear-gradient(180deg, rgba(33,48,38,0.10) 0%, rgba(33,48,38,0.42) 100%), linear-gradient(90deg, #255c38, #255c38)",
      }}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {/* Decorative leaf overlays */}
      <Image src="/assets/yellow-leaf1.svg" alt="" aria-hidden width={380} height={380}
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{ right: "-6%", bottom: "-20%", width: "38%", height: "auto", zIndex: 1, opacity: 0.38 }} />
      <Image src="/assets/yellow-leaf2.svg" alt="" aria-hidden width={160} height={160}
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{ left: "-4%", bottom: "-8%", width: "16%", height: "auto", zIndex: 1, opacity: 0.28 }} />

      {/* Floating ambient particles */}
      {CTA_PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: i % 3 === 0 ? "rgba(255,184,0,0.35)" : "rgba(45,186,93,0.30)",
            animation: `float-particle ${p.dur}s ease-in-out infinite ${p.delay}s`,
            willChange: "transform, opacity",
          }}
        />
      ))}

      <motion.h2
        variants={fadeUp}
        className="relative z-10 font-bold text-[#f4fff8] text-3xl sm:text-4xl lg:text-[48px] leading-[1.35] max-w-3xl"
      >
        {heading}
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className="relative z-10 text-[#f4fff8]/80 font-medium text-base lg:text-lg leading-relaxed"
      >
        {text}
      </motion.p>
      <motion.div variants={fadeUp} className="relative z-10 mt-2">
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 bg-[#ffb800] text-[#213026] font-bold text-base sm:text-lg
            px-6 sm:px-8 py-3.5 sm:py-4 rounded-[52px] hover:brightness-105 hover:scale-[1.03] active:scale-[0.98]
            transition-all duration-200 group"
          style={{ animation: "pulse-glow 2.8s ease-in-out infinite 1s" }}
        >
          {buttonLabel}
          <span className="group-hover:translate-x-0.5 transition-transform block">
            <ArrowRight size={20} />
          </span>
        </Link>
      </motion.div>
    </motion.section>
  );
}
