import { C } from "./tokens";
import type { SanityProduct } from "./sanity/queries";

// ─── Types ────────────────────────────────────────────────────────────────────

/** Minimal product shape used on the home / listing pages */
export type ProductSummary = {
  name: string;
  slug: string;
  subtitle: string;
  desc: string;
  stats: string[];
  accent: string;
  bottle: string;
  bg: string;
  rounded: string;
  darkText?: boolean;
};

/** Full product shape used on the detail page */
export type Product = ProductSummary & {
  longDesc: string;
  heroColor: string;
  product: string;
  benefits: string[];
  specifications: string[];
};

// ─── Visual variants ──────────────────────────────────────────────────────────
// Editors pick one of these named looks in the CMS (`visualVariant`) rather
// than typing raw CSS — the design-system values themselves stay in code.

type VisualVariant = {
  accent: string;
  heroColor: string;
  bg: string;
  rounded: string;
  darkText?: boolean;
};

export const PRODUCT_VISUAL_VARIANTS: Record<string, VisualVariant> = {
  emerald: {
    accent: C.amber,
    heroColor: C.mid,
    bg: "linear-gradient(-51.6deg, rgba(8,12,9,0.18) 10.7%, rgba(45,186,93,0.18) 76.6%), linear-gradient(90deg, #255c38, #255c38)",
    rounded: "rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[80px]",
  },
  gold: {
    accent: C.green,
    heroColor: "#ffc300",
    bg: "linear-gradient(-42.1deg, rgba(0,0,0,0.2) 12.3%, rgba(255,184,0,0.2) 85.8%), linear-gradient(90deg, #ffc300, #ffc300)",
    rounded: "rounded-[8px]",
    darkText: true,
  },
  meadow: {
    accent: C.amber,
    heroColor: C.green,
    bg: "linear-gradient(-42.9deg, rgba(0,0,0,0.18) 23.3%, rgba(111,237,154,0.18) 100%), linear-gradient(90deg, #2dba5d, #2dba5d)",
    rounded: "rounded-tl-[8px] rounded-tr-[80px] rounded-br-[8px] rounded-bl-[8px]",
  },
};

const FALLBACK_VARIANT = PRODUCT_VISUAL_VARIANTS.emerald;

/** Merges CMS content with its code-owned visual variant into the shape the views expect. */
export function toProduct(p: SanityProduct): Product {
  const variant = PRODUCT_VISUAL_VARIANTS[p.visualVariant] ?? FALLBACK_VARIANT;
  return {
    name: p.name,
    slug: p.slug,
    subtitle: p.subtitle,
    desc: p.desc,
    longDesc: p.longDesc,
    stats: p.stats,
    bottle: p.bottle,
    product: p.product,
    benefits: p.benefits,
    specifications: p.specifications,
    ...variant,
  };
}
