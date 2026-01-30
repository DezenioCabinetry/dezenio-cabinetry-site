"use client";

import Link from "next/link";
import Hero from "../../components/Hero";
import BackToProducts from "../../components/BackToProducts";

export default function HardwarePage() {
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
            <Link href="/products/richelieu" className="chip chip-lg">
              Richelieu
            </Link>
            <Link href="/quote" className="chip chip-lg">
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
