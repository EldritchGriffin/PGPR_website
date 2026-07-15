// ─── Brand color tokens ───────────────────────────────────────────────────────
export const C = {
  mint:  "#f4fff8",
  dark:  "#213026",
  mid:   "#255c38",
  green: "#2dba5d",
  amber: "#ffb800",
  gray:  "#696969",
} as const;

// ─── Asset paths ──────────────────────────────────────────────────────────────
export const LOGO_GLYPH        = "/assets/logo-glyph.svg";
export const LOGO_TEXT         = "/assets/logo-text.svg";
export const LOGO_GLYPH_LIGHT  = "/assets/logo-glyph-light.svg";
export const LOGO_TEXT_LIGHT   = "/assets/logo-text-light.svg";

export const HERO_BG       = "/assets/hero-bg.png";
export const PGPR_GRASS    = "/assets/pgpr-grass.svg";
export const SOCIAL_ICONS  = "/assets/social-icons.svg";

// Solution/technology icons are part of the coded design system — editors pick
// one via the `iconKey` select in the CMS rather than uploading their own icon.
export const SOL_SHRIMP_ICON  = "/assets/sol-shrimp-icon.svg";
export const SOL_RD_ICON      = "/assets/sol-rd-icon.svg";
export const SOL_CERT_ICON    = "/assets/cert-icon.svg";
export const SOL_SUPPORT_ICON = "/assets/sol-support-icon.svg";

/** Maps a CMS `iconKey` (see homePage.solutions[].iconKey) to its icon asset. */
export const SOLUTION_ICON_MAP: Record<string, string> = {
  shrimp: SOL_SHRIMP_ICON,
  rd: SOL_RD_ICON,
  cert: SOL_CERT_ICON,
};

export const YELLOW_LEAF1      = "/assets/yellow-leaf1.svg";
export const YELLOW_LEAF2      = "/assets/yellow-leaf2.svg";
export const LEAF_PATTERN      = "/assets/leaf-pattern.svg";
export const LEAF_LEFT_LARGE   = "/assets/leaf-left-large.png";
export const LEAF_RIGHT_LARGE  = "/assets/leaf-right-large.png";
export const LEAF_CLUSTER_MID  = "/assets/leaf-cluster-mid.png";
export const LEAF_SMALL_LEFT   = "/assets/leaf-small-left.png";
export const LEAF_SMALL_RIGHT  = "/assets/leaf-small-right.png";
export const LEAF_TINY_A       = "/assets/leaf-tiny-a.png";
export const LEAF_TINY_B       = "/assets/leaf-tiny-b.png";

// ─── Navigation link sets ─────────────────────────────────────────────────────
// `key` looks up its display label from siteSettings.navLabels (CMS-editable);
// the href/id targets themselves are structural and stay in code.

/** Home page: section-scroll based links (use `id` for anchor href) */
export const HOME_NAV_LINKS = [
  { key: "home",         id: "hero" },
  { key: "sustainable",  id: "sustainable" },
  { key: "products",     id: "products" },
  { key: "services",     id: "solutions" },
  { key: "technologies", id: "technology" },
  { key: "about",        id: "pioneering" },
] as const;

/** Default multi-page links (href-based) */
export const DEFAULT_NAV_LINKS = [
  { key: "home",     href: "/" },
  { key: "products", href: "/#products" },
  { key: "about",    href: "/about" },
] as const;

/** Products detail page links (href-based, full navigation) */
export const PRODUCTS_NAV_LINKS = [
  { key: "home",         href: "/" },
  { key: "sustainable",  href: "/#sustainable" },
  { key: "products",     href: "/#products" },
  { key: "services",     href: "/#solutions" },
  { key: "technologies", href: "/#technology" },
  { key: "about",        href: "/#pioneering" },
] as const;

// ─── CTA section particles ────────────────────────────────────────────────────
export const CTA_PARTICLES = [
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
] as const;
