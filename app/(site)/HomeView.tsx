"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { SectionLeaf } from "../components/SectionLeaf";
import { CTABanner } from "../components/CTABanner";
import { Footer } from "../components/Footer";
import { ArrowRight, DownloadIcon } from "../components/Icons";
import { YellowBtn, WhiteBtn, MoreInfoBtn, TechSheetBtn } from "../components/Buttons";
import { fadeUp, fadeIn, fadeFromLeft, fadeFromRight, staggerContainer, staggerCards, cardItem, viewport, EXPO_EASE } from "../lib/motion";
import { C, HERO_BG, HOME_NAV_LINKS, SOLUTION_ICON_MAP } from "../lib/tokens";
import type { Product } from "../lib/products";
import { ProductCard } from "../components/ProductCard";
import type { HomePageData, SanityTestimonial, SiteSettingsData } from "../lib/sanity/queries";

// ─── Props ───────────────────────────────────────────────────────────────────

export type HomeViewProps = {
  homePage: HomePageData;
  products: Product[];
  testimonialSlides: SanityTestimonial[][];
  siteSettings: SiteSettingsData;
};

const SECTION_IDS = HOME_NAV_LINKS.map(l => l.id);

/** First item curves top-left, last curves bottom-right, middles are plain — a layout detail, not editorial content. */
function bookendRadius(i: number, length: number) {
  if (i === 0) return "80px 8px 8px 8px";
  if (i === length - 1) return "8px 8px 80px 8px";
  return "8px 8px 8px 8px";
}

// ─── Animation helpers ───────────────────────────────────────────────────────
// EXPO / SPRING are kept as CSS strings for the Hero + accordion CSS animations
const EXPO   = "cubic-bezier(0.16,1,0.3,1)";
const SPRING = "cubic-bezier(0.34,1.56,0.64,1)";

// ─── Section dots ────────────────────────────────────────────────────────────

