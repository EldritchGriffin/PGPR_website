/**
 * One-off migration: pushes the site's original hardcoded content into Sanity
 * so the live site is visually identical after cutting over to the CMS.
 *
 * Usage (run once, from repo root):
 *   SANITY_API_WRITE_TOKEN=sk... npx tsx scripts/seed-sanity.ts
 *
 * Safe to re-run: every document uses a deterministic _id and this script
 * uses createOrReplace.
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import path from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN (export it in your shell before running this script)");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-01-01",
  token,
  useCdn: false,
});

const ASSETS_DIR = path.join(__dirname, "..", "public", "assets");
const uploadCache = new Map<string, string>(); // filename -> asset _id

async function uploadImage(filename: string) {
  const cached = uploadCache.get(filename);
  if (cached) return imageRef(cached);

  const filePath = path.join(ASSETS_DIR, filename);
  const buffer = readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, { filename });
  uploadCache.set(filename, asset._id);
  console.log(`  uploaded ${filename} -> ${asset._id}`);
  return imageRef(asset._id);
}

function imageRef(assetId: string) {
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: assetId } };
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ─── Products ─────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    slug: "baiolizer",
    name: "BaioLizer",
    subtitle: "Biofertilisant & Biostimulant",
    description:
      "A biofertilizer that enriches soil with beneficial microbes, boosts NPK uptake, and stimulates natural growth hormones for stronger crops.",
    longDescription:
      "BaioLizer is a PGPR-based biofertilizer combining selected beneficial soil bacteria with plant growth-promoting compounds. It enhances biological nitrogen fixation, phosphate solubilization, and natural hormone production to create the ideal conditions for robust plant development. Suitable for cereals, vegetables, and fruit trees across all soil types, BaioLizer works in harmony with your soil's existing ecosystem to unlock its full potential — season after season.",
    stats: ["Enhanced NPK", "PGPR inoculant", "Biodegradable"],
    benefits: [
      "Enhances NPK availability and soil nutrient uptake",
      "Stimulates natural root growth hormones (auxins & cytokinins)",
      "Promotes beneficial microbial colonization in the rhizosphere",
      "Reduces synthetic fertilizer dependency by up to 40%",
    ],
    specifications: [
      "Application: Soil drench or seed coating",
      "Active content: ≥10⁸ CFU/mL PGPR bacterial strains",
      "Compatible with all soil types and irrigation systems",
      "Shelf life: 18 months — store below 25°C, away from heat",
    ],
    bottleImage: "baiolizer-bottle.svg",
    productImage: "product-baiolizer.png",
    visualVariant: "emerald",
    order: 0,
  },
  {
    slug: "chitogreen",
    name: "ChitoGreen",
    subtitle: "Biostimulant",
    description:
      "A chitosan-based biostimulant that boosts plant immunity, improves stress tolerance, and enhances fruit quality and shelf life.",
    longDescription:
      "ChitoGreen harnesses the natural power of chitosan — extracted from sustainably sourced shrimp shells — to prime plant immunity and bolster stress resilience. Its unique formulation promotes secondary metabolite production, reinforces plant cell walls, and activates systemic acquired resistance (SAR), reducing reliance on chemical pesticides. Ideal for growers targeting premium markets and organic certification, ChitoGreen improves fruit firmness, post-harvest shelf life, and overall crop quality.",
    stats: ["Plant immunity", "Foliar spray", "Chitosan based"],
    benefits: [
      "Boosts plant natural resistance to fungal and bacterial disease",
      "Improves fruit quality, firmness, and post-harvest shelf life",
      "Elicits systemic acquired resistance (SAR) naturally",
      "Reduces post-harvest losses and chemical pesticide use",
    ],
    specifications: [
      "Application: Foliar spray or integrated drip irrigation",
      "Active content: 2% chitosan (deacetylation degree ≥85%)",
      "Compatible with pH 5.5–7.5 soil and foliar conditions",
      "Shelf life: 24 months — protect from direct sunlight",
    ],
    bottleImage: "chitogreen-bottle.svg",
    productImage: "product-chitogreen.png",
    visualVariant: "gold",
    order: 1,
  },
  {
    slug: "terrahumus",
    name: "TerraHumus",
    subtitle: "Biofertilisant",
    description:
      "A humus-rich organic fertilizer that enriches soil structure, activates microbial life, and releases nutrients in sync with plant demand.",
    longDescription:
      "TerraHumus is a premium organic soil amendment rich in humic and fulvic acids derived from verified compost and leonardite sources. It dramatically improves soil structure, water-holding capacity, and cation exchange capacity (CEC) while activating indigenous microbial populations for long-term soil health. Whether rehabilitating degraded soils or maintaining high-performance growing systems, TerraHumus provides the organic foundation your crops need — naturally and sustainably.",
    stats: ["Humic acids", "Soil microbiome", "Compost activator"],
    benefits: [
      "Restores soil structure, porosity, and water retention capacity",
      "Activates and feeds native soil microbial communities",
      "Chelates micronutrients for improved plant uptake efficiency",
      "Compatible with all irrigation systems and crop types",
    ],
    specifications: [
      "Application: Base dressing, top dressing, or fertigation",
      "Humic acid content: ≥60% (dry weight), fulvic acids ≥12%",
      "pH-adjusted formulation (6.5–7.0) for broad compatibility",
      "Shelf life: 24 months — store in cool, dry conditions",
    ],
    bottleImage: "terrahumus-bottle.svg",
    productImage: "product-terrahumus.png",
    visualVariant: "meadow",
    order: 2,
  },
];

// ─── Team ─────────────────────────────────────────────────────────────────────

const BIZ_TEAM = [
  { name: "Hamza El Kharroubi", role: "Co-founder & CEO, MA in\nEco-criticism, trained manager", flag: "\u{1F1F2}\u{1F1E6}", photo: "hamza.png" },
  { name: "Bernardus Steven Harageib", role: "Responsible for Expansion", flag: "\u{1F1F3}\u{1F1F1}", photo: "bernardus.png" },
  { name: "Fadoua Baddih", role: "Head of Marketing", flag: "\u{1F1F2}\u{1F1E6}", photo: "fadoua.png" },
  { name: "Samson Umahonien", role: "Responsible for Expansion", flag: "\u{1F1F3}\u{1F1EC}", photo: "samson.png" },
  { name: "Anas EL Kharroubi", role: "Responsible for Expansion", flag: "\u{1F1F2}\u{1F1E6}", photo: "anas.png" },
  { name: "Ibtihal Taakchat", role: "Administrative Assistant", flag: "\u{1F1F2}\u{1F1E6}", photo: "ibtihal.png" },
  { name: "Amira RAZOUK", role: "Administrative Assistant", flag: "\u{1F1F2}\u{1F1E6}", photo: "amira.png" },
  { name: "Ilyas Said El Medhoun", role: "Fundraising Technician", flag: "\u{1F1EE}\u{1F1F9}", photo: "ilyas.png" },
  { name: "Hiba Daif", role: "Communications Officer", flag: "\u{1F1F2}\u{1F1E6}", photo: "hiba.png" },
];

const RD_TEAM = [
  { name: "Abdessadek Aghrinane", role: "Founder & COO\nDoctorate in biotechnology", flag: "\u{1F1F2}\u{1F1E6}", photo: "abdessadak.png" },
  { name: "Dr. Meryem Hdia", role: "Co-Founder CTO\nPHD in biology", flag: "\u{1F1F2}\u{1F1E6}", photo: "meryem.png" },
  { name: "Doctorate Otmane El Miloudi", role: "Agritech specialist\nTwo masters in biotech", flag: "\u{1F1F2}\u{1F1E6}", photo: "otman.png" },
  { name: "Dr. Youssef Ait Hamdan", role: "Product Manager\nDoctorate in biotechnology", flag: "\u{1F1F2}\u{1F1E6}", photo: "youssef.png" },
  { name: "Haytame EL Mhassan", role: "Production Technician", flag: "\u{1F1E7}\u{1F1EA}", photo: "haytame.png" },
  { name: "Tarek Anakkar", role: "Technical Manager", flag: "\u{1F1F2}\u{1F1E6}", photo: "tarek.png" },
];

// ─── Testimonials (flat, ordered — home page groups them 2-per-slide at render time) ──

const TESTIMONIALS = [
  { name: "Ahmed Benali", role: "Wheat Farmer, Meknès", avatar: "avatar1.png", quote: "BaioLizer transformed our wheat yield this season — soil improvement was visible within weeks." },
  { name: "Fatima Ouali", role: "Citrus Producer, Souss", avatar: "avatar2.png", quote: "Switching to ChitoGreen cut our fertilizer costs in half while noticeably improving crop quality." },
  { name: "Youssef Elhami", role: "Agribusiness Owner, Fès", avatar: "avatar1.png", quote: "PGPR's R&D consultation helped us transition our farm to biological farming in under a year." },
  { name: "Khadija Amrani", role: "Greenhouse Cultivator, Agadir", avatar: "avatar2.png", quote: "TerraHumus gave our tomatoes stronger root systems and improved drought resistance through summer." },
  { name: "Rachid Tahir", role: "Organic Producer, Marrakech", avatar: "avatar1.png", quote: "Achieving BIOMAROC certification with PGPR's guidance opened new export markets for us." },
  { name: "Nadia Chakir", role: "Vegetable Distributor, Rabat", avatar: "avatar2.png", quote: "We've seen a significant reduction in plant disease since using ChitoGreen. Our customers love the cleaner produce." },
];

// ─── Home page ────────────────────────────────────────────────────────────────

const SUSTAIN_TABS = [
  { title: "Healthier Soil Ecosystems", desc: "Our biofertilizers enrich soil with beneficial microorganisms that naturally improve nutrient availability, restore soil vitality, and support long-term agricultural sustainability.", image: "sustain-img.jpg" },
  { title: "Reduced Chemical Dependency", desc: "By replacing synthetic fertilizers with bio-based alternatives, farmers reduce costs while protecting ecosystems and producing healthier, residue-free crops.", image: "tech-dairy.png" },
  { title: "Improved Crop Yields", desc: "PGPR-based products stimulate plant growth, strengthen root systems, and improve resistance to drought, pests, and disease — season after season.", image: "tech-compost.jpg" },
];

const SOLUTIONS = [
  { title: "Chitosan Production", desc: "Industrial-scale chitosan extraction with customizable grades and specifications for agricultural, nutraceutical, and cosmetic applications.", ctaLabel: "Go to Shop", ctaTarget: "external" as const, externalHref: "https://pgpr.tech", image: "sol-chitosan.png", iconKey: "shrimp" as const },
  { title: "R&D Consultation", desc: "Expert guidance in biotechnology research and development for agricultural and environmental projects.", ctaLabel: "Contact Experts", ctaTarget: "contact" as const, image: "sol-rd.jpg", iconKey: "rd" as const },
  { title: "Biofarming Support", desc: "End-to-end support for transitioning to biological farming practices — soil analysis, crop planning, and on-site training.", ctaLabel: "Contact Experts", ctaTarget: "contact" as const, image: "sol-support.jpg", iconKey: "support" as const },
  { title: "BIOMAROC Certification", desc: "Assistance in obtaining BIOMAROC organic certification for your agricultural products and processes.", ctaLabel: "Contact Experts", ctaTarget: "contact" as const, image: "sol-biomaroc.jpg", iconKey: "cert" as const },
];

const TECH_ITEMS = [
  { image: "tech-dairy.png", label: "Bioformulation from Dairy Waste", desc: "PGPR strains isolated from dairy industry byproducts are cultivated through advanced microbial fermentation, yielding high-performance biostimulants that naturally boost plant growth and soil health." },
  { image: "tech-shrimp.jpg", label: "Chitosan Extraction from Shrimp Waste", desc: "Shrimp shell waste is transformed into high-purity chitosan — a natural biopolymer that enhances plant immunity, strengthens root systems, and acts as an effective organic crop protector." },
  { image: "tech-compost.jpg", label: "Efficient Composting", desc: "Optimized composting protocols convert organic matter into nutrient-rich humus, accelerating soil rehabilitation and providing a sustained fertility base for long-term sustainable agriculture." },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`Seeding dataset "${dataset}" on project ${projectId}...`);

  console.log("Uploading product images...");
  const products = await Promise.all(
    PRODUCTS.map(async (p) => ({
      _id: `product-${p.slug}`,
      _type: "product",
      name: p.name,
      slug: { _type: "slug", current: p.slug },
      subtitle: p.subtitle,
      description: p.description,
      longDescription: p.longDescription,
      stats: p.stats,
      benefits: p.benefits,
      specifications: p.specifications,
      bottleImage: await uploadImage(p.bottleImage),
      productImage: await uploadImage(p.productImage),
      visualVariant: p.visualVariant,
      order: p.order,
    }))
  );

  console.log("Uploading team photos...");
  const teamMembers = await Promise.all(
    [...BIZ_TEAM.map((m, i) => ({ ...m, group: "business" as const, order: i })),
     ...RD_TEAM.map((m, i) => ({ ...m, group: "rd" as const, order: i }))
    ].map(async (m) => ({
      _id: `team-${slugify(m.name)}`,
      _type: "teamMember",
      name: m.name,
      role: m.role,
      flag: m.flag,
      photo: await uploadImage(m.photo),
      group: m.group,
      order: m.order,
    }))
  );

  console.log("Uploading testimonial avatars...");
  const testimonials = await Promise.all(
    TESTIMONIALS.map(async (t, i) => ({
      _id: `testimonial-${i}`,
      _type: "testimonial",
      quote: t.quote,
      name: t.name,
      role: t.role,
      avatar: await uploadImage(t.avatar),
      order: i,
    }))
  );

  console.log("Uploading home page images...");
  const homePage = {
    _id: "homePage",
    _type: "homePage",
    hero: {
      badgeText: "Sustainable Biofarming · Morocco",
      titleLine1: "PGPR",
      titleLine2: "Technologies",
      titleLine3: "The Future of Bio",
      subtitleLine1: "Pioneering biological solutions for sustainable agriculture",
      subtitleLine2: "in Morocco and across Africa.",
      ctaLabel: "Request a Demo",
    },
    sustainableHeading: "Powering Sustainable Agriculture with Biotechnology",
    sustainTabs: await Promise.all(
      SUSTAIN_TABS.map(async (t) => ({
        _key: slugify(t.title),
        title: t.title,
        desc: t.desc,
        image: await uploadImage(t.image),
      }))
    ),
    productsHeading: "Our Sustainable Bio Solutions",
    productsSubheading: "Hover a product card to explore it",
    solutionsHeading: "Our Agricultural Solutions & Expertise",
    solutions: await Promise.all(
      SOLUTIONS.map(async (s) => ({
        _key: slugify(s.title),
        title: s.title,
        desc: s.desc,
        ctaLabel: s.ctaLabel,
        ctaTarget: s.ctaTarget,
        externalHref: "externalHref" in s ? s.externalHref : undefined,
        image: await uploadImage(s.image),
        iconKey: s.iconKey,
      }))
    ),
    technologyHeading: "Technology Behind Our Solutions",
    techItems: await Promise.all(
      TECH_ITEMS.map(async (t) => ({
        _key: slugify(t.label),
        image: await uploadImage(t.image),
        label: t.label,
        desc: t.desc,
      }))
    ),
    pioneering: {
      heading: "Pioneering Biotechnology for a Greener Future",
      paragraph1:
        "PGPR develops innovative biotechnology solutions that support sustainable agriculture and circular economy systems. Our team of scientists and entrepreneurs is dedicated to creating value through green innovation.",
      paragraph2:
        "Based in Morocco, we transform organic waste from the dairy and seafood industries into high-value agricultural products, contributing to both environmental sustainability and food security.",
      image: await uploadImage("pie-hero.png"),
    },
  };

  const aboutPage = {
    _id: "aboutPage",
    _type: "aboutPage",
    hero: {
      title: "Who We Are",
      subtitle: "Pioneering biotechnology for sustainable agriculture in Morocco and across Africa.",
    },
    differentiatorsHeading: "We are Different\nin Every Way",
    differentiators: [
      { _key: "scientific-rd", title: "Scientific R&D Excellence", desc: "Our research teams combine academic rigor with hands-on field expertise, developing PGPR formulations grounded in peer-reviewed science and driven by continuous laboratory innovation." },
      { _key: "field-proven", title: "Field-Proven Results", desc: "Every product undergoes extensive trials across diverse soil types and climates, delivering documented yield improvements and measurable soil health gains for real farmers." },
      { _key: "eco-friendly", title: "Eco-Friendly Formulations", desc: "We transform organic waste streams — including shrimp shells and compost — into high-performance biological inputs that regenerate rather than deplete the ecosystems they touch." },
      { _key: "farmer-first", title: "Farmer-First Approach", desc: "We partner directly with growers to understand local soil challenges and economic realities, adapting our solutions to deliver practical, affordable impact at every scale of farming." },
    ],
    stats: [
      { _key: "satisfaction", value: 100, suffix: "%", label: "Customer Satisfaction Rate", desc: "Solutions developed from organic waste streams, driving environmentally responsible agriculture." },
      { _key: "experience", value: 20, suffix: "+", label: "Years of Experience", desc: "With diverse agricultural backgrounds, our team brings over two decades of combined experience." },
      { _key: "farmers", value: 160, suffix: "K", label: "Farmers Around the World", desc: "Our biological solutions have helped farmers worldwide improve sustainability and crop output." },
    ],
    teamIntro: {
      heading: "Meet Our Team",
      paragraph:
        "A multidisciplinary group of scientists, engineers, and agricultural specialists dedicated to transforming organic waste into sustainable solutions.",
    },
    businessTeamLabel: { heading: "Business Development", yearsExperienceLabel: "35 Years of Experience" },
    rdTeamLabel: { heading: "R&D and Production", yearsExperienceLabel: "20 Years of Experience" },
    teamBadges: {
      wasteBadge: "20T waste\nper day",
      natureBadge: "We invest\nIn nature",
    },
    officeLocation: {
      heading: "Office Location",
      blurb:
        "Visit us at our headquarters in Casablanca, Morocco, where our team of researchers and agronomists work to advance bio-agricultural solutions.",
      ctaLabel: "Get in Touch",
      latitude: 33.585,
      longitude: -7.6,
      zoomBoxDegrees: 0.05,
    },
  };

  const contactPage = {
    _id: "contactPage",
    _type: "contactPage",
    hero: {
      title: "Let's Talk",
      subtitle: "Have questions about our products or technologies? We'd love to hear from you.",
    },
    formIntroHeading: "Reach out to us",
    formIntroText:
      "Our team is here to answer your questions about our bio-agricultural solutions. We'd love to hear from you.",
    contactCards: [
      { _key: "email", label: "Email", value: "hello@pgpr.tech", hrefType: "email" as const },
      { _key: "phone", label: "Phone", value: "+212 6 35 69 94 47", hrefType: "phone" as const },
    ],
    responseTimeNote: "We typically respond within 24 hours",
    sendMessageHeading: "Send a Message",
    formLabels: { name: "Name", email: "Email", subject: "Subject", message: "Message" },
    formPlaceholders: {
      name: "Your name",
      email: "you@company.com",
      subject: "What's this about?",
      message: "How can we help?",
    },
    submitLabel: "Send Message",
    submittingLabel: "Sending…",
    successHeading: "Message sent!",
    successMessage: "Thank you for reaching out. We'll get back to you as soon as possible.",
    sendAnotherLabel: "Send another message",
    genericErrorMessage: "Something went wrong. Please try again.",
    networkErrorMessage: "Network error. Please check your connection and try again.",
  };

  const siteSettings = {
    _id: "siteSettings",
    _type: "siteSettings",
    email: "hello@pgpr.tech",
    phone: "+212 635 699447",
    socialLinks: [
      { _key: "facebook", platform: "facebook" as const, href: "https://facebook.com" },
      { _key: "instagram", platform: "instagram" as const, href: "https://instagram.com" },
      { _key: "linkedin", platform: "linkedin" as const, href: "https://linkedin.com" },
    ],
    footerCopyrightText: "PGPR Technologies © 2026. All rights reserved.",
    metaTitle: "PGPR Technologies — The Future of Bio Farming",
    metaDescription:
      "PGPR promotes biofarming in Morocco by providing innovative scientific solutions for Biologic Agriculture",
    navLabels: {
      home: "Home",
      sustainable: "Sustainable",
      products: "Products",
      services: "Services",
      technologies: "Technologies",
      about: "About",
      contact: "Contact",
    },
    ctaBanner: {
      heading: "Ready to Improve Your Agricultural Performance with Biotechnology?",
      text: "Join hundreds of farmers and distributors already benefiting from our innovative bio-solutions.",
      buttonLabel: "Go Bio, and save the world with us",
    },
    productUi: {
      exploreLabel: "Explore",
      moreInfoLabel: "More info",
      techSheetLabel: "Tech Sheet",
      requestDemoLabel: "Request a Demo",
      technicalSheetLabel: "Technical Sheet",
      overviewHeading: "Product Overview",
      benefitsHeading: "Key Benefits",
      specificationsHeading: "Specifications",
      moreProductsHeading: "More of our Products",
    },
  };

  console.log("Writing documents...");
  const tx = client.transaction();
  for (const doc of [...products, ...teamMembers, ...testimonials, homePage, aboutPage, contactPage, siteSettings]) {
    tx.createOrReplace(doc as never);
  }
  await tx.commit();

  console.log(`Done. Seeded ${products.length} products, ${teamMembers.length} team members, ${testimonials.length} testimonials, and 4 page documents.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
