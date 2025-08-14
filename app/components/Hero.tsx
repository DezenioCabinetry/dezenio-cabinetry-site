"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [hideOverlay, setHideOverlay] = useState(false);

  // Fade the overlay out while the footer is visible
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const io = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((e) => e.isIntersecting);
        setHideOverlay(isIntersecting);
      },
      {
        root: null,
        // Start fading before the footer fully arrives
        rootMargin: "0px 0px -30% 0px",
        threshold: [0, 0.1, 0.25],
      }
    );

    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative w-full text-white">
      {/* Long scrolling background image */}
      <div className="w-full">
        <Image
          src="/Dezenio-HomeBG.png"
          alt="Dezenio Kitchen Gallery"
          width={1366}
          height={5376}
          priority
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Fixed overlay (floats everywhere) */}
      <div
        className={[
          "fixed inset-x-0 top-[64px] sm:top-[84px] z-30",
          "h-[calc(100vh-64px)] sm:h-[calc(100vh-84px)]",
          "flex items-center justify-center px-4 pointer-events-none",
          "transition-opacity duration-300",
          hideOverlay ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        {/* soft wash for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/10" />

        {/* FULLY centered block */}
        <div className="relative z-10 pointer-events-auto flex flex-col items-center text-center max-w-[1200px] mx-auto">
          {/* Desktop: one line; mobile wraps naturally */}
          <h1
            className="font-extrabold leading-tight text-white drop-shadow-[0_8px_30px_rgba(0,0,0,.6)] tracking-tight
                       text-[clamp(2rem,7vw,5rem)]
                       md:text-[clamp(2.2rem,5vw,4.5rem)]
                       md:whitespace-nowrap"
          >
            Premium Cabinetry. Unmatched Execution.
          </h1>

          <p className="mt-4 text-white/95 text-[clamp(1rem,2.6vw,1.25rem)] max-w-[72ch]">
            Dezenio Cabinetry offers American‑made luxury lines and
            cost‑conscious RTA options — designed, supplied, and installed with
            precision.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-white text-black font-semibold hover:opacity-90"
            >
              Start Your Quote
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 border border-white/30 bg-white/5 backdrop-blur hover:bg-white/10"
            >
              See Brands
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
