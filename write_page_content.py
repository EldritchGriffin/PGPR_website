page = '''\
"use client";
// v2 — sizing & positioning fixes

import { useState } from "react";

// === ASSETS ===
const HERO_BG = "/assets/hero-bg.png";
const BAIOLIZER_BOTTLE = "/assets/baiolizer-bottle.png";
const CHITOGREEN_BOTTLE = "/assets/chitogreen-bottle.png";
const TERRAHUMUS_BOTTLE = "/assets/terrahumus-bottle.png";
const SUSTAIN_IMG = "/assets/sustain-img.jpg";
const PIE_HERO = "/assets/pie-hero.png";
const LOGO_GLYPH = "/assets/logo-glyph.svg";
const LOGO_TEXT = "/assets/logo-text.svg";
const LOGO_GLYPH_LIGHT = "/assets/logo-glyph-light.svg";
const LOGO_TEXT_LIGHT = "/assets/logo-text-light.svg";
const SOL_CHITOSAN = "/assets/sol-chitosan.png";
const SOL_RD = "/assets/sol-rd.jpg";
const SOL_SUPPORT = "/assets/sol-support.jpg";
const SOL_BIOMAROC = "/assets/sol-biomaroc.jpg";
const SOL_SHRIMP_ICON = "/assets/sol-shrimp-icon.svg";
const SOL_RD_ICON = "/assets/sol-rd-icon.svg";
const SOL_SUPPORT_ICON = "/assets/sol-support-icon.svg";
const CERT_ICON = "/assets/cert-icon.svg";
const TECH_DAIRY = "/assets/tech-dairy.png";
const TECH_SHRIMP = "/assets/tech-shrimp.jpg";
const TECH_COMPOST = "/assets/tech-compost.jpg";
const SOCIAL_ICONS = "/assets/social-icons.svg";
const AVATAR1 = "/assets/avatar1.png";
const AVATAR2 = "/assets/avatar2.png";

// === SVG ICONS ===
function ArrowRight({ cls = "w-6 h-6" }: { cls?: string }) {
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

// Green leaf pill: large rounding on left, small on right (pointing right)
function SectionLeaf() {
  return <div className="w-[117px] h-[72px] rounded-tl-[80px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[80px] bg-[#2dba5d] shrink-0" />;
}

// Yellow pill button with circular arrow
function YellowArrowBtn({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-6 bg-[#ffb800] rounded-[52px] pl-6 pr-[6px] py-[6px] font-bold text-[#213026] text-base hover:brightness-105 transition-all group"
    >
      <span>{label}</span>
      <span className="flex items-center justify-center w-[64px] h-[64px] rounded-full bg-[#f4fff8] group-hover:bg-white transition-colors shrink-0">
        <ArrowRight cls="w-5 h-5 text-[#213026]" />
      </span>
    </button>
  );
}

// White pill button with yellow circular arrow
function WhiteArrowBtn({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-6 bg-[#f4fff8] rounded-[52px] pl-6 pr-[6px] py-[6px] font-bold text-[#213026] text-base hover:bg-white transition-all group shrink-0"
    >
      <span>{label}</span>
      <span className="flex items-center justify-center w-[64px] h-[64px] rounded-full bg-[#ffb800] shrink-0">
        <ArrowRight cls="w-5 h-5 text-[#213026]" />
      </span>
    </button>
  );
}

// Small action button used inside product cards
function SmallMoreInfoBtn({ accentColor }: { accentColor: string }) {
  return (
    <button className="inline-flex items-center gap-2 bg-[#f4fff8] rounded-[52px] pl-6 pr-[3px] py-[3px] h-[47px] font-bold text-[#213026] text-base hover:bg-white transition-all">
      <span>More info</span>
      <span
        className="flex items-center justify-center w-[41px] h-[41px] rounded-full shrink-0"
        style={{ backgroundColor: accentColor }}
      >
        <ArrowRight cls="w-4 h-4 text-[#213026]" />
      </span>
    </button>
  );
}

function TechSheetBtn() {
  return (
    <button className="inline-flex items-center gap-2 bg-[#f4fff8] text-[#213026] font-bold text-base px-6 py-3 rounded-[24px] hover:bg-white transition-all">
      <DownloadIcon /> Tech Sheet
    </button>
  );
}

// === NAVBAR ===
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "Products", "Technologies", "Services", "About"];
  return (
    <nav className="relative w-full px-8 lg:px-[120px] py-[34px] flex items-center justify-between z-50">
      <a href="#" className="flex items-center gap-2 shrink-0">
        <img src={LOGO_GLYPH} alt="PGPR glyph" className="h-[50px] w-auto" />
        <img src={LOGO_TEXT} alt="PGPR" className="h-7 w-auto" />
      </a>
      <ul className="hidden lg:flex items-center gap-10 font-semibold text-[#213026] text-[22px]">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="hover:text-[#2dba5d] transition-colors whitespace-nowrap">
              {l}
            </a>
          </li>
        ))}
      </ul>
      <div className="hidden lg:flex shrink-0">
        <button className="flex items-center gap-2 bg-[#ffb800] rounded-[48px] px-6 h-[61px] font-bold text-[#213026] text-[22px] hover:brightness-105 transition-all">
          Contact <ArrowRight cls="w-6 h-6" />
        </button>
      </div>
      <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span className="block w-6 h-0.5 bg-[#213026] mb-1" />
        <span className="block w-6 h-0.5 bg-[#213026] mb-1" />
        <span className="block w-6 h-0.5 bg-[#213026]" />
      </button>
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#f4fff8] shadow-lg z-50 flex flex-col items-start px-8 py-6 gap-5 lg:hidden">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="font-semibold text-[#213026] hover:text-[#2dba5d] text-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l}
            </a>
          ))}
          <button className="flex items-center gap-2 bg-[#ffb800] rounded-[48px] px-6 py-3 font-bold text-[#213026] hover:brightness-105 transition-all">
            Contact <ArrowRight cls="w-5 h-5" />
          </button>
        </div>
      )}
    </nav>
  );
}

// === HERO ===
function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden rounded-tl-[8px] rounded-tr-[80px] rounded-br-[8px] rounded-bl-[80px]"
      style={{ minHeight: "85vh" }}
    >
      <img src={HERO_BG} alt="Green terraced fields" className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(37,92,56,0.24), rgba(37,92,56,0.47))" }}
      />
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-10">
        <h1 className="font-semibold text-[#f4fff8] text-5xl sm:text-7xl lg:text-[100px] lg:leading-[126px] mb-5 max-w-6xl">
          PGPR Technologies
          <br />
          The Future of Bio
        </h1>
        <p className="text-[#f4fff8] font-medium text-lg lg:text-[24px] lg:leading-[32px] max-w-2xl mb-10">
          We promote biofarming in Morocco by providing
          <br className="hidden lg:block" />
          innovative scientific solutions for Biologic Agriculture
        </p>
        <div className="flex flex-wrap items-center gap-4 justify-center mb-14">
          <YellowArrowBtn label="Request a Demo" />
          <button className="inline-flex items-center gap-6 bg-[#f4fff8] rounded-[52px] pl-6 pr-[6px] py-[6px] font-bold text-[#213026] text-base hover:bg-white transition-all">
            <span>Become a Distributor</span>
            <span className="flex items-center justify-center w-[64px] h-[64px] rounded-full bg-[#ffb800] shrink-0">
              <ArrowRight cls="w-5 h-5 text-[#213026]" />
            </span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl w-full mb-8">
          {[
            { avatar: AVATAR1, name: "John Doe", role: "Ceo of l3ayba" },
            { avatar: AVATAR2, name: "John Doe", role: "Ceo of twichiya" },
          ].map((t, i) => (
            <div
              key={i}
              className="rounded-[8px] px-[30px] py-[29px] text-left"
              style={{
                backdropFilter: "blur(11.5px)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <p className="text-[#f4fff8] font-medium text-lg lg:text-[20px] leading-[32px] mb-6">
                We promote biofarming in Morocco by providing
                <br />
                innovative scientific solutions for Biologic Agriculture
              </p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full object-cover shrink-0" />
                <div>
                  <p className="text-[#f4fff8] font-bold text-lg lg:text-[20px] leading-[32px]">{t.name}</p>
                  <p className="text-[#f4fff8] font-medium text-base lg:text-[20px] leading-[32px]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-10 flex justify-center gap-3 pb-10">
        <span className="w-28 h-1 rounded-full bg-[#ffb800]" />
        <span className="w-28 h-1 rounded-full bg-white/40" />
        <span className="w-28 h-1 rounded-full bg-white/40" />
      </div>
    </section>
  );
}

// === SUSTAINABLE AGRICULTURE ===
const SUSTAIN_TABS = [
  {
    title: "Healthier Soil Ecosystems",
    desc: "Our biofertilizers enrich soil with beneficial microorganisms that naturally improve nutrient availability, restore soil vitality, and support long-term agricultural sustainability.",
  },
  {
    title: "Reduced Chemical Dependency",
    desc: "By replacing synthetic fertilizers with bio-based alternatives, farmers can reduce costs while protecting ecosystems and producing healthier crops.",
  },
  {
    title: "Improved Crop Yields",
    desc: "PGPR-based products stimulate plant growth, strengthen root systems, and improve resistance to drought and disease.",
  },
];

function SustainableSection() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section className="w-full px-4 sm:px-8 lg:px-[97px] py-20">
      {/* Leaf + full-width section heading */}
      <div className="mb-8">
        <SectionLeaf />
      </div>
      <h2 className="font-semibold text-[#213026] text-4xl sm:text-5xl lg:text-[100px] lg:leading-[111px] mb-16">
        Powering Sustainable Agriculture with Biotechnology
      </h2>
      {/* Tabs + Image row */}
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="flex-1 lg:max-w-[541px] relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[#e0e0e0]" />
          {SUSTAIN_TABS.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className="block w-full text-left pl-[61px] py-2 transition-all relative"
            >
              {activeTab === i && (
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#255c38]" />
              )}
              <span
                className={
                  "block font-semibold lg:text-[32px] lg:leading-[64px] text-xl transition-colors " +
                  (activeTab === i ? "text-[#255c38]" : "text-[#255c38] opacity-50 hover:opacity-80")
                }
              >
                {tab.title}
              </span>
              {activeTab === i && (
                <p className="text-[#696969] font-medium text-base lg:text-[16px] leading-[31px] mt-1 w-[577px] max-w-full">
                  {tab.desc}
                </p>
              )}
            </button>
          ))}
        </div>
        <div className="flex-1 rounded-tl-[8px] rounded-tr-[80px] rounded-br-[8px] rounded-bl-[8px] overflow-hidden">
          <img
            src={SUSTAIN_IMG}
            alt="Sustainable agriculture"
            className="w-full h-80 lg:h-[449px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}

// === PRODUCTS ===
function ProductsSection() {
  const [active, setActive] = useState(0);
  const navBtn = "flex items-center justify-center w-[76px] h-[76px] rounded-full border-2 border-[#255c38] text-[#255c38] hover:bg-[#255c38] hover:text-white transition-all";

  return (
    <section className="w-full px-4 sm:px-8 lg:px-[44px] py-20">
      {/* Header */}
      <div className="flex flex-wrap items-end gap-4 mb-10 lg:px-[106px]">
        <SectionLeaf />
        <h2 className="font-semibold text-[#213026] text-3xl sm:text-4xl lg:text-[84px] lg:leading-[111px] flex-1">
          Our Sustainable Bio Solutions
        </h2>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setActive((a) => (a - 1 + 3) % 3)}
            aria-label="Previous product"
            className={navBtn}
          >
            <ArrowRight cls="w-5 h-5 rotate-180" />
          </button>
          <button
            onClick={() => setActive((a) => (a + 1) % 3)}
            aria-label="Next product"
            className={navBtn}
          >
            <ArrowRight cls="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Cards: desktop = asymmetric flex row, mobile = stacked */}
      <div className="flex flex-col xl:flex-row gap-7">
        {/* BaioLizer — wider horizontal card */}
        <div
          onClick={() => setActive(0)}
          className={
            "relative overflow-hidden cursor-pointer transition-all duration-300 rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[80px] xl:flex-[1.78] min-h-[380px] xl:h-[473px]" +
            (active === 0 ? " ring-2 ring-[#2dba5d] shadow-2xl" : " hover:brightness-105")
          }
          style={{
            backgroundImage:
              "linear-gradient(-51.6deg, rgba(8,12,9,0.2) 10.7%, rgba(45,186,93,0.2) 76.6%), linear-gradient(90deg, #255c38, #255c38)",
          }}
        >
          {/* Bottle image — right half, only on xl+ */}
          <img
            src={BAIOLIZER_BOTTLE}
            alt=""
            aria-hidden="true"
            className="hidden xl:block absolute right-0 bottom-0 h-[120%] w-auto object-contain pointer-events-none"
          />
          {/* Text content — left portion */}
          <div className="relative z-10 flex flex-col justify-between h-full p-9 xl:w-[55%]">
            <div>
              <p className="font-bold text-[#f4fff8] text-5xl xl:text-[64px] leading-none">BaioLizer</p>
              <p className="font-semibold text-[#f4fff8] text-xl xl:text-[32px] leading-[43px] opacity-90 mt-1">
                Biofertilisant &amp; Biostimulant
              </p>
            </div>
            <p className="text-[#f4fff8] font-semibold text-base leading-[31px] opacity-90">
              A biofertilizer that enriches soil with beneficial microbes and improves nutrient uptake.
            </p>
            <div className="flex gap-4 flex-wrap">
              <SmallMoreInfoBtn accentColor="#ffb800" />
              <TechSheetBtn />
            </div>
          </div>
        </div>

        {/* ChitoGreen — tall portrait card */}
        <div
          onClick={() => setActive(1)}
          className={
            "relative overflow-hidden cursor-pointer transition-all duration-300 rounded-[8px] xl:flex-1 min-h-[360px] xl:h-[473px]" +
            (active === 1 ? " ring-2 ring-[#2dba5d] shadow-2xl" : " hover:brightness-105")
          }
          style={{
            backgroundImage:
              "linear-gradient(-42.1deg, rgba(0,0,0,0.22) 12.3%, rgba(255,184,0,0.22) 85.8%), linear-gradient(90deg, #ffc300, #ffc300)",
          }}
        >
          <img
            src={CHITOGREEN_BOTTLE}
            alt=""
            aria-hidden="true"
            className="absolute right-0 top-[72px] h-[110%] w-auto object-contain pointer-events-none"
          />
          <div className="relative z-10 flex flex-col justify-between h-full p-9">
            <div>
              <p className="font-bold text-[#f4fff8] text-4xl xl:text-[60px] leading-none">ChitoGreen</p>
              <p className="font-semibold text-[#f4fff8] text-xl xl:text-[32px] leading-[43px] opacity-90 mt-1">
                Biostimulant
              </p>
            </div>
            <div className="flex flex-col gap-4 mt-auto">
              <SmallMoreInfoBtn accentColor="#2dba5d" />
              <TechSheetBtn />
            </div>
          </div>
        </div>

        {/* TerraHumus — tall portrait card */}
        <div
          onClick={() => setActive(2)}
          className={
            "relative overflow-hidden cursor-pointer transition-all duration-300 rounded-tl-[8px] rounded-tr-[80px] rounded-br-[8px] rounded-bl-[8px] xl:flex-1 min-h-[360px] xl:h-[473px]" +
            (active === 2 ? " ring-2 ring-[#2dba5d] shadow-2xl" : " hover:brightness-105")
          }
          style={{
            backgroundImage:
              "linear-gradient(-42.9deg, rgba(0,0,0,0.2) 23.3%, rgba(111,237,154,0.2) 100%), linear-gradient(90deg, #2dba5d, #2dba5d)",
          }}
        >
          <img
            src={TERRAHUMUS_BOTTLE}
            alt=""
            aria-hidden="true"
            className="absolute right-0 top-[72px] h-[110%] w-auto object-contain pointer-events-none"
          />
          <div className="relative z-10 flex flex-col justify-between h-full p-9">
            <div>
              <p className="font-bold text-[#f4fff8] text-4xl xl:text-[56px] leading-none">TerraHumus</p>
              <p className="font-semibold text-[#f4fff8] text-xl xl:text-[32px] leading-[43px] opacity-90 mt-1">
                Biofertilisant
              </p>
            </div>
            <div className="flex flex-col gap-4 mt-auto">
              <SmallMoreInfoBtn accentColor="#ffb800" />
              <TechSheetBtn />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// === SOLUTIONS ===
// iconFull=true means the SVG already includes the yellow circle background at 78x78
const SOLUTIONS = [
  {
    title: "Chitosan Production",
    desc: "Industrial-scale chitosan extraction with customizable grades and specifications for various applications.",
    cta: "GO to SHOP",
    img: SOL_CHITOSAN,
    icon: SOL_SHRIMP_ICON,
    iconFull: false,
    rounded: "rounded-tl-[80px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[8px]",
  },
  {
    title: "R&D Consultation",
    desc: "Expert guidance in biotechnology research and development for agricultural and environmental projects.",
    cta: "Contact Experts",
    img: SOL_RD,
    icon: SOL_RD_ICON,
    iconFull: false,
    rounded: "rounded-[8px]",
  },
  {
    title: "Biofarming Support",
    desc: "End-to-end support for transitioning to biological farming practices including soil analysis and crop planning.",
    cta: "Contact Experts",
    img: SOL_SUPPORT,
    icon: SOL_SUPPORT_ICON,
    iconFull: true,
    rounded: "rounded-[8px]",
  },
  {
    title: "BIOMAROC Certification",
    desc: "Assistance in obtaining BIOMAROC organic certification for your agricultural products and processes.",
    cta: "Contact Experts",
    img: SOL_BIOMAROC,
    icon: CERT_ICON,
    iconFull: false,
    rounded: "rounded-tl-[8px] rounded-tr-[8px] rounded-br-[80px] rounded-bl-[8px]",
  },
];

function SolutionsSection() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-20 py-20">
      <div className="flex flex-wrap items-center gap-3 mb-12">
        <SectionLeaf />
        <h2 className="font-semibold text-[#213026] text-3xl sm:text-4xl lg:text-[84px] lg:leading-[111px]">
          Our Agricultural Solutions &amp; Expertise
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[34px]">
        {SOLUTIONS.map((s, i) => (
          <div
            key={i}
            className={"relative overflow-hidden group cursor-pointer " + s.rounded}
            style={{ minHeight: 525 }}
          >
            <img
              src={s.img}
              alt={s.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, rgba(0,0,0,0.42) 14.6%, rgba(102,102,102,0.42))" }}
            />
            {/* Frosted glass card */}
            <div
              className="absolute left-[54px] top-[56px] right-[40px] bottom-[28px] rounded-[24px] flex flex-col py-8 px-8"
              style={{
                backdropFilter: "blur(5.5px)",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.38)",
              }}
            >
              {/* Icon */}
              {s.iconFull ? (
                <img src={s.icon} alt="" className="w-[78px] h-[78px] shrink-0 mb-4" />
              ) : (
                <div className="flex items-center justify-center w-[78px] h-[78px] rounded-full bg-[#ffb800] mb-4 shrink-0">
                  <img src={s.icon} alt="" className="w-9 h-9 object-contain" />
                </div>
              )}
              <h3 className="font-bold text-[#f4fff8] text-2xl lg:text-[36px] leading-[64px]">{s.title}</h3>
              <p className="text-[#f4fff8] font-medium text-base lg:text-[20px] leading-[35px] opacity-90 flex-1">
                {s.desc}
              </p>
              <div className="mt-6">
                <WhiteArrowBtn label={s.cta} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// === TECHNOLOGY ===
const TECH_ITEMS = [
  {
    img: TECH_DAIRY,
    label: "Bioformulation from Dairy Waste",
    rounded: "rounded-tl-[80px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[8px]",
  },
  {
    img: TECH_SHRIMP,
    label: "Chitosan Extraction from Shrimp Waste",
    rounded: "rounded-[8px]",
  },
  {
    img: TECH_COMPOST,
    label: "Efficient Composting",
    rounded: "rounded-tl-[8px] rounded-tr-[8px] rounded-br-[80px] rounded-bl-[8px]",
  },
];

function TechnologySection() {
  const [current, setCurrent] = useState(0);
  const circleBtn =
    "flex items-center justify-center w-[62px] h-[62px] rounded-full border-2 border-[#255c38] text-[#255c38] hover:bg-[#255c38] hover:text-white transition-all";

  return (
    <section className="w-full px-4 sm:px-8 lg:px-20 py-20">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <SectionLeaf />
        <h2 className="font-semibold text-[#213026] text-3xl sm:text-4xl lg:text-[84px] lg:leading-[111px]">
          Technology Behind Our Solutions
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row gap-12 items-start mt-12">
        {/* Left: description + navigation arrows stacked vertically */}
        <div className="flex-none w-full lg:w-[448px] flex flex-col gap-32 justify-between" style={{ minHeight: 450 }}>
          <p className="text-[#696969] font-medium text-xl lg:text-[24px] leading-[31px]">
            Transforming milk industry byproducts into high-performance biofertilizers through advanced microbial
            fermentation.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setCurrent((c) => (c - 1 + TECH_ITEMS.length) % TECH_ITEMS.length)}
              aria-label="Previous"
              className={circleBtn}
            >
              <ArrowRight cls="w-5 h-5 rotate-180" />
            </button>
            <button
              onClick={() => setCurrent((c) => (c + 1) % TECH_ITEMS.length)}
              aria-label="Next"
              className={circleBtn}
            >
              <ArrowRight cls="w-5 h-5" />
            </button>
          </div>
        </div>
        {/* Right: 3 images */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TECH_ITEMS.map((t, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                className={
                  "relative overflow-hidden cursor-pointer transition-all duration-300 " +
                  t.rounded +
                  (current === i ? " ring-4 ring-[#2dba5d] scale-[1.02]" : " hover:scale-[1.01]")
                }
                style={{ height: 451 }}
              >
                <img src={t.img} alt={t.label} className="absolute inset-0 w-full h-full object-cover" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(45,186,93,0) 45.9%, rgba(45,186,93,0.6) 96.6%)",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-6 mt-4">
            {TECH_ITEMS.map((t, i) => (
              <p key={i} className="text-[#255c38] font-bold lg:text-[20px] text-center leading-6">
                {t.label}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// === PIONEERING SECTION ===
function PioneeringSection() {
  return (
    <section className="w-full">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Image panel: top-left corner 120px */}
        <div className="overflow-hidden rounded-tl-[120px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[8px] lg:w-[844px] min-h-80 lg:h-[886px] shrink-0">
          <img src={PIE_HERO} alt="Bio farming" className="w-full h-full object-cover min-h-80" />
        </div>
        {/* Text panel: top-right corner 120px */}
        <div className="flex-1 bg-[#f4fff8] rounded-tl-[8px] rounded-tr-[120px] rounded-br-[8px] rounded-bl-[8px] px-10 lg:px-[76px] py-16 lg:pt-[160px] lg:pb-[123px] flex flex-col justify-center gap-10">
          <SectionLeaf />
          <h2 className="font-semibold text-[#213026] text-3xl sm:text-4xl lg:text-[84px] lg:leading-[111px]">
            Pioneering Biotechnology for a Greener Future
          </h2>
          <div className="text-[#696969] font-medium text-base lg:text-[24px] leading-[31px]">
            <p className="mb-6">
              PGPR develops innovative biotechnology solutions that support sustainable agriculture and circular economy
              systems. Our team of scientists and entrepreneurs is dedicated to creating value through green innovation.
            </p>
            <p>
              Based in Morocco, we transform organic waste from the dairy and seafood industries into high-value
              agricultural products, contributing to both environmental sustainability and food security.
            </p>
          </div>
          <YellowArrowBtn label="Learn more about us" />
        </div>
      </div>
    </section>
  );
}

// === CTA BANNER ===
function CTABanner() {
  return (
    <section
      className="w-full rounded-tl-[8px] rounded-tr-[8px] rounded-br-[80px] rounded-bl-[8px] overflow-hidden py-20 px-8 lg:px-20 flex flex-col items-center text-center gap-8"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(33,48,38,0.097) 0%, rgba(33,48,38,0.39) 100%), linear-gradient(90deg, #255c38, #255c38)",
      }}
    >
      <h2 className="font-bold text-[#f4fff8] text-3xl sm:text-4xl lg:text-[48px] leading-[64px] max-w-4xl">
        Ready to Improve Your Agricultural Performance with Biotechnology?
      </h2>
      <p className="text-[#f4fff8] font-medium text-base leading-[24px]">
        Join hundreds of farmers and distributors already benefiting from our innovative bio-solutions.
      </p>
      <button className="mt-2 bg-[#ffb800] text-[#213026] font-bold text-base px-6 py-3 rounded-[24px] hover:brightness-105 transition-all">
        Go Bio, and save the world with us
      </button>
    </section>
  );
}

// === FOOTER ===
function Footer() {
  return (
    <footer className="w-full mt-5 rounded-tl-[8px] rounded-tr-[80px] rounded-br-[8px] rounded-bl-[80px] overflow-hidden px-8 sm:px-16 lg:px-[240px] pt-[120px] pb-[80px] bg-[#213026] text-[#f4fff8]">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-10">
        <div className="flex items-center gap-4 shrink-0">
          <img src={LOGO_GLYPH_LIGHT} alt="PGPR glyph" className="h-[100px] w-auto" />
          <img src={LOGO_TEXT_LIGHT} alt="PGPR" className="h-[54px] w-auto" />
        </div>
        <div className="flex gap-16 lg:gap-[160px]">
          <div className="flex flex-col gap-5">
            <h4 className="font-bold text-3xl lg:text-[48px] lg:leading-[64px]">Learn More</h4>
            <nav className="flex flex-col gap-5 font-medium text-base">
              <a href="#" className="hover:text-[#2dba5d] transition-colors">About</a>
              <a href="#" className="hover:text-[#2dba5d] transition-colors">Products</a>
              <a href="#" className="hover:text-[#2dba5d] transition-colors">Contact</a>
            </nav>
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="font-bold text-3xl lg:text-[48px] lg:leading-[64px]">Say Hello!</h4>
            <div className="flex flex-col gap-5 font-medium text-base">
              <a href="mailto:contact@pgpr.tech" className="hover:text-[#2dba5d] transition-colors">
                contact@pgpr.tech
              </a>
              <a href="tel:+212635699447" className="hover:text-[#2dba5d] transition-colors">
                +212 635 699447
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
        <p className="text-base font-medium">PGPR Technologies &copy; 2026. All rights reserved.</p>
        <img src={SOCIAL_ICONS} alt="Social media" className="h-6 w-auto" />
      </div>
    </footer>
  );
}

// === PAGE ===
export default function Home() {
  return (
    <div className="bg-[#f4fff8] min-h-screen overflow-x-hidden">
      <div className="max-w-[1880px] mx-auto px-5">
        <Navbar />
        <main className="flex flex-col gap-[120px]">
          <Hero />
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
'''

with open("/home/griffin/Work/pgpr/app/page.tsx", "w") as f:
    f.write(page)
print("Written", len(page), "chars,", page.count("\n"), "lines")
