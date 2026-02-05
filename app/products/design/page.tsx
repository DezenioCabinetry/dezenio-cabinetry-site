"use client";

import Link from "next/link";
import Hero from "../../components/Hero";
import BackToProducts from "../../components/BackToProducts";

export default function DesignPage() {
  // ✅ Tailwind-only standardized pills
  const pill =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full " +
    "border border-white/20 bg-white/5 text-white/90 text-sm font-semibold " +
    "backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition";

  // ✅ Primary CTA pill
  const pillPrimary =
    "inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full " +
    "bg-white text-black text-sm font-semibold hover:opacity-90 transition";

  return (
    <Hero
      imageSrc="/backgrounds/design.jpg" // replace with your design hero
      imageAlt="Design services"
      overlayStrength="strong"
      dockNudgePx={0}
      title={<span className="block">Design Services</span>}
      subtitle={
        <>
          We translate your inspiration and measurements into a functional,
          beautiful plan — executed with precision.
        </>
      }
      below={
        <div className="flex flex-col items-center gap-4">
          <BackToProducts />
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link href="/quote" className={pillPrimary}>
              Start a Design Consult
            </Link>
            <Link href="/portfolio" className={pill}>
              Portfolio
            </Link>
          </div>
          <p className="text-sm text-white/85 text-center">
            What’s included: Layout & door-style guidance · Finish & hardware
            curation · 3D review & spec list
          </p>
        </div>
      }
    />
  );
}
