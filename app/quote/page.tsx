"use client";

import Link from "next/link";
import Hero from "../components/Hero";
import QuoteForm from "../components/QuoteForm";

export default function QuotePage() {
  return (
    <Hero
      imageSrc="/backgrounds/kitchen-dark-modern.png"
      imageAlt="Luxury kitchen background"
      overlayStrength="medium" // ← was strong; cleaner/brighter
      dockNudgePx={0}
      title={<span className="block">Get a Cabinetry Quote</span>}
      subtitle={
        <>
          Tell us about your project — we’ll follow up with pricing, lead times,
          and product options based on your layout and needs.
        </>
      }
      below={
        <div className="w-full max-w-[980px] mx-auto flex flex-col items-center gap-4">
          <Link href="/products" className="chip chip-lg">
            ← Back to Products
          </Link>

          <div className="glass-hero w-full rounded-2xl p-5 sm:p-7">
            <QuoteForm />
            <p className="mt-4 text-center text-xs text-white/70">
              We typically respond within one business day.
            </p>
          </div>
        </div>
      }
    />
  );
}
