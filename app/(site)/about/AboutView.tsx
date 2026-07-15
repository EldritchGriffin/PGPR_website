"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useInView, animate } from "framer-motion";
import { fadeUp, fadeFromLeft, fadeFromRight, staggerContainer, staggerCards, cardItem, slideReveal, scaleFadeIn, fadeIn, viewport, EXPO_EASE } from "../../lib/motion";
import { SectionLeaf } from "../../components/SectionLeaf";
import { CTABanner } from "../../components/CTABanner";
import { Footer } from "../../components/Footer";
import { YellowBtn } from "../../components/Buttons";
import { C } from "../../lib/tokens";
import type { AboutPageData, SanityTeamMember, SiteSettingsData } from "../../lib/sanity/queries";

export type AboutViewProps = {
  aboutPage: AboutPageData;
  businessTeam: SanityTeamMember[];
  rdTeam: SanityTeamMember[];
  siteSettings: SiteSettingsData;
};

// ─── Hero Banner ──────────────────────────────────────────────────────────────
function HeroBanner({ hero }: { hero: AboutPageData["hero"] }) {
  return (
    <section className="w-full pt-28 lg:pt-24 relative">
      <motion.div
        className="relative w-full overflow-hidden"
        style={{
          minHeight: 520,
          borderRadius: "8px 80px",
          background:
            "linear-gradient(100.79deg, rgba(45,186,93,0.47) 1.34%, rgba(8,12,9,0.47) 92.85%), #255C38",
        }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Brand glyph watermark — anchored to the right half, vertically centered */}
        <div
          className="absolute right-[-6%] top-1/2 -translate-y-1/2 pointer-events-none select-none"
          aria-hidden
          style={{ width: "clamp(280px, 42%, 620px)", opacity: 1, zIndex: 2 }}
        >
          <Image
            src="/assets/logo-glyph-light.svg"
            alt=""
            priority
            width={70}
            height={100}
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {/* Amber ellipse rings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1880 778" preserveAspectRatio="none" style={{ zIndex: 1 }}>
          <ellipse cx="1242" cy="1238" rx="1242" ry="1863" fill="none" stroke="rgba(255,184,0,0.125)" strokeWidth="160" />
          <ellipse cx="848" cy="647"  rx="848"  ry="1271" fill="none" stroke="rgba(255,184,0,0.125)" strokeWidth="160" />
          <ellipse cx="1242" cy="1238" rx="1242" ry="1863" fill="none" stroke="rgba(255,184,0,0.25)"  strokeWidth="8" />
          <ellipse cx="848" cy="647"  rx="848"  ry="1271" fill="none" stroke="rgba(255,184,0,0.25)"  strokeWidth="8" />
        </svg>

        {/* Floating leaves */}
        <div aria-hidden>
          {/* Large sweep — bottom right */}
          <motion.div
            style={{ position: "absolute", pointerEvents: "none", right: "-5%", bottom: "-12%", width: "clamp(130px, 26%, 320px)", zIndex: 10 }}
            initial={{ opacity: 0, x: 44, y: 20 }}
            animate={{ opacity: 0.52, x: 0, y: 0 }}
            transition={{ duration: 2, ease: EXPO_EASE, delay: 0.3 }}
          >
            <Image src="/assets/yellow-leaf1.svg" alt="" width={320} height={320} style={{ width: "100%", height: "auto", display: "block" }} />
          </motion.div>
          {/* Accent — top left */}
          <motion.div
            style={{ position: "absolute", pointerEvents: "none", left: "-3%", top: "8%", width: "clamp(70px, 12%, 140px)", zIndex: 10 }}
            initial={{ opacity: 0, x: -44, y: 20 }}
            animate={{ opacity: 0.40, x: 0, y: 0 }}
            transition={{ duration: 2, ease: EXPO_EASE, delay: 0.45 }}
          >
            <Image src="/assets/yellow-leaf2.svg" alt="" width={140} height={140} style={{ width: "100%", height: "auto", display: "block" }} />
          </motion.div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 px-6 sm:px-16 lg:px-[80px] py-10 sm:py-16 lg:py-[100px] max-w-full lg:max-w-[62%]">
          <div className="overflow-hidden">
            <motion.h1
              variants={slideReveal}
              className="font-bold text-[#f4fff8] text-4xl sm:text-5xl lg:text-[80px] xl:text-[100px] leading-[0.98]">
              {hero.title}
            </motion.h1>
          </div>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-[#f4fff8] font-normal text-base sm:text-lg lg:text-[26px] xl:text-[32px] leading-[1.35] max-w-[560px]">
            {hero.subtitle}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

// ─── CountUp — animated number that counts from 0 to `end` on enter view ───
function CountUp({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count  = useMotionValue(0);
  const display = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(count, end, { duration, ease: EXPO_EASE });
    return ctrl.stop;
  }, [inView, end, duration, count]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

// ─── Stats Row ────────────────────────────────────────────────────────────────
function StatsRow({ stats }: { stats: AboutPageData["stats"] }) {
  return (
    <motion.section
      className="w-full py-12 lg:py-16"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12" variants={staggerCards}>
        {stats.map((s, i) => (
          <motion.div key={s.label} className="relative flex flex-col gap-2" variants={cardItem}>
            {/* Small leaf accent */}
            <div
              className="w-3 h-3 mb-1"
              style={{
                backgroundColor: i % 2 === 0 ? C.green : C.amber,
                borderRadius: "2px 50% 2px 50%",
              }}
            />
            <span className="font-bold text-[#2dba5d] text-4xl lg:text-[56px] lg:leading-[1.1]">
              <CountUp end={s.value} suffix={s.suffix ?? ""} />
            </span>
            <span className="font-bold text-[#213026] text-base lg:text-lg">{s.label}</span>
            <p className="text-[#696969] font-medium text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

// ─── TiltCard — motion.div child that adds perspective 3D tilt on hover ─────────────────
function TiltCard({ children, className, style }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const SPRING = { stiffness: 60, damping: 18, mass: 1 };
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, SPRING);
  const my = useSpring(rawY, SPRING);
  const rotateX = useTransform(my, [-200, 200], [2.5, -2.5]);
  const rotateY = useTransform(mx, [-200, 200], [-2.5, 2.5]);

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 1200, ...style }}
      variants={cardItem}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        rawX.set(e.clientX - r.left - r.width  / 2);
        rawY.set(e.clientY - r.top  - r.height / 2);
      }}
      onMouseLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

function DifferentiatorsSection({
  heading,
  differentiators,
}: {
  heading: string;
  differentiators: AboutPageData["differentiators"];
}) {
  return (
    <motion.section
      className="w-full py-12 lg:py-16"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="flex flex-col gap-10">
        {/* Header */}
        <motion.div className="flex items-start gap-4" variants={fadeUp}>
          <SectionLeaf />
          <h2 className="font-bold text-[#213026] text-3xl sm:text-4xl lg:text-[48px] lg:leading-[1.2] whitespace-pre-line">
            {heading}
          </h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full" variants={staggerCards}>
          {differentiators.map((d) => (
            <TiltCard
              key={d.title}
              className="relative bg-[#213026] p-5 sm:p-7 lg:p-9 flex flex-col gap-4 overflow-hidden"
              style={{ borderRadius: "8px 80px" }}
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
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

// ─── Team Section ─────────────────────────────────────────────────────────────

// ─── Team Card: vertical (photo top, name+role below) ─────────────────────────
function TeamCard({
  member, radius = "6px",
}: {
  member: SanityTeamMember; radius?: string;
}) {
  return (
    <div
      className="flex flex-col justify-center items-center p-4 gap-3 flex-1 self-stretch"
      style={{
        background: "rgba(45, 186, 93, 0.1)",
        borderRadius: radius,
      }}
    >
      <div className="w-[72px] h-[72px] rounded-full bg-[#c4dcc5] shrink-0 overflow-hidden flex items-center justify-center text-base font-bold text-[#255c38]">
        {member.photo
          ? <Image src={member.photo} alt={member.name} width={72} height={72} className="w-full h-full object-cover" />
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
function CeoCard({ member }: { member: SanityTeamMember }) {
  return (
    <div
      className="flex items-center justify-center p-4 gap-5 self-stretch"
      style={{
        background: "rgba(45, 186, 93, 0.1)",
        borderRadius: "6px 16px 6px 6px",
      }}
    >
      <div className="w-[72px] h-[72px] rounded-full bg-[#c4dcc5] shrink-0 overflow-hidden flex items-center justify-center text-base font-bold text-[#255c38]">
        {member.photo
          ? <Image src={member.photo} alt={member.name} width={72} height={72} className="w-full h-full object-cover" />
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
  member, radius = "6px",
}: {
  member: SanityTeamMember; radius?: string;
}) {
  return (
    <div
      className="flex items-center p-4 gap-4 self-stretch flex-1"
      style={{
        background: "rgba(255, 184, 0, 0.1)",
        borderRadius: radius,
      }}
    >
      <div className="w-[60px] h-[60px] rounded-full bg-[#c4a850] shrink-0 overflow-hidden flex items-center justify-center text-base font-bold text-[#845900]">
        {member.photo
          ? <Image src={member.photo} alt={member.name} width={60} height={60} className="w-full h-full object-cover" />
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

function TeamSection({
  businessTeam,
  rdTeam,
  teamIntro,
  businessTeamLabel,
  rdTeamLabel,
  teamBadges,
}: {
  businessTeam: SanityTeamMember[];
  rdTeam: SanityTeamMember[];
  teamIntro: AboutPageData["teamIntro"];
  businessTeamLabel: AboutPageData["businessTeamLabel"];
  rdTeamLabel: AboutPageData["rdTeamLabel"];
  teamBadges: AboutPageData["teamBadges"];
}) {
  // BD grid: rows of 2 (excluding CEO, which is businessTeam[0])
  const bdRest = businessTeam.slice(1);
  const bdRows: SanityTeamMember[][] = [];
  for (let i = 0; i < bdRest.length; i += 2) {
    bdRows.push(bdRest.slice(i, i + 2));
  }
  const lastBdRowIdx = bdRows.length - 1;

  return (
    <motion.section
      className="w-full py-10 lg:py-12"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="flex flex-col gap-6">
        {/* Header */}
        <motion.div className="flex flex-col items-center gap-3 text-center max-w-3xl mx-auto" variants={fadeUp}>
          <SectionLeaf />
          <h2 className="font-bold text-[#213026] text-2xl sm:text-3xl lg:text-[40px] lg:leading-[1.2]">
            {teamIntro.heading}
          </h2>
          <p className="text-[#696969] font-medium text-sm leading-relaxed">
            {teamIntro.paragraph}
          </p>
        </motion.div>

        {/* Team columns with floating badges */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">

            {/* ═══ Business Development ═══ */}
            <motion.div className="bg-[#255c38] p-5 flex flex-col items-center gap-4"
              variants={fadeFromLeft}
              style={{ borderRadius: "80px 8px 8px 8px" }}>

              {/* Title block */}
              <div className="flex flex-col items-start gap-0.5">
                <h3 className="font-bold text-[#f4fff8] text-lg lg:text-xl leading-[150%]">
                  {businessTeamLabel.heading}
                </h3>
                <span className="font-bold text-[#2dba5d] text-lg lg:text-xl leading-[150%]">
                  {businessTeamLabel.yearsExperienceLabel}
                </span>
              </div>

              {/* CEO — horizontal card */}
              <CeoCard member={businessTeam[0]} />

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
                        radius={r}
                      />
                    );
                  })}
                </div>
              ))}
            </motion.div>

            {/* ═══ R&D and Production ═══ */}
            <motion.div className="bg-[#845900] p-5 flex flex-col items-center gap-4 rounded-lg"
              variants={fadeFromRight}>

              {/* Title block */}
              <div className="flex flex-col items-start gap-0.5 self-stretch">
                <h3 className="font-bold text-[#f4fff8] text-lg lg:text-xl leading-[150%] text-center self-stretch">
                  {rdTeamLabel.heading}
                </h3>
                <span className="font-bold text-[#ffb800] text-lg lg:text-xl leading-[150%] text-center self-stretch">
                  {rdTeamLabel.yearsExperienceLabel}
                </span>
              </div>

              {/* R&D members — vertical stack of horizontal cards */}
              {rdTeam.map((m, i) => {
                const isFirst = i === 0;
                const isLast = i === rdTeam.length - 1;
                const r = isFirst ? "6px 16px 6px 6px" : isLast ? "6px 6px 6px 16px" : "6px";
                return (
                  <RdCard
                    key={m.name}
                    member={m}
                    radius={r}
                  />
                );
              })}
            </motion.div>
          </div>

          {/* Floating badges column */}
          <motion.div className="hidden lg:flex flex-col items-start gap-4 w-[170px]" variants={fadeUp}>
            <div className="flex flex-col justify-center items-center p-8 gap-4 self-stretch flex-1 bg-[#213026] rounded-lg text-center">
              <span className="font-bold text-[#ffb800] text-xl leading-[125%] whitespace-pre-line">
                {teamBadges.wasteBadge}
              </span>
            </div>
            <div className="flex flex-col justify-center items-center p-8 gap-4 self-stretch flex-1 bg-[#213026] text-center"
              style={{ borderRadius: "8px 8px 80px 8px" }}>
              <span className="font-bold text-[#2dba5d] text-xl leading-[125%] whitespace-pre-line">
                {teamBadges.natureBadge}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// ─── CTA Banner and Footer are provided by shared components ─────────────────

// ─── Office Location ─────────────────────────────────────────────────────────
function OfficeLocation({ officeLocation }: { officeLocation: AboutPageData["officeLocation"] }) {
  const { heading, blurb, ctaLabel, latitude, longitude, zoomBoxDegrees } = officeLocation;
  const bbox = [
    longitude - zoomBoxDegrees,
    latitude - zoomBoxDegrees,
    longitude + zoomBoxDegrees,
    latitude + zoomBoxDegrees,
  ].join(",");

  return (
    <motion.section
      className="w-full py-10 lg:py-16"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

        {/* Left: heading + address details */}
        <div className="flex flex-col gap-6 flex-[1_1_35%]">
          <div className="flex items-center gap-3">
            <svg width="26" height="34" viewBox="0 0 26 34" fill="none">
              <path
                d="M13 1C6.37 1 1 6.37 1 13C1 21.75 13 33 13 33C13 33 25 21.75 25 13C25 6.37 19.63 1 13 1Z"
                fill="#213026" />
              <circle cx="13" cy="13" r="4" fill="#F4FFF8" />
            </svg>
            <h2 className="font-bold text-[#213026] text-2xl lg:text-[40px] lg:leading-[52px]">
              {heading}
            </h2>
          </div>
          <p className="text-[#213026]/70 font-medium text-base leading-relaxed">
            {blurb}
          </p>
          <div className="flex flex-col gap-2 text-[#213026] font-medium text-base">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#ffb800] text-[#213026] font-bold text-base
                px-6 py-3 rounded-[24px] w-fit hover:brightness-105 hover:scale-[1.02]
                active:scale-[0.98] transition-all duration-200">
              {ctaLabel}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#213026" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right: map */}
        <div className="flex-[1_1_65%] w-full overflow-hidden" style={{ borderRadius: 12, minHeight: "min(400px, 60vh)" }}>
          <iframe
            title="PGPR Office Location"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik`}
            className="w-full h-full"
            style={{ minHeight: "min(400px, 60vh)", border: 0, display: "block" }}
            loading="lazy"
          />
        </div>
      </div>
    </motion.section>
  );
}



// ─── Page ────────────────────────────────────────────────────────────────
export default function AboutView({ aboutPage, businessTeam, rdTeam, siteSettings }: AboutViewProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.mint, backgroundImage: "url('/assets/leaf-pattern.svg')", backgroundSize: "100% auto", backgroundRepeat: "no-repeat", backgroundPosition: "top center" }}>
      <div className="max-w-[1880px] mx-auto px-5">
        <main className="flex flex-col">
          <HeroBanner hero={aboutPage.hero} />
          <DifferentiatorsSection heading={aboutPage.differentiatorsHeading} differentiators={aboutPage.differentiators} />
          <StatsRow stats={aboutPage.stats} />
          <TeamSection
            businessTeam={businessTeam}
            rdTeam={rdTeam}
            teamIntro={aboutPage.teamIntro}
            businessTeamLabel={aboutPage.businessTeamLabel}
            rdTeamLabel={aboutPage.rdTeamLabel}
            teamBadges={aboutPage.teamBadges}
          />
          <OfficeLocation officeLocation={aboutPage.officeLocation} />
          <CTABanner {...siteSettings.ctaBanner} />
          <Footer siteSettings={siteSettings} />
        </main>
      </div>
    </div>
  );
}
