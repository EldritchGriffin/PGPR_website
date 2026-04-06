"use client";

import { useParams, notFound } from "next/navigation";
import { useState, useEffect, useRef } from "react";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  mint:  "#f4fff8",
  dark:  "#213026",
  mid:   "#255c38",
  green: "#2dba5d",
  amber: "#ffb800",
  gray:  "#696969",
} as const;

// ─── Assets ───────────────────────────────────────────────────────────────────
const BAIOLIZER_BOTTLE  = "/assets/baiolizer-bottle.svg";
const CHITOGREEN_BOTTLE = "/assets/chitogreen-bottle.svg";
const TERRAHUMUS_BOTTLE = "/assets/terrahumus-bottle.svg";
const BAIOLIZER_LARGE   = "/assets/baiolizer-bottle.svg";
const CHITOGREEN_LARGE  = "/assets/chitogreen-bottle.svg";
const TERRAHUMUS_LARGE  = "/assets/terrahumus-bottle.svg";
const LOGO_GLYPH        = "/assets/logo-glyph.svg";
const LOGO_TEXT         = "/assets/logo-text.svg";
const LOGO_GLYPH_LIGHT  = "/assets/logo-glyph-light.svg";
const LOGO_TEXT_LIGHT   = "/assets/logo-text-light.svg";
const SOCIAL_ICONS      = "/assets/social-icons.svg";

// ─── Animation helpers ────────────────────────────────────────────────────────
const EXPO   = "cubic-bezier(0.16,1,0.3,1)";
const SPRING = "cubic-bezier(0.34,1.56,0.64,1)";

// Prevents scroll-reveal sections from staying invisible on browser back/forward
let pageVisited = false;

function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(() => pageVisited);
  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    // Immediate check — covers back/forward navigation
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function fade(visible: boolean, delay = 0, dy = 22): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : `translateY(${dy}px)`,
    transition: `opacity 0.85s ${EXPO} ${delay}ms, transform 0.85s ${EXPO} ${delay}ms`,
  };
}

// ─── Shared UI components ─────────────────────────────────────────────────────
function ArrowRight({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function DownloadIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

function SectionLeaf({ visible = true, delay = 0 }: { visible?: boolean; delay?: number }) {
  return (
    <div
      className="w-[117px] h-[72px] rounded-tl-[8px] rounded-tr-[80px] rounded-br-[8px] rounded-bl-[80px] bg-[#2dba5d] shrink-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.45) rotate(-8deg)",
        transition: `opacity 0.5s ${EXPO} ${delay}ms, transform 0.65s ${SPRING} ${delay}ms`,
      }}
    />
  );
}

function YellowBtn({ label, onClick, href }: { label: string; onClick?: () => void; href?: string }) {
  const cls = "inline-flex items-center gap-5 bg-[#ffb800] rounded-[52px] pl-6 pr-[5px] py-[5px] font-bold text-[#213026] text-base hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group shrink-0";
  const inner = (
    <>
      <span>{label}</span>
      <span className="flex items-center justify-center w-16 h-16 rounded-full bg-[#f4fff8] group-hover:bg-white transition-colors shrink-0">
        <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </>
  );
  if (href) return <a href={href} className={cls}>{inner}</a>;
  return <button onClick={onClick} className={cls}>{inner}</button>;
}

function GhostBtn({ label }: { label: string }) {
  return (
    <button
      className="inline-flex items-center gap-3 bg-white/12 text-[#f4fff8] font-semibold text-base
        px-6 py-4 rounded-[52px] border border-white/25 hover:bg-white/22 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
      <DownloadIcon size={18} /> {label}
    </button>
  );
}

// Dark-bg variants for products with light/yellow hero backgrounds
function DarkBtn({ label, href }: { label: string; href?: string }) {
  const cls = "inline-flex items-center gap-5 bg-[#213026] rounded-[52px] pl-6 pr-[5px] py-[5px] font-bold text-[#f4fff8] text-base hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200";
  const inner = (
    <>
      {label}
      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f4fff8]">
        <ArrowRight size={18} className="text-[#213026]" />
      </span>
    </>
  );
  if (href) return <a href={href} className={cls}>{inner}</a>;
  return <button className={cls}>{inner}</button>;
}

