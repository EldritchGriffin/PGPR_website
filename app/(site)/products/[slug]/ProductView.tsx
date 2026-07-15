"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer, staggerCards, cardItem, viewport } from "../../../lib/motion";
import { SectionLeaf } from "../../../components/SectionLeaf";
import { ProductCard } from "../../../components/ProductCard";
import { CTABanner } from "../../../components/CTABanner";
import { Footer } from "../../../components/Footer";
import { YellowBtn, GhostBtn, DarkBtn, DarkGhostBtn, MoreInfoBtn, TechSheetBtn } from "../../../components/Buttons";
import { C } from "../../../lib/tokens";
import type { Product } from "../../../lib/products";
import type { SiteSettingsData } from "../../../lib/sanity/queries";

export type ProductViewProps = {
  product: Product;
  otherProducts: Product[];
  siteSettings: SiteSettingsData;
};

// ─── Animation constant used by ProductHero CSS keyframes ─────────────────────
const EXPO = "cubic-bezier(0.16,1,0.3,1)";

// ─── Product Hero ─────────────────────────────────────────────────────────────

// ─── Product Hero ─────────────────────────────────────────────────────────────
function ProductHero({ product, productUi }: { product: Product; productUi: SiteSettingsData["productUi"] }) {
  const enter = (delay: number): React.CSSProperties => ({
    animation: `hero-enter 1.1s ${EXPO} ${delay}ms both`,
  });

  const dark = product.darkText;
  const textPrimary   = dark ? C.dark  : "#f4fff8";
  const textSecondary = dark ? "rgba(33,48,38,0.70)" : "rgba(244,255,248,0.85)";

  return (
    /* Mint outer — same bg as rest of page, gives the card its inset look */
    <div className="w-full" style={{ backgroundColor: C.mint, paddingTop: "72px", paddingBottom: "16px" }}>
      <section
        className="relative overflow-hidden flex flex-col lg:grid lg:[grid-template-columns:1fr_1fr] lg:[grid-template-rows:1fr]"
        style={{
          minHeight: "min(80vh, 700px)",
          backgroundColor: product.heroColor,
          borderRadius: "8px 80px 8px 80px",
        }}
      >
        {/* Bottom-right gradient overlay — spans full card, no clipping */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 100% 100%, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.28) 45%, transparent 75%)",
            zIndex: 3,
          }}
        />

        {/* yellow-leaf1 — large diagonal sweep through center of card */}
        <Image src="/assets/yellow-leaf1.svg" alt="" aria-hidden width={800} height={800}
          className="absolute pointer-events-none select-none"
          style={{
            left: "14%", top: "-20%",
            width: "72%", height: "auto",
            zIndex: 2,
            opacity: dark ? 0.55 : 1,
            animation: `hero-enter 1.4s ${EXPO} 200ms both`,
          }}
        />

        {/* yellow-leaf2 — bottom-left corner, partially clipped by overflow */}
        <Image src="/assets/yellow-leaf2.svg" alt="" aria-hidden width={400} height={400}
          className="absolute pointer-events-none select-none"
          style={{
            left: "-8%", bottom: "-30%",
            width: "38%", height: "auto",
            zIndex: 2,
            opacity: dark ? 0.55 : 1,
            animation: `hero-enter 1.4s ${EXPO} 350ms both`,
          }}
        />

        {/* Left column: text + buttons */}
        <div className="relative z-10 flex items-center px-6 sm:px-14 lg:px-[80px] py-10 sm:py-16">
          <div className="flex flex-col gap-6">
            <h1
              className="font-bold tracking-tight"
              style={{ ...enter(100), fontSize: "clamp(3rem, 6vw, 5.5rem)", lineHeight: 1.0, color: textPrimary }}
            >
              {product.name}
            </h1>

            <p
              style={{ ...enter(220), color: textSecondary }}
              className="font-bold text-xl sm:text-2xl lg:text-[32px] leading-tight max-w-[380px]"
            >
              {product.subtitle}
            </p>

            <div style={enter(340)} className="flex flex-wrap items-center gap-4 pt-4">
              {dark
                ? <DarkBtn label={productUi.requestDemoLabel} href="/contact" />
                : <YellowBtn label={productUi.requestDemoLabel} href="/contact" />}
              {dark
                ? <DarkGhostBtn label={productUi.technicalSheetLabel} />
                : <GhostBtn label={productUi.technicalSheetLabel} />}
            </div>
          </div>
        </div>

        {/* Right column: bottle — desktop only */}
        <div className="hidden lg:block relative z-10">
          <img
            src={product.product}
            alt={product.name}
            className="absolute w-auto object-contain"
            style={{
              height: "110%",
              right: "5%",
              bottom: "-8%",
              zIndex: 4,
              animation: `hero-enter 1.3s ${EXPO} 180ms both`,
              filter: "drop-shadow(0 24px 56px rgba(0,0,0,0.45))",
            }}
          />
        </div>

        {/* Mobile: bottle decoration */}
        <img
          src={product.product}
          alt=""
          aria-hidden
          className="absolute pointer-events-none select-none lg:hidden"
          style={{
            height: "65%",
            right: "-8%",
            bottom: "-5%",
            zIndex: 2,
          }}
        />
      </section>
    </div>
  );
}

