"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { HOME_NAV_LINKS, DEFAULT_NAV_LINKS, PRODUCTS_NAV_LINKS } from "../lib/tokens";
import type { SiteSettingsData } from "../lib/sanity/queries";

/**
 * Renders the correct Navbar variant based on the current route.
 * Lives in layout.tsx OUTSIDE PageTransition so it's never unmounted
 * or captured by the page-transition transform/filter.
 */
export function PersistentNavbar({ navLabels }: { navLabels: SiteSettingsData["navLabels"] }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <Navbar variant="hero" links={HOME_NAV_LINKS} navLabels={navLabels} />;
  }
  if (pathname.startsWith("/products")) {
    return <Navbar links={PRODUCTS_NAV_LINKS} navLabels={navLabels} />;
  }
  return <Navbar links={DEFAULT_NAV_LINKS} navLabels={navLabels} currentPath={pathname} />;
}