function DarkGhostBtn({ label }: { label: string }) {
  return (
    <button
      className="inline-flex items-center gap-3 bg-[#213026]/10 text-[#213026] font-semibold text-base
        px-6 py-4 rounded-[52px] border border-[#213026]/30 hover:bg-[#213026]/18 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
      <DownloadIcon size={18} /> {label}
    </button>
  );
}

function MoreInfoBtn({ accent, href }: { accent: string; href?: string }) {
  const inner = (
    <>
      <span>More info</span>
      <span className="flex items-center justify-center w-10 h-10 rounded-full shrink-0" style={{ backgroundColor: accent }}>
        <ArrowRight size={15} />
      </span>
    </>
  );
  const cls = "inline-flex items-center gap-2 bg-[#f4fff8] rounded-[52px] pl-5 pr-[3px] py-[3px] h-[47px] font-bold text-[#213026] text-sm hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200";
  if (href) return <a href={href} className={cls}>{inner}</a>;
  return <button className={cls}>{inner}</button>;
}

function TechSheetBtn() {
  return (
    <button className="inline-flex items-center gap-2 bg-[#f4fff8] text-[#213026] font-bold text-sm
      px-5 py-2.5 rounded-[24px] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
      <DownloadIcon /> Tech Sheet
    </button>
  );
}

// ─── Product data (extended with detail-page fields) ──────────────────────────
type Product = {
  name: string;
  slug: string;
  subtitle: string;
  desc: string;
  longDesc: string;
  stats: string[];
  accent: string;
  heroColor: string;
  bottle: string;
  product: string;
  bg: string;
  rounded: string;
  benefits: string[];
  specifications: string[];
  darkText?: boolean;
};

const PRODUCTS: Product[] = [
  {
    name: "BaioLizer",
    slug: "baiolizer",
    subtitle: "Biofertilisant & Biostimulant",
    desc: "A biofertilizer that enriches soil with beneficial microbes, boosts NPK uptake, and stimulates natural growth hormones for stronger crops.",
    longDesc:
      "BaioLizer is a PGPR-based biofertilizer combining selected beneficial soil bacteria with plant growth-promoting compounds. It enhances biological nitrogen fixation, phosphate solubilization, and natural hormone production to create the ideal conditions for robust plant development. Suitable for cereals, vegetables, and fruit trees across all soil types, BaioLizer works in harmony with your soil's existing ecosystem to unlock its full potential — season after season.",
    stats: ["Enhanced NPK", "PGPR inoculant", "Biodegradable"],
    accent: C.amber,
    heroColor: C.mid,
    bottle: BAIOLIZER_BOTTLE,
    product: BAIOLIZER_LARGE,
    bg: "linear-gradient(-51.6deg, rgba(8,12,9,0.18) 10.7%, rgba(45,186,93,0.18) 76.6%), linear-gradient(90deg, #255c38, #255c38)",
    rounded: "rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[80px]",
    benefits: [
      "Enhances NPK availability and soil nutrient uptake",
      "Stimulates natural root growth hormones (auxins & cytokinins)",
      "Promotes beneficial microbial colonization in the rhizosphere",
      "Reduces synthetic fertilizer dependency by up to 40%",
    ],
    specifications: [
      "Application: Soil drench or seed coating",
      "Active content: ≥10⁸ CFU/mL PGPR bacterial strains",
      "Compatible with all soil types and irrigation systems",
      "Shelf life: 18 months — store below 25°C, away from heat",
    ],
  },
  {
    name: "ChitoGreen",
    slug: "chitogreen",
    subtitle: "Biostimulant",
    desc: "A chitosan-based biostimulant that boosts plant immunity, improves stress tolerance, and enhances fruit quality and shelf life.",
    longDesc:
      "ChitoGreen harnesses the natural power of chitosan — extracted from sustainably sourced shrimp shells — to prime plant immunity and bolster stress resilience. Its unique formulation promotes secondary metabolite production, reinforces plant cell walls, and activates systemic acquired resistance (SAR), reducing reliance on chemical pesticides. Ideal for growers targeting premium markets and organic certification, ChitoGreen improves fruit firmness, post-harvest shelf life, and overall crop quality.",
    stats: ["Plant immunity", "Foliar spray", "Chitosan based"],
    accent: C.green,
    heroColor: "#ffc300",
    bottle: CHITOGREEN_BOTTLE,
    product: CHITOGREEN_LARGE,
    bg: "linear-gradient(-42.1deg, rgba(0,0,0,0.2) 12.3%, rgba(255,184,0,0.2) 85.8%), linear-gradient(90deg, #ffc300, #ffc300)",
    rounded: "rounded-[8px]",
    darkText: true,
    benefits: [
      "Boosts plant natural resistance to fungal and bacterial disease",
      "Improves fruit quality, firmness, and post-harvest shelf life",
      "Elicits systemic acquired resistance (SAR) naturally",
      "Reduces post-harvest losses and chemical pesticide use",
    ],
    specifications: [
      "Application: Foliar spray or integrated drip irrigation",
      "Active content: 2% chitosan (deacetylation degree ≥85%)",
      "Compatible with pH 5.5–7.5 soil and foliar conditions",
      "Shelf life: 24 months — protect from direct sunlight",
    ],
  },
  {
    name: "TerraHumus",
    slug: "terrahumus",
    subtitle: "Biofertilisant",
    desc: "A humus-rich organic fertilizer that enriches soil structure, activates microbial life, and releases nutrients in sync with plant demand.",
    longDesc:
      "TerraHumus is a premium organic soil amendment rich in humic and fulvic acids derived from verified compost and leonardite sources. It dramatically improves soil structure, water-holding capacity, and cation exchange capacity (CEC) while activating indigenous microbial populations for long-term soil health. Whether rehabilitating degraded soils or maintaining high-performance growing systems, TerraHumus provides the organic foundation your crops need — naturally and sustainably.",
    stats: ["Humic acids", "Soil microbiome", "Compost activator"],
    accent: C.amber,
    heroColor: C.green,
    bottle: TERRAHUMUS_BOTTLE,
    product: TERRAHUMUS_LARGE,
    bg: "linear-gradient(-42.9deg, rgba(0,0,0,0.18) 23.3%, rgba(111,237,154,0.18) 100%), linear-gradient(90deg, #2dba5d, #2dba5d)",
    rounded: "rounded-tl-[8px] rounded-tr-[80px] rounded-br-[8px] rounded-bl-[8px]",
    benefits: [
      "Restores soil structure, porosity, and water retention capacity",
      "Activates and feeds native soil microbial communities",
      "Chelates micronutrients for improved plant uptake efficiency",
      "Compatible with all irrigation systems and crop types",
    ],
    specifications: [
      "Application: Base dressing, top dressing, or fertigation",
      "Humic acid content: ≥60% (dry weight), fulvic acids ≥12%",
      "pH-adjusted formulation (6.5–7.0) for broad compatibility",
      "Shelf life: 24 months — store in cool, dry conditions",
    ],
  },
];

// ─── CTA Particles ────────────────────────────────────────────────────────────
const CTA_PARTICLES = [
  { left: "8%",  top: "72%", size: 10, delay: 0,   dur: 6   },
  { left: "17%", top: "58%", size: 6,  delay: 0.8, dur: 7.5 },
  { left: "26%", top: "80%", size: 14, delay: 1.6, dur: 5.5 },
  { left: "35%", top: "65%", size: 5,  delay: 0.3, dur: 8   },
  { left: "44%", top: "75%", size: 8,  delay: 2.1, dur: 6.5 },
  { left: "53%", top: "55%", size: 12, delay: 1.1, dur: 7   },
  { left: "62%", top: "82%", size: 6,  delay: 0.5, dur: 5   },
  { left: "71%", top: "68%", size: 9,  delay: 1.9, dur: 6   },
  { left: "80%", top: "78%", size: 5,  delay: 0.7, dur: 8.5 },
  { left: "89%", top: "60%", size: 11, delay: 2.5, dur: 5.5 },
  { left: "12%", top: "40%", size: 7,  delay: 3.0, dur: 7   },
  { left: "92%", top: "45%", size: 4,  delay: 1.4, dur: 9   },
];

// ─── Navbar ───────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",         href: "/" },
  { label: "Sustainable",  href: "/#sustainable" },
  { label: "Products",     href: "/#products" },
  { label: "Services",     href: "/#solutions" },
  { label: "Technologies", href: "/#technology" },
  { label: "About",        href: "/#pioneering" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [onHero, setOnHero] = useState(true);

  useEffect(() => {
    // Hero card ends roughly at 90vh; switch navbar to light mode after that
    const update = () => setOnHero(window.scrollY < window.innerHeight * 0.85);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Navbar starts in light mode on this page (mint bg above the hero card)
  const effectiveOnHero = false;

  const textColor = effectiveOnHero ? "#f4fff8" : "#213026";

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        effectiveOnHero
          ? "bg-transparent py-[34px]"
          : "bg-[#f4fff8]/95 backdrop-blur-xl shadow-[0_2px_24px_rgba(33,48,38,0.08)] py-3"
      }`}>
      <div className="max-w-[1880px] mx-auto px-6 sm:px-12 lg:px-[120px] flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 shrink-0 hover:opacity-85 transition-opacity">
          <img src={effectiveOnHero ? LOGO_GLYPH_LIGHT : LOGO_GLYPH} alt="" className="h-[50px] w-[35px] transition-opacity duration-500" />
          <img src={effectiveOnHero ? LOGO_TEXT_LIGHT : LOGO_TEXT} alt="PGPR Technologies" className="h-[27px] w-[70px] transition-opacity duration-500" />
        </a>

        <ul className="hidden lg:flex items-center gap-8 xl:gap-10 font-semibold text-lg xl:text-[22px]">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href}
                className="relative transition-colors duration-500 whitespace-nowrap hover:opacity-100"
                style={{ color: textColor, opacity: onHero ? 0.82 : 0.75 }}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex shrink-0">
          <a href="/contact" className="flex items-center gap-2 bg-[#ffb800] rounded-[48px] px-6 h-[61px] font-bold text-[#213026]
            text-lg xl:text-[22px] hover:brightness-105 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
            Contact <ArrowRight size={22} />
          </a>
        </div>

        {/* Hamburger */}
        <button className="lg:hidden p-2 shrink-0" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={`block w-6 h-0.5 transition-all duration-300 bg-[#213026] ${menuOpen ? "rotate-45 translate-y-1.5" : "mb-1.5"}`} />
          <span className={`block w-6 h-0.5 transition-all duration-200 bg-[#213026] ${menuOpen ? "opacity-0 scale-x-0" : "mb-1.5"}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 bg-[#213026] ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#f4fff8]/97 backdrop-blur-xl shadow-xl z-50
          flex flex-col items-start px-8 py-6 gap-5 lg:hidden">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href}
              className="font-semibold text-[#213026] hover:text-[#2dba5d] text-lg transition-colors"
              onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a href="/contact" className="flex items-center gap-2 bg-[#ffb800] rounded-[48px] px-6 py-3 font-bold text-[#213026]
            hover:brightness-105 transition-all">
            Contact <ArrowRight size={18} />
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Product Hero ─────────────────────────────────────────────────────────────
function ProductHero({ product }: { product: Product }) {
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
        <img src="/assets/yellow-leaf1.svg" alt="" aria-hidden
          className="absolute pointer-events-none select-none"
          style={{
            left: "14%", top: "-20%",
            width: "72%",
            zIndex: 2,
            opacity: dark ? 0.55 : 1,
            animation: `hero-enter 1.4s ${EXPO} 200ms both`,
          }}
        />

        {/* yellow-leaf2 — bottom-left corner, partially clipped by overflow */}
        <img src="/assets/yellow-leaf2.svg" alt="" aria-hidden
          className="absolute pointer-events-none select-none"
          style={{
            left: "-8%", bottom: "-30%",
            width: "38%",
            zIndex: 2,
            opacity: dark ? 0.55 : 1,
            animation: `hero-enter 1.4s ${EXPO} 350ms both`,
          }}
        />

        {/* Left column: text + buttons */}
        <div className="relative z-10 flex items-center px-8 sm:px-14 lg:px-[80px] py-16 sm:py-20">
          <div className="flex flex-col gap-6">
            <h1
              className="font-bold tracking-tight"
              style={{ ...enter(100), fontSize: "clamp(3rem, 6vw, 5.5rem)", lineHeight: 1.0, color: textPrimary }}
            >
              {product.name}
            </h1>

            <p
              style={{ ...enter(220), color: textSecondary }}
              className="font-bold text-2xl lg:text-[32px] leading-tight max-w-[380px]"
            >
              {product.subtitle}
            </p>

            <div style={enter(340)} className="flex flex-wrap items-center gap-4 pt-4">
              {dark
                ? <DarkBtn label="Request a Demo" href="/contact" />
                : <YellowBtn label="Request a Demo" href="/contact" />}
              {dark
                ? <DarkGhostBtn label="Technical Sheet" />
                : <GhostBtn label="Technical Sheet" />}
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
function ProductOverview({ product }: { product: Product }) {
  const [ref, visible] = useReveal(0.06);

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
    <section ref={ref} className="w-full py-20 lg:py-28">
      {/* Title row — leaf pill + heading inline */}
      <div className="flex items-center gap-5 mb-10" style={fade(visible, 80)}>
        <SectionLeaf visible={visible} delay={80} />
        <h2
          className="font-semibold text-[#213026] text-4xl sm:text-5xl lg:text-[72px] lg:leading-[1.0]"
          style={fade(visible, 120)}>
          Product Overview
        </h2>
      </div>

      <p
        className="text-[#696969] font-medium text-base lg:text-lg leading-relaxed max-w-[900px] mb-16"
        style={fade(visible, 220)}>
        {product.longDesc}
      </p>

      {/* Two cards */}
      <div className="grid lg:grid-cols-2 gap-6" style={fade(visible, 300)}>

        {/* Key Benefits card — light mint, green accents */}
        <div
          className="rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[80px] p-10 lg:p-14"
          style={{ backgroundColor: "#dff0e6" }}>
          <h3
            className="font-bold text-3xl lg:text-[40px] mb-8"
            style={{ color: C.mid }}>
            Key Benefits
          </h3>
          <ul className="flex flex-col gap-6">
            {product.benefits.map((b) => (
              <li key={b} className="flex items-start gap-4">
                <GreenLeaf />
                <span className="font-medium text-base lg:text-[17px] leading-relaxed text-[#213026]">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Specifications card — light cream, amber accents */}
        <div
          className="rounded-tl-[8px] rounded-tr-[80px] rounded-br-[8px] rounded-bl-[8px] p-10 lg:p-14"
          style={{ backgroundColor: "#f5eedb" }}>
          <h3
            className="font-bold text-3xl lg:text-[40px] mb-8"
            style={{ color: C.amber }}>
            Specifications
          </h3>
          <ul className="flex flex-col gap-6">
            {product.specifications.map((s) => (
              <li key={s} className="flex items-start gap-4">
                <AmberLeaf />
                <span className="font-medium text-base lg:text-[17px] leading-relaxed text-[#213026]">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── More Products ────────────────────────────────────────────────────────────
function MoreProducts({ products }: { products: Product[] }) {
  const [ref, visible] = useReveal(0.06);

  return (
    <section ref={ref} className="w-full px-4 sm:px-8 lg:px-[44px] py-20">
      <div className="lg:px-[106px] mb-10">
        <div style={fade(visible, 80)}>
          <SectionLeaf visible={visible} delay={80} />
        </div>
        <h2
          className="font-semibold text-[#213026] text-4xl sm:text-5xl lg:text-[72px] lg:leading-[1.15] mt-5"
          style={fade(visible, 160)}>
          More of our Products
        </h2>
      </div>

      <div className="flex flex-col xl:flex-row gap-5">
        {products.map((p, i) => (
          <div
            key={p.name}
            className={`flex flex-col flex-1 overflow-hidden ${p.rounded}`}
            style={{
              backgroundImage: p.bg,
              opacity: visible ? 1 : 0,
              boxShadow: "0 8px 32px rgba(33,48,38,0.20)",
              transition: `opacity 0.7s ${EXPO} ${180 + i * 140}ms`,
            }}
          >
            {/* Top zone: bottle against the card gradient */}
            <div className="flex items-end justify-center" style={{ height: 220 }}>
              <img
                src={p.bottle}
                alt={p.name}
                loading="lazy"
                className="object-contain"
                style={{ height: 200, width: "auto" }}
              />
            </div>

            {/* Bottom zone: dark strip — consistent on all card colours */}
            <div
              className="flex flex-col gap-2.5 px-6 pt-4 pb-5"
              style={{ background: "rgba(0,0,0,0.56)" }}
            >
              <div>
                <p className="font-bold text-xl leading-tight" style={{ color: "#f4fff8" }}>
                  {p.name}
                </p>
                <p className="font-semibold text-sm mt-0.5" style={{ color: "rgba(244,255,248,0.68)" }}>
                  {p.subtitle}
                </p>
              </div>
              <p className="font-medium text-sm leading-relaxed" style={{ color: "rgba(244,255,248,0.82)" }}>
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.stats.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-semibold rounded-full px-3 py-1 whitespace-nowrap"
                    style={{
                      color: "#f4fff8",
                      border: "1px solid rgba(255,255,255,0.22)",
                      background: "rgba(255,255,255,0.10)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-0.5">
                <MoreInfoBtn accent={p.accent} href={`/products/${p.slug}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  const [ref, visible] = useReveal(0.1);

  return (
    <section
      ref={ref}
      className="w-full mt-12 mb-8 rounded-tl-[8px] rounded-tr-[8px] rounded-br-[80px] rounded-bl-[8px] overflow-hidden
        py-20 px-6 lg:px-24 flex flex-col items-center justify-center text-center gap-8 relative"
      style={{
        minHeight: 440,
        backgroundImage:
          "linear-gradient(180deg, rgba(33,48,38,0.10) 0%, rgba(33,48,38,0.42) 100%), linear-gradient(90deg, #255c38, #255c38)",
        ...fade(visible),
      }}>
      <img src="/assets/leaf-right-large.png" alt="" aria-hidden
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{ right: "-6%", bottom: "-8%", width: "30%", zIndex: 1, opacity: 0.92 }} />
      <img src="/assets/leaf-cluster-mid.png" alt="" aria-hidden
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{ right: "6%", top: "22%", width: "16%", zIndex: 1, opacity: 0.80 }} />
      <img src="/assets/leaf-left-large.png" alt="" aria-hidden
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{ left: "-8%", top: "10%", width: "22%", zIndex: 1, opacity: 0.75 }} />
      <img src="/assets/leaf-small-left.png" alt="" aria-hidden
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{ left: "-1%", bottom: "12%", width: "8%", zIndex: 1, opacity: 0.70 }} />
      <img src="/assets/leaf-small-right.png" alt="" aria-hidden
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{ right: "-1%", top: "5%", width: "8%", zIndex: 1, opacity: 0.68 }} />

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

      <h2
        className="relative z-10 font-bold text-[#f4fff8] text-3xl sm:text-4xl lg:text-[48px] leading-[1.35] max-w-3xl"
        style={fade(visible, 100)}>
        Ready to Improve Your Agricultural Performance with Biotechnology?
      </h2>
      <p
        className="relative z-10 text-[#f4fff8]/80 font-medium text-base lg:text-lg leading-relaxed"
        style={fade(visible, 200)}>
        Join hundreds of farmers and distributors already benefiting from our innovative bio-solutions.
      </p>
      <a
        href="/contact"
        className="relative z-10 mt-2 inline-flex items-center gap-3 bg-[#ffb800] text-[#213026] font-bold text-lg
          px-8 py-4 rounded-[52px] hover:brightness-105 hover:scale-[1.03] active:scale-[0.98]
          transition-all duration-200 group"
        style={{
          ...fade(visible, 300),
          animation: visible ? "pulse-glow 2.8s ease-in-out infinite 1s" : "none",
        }}>
        Go Bio, and save the world with us
        <span className="group-hover:translate-x-0.5 transition-transform block">
          <ArrowRight size={20} />
        </span>
      </a>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const [ref, visible] = useReveal();

  return (
    <footer
      ref={ref}
      className="w-full mt-5 rounded-tl-[8px] rounded-tr-[80px] rounded-br-[8px] rounded-bl-[80px] overflow-hidden
        px-6 sm:px-16 lg:px-[200px] pt-14 lg:pt-[100px] pb-10 lg:pb-[72px] bg-[#213026] text-[#f4fff8]"
      style={fade(visible)}>
      <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-12">
        <a href="/" className="flex items-center gap-4 shrink-0 hover:opacity-85 transition-opacity">
          <img src={LOGO_GLYPH_LIGHT} alt="" className="h-[90px] w-[63px]" />
          <img src={LOGO_TEXT_LIGHT} alt="PGPR Technologies" className="h-[50px] w-[130px]" />
        </a>

        <div className="flex gap-16 lg:gap-[140px]">
          <div className="flex flex-col gap-5">
            <h4 className="font-bold text-2xl lg:text-[40px] lg:leading-[52px]">Learn More</h4>
            <nav className="flex flex-col gap-4 font-medium text-[15px]">
              {["About", "Products", "Contact"].map((l) => (
                <a key={l} href="/#"
                  className="hover:text-[#2dba5d] hover:translate-x-1 transition-all duration-200 inline-block w-fit">
                  {l}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="font-bold text-2xl lg:text-[40px] lg:leading-[52px]">Say Hello!</h4>
            <div className="flex flex-col gap-4 font-medium text-[15px]">
              <a href="mailto:contact@pgpr.tech"
                className="hover:text-[#2dba5d] hover:translate-x-1 transition-all duration-200 inline-block w-fit">
                contact@pgpr.tech
              </a>
              <a href="tel:+212635699447"
                className="hover:text-[#2dba5d] hover:translate-x-1 transition-all duration-200 inline-block w-fit">
                +212 635 699447
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
        <p className="text-[15px] font-medium text-[#f4fff8]/70">
          PGPR Technologies &copy; 2026. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
            className="opacity-70 hover:opacity-100 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ECE9F1" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.373 0 0 5.373 0 12C0 18.016 4.432 22.984 10.206 23.852V15.18H7.237V12.026H10.206V9.927C10.206 6.452 11.899 4.927 14.787 4.927C16.17 4.927 16.902 5.03 17.248 5.076V7.829H15.278C14.052 7.829 13.624 8.992 13.624 10.302V12.026H17.217L16.73 15.18H13.624V23.877C19.481 23.083 24 18.075 24 12C24 5.373 18.627 0 12 0Z"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="opacity-70 hover:opacity-100 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ECE9F1" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.998 0C3.139 0 0 3.142 0 7.002V17.002C0 20.861 3.142 24 7.002 24H17.002C20.861 24 24 20.858 24 16.998V6.998C24 3.139 20.858 0 16.998 0H6.998ZM19 4C19.552 4 20 4.448 20 5C20 5.552 19.552 6 19 6C18.448 6 18 5.552 18 5C18 4.448 18.448 4 19 4ZM12 6C15.309 6 18 8.691 18 12C18 15.309 15.309 18 12 18C8.691 18 6 15.309 6 12C6 8.691 8.691 6 12 6ZM12 8C10.939 8 9.922 8.421 9.172 9.172C8.421 9.922 8 10.939 8 12C8 13.061 8.421 14.078 9.172 14.828C9.922 15.579 10.939 16 12 16C13.061 16 14.078 15.579 14.828 14.828C15.579 14.078 16 13.061 16 12C16 10.939 15.579 9.922 14.828 9.172C14.078 8.421 13.061 8 12 8Z"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
            className="opacity-70 hover:opacity-100 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ECE9F1" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM7.496 5.403C8.338 5.403 8.899 5.964 8.899 6.712C8.899 7.46 8.338 8.021 7.403 8.021C6.561 8.022 6 7.46 6 6.712C6 5.964 6.561 5.403 7.496 5.403ZM9 17H6V9H9V17ZM19 17H16.176V12.628C16.176 11.419 15.423 11.14 15.141 11.14C14.859 11.14 13.917 11.326 13.917 12.628C13.917 12.814 13.917 17 13.917 17H11V9H13.918V10.116C14.294 9.465 15.047 9 16.459 9C17.871 9 19 10.116 19 12.628V17Z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  useEffect(() => { pageVisited = true; }, []);
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const otherProducts = PRODUCTS.filter((p) => p.slug !== slug);

  return (
    <div style={{ backgroundColor: C.mint }} className="min-h-screen">
      <Navbar />
      <div className="max-w-[1880px] mx-auto px-5">
        <main className="flex flex-col">
          <ProductHero product={product} />
          <ProductOverview product={product} />
          <MoreProducts products={otherProducts} />
          <CTABanner />
          <Footer />
        </main>
      </div>
    </div>
  );
}
