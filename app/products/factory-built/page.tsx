"use client";

import Link from "next/link";
import Hero from "../../components/Hero";
import BackToProducts from "../../components/BackToProducts";

export default function FactoryBuiltPage() {
  // ✅ Tailwind-only standardized pills (matches Brand + Quote)
  const pill =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full " +
    "border border-white/20 bg-white/5 text-white/90 text-sm font-semibold " +
    "backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition";

  return (
    <Hero
      imageSrc="/backgrounds/manufacturing-hero.jpg.webp"
      imageAlt="Factory-built cabinetry"
      overlayStrength="strong"
      dockNudgePx={0}
      title={<span className="block">Factory-Built Cabinetry</span>}
      subtitle={
        <>
          American-made lines with dependable finishes, stronger boxes, and
          deeper catalogs.
        </>
      }
      below={
        <div className="flex flex-col items-center gap-4">
          <BackToProducts />

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link href="/products/kith" className={pill}>
              Kith Kitchens
            </Link>
            <Link href="/products/mouser" className={pill}>
              Mouser Cabinetry
            </Link>
            <Link href="/products/bishop" className={pill}>
              Bishop Cabinets
            </Link>
          </div>

          <p className="text-sm text-white/85 text-center">
            Construction: Framed • Frameless • Inset · Typical lead time: ≈ 4–10
            weeks
          </p>
        </div>
      }
    />
  );
}
