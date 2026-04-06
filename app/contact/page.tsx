"use client";

import { useState, useEffect, useRef } from "react";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  mint:  "#f4fff8",
  dark:  "#213026",
  mid:   "#255c38",
  green: "#2dba5d",
  amber: "#ffb800",
} as const;

// ─── Assets ───────────────────────────────────────────────────────────────────
const LOGO_GLYPH       = "/assets/logo-glyph.svg";
const LOGO_TEXT        = "/assets/logo-text.svg";
const LOGO_GLYPH_LIGHT = "/assets/logo-glyph-light.svg";
const LOGO_TEXT_LIGHT  = "/assets/logo-text-light.svg";

// ─── Animation helpers ────────────────────────────────────────────────────────
const EXPO = "cubic-bezier(0.16,1,0.3,1)";

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

function ArrowRight({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "Products", href: "/#products" },
  { label: "About",    href: "/about" },
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
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href}
                className="relative transition-colors duration-300 whitespace-nowrap hover:text-[#2dba5d]"
                style={{ color: C.dark }}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex shrink-0">
          <a href="/contact"
            className="flex items-center gap-2 bg-[#ffb800] rounded-[48px] px-6 h-[61px] font-bold text-[#213026]
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
          <a href="/contact"
            className="flex items-center gap-2 bg-[#ffb800] rounded-[48px] px-6 py-3 font-bold text-[#213026]
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
        className="relative w-full overflow-hidden"
        style={{
          minHeight: 520,
          borderRadius: "8px 80px",
          background:
            "linear-gradient(100.79deg, rgba(45,186,93,0.47) 1.34%, rgba(8,12,9,0.47) 92.85%), #255C38",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(18px)",
          transition: `opacity 0.9s ${EXPO}, transform 0.9s ${EXPO}`,
        }}>

        {/* Amber ellipse decorations */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1880 778" preserveAspectRatio="none">
          <ellipse cx="1242" cy="1238" rx="1242" ry="1863" fill="none" stroke="rgba(255,184,0,0.125)" strokeWidth="160" />
          <ellipse cx="848" cy="647"  rx="848"  ry="1271" fill="none" stroke="rgba(255,184,0,0.125)" strokeWidth="160" />
          <ellipse cx="1242" cy="1238" rx="1242" ry="1863" fill="none" stroke="rgba(255,184,0,0.25)"  strokeWidth="8" />
          <ellipse cx="848" cy="647"  rx="848"  ry="1271" fill="none" stroke="rgba(255,184,0,0.25)"  strokeWidth="8" />
        </svg>

        {/* Decorative PGPR glyph — large, anchored bottom-right behind content */}
        <div
          className="absolute pointer-events-none"
          aria-hidden
          style={{ right: "-2%", bottom: "-12%", width: "clamp(300px, 42%, 560px)", zIndex: 1 }}>
          <img
            src="/assets/glypth.svg"
            alt=""
            className="w-full h-auto"
          />
        </div>

        {/* Hero text */}
        <div className="relative z-10 px-10 sm:px-16 lg:px-[80px] py-16 lg:py-[100px] max-w-full lg:max-w-[70%]">
          <h1
            className="font-bold text-[#f4fff8] text-5xl sm:text-6xl lg:text-[80px] xl:text-[100px] leading-[0.98]"
            style={fade(visible, 60)}>
            Let&apos;s Talk
          </h1>
          <p
            className="mt-6 text-[#f4fff8] font-normal text-base sm:text-lg lg:text-[26px] xl:text-[32px] leading-[1.35] max-w-[560px]"
            style={fade(visible, 140)}>
            Have questions about our products or technologies?
            We&apos;d love to hear from you.
          </p>
        </div>

        {/* Floating leaves */}
        <div aria-hidden>
          {/* Large leaf — left edge */}
          <div style={{ position: "absolute", pointerEvents: "none", left: "-5%", top: "20%", width: "clamp(70px, 12%, 160px)", animation: `leaf-fly-left 2s ${EXPO} 200ms both`, zIndex: 10 }}>
            <img src="/assets/leaf-left-large.png" alt="" style={{ width: "100%", display: "block", opacity: 0.82 }} />
          </div>
          {/* Cluster — upper right, behind glyph */}
          <div style={{ position: "absolute", pointerEvents: "none", right: "38%", top: "6%", width: "clamp(50px, 8%, 110px)", animation: `leaf-fly-top 2s ${EXPO} 450ms both`, zIndex: 10 }}>
            <img src="/assets/leaf-cluster-mid.png" alt="" style={{ width: "100%", display: "block", opacity: 0.68 }} />
          </div>
          {/* Tiny-a — top right corner */}
          <div style={{ position: "absolute", pointerEvents: "none", right: "12%", top: "10%", width: "clamp(28px, 5%, 60px)", animation: `leaf-fly-top 2s ${EXPO} 600ms both`, zIndex: 20 }}>
            <img src="/assets/leaf-tiny-a.png" alt="" style={{ width: "100%", display: "block", opacity: 0.55 }} />
          </div>
          {/* Tiny-b — bottom right, over glyph */}
          <div style={{ position: "absolute", pointerEvents: "none", right: "7%", bottom: "8%", width: "clamp(28px, 5%, 60px)", animation: `leaf-fly-bottom 2s ${EXPO} 300ms both`, zIndex: 20 }}>
            <img src="/assets/leaf-tiny-b.png" alt="" style={{ width: "100%", display: "block", opacity: 0.65, transform: "rotate(16deg)" }} />
          </div>
          {/* Small-left — bottom left accent */}
          <div style={{ position: "absolute", pointerEvents: "none", left: "8%", bottom: "8%", width: "clamp(24px, 4%, 52px)", animation: `leaf-fly-bottom 2s ${EXPO} 500ms both`, zIndex: 10 }}>
            <img src="/assets/leaf-small-left.png" alt="" style={{ width: "100%", display: "block", opacity: 0.58 }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact info cards ────────────────────────────────────────────────────────
const CONTACT_CARDS = [
  {
    label: "Email",
    details: ["hello@pgpr.tech"],
    radius: "80px 8px 8px 8px",
    icon: (
      <svg width="45" height="34" viewBox="0 0 48 36" fill="none">
        <rect x="1.5" y="1.5" width="45" height="33" rx="3" stroke="#F4FFF8" strokeWidth="2.5" />
        <path d="M2 4L24 20L46 4" stroke="#F4FFF8" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Phone",
    details: ["+212 6 35 69 94 47", "+212 6 50 99 55 47"],
    radius: "8px",
    icon: (
      <svg width="30" height="48" viewBox="0 0 30 50" fill="none">
        <rect x="1.5" y="1.5" width="27" height="47" rx="4" stroke="#F4FFF8" strokeWidth="2.5" />
        <circle cx="15" cy="42" r="3" fill="#F4FFF8" />
        <rect x="10" y="7" width="10" height="2.5" rx="1.25" fill="#F4FFF8" />
      </svg>
    ),
  },
  {
    label: "Social Media",
    details: ["@PGPR.tech", "+212 6 50 99 55 47"],
    radius: "8px",
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <circle cx="26" cy="26" r="24" stroke="#F4FFF8" strokeWidth="2.5" />
        <ellipse cx="26" cy="26" rx="11" ry="24" stroke="#F4FFF8" strokeWidth="2.5" />
        <line x1="2" y1="20" x2="50" y2="20" stroke="#F4FFF8" strokeWidth="2.5" />
        <line x1="2" y1="33" x2="50" y2="33" stroke="#F4FFF8" strokeWidth="2.5" />
      </svg>
    ),
  },
];

function ContactCards() {
  const [ref, visible] = useReveal();

  return (
    <section ref={ref} className="w-full py-6 lg:py-8">
      <div className="flex flex-col sm:flex-row gap-6">
        {CONTACT_CARDS.map((card, i) => (
          <div
            key={card.label}
            className="flex-1 flex flex-col items-center border border-[#4B9D6D]"
            style={{
              background: "#1E8549",
              borderRadius: card.radius,
              padding: "49px 20px",
              gap: 28,
              ...fade(visible, i * 100),
            }}>
            {/* Icon inside circle */}
            <div
              className="w-[85px] h-[85px] rounded-full flex items-center justify-center shrink-0"
              style={{ background: "#4B9D6D" }}>
              {card.icon}
            </div>
            {/* Label + details */}
            <div className="flex flex-col items-center gap-1.5 text-center">
              <span className="font-bold text-[#f4fff8] text-2xl lg:text-[28px] leading-[1.5]">
                {card.label}
              </span>
              {card.details.map((d) => (
                <span key={d} className="text-[#f4fff8] font-medium text-base lg:text-[20px] leading-[1.3]">
                  {d}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Contact form + Map ────────────────────────────────────────────────────────
const INQUIRY_OPTIONS = [
  "General Inquiry",
  "Product Information",
  "Partnership",
  "Support",
  "Demo Request",
];

const INPUT_STYLE: React.CSSProperties = {
  background: "#F4FFF8",
  border: "1px solid #D0D5DD",
  boxShadow: "0px 1px 2px rgba(16,24,40,0.05)",
  borderRadius: 8,
  padding: "12px 16px",
  color: "#213026",
  fontFamily: "inherit",
  fontSize: 16,
  fontWeight: 500,
  width: "100%",
  height: 52,
  outline: "none",
};

function Label({ text }: { text: string }) {
  return <label className="text-[#f4fff8] font-medium text-sm">{text}</label>;
}

function ContactSection() {
  const [ref, visible] = useReveal();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
    agreed: false,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up form submission endpoint
  }

  return (
    <section ref={ref} className="w-full py-6 lg:py-8">
      <div className="flex flex-col lg:flex-row gap-14 lg:gap-[57px]">

        {/* ─── Left: form ─── */}
        <div
          className="relative flex-[1_1_55%] rounded-lg overflow-hidden flex flex-col gap-10
            px-8 py-12 sm:px-12 sm:py-16 lg:px-[63px] lg:py-[100px]"
          style={{ background: C.dark, ...fade(visible, 0) }}>

          {/* Decorative amber ellipse patterns inside form card */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg" aria-hidden>
            <svg className="absolute" style={{ right: "-40%", top: "-20%", width: "120%", opacity: 0.08 }} viewBox="0 0 2289 3434" fill="none">
              <ellipse cx="1144" cy="1717" rx="1144" ry="1717" stroke="rgba(255,184,0,1)" strokeWidth="160" fill="none"/>
              <ellipse cx="781" cy="1172" rx="781" ry="1172" stroke="rgba(255,184,0,1)" strokeWidth="160" fill="none"/>
            </svg>
            {/* Leaf accents inside form card */}
            <img src="/assets/leaf-cluster-mid.png" alt="" style={{ position: "absolute", width: "clamp(60px, 18%, 140px)", top: "-2%", right: "4%", opacity: 0.18 }} />
            <img src="/assets/leaf-tiny-a.png" alt="" style={{ position: "absolute", width: "clamp(30px, 8%, 60px)", bottom: "6%", right: "8%", opacity: 0.22 }} />
            <img src="/assets/leaf-tiny-b.png" alt="" style={{ position: "absolute", width: "clamp(24px, 6%, 50px)", bottom: "12%", left: "5%", opacity: 0.18, transform: "rotate(20deg)" }} />
          </div>

          <h2
            className="relative font-semibold text-[#f4fff8] text-3xl lg:text-[48px] leading-[1.35]"
            style={fade(visible, 40)}>
            Get in Touch
          </h2>

          <form onSubmit={handleSubmit} className="relative flex flex-col gap-6">
            {/* First name + Last name */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-1.5">
                <Label text="First name" />
                <input
                  name="firstName" value={form.firstName} onChange={handleChange}
                  placeholder="First name"
                  style={INPUT_STYLE}
                  className="focus:border-[#2dba5d] transition-colors" />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <Label text="Last name" />
                <input
                  name="lastName" value={form.lastName} onChange={handleChange}
                  placeholder="Last name"
                  style={INPUT_STYLE}
                  className="focus:border-[#2dba5d] transition-colors" />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label text="Email" />
              <input
                name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="you@company.com"
                style={INPUT_STYLE}
                className="focus:border-[#2dba5d] transition-colors" />
            </div>

            {/* Phone with country code */}
            <div className="flex flex-col gap-1.5">
              <Label text="Phone number" />
              <div
                className="flex items-stretch"
                style={{ ...INPUT_STYLE, padding: 0, height: 52, overflow: "hidden" }}>
                <div
                  className="flex items-center gap-1 px-3 shrink-0 border-r border-[#D0D5DD]"
                  style={{ color: C.dark }}>
                  <span className="font-medium text-base leading-none">MA</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
                <input
                  name="phone" type="tel" value={form.phone} onChange={handleChange}
                  placeholder="+212 60 00 000 00"
                  style={{
                    ...INPUT_STYLE,
                    border: "none",
                    boxShadow: "none",
                    borderRadius: 0,
                    background: "transparent",
                    height: "100%",
                    flex: 1,
                  }}
                  className="focus:outline-none" />
              </div>
            </div>

            {/* Inquiry Type */}
            <div className="flex flex-col gap-1.5">
              <Label text="Inquiry Type" />
              <div className="relative">
                <select
                  name="inquiryType" value={form.inquiryType} onChange={handleChange}
                  style={{ ...INPUT_STYLE, paddingRight: 40, cursor: "pointer" }}
                  className="appearance-none focus:border-[#2dba5d] transition-colors">
                  <option value="" disabled>General Inquiry</option>
                  {INQUIRY_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <Label text="Message" />
              <textarea
                name="message" value={form.message} onChange={handleChange}
                placeholder="Your message..."
                rows={5}
                style={{ ...INPUT_STYLE, height: "auto", resize: "vertical" }}
                className="focus:border-[#2dba5d] transition-colors" />
            </div>

            {/* Privacy checkbox */}
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox" name="agreed"
                checked={form.agreed} onChange={handleChange}
                className="w-5 h-5 rounded-[6px] border border-[#D0D5DD] bg-[#F4FFF8] shrink-0
                  accent-[#2dba5d] cursor-pointer" />
              <span className="text-[#f4fff8] font-medium text-base leading-[1.5]">
                You agree to our friendly privacy policy.
              </span>
            </label>

            {/* Send button */}
            <div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#ffb800] text-[#213026] font-bold text-base
                  px-6 py-3 rounded-[24px] hover:brightness-105 hover:scale-[1.02]
                  active:scale-[0.98] transition-all duration-200">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="#213026" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* ─── Right: map + demo card ─── */}
        <div
          className="flex-[1_1_45%] flex flex-col gap-6"
          style={fade(visible, 120)}>

          {/* Office location header */}
          <div className="flex items-center gap-3">
            <svg width="26" height="34" viewBox="0 0 26 34" fill="none">
              <path
                d="M13 1C6.37 1 1 6.37 1 13C1 21.75 13 33 13 33C13 33 25 21.75 25 13C25 6.37 19.63 1 13 1Z"
                fill="#213026" />
              <circle cx="13" cy="13" r="4" fill="#F4FFF8" />
            </svg>
            <h3 className="font-semibold text-[#213026] text-xl lg:text-2xl">
              Office Location
            </h3>
          </div>

          {/* Map */}
          <div className="w-full overflow-hidden" style={{ borderRadius: 8, minHeight: 360, flex: "1 1 auto" }}>
            <iframe
              title="PGPR Office Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-7.65%2C33.55%2C-7.55%2C33.62&layer=mapnik"
              className="w-full h-full"
              style={{ minHeight: 360, border: 0 }}
              loading="lazy"
            />
          </div>

          {/* Request a Demo card */}
          <div
            className="flex flex-col items-start gap-6 p-10 lg:p-14"
            style={{ background: "#1E8549", borderRadius: "8px 8px 120px 8px" }}>
            <h3 className="font-semibold text-[#f4fff8] text-2xl lg:text-[32px] leading-[1.35]">
              Request a Demo
            </h3>
            <p className="text-[#f4fff8] font-medium text-base leading-relaxed">
              See our products in action. Schedule a personalized demonstration
              with our agricultural experts.
            </p>
            <button
              className="inline-flex items-center gap-2 bg-[#ffb800] text-[#213026] font-bold text-base
                px-6 py-3 rounded-[24px] hover:brightness-105 hover:scale-[1.02]
                active:scale-[0.98] transition-all duration-200">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const [ref, visible] = useReveal();

  return (
    <footer
      ref={ref}
      className="w-full mt-5 overflow-hidden px-6 sm:px-16 lg:px-[200px] pt-14 lg:pt-[100px] pb-10 lg:pb-[72px] bg-[#213026] text-[#f4fff8]"
      style={{ borderRadius: "8px 80px", ...fade(visible) }}>
      <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-12">
        <a href="/" className="flex items-center gap-4 shrink-0 hover:opacity-85 transition-opacity">
          <img src={LOGO_GLYPH_LIGHT} alt="" className="h-[90px] w-[63px]" />
          <img src={LOGO_TEXT_LIGHT} alt="PGPR Technologies" className="h-[50px] w-[130px]" />
        </a>

        <div className="flex gap-16 lg:gap-[140px]">
          <div className="flex flex-col gap-5">
            <h4 className="font-bold text-2xl lg:text-[40px] lg:leading-[52px]">Learn More</h4>
            <nav className="flex flex-col gap-4 font-medium text-[15px]">
              {([["About", "/about"], ["Products", "/#products"], ["Contact", "/contact"]] as const).map(([l, h]) => (
                <a key={l} href={h}
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ECE9F1">
              <path d="M12 0C5.373 0 0 5.373 0 12C0 18.016 4.432 22.984 10.206 23.852V15.18H7.237V12.026H10.206V9.927C10.206 6.452 11.899 4.927 14.787 4.927C16.17 4.927 16.902 5.03 17.248 5.076V7.829H15.278C14.052 7.829 13.624 8.992 13.624 10.302V12.026H17.217L16.73 15.18H13.624V23.877C19.481 23.083 24 18.075 24 12C24 5.373 18.627 0 12 0Z" />
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="opacity-70 hover:opacity-100 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ECE9F1">
              <path d="M6.998 0C3.139 0 0 3.142 0 7.002V17.002C0 20.861 3.142 24 7.002 24H17.002C20.861 24 24 20.858 24 16.998V6.998C24 3.139 20.858 0 16.998 0H6.998ZM19 4C19.552 4 20 4.448 20 5C20 5.552 19.552 6 19 6C18.448 6 18 5.552 18 5C18 4.448 18.448 4 19 4ZM12 6C15.309 6 18 8.691 18 12C18 15.309 15.309 18 12 18C8.691 18 6 15.309 6 12C6 8.691 8.691 6 12 6ZM12 8C10.939 8 9.922 8.421 9.172 9.172C8.421 9.922 8 10.939 8 12C8 13.061 8.421 14.078 9.172 14.828C9.922 15.579 10.939 16 12 16C13.061 16 14.078 15.579 14.828 14.828C15.579 14.078 16 13.061 16 12C16 10.939 15.579 9.922 14.828 9.172C14.078 8.421 13.061 8 12 8Z" />
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
            className="opacity-70 hover:opacity-100 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ECE9F1">
              <path d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM7.496 5.403C8.338 5.403 8.899 5.964 8.899 6.712C8.899 7.46 8.338 8.021 7.403 8.021C6.561 8.022 6 7.46 6 6.712C6 5.964 6.561 5.403 7.496 5.403ZM9 17H6V9H9V17ZM19 17H16.176V12.628C16.176 11.419 15.423 11.14 15.141 11.14C14.859 11.14 13.917 11.326 13.917 12.628C13.917 12.814 13.917 17 13.917 17H11V9H13.918V10.116C14.294 9.465 15.047 9 16.459 9C17.871 9 19 10.116 19 12.628V17Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  useEffect(() => { pageVisited = true; }, []);
  return (
    <div style={{ backgroundColor: C.mint }} className="min-h-screen">
      <Navbar />
      <div className="max-w-[1880px] mx-auto px-5">
        <main className="flex flex-col">
          <HeroBanner />
          <ContactCards />
          <ContactSection />
          <Footer />
        </main>
      </div>
    </div>
  );
}
