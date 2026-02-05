"use client";

import Link from "next/link";
import Hero from "../../components/Hero";
import BackToProducts from "../../components/BackToProducts";

export default function QuickShipPage() {
  // ✅ Tailwind-only standardized pills
  const pill =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full " +
    "border border-white/20 bg-white/5 text-white/90 text-sm font-semibold " +
    "backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition";

  return (
    <Hero
      imageSrc="/backgrounds/rta-hero.jpg" // put your RTA hero image here
      imageAlt="Quick-ship cabinetry"
      overlayStrength="max"
      dockNudgePx={0}
      title={<span className="block">Quick-Ship (RTA)</span>}
      subtitle={
        <>
          Value-forward cabinet lines with select quick-ship SKUs when speed
          matters — transitional to contemporary styles.
        </>
      }
      below={
        <div className="flex flex-col items-center gap-4">
          <BackToProducts />
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link href="/products/procraft" className={pill}>
              ProCraft
            </Link>
            <Link href="/products/adornus" className={pill}>
              Adornus
            </Link>
          </div>
          <p className="text-sm text-white/85 text-center">
            Typical ship: 1–7 days (select SKUs) · Style coverage: Transitional
            · Contemporary
          </p>
        </div>
      }
    />
  );
}
