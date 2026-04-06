"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Brand tokens ────────────────────────────────────────────────────────────
const C = {
  mint: "#f4fff8",
  dark: "#213026",
  mid: "#255c38",
  green: "#2dba5d",
  amber: "#ffb800",
  gray: "#696969",
} as const;

// ─── Assets ──────────────────────────────────────────────────────────────────
const HERO_BG          = "/assets/hero-bg.png";
const BAIOLIZER        = "/assets/baiolizer-bottle.svg";
const CHITOGREEN       = "/assets/chitogreen-bottle.svg";
const TERRAHUMUS       = "/assets/terrahumus-bottle.svg";
const SUSTAIN_IMG      = "/assets/sustain-img.jpg";
const PIE_HERO         = "/assets/pie-hero.png";
const LOGO_GLYPH       = "/assets/logo-glyph.svg";
const LOGO_TEXT        = "/assets/logo-text.svg";
const LOGO_GLYPH_LIGHT = "/assets/logo-glyph-light.svg";
const LOGO_TEXT_LIGHT  = "/assets/logo-text-light.svg";
const SOL_CHITOSAN     = "/assets/sol-chitosan.png";
const SOL_RD           = "/assets/sol-rd.jpg";
const SOL_SUPPORT      = "/assets/sol-support.jpg";
const SOL_BIOMAROC     = "/assets/sol-biomaroc.jpg";
const SOL_SHRIMP_ICON  = "/assets/sol-shrimp-icon.svg";
const SOL_RD_ICON      = "/assets/sol-rd-icon.svg";
const SOL_CERT_ICON    = "/assets/cert-icon.svg";
const TECH_DAIRY       = "/assets/tech-dairy.png";
const TECH_SHRIMP      = "/assets/tech-shrimp.jpg";
const TECH_COMPOST     = "/assets/tech-compost.jpg";
const SOCIAL_ICONS     = "/assets/social-icons.svg";
const AVATAR1          = "/assets/avatar1.png";
const AVATAR2          = "/assets/avatar2.png";

// ─── Data ────────────────────────────────────────────────────────────────────

const TESTIMONIAL_SLIDES = [
  [
    {
      avatar: AVATAR1,
      quote: "BaioLizer transformed our wheat yield this season — soil improvement was visible within weeks.",
      name: "Ahmed Benali",
      role: "Wheat Farmer, Meknès",
    },
    {
      avatar: AVATAR2,
      quote: "Switching to ChitoGreen cut our fertilizer costs in half while noticeably improving crop quality.",
      name: "Fatima Ouali",
      role: "Citrus Producer, Souss",
    },
  ],
  [
    {
      avatar: AVATAR1,
      quote: "PGPR's R&D consultation helped us transition our farm to biological farming in under a year.",
      name: "Youssef Elhami",
      role: "Agribusiness Owner, Fès",
    },
    {
      avatar: AVATAR2,
      quote: "TerraHumus gave our tomatoes stronger root systems and improved drought resistance through summer.",
      name: "Khadija Amrani",
      role: "Greenhouse Cultivator, Agadir",
    },
  ],
  [
    {
      avatar: AVATAR1,
      quote: "Achieving BIOMAROC certification with PGPR's guidance opened new export markets for us.",
      name: "Rachid Tahir",
      role: "Organic Producer, Marrakech",
    },
    {
      avatar: AVATAR2,
      quote: "We've seen a significant reduction in plant disease since using ChitoGreen. Our customers love the cleaner produce.",
      name: "Nadia Chakir",
      role: "Vegetable Distributor, Rabat",
    },
  ],
];

const SUSTAIN_TABS = [
  {
    title: "Healthier Soil Ecosystems",
    desc: "Our biofertilizers enrich soil with beneficial microorganisms that naturally improve nutrient availability, restore soil vitality, and support long-term agricultural sustainability.",
    img: SUSTAIN_IMG,
  },
  {
    title: "Reduced Chemical Dependency",
    desc: "By replacing synthetic fertilizers with bio-based alternatives, farmers reduce costs while protecting ecosystems and producing healthier, residue-free crops.",
    img: TECH_DAIRY,
  },
  {
    title: "Improved Crop Yields",
    desc: "PGPR-based products stimulate plant growth, strengthen root systems, and improve resistance to drought, pests, and disease — season after season.",
    img: TECH_COMPOST,
  },
];

const PRODUCTS = [
  {
    name: "BaioLizer",
    slug: "baiolizer",
    subtitle: "Biofertilisant & Biostimulant",
    desc: "A biofertilizer that enriches soil with beneficial microbes, boosts NPK uptake, and stimulates natural growth hormones for stronger crops.",
    stats: ["Enhanced NPK", "PGPR inoculant", "Biodegradable"],
    accent: C.amber,
    bottle: BAIOLIZER,
    bg: "linear-gradient(-51.6deg, rgba(8,12,9,0.18) 10.7%, rgba(45,186,93,0.18) 76.6%), linear-gradient(90deg, #255c38, #255c38)",
    rounded: "rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[80px]",
  },
  {
    name: "ChitoGreen",
    slug: "chitogreen",
    subtitle: "Biostimulant",
    desc: "A chitosan-based biostimulant that boosts plant immunity, improves stress tolerance, and enhances fruit quality and shelf life.",
    stats: ["Plant immunity", "Foliar spray", "Chitosan based"],
    accent: C.green,
    bottle: CHITOGREEN,
    bg: "linear-gradient(-42.1deg, rgba(0,0,0,0.2) 12.3%, rgba(255,184,0,0.2) 85.8%), linear-gradient(90deg, #ffc300, #ffc300)",
    rounded: "rounded-[8px]",
    darkText: true,
  },
  {
    name: "TerraHumus",
    slug: "terrahumus",
    subtitle: "Biofertilisant",
    desc: "A humus-rich organic fertilizer that enriches soil structure, activates microbial life, and releases nutrients in sync with plant demand.",
    stats: ["Humic acids", "Soil microbiome", "Compost activator"],
    accent: C.amber,
    bottle: TERRAHUMUS,
    bg: "linear-gradient(-42.9deg, rgba(0,0,0,0.18) 23.3%, rgba(111,237,154,0.18) 100%), linear-gradient(90deg, #2dba5d, #2dba5d)",
    rounded: "rounded-tl-[8px] rounded-tr-[80px] rounded-br-[8px] rounded-bl-[8px]",
  },
];

