"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * FLOAT: overlay is fixed under the header while the tall image is in view.
 * LAND:  after the image ends, overlay sits in a black band that is exactly
 *        the remaining viewport height between the fixed header and the footer.
 *        The overlay is vertically centered in that band.
 *
 * Tuning knobs:
 *  - DOCK_TRIGGER_OFFSET_PX: dock a bit earlier (positive number docks sooner).
 *  - DOCK_NUDGE_PX: move the docked overlay up/down a few pixels after centering.
 */

const DOCK_TRIGGER_OFFSET_PX = 140; // try 100–200 if you want it to dock a little sooner
const DOCK_NUDGE_PX = 40; // positive moves it DOWN a bit; negative moves it UP

export default function Hero() {
  const imgWrapRef = useRef<HTMLDivElement | null>(null);
  const dockContentRef = useRef<HTMLDivElement | null>(null);

  const [headerH, setHeaderH] = useState(80);
  const [dockH, setDockH] = useState(160);
  const [onImage, setOnImage] = useState(true);

  // Header height by breakpoint (matches your Header.tsx 80/96/112)
  const measureHeader = (): number => {
    if (typeof window === "undefined") return 80;
    if (window.matchMedia("(min-width: 768px)").matches) return 112; // md
    if (window.matchMedia("(min-width: 640px)").matches) return 96; // sm
    return 80;
  };

  // Compute band height = viewport - header - footer (and make sure content fits)
  useEffect(() => {
    const footerEl = (document.querySelector("footer") ||
      document.querySelector("[data-footer]") ||
      document.querySelector('[role="contentinfo"]')) as HTMLElement | null;

    const compute = () => {
      const h = measureHeader();
      setHeaderH(h);

      const footerH = footerEl ? footerEl.getBoundingClientRect().height : 0;
      const vh = window.innerHeight;
      const contentH = dockContentRef.current?.offsetHeight ?? 0;

      const exact = Math.max(0, Math.round(vh - h - footerH));
      const minNeeded = contentH + 24; // breathing room so pills never clip
      setDockH(Math.max(exact, minNeeded, 120));
    };

    compute();
    window.addEventListener("resize", compute);

    let ro: ResizeObserver | null = null;
    if (footerEl && "ResizeObserver" in window) {
      ro = new ResizeObserver(compute);
      ro.observe(footerEl);
    }

    return () => {
      window.removeEventListener("resize", compute);
      ro?.disconnect();
    };
  }, []);

  // Toggle FLOAT vs LAND with a small early-dock offset
  useEffect(() => {
    const onScrollOrResize = () => {
      const wrap = imgWrapRef.current;
      if (!wrap) return;

      const imgBottomAbs = wrap.offsetTop + wrap.offsetHeight;
      const viewTopUnderHeader = window.scrollY + headerH;

      // Dock a little earlier so it feels more “middle”
      setOnImage(viewTopUnderHeader < imgBottomAbs - DOCK_TRIGGER_OFFSET_PX);
    };

    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [headerH]);

  return (
    <section className="relative w-full text-white">
      {/* Tall image in normal flow */}
      <div ref={imgWrapRef} className="relative">
        <Image
          src="/Dezenio-HomeBG.png"
          alt="Dezenio Kitchen Gallery"
          width={1366}
          height={5376}
          priority
          className="block w-full h-auto object-cover"
        />
      </div>

      {/* FLOAT: overlay fixed under the header while on the image */}
      {onImage && (
        <div
          className="fixed inset-x-0 z-30 pointer-events-none"
          style={{ top: `${headerH}px`, height: `calc(100vh - ${headerH}px)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/18 to-transparent" />
          <CenteredOverlay />
        </div>
      )}

      {/* LAND: exact space between header and footer; overlay centered (with small nudge) */}
      <div className="relative bg-black">
        <div
          className={[
            "mx-auto max-w-[1200px] px-6",
            "flex items-center justify-center text-center",
            onImage ? "opacity-0 pointer-events-none" : "opacity-100",
            "transition-opacity duration-150",
          ].join(" ")}
          style={{ height: dockH }}
          aria-hidden={onImage}
        >
          <div
            ref={dockContentRef}
            className="w-full"
            style={{ transform: `translateY(${DOCK_NUDGE_PX}px)` }}
          >
            <OverlayContent />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- shared overlay (same size floating & docked) ---------- */

function CenteredOverlay() {
  return (
    <div className="relative z-10 w-full h-full flex items-center justify-center px-4 pointer-events-none">
      <div className="w-full max-w-[1200px] text-center pointer-events-auto">
        <OverlayContent />
      </div>
    </div>
  );
}

function OverlayContent() {
  return (
    <>
      <h1 className="font-extrabold leading-tight tracking-tight drop-shadow-[0_8px_30px_rgba(0,0,0,.6)] text-[clamp(2rem,7vw,5rem)]">
        <span className="block">Premium Cabinetry.</span>
        <span className="block">Unmatched Execution.</span>
      </h1>

      <p className="mt-3 text-white/95 text-[clamp(1rem,2.6vw,1.25rem)] max-w-[72ch] mx-auto">
        Dezenio Cabinetry offers American-made luxury lines and cost-conscious
        RTA options — designed, supplied, and installed with precision.
      </p>

      <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/quote"
          className="inline-flex items-center justify-center rounded-full bg-white text-black font-semibold
                     px-6 py-3 hover:opacity-90 whitespace-nowrap leading-none
                     h-auto min-h-[48px] min-w-[180px]"
        >
          Start Your Quote
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur
                     px-6 py-3 hover:bg-white/10 whitespace-nowrap leading-none
                     h-auto min-h-[48px] min-w-[150px]"
        >
          See Brands
        </Link>
      </div>
    </>
  );
}