// ─── Product Overview ─────────────────────────────────────────────────────────
function ProductOverview({ product, productUi }: { product: Product; productUi: SiteSettingsData["productUi"] }) {
  // Leaf-shaped bullet — matches the logo leaf motif
  const GreenLeaf = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
      <path d="M3 17C3 17 4 8 10 5C16 2 18 3 18 3C18 3 17 9 13 13C9 17 3 17 3 17Z" fill={C.mid} />
    </svg>
  );
  const AmberLeaf = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
      <path d="M3 17C3 17 4 8 10 5C16 2 18 3 18 3C18 3 17 9 13 13C9 17 3 17 3 17Z" fill={C.amber} />
    </svg>
  );

  return (
    <motion.section
      className="w-full py-12 sm:py-20 lg:py-28"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {/* Title row — leaf pill + heading inline */}
      <motion.div className="flex items-center gap-4 mb-6 sm:mb-10" variants={fadeUp}>
        <SectionLeaf />
        <h2
          className="font-semibold text-[#213026] text-4xl sm:text-5xl lg:text-[72px] lg:leading-[1.0]">
          {productUi.overviewHeading}
        </h2>
      </motion.div>

      <motion.p
        variants={fadeUp}
        className="text-[#696969] font-medium text-base lg:text-lg leading-relaxed max-w-[900px] mb-8 sm:mb-16">
        {product.longDesc}
      </motion.p>

      {/* Two cards */}
      <motion.div className="grid lg:grid-cols-2 gap-6" variants={staggerCards}>

        {/* Key Benefits card — light mint, green accents */}
        <motion.div
          className="rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[80px] p-6 sm:p-10 lg:p-14"
          variants={cardItem}
          style={{ backgroundColor: "#dff0e6" }}>
          <h3
            className="font-bold text-2xl sm:text-3xl lg:text-[40px] mb-5 sm:mb-8"
            style={{ color: C.mid }}>
            {productUi.benefitsHeading}
          </h3>
          <ul className="flex flex-col gap-6">
            {product.benefits.map((b) => (
              <li key={b} className="flex items-start gap-4">
                <GreenLeaf />
                <span className="font-medium text-base lg:text-[17px] leading-relaxed text-[#213026]">{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Specifications card — light cream, amber accents */}
        <motion.div
          className="rounded-tl-[8px] rounded-tr-[80px] rounded-br-[8px] rounded-bl-[8px] p-6 sm:p-10 lg:p-14"
          variants={cardItem}
          style={{ backgroundColor: "#f5eedb" }}>
          <h3
            className="font-bold text-2xl sm:text-3xl lg:text-[40px] mb-5 sm:mb-8"
            style={{ color: C.amber }}>
            {productUi.specificationsHeading}
          </h3>
          <ul className="flex flex-col gap-6">
            {product.specifications.map((s) => (
              <li key={s} className="flex items-start gap-4">
                <AmberLeaf />
                <span className="font-medium text-base lg:text-[17px] leading-relaxed text-[#213026]">{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

// ─── More Products ────────────────────────────────────────────────────────────
function MoreProducts({ products, productUi }: { products: Product[]; productUi: SiteSettingsData["productUi"] }) {
  return (
    <motion.section
      className="w-full px-4 sm:px-8 lg:px-[44px] py-12 sm:py-20"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="lg:px-[106px] mb-10">
        <motion.div variants={fadeUp}>
          <SectionLeaf />
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="font-semibold text-[#213026] text-4xl sm:text-5xl lg:text-[72px] lg:leading-[1.15] mt-5">
          {productUi.moreProductsHeading}
        </motion.h2>
      </div>

      <motion.div className="flex flex-col xl:flex-row gap-5" variants={staggerCards}>
        {products.map((p) => (
          <div key={p.name} className="flex-1">
            <ProductCard p={p} exploreLabel={productUi.exploreLabel} />
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────
export default function ProductView({ product, otherProducts, siteSettings }: ProductViewProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.mint, backgroundImage: "url('/assets/leaf-pattern.svg')", backgroundSize: "100% auto", backgroundRepeat: "no-repeat", backgroundPosition: "top center" }}>
      <div className="max-w-[1880px] mx-auto px-5">
        <main className="flex flex-col">
          <ProductHero product={product} productUi={siteSettings.productUi} />
          <ProductOverview product={product} productUi={siteSettings.productUi} />
          <MoreProducts products={otherProducts} productUi={siteSettings.productUi} />
          <CTABanner {...siteSettings.ctaBanner} />
          <Footer siteSettings={siteSettings} />
        </main>
      </div>
    </div>
  );
}
