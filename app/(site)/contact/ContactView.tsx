"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, fadeFromLeft, fadeFromRight, staggerContainer, staggerCards, cardItem, viewport, EXPO_EASE } from "../../lib/motion";
import { Footer } from "../../components/Footer";
import { C } from "../../lib/tokens";
import type { ContactPageData, SiteSettingsData } from "../../lib/sanity/queries";

export type ContactViewProps = {
  contactPage: ContactPageData;
  siteSettings: SiteSettingsData;
};

// ─── Hero Banner ──────────────────────────────────────────────────────────────
function HeroBanner({ hero }: { hero: ContactPageData["hero"] }) {
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

        {/* Leaf pattern — full-bleed background texture */}
        <Image
          src="/assets/leaf-pattern.svg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="absolute inset-0 object-cover pointer-events-none"
          style={{ opacity: 0.08, zIndex: 0 }}
        />

        {/* Amber ellipse decorations */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1880 778" preserveAspectRatio="none" style={{ zIndex: 1 }}>
          <ellipse cx="1242" cy="1238" rx="1242" ry="1863" fill="none" stroke="rgba(255,184,0,0.125)" strokeWidth="160" />
          <ellipse cx="848" cy="647"  rx="848"  ry="1271" fill="none" stroke="rgba(255,184,0,0.125)" strokeWidth="160" />
          <ellipse cx="1242" cy="1238" rx="1242" ry="1863" fill="none" stroke="rgba(255,184,0,0.25)"  strokeWidth="8" />
          <ellipse cx="848" cy="647"  rx="848"  ry="1271" fill="none" stroke="rgba(255,184,0,0.25)"  strokeWidth="8" />
        </svg>

        {/* Floating green leaves */}
        <div aria-hidden>
          <motion.div
            style={{ position: "absolute", pointerEvents: "none", left: "-5%", top: "20%", width: "clamp(70px, 12%, 160px)", zIndex: 10 }}
            initial={{ opacity: 0, x: -44 }}
            animate={{ opacity: 0.82, x: 0 }}
            transition={{ duration: 2, ease: EXPO_EASE, delay: 0.2 }}
          >
            <Image src="/assets/leaf-left-large.png" alt="" width={160} height={160} style={{ width: "100%", height: "auto", display: "block" }} />
          </motion.div>
          <motion.div
            style={{ position: "absolute", pointerEvents: "none", right: "38%", top: "6%", width: "clamp(50px, 8%, 110px)", zIndex: 10 }}
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 0.68, y: 0 }}
            transition={{ duration: 2, ease: EXPO_EASE, delay: 0.45 }}
          >
            <Image src="/assets/leaf-cluster-mid.png" alt="" width={110} height={110} style={{ width: "100%", height: "auto", display: "block" }} />
          </motion.div>
          <motion.div
            style={{ position: "absolute", pointerEvents: "none", right: "12%", top: "10%", width: "clamp(28px, 5%, 60px)", zIndex: 20 }}
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 0.55, y: 0 }}
            transition={{ duration: 2, ease: EXPO_EASE, delay: 0.6 }}
          >
            <Image src="/assets/leaf-tiny-a.png" alt="" width={60} height={60} style={{ width: "100%", height: "auto", display: "block" }} />
          </motion.div>
          <motion.div
            style={{ position: "absolute", pointerEvents: "none", right: "7%", bottom: "8%", width: "clamp(28px, 5%, 60px)", zIndex: 20 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 0.65, y: 0 }}
            transition={{ duration: 2, ease: EXPO_EASE, delay: 0.3 }}
          >
            <Image src="/assets/leaf-tiny-b.png" alt="" width={60} height={60} style={{ width: "100%", height: "auto", display: "block", transform: "rotate(16deg)" }} />
          </motion.div>
          <motion.div
            style={{ position: "absolute", pointerEvents: "none", left: "8%", bottom: "8%", width: "clamp(24px, 4%, 52px)", zIndex: 10 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 0.58, y: 0 }}
            transition={{ duration: 2, ease: EXPO_EASE, delay: 0.5 }}
          >
            <Image src="/assets/leaf-small-left.png" alt="" width={52} height={52} style={{ width: "100%", height: "auto", display: "block" }} />
          </motion.div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 px-6 sm:px-16 lg:px-[80px] py-10 sm:py-16 lg:py-[100px] max-w-full lg:max-w-[62%]">
          <motion.h1
            variants={fadeUp}
            className="font-bold text-[#f4fff8] text-4xl sm:text-5xl lg:text-[80px] xl:text-[100px] leading-[0.98]">
            {hero.title}
          </motion.h1>
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

