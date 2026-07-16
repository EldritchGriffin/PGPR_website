import { client } from "./client";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SanityProduct = {
  name: string;
  slug: string;
  subtitle: string;
  desc: string;
  longDesc: string;
  stats: string[];
  benefits: string[];
  specifications: string[];
  bottle: string;
  product: string;
  visualVariant: string;
};

export type SanityTeamMember = {
  name: string;
  role: string;
  flag?: string;
  photo: string;
  group: "business" | "rd";
};

export type SanityTestimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export type HomePageData = {
  hero: {
    badgeText: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    subtitleLine1: string;
    subtitleLine2: string;
    ctaLabel: string;
  };
  sustainableHeading: string;
  sustainTabs: { title: string; desc: string; image: string }[];
  productsHeading: string;
  productsSubheading: string;
  solutionsHeading: string;
  solutions: {
    title: string;
    desc: string;
    ctaLabel: string;
    ctaTarget: "contact" | "external";
    externalHref?: string;
    image: string;
    iconKey: "shrimp" | "rd" | "cert" | "support";
  }[];
  technologyHeading: string;
  techItems: { image: string; label: string; desc: string }[];
  pioneering: { heading: string; paragraph1: string; paragraph2: string; image: string };
};

export type AboutPageData = {
  hero: { title: string; subtitle: string };
  differentiatorsHeading: string;
  differentiators: { title: string; desc: string }[];
  stats: { value: number; suffix?: string; label: string; desc: string }[];
  teamIntro: { heading: string; paragraph: string };
  businessTeamLabel: { heading: string; yearsExperienceLabel: string };
  rdTeamLabel: { heading: string; yearsExperienceLabel: string };
  teamBadges: { wasteBadge: string; natureBadge: string };
  officeLocation: {
    heading: string;
    blurb: string;
    ctaLabel: string;
    latitude: number;
    longitude: number;
    zoomBoxDegrees: number;
  };
};

export type ContactPageData = {
  hero: { title: string; subtitle: string };
  formIntroHeading: string;
  formIntroText: string;
  contactCards: { label: string; value: string; hrefType: "email" | "phone" }[];
  responseTimeNote: string;
  sendMessageHeading: string;
  formLabels: { name: string; email: string; subject: string; message: string };
  formPlaceholders: { name: string; email: string; subject: string; message: string };
  submitLabel: string;
  submittingLabel: string;
  successHeading: string;
  successMessage: string;
  sendAnotherLabel: string;
  genericErrorMessage: string;
  networkErrorMessage: string;
};

export type SiteSettingsData = {
  email: string;
  phone: string;
  socialLinks: { platform: "facebook" | "instagram" | "linkedin"; href: string }[];
  footerCopyrightText: string;
  metaTitle: string;
  metaDescription: string;
  navLabels: {
    home: string;
    sustainable: string;
    products: string;
    services: string;
    technologies: string;
    about: string;
    contact: string;
  };
  ctaBanner: { heading: string; text: string; buttonLabel: string };
  productUi: {
    exploreLabel: string;
    moreInfoLabel: string;
    techSheetLabel: string;
    requestDemoLabel: string;
    technicalSheetLabel: string;
    overviewHeading: string;
    benefitsHeading: string;
    specificationsHeading: string;
    moreProductsHeading: string;
  };
};

// ─── Fragments ────────────────────────────────────────────────────────────────

// ─── Fetchers ─────────────────────────────────────────────────────────────────
// Each fetch is tagged by document type so app/api/revalidate/route.ts can
// invalidate precisely the pages that depend on that type after a webhook fires.

export async function getProducts(): Promise<SanityProduct[]> {
  const query = `*[_type == "product"] | order(order asc) {
    name,
    "slug": slug.current,
    subtitle,
    "desc": description,
    "longDesc": longDescription,
    stats,
    benefits,
    specifications,
    "bottle": bottleImage.asset->url,
    "product": productImage.asset->url,
    visualVariant
  }`;
  return client.fetch(query, {}, { next: { tags: ["sanity:product"] } });
}

export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    name,
    "slug": slug.current,
    subtitle,
    "desc": description,
    "longDesc": longDescription,
    stats,
    benefits,
    specifications,
    "bottle": bottleImage.asset->url,
    "product": productImage.asset->url,
    visualVariant
  }`;
  return client.fetch(query, { slug }, { next: { tags: ["sanity:product"] } });
}

export async function getProductSlugs(): Promise<string[]> {
  const query = `*[_type == "product"].slug.current`;
  return client.fetch(query, {}, { next: { tags: ["sanity:product"] } });
}

export async function getTeamMembers(): Promise<SanityTeamMember[]> {
  const query = `*[_type == "teamMember"] | order(order asc) {
    name,
    role,
    flag,
    "photo": photo.asset->url,
    group
  }`;
  return client.fetch(query, {}, { next: { tags: ["sanity:teamMember"] } });
}

export async function getTestimonials(): Promise<SanityTestimonial[]> {
  const query = `*[_type == "testimonial"] | order(order asc) {
    quote,
    name,
    role,
    "avatar": avatar.asset->url
  }`;
  return client.fetch(query, {}, { next: { tags: ["sanity:testimonial"] } });
}

export async function getHomePage(): Promise<HomePageData> {
  const query = `*[_type == "homePage"][0] {
    hero,
    sustainableHeading,
    sustainTabs[] {
      title,
      desc,
      "image": image.asset->url
    },
    productsHeading,
    productsSubheading,
    solutionsHeading,
    solutions[] {
      title,
      desc,
      ctaLabel,
      ctaTarget,
      externalHref,
      "image": image.asset->url,
      iconKey
    },
    technologyHeading,
    techItems[] {
      "image": image.asset->url,
      label,
      desc
    },
    pioneering {
      heading,
      paragraph1,
      paragraph2,
      "image": image.asset->url
    }
  }`;
  return client.fetch(query, {}, { next: { tags: ["sanity:homePage"] } });
}

export async function getAboutPage(): Promise<AboutPageData> {
  const query = `*[_type == "aboutPage"][0] {
    hero,
    differentiatorsHeading,
    differentiators,
    stats,
    teamIntro,
    businessTeamLabel,
    rdTeamLabel,
    teamBadges,
    officeLocation
  }`;
  return client.fetch(query, {}, { next: { tags: ["sanity:aboutPage"] } });
}

export async function getContactPage(): Promise<ContactPageData> {
  const query = `*[_type == "contactPage"][0] {
    hero,
    formIntroHeading,
    formIntroText,
    contactCards,
    responseTimeNote,
    sendMessageHeading,
    formLabels,
    formPlaceholders,
    submitLabel,
    submittingLabel,
    successHeading,
    successMessage,
    sendAnotherLabel,
    genericErrorMessage,
    networkErrorMessage
  }`;
  return client.fetch(query, {}, { next: { tags: ["sanity:contactPage"] } });
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const query = `*[_type == "siteSettings"][0] {
    email,
    phone,
    socialLinks,
    footerCopyrightText,
    metaTitle,
    metaDescription,
    navLabels,
    ctaBanner,
    productUi
  }`;
  return client.fetch(query, {}, { next: { tags: ["sanity:siteSettings"] } });
}
