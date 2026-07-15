// ─── Shared Framer Motion configuration ──────────────────────────────────────
// Framer Motion easing arrays (equivalent to the CSS cubic-bezier strings)
export const EXPO_EASE   = [0.16, 1, 0.3, 1]    as const;
export const SPRING_EASE = [0.34, 1.56, 0.64, 1] as const;

// Shared viewport options: fire once, 50px before element enters view
export const viewport = { once: true, margin: "-50px" } as const;

// ─── Variants ────────────────────────────────────────────────────────────────

/** Fade up — most common: headings, text blocks, form panels */
export const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.85, ease: EXPO_EASE } },
} as const;

/** Fade in — flat fade, used for dark overlays, footers, CTA sections */
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.85, ease: EXPO_EASE } },
} as const;

/** Fade in from the right (element starts offset to the left) */
export const fadeFromLeft = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.9, ease: EXPO_EASE } },
} as const;

/** Fade in from the left (element starts offset to the right) */
export const fadeFromRight = {
  hidden:  { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.9, ease: EXPO_EASE } },
} as const;

/** Parent container that staggers its variant children by 0.1 s each */
export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
} as const;

/** Tighter stagger for card grids (0.12 s between siblings) */
export const staggerCards = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
} as const;

/** Card item — used as a child of staggerCards / staggerContainer */
export const cardItem = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EXPO_EASE } },
} as const;

/** Scale stamp — SectionLeaf pill and similar scale-in motifs */
export const scaleStamp = {
  hidden:  { opacity: 0, scale: 0.45, rotate: -8 },
  visible: { opacity: 1, scale: 1,    rotate: 0,
             transition: { duration: 0.65, ease: SPRING_EASE } },
} as const;

/**
 * Masked text slide-up — place a plain `overflow-hidden` wrapper around the
 * motion element to clip the text below the baseline until it slides into view.
 */
export const slideReveal = {
  hidden:  { y: "110%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.95, ease: EXPO_EASE } },
} as const;

/** Stagger parent for slideReveal children */
export const revealContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
} as const;

/** Scale + fade in — cards and feature badges that should 'pop' into view */
export const scaleFadeIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.75, ease: EXPO_EASE } },
} as const;
