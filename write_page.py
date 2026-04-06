#!/usr/bin/env python3
# write_page.py - writes the refined page to app/page.tsx

content = open("/home/griffin/Work/pgpr/write_page_content.py").read()
exec(content)


import { useState } from "react";

const HERO_BG = "https://www.figma.com/api/mcp/asset/3da13485-076a-42cd-9ca8-d0108973aab4";
const PRODUCT_BAIOLIZER = "https://www.figma.com/api/mcp/asset/f563c1dc-db6a-4086-9297-9bf49a19ee50";
const PRODUCT_CHITOGREEN = "https://www.figma.com/api/mcp/asset/15fb1629-f956-41c8-a515-d70cd6269896";
const PRODUCT_TERRAHUMUS = "https://www.figma.com/api/mcp/asset/d5254752-30a0-4eeb-a2fa-2935993ddf79";
const SUSTAIN_IMG = "https://www.figma.com/api/mcp/asset/d161749c-fd3c-4e86-99c5-2c435529dc0b";
const PIE_HERO = "https://www.figma.com/api/mcp/asset/ab4b1026-0b56-4513-8653-0f52527d79ef";
const LOGO_GLYPH = "https://www.figma.com/api/mcp/asset/9356187b-2e90-4c84-a685-74e6274ddb30";
const LOGO_TEXT = "https://www.figma.com/api/mcp/asset/06caf2e7-288c-4910-8774-ba9af0e26edd";
const LOGO_GLYPH_LIGHT = "https://www.figma.com/api/mcp/asset/35ecc05e-bb31-4e31-882e-ebe52a2fa754";
const LOGO_TEXT_LIGHT = "https://www.figma.com/api/mcp/asset/6c92f625-2cd0-4d58-9f4c-f7a7748e89d0";
const SOL_CHITOSAN = "https://www.figma.com/api/mcp/asset/1f91748e-4ba2-459b-bd73-78f0472be6bf";
const SOL_RD = "https://www.figma.com/api/mcp/asset/fd2d25bf-e0ef-4479-9236-206d86ecfa00";
const SOL_SUPPORT = "https://www.figma.com/api/mcp/asset/5893b398-e1cb-4155-bfde-2c7af5051bc9";
const SOL_BIOMAROC = "https://www.figma.com/api/mcp/asset/b71e9a7b-793a-46f3-ad0d-cec7b4bf0cd7";
const TECH_DAIRY = "https://www.figma.com/api/mcp/asset/9d8c3dd6-200f-4621-b856-4e47ba726a63";
const TECH_SHRIMP = "https://www.figma.com/api/mcp/asset/aadabd1e-6f5e-40c7-a141-de93bb3f67e1";
const TECH_COMPOST = "https://www.figma.com/api/mcp/asset/2f86f8d0-a08e-4efd-88a3-2f91c31001c0";
const SOCIAL_ICONS = "https://www.figma.com/api/mcp/asset/6e7166c3-43e6-45ce-b1e8-b7955792584b";
const AVATAR1 = "https://www.figma.com/api/mcp/asset/c4b5960a-dbdd-4b22-af4d-6b2f8fbf8490";
const AVATAR2 = "https://www.figma.com/api/mcp/asset/df115c6e-aaa3-4393-8bdd-0700b9d55cf7";
const CERT_ICON = "https://www.figma.com/api/mcp/asset/08b60d03-70aa-4b73-a326-4f841595ee2d";