function SectionDots({ navLabels }: { navLabels: SiteSettingsData["navLabels"] }) {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    // Use scroll position to determine which section is active — more reliable than IO
    const update = () => {
      const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
      let current: string = SECTION_IDS[0];
      for (const el of sections) {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.55) current = el.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const onDark = active === "hero";
  const inactiveColor = onDark ? "rgba(255,255,255,0.38)" : "rgba(33,48,38,0.22)";

  return (
    <div className="hidden lg:flex fixed right-7 top-1/2 -translate-y-1/2 z-40 flex-col gap-3.5 items-center">
      {HOME_NAV_LINKS.map(({ key, id }) => {
        const label = navLabels[key];
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            className="group relative flex items-center justify-end"
          >
            {/* Tooltip — appears to the left on hover */}
            <span className="absolute right-full mr-3 px-2.5 py-1 rounded-lg text-xs font-semibold
              text-[#f4fff8] bg-[#213026]/85 backdrop-blur-sm whitespace-nowrap
              opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
              translate-x-1 group-hover:translate-x-0">
              {label}
            </span>
            {/* Leaf-shaped dot */}
            <span
              className="block"
              style={{
                width: isActive ? 10 : 8,
                height: isActive ? 20 : 14,
                borderRadius: "2px 999px 2px 999px",
                background: isActive ? "#2dba5d" : inactiveColor,
                boxShadow: isActive ? "0 0 8px rgba(45,186,93,0.5)" : "none",
                transform: isActive ? "scale(1.1)" : "scale(1)",
                transition: `all 0.4s ${EXPO}`,
              }}
            />
          </a>
        );
      })}
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

// Persists across React remounts within the same tab session.
// Prevents entrance animations from replaying on browser back/forward.
let introPlayed = false;

// ─── Hero leaf parallax overlay ───────────────────────────────────────────────

function HeroLeaves({
  mouseX,
  mouseY,
  animated,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  animated: boolean;
}) {
  // Parallax: each leaf moves in the opposite direction of the mouse
  const l1x = useTransform(mouseX, v => v * -4);
  const l1y = useTransform(mouseY, v => v * -4);
  const l2x = useTransform(mouseX, v => v * -3);
  const l2y = useTransform(mouseY, v => v * -3);
  const l3x = useTransform(mouseX, v => v * -7);
  const l3y = useTransform(mouseY, v => v * -7);

  const flyIn = (xOff: number, yOff: number) =>
    animated
      ? { initial: { opacity: 0, x: xOff, y: yOff }, animate: { opacity: 1, x: 0, y: 0 } }
      : {};

  return (
    <div className="hidden lg:block" aria-hidden>
      {/* Left large — upper left, bleeds off edge */}
      <motion.div
        style={{ position: "absolute", pointerEvents: "none", left: "-4%", top: "12%", width: "clamp(120px, 17%, 240px)", zIndex: 10 }}
        {...flyIn(-44, 20)}
        transition={{ duration: 2, ease: EXPO_EASE, delay: 0.72 }}
      >
        <motion.img src="/assets/leaf-left-large.png" alt=""
          style={{ width: "100%", display: "block", opacity: 0.82, x: l1x, y: l1y }} />
      </motion.div>

      {/* Small left — lower left, balances bottom */}
      <motion.div
        style={{ position: "absolute", pointerEvents: "none", left: "6%", bottom: "10%", width: "clamp(50px, 7%, 90px)", zIndex: 10 }}
        {...flyIn(-44, 20)}
        transition={{ duration: 2, ease: EXPO_EASE, delay: 1.0 }}
      >
        <motion.img src="/assets/leaf-small-left.png" alt=""
          style={{ width: "100%", display: "block", opacity: 0.60, x: l1x, y: l1y }} />
      </motion.div>

      {/* Mid cluster — upper right */}
      <motion.div
        style={{ position: "absolute", pointerEvents: "none", right: "8%", top: "8%", width: "clamp(90px, 13%, 180px)", zIndex: 10 }}
        {...flyIn(0, -24)}
        transition={{ duration: 2, ease: EXPO_EASE, delay: 0.78 }}
      >
        <motion.img src="/assets/leaf-cluster-mid.png" alt=""
          style={{ width: "100%", display: "block", opacity: 0.72, x: l3x, y: l3y }} />
      </motion.div>

      {/* Tiny a — far right mid */}
      <motion.div
        style={{ position: "absolute", pointerEvents: "none", right: "2%", top: "42%", width: "clamp(44px, 6%, 80px)", zIndex: 20 }}
        {...flyIn(44, 0)}
        transition={{ duration: 2, ease: EXPO_EASE, delay: 0.92 }}
      >
        <motion.img src="/assets/leaf-tiny-a.png" alt=""
          style={{ width: "100%", display: "block", opacity: 0.58, x: l2x, y: l2y }} />
      </motion.div>

      {/* Tiny b — lower right, rotated */}
      <motion.div
        style={{ position: "absolute", pointerEvents: "none", right: "10%", bottom: "10%", width: "clamp(44px, 6%, 80px)", zIndex: 20 }}
        {...flyIn(44, 20)}
        transition={{ duration: 2, ease: EXPO_EASE, delay: 0.85 }}
      >
        <motion.img src="/assets/leaf-tiny-b.png" alt=""
          style={{ width: "100%", display: "block", opacity: 0.68, transform: "rotate(16deg)", x: l2x, y: l2y }} />
      </motion.div>
    </div>
  );
}

function Hero({
  testimonialSlides,
  badgeText,
  titleLine1,
  titleLine2,
  titleLine3,
  subtitleLine1,
  subtitleLine2,
  ctaLabel,
}: {
  testimonialSlides: SanityTestimonial[][];
  badgeText: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  subtitleLine1: string;
  subtitleLine2: string;
  ctaLabel: string;
}) {
  const [slide, setSlide]     = useState(0);
  const [slideKey, setSlideKey] = useState(0);
  // Capture whether this is the first play before marking it done
  const [isFirstPlay] = useState(() => !introPlayed);

  useEffect(() => {
    const id = setTimeout(() => { introPlayed = true; }, 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % testimonialSlides.length), 5000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideKey]);

  const goSlide = useCallback((i: number) => {
    setSlide(i);
    setSlideKey((k) => k + 1);
  }, []);

  // Pure CSS entrance — skipped on revisits so back/forward navigation is instant
  const enter = (delay: number): React.CSSProperties => isFirstPlay
    ? { animation: `hero-enter 1.3s ${EXPO} ${delay}ms both` }
    : {};

  // Editorial title: each line clips up from below an overflow-hidden container
  const lineReveal = (delay: number): React.CSSProperties => isFirstPlay
    ? { display: "block", animation: `text-reveal 1.1s ${EXPO} ${delay}ms both` }
    : { display: "block" };

  // Subtitle blur drift
  const blurIn = (delay: number): React.CSSProperties => isFirstPlay
    ? { animation: `text-blur-in 0.9s ${EXPO} ${delay}ms both` }
    : {};

  // CTA spring stamp
  const stampIn = (delay: number): React.CSSProperties => isFirstPlay
    ? { animation: `btn-stamp 0.85s ${SPRING} ${delay}ms both` }
    : {};

  return (
    <section
      id="hero"
      className="relative overflow-hidden flex flex-col"
      style={isFirstPlay ? {
        animation: `hero-frame 2.2s cubic-bezier(0.16,1,0.3,1) 600ms both, hero-rim 1.4s ease 2400ms both`,
        willChange: "border-radius, margin, width, min-height",
      } : {
        borderRadius: "8px 80px 8px 80px",
        marginTop: "1rem",
        marginBottom: "1rem",
        minHeight: "calc(100svh - 2rem)",
      }}
    >
      {/* Background — Ken Burns zoom out via CSS animation */}
      <Image
        src={HERO_BG}
        alt="Green terraced hillside fields"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={isFirstPlay ? { animation: `hero-zoom 12s ${EXPO} both`, willChange: "transform" } : {}}
      />

      {/* Gradient overlay — fades in cinematically on first load, then static */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(33,48,38,0.10) 0%, rgba(33,48,38,0.30) 38%, rgba(33,48,38,0.76) 68%, rgba(33,48,38,0.93) 100%)",
          ...(isFirstPlay ? { animation: "overlay-in 1.6s ease 300ms both" } : {}),
        }}
      />

      {/* Ambient radial glow — soft green light sourced behind the headline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 42% at 50% 36%, rgba(45,186,93,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Main content — vertically centered in the flex column */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-10">

        {/* Eyebrow badge */}
        <div
          style={{
            ...enter(560),
            backdropFilter: "blur(10px)",
          }}
          className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 mb-8"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#2dba5d] shrink-0"
            style={{ animation: "pulse-ring 2s ease-out infinite" }}
          />
          <span className="text-[#f4fff8]/75 text-[10px] sm:text-[11px] font-semibold tracking-[0.12em] sm:tracking-[0.18em] uppercase select-none whitespace-nowrap">
            {badgeText}
          </span>
        </div>

        <h1
          className="mb-5 max-w-5xl tracking-tight text-center"
        >
          {/* PGPR — clean oversized entrance */}
          <span style={{ display: "block", lineHeight: 1, overflow: "hidden", paddingBottom: "0.04em" }}>
            <span
              style={{
                display: "block",
                fontSize: "clamp(5rem, 20vw, 140px)",
                fontWeight: 700,
                color: "#f4fff8",
                ...(isFirstPlay ? { animation: `text-reveal 0.9s ${EXPO} 700ms both` } : {}),
              }}
            >
              {titleLine1}
            </span>
          </span>

          {/* Technologies — wide tracking, semi-transparent divider line */}
          <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em", marginTop: "0.1em" }}>
            <span
              style={{
                display: "block",
                fontSize: "clamp(0.85rem, 2.8vw, 1.75rem)",
                fontWeight: 600,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(244,255,248,0.55)",
                textShadow: "0 1px 12px rgba(0,0,0,0.3)",
                ...(isFirstPlay ? { animation: `text-reveal 0.9s ${EXPO} 1060ms both` } : {}),
              }}
            >
              {titleLine2}
            </span>
          </span>

          {/* The Future of Bio */}
          <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.12em", marginTop: "0.3em" }}>
            <span
              style={{
                display: "block",
                fontSize: "clamp(1.6rem, 5.5vw, 3.5rem)",
                fontWeight: 600,
                color: "#f4fff8",
                textShadow: "0 2px 24px rgba(0,0,0,0.32)",
                ...(isFirstPlay ? { animation: `text-reveal 1.0s ${EXPO} 1200ms both` } : {}),
              }}
            >
              {titleLine3}
            </span>
          </span>
        </h1>

        <p
          style={blurIn(1160)}
          className="text-[#f4fff8]/80 font-medium text-lg lg:text-[22px] max-w-xl mb-10 leading-relaxed"
        >
          {subtitleLine1}
          <br className="hidden lg:block" />
          {subtitleLine2}
        </p>

        <div style={stampIn(1360)} className="flex flex-col items-center gap-3 mb-6 md:mb-14">
          <div style={{ animation: "pulse-glow 3s ease-in-out 2.6s infinite", borderRadius: "9999px" }}>
            <YellowBtn label={ctaLabel} href="/contact" large />
          </div>
        </div>

        {/* Testimonials — hidden on mobile to keep hero within one screen */}
        <div
          className="hidden md:block relative max-w-5xl w-full md:min-h-55"
        >
          {testimonialSlides.map((cards, si) => (
            <div
              key={si}
              className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-4 content-start"
              style={{
                opacity: slide === si ? 1 : 0,
                transform: slide === si ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                pointerEvents: slide === si ? "auto" : "none",
              }}
            >
              {cards.map((t, i) => (
                <motion.div
                  key={i}
                  className="rounded-2xl px-6 py-5 text-left relative overflow-hidden"
                  initial={isFirstPlay && si === 0 ? { opacity: 0, y: 20 } : false}
                  animate={isFirstPlay && si === 0 ? { opacity: 1, y: 0 } : undefined}
                  transition={isFirstPlay && si === 0 ? { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: (1550 + i * 150) / 1000 } : undefined}
                  style={{
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.055) 100%)",
                    border: "1px solid rgba(255,255,255,0.13)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 32px rgba(0,0,0,0.10)",
                  }}
                >
                  {/* Gradient top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[1.5px]"
                    style={{ background: "linear-gradient(90deg, transparent 0%, rgba(45,186,93,0.65) 25%, rgba(45,186,93,0.65) 75%, transparent 100%)" }}
                  />
                  {/* Decorative large quote mark */}
                  <span
                    className="absolute top-3 right-4 text-5xl leading-none font-serif select-none pointer-events-none"
                    style={{ color: "rgba(45,186,93,0.18)" }}
                    aria-hidden
                  >&ldquo;</span>
                  <p className="text-[#f4fff8]/82 text-[14px] lg:text-[15px] leading-relaxed mb-4 pr-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={44}
                      height={44}
                      className="w-11 h-11 rounded-full object-cover shrink-0"
                      style={{ boxShadow: "0 0 0 2px rgba(45,186,93,0.35)" }}
                    />
                    <div>
                      <p className="text-[#f4fff8] font-semibold text-[13px] leading-tight">{t.name}</p>
                      <p className="text-[#f4fff8]/55 text-[12px] mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar: progress controls + scroll cue — clean single row, no overlap */}
      <div
        className="relative z-10 flex items-center justify-center md:justify-between px-8 lg:px-16 pb-10 pt-4"
        style={enter(1820)}
      >
        <div className="hidden md:flex items-center gap-4">
          <div className="flex gap-3">
            {testimonialSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className="relative w-28 h-[3px] rounded-full bg-white/25 overflow-hidden"
              >
                {slide === i && (
                  <span
                    key={`fill-${slideKey}-${i}`}
                    className="absolute inset-0 rounded-full bg-[#ffb800] origin-left"
                    style={{ animation: "bar-fill 5s linear forwards" }}
                  />
                )}
              </button>
            ))}
          </div>
          <span className="text-white/35 text-xs font-semibold tabular-nums select-none">
            {String(slide + 1).padStart(2, "0")} / {String(testimonialSlides.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5 pointer-events-none">
          <span className="text-white/40 text-[10px] font-semibold tracking-[0.2em] uppercase select-none">Scroll</span>
          <svg
            width={18} height={18} viewBox="0 0 18 18" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="text-white/40"
            style={{ animation: "bounce-y 2s ease-in-out infinite 2s" }}
          >
            <path d="M4 7l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// ─── Sustainable ─────────────────────────────────────────────────────────────

function SustainableSection({ heading, sustainTabs }: { heading: string; sustainTabs: HomePageData["sustainTabs"] }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <motion.section
      id="sustainable"
      className="w-full px-4 sm:px-8 lg:px-[97px] py-10 lg:py-20"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <motion.div variants={fadeUp} className="mb-8">
        <SectionLeaf />
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="font-semibold text-[#213026] text-3xl sm:text-4xl lg:text-[84px] lg:leading-[1.15] mb-6 sm:mb-8 lg:mb-[90px] max-w-[900px]">
        {heading}
      </motion.h2>

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 lg:items-start">
        {/* Tab list */}
        <motion.div variants={fadeUp} className="w-full lg:max-w-[560px] relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[#d8e8dc]" />
          {sustainTabs.map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)}
              className="block w-full text-left pl-6 sm:pl-14 py-1.5 relative group">
              {/* Active bar */}
              <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#255c38] rounded-full transition-all duration-300"
                style={{ opacity: activeTab === i ? 1 : 0, transform: activeTab === i ? "scaleY(1)" : "scaleY(0.3)" }} />
              <span className="block font-semibold text-xl lg:text-[30px] lg:leading-[60px] transition-all duration-300"
                style={{ color: C.mid, opacity: activeTab === i ? 1 : 0.32 }}>
                {tab.title}
              </span>
              <div className="overflow-hidden transition-all duration-500"
                style={{ maxHeight: activeTab === i ? "200px" : "0px", opacity: activeTab === i ? 1 : 0 }}>
                <p className="text-[#696969] font-medium text-base leading-[1.85] mt-1 pb-3 max-w-[540px]">
                  {tab.desc}
                </p>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Image — crossfades per tab */}
        <motion.div
          variants={fadeFromRight}
          className="flex-1 rounded-tl-[8px] rounded-tr-[80px] rounded-br-[8px] rounded-bl-[8px] overflow-hidden relative"
          style={{ minHeight: 220, height: "clamp(220px, 40vw, 449px)" }}>
          {sustainTabs.map((tab, i) => (
            <Image key={i} src={tab.image} alt={tab.title}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority={i === 0}
              className="object-cover"
              style={{
                opacity: activeTab === i ? 1 : 0,
                transform: activeTab === i ? "scale(1)" : "scale(1.04)",
                transition: "opacity 0.55s ease-in-out, transform 0.65s cubic-bezier(0.16,1,0.3,1)",
              }} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

// ─── Products ────────────────────────────────────────────────────────────────

function ProductsSection({
  products,
  productsHeading,
  productsSubheading,
  productUi,
}: {
  products: Product[];
  productsHeading: string;
  productsSubheading: string;
  productUi: SiteSettingsData["productUi"];
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  // Which card is "active": the hovered one, defaulting to first when none hovered
  const expanded = hovered ?? 0;

  return (
    <motion.section
      id="products"
      className="w-full px-4 sm:px-8 lg:px-[44px] py-10 lg:py-20"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="lg:px-[106px] mb-6 lg:mb-10">
        <motion.div variants={fadeUp}>
          <SectionLeaf />
        </motion.div>
        <motion.div variants={fadeUp} className="mt-5">
          <h2 className="font-semibold text-[#213026] text-3xl sm:text-4xl lg:text-[84px] lg:leading-[1.15]">
            {productsHeading}
          </h2>
          <p className="hidden lg:block text-[#696969] font-medium text-lg mt-3 opacity-70">
            {productsSubheading}
          </p>
        </motion.div>
      </div>

      {/* Mobile: desktop-style card — bottle right, content left, full card is a link */}
      <motion.div variants={staggerCards} className="flex xl:hidden flex-col gap-5">
        {products.map((p) => (
          <ProductCard key={p.name} p={p} exploreLabel={productUi.exploreLabel} />
        ))}
      </motion.div>
      <motion.div
        variants={fadeIn}
        className="hidden xl:flex gap-5"
        style={{ minHeight: "min(520px, 60vw)" }}
        onMouseLeave={() => setHovered(null)}
      >
        {products.map((p, i) => {
          const isExpanded = expanded === i;
          return (
            <div
              key={p.name}
              onMouseEnter={() => setHovered(i)}
              className={`relative overflow-hidden cursor-pointer ${p.rounded}`}
              style={{
                backgroundImage: p.bg,
                flex: isExpanded ? "2.4 1 0%" : "0.7 1 0%",
                minHeight: "min(380px, 45vw)",
                minWidth: 0,
                boxShadow: isExpanded
                  ? "0 28px 80px rgba(33,48,38,0.38)"
                  : "0 4px 20px rgba(33,48,38,0.12)",
                transition: [
                  `flex 0.62s ${EXPO}`,
                  "box-shadow 0.4s ease",
                ].join(", "),
              }}
            >
              {/* Floating bottle — slides out to right when collapsed */}
              <img
                src={p.bottle}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute right-0 bottom-0 w-auto object-contain pointer-events-none"
                style={{
                  height: "115%",
                  opacity: isExpanded ? 1 : 0.45,
                  transform: isExpanded ? "translateX(0%) translateY(8%)" : "translateX(35%) translateY(8%)",
                  transition: `opacity 0.5s ease, transform 0.62s ${EXPO}`,
                }}
              />

              {/* Collapsed view: product name */}
              <div
                className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-9 px-4"
                style={{
                  opacity: isExpanded ? 0 : 1,
                  transition: "opacity 0.2s ease",
                  pointerEvents: isExpanded ? "none" : "auto",
                }}
              >
                <div
                  className="rounded-full mb-3 shrink-0"
                  style={{ width: 28, height: 3, background: p.accent }}
                />
                <p
                  className="font-bold text-base tracking-[0.14em] uppercase text-center w-full"
                  style={{ color: p.darkText ? C.dark : "#f4fff8" }}
                >
                  {p.name}
                </p>
              </div>

              {/* Expanded view: full content */}
              <div
                className="absolute inset-0 z-10 flex flex-col justify-between p-9"
                style={{
                  maxWidth: 500,
                  opacity: isExpanded ? 1 : 0,
                  transform: isExpanded ? "none" : "translateY(14px)",
                  transition: `opacity 0.32s ease ${isExpanded ? "0.18s" : "0s"}, transform 0.48s ${EXPO} ${isExpanded ? "0.12s" : "0s"}`,
                  pointerEvents: isExpanded ? "auto" : "none",
                }}
              >
                <div>
                  <p className="font-bold text-5xl xl:text-[62px] leading-none" style={{ color: p.darkText ? C.dark : "#f4fff8" }}>
                    {p.name}
                  </p>
                  <p className="font-semibold text-xl xl:text-[26px] leading-snug mt-2" style={{ color: p.darkText ? C.mid : "rgba(244,255,248,0.85)" }}>
                    {p.subtitle}
                  </p>
                </div>

                <p className="font-medium text-sm xl:text-base leading-relaxed" style={{ color: p.darkText ? C.mid : "rgba(244,255,248,0.8)" }}>
                  {p.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {p.stats.map((s) => (
                    <span
                      key={s}
                      className="text-xs font-bold rounded-full px-3 py-1.5 whitespace-nowrap"
                      style={{
                        color: p.darkText ? C.dark : "#f4fff8",
                        border: p.darkText ? `1px solid rgba(33,48,38,0.25)` : "1px solid rgba(255,255,255,0.25)",
                        background: p.darkText ? "rgba(33,48,38,0.12)" : "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 flex-wrap items-center">
                  <MoreInfoBtn accent={p.accent} href={`/products/${p.slug}`} label={productUi.moreInfoLabel} />
                  <TechSheetBtn label={productUi.techSheetLabel} />
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}

// ─── Solutions ───────────────────────────────────────────────────────────────

function solutionHref(s: HomePageData["solutions"][number]) {
  return s.ctaTarget === "contact" ? "/contact" : s.externalHref;
}

function SolutionsSection({ heading, solutions }: { heading: string; solutions: HomePageData["solutions"] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.section
      id="solutions"
      className="w-full px-4 sm:px-8 lg:px-20 py-10 lg:py-20"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <motion.div variants={fadeUp} className="mb-6 lg:mb-12">
        <SectionLeaf />
        <h2 className="font-semibold text-[#213026] text-3xl sm:text-4xl lg:text-[84px] lg:leading-[1.15] mt-5">
          {heading}
        </h2>
      </motion.div>

      {/* Desktop: 4 expanding horizontal panels */}
      <motion.div
        variants={fadeIn}
        className="hidden xl:flex gap-4 h-[620px]"
        onMouseLeave={() => setHovered(null)}
      >
        {solutions.map((s, i) => {
          const isExpanded = hovered === i;
          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              className="relative overflow-hidden cursor-pointer"
              style={{
                flex: isExpanded ? "3.2 1 0%" : "1 1 0%",
                minWidth: 0,
                borderRadius: bookendRadius(i, solutions.length),
                transition: `flex 0.6s ${EXPO}, border-radius 0.6s ${EXPO}`,
              }}
            >
              {/* Photo */}
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  transform: isExpanded ? "scale(1.04)" : "scale(1.14)",
                  transition: `transform 0.7s ${EXPO}`,
                }}
              />

              {/* Dark overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: isExpanded
                    ? "linear-gradient(160deg, rgba(0,0,0,0.52) 0%, rgba(33,48,38,0.48) 100%)"
                    : "linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.72) 100%)",
                  transition: "background 0.5s ease",
                }}
              />

              {/* Collapsed state: title + small icon */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-end pb-10 z-10"
                style={{
                  opacity: isExpanded ? 0 : 1,
                  transition: "opacity 0.2s ease",
                  pointerEvents: isExpanded ? "none" : "auto",
                }}
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#ffb800] mb-4 shrink-0">
                  <Image src={SOLUTION_ICON_MAP[s.iconKey]} alt="" width={20} height={20} className="w-5 h-5 object-contain" />
                </div>
                <p
                  className="font-bold text-[#f4fff8] text-sm tracking-[0.12em] uppercase text-center px-3 w-full leading-relaxed"
                >
                  {s.title}
                </p>
              </div>

              {/* Expanded state: full content */}
              <div
                className="absolute inset-0 z-10 flex flex-col justify-end p-10"
                style={{
                  opacity: isExpanded ? 1 : 0,
                  transform: isExpanded ? "none" : "translateY(18px)",
                  transition: `opacity 0.35s ease ${isExpanded ? "0.18s" : "0s"}, transform 0.48s ${EXPO} ${isExpanded ? "0.12s" : "0s"}`,
                  pointerEvents: isExpanded ? "auto" : "none",
                }}
              >
                <div className="flex items-center justify-center w-[68px] h-[68px] rounded-full bg-[#ffb800] mb-6 shrink-0">
                  <Image src={SOLUTION_ICON_MAP[s.iconKey]} alt="" width={32} height={32} className="w-8 h-8 object-contain" />
                </div>
                <h3 className="font-bold text-[#f4fff8] text-3xl xl:text-[38px] mb-3 leading-tight">
                  {s.title}
                </h3>
                <p className="text-[#f4fff8]/85 font-medium text-base xl:text-[18px] leading-relaxed mb-7 max-w-[380px]">
                  {s.desc}
                </p>
                <WhiteBtn label={s.ctaLabel} href={solutionHref(s)} />
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Mobile: stacked cards (< xl) */}
      <motion.div variants={staggerCards} className="xl:hidden grid grid-cols-1 sm:grid-cols-2 gap-5">
        {solutions.map((s, i) => (
          <motion.div
            key={i}
            variants={cardItem}
            className="flex flex-col overflow-hidden"
            style={{
              borderRadius: bookendRadius(i, solutions.length),
              boxShadow: "0 4px 24px rgba(33,48,38,0.10)",
            }}
          >
            {/* Image zone */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <Image src={s.image} alt={s.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(33,48,38,0.45) 100%)" }} />
            </div>
            {/* Content strip */}
            <div className="flex flex-col gap-3 px-5 pt-4 pb-5" style={{ background: C.dark }}>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ffb800] shrink-0">
                  <Image src={SOLUTION_ICON_MAP[s.iconKey]} alt="" width={20} height={20} className="w-5 h-5 object-contain" />
                </div>
                <h3 className="font-bold text-[#f4fff8] text-lg leading-snug">{s.title}</h3>
              </div>
              <p className="text-[#f4fff8]/70 font-medium text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-1">
                <WhiteBtn label={s.ctaLabel} href={solutionHref(s)} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

// ─── Technology ──────────────────────────────────────────────────────────────

function TechnologySection({ heading, techItems }: { heading: string; techItems: HomePageData["techItems"] }) {
  const [current, setCurrent] = useState(0);
  const [autoKey, setAutoKey] = useState(0);
  const touchStartX = useRef(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % techItems.length), 3500);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoKey]);

  const goTo = (i: number) => { setCurrent(i); setAutoKey((k) => k + 1); };

  const circleBtn = `flex items-center justify-center w-[62px] h-[62px] rounded-full border-2 border-[#255c38]
    text-[#255c38] hover:bg-[#255c38] hover:text-white hover:scale-[1.05] active:scale-95 transition-all duration-200`;

  const item = techItems[current];

  return (
    <motion.section
      id="technology"
      className="w-full px-4 sm:px-8 lg:px-20 py-10 lg:py-20"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <motion.div variants={fadeUp}>
        <SectionLeaf />
        <h2 className="font-semibold text-[#213026] text-3xl sm:text-4xl lg:text-[84px] lg:leading-[1.15] mt-5 mb-8 lg:mb-14">
          {heading}
        </h2>
      </motion.div>

      {/* ── Mobile layout (< lg): image first, text below ─────────────── */}
      <motion.div variants={fadeUp} className="lg:hidden">
        {/* Swipeable card */}
        <div
          className="relative overflow-hidden select-none"
          style={{ aspectRatio: "4/3", touchAction: "pan-y", borderRadius: bookendRadius(current, techItems.length), transition: `border-radius 0.6s ${EXPO}` }}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (dx < -40) goTo((current + 1) % techItems.length);
            else if (dx > 40) goTo((current - 1 + techItems.length) % techItems.length);
          }}
        >
          {techItems.map((t, i) => (
            <Image key={i} src={t.image} alt={t.label} fill
              sizes="100vw"
              className="object-cover transition-opacity duration-500"
              style={{ opacity: i === current ? 1 : 0 }} />
          ))}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent 55%, rgba(33,48,38,0.55) 100%)" }} />
          <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-[#2dba5d]"
            style={{ animation: "pulse-ring 1.4s ease-out infinite" }} />
          {/* counter badge */}
          <div className="absolute bottom-4 right-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="font-semibold text-white/80 text-xs tabular-nums">
              {current + 1} / {techItems.length}
            </span>
          </div>
        </div>

        {/* Dynamic label + description */}
        <div className="mt-5 mb-5">
          <p className="font-bold text-[#213026] text-lg leading-snug mb-2">{item.label}</p>
          <p className="text-[#696969] font-medium text-sm leading-relaxed">{item.desc}</p>
        </div>

        {/* Pills + prev/next */}
        <div className="flex items-center gap-3">
          <button onClick={() => goTo((current - 1 + techItems.length) % techItems.length)}
            aria-label="Previous"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-[#255c38] text-[#255c38] hover:bg-[#255c38] hover:text-white active:scale-95 transition-all duration-200">
            <span className="rotate-180 block"><ArrowRight size={14} /></span>
          </button>
          <div className="flex gap-2 flex-1 justify-center">
            {techItems.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Technology ${i + 1}`}
                className="h-1 rounded-full transition-all duration-350"
                style={{ width: current === i ? 36 : 10, backgroundColor: current === i ? C.mid : "#c0d6c8" }} />
            ))}
          </div>
          <button onClick={() => goTo((current + 1) % techItems.length)}
            aria-label="Next"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-[#255c38] text-[#255c38] hover:bg-[#255c38] hover:text-white active:scale-95 transition-all duration-200">
            <ArrowRight size={14} />
          </button>
        </div>
      </motion.div>

      {/* ── Desktop layout (lg+): left text + right image grid ────────── */}
      <motion.div variants={fadeUp} className="hidden lg:flex gap-16 items-start">
        {/* Left */}
        <div className="flex-none w-[380px] flex flex-col justify-between" style={{ minHeight: "clamp(280px, 28vw, 480px)" }}>
          <p className="text-[#696969] font-medium text-xl xl:text-2xl leading-relaxed" key={current}>
            {item.desc}
          </p>
          <div className="flex gap-3 mt-10">
            <button onClick={() => goTo((current - 1 + techItems.length) % techItems.length)}
              aria-label="Previous" className={circleBtn}>
              <span className="rotate-180 block"><ArrowRight size={18} /></span>
            </button>
            <button onClick={() => goTo((current + 1) % techItems.length)}
              aria-label="Next" className={circleBtn}>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Right — 3-column image grid */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-3 gap-4 xl:gap-5">
            {techItems.map((t, i) => (
              <div key={i} onClick={() => goTo(i)}
                className="relative overflow-hidden cursor-pointer"
                style={{
                  height: "clamp(220px, 26vw, 460px)",
                  borderRadius: bookendRadius(i, techItems.length),
                  opacity: current === i ? 1 : 0.52,
                  transform: current === i ? "scale(1.03)" : "scale(1)",
                  boxShadow: current === i
                    ? "0 24px 64px rgba(45,186,93,0.24)"
                    : "none",
                  transition: `border-radius 0.6s ${EXPO}, opacity 0.5s ${EXPO}, transform 0.5s ${EXPO}, box-shadow 0.5s ease`,
                }}>
                <Image src={t.image} alt={t.label} fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700"
                  style={{ transform: current === i ? "scale(1.06)" : "scale(1)", willChange: "transform" }} />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, rgba(45,186,93,0) 46%, rgba(45,186,93,0.62) 97%)" }} />
                {current === i && (
                  <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#2dba5d]"
                    style={{ animation: "pulse-ring 1.4s ease-out infinite" }} />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-5 mb-3">
            {techItems.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Technology ${i + 1}`}
                className="h-[5px] rounded-full transition-all duration-350"
                style={{ width: current === i ? 44 : 13, backgroundColor: current === i ? C.mid : "#c0d6c8" }} />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 xl:gap-5">
            {techItems.map((t, i) => (
              <p key={i}
                className="font-bold text-sm xl:text-base text-center leading-snug transition-all duration-300"
                style={{ color: C.mid, opacity: current === i ? 1 : 0.35 }}>
                {t.label}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

// ─── Pioneering ──────────────────────────────────────────────────────────────

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    let current = 0;
    const t = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(t); }
      else setCount(current);
    }, 16);
    return () => clearInterval(t);
  }, [target, duration, active]);
  return count;
}

const PIE_STATS = [
  { value: 3, suffix: "", label: "Innovative Bio Products" },
];

function StatCounter({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCountUp(value, 1400, active);
  return (
    <div className="flex flex-col items-center text-center">
      <span className="font-bold text-[#255c38] text-4xl lg:text-5xl leading-none tabular-nums">
        {count}{suffix}
      </span>
      <span className="text-[#696969] font-medium text-sm lg:text-base mt-2 leading-snug">{label}</span>
    </div>
  );
}

function PioneeringSection({ pioneering }: { pioneering: HomePageData["pioneering"] }) {
  return (
    <motion.section
      id="pioneering"
      className="w-full relative isolation-isolate"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer}
    >
      {/* Decorative leaf overlays — outside overflow so they aren't clipped */}
      <Image src="/assets/yellow-leaf1.svg" alt="" aria-hidden width={220} height={220}
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{ right: "-5%", bottom: "-12%", width: "22%", height: "auto", zIndex: 20, opacity: 0.28 }} />
      <Image src="/assets/yellow-leaf2.svg" alt="" aria-hidden width={90} height={90}
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{ right: "-1%", top: "4%", width: "9%", height: "auto", zIndex: 20, opacity: 0.22 }} />
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 py-4 lg:py-6 lg:max-h-[calc(100dvh-200px)]">
        {/* Image */}
        <motion.div
          variants={fadeFromLeft}
          className="relative overflow-hidden rounded-tl-[80px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[8px]
            lg:w-[44%] min-h-[260px] lg:min-h-0 shrink-0 bg-[#d8edd7]">
          <Image src={pioneering.image} alt="Bio farming pioneer" fill
            sizes="(max-width: 1024px) 100vw, 44vw"
            className="object-cover hover:scale-[1.03] transition-transform duration-700" />
        </motion.div>

        {/* Text */}
        <motion.div
          variants={fadeFromRight}
          className="flex-1 bg-[#eef8f1] rounded-tl-[8px] rounded-tr-[80px] rounded-br-[8px] rounded-bl-[8px]
            px-6 lg:pl-[48px] lg:pr-[56px] py-8 lg:pt-[40px] lg:pb-[36px] flex flex-col justify-center gap-4">
          <SectionLeaf />
          <h2 className="font-semibold text-[#213026] text-2xl sm:text-3xl lg:text-[44px] lg:leading-[1.2]">
            {pioneering.heading}
          </h2>
          <div className="text-[#696969] font-medium text-sm lg:text-base leading-relaxed space-y-3">
            <p>{pioneering.paragraph1}</p>
            <p>{pioneering.paragraph2}</p>
          </div>
          <YellowBtn label="Learn more about us" href="/about" />
        </motion.div>
      </div>
    </motion.section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function HeroWrapper({ hero, testimonialSlides }: {
  hero: HomePageData["hero"];
  testimonialSlides: SanityTestimonial[][];
}) {
  const [isFirstPlay] = useState(() => !introPlayed);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        mouseX.set((e.clientX - r.left) / r.width  - 0.5);
        mouseY.set((e.clientY - r.top)  / r.height - 0.5);
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, [mouseX, mouseY]);

  return (
    <div ref={wrapRef} className="relative">
      <HeroLeaves mouseX={mouseX} mouseY={mouseY} animated={isFirstPlay} />
      <Hero
        testimonialSlides={testimonialSlides}
        badgeText={hero.badgeText}
        titleLine1={hero.titleLine1}
        titleLine2={hero.titleLine2}
        titleLine3={hero.titleLine3}
        subtitleLine1={hero.subtitleLine1}
        subtitleLine2={hero.subtitleLine2}
        ctaLabel={hero.ctaLabel}
      />
    </div>
  );
}

export default function HomeView({ homePage, products, testimonialSlides, siteSettings }: HomeViewProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f4fff8", backgroundImage: "url('/assets/leaf-pattern.svg')", backgroundSize: "100% auto", backgroundRepeat: "no-repeat", backgroundPosition: "top center" }}>
      <SectionDots navLabels={siteSettings.navLabels} />
      <div className="max-w-[1880px] mx-auto px-5">
        <main className="flex flex-col gap-14 lg:gap-[130px]">
          <HeroWrapper hero={homePage.hero} testimonialSlides={testimonialSlides} />
          <SustainableSection heading={homePage.sustainableHeading} sustainTabs={homePage.sustainTabs} />
          <ProductsSection
            products={products}
            productsHeading={homePage.productsHeading}
            productsSubheading={homePage.productsSubheading}
            productUi={siteSettings.productUi}
          />
          <SolutionsSection heading={homePage.solutionsHeading} solutions={homePage.solutions} />
          <TechnologySection heading={homePage.technologyHeading} techItems={homePage.techItems} />
          <PioneeringSection pioneering={homePage.pioneering} />
          <CTABanner {...siteSettings.ctaBanner} />
        </main>
        <Footer siteSettings={siteSettings} />
      </div>
    </div>
  );
}
