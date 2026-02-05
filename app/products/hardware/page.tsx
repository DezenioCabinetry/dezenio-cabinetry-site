"use client";

import Link from "next/link";
import Hero from "../../components/Hero";
import BackToProducts from "../../components/BackToProducts";

export default function HardwarePage() {
  // ✅ Tailwind-only standardized pills
  const pill =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full " +
    "border border-white/20 bg-white/5 text-white/90 text-sm font-semibold " +
    "backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition";

  // ✅ Optional primary pill for the “request” CTA (feels better as primary)
  const pillPrimary =
    "inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full " +
    "bg-white text-black text-sm font-semibold hover:opacity-90 transition";

  return (
    <Hero
      imageSrc="/brands/richelieu-hero.png" // replace with your hardware hero
      imageAlt="Hardware and accessories"
      overlayStrength="max"
      dockNudgePx={0}
      title={<span className="block">Hardware & Accessories</span>}
      subtitle={
        <>
          Pulls, knobs, organizers, soft-close slides & hinges, under-cabinet
          lighting, closet & pantry systems — and more.
        </>
      }
      below={
        <div className="flex flex-col items-center gap-4">
          <BackToProducts />
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link href="/products/richelieu" className={pill}>
              Richelieu
            </Link>
            <Link href="/quote" className={pillPrimary}>
              Request a Hardware Spec
            </Link>
          </div>
          <p className="text-sm text-white/85 text-center">
            Highlights: Rev-A-Shelf organization · Richelieu hardware
            collections · Under-cabinet lighting, closet & pantry
          </p>
        </div>
      }
    />
  );
}
