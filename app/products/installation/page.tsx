"use client";

import Link from "next/link";
import Hero from "../../components/Hero";
import BackToProducts from "../../components/BackToProducts";

export default function InstallationPage() {
  return (
    <Hero
      imageSrc="/products.png" // use same hero or add /installation-hero.jpg
      imageAlt="Installation"
      overlayStrength="strong"
      dockNudgePx={0}
      title={<span className="block">Installation</span>}
      subtitle={
        <>
          From delivery to final fit, we coordinate professional installs to
          keep your project moving.
        </>
      }
      below={
        <div className="flex flex-col items-center gap-4">
          <BackToProducts />
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link href="/quote" className="chip chip-lg">
              Ask About Install
            </Link>
          </div>
          <p className="text-sm text-white/85 text-center">
            Highlights: Trusted installers · Jobsite coordination · Punch-list
            support
          </p>
        </div>
      }
    />
  );
}
