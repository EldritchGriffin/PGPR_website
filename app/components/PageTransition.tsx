"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { EXPO_EASE } from "../lib/motion";

/**
 * Wraps page content in an AnimatePresence transition.
 * The Navbar lives outside this wrapper in layout.tsx, so it is never
 * captured by the transform and doesn't flicker during navigation.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced  = useReducedMotion();

  return (
    // initial={false} prevents the enter animation on first SSR render,
    // avoiding a flash-of-invisible-content on page load.
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduced ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reduced ? {} : { opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.42, ease: EXPO_EASE }}
        style={{ isolation: "isolate" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
