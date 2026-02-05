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
    brochures: [
      {
        title: "Kith Kitchens Guide",
        type: "link",
        url: "https://issuu.com/cedarhillsmedia/docs/kith_kitchens_guide",
      },
      {
        title: "Kith Guide (Oct 2024)",
        type: "link",
        url: "https://issuu.com/cedarhillsmedia/docs/kith-guide-october2024-85x11-mudroom_cover-pages",
      },
      {
        title: "Kith Guide (2022)",
        type: "link",
        url: "https://issuu.com/cedarhillsmedia/docs/kith-guide2022-vfinal_jc",
      },
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
    brochures: [
      {
        title: "Combined Literature (2024)",
        type: "link",
        url: "https://issuu.com/cedarhillsmedia/docs/2024_combined_literature-9-25",
      },
      {
        title: "Master Layout (2023)",
        type: "link",
        url: "https://issuu.com/cedarhillsmedia/docs/mc-cedp_2023_master_layout_2_",
      },
      {
        title: "Mouser Guide (2022)",
        type: "link",
        url: "https://issuu.com/cedarhillsmedia/docs/mouser-guide2022-verfinal-pages-no-marks",
      },
      {
        title: "Doors / Paints / Stains (2022)",
        type: "link",
        url: "https://issuu.com/cedarhillsmedia/docs/mouser-doors-paints-stains-2022-vfinal-spreads",
      },
      {
        title: "Large Insert (17x8)",
        type: "link",
        url: "https://issuu.com/cedarhillsmedia/docs/mouser-large-insert-17x8-vfinal-spread",
      },
      {
        title: "Stoll Hood Literature (2022)",
        type: "link",
        url: "https://issuu.com/cedarhillsmedia/docs/mc_stoll_hood_literature_2022_1_",
      },
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
    brochures: [],
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
        title: "ProCraft Accessory Catalog",
        type: "pdf",
        url: "https://content.app-sources.com/s/90786209979408084/uploads/Resources/ProCraft_Accessory_Catalog-9098086.pdf",
      },
      {
        title: "Milania Catalog (Q1 2026)",
        type: "pdf",
        url: "https://content.app-sources.com/s/90786209979408084/uploads/Resources/Milania_Catalog_Q1_2026-9097799.pdf",
      },
      {
        title: "ProCraft Brochure (2024)",
        type: "pdf",
        url: "https://content.app-sources.com/s/90786209979408084/uploads/Resources/ProCraft_Brochure_2024-8342080.pdf",
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
    brochures: [
      {
        title: "Adornus Alusso Brochure",
        type: "pdf",
        url: "https://static1.squarespace.com/static/6080624b9a059244d6bfaf24/t/69779d5404403367a80bbb3e/1769446740257/Adornus+Alusso+Brochure.pdf",
      },
      {
        title: "Adornus Designer Brochure",
        type: "pdf",
        url: "https://static1.squarespace.com/static/6080624b9a059244d6bfaf24/t/69779c66f0790a131139d5bd/1769446502188/Adornus+Designer+Brochure+Final.pdf",
      },
      {
        title: "Adornus Essential Brochure",
        type: "pdf",
        url: "https://static1.squarespace.com/static/6080624b9a059244d6bfaf24/t/69779c0b3a2e8e4baf23956e/1769446411567/Adornus+Essential+Brochure.pdf",
      },
    ],
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
    brochures: [],
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
