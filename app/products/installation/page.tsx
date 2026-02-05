"use client";

import Link from "next/link";
import Hero from "../../components/Hero";
import BackToProducts from "../../components/BackToProducts";

export default function InstallationPage() {
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
            <Link href="/quote" className={pillPrimary}>
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