// ─── Contact info cards ────────────────────────────────────────────────────────
// Icon artwork is part of the coded design system — the CMS only supplies the
// label/value and which of these two icons applies (hrefType).
const CONTACT_CARD_ICONS: Record<"email" | "phone", React.ReactNode> = {
  email: (
    <svg width="45" height="34" viewBox="0 0 48 36" fill="none">
      <rect x="1.5" y="1.5" width="45" height="33" rx="3" stroke="#F4FFF8" strokeWidth="2.5" />
      <path d="M2 4L24 20L46 4" stroke="#F4FFF8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  phone: (
    <svg width="30" height="48" viewBox="0 0 30 50" fill="none">
      <rect x="1.5" y="1.5" width="27" height="47" rx="4" stroke="#F4FFF8" strokeWidth="2.5" />
      <circle cx="15" cy="42" r="3" fill="#F4FFF8" />
      <rect x="10" y="7" width="10" height="2.5" rx="1.25" fill="#F4FFF8" />
    </svg>
  ),
};

function contactCardHref(card: ContactPageData["contactCards"][number]) {
  return card.hrefType === "email" ? `mailto:${card.value}` : `tel:${card.value.replace(/[^+\d]/g, "")}`;
}

function contactCardRadius(i: number, length: number) {
  if (i === 0) return "32px 8px 8px 8px";
  if (i === length - 1) return "8px 8px 32px 8px";
  return "8px 8px 8px 8px";
}

// ─── Contact form ─────────────────────────────────────────────────────────────
const INPUT_STYLE: React.CSSProperties = {
  background: "#F4FFF8",
  borderRadius: 8,
  padding: "12px 16px",
  color: "#213026",
  fontFamily: "inherit",
  fontSize: 16,
  fontWeight: 500,
  width: "100%",
  height: 52,
};

function Label({ text, htmlFor }: { text: string; htmlFor?: string }) {
  return <label htmlFor={htmlFor} className="text-[#f4fff8] font-medium text-sm">{text}</label>;
}

