"use client";

import Link from "next/link";
import Hero from "../components/Hero";

export default function ProductsPage() {
  // ✅ Tailwind-only standardized pills (matches Factory-Built + Brand + Quote)
  const pill =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full " +
    "border border-white/20 bg-white/5 text-white/90 text-sm font-semibold " +
    "backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition";

  return (
    <Hero
      imageSrc="/products.png"
      imageAlt="Products overview"
      overlayStrength="medium" // cleaner/brighter than strong
      dockNudgePx={0}
      title={
        <>
          <span className="block">Our Cabinetry, Hardware &</span>
          <span className="block">Services</span>
        </>
      }
      subtitle={
        <>
          Premium factory-built cabinetry, dependable quick-ship options,
          curated hardware & lighting, plus design and installation — executed
          with precision.
        </>
      }
      below={
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-2">
          <Link href="/products/factory-built" className={pill}>
            Factory-Built
          </Link>
          <Link href="/products/quick-ship" className={pill}>
            Quick-Ship (RTA)
          </Link>
          <Link href="/products/hardware" className={pill}>
            Hardware & Accessories
          </Link>
          <Link href="/products/design" className={pill}>
            Design Services
          </Link>
          <Link href="/products/installation" className={pill}>
            Installation
          </Link>
        </div>
      }
    />
  );
}
