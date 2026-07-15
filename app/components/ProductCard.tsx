"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cardItem } from "../lib/motion";
import type { ProductSummary } from "../lib/products";

/**
 * Single product card — shared between the home page ProductsSection
 * and the product detail page MoreProducts section.
 *
 * Full card is a link to the product detail page.
 * Layout: bottle on the right, content on the left, left-side scrim for contrast.
 */
export function ProductCard({ p, exploreLabel }: { p: ProductSummary; exploreLabel: string }) {
  return (
    <motion.div variants={cardItem}>
      <Link
        href={`/products/${p.slug}`}
        className="relative overflow-hidden block"
        style={{
          backgroundImage: p.bg,
          boxShadow: "0 8px 32px rgba(33,48,38,0.22)",
          minHeight: 260,
          borderRadius: p.rounded.includes("bl-[80px]")
            ? "8px 8px 8px 24px"
            : p.rounded.includes("tr-[80px]")
              ? "8px 24px 8px 8px"
              : "8px",
        }}
      >
        {/* Left-side dark scrim to guarantee text contrast */}
        <div
          className="absolute inset-y-0 left-0 pointer-events-none"
          style={{
            width: "72%",
            background: "linear-gradient(to right, rgba(0,0,0,0.52) 0%, transparent 100%)",
          }}
        />

        {/* Bottle — right side, partially cropped */}
        <img
          src={p.bottle}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute right-0 bottom-0 w-auto object-contain pointer-events-none"
          style={{
            height: "110%",
            opacity: 0.92,
            transform: "translateX(18%) translateY(8%)",
          }}
        />

        {/* Content — left column */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-5"
          style={{ maxWidth: "58%" }}
        >
          <div>
            <p className="font-bold text-3xl leading-none text-[#f4fff8]">
              {p.name}
            </p>
            <p className="font-semibold text-sm leading-snug mt-2" style={{ color: "rgba(244,255,248,0.82)" }}>
              {p.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {p.stats.map((s) => (
              <span
                key={s}
                className="text-xs font-bold rounded-full px-2.5 py-1 whitespace-nowrap"
                style={{
                  color: "#f4fff8",
                  border: "1px solid rgba(255,255,255,0.30)",
                  background: "rgba(255,255,255,0.14)",
                }}
              >
                {s}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0.5 rounded-full shrink-0" style={{ backgroundColor: p.accent }} />
            <span className="font-bold text-sm" style={{ color: p.accent }}>{exploreLabel}</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={p.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
