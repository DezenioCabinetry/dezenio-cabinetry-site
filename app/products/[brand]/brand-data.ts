// app/products/[brand]/brand-data.ts

export type BrochureType = "pdf" | "publuu" | "link";

export type Brochure = {
  title: string;
  type: BrochureType;
  url: string;
  note?: string;
};

export type Brand = {
  slug: string;
  category: "factory-built" | "quick-ship" | "hardware" | "design";
  badge: string;
  name: string;
  tagline: string;

  // Images live in /public
  heroImage: string; // e.g. "/brands/kith-hero.png"
  cardImage: string; // e.g. "/brands/kith.png"

  manufacturerUrl?: string;

  highlights: string[];

  atAGlance: {
    leadTime: string;
    construction: string;
    styleCoverage: string;
    priceTier: string;
    note?: string;
  };

  brochures?: Brochure[];
};

const BRANDS: Brand[] = [
  {
    slug: "kith",
    category: "factory-built",
    badge: "Factory-Built",
    name: "Kith Kitchens",
    tagline:
      "American-made cabinetry with strong style coverage and reliable finishes — a balanced mix of quality, selection, and value.",
    heroImage: "/brands/kith-hero.png",
    cardImage: "/brands/kith.png",
    manufacturerUrl: "https://www.kithkitchens.com/",
    highlights: [
      "Broad style & finish catalog",
      "Reliable, consistent finishes",
      "Great value in semi-custom",
      "American-made",
    ],
    atAGlance: {
      leadTime: "≈ 4–8 weeks*",
      construction: "Framed",
      styleCoverage: "Traditional · Transitional",
      priceTier: "$$",
      note: "*Lead times are typical ranges and may vary by door/finish and factory volume.",
    },
    // You said Kith should have 2–3 brochures.
    // Drop your real URLs here (PDFs or Publuu) and they will render automatically.
    brochures: [
      {
        title: "Kith Kitchens Guide",
        type: "link",
        url: "https://www.kithkitchens.com/",
        note: "Replace with the actual PDF/Publuu link(s) when ready.",
      },
      // Add 1–2 more when you have them:
      // { title: "Kith Door Styles", type: "pdf", url: "https://..." },
      // { title: "Kith Finishes", type: "pdf", url: "https://..." },
    ],
  },

  {
    slug: "mouser",
    category: "factory-built",
    badge: "Factory-Built",
    name: "Mouser Cabinetry",
    tagline:
      "High-end, American-made cabinetry with deep customization, premium materials, and refined detailing.",
    heroImage: "/brands/mouser-hero.png",
    cardImage: "/brands/mouser.png",
    manufacturerUrl: "https://www.mousercabinetry.com/",
    highlights: [
      "Premium semi-custom customization",
      "Strong dealer support + deep catalog",
      "Quality materials and construction",
      "Made in USA",
    ],
    atAGlance: {
      leadTime: "≈ 6–10+ weeks*",
      construction: "Framed",
      styleCoverage: "Traditional · Transitional · Contemporary",
      priceTier: "$$$",
      note: "*Confirm current factory lead times before order submission.",
    },
    // Keep these if you already have your Mouser brochure links elsewhere
    brochures: [
      // Example placeholders — replace or remove if you don’t want them:
      // { title: "Mouser Combined Literature (2024)", type: "pdf", url: "https://..." },
    ],
  },

  {
    slug: "bishop",
    category: "factory-built",
    badge: "Factory-Built",
    name: "Bishop Cabinets",
    tagline:
      "Expertly crafted cabinetry with dependable quality and a deep catalog of options.",
    heroImage: "/brands/bishop-hero.png",
    cardImage: "/brands/bishop.png",
    manufacturerUrl: "https://www.bishopcabinetry.com/",
    highlights: [
      "Craftsmanship focus",
      "Strong catalog",
      "Great dealer support",
      "Made in USA",
    ],
    atAGlance: {
      leadTime: "≈ 5–9 weeks*",
      construction: "Framed",
      styleCoverage: "Traditional · Transitional",
      priceTier: "$$",
      note: "*Lead times are typical ranges and may vary.",
    },
  },

  {
    slug: "procraft",
    category: "quick-ship",
    badge: "Quick-Ship",
    name: "ProCraft Cabinetry",
    tagline:
      "Value-driven, fast-turn cabinetry with a broad offering and accessory ecosystem.",
    heroImage: "/brands/procraft-hero.png",
    cardImage: "/brands/procraft.png",
    manufacturerUrl: "https://www.procraftcabinetry.com/",
    highlights: [
      "Great value + availability",
      "Strong accessory ecosystem",
      "Solid finish/door selection",
      "Good option for speed-focused projects",
    ],
    atAGlance: {
      leadTime: "Varies by program*",
      construction: "Framed",
      styleCoverage: "Traditional · Transitional",
      priceTier: "$",
      note: "*Confirm current availability and lead times at time of quote.",
    },
    brochures: [
      {
        title: "ProCraft Brochure (2024)",
        type: "pdf",
        url: "https://content.app-sources.com/s/90786209979408084/uploads/Resources/ProCraft_Brochure_2024-8342080.pdf",
      },
      {
        title: "Milania Catalog (Q1 2026)",
        type: "pdf",
        url: "https://content.app-sources.com/s/90786209979408084/uploads/Resources/Milania_Catalog_Q1_2026-9097799.pdf",
      },
      {
        title: "ProCraft Accessory Catalog",
        type: "pdf",
        url: "https://content.app-sources.com/s/90786209979408084/uploads/Resources/ProCraft_Accessory_Catalog-9098086.pdf",
      },
      {
        title: "ProCraft Flipbook (Publuu)",
        type: "publuu",
        url: "https://publuu.com/flip-book/991330/2183517",
      },
    ],
  },

  {
    slug: "adornus",
    category: "quick-ship",
    badge: "Quick-Ship",
    name: "Adornus",
    tagline:
      "Fast-turn cabinetry option with practical selections and value positioning.",
    heroImage: "/brands/adornus-hero.png",
    cardImage: "/brands/adornus.png",
    manufacturerUrl: "https://www.adornus.com/",
    highlights: ["Quick-ship friendly", "Value-focused", "Practical options"],
    atAGlance: {
      leadTime: "Varies*",
      construction: "Framed",
      styleCoverage: "Traditional · Transitional",
      priceTier: "$",
      note: "*Confirm current lead times.",
    },
  },

  {
    slug: "richelieu",
    category: "hardware",
    badge: "Hardware",
    name: "Richelieu Hardware",
    tagline: "Premium hardware and accessories to elevate function and finish.",
    heroImage: "/brands/richelieu-hero.png",
    cardImage: "/brands/richelieu.png",
    manufacturerUrl: "https://www.richelieu.com/",
    highlights: [
      "Premium hardware",
      "Deep catalog",
      "Great upgrades + organizers",
    ],
    atAGlance: {
      leadTime: "Varies by item",
      construction: "—",
      styleCoverage: "Modern · Transitional · Traditional",
      priceTier: "$$–$$$",
    },
  },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}

export function getBrandsByCategory(category: Brand["category"]): Brand[] {
  return BRANDS.filter((b) => b.category === category);
}

export function getAllBrands(): Brand[] {
  return BRANDS.slice();
}
