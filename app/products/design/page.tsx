"use client";

import Link from "next/link";
import Hero from "../../components/Hero";
import BackToProducts from "../../components/BackToProducts";

export default function DesignPage() {
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
            <Link href="/quote" className="chip chip-lg">
              Start a Design Consult
            </Link>
            <Link href="/portfolio" className="chip chip-lg">
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