const SOLUTIONS = [
  {
    title: "Chitosan Production",
    desc: "Industrial-scale chitosan extraction with customizable grades and specifications for agricultural, nutraceutical, and cosmetic applications.",
    cta: "Go to Shop",
    img: SOL_CHITOSAN,
    icon: SOL_SHRIMP_ICON,
    radius: "80px 8px 8px 8px",
  },
  {
    title: "R&D Consultation",
    desc: "Expert guidance in biotechnology research and development for agricultural and environmental projects.",
    cta: "Contact Experts",
    img: SOL_RD,
    icon: SOL_RD_ICON,
    radius: "8px 8px 8px 8px",
  },
  {
    title: "Biofarming Support",
    desc: "End-to-end support for transitioning to biological farming practices — soil analysis, crop planning, and on-site training.",
    cta: "Contact Experts",
    img: SOL_SUPPORT,
    icon: SOL_CERT_ICON,
    radius: "8px 8px 8px 8px",
  },
  {
    title: "BIOMAROC Certification",
    desc: "Assistance in obtaining BIOMAROC organic certification for your agricultural products and processes.",
    cta: "Contact Experts",
    img: SOL_BIOMAROC,
    icon: SOL_CERT_ICON,
    radius: "8px 8px 80px 8px",
  },
];

const TECH_ITEMS = [
  {
    img: TECH_DAIRY,
    label: "Bioformulation from Dairy Waste",
    desc: "PGPR strains isolated from dairy industry byproducts are cultivated through advanced microbial fermentation, yielding high-performance biostimulants that naturally boost plant growth and soil health.",
    radius: "80px 8px 8px 8px",
  },
  {
    img: TECH_SHRIMP,
    label: "Chitosan Extraction from Shrimp Waste",
    desc: "Shrimp shell waste is transformed into high-purity chitosan — a natural biopolymer that enhances plant immunity, strengthens root systems, and acts as an effective organic crop protector.",
    radius: "8px 8px 8px 8px",
  },
  {
    img: TECH_COMPOST,
    label: "Efficient Composting",
    desc: "Optimized composting protocols convert organic matter into nutrient-rich humus, accelerating soil rehabilitation and providing a sustained fertility base for long-term sustainable agriculture.",
    radius: "8px 8px 80px 8px",
  },
];

const NAV_LINKS = [
  { label: "Home",         id: "hero" },
  { label: "Sustainable",  id: "sustainable" },
  { label: "Products",     id: "products" },
  { label: "Services",     id: "solutions" },
  { label: "Technologies", id: "technology" },
  { label: "About",        id: "pioneering" },
];

const SECTION_IDS = ["hero", "sustainable", "products", "solutions", "technology", "pioneering"];

const SECTION_DOTS = [
  { id: "hero",        label: "Home" },
  { id: "sustainable", label: "Sustainable" },
  { id: "products",    label: "Products" },
  { id: "solutions",   label: "Services" },
  { id: "technology",  label: "Technology" },
  { id: "pioneering",  label: "About" },
];

// ─── Animation helpers ───────────────────────────────────────────────────────
const EXPO = "cubic-bezier(0.16,1,0.3,1)";
const SPRING = "cubic-bezier(0.34,1.56,0.64,1)";

function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
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

// ─── Shared components ───────────────────────────────────────────────────────

function ArrowRight({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none"
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
  const cls = "inline-flex items-center gap-3 bg-[#ffb800] rounded-full pl-5 pr-1.5 py-1.5 font-bold text-[#213026] text-sm hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group shrink-0 w-fit";
  const inner = (
    <>
      <span>{label}</span>
      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f4fff8] group-hover:bg-white transition-colors shrink-0">
        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </>
  );
  if (href) return <a href={href} className={cls}>{inner}</a>;
  return <button onClick={onClick} className={cls}>{inner}</button>;
}

function WhiteBtn({ label, onClick, href }: { label: string; onClick?: () => void; href?: string }) {
  const cls = "inline-flex items-center gap-3 bg-white/90 rounded-full pl-5 pr-1.5 py-1.5 font-bold text-[#213026] text-sm border border-white/30 hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group shrink-0 w-fit";
  const inner = (
    <>
      <span>{label}</span>
      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#ffb800] shrink-0">
        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </>
  );
  if (href) return <a href={href} className={cls}>{inner}</a>;
  return <button onClick={onClick} className={cls}>{inner}</button>;
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
      px-5 h-[47px] rounded-full shrink-0 hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
      <DownloadIcon /> Tech Sheet
    </button>
  );
}

// ─── Section scroll ───────────────────────────────────────────────────────────

const SCROLL_SECTIONS = [...SECTION_IDS, "cta"];

