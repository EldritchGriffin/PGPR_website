"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "./Icons";
import { LOGO_GLYPH, LOGO_TEXT, LOGO_GLYPH_LIGHT, LOGO_TEXT_LIGHT, C } from "../lib/tokens";
import type { SiteSettingsData } from "../lib/sanity/queries";

// ─── Types ────────────────────────────────────────────────────────────────────

type NavLinkKey = keyof SiteSettingsData["navLabels"];
type HrefLink  = { key: NavLinkKey; href: string; id?: never };
type IdLink    = { key: NavLinkKey; id: string;   href?: never };
export type NavLink = HrefLink | IdLink;

interface NavbarProps {
  /** Links to render in the nav. Use `id` for same-page sections, `href` for routes. */
  links: readonly NavLink[];
  /** Display labels, keyed the same way as each link's `key` — sourced from siteSettings.navLabels. */
  navLabels: SiteSettingsData["navLabels"];
  /**
   * `"hero"`: starts transparent over a dark hero section; fades to light when user scrolls past `#hero`.
   * `"default"` (default): always light background.
   */
  variant?: "hero" | "default";
  /** Highlight the link whose `href` matches this value (route-based active state). */
  currentPath?: string;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export function Navbar({ links, navLabels, variant = "default", currentPath }: NavbarProps) {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [onHero, setOnHero]         = useState(variant === "hero");
  const [activeSection, setActiveSection] = useState<string>("");
  const menuRef = useRef<HTMLDivElement>(null);

  // Hero-mode: watch the #hero element
  useEffect(() => {
    if (variant !== "hero") return;
    const hero = document.getElementById("hero");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([e]) => setOnHero(e.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, [variant]);

  // Section-scroll active tracking (only when hero links have `id`)
  useEffect(() => {
    const ids = links.filter((l): l is IdLink => !!l.id).map((l) => l.id);
    if (ids.length === 0) return;
    const obs = ids.map((id) => {
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
  }, [links]);

  // Close mobile menu on outside click + Escape key
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const heroMode  = variant === "hero" && onHero && !menuOpen;
  const textColor = heroMode ? "#f4fff8" : C.dark;
  const barColor  = heroMode ? "bg-[#f4fff8]" : "bg-[#213026]";

  function isActive(link: NavLink) {
    if (link.id)   return activeSection === link.id;
    if (currentPath) return link.href === currentPath;
    return false;
  }

  function linkHref(link: NavLink): string {
    if (link.id)   return `#${link.id}`;
    return link.href ?? "/";
  }

  return (
    <nav
      ref={menuRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        heroMode
          ? "bg-transparent py-4"
          : "bg-[#f4fff8]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(33,48,38,0.08)] py-3"
      }`}
    >
      <div className="max-w-470 mx-auto px-6 sm:px-10 lg:px-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity duration-200">
          <div className="relative w-7.5 h-10.75">
            <Image src={LOGO_GLYPH_LIGHT} alt="" fill priority className={`object-contain transition-opacity duration-500 ${heroMode ? "opacity-100" : "opacity-0"}`} />
            <Image src={LOGO_GLYPH}       alt="" fill priority className={`object-contain transition-opacity duration-500 ${heroMode ? "opacity-0" : "opacity-100"}`} />
          </div>
          <div className="relative w-15 h-5.75">
            <Image src={LOGO_TEXT_LIGHT} alt="PGPR Technologies" fill priority className={`object-contain transition-opacity duration-500 ${heroMode ? "opacity-100" : "opacity-0"}`} />
            <Image src={LOGO_TEXT}       alt="" fill priority className={`object-contain transition-opacity duration-500 ${heroMode ? "opacity-0" : "opacity-100"}`} />
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7 xl:gap-9 font-semibold text-[14px] xl:text-[15px] tracking-wide">
          {links.map((link) => {
            const active = isActive(link);
            return (
              <li key={link.key}>
                <Link
                  href={linkHref(link)}
                  className="relative transition-colors duration-300 whitespace-nowrap hover:opacity-100"
                  style={{
                    color: active ? C.green : textColor,
                    opacity: active ? 1 : heroMode ? 0.78 : 0.75,
                  }}
                >
                  {navLabels[link.key]}
                  <span
                    className="absolute -bottom-0.5 left-0 h-0.5 bg-[#2dba5d] rounded-full transition-all duration-300"
                    style={{ width: active ? "100%" : "0%", opacity: active ? 1 : 0 }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex shrink-0">
          <Link
            href="/contact"
            className="flex items-center gap-2 bg-[#ffb800] rounded-[48px] px-5 h-10.5 font-bold text-[#213026]
              text-[13px] xl:text-[14px] tracking-wide uppercase hover:brightness-105 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            {navLabels.contact} <ArrowRight size={16} />
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden p-2 shrink-0"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-4.5">
            <span className={`absolute left-0 w-6 h-0.5 top-0 transition-all duration-300 ${barColor} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`absolute left-0 w-6 h-0.5 top-2 transition-all duration-200 ${barColor} ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`absolute left-0 w-6 h-0.5 top-4 transition-all duration-300 ${barColor} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute top-full left-0 right-0 backdrop-blur-xl z-50
              flex flex-col items-stretch px-6 pt-4 pb-8 gap-1 lg:hidden border-t
              ${onHero ? "bg-[#1a2d20]/98 border-white/10" : "bg-[#f4fff8]/98 border-[#213026]/8"}`}
          >
            {links.map((link) => {
              const active = isActive(link);
              return (
                <Link
                  key={link.key}
                  href={linkHref(link)}
                  className={`flex items-center justify-between min-h-13 px-3 rounded-xl font-semibold text-[15px] tracking-wide transition-colors
                    ${active
                      ? "text-[#2dba5d] bg-[#2dba5d]/8"
                      : onHero
                        ? "text-[#f4fff8]/75 hover:text-[#f4fff8] hover:bg-white/6"
                        : "text-[#213026]/70 hover:text-[#213026] hover:bg-[#213026]/5"
                    }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {navLabels[link.key]}
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-[#2dba5d] shrink-0" />}
                </Link>
              );
            })}
            <div className="pt-4 mt-2 border-t border-current/8">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full bg-[#ffb800] rounded-[48px] py-3.5 font-bold text-[#213026] text-[13px] uppercase tracking-wide hover:brightness-105 transition-all active:scale-[0.98]"
                onClick={() => setMenuOpen(false)}
              >
                {navLabels.contact} <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
