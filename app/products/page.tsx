"use client";

import Link from "next/link";
import Hero from "../components/Hero";

export default function ProductsPage() {
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
          <Link href="/products/factory-built" className="chip chip-lg">
            Factory-Built
          </Link>
          <Link href="/products/quick-ship" className="chip chip-lg">
            Quick-Ship (RTA)
          </Link>
          <Link href="/products/hardware" className="chip chip-lg">
            Hardware & Accessories
          </Link>
          <Link href="/products/design" className="chip chip-lg">
            Design Services
          </Link>
          <Link href="/products/installation" className="chip chip-lg">
            Installation
          </Link>
        </div>
      }
    />
  );
}