function ContactSection({ contactPage }: { contactPage: ContactPageData }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? contactPage.genericErrorMessage);
        setStatus("error");
      }
    } catch {
      setErrorMsg(contactPage.networkErrorMessage);
      setStatus("error");
    }
  }

  return (
    <motion.section
      className="w-full py-6 lg:py-8"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {/* Unified dark green container */}
      <div
        className="relative overflow-hidden"
        style={{ background: C.dark, borderRadius: "8px 80px 8px 80px" }}>

        {/* Ambient decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          {/* Amber ellipse rings — fill the container, no overflow */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 900 600"
            preserveAspectRatio="xMaxYMid slice"
            style={{ opacity: 0.07 }}
          >
            <ellipse cx="820" cy="300" rx="420" ry="630" fill="none" stroke="rgba(255,184,0,1)" strokeWidth="55"/>
            <ellipse cx="640" cy="300" rx="290" ry="435" fill="none" stroke="rgba(255,184,0,1)" strokeWidth="55"/>
          </svg>
          {/* Green leaf cluster — top right of container */}
          <Image src="/assets/leaf-cluster-mid.png" alt="" width={140} height={140} style={{ position: "absolute", width: "clamp(60px, 18%, 140px)", height: "auto", top: "-2%", right: "4%", opacity: 0.18 }} />
        </div>

        <div className="relative flex flex-col lg:flex-row">

          {/* ─── Left: info panel ─── */}
          <motion.div
            className="flex flex-col gap-8 px-6 py-10 sm:px-12 sm:py-16 lg:px-16 lg:py-[72px] lg:w-[42%]"
            variants={fadeFromLeft}
          >

            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-[#f4fff8] text-3xl lg:text-[38px] leading-[1.2]">
                {contactPage.formIntroHeading}
              </h3>
              <p className="text-[#f4fff8]/55 font-medium text-[15px] leading-relaxed max-w-xs">
                {contactPage.formIntroText}
              </p>
            </div>

            {/* Contact cards */}
            <motion.div className="flex flex-col gap-4" variants={staggerCards}>
              {contactPage.contactCards.map((card, i) => (
                <motion.a
                  key={card.label}
                  href={contactCardHref(card)}
                  className="flex items-center gap-4 px-4 sm:px-6 py-4 sm:py-5 group cursor-pointer"
                  variants={cardItem}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: contactCardRadius(i, contactPage.contactCards.length),
                  }}
                  whileHover={{
                    backgroundColor: "rgba(255,255,255,0.11)",
                    borderColor: "rgba(45,186,93,0.45)",
                    y: -2,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                    transition: { duration: 0.22 },
                  }}
                >
                  <div
                    className="w-[52px] h-[52px] rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 bg-[rgba(255,184,0,0.18)] group-hover:bg-[rgba(255,184,0,0.32)]">
                    {CONTACT_CARD_ICONS[card.hrefType]}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-[#f4fff8] text-sm tracking-wide uppercase">{card.label}</span>
                    <span className="text-[#f4fff8]/75 group-hover:text-[#f4fff8] font-medium text-base leading-snug transition-colors duration-200">
                      {card.value}
                    </span>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Response time */}
            <div className="flex items-center gap-2.5 text-[#f4fff8]/40 text-[13px] font-medium">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {contactPage.responseTimeNote}
            </div>
          </motion.div>

          {/* ─── Divider ─── */}
          <div className="hidden lg:block w-px self-stretch mx-0" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="lg:hidden h-px mx-8 sm:mx-12" style={{ background: "rgba(255,255,255,0.08)" }} />

          {/* ─── Right: form ─── */}
          <motion.div
            className="flex flex-col gap-8 px-6 py-10 sm:px-12 sm:py-16 lg:px-16 lg:py-[72px] lg:flex-1"
            variants={fadeFromRight}
          >

            <h2 className="font-bold text-[#f4fff8] text-3xl lg:text-[48px] leading-[1.2]">
              {contactPage.sendMessageHeading}
            </h2>

            {status === "success" ? (
              <div className="flex flex-col gap-5 items-start max-w-[540px]">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#2dba5d]/20">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                    stroke="#2dba5d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <p className="text-[#f4fff8] text-2xl font-semibold leading-[1.4]">{contactPage.successHeading}</p>
                <p className="text-[#f4fff8]/70 text-base leading-[1.6]">
                  {contactPage.successMessage}
                </p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="inline-flex items-center gap-2 text-[#f4fff8]/60 hover:text-[#f4fff8] font-medium text-sm
                    transition-colors duration-200 underline underline-offset-4">
                  {contactPage.sendAnotherLabel}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-[540px]">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <Label text={contactPage.formLabels.name} htmlFor="contact-name" />
                  <input
                    id="contact-name"
                    name="name" value={form.name} onChange={handleChange}
                    placeholder={contactPage.formPlaceholders.name}
                    required
                    autoComplete="name"
                    style={INPUT_STYLE}
                    className="border border-[#D0D5DD] shadow-sm outline-none focus:border-[#2dba5d] focus:ring-2 focus:ring-[#2dba5d]/20 transition-all" />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <Label text={contactPage.formLabels.email} htmlFor="contact-email" />
                  <input
                    id="contact-email"
                    name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder={contactPage.formPlaceholders.email}
                    required
                    autoComplete="email"
                    style={INPUT_STYLE}
                    className="border border-[#D0D5DD] shadow-sm outline-none focus:border-[#2dba5d] focus:ring-2 focus:ring-[#2dba5d]/20 transition-all" />
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <Label text={contactPage.formLabels.subject} htmlFor="contact-subject" />
                  <input
                    id="contact-subject"
                    name="subject" value={form.subject} onChange={handleChange}
                    placeholder={contactPage.formPlaceholders.subject}
                    required
                    autoComplete="off"
                    style={INPUT_STYLE}
                    className="border border-[#D0D5DD] shadow-sm outline-none focus:border-[#2dba5d] focus:ring-2 focus:ring-[#2dba5d]/20 transition-all" />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <Label text={contactPage.formLabels.message} htmlFor="contact-message" />
                  <textarea
                    id="contact-message"
                    name="message" value={form.message} onChange={handleChange}
                    placeholder={contactPage.formPlaceholders.message}
                    required
                    rows={6}
                    style={{ ...INPUT_STYLE, height: "auto", resize: "none" }}
                    className="border border-[#D0D5DD] shadow-sm outline-none focus:border-[#2dba5d] focus:ring-2 focus:ring-[#2dba5d]/20 transition-all" />
                </div>

                {/* Send button */}
                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center justify-center gap-2.5 bg-[#ffb800] text-[#213026] font-bold text-base
                      px-8 h-[52px] rounded-[48px] w-full sm:w-auto
                      hover:brightness-105 hover:scale-[1.02] active:scale-[0.98]
                      transition-all duration-200
                      disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100">
                    {status === "submitting" ? (
                      <>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                          stroke="#213026" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className="animate-spin">
                          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                          <path d="M12 2a10 10 0 0 1 10 10" />
                        </svg>
                        {contactPage.submittingLabel}
                      </>
                    ) : (
                      <>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                          stroke="#213026" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                        {contactPage.submitLabel}
                      </>
                    )}
                  </button>
                  {status === "error" && (
                    <p className="text-red-400 text-sm font-medium">{errorMsg}</p>
                  )}
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
// ─── Page ────────────────────────────────────────────────────────────────
export default function ContactView({ contactPage, siteSettings }: ContactViewProps) {
  return (
    <div style={{ backgroundColor: C.mint }} className="min-h-screen">
      <div className="max-w-[1880px] mx-auto px-5">
        <main className="flex flex-col">
          <HeroBanner hero={contactPage.hero} />
          <ContactSection contactPage={contactPage} />
          <Footer siteSettings={siteSettings} />
        </main>
      </div>
    </div>
  );
}
