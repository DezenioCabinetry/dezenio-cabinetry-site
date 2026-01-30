"use client";

import Link from "next/link";
import Hero from "../../components/Hero";
import BackToProducts from "../../components/BackToProducts";

export default function FactoryBuiltPage() {
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
            <Link href="/products/kith" className="chip chip-lg">
              Kith Kitchens
            </Link>
            <Link href="/products/mouser" className="chip chip-lg">
              Mouser Cabinetry
            </Link>
            <Link href="/products/bishop" className="chip chip-lg">
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
