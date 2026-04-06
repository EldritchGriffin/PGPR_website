"use client";

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
const LOGO_GLYPH        = "/assets/logo-glyph.svg";
const LOGO_TEXT         = "/assets/logo-text.svg";
const LOGO_GLYPH_LIGHT  = "/assets/logo-glyph-light.svg";
const LOGO_TEXT_LIGHT   = "/assets/logo-text-light.svg";
const PGPR_GRASS        = "/assets/pgpr-grass.svg";

// Team member photos — placeholders until assets are downloaded
const TEAM_PHOTOS: Record<string, string> = {};

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

// ─── Shared UI ────────────────────────────────────────────────────────────────
function ArrowRight({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
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

function YellowBtn({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick}
      className="inline-flex items-center gap-3 bg-[#ffb800] rounded-full pl-5 pr-1.5 py-1.5 font-bold text-[#213026] text-sm
        hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group shrink-0 w-fit">
      <span>{label}</span>
      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f4fff8] group-hover:bg-white transition-colors shrink-0">
        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",         href: "/" },
  { label: "Products",     href: "/#products" },
  { label: "About",        href: "/about" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 transition-all duration-500
      bg-[#f4fff8]/95 backdrop-blur-xl shadow-[0_2px_24px_rgba(33,48,38,0.08)] py-3">
      <div className="max-w-[1880px] mx-auto px-6 sm:px-12 lg:px-[120px] flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 shrink-0 hover:opacity-85 transition-opacity">
          <img src={LOGO_GLYPH} alt="" className="h-[50px] w-[35px]" />
          <img src={LOGO_TEXT} alt="PGPR Technologies" className="h-[27px] w-[70px]" />
        </a>

        <ul className="hidden lg:flex items-center gap-8 xl:gap-10 font-semibold text-lg xl:text-[22px]">
          {NAV_LINKS.map(({ label, href }) => {
            const active = href === "/about";
            return (
              <li key={label}>
                <a href={href}
                  className="relative transition-colors duration-500 whitespace-nowrap"
                  style={{ color: active ? C.green : C.dark }}>
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

// ─── Hero Banner ──────────────────────────────────────────────────────────────
function HeroBanner() {
  const [ref, visible] = useReveal();

  return (
    <section ref={ref} className="w-full pt-28 lg:pt-24">
      <div
        className="relative w-full min-h-[400px] lg:min-h-[520px] overflow-hidden"
        style={{
          borderRadius: "8px 80px",
          backgroundColor: "#1a4a28",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(18px)",
          transition: `opacity 0.9s ${EXPO}, transform 0.9s ${EXPO}`,
        }}
      >
        {/* Logo — centred in the hero card */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-5">
            <img src={LOGO_GLYPH_LIGHT} alt="" style={{ width: 108, height: 152 }} />
            <img src={LOGO_TEXT_LIGHT} alt="PGPR Technologies" style={{ width: 228, height: 88 }} />
          </div>
        </div>
        {/* Decorative leaf pattern borders */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1880 778" preserveAspectRatio="none">
          <ellipse cx="1242" cy="1238" rx="1242" ry="1863" fill="none" stroke="rgba(255,184,0,0.125)" strokeWidth="160" />
          <ellipse cx="848" cy="647" rx="848" ry="1271" fill="none" stroke="rgba(255,184,0,0.125)" strokeWidth="160" />
          <ellipse cx="1242" cy="1238" rx="1242" ry="1863" fill="none" stroke="rgba(255,184,0,0.25)" strokeWidth="8" />
          <ellipse cx="848" cy="647" rx="848" ry="1271" fill="none" stroke="rgba(255,184,0,0.25)" strokeWidth="8" />
        </svg>

        {/* Floating leaves */}
        <div aria-hidden>
          {/* Left large leaf */}
          <div style={{ position: "absolute", pointerEvents: "none", left: "-5%", top: "20%", width: "clamp(80px, 14%, 180px)", animation: `leaf-fly-left 2s ${EXPO} 200ms both`, zIndex: 10 }}>
            <img src="/assets/leaf-left-large.png" alt="" style={{ width: "100%", display: "block", opacity: 0.82 }} />
          </div>
          {/* Right large leaf */}
          <div style={{ position: "absolute", pointerEvents: "none", right: "-4%", bottom: "5%", width: "clamp(100px, 22%, 280px)", animation: `leaf-fly-right 2s ${EXPO} 400ms both`, zIndex: 10 }}>
            <img src="/assets/leaf-right-large.png" alt="" style={{ width: "100%", display: "block", opacity: 0.85 }} />
          </div>
          {/* Cluster — upper right */}
          <div style={{ position: "absolute", pointerEvents: "none", right: "10%", top: "8%", width: "clamp(60px, 10%, 140px)", animation: `leaf-fly-top 2s ${EXPO} 500ms both`, zIndex: 10 }}>
            <img src="/assets/leaf-cluster-mid.png" alt="" style={{ width: "100%", display: "block", opacity: 0.70 }} />
          </div>
          {/* Tiny-a — lower left accent */}
          <div style={{ position: "absolute", pointerEvents: "none", left: "10%", bottom: "10%", width: "clamp(36px, 6%, 72px)", animation: `leaf-fly-bottom 2s ${EXPO} 600ms both`, zIndex: 10 }}>
            <img src="/assets/leaf-tiny-a.png" alt="" style={{ width: "100%", display: "block", opacity: 0.65 }} />
          </div>
          {/* Tiny-b — upper left accent */}
          <div style={{ position: "absolute", pointerEvents: "none", left: "18%", top: "12%", width: "clamp(30px, 5%, 60px)", animation: `leaf-fly-top 2s ${EXPO} 350ms both`, zIndex: 10 }}>
            <img src="/assets/leaf-tiny-b.png" alt="" style={{ width: "100%", display: "block", opacity: 0.58, transform: "rotate(16deg)" }} />
          </div>
          {/* Small right — mid-right accent */}
          <div style={{ position: "absolute", pointerEvents: "none", right: "4%", top: "10%", width: "clamp(30px, 5%, 60px)", animation: `leaf-fly-top 2s ${EXPO} 650ms both`, zIndex: 10 }}>
            <img src="/assets/leaf-small-right.png" alt="" style={{ width: "100%", display: "block", opacity: 0.62 }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Row ────────────────────────────────────────────────────────────────
const STATS = [
  { value: "100%", label: "Customer Satisfaction Rate", desc: "Solutions developed from organic waste streams, driving environmentally responsible agriculture." },
  { value: "20+",  label: "Years of Experience",        desc: "With diverse agricultural backgrounds, our team brings over two decades of combined experience." },
  { value: "160K", label: "Farmer Around the World",    desc: "Our biological solutions have helped farmers worldwide improve sustainability and crop output." },
];

function StatsRow() {
  const [ref, visible] = useReveal();

  return (
    <section ref={ref} className="w-full py-12 lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
        {STATS.map((s, i) => (
          <div key={s.value} className="relative flex flex-col gap-2" style={fade(visible, i * 120)}>
            {/* Small leaf accent */}
            <div
              className="w-3 h-3 mb-1"
              style={{
                backgroundColor: i % 2 === 0 ? C.green : C.amber,
                borderRadius: "2px 50% 2px 50%",
              }}
            />
            <span className="font-bold text-[#2dba5d] text-4xl lg:text-[56px] lg:leading-[1.1]">{s.value}</span>
            <span className="font-bold text-[#213026] text-base lg:text-lg">{s.label}</span>
            <p className="text-[#696969] font-medium text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Differentiators Section ──────────────────────────────────────────────────
const DIFFERENTIATORS = [
  {
    title: "Scientific R&D Excellence",
    desc: "PGPR develops innovative biotechnology solutions that support sustainable agriculture and circular economy systems.",
  },
  {
    title: "Field-Proven Results",
    desc: "PGPR develops innovative biotechnology solutions that support sustainable agriculture and circular economy systems.",
  },
  {
    title: "Eco-Friendly Formulations",
    desc: "PGPR develops innovative biotechnology solutions that support sustainable agriculture and circular economy systems.",
  },
  {
    title: "Farmer-First Approach",
    desc: "PGPR develops innovative biotechnology solutions that support sustainable agriculture and circular economy systems.",
  },
];

function DifferentiatorsSection() {
  const [ref, visible] = useReveal();

  return (
    <section ref={ref} className="w-full py-12 lg:py-16">
      <div className="flex flex-col gap-10">
        {/* Header */}
        <div className="flex items-start gap-4" style={fade(visible)}>
          <SectionLeaf visible={visible} delay={0} />
          <h2 className="font-bold text-[#213026] text-3xl sm:text-4xl lg:text-[48px] lg:leading-[1.2]">
            We are Different<br />in Every Way
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          {DIFFERENTIATORS.map((d, i) => (
            <div
              key={d.title}
              className="relative bg-[#213026] p-7 lg:p-9 flex flex-col gap-4 overflow-hidden"
              style={{
                ...fade(visible, 100 + i * 100),
                borderRadius: "8px 80px",
              }}
            >
              {/* Subtle background leaf watermark */}
              <svg className="absolute -right-6 -bottom-6 w-32 h-32 opacity-[0.04]" viewBox="0 0 100 100" fill="#f4fff8">
                <path d="M50 5C50 5 20 25 15 55C10 85 40 95 50 95C60 95 90 85 85 55C80 25 50 5 50 5Z" />
                <path d="M50 95V30" stroke="#f4fff8" strokeWidth="2" fill="none" />
              </svg>
              {/* Amber leaf icon */}
              <div
                className="w-10 h-10 shrink-0"
                style={{
                  backgroundColor: C.amber,
                  borderRadius: "4px 50% 4px 50%",
                }}
              />
              <h3 className="font-bold text-[#f4fff8] text-xl lg:text-[28px]">{d.title}</h3>
              <p className="text-[#f4fff8]/70 font-medium text-sm leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Team Section ─────────────────────────────────────────────────────────────
interface TeamMember {
  name: string;
  role: string;
  flag?: string;
  photo?: string;
}

const BIZ_TEAM: TeamMember[] = [
  { name: "Hamza El Kharroubi", role: "Co-founder & CEO, MA in\nEco-criticism, trained manager", flag: "🇲🇦", photo: "/assets/hamza.png" },
  { name: "Bernardus Steven Harageib", role: "Responsible of Expansion", flag: "🇳🇱", photo: "/assets/bernardus.png" },
  { name: "Fadoua Baddih", role: "Head of Marketing team", flag: "🇲🇦", photo: "/assets/fadoua.png" },
  { name: "Samson Umahonien", role: "Responsible of Expansion", flag: "🇳🇬", photo: "/assets/samson.png" },
  { name: "Anas EL Kharroubi", role: "Responsible of Expansion", flag: "🇲🇦", photo: "/assets/anas.png" },
  { name: "Ibtihal Taakchat", role: "Administrative Assistant", flag: "🇲🇦", photo: "/assets/ibtihal.png" },
  { name: "Amira RAZOUK", role: "Administrative Assistant", flag: "🇲🇦", photo: "/assets/amira.png" },
  { name: "Ilyas Said El Medhoun", role: "Fundraising Technician", flag: "🇮🇹", photo: "/assets/ilyas.png" },
  { name: "Hiba Daif", role: "Communications Officer", flag: "🇲🇦", photo: "/assets/hiba.png" },
];

const RD_TEAM: TeamMember[] = [
  { name: "Abdessadek Aghrinane", role: "Founder & COO\nDoctorate in biotechnology", flag: "🇲🇦", photo: "/assets/abdessadak.png" },
  { name: "Dr. Meryem Hdia", role: "Co-Founder CTO\nPHD in biology", flag: "🇲🇦", photo: "/assets/meryem.png" },
  { name: "Doctorate Otmane El Miloudi", role: "Agritech specialist\nTwo masters in biotech", flag: "🇲🇦", photo: "/assets/otman.png" },
  { name: "Dr. Youssef Ait Hamdan", role: "Product Manager\nDoctorate in biotechnology", flag: "🇲🇦", photo: "/assets/youssef.png" },
  { name: "Haytame EL Mhassan", role: "Production Technician", flag: "🇧🇪", photo: "/assets/haytame.png" },
  { name: "Tarek Anakkar", role: "Technical Manager", flag: "🇲🇦", photo: "/assets/tarek.png" },
];

// ─── Team Card: vertical (photo top, name+role below) ─────────────────────────
function TeamCard({
  member, delay, visible, radius = "6px",
}: {
  member: TeamMember; delay: number; visible: boolean; radius?: string;
}) {
  return (
    <div
      className="flex flex-col justify-center items-center p-4 gap-3 flex-1 self-stretch"
      style={{
        background: "rgba(45, 186, 93, 0.1)",
        borderRadius: radius,
        ...fade(visible, delay),
      }}
    >
      <div className="w-[72px] h-[72px] rounded-full bg-[#c4dcc5] shrink-0 overflow-hidden flex items-center justify-center text-base font-bold text-[#255c38]">
        {member.photo
          ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
          : member.name.split(" ").map(n => n[0]).join("").slice(0, 2)
        }
      </div>
      <div className="flex flex-col justify-center items-center gap-1 self-stretch">
        <div className="flex items-center justify-center gap-1">
          <span className="font-bold text-[#2dba5d] text-sm text-center leading-[125%]">
            {member.name}
          </span>
          {member.flag && <span className="text-xs">{member.flag}</span>}
        </div>
        <span className="font-bold text-[#f4fff8] text-xs leading-[140%] text-center self-stretch whitespace-pre-line">
          {member.role}
        </span>
      </div>
    </div>
  );
}

// ─── CEO Card: horizontal (photo left, name+role right) ──────────────────────
function CeoCard({ member, delay, visible }: { member: TeamMember; delay: number; visible: boolean }) {
  return (
    <div
      className="flex items-center justify-center p-4 gap-5 self-stretch"
      style={{
        background: "rgba(45, 186, 93, 0.1)",
        borderRadius: "6px 16px 6px 6px",
        ...fade(visible, delay),
      }}
    >
      <div className="w-[72px] h-[72px] rounded-full bg-[#c4dcc5] shrink-0 overflow-hidden flex items-center justify-center text-base font-bold text-[#255c38]">
        {member.photo
          ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
          : member.name.split(" ").map(n => n[0]).join("").slice(0, 2)
        }
      </div>
      <div className="flex flex-col justify-center items-start gap-1">
        <div className="flex items-center gap-1">
          <span className="font-bold text-[#2dba5d] text-base leading-[125%]">
            {member.name}
          </span>
          {member.flag && <span className="text-xs">{member.flag}</span>}
        </div>
        <span className="font-bold text-[#f4fff8] text-sm leading-[150%] whitespace-pre-line">
          {member.role}
        </span>
      </div>
    </div>
  );
}

// ─── R&D Card: horizontal (photo left, name+role right) ─────────────────────
function RdCard({
  member, delay, visible, radius = "6px",
}: {
  member: TeamMember; delay: number; visible: boolean; radius?: string;
}) {
  return (
    <div
      className="flex items-center p-4 gap-4 self-stretch flex-1"
      style={{
        background: "rgba(255, 184, 0, 0.1)",
        borderRadius: radius,
        ...fade(visible, delay),
      }}
    >
      <div className="w-[60px] h-[60px] rounded-full bg-[#c4a850] shrink-0 overflow-hidden flex items-center justify-center text-base font-bold text-[#845900]">
        {member.photo
          ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
          : member.name.split(" ").map(n => n[0]).join("").slice(0, 2)
        }
      </div>
      <div className="flex flex-col justify-center items-start gap-1">
        <div className="flex items-center gap-1">
          <span className="font-bold text-[#ffb800] text-sm lg:text-base leading-[125%]">
            {member.name}
          </span>
          {member.flag && <span className="text-xs">{member.flag}</span>}
        </div>
        <span className="font-bold text-[#f4fff8] text-xs leading-[150%] whitespace-pre-line">
          {member.role}
        </span>
      </div>
    </div>
  );
}

function TeamSection() {
  const [ref, visible] = useReveal();

  // BD grid: rows of 2 (excluding CEO)
  const bdRest = BIZ_TEAM.slice(1);
  const bdRows: TeamMember[][] = [];
  for (let i = 0; i < bdRest.length; i += 2) {
    bdRows.push(bdRest.slice(i, i + 2));
  }
  const lastBdRowIdx = bdRows.length - 1;

  return (
    <section ref={ref} className="w-full py-10 lg:py-12">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center max-w-3xl mx-auto" style={fade(visible)}>
          <SectionLeaf visible={visible} delay={0} />
          <h2 className="font-bold text-[#213026] text-2xl sm:text-3xl lg:text-[40px] lg:leading-[1.2]">
            Meet Our Team
          </h2>
          <p className="text-[#696969] font-medium text-sm leading-relaxed">
            A multidisciplinary group of scientists, engineers, and agricultural
            specialists dedicated to transforming organic waste into sustainable solutions.
          </p>
        </div>

        {/* Team columns with floating badges */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">

            {/* ═══ Business Development ═══ */}
            <div className="bg-[#255c38] p-5 flex flex-col items-center gap-4"
              style={{ borderRadius: "80px 8px 8px 8px", ...fade(visible, 100) }}>

              {/* Title block */}
              <div className="flex flex-col items-start gap-0.5">
                <h3 className="font-bold text-[#f4fff8] text-lg lg:text-xl leading-[150%]">
                  Business Development
                </h3>
                <span className="font-bold text-[#2dba5d] text-lg lg:text-xl leading-[150%]">
                  35 Years of Experience
                </span>
              </div>

              {/* CEO — horizontal card */}
              <CeoCard member={BIZ_TEAM[0]} delay={200} visible={visible} />

              {/* Grid members — rows of 2 */}
              {bdRows.map((row, ri) => (
                <div key={ri} className="flex flex-col sm:flex-row items-center gap-4 self-stretch">
                  {row.map((m, ci) => {
                    const isLastRow = ri === lastBdRowIdx;
                    const isLeftCard = ci === 0;
                    const r = isLastRow && isLeftCard ? "6px 6px 6px 16px" : "6px";
                    return (
                      <TeamCard
                        key={m.name}
                        member={m}
                        delay={260 + (ri * 2 + ci) * 50}
                        visible={visible}
                        radius={r}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* ═══ R&D and Production ═══ */}
            <div className="bg-[#845900] p-5 flex flex-col items-center gap-4 rounded-lg"
              style={fade(visible, 200)}>

              {/* Title block */}
              <div className="flex flex-col items-start gap-0.5 self-stretch">
                <h3 className="font-bold text-[#f4fff8] text-lg lg:text-xl leading-[150%] text-center self-stretch">
                  R&D and Production
                </h3>
                <span className="font-bold text-[#ffb800] text-lg lg:text-xl leading-[150%] text-center self-stretch">
                  20 Years of Experience
                </span>
              </div>

              {/* R&D members — vertical stack of horizontal cards */}
              {RD_TEAM.map((m, i) => {
                const isFirst = i === 0;
                const isLast = i === RD_TEAM.length - 1;
                const r = isFirst ? "6px 16px 6px 6px" : isLast ? "6px 6px 6px 16px" : "6px";
                return (
                  <RdCard
                    key={m.name}
                    member={m}
                    delay={260 + i * 50}
                    visible={visible}
                    radius={r}
                  />
                );
              })}
            </div>
          </div>

          {/* Floating badges column */}
          <div className="hidden lg:flex flex-col items-start gap-4 w-[170px]"
            style={fade(visible, 500)}>
            <div className="flex flex-col justify-center items-center p-8 gap-4 self-stretch flex-1 bg-[#213026] rounded-lg text-center">
              <span className="font-bold text-[#ffb800] text-xl leading-[125%]">
                20T waste<br />per day
              </span>
            </div>
            <div className="flex flex-col justify-center items-center p-8 gap-4 self-stretch flex-1 bg-[#213026] text-center"
              style={{ borderRadius: "8px 8px 80px 8px" }}>
              <span className="font-bold text-[#2dba5d] text-xl leading-[125%]">
                We invest<br />In nature
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ──────────────────────────────────────────────────────────────
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
      ref={ref}
      className="w-full mt-8 rounded-tl-[8px] rounded-tr-[8px] rounded-br-[80px] rounded-bl-[8px] overflow-hidden
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
    <footer ref={ref}
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
export default function AboutPage() {
  useEffect(() => { pageVisited = true; }, []); 
  return (
    <div style={{ backgroundColor: C.mint }} className="min-h-screen">
      <Navbar />
      <div className="max-w-[1880px] mx-auto px-5">
        <main className="flex flex-col">
          <HeroBanner />
          <DifferentiatorsSection />
          <StatsRow />
          <TeamSection />
          <CTABanner />
          <Footer />
        </main>
      </div>
    </div>
  );
}