function useSectionScroll() {
  useEffect(() => {
    // Only activate snap scrolling on desktop (lg breakpoint = 1024px)
    if (window.innerWidth < 1024) return;

    let busy = false;
    let timer = 0;

    const getSections = () =>
      SCROLL_SECTIONS.map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => !!el);

    const getCurrentIndex = () => {
      const sections = getSections();
      let idx = 0;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top < window.innerHeight * 0.35) idx = i;
      }
      return { idx, sections };
    };

    const snapTo = (idx: number) => {
      const sections = getSections();
      const el = sections[idx];
      if (!el) return;
      busy = true;
      clearTimeout(timer);
      const top = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY) - 80);
      window.scrollTo({ top, behavior: "smooth" });
      // Unblock after scroll settles
      const done = () => { busy = false; clearTimeout(timer); };
      window.addEventListener("scrollend", done, { once: true });
      timer = window.setTimeout(done, 900);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (busy) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const { idx, sections } = getCurrentIndex();
      const next = idx + dir;
      if (next < 0 || next >= sections.length) return;
      snapTo(next);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      clearTimeout(timer);
    };
  }, []);
}

// ─── Section dots ────────────────────────────────────────────────────────────

function SectionDots() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    // Use scroll position to determine which section is active — more reliable than IO
    const update = () => {
      const sections = SECTION_DOTS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
      let current = SECTION_DOTS[0].id;
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
      {SECTION_DOTS.map(({ id, label }) => {
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

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [onHero, setOnHero] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");

  // Switch to light mode while the hero section is in view
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([e]) => setOnHero(e.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach((o) => o?.disconnect());
  }, []);

  // Transparent only when on hero AND menu is closed
  const heroMode  = onHero && !menuOpen;
  const textColor = heroMode ? "#f4fff8" : "#213026";
  const barColor  = heroMode ? "bg-[#f4fff8]" : "bg-[#213026]";

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        heroMode
          ? "bg-transparent py-4"
          : "bg-[#f4fff8]/95 backdrop-blur-xl shadow-[0_2px_24px_rgba(33,48,38,0.08)] py-4"
      }`}>
      <div className="max-w-[1880px] mx-auto px-6 sm:px-12 lg:px-[120px] flex items-center justify-between">
        {/* Logo: light variant only when actually in hero mode (transparent bg) */}
        <a href="#" className="flex items-center gap-2.5 shrink-0 hover:opacity-85 transition-opacity">
          <img src={heroMode ? LOGO_GLYPH_LIGHT : LOGO_GLYPH} alt="" className="h-[38px] w-[27px] transition-opacity duration-500" />
          <img src={heroMode ? LOGO_TEXT_LIGHT : LOGO_TEXT} alt="PGPR Technologies" className="h-[22px] w-[57px] transition-opacity duration-500" />
        </a>

        <ul className="hidden lg:flex items-center gap-8 xl:gap-10 font-semibold text-lg xl:text-[22px]">
          {NAV_LINKS.map(({ label, id }) => {
            const active = !!id && activeSection === id;
            return (
              <li key={label}>
                <a
                  href={id ? `#${id}` : "#"}
                  className="relative transition-colors duration-500 whitespace-nowrap"
                  style={{ color: active ? C.green : textColor, opacity: active ? 1 : heroMode ? 0.82 : 1 }}
                >
                  {label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-0.5 bg-[#2dba5d] rounded-full transition-all duration-300"
                    style={{ width: active ? "100%" : "0%", opacity: active ? 1 : 0 }}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:flex shrink-0">
          <a href="/contact" className="flex items-center gap-2 bg-[#ffb800] rounded-[48px] px-6 h-[61px] font-bold text-[#213026]
            text-lg xl:text-[22px] hover:brightness-105 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
            Contact <ArrowRight size={22} />
          </a>
        </div>

        {/* Hamburger / X — fixed-size container prevents overflow */}
        <button className="lg:hidden p-2 shrink-0" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <div className="relative w-6 h-[18px]">
            <span className={`absolute left-0 w-6 h-0.5 top-0 transition-all duration-300 ${barColor} ${menuOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
            <span className={`absolute left-0 w-6 h-0.5 top-[8px] transition-all duration-200 ${barColor} ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`absolute left-0 w-6 h-0.5 top-[16px] transition-all duration-300 ${barColor} ${menuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
          </div>
        </button>
      </div>

      {menuOpen && (
        <div
          className={`absolute top-full left-0 right-0 backdrop-blur-xl shadow-xl z-50
            flex flex-col items-start px-8 py-6 gap-5 lg:hidden
            ${onHero ? "bg-[#213026]/97" : "bg-[#f4fff8]/97"}`}
          style={{ animation: "fade-slide-down 0.22s ease-out" }}>
          {NAV_LINKS.map(({ label, id }) => (
            <a key={label} href={id ? `#${id}` : "#"}
              className={`font-semibold text-lg transition-colors hover:text-[#2dba5d]
                ${onHero ? "text-[#f4fff8]" : "text-[#213026]"}`}
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

// ─── Hero ────────────────────────────────────────────────────────────────────

// Persists across React remounts within the same tab session.
// Prevents entrance animations from replaying on browser back/forward.
let introPlayed = false;

// ─── Hero leaf parallax overlay (fixed, above everything) ───────────────────

function HeroLeaves({ mouse, animated }: { mouse: { x: number; y: number }; animated: boolean }) {
  const EASE = "cubic-bezier(0.16,1,0.3,1)";

  // Wrapper: absolute positioning + CSS entrance animation
  // Opacity intentionally omitted — the img child carries it so the
  // animation's 0→1 opacity multiplies correctly through the stack.
  const wrap = (
    pos: React.CSSProperties,
    anim: string,
    delay: number,
  ): React.CSSProperties => ({
    position: "absolute",
    pointerEvents: "none",
    userSelect: "none",
    zIndex: 10,
    ...(animated ? { animation: `${anim} 2s ${EASE} ${delay}ms both` } : {}),
    ...pos,
  });

  // Img: final opacity + parallax translation (+ optional base rotation)
  const px = (depth: number, opacity: number, baseRot = 0): React.CSSProperties => ({
    width: "100%",
    display: "block",
    opacity,
    transform: `${baseRot ? `rotate(${baseRot}deg) ` : ""}translate(${(mouse.x * depth * -1).toFixed(2)}px, ${(mouse.y * depth * -1).toFixed(2)}px)`,
    transition: "transform 0.35s ease-out",
  });

  return (
    <div className="hidden lg:block" aria-hidden>
      <div style={wrap({ left: "-5%",  top: "28%",    width: "14%" }, "leaf-fly-left",   200)}>
        <img src="/assets/leaf-left-large.png"  alt="" style={px(6,  0.82)} />
      </div>
      <div style={wrap({ right: "-6%", bottom: "8%",  width: "26%" }, "leaf-fly-right",  400)}>
        <img src="/assets/leaf-right-large.png" alt="" style={px(4,  0.85)} />
      </div>
      <div style={wrap({ left: "83%",  top: "32%",    width: "12%" }, "leaf-fly-top",    500)}>
        <img src="/assets/leaf-cluster-mid.png" alt="" style={px(8,  0.72)} />
      </div>
      <div style={wrap({ left: "81%",  top: "15%",    width: "6%"  }, "leaf-fly-top",    650)}>
        <img src="/assets/leaf-tiny-a.png"      alt="" style={px(10, 0.68)} />
      </div>
      <div style={wrap({ left: "22%",  top: "84%",    width: "6%"  }, "leaf-fly-bottom", 300)}>
        <img src="/assets/leaf-tiny-b.png"      alt="" style={px(7,  0.65, 16)} />
      </div>
    </div>
  );
}

function Hero() {
  const [slide, setSlide]     = useState(0);
  const [slideKey, setSlideKey] = useState(0);
  // Capture whether this is the first play before marking it done
  const [isFirstPlay] = useState(() => !introPlayed);

  useEffect(() => {
    introPlayed = true;
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % TESTIMONIAL_SLIDES.length), 5000);
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

  return (
    <section
      id="hero"
      className="relative overflow-hidden flex flex-col"
      style={isFirstPlay ? {
        animation: `hero-frame 2.2s cubic-bezier(0.16,1,0.3,1) 600ms both`,
        willChange: "border-radius, margin, width, min-height",
      } : {
        borderRadius: "8px 80px 8px 80px",
        marginTop: "1rem",
        marginBottom: "1rem",
        minHeight: "calc(100svh - 2rem)",
      }}
    >
      {/* Background — Ken Burns zoom out via CSS animation */}
      <img
        src={HERO_BG}
        alt="Green terraced hillside fields"
        className="absolute inset-0 w-full h-full object-cover"
        style={isFirstPlay ? { animation: `hero-zoom 12s ${EXPO} both`, willChange: "transform" } : {}}
      />

      {/* Gradient overlay — lighter at top (nav legibility), heavier at bottom (card legibility) */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(33,48,38,0.18) 0%, rgba(33,48,38,0.28) 35%, rgba(33,48,38,0.72) 68%, rgba(33,48,38,0.88) 100%)" }}
      />

      {/* Main content — vertically centered in the flex column */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-10">
        <h1
          style={{ ...enter(60), textShadow: "0 2px 24px rgba(0,0,0,0.32)" }}
          className="font-semibold text-[#f4fff8] text-[2.4rem] sm:text-5xl md:text-6xl lg:text-[100px] lg:leading-[1.18] mb-5 max-w-5xl tracking-tight"
        >
          PGPR Technologies
          <br />
          The Future of Bio
        </h1>

        <p
          style={enter(260)}
          className="text-[#f4fff8]/85 font-medium text-lg lg:text-2xl max-w-2xl mb-10 leading-relaxed"
        >
          We promote biofarming in Morocco by providing
          <br className="hidden lg:block" />
          innovative scientific solutions for Biologic Agriculture
        </p>

        <div style={enter(440)} className="flex flex-wrap items-center gap-4 justify-center mb-6 md:mb-14">
          <YellowBtn label="Request a Demo" href="/contact" />
          <WhiteBtn label="Become a Distributor" href="/contact" />
        </div>

        {/* Testimonials — hidden on mobile to keep hero within one screen */}
        <div
          style={enter(620)}
          className="hidden md:block relative max-w-5xl w-full min-h-[480px] md:min-h-[280px]"
        >
          {TESTIMONIAL_SLIDES.map((cards, si) => (
            <div
              key={si}
              className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-4 content-start"
              style={{
                opacity: slide === si ? 1 : 0,
                transition: "opacity 0.55s ease",
                pointerEvents: slide === si ? "auto" : "none",
              }}
            >
              {cards.map((t, i) => (
                <div
                  key={i}
                  className="rounded-2xl px-7 py-6 text-left overflow-hidden"
                  style={{
                    backdropFilter: "blur(14px)",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderTop: "2px solid rgba(45,186,93,0.55)",
                  }}
                >
                  <p className="text-[#f4fff8]/90 font-medium text-base lg:text-[18px] leading-[1.7] mb-5 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover shrink-0 ring-2 ring-white/20" />
                    <div>
                      <p className="text-[#f4fff8] font-bold text-base leading-tight">{t.name}</p>
                      <p className="text-[#f4fff8]/60 font-medium text-sm mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar: progress controls + scroll cue — clean single row, no overlap */}
      <div
        className="relative z-10 flex items-center justify-center md:justify-between px-8 lg:px-16 pb-10 pt-4"
        style={enter(800)}
      >
        <div className="hidden md:flex items-center gap-4">
          <div className="flex gap-3">
            {TESTIMONIAL_SLIDES.map((_, i) => (
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
            {String(slide + 1).padStart(2, "0")} / {String(TESTIMONIAL_SLIDES.length).padStart(2, "0")}
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

function SustainableSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [ref, visible] = useReveal();

  return (
    <section id="sustainable" ref={ref} className="w-full px-4 sm:px-8 lg:px-[97px] py-10 lg:py-20">
      <div className="mb-8" style={fade(visible, 100)}>
        <SectionLeaf visible={visible} delay={100} />
      </div>

      <h2 className="font-semibold text-[#213026] text-4xl sm:text-5xl lg:text-[84px] lg:leading-[1.15] mb-8 lg:mb-[90px] max-w-[900px]"
        style={fade(visible, 180)}>
        Powering Sustainable Agriculture with Biotechnology
      </h2>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Tab list */}
        <div className="w-full lg:max-w-[560px] relative" style={fade(visible, 260)}>
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[#d8e8dc]" />
          {SUSTAIN_TABS.map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)}
              className="block w-full text-left pl-14 py-1.5 relative group">
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
        </div>

        {/* Image — crossfades per tab */}
        <div className="flex-1 rounded-tl-[8px] rounded-tr-[80px] rounded-br-[8px] rounded-bl-[8px] overflow-hidden relative"
          style={{
            minHeight: 220,
            height: "clamp(220px, 40vw, 449px)",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(24px)",
            transition: `opacity 0.9s ${EXPO} 300ms, transform 0.9s ${EXPO} 300ms`,
          }}>
          {SUSTAIN_TABS.map((tab, i) => (
            <img key={i} src={tab.img} alt={tab.title}
              loading={i === 0 ? "eager" : "lazy"}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: activeTab === i ? 1 : 0,
                transform: activeTab === i ? "scale(1)" : "scale(1.04)",
                transition: "opacity 0.55s ease-in-out, transform 0.65s cubic-bezier(0.16,1,0.3,1)",
              }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Products ────────────────────────────────────────────────────────────────

function ProductsSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [ref, visible] = useReveal();

  // Which card is "active": the hovered one, defaulting to first when none hovered
  const expanded = hovered ?? 0;

  return (
    <section id="products" ref={ref} className="w-full px-4 sm:px-8 lg:px-[44px] py-10 lg:py-20">
      <div className="lg:px-[106px] mb-6 lg:mb-10">
        <div style={fade(visible, 80)}>
          <SectionLeaf visible={visible} delay={80} />
        </div>
        <div className="mt-5" style={fade(visible, 160)}>
          <h2 className="font-semibold text-[#213026] text-3xl sm:text-4xl lg:text-[84px] lg:leading-[1.15]">
            Our Sustainable Bio Solutions
          </h2>
          <p className="hidden lg:block text-[#696969] font-medium text-lg mt-3 opacity-70">
            Hover a product card to explore it
          </p>
        </div>
      </div>

      {/* Mobile: image-top / text-bottom card */}
      <div className="flex xl:hidden flex-col gap-5">
        {PRODUCTS.map((p, i) => (
          <div
            key={p.name}
            className={`flex flex-col overflow-hidden ${p.rounded}`}
            style={{
              backgroundImage: p.bg,
              opacity: visible ? 1 : 0,
              boxShadow: "0 8px 32px rgba(33,48,38,0.22)",
              transition: `opacity 0.7s ${EXPO} ${180 + i * 120}ms`,
            }}
          >
            {/* Top zone: bottle against the card gradient */}
            <div className="flex items-end justify-center" style={{ height: 200 }}>
              <img
                src={p.bottle}
                alt={p.name}
                loading="lazy"
                className="object-contain"
                style={{ height: 182, width: "auto" }}
              />
            </div>

            {/* Bottom zone: dark strip — consistent legibility on all card colours */}
            <div
              className="flex flex-col gap-2.5 px-5 pt-4 pb-5"
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
              <div className="flex gap-2.5 items-center flex-wrap mt-0.5">
                <MoreInfoBtn accent={p.accent} href={`/products/${p.slug}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: hover-expand accordion row */}
      <div
        className="hidden xl:flex gap-5"
        style={{ minHeight: "min(520px, 60vw)" }}
        onMouseLeave={() => setHovered(null)}
      >
        {PRODUCTS.map((p, i) => {
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
                opacity: visible ? 1 : 0,
                boxShadow: isExpanded
                  ? "0 28px 80px rgba(33,48,38,0.38)"
                  : "0 4px 20px rgba(33,48,38,0.12)",
                transition: [
                  `flex 0.62s ${EXPO}`,
                  `opacity 0.7s ${EXPO} ${180 + i * 120}ms`,
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

              {/* Collapsed view: vertical product name */}
              <div
                className="absolute inset-0 z-10 flex items-end p-8"
                style={{
                  opacity: isExpanded ? 0 : 1,
                  transition: "opacity 0.2s ease",
                  pointerEvents: isExpanded ? "none" : "auto",
                }}
              >
                <p
                  className="font-bold text-[26px] tracking-wide"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", color: p.darkText ? C.dark : "#f4fff8" }}
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
                  <MoreInfoBtn accent={p.accent} href={`/products/${p.slug}`} />
                  <TechSheetBtn />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Solutions ───────────────────────────────────────────────────────────────

function SolutionsSection() {
  const [ref, visible] = useReveal();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="solutions" ref={ref} className="w-full px-4 sm:px-8 lg:px-20 py-10 lg:py-20">
      <div className="mb-6 lg:mb-12" style={fade(visible, 80)}>
        <SectionLeaf visible={visible} delay={80} />
        <h2 className="font-semibold text-[#213026] text-3xl sm:text-4xl lg:text-[84px] lg:leading-[1.15] mt-5">
          Our Agricultural Solutions &amp; Expertise
        </h2>
      </div>

      {/* Desktop: 4 expanding horizontal panels */}
      <div
        className="hidden xl:flex gap-4 h-[620px]"
        onMouseLeave={() => setHovered(null)}
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity 0.8s ${EXPO} 120ms`,
        }}
      >
        {SOLUTIONS.map((s, i) => {
          const isExpanded = hovered === i;
          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              className="relative overflow-hidden cursor-pointer"
              style={{
                flex: isExpanded ? "3.2 1 0%" : "1 1 0%",
                minWidth: 0,
                borderRadius: s.radius,
                transition: `flex 0.6s ${EXPO}, border-radius 0.6s ${EXPO}`,
              }}
            >
              {/* Photo */}
              <img
                src={s.img}
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

              {/* Collapsed state: vertical title + small icon */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-end pb-10 z-10"
                style={{
                  opacity: isExpanded ? 0 : 1,
                  transition: "opacity 0.2s ease",
                  pointerEvents: isExpanded ? "none" : "auto",
                }}
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#ffb800] mb-5 shrink-0">
                  <img src={s.icon} alt="" className="w-5 h-5 object-contain" />
                </div>
                <p
                  className="font-bold text-[#f4fff8] text-base leading-tight text-center"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
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
                  <img src={s.icon} alt="" className="w-8 h-8 object-contain" />
                </div>
                <h3 className="font-bold text-[#f4fff8] text-3xl xl:text-[38px] mb-3 leading-tight">
                  {s.title}
                </h3>
                <p className="text-[#f4fff8]/85 font-medium text-base xl:text-[18px] leading-relaxed mb-7 max-w-[380px]">
                  {s.desc}
                </p>
                <WhiteBtn label={s.cta} href={s.cta === "Contact Experts" ? "/contact" : undefined} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: stacked cards (< xl) */}
      <div className="xl:hidden grid grid-cols-1 sm:grid-cols-2 gap-5">
        {SOLUTIONS.map((s, i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden"
            style={{
              borderRadius: s.radius,
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(36px)",
              transition: `opacity 0.7s ease-out ${160 + i * 100}ms, transform 0.7s ease-out ${160 + i * 100}ms`,
              boxShadow: "0 4px 24px rgba(33,48,38,0.10)",
            }}
          >
            {/* Image zone */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img src={s.img} alt={s.title} loading="lazy"
                className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(33,48,38,0.45) 100%)" }} />
            </div>
            {/* Content strip */}
            <div className="flex flex-col gap-3 px-5 pt-4 pb-5" style={{ background: C.dark }}>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ffb800] shrink-0">
                  <img src={s.icon} alt="" className="w-5 h-5 object-contain" />
                </div>
                <h3 className="font-bold text-[#f4fff8] text-lg leading-snug">{s.title}</h3>
              </div>
              <p className="text-[#f4fff8]/70 font-medium text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-1">
                <WhiteBtn label={s.cta} href={s.cta === "Contact Experts" ? "/contact" : undefined} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Technology ──────────────────────────────────────────────────────────────

function TechnologySection() {
  const [current, setCurrent] = useState(0);
  const [autoKey, setAutoKey] = useState(0);
  const [ref, visible] = useReveal();
  const touchStartX = useRef(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % TECH_ITEMS.length), 3500);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoKey]);

  const goTo = (i: number) => { setCurrent(i); setAutoKey((k) => k + 1); };

  const circleBtn = `flex items-center justify-center w-[62px] h-[62px] rounded-full border-2 border-[#255c38]
    text-[#255c38] hover:bg-[#255c38] hover:text-white hover:scale-[1.05] active:scale-95 transition-all duration-200`;

  const item = TECH_ITEMS[current];

  return (
    <section id="technology" ref={ref} className="w-full px-4 sm:px-8 lg:px-20 py-10 lg:py-20">
      <div style={fade(visible, 80)}>
        <SectionLeaf visible={visible} delay={80} />
        <h2 className="font-semibold text-[#213026] text-3xl sm:text-4xl lg:text-[84px] lg:leading-[1.15] mt-5 mb-8 lg:mb-14">
          Technology Behind Our Solutions
        </h2>
      </div>

      {/* ── Mobile layout (< lg): image first, text below ─────────────── */}
      <div className="lg:hidden" style={fade(visible, 200)}>
        {/* Swipeable card */}
        <div
          className="relative overflow-hidden select-none"
          style={{ aspectRatio: "4/3", touchAction: "pan-y", borderRadius: item.radius, transition: `border-radius 0.6s ${EXPO}` }}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (dx < -40) goTo((current + 1) % TECH_ITEMS.length);
            else if (dx > 40) goTo((current - 1 + TECH_ITEMS.length) % TECH_ITEMS.length);
          }}
        >
          {TECH_ITEMS.map((t, i) => (
            <img key={i} src={t.img} alt={t.label} loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity: i === current ? 1 : 0 }} />
          ))}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent 55%, rgba(33,48,38,0.55) 100%)" }} />
          <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-[#2dba5d]"
            style={{ animation: "pulse-ring 1.4s ease-out infinite" }} />
          {/* counter badge */}
          <div className="absolute bottom-4 right-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="font-semibold text-white/80 text-xs tabular-nums">
              {current + 1} / {TECH_ITEMS.length}
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
          <button onClick={() => goTo((current - 1 + TECH_ITEMS.length) % TECH_ITEMS.length)}
            aria-label="Previous"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-[#255c38] text-[#255c38] hover:bg-[#255c38] hover:text-white active:scale-95 transition-all duration-200">
            <span className="rotate-180 block"><ArrowRight size={14} /></span>
          </button>
          <div className="flex gap-2 flex-1 justify-center">
            {TECH_ITEMS.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Technology ${i + 1}`}
                className="h-1 rounded-full transition-all duration-350"
                style={{ width: current === i ? 36 : 10, backgroundColor: current === i ? C.mid : "#c0d6c8" }} />
            ))}
          </div>
          <button onClick={() => goTo((current + 1) % TECH_ITEMS.length)}
            aria-label="Next"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-[#255c38] text-[#255c38] hover:bg-[#255c38] hover:text-white active:scale-95 transition-all duration-200">
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* ── Desktop layout (lg+): left text + right image grid ────────── */}
      <div className="hidden lg:flex gap-16 items-start" style={fade(visible, 200)}>
        {/* Left */}
        <div className="flex-none w-[380px] flex flex-col justify-between" style={{ minHeight: "clamp(280px, 28vw, 480px)" }}>
          <p className="text-[#696969] font-medium text-xl xl:text-2xl leading-relaxed" key={current}>
            {item.desc}
          </p>
          <div className="flex gap-3 mt-10">
            <button onClick={() => goTo((current - 1 + TECH_ITEMS.length) % TECH_ITEMS.length)}
              aria-label="Previous" className={circleBtn}>
              <span className="rotate-180 block"><ArrowRight size={18} /></span>
            </button>
            <button onClick={() => goTo((current + 1) % TECH_ITEMS.length)}
              aria-label="Next" className={circleBtn}>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Right — 3-column image grid */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-3 gap-4 xl:gap-5">
            {TECH_ITEMS.map((t, i) => (
              <div key={i} onClick={() => goTo(i)}
                className="relative overflow-hidden cursor-pointer"
                style={{
                  height: "clamp(220px, 26vw, 460px)",
                  borderRadius: t.radius,
                  opacity: current === i ? 1 : 0.52,
                  transform: current === i ? "scale(1.03)" : "scale(1)",
                  boxShadow: current === i
                    ? "0 24px 64px rgba(45,186,93,0.24)"
                    : "none",
                  transition: `border-radius 0.6s ${EXPO}, opacity 0.5s ${EXPO}, transform 0.5s ${EXPO}, box-shadow 0.5s ease`,
                }}>
                <img src={t.img} alt={t.label} loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
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
            {TECH_ITEMS.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Technology ${i + 1}`}
                className="h-[5px] rounded-full transition-all duration-350"
                style={{ width: current === i ? 44 : 13, backgroundColor: current === i ? C.mid : "#c0d6c8" }} />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 xl:gap-5">
            {TECH_ITEMS.map((t, i) => (
              <p key={i}
                className="font-bold text-sm xl:text-base text-center leading-snug transition-all duration-300"
                style={{ color: C.mid, opacity: current === i ? 1 : 0.35 }}>
                {t.label}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
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

function PioneeringSection() {
  const [ref, visible] = useReveal();

  return (
    <section id="pioneering" ref={ref} className="w-full relative isolation-isolate">
      {/* Decorative leaf overlays — outside overflow so they aren't clipped */}
      <img src="/assets/leaf-small-right.png" alt="" aria-hidden
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{ right: "-1%", top: "6%", width: "7%", zIndex: 20, opacity: 0.55 }} />
      <img src="/assets/leaf-tiny-a.png" alt="" aria-hidden
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{ left: "46%", bottom: "8%", width: "6%", zIndex: 20, opacity: 0.50,
          transform: "rotate(16deg)" }} />
      <img src="/assets/leaf-cluster-mid.png" alt="" aria-hidden
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{ right: "-4%", bottom: "5%", width: "18%", zIndex: 20, opacity: 0.45 }} />
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 py-4 lg:py-6 lg:max-h-[calc(100dvh-200px)]">
        {/* Image */}
        <div className="overflow-hidden rounded-tl-[80px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[8px]
          lg:w-[44%] min-h-[260px] lg:min-h-0 shrink-0 bg-[#d8edd7]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(-24px)",
            transition: `opacity 0.9s ${EXPO}, transform 0.9s ${EXPO}`,
          }}>
          <img src={PIE_HERO} alt="Bio farming pioneer" loading="lazy"
            className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" />
        </div>

        {/* Text */}
        <div className="flex-1 bg-[#eef8f1] rounded-tl-[8px] rounded-tr-[80px] rounded-br-[8px] rounded-bl-[8px]
          px-6 lg:pl-[48px] lg:pr-[56px] py-8 lg:pt-[40px] lg:pb-[36px] flex flex-col justify-center gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(24px)",
            transition: `opacity 0.9s ${EXPO} 140ms, transform 0.9s ${EXPO} 140ms`,
          }}>
          <SectionLeaf visible={visible} delay={280} />
          <h2 className="font-semibold text-[#213026] text-2xl sm:text-3xl lg:text-[44px] lg:leading-[1.2]">
            Pioneering Biotechnology for a Greener Future
          </h2>
          <div className="text-[#696969] font-medium text-sm lg:text-base leading-relaxed space-y-3">
            <p>
              PGPR develops innovative biotechnology solutions that support sustainable agriculture
              and circular economy systems. Our team of scientists and entrepreneurs is dedicated
              to creating value through green innovation.
            </p>

            <p>
              Based in Morocco, we transform organic waste from the dairy and seafood industries
              into high-value agricultural products, contributing to both environmental
              sustainability and food security.
            </p>
          </div>
          <YellowBtn label="Learn more about us" href="/about" />
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ──────────────────────────────────────────────────────────────

// Deterministic particle configs (no random() — avoids SSR/hydration mismatch)
const CTA_PARTICLES = [
  { left: "8%",  top: "72%", size: 10, delay: 0,    dur: 6   },
  { left: "17%", top: "58%", size: 6,  delay: 0.8,  dur: 7.5 },
  { left: "26%", top: "80%", size: 14, delay: 1.6,  dur: 5.5 },
  { left: "35%", top: "65%", size: 5,  delay: 0.3,  dur: 8   },
  { left: "44%", top: "75%", size: 8,  delay: 2.1,  dur: 6.5 },
  { left: "53%", top: "55%", size: 12, delay: 1.1,  dur: 7   },
  { left: "62%", top: "82%", size: 6,  delay: 0.5,  dur: 5   },
  { left: "71%", top: "68%", size: 9,  delay: 1.9,  dur: 6   },
  { left: "80%", top: "78%", size: 5,  delay: 0.7,  dur: 8.5 },
  { left: "89%", top: "60%", size: 11, delay: 2.5,  dur: 5.5 },
  { left: "12%", top: "40%", size: 7,  delay: 3.0,  dur: 7   },
  { left: "92%", top: "45%", size: 4,  delay: 1.4,  dur: 9   },
];

function CTABanner() {
  const [ref, visible] = useReveal(0.1);

  return (
    <section
      id="cta"
      ref={ref}
      className="w-full rounded-tl-[8px] rounded-tr-[8px] rounded-br-[80px] rounded-bl-[8px] overflow-hidden
        py-20 px-6 lg:px-24 flex flex-col items-center justify-center text-center gap-8 relative"
      style={{
        minHeight: 440,
        backgroundImage:
          "linear-gradient(180deg, rgba(33,48,38,0.10) 0%, rgba(33,48,38,0.42) 100%), linear-gradient(90deg, #255c38, #255c38)",
        ...fade(visible),
      }}
    >
      {/* Decorative leaf overlays */}
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

      <h2
        className="relative z-10 font-bold text-[#f4fff8] text-3xl sm:text-4xl lg:text-[48px] leading-[1.35] max-w-3xl"
        style={fade(visible, 100)}
      >
        Ready to Improve Your Agricultural Performance with Biotechnology?
      </h2>
      <p
        className="relative z-10 text-[#f4fff8]/80 font-medium text-base lg:text-lg leading-relaxed"
        style={fade(visible, 200)}
      >
        Join hundreds of farmers and distributors already benefiting from our innovative bio-solutions.
      </p>
      <a
        href="/contact"
        className="relative z-10 mt-2 inline-flex items-center gap-3 bg-[#ffb800] text-[#213026] font-bold text-lg
          px-8 py-4 rounded-[52px] hover:brightness-105 hover:scale-[1.03] active:scale-[0.98]
          transition-all duration-200 group"
        style={{
          ...(fade(visible, 300)),
          animation: visible ? "pulse-glow 2.8s ease-in-out infinite 1s" : "none",
        }}
      >
        Go Bio, and save the world with us
        <span className="group-hover:translate-x-0.5 transition-transform block">
          <ArrowRight size={20} />
        </span>
      </a>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  const [ref, visible] = useReveal();

  return (
    <footer ref={ref}
      className="w-full mt-5 rounded-tl-[8px] rounded-tr-[80px] rounded-br-[8px] rounded-bl-[80px] overflow-hidden
        px-6 sm:px-16 lg:px-[200px] pt-14 lg:pt-[100px] pb-10 lg:pb-[72px] bg-[#213026] text-[#f4fff8]"
      style={fade(visible)}>
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 mb-12">
        <a href="#" className="flex items-center gap-3 shrink-0 hover:opacity-85 transition-opacity">
          <img src={LOGO_GLYPH_LIGHT} alt="" className="h-[52px] w-[36px] lg:h-[90px] lg:w-[63px]" />
          <img src={LOGO_TEXT_LIGHT} alt="PGPR Technologies" className="h-[30px] w-[78px] lg:h-[50px] lg:w-[130px]" />
        </a>

        <div className="flex gap-8 sm:gap-16 lg:gap-[140px]">
          <div className="flex flex-col gap-5">
            <h4 className="font-bold text-2xl lg:text-[40px] lg:leading-[52px]">Learn More</h4>
            <nav className="flex flex-col gap-4 font-medium text-[15px]">
              {["About", "Products", "Contact"].map((l) => (
                <a key={l} href="#"
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

function HeroWrapper() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setMouse({
          x: (e.clientX - r.left) / r.width  - 0.5,
          y: (e.clientY - r.top)  / r.height - 0.5,
        });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <HeroLeaves mouse={mouse} animated={!introPlayed} />
      <Hero />
    </div>
  );
}

export default function Home() {
  useSectionScroll();
  return (
    <div className="bg-[#f4fff8] min-h-screen">
      <Navbar />
      <SectionDots />
      <div className="max-w-[1880px] mx-auto px-5">
        <main className="flex flex-col gap-14 lg:gap-[130px]">
          <HeroWrapper />
          <SustainableSection />
          <ProductsSection />
          <SolutionsSection />
          <TechnologySection />
          <PioneeringSection />
          <CTABanner />
        </main>
        <Footer />
      </div>
    </div>
  );
}