function ArrowRight({ cls = "w-6 h-6" }) {
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

function YellowArrowBtn({ label, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-4 bg-[#ffb800] rounded-full pl-6 pr-1.5 py-1.5 font-bold text-[#213026] text-sm hover:brightness-105 transition-all group">
      <span>{label}</span>
      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f4fff8] group-hover:bg-white transition-colors">
        <ArrowRight cls="w-5 h-5 text-[#213026]" />
      </span>
    </button>
  );
}

function WhiteArrowBtn({ label, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-4 bg-white/90 text-[#213026] rounded-full pl-6 pr-1.5 py-1.5 font-bold text-sm hover:bg-white transition-all group">
      <span>{label}</span>
      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#ffb800]">
        <ArrowRight cls="w-5 h-5 text-[#213026]" />
      </span>
    </button>
  );
}

function SectionLeaf() {
  return <div className="w-24 h-14 rounded-tl-sm rounded-tr-[4rem] rounded-br-sm rounded-bl-[4rem] bg-[#2dba5d] shrink-0" />;
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "Products", "Technologies", "Services", "About"];
  return (
    <nav className="relative w-full px-8 lg:px-20 py-5 flex items-center justify-between z-50">
      <a href="#" className="flex items-center gap-2 shrink-0">
        <img src={LOGO_GLYPH} alt="PGPR glyph" className="h-10 w-auto" />
        <img src={LOGO_TEXT} alt="PGPR" className="h-6 w-auto" />
      </a>
      <ul className="hidden lg:flex items-center gap-8 font-semibold text-[#213026] text-base">
        {links.map((l) => (
          <li key={l}><a href="#" className="hover:text-[#2dba5d] transition-colors">{l}</a></li>
        ))}
      </ul>
      <div className="hidden lg:block">
        <button className="flex items-center gap-2 bg-[#ffb800] rounded-full px-6 py-3 font-bold text-[#213026] text-sm hover:brightness-105 transition-all">
          Contact <ArrowRight cls="w-5 h-5" />
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
            <a key={l} href="#" className="font-semibold text-[#213026] hover:text-[#2dba5d] text-lg transition-colors" onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
          <button className="flex items-center gap-2 bg-[#ffb800] rounded-full px-6 py-3 font-bold text-[#213026] text-sm hover:brightness-105 transition-all">
            Contact <ArrowRight cls="w-5 h-5" />
          </button>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative w-full overflow-hidden rounded-tl-lg rounded-tr-[5rem] rounded-br-lg rounded-bl-[5rem]" style={{ minHeight: "80vh" }}>
      <img src={HERO_BG} alt="Green terraced fields" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-b from-[rgba(37,92,56,0.3)] to-[rgba(37,92,56,0.6)]" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-24 pb-12">
        <h1 className="font-bold text-[#f4fff8] text-4xl sm:text-5xl lg:text-7xl leading-tight max-w-4xl mb-4">
          PGPR Technologies<br />The Future of Bio
        </h1>
        <p className="text-[#f4fff8] font-medium text-lg sm:text-xl max-w-xl mb-10 opacity-90">
          We promote biofarming in Morocco by providing innovative scientific solutions for Biologic Agriculture
        </p>
        <div className="flex flex-wrap items-center gap-4 justify-center mb-16">
          <YellowArrowBtn label="Request a Demo" />
          <button className="flex items-center gap-4 bg-[#f4fff8] rounded-full pl-6 pr-1.5 py-1.5 font-bold text-[#213026] text-sm hover:bg-white transition-all group">
            <span>Become a Distributor</span>
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#ffb800]">
              <ArrowRight cls="w-5 h-5 text-[#213026]" />
            </span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl w-full px-4">
          {[
            { avatar: AVATAR1, name: "John Doe", role: "CEO of l3ayba" },
            { avatar: AVATAR2, name: "John Doe", role: "CEO of twichiya" },
          ].map((t, i) => (
            <div key={i} className="backdrop-blur-md bg-white/5 border border-white/25 rounded-lg px-8 py-7 text-left">
              <p className="text-[#f4fff8] font-medium text-sm leading-relaxed mb-6">
                We promote biofarming in Morocco by providing innovative scientific solutions for Biologic Agriculture
              </p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="text-[#f4fff8] font-bold text-sm">{t.name}</p>
                  <p className="text-[#f4fff8] font-medium text-xs opacity-80">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-10 flex justify-center gap-3 pb-10">
        <span className="w-24 h-1 rounded-full bg-[#ffb800]" />
        <span className="w-24 h-1 rounded-full bg-white/40" />
        <span className="w-24 h-1 rounded-full bg-white/40" />
      </div>
    </section>
  );
}

const SUSTAIN_TABS = [
  { title: "Healthier Soil Ecosystems", desc: "Our biofertilizers enrich soil with beneficial microorganisms that naturally improve nutrient availability, restore soil vitality, and support long-term agricultural sustainability." },
  { title: "Reduced Chemical Dependency", desc: "By replacing synthetic fertilizers with bio-based alternatives, farmers can reduce costs while protecting ecosystems and producing healthier crops." },
  { title: "Improved Crop Yields", desc: "PGPR-based products stimulate plant growth, strengthen root systems, and improve resistance to drought and disease." },
];

function SustainableSection() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section className="w-full px-4 sm:px-8 lg:px-20 py-20">
      <div className="mb-8"><SectionLeaf /></div>
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="flex-1 max-w-xl">
          <h2 className="font-semibold text-[#213026] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-10">
            Powering Sustainable Agriculture with Biotechnology
          </h2>
          <div className="border-l-2 border-[#e0e0e0]">
            {SUSTAIN_TABS.map((tab, i) => (
              <button key={i} onClick={() => setActiveTab(i)}
                className={"block w-full text-left pl-6 py-4 text-base transition-all " + (activeTab === i ? "border-l-4 -ml-px border-[#255c38] text-[#255c38] font-semibold" : "text-[#696969] font-medium hover:text-[#255c38]")}>
                {tab.title}
              </button>
            ))}
          </div>
          <p className="mt-6 text-[#696969] text-sm leading-7">{SUSTAIN_TABS[activeTab].desc}</p>
        </div>
        <div className="flex-1 max-w-xl rounded-tl-lg rounded-tr-[5rem] rounded-br-lg rounded-bl-lg overflow-hidden">
          <img src={SUSTAIN_IMG} alt="Sustainable agriculture" className="w-full h-80 lg:h-112 object-cover" />
        </div>
      </div>
    </section>
  );
}

const PRODUCTS = [
  { name: "BaioLizer", subtitle: "Biofertilisant & Biostimulant", desc: "A biofertilizer that enriches soil with beneficial microbes and improves nutrient uptake.", img: PRODUCT_BAIOLIZER, bg: "linear-gradient(135deg,rgba(8,12,9,0.2) 10%,rgba(45,186,93,0.2) 76%),linear-gradient(90deg,#255c38,#255c38)", accent: "#2dba5d", rounded: "rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-[5rem]" },
  { name: "ChitoGreen", subtitle: "Biostimulant", desc: "Chitosan-based biostimulant that boosts plant immunity and accelerates germination.", img: PRODUCT_CHITOGREEN, bg: "linear-gradient(135deg,rgba(0,0,0,0.22) 12%,rgba(255,184,0,0.22) 85%),linear-gradient(90deg,#ffc300,#ffc300)", accent: "#ffb800", rounded: "rounded-lg" },
  { name: "TerraHumus", subtitle: "Biofertilisant", desc: "Humus-rich biofertilizer that builds soil organic matter and enhances water retention.", img: PRODUCT_TERRAHUMUS, bg: "linear-gradient(135deg,rgba(0,0,0,0.2) 23%,rgba(111,237,154,0.2) 100%),linear-gradient(90deg,#2dba5d,#2dba5d)", accent: "#ffb800", rounded: "rounded-tl-lg rounded-tr-[5rem] rounded-br-lg rounded-bl-lg" },
];

function ProductsSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="w-full px-4 sm:px-8 lg:px-20 py-20">
      <div className="flex flex-wrap items-center gap-4 mb-10">
        <SectionLeaf />
        <h2 className="font-semibold text-[#213026] text-3xl sm:text-4xl lg:text-5xl leading-tight">
          Our Sustainable Bio Solutions
        </h2>
        <div className="flex gap-2 ml-auto">
          <button onClick={() => setActive((a) => (a - 1 + PRODUCTS.length) % PRODUCTS.length)} aria-label="Previous product"
            className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#255c38] text-[#255c38] hover:bg-[#255c38] hover:text-white transition-all">
            <svg className="w-5 h-5 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
          <button onClick={() => setActive((a) => (a + 1) % PRODUCTS.length)} aria-label="Next product"
            className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#255c38] text-[#255c38] hover:bg-[#255c38] hover:text-white transition-all">
            <ArrowRight cls="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((p, i) => (
          <div key={i} onClick={() => setActive(i)} style={{ backgroundImage: p.bg }}
            className={"relative overflow-hidden cursor-pointer transition-all duration-300 " + p.rounded + (active === i ? " scale-[1.02] shadow-2xl ring-2 ring-[#2dba5d]" : " hover:scale-[1.01]")}>
            <div className="relative h-56 overflow-hidden flex items-end justify-end">
              <img src={p.img} alt={p.name} className="absolute bottom-0 right-0 h-60 w-auto object-contain" />
            </div>
            <div className="p-8 pt-4">
              <h3 className="text-[#f4fff8] font-bold text-4xl leading-tight mb-1">{p.name}</h3>
              <p className="text-[#f4fff8] font-semibold text-xl mb-4 opacity-80">{p.subtitle}</p>
              {active === i && <p className="text-[#f4fff8] text-sm leading-6 mb-6 opacity-80">{p.desc}</p>}
              <div className="flex gap-3 flex-wrap mt-4">
                <button className="flex items-center gap-2 bg-[#f4fff8] rounded-full pl-5 pr-1 py-1 font-bold text-[#213026] text-sm hover:bg-white transition-all">
                  <span>More info</span>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full" style={{ backgroundColor: p.accent }}>
                    <ArrowRight cls="w-4 h-4 text-[#213026]" />
                  </span>
                </button>
                <button className="flex items-center gap-2 bg-[#f4fff8] text-[#213026] font-bold text-sm px-5 py-2.5 rounded-2xl hover:bg-white transition-all">
                  <DownloadIcon /> Tech Sheet
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const SOLUTIONS = [
  { title: "Chitosan Production", desc: "Industrial-scale chitosan extraction with customizable grades and specifications for various applications.", cta: "Go to Shop", img: SOL_CHITOSAN, emoji: "shrimp", rounded: "rounded-tl-[5rem] rounded-tr-lg rounded-br-lg rounded-bl-lg" },
  { title: "R&D Consultation", desc: "Expert guidance in biotechnology research and development for agricultural and environmental projects.", cta: "Contact Experts", img: SOL_RD, emoji: "book", rounded: "rounded-lg" },
  { title: "Biofarming Support", desc: "End-to-end support for transitioning to biological farming practices including soil analysis and crop planning.", cta: "Contact Experts", img: SOL_SUPPORT, emoji: "leaf", rounded: "rounded-lg" },
  { title: "BIOMAROC Certification", desc: "Assistance in obtaining BIOMAROC organic certification for your agricultural products and processes.", cta: "Contact Experts", img: SOL_BIOMAROC, emoji: "cert", iconImg: CERT_ICON, rounded: "rounded-tl-lg rounded-tr-lg rounded-br-[5rem] rounded-bl-lg" },
];
const SOLUTION_EMOJIS = { shrimp: "\\u{1F990}", book: "\\u{1F4DA}", leaf: "\\u{1F33F}" };

function SolutionsSection() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-20 py-20">
      <div className="flex flex-wrap items-center gap-3 mb-12">
        <SectionLeaf />
        <h2 className="font-semibold text-[#213026] text-3xl sm:text-4xl lg:text-5xl leading-tight">
          Our Agricultural Solutions &amp; Expertise
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SOLUTIONS.map((s, i) => (
          <div key={i} className={"relative overflow-hidden group cursor-pointer " + s.rounded} style={{ minHeight: 340 }}>
            <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-r from-black/55 to-black/35" />
            <div className="relative z-10 backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl m-8 p-8 h-[calc(100%-4rem)] flex flex-col justify-between min-h-60">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#ffb800] mb-4 shrink-0">
                {s.iconImg
                  ? <img src={s.iconImg} alt="" className="w-8 h-8 object-contain" />
                  : <span className="text-2xl">{SOLUTION_EMOJIS[s.emoji] || ""}</span>
                }
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#f4fff8] text-2xl leading-tight mb-3">{s.title}</h3>
                <p className="text-[#f4fff8] font-medium text-base leading-relaxed mb-8 opacity-90">{s.desc}</p>
              </div>
              <WhiteArrowBtn label={s.cta} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const TECH_ITEMS = [
  { img: TECH_DAIRY, label: "Bioformulation from Dairy Waste", rounded: "rounded-tl-[5rem] rounded-tr-lg rounded-br-lg rounded-bl-lg" },
  { img: TECH_SHRIMP, label: "Chitosan Extraction from Shrimp Waste", rounded: "rounded-lg" },
  { img: TECH_COMPOST, label: "Efficient Composting", rounded: "rounded-tl-lg rounded-tr-lg rounded-br-[5rem] rounded-bl-lg" },
];

function TechnologySection() {
  const [current, setCurrent] = useState(0);
  return (
    <section className="w-full px-4 sm:px-8 lg:px-20 py-20">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <SectionLeaf />
        <h2 className="font-semibold text-[#213026] text-3xl sm:text-4xl lg:text-5xl leading-tight">
          Technology Behind Our Solutions
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row gap-12 items-start mt-12">
        <div className="flex-none w-full lg:w-72">
          <p className="text-[#696969] font-medium text-lg leading-8 mb-10">
            Transforming milk industry byproducts into high-performance biofertilizers through advanced microbial fermentation.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setCurrent((c) => (c - 1 + TECH_ITEMS.length) % TECH_ITEMS.length)} aria-label="Previous"
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#255c38] text-[#255c38] hover:bg-[#255c38] hover:text-white transition-all">
              <svg className="w-4 h-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
            <button onClick={() => setCurrent((c) => (c + 1) % TECH_ITEMS.length)} aria-label="Next"
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#255c38] text-[#255c38] hover:bg-[#255c38] hover:text-white transition-all">
              <ArrowRight cls="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TECH_ITEMS.map((t, i) => (
              <div key={i} onClick={() => setCurrent(i)}
                className={"relative overflow-hidden cursor-pointer transition-all duration-300 " + t.rounded + (current === i ? " ring-4 ring-[#2dba5d] scale-[1.03]" : " hover:scale-[1.02]")}
                style={{ aspectRatio: "4/5" }}>
                <img src={t.img} alt={t.label} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-[rgba(45,186,93,0.6)] to-transparent" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {TECH_ITEMS.map((t, i) => (
              <p key={i} className="text-[#255c38] font-bold text-sm text-center leading-5">{t.label}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PioneeringSection() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-20 py-20">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-none w-full lg:w-[44%] rounded-tl-[5rem] rounded-tr-lg rounded-br-lg rounded-bl-lg overflow-hidden min-h-80">
          <img src={PIE_HERO} alt="Bio farming" className="w-full h-full object-cover min-h-80" />
        </div>
        <div className="flex-1 bg-[#f4fff8] rounded-tl-lg rounded-tr-[5rem] rounded-br-lg rounded-bl-lg px-10 lg:px-14 py-14 flex flex-col justify-center gap-8">
          <SectionLeaf />
          <h2 className="font-semibold text-[#213026] text-3xl sm:text-4xl lg:text-5xl leading-tight max-w-lg">
            Pioneering Biotechnology for a Greener Future
          </h2>
          <div className="text-[#696969] font-medium text-base leading-8 max-w-xl">
            <p className="mb-6">PGPR develops innovative biotechnology solutions that support sustainable agriculture and circular economy systems. Our team of scientists and entrepreneurs is dedicated to creating value through green innovation.</p>
            <p>Based in Morocco, we transform organic waste from the dairy and seafood industries into high-value agricultural products, contributing to both environmental sustainability and food security.</p>
          </div>
          <YellowArrowBtn label="Learn more about us" />
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="w-full rounded-tl-lg rounded-tr-lg rounded-br-[5rem] rounded-bl-lg overflow-hidden py-24 px-8 flex flex-col items-center text-center gap-6"
      style={{ backgroundImage: "linear-gradient(180deg,rgba(33,48,38,0.1) 0%,rgba(33,48,38,0.4) 100%),linear-gradient(90deg,#255c38,#255c38)" }}>
      <h2 className="font-bold text-[#f4fff8] text-3xl sm:text-4xl lg:text-5xl leading-tight max-w-3xl">
        Ready to Improve Your Agricultural Performance with Biotechnology?
      </h2>
      <p className="text-[#f4fff8] font-medium text-base max-w-xl opacity-90">
        Join hundreds of farmers and distributors already benefiting from our innovative bio-solutions.
      </p>
      <button className="mt-4 bg-[#ffb800] text-[#213026] font-bold text-sm px-8 py-4 rounded-2xl hover:brightness-105 transition-all">
        Go Bio, and save the world with us
      </button>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full mt-6 rounded-tl-lg rounded-tr-[5rem] rounded-br-lg rounded-bl-[5rem] overflow-hidden px-8 sm:px-16 lg:px-32 pt-24 pb-12 bg-[#213026] text-[#f4fff8]">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16">
        <div className="flex items-center gap-3">
          <img src={LOGO_GLYPH_LIGHT} alt="PGPR glyph" className="h-14 w-auto" />
          <img src={LOGO_TEXT_LIGHT} alt="PGPR" className="h-10 w-auto" />
        </div>
        <div className="flex gap-20">
          <div className="flex flex-col gap-5">
            <h4 className="font-bold text-3xl">Learn More</h4>
            <nav className="flex flex-col gap-4 font-medium text-base">
              <a href="#" className="hover:text-[#2dba5d] transition-colors">About</a>
              <a href="#" className="hover:text-[#2dba5d] transition-colors">Products</a>
              <a href="#" className="hover:text-[#2dba5d] transition-colors">Contact</a>
            </nav>
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="font-bold text-3xl">Say Hello!</h4>
            <div className="flex flex-col gap-4 font-medium text-base">
              <a href="mailto:contact@pgpr.tech" className="hover:text-[#2dba5d] transition-colors">contact@pgpr.tech</a>
              <a href="tel:+212635699447" className="hover:text-[#2dba5d] transition-colors">+212 635 699447</a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
        <p className="text-sm font-medium opacity-80">PGPR Technologies &#169; 2026. All rights reserved.</p>
        <img src={SOCIAL_ICONS} alt="Social media" className="h-6 w-auto" />
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="bg-[#f4fff8] min-h-screen overflow-x-hidden">
      <div className="max-w-480 mx-auto">
        <Navbar />
        <main className="flex flex-col gap-0 px-4 sm:px-6">
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
''')

with open("/home/griffin/Work/pgpr/app/page.tsx", "w") as f:
    f.write(page)

print("Done, lines:", page.count("\\n"))
