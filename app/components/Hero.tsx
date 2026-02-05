"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type HeroProps = {
  imageSrc?: string;
  imageAlt?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  below?: React.ReactNode;
  dockOffsetPx?: number;
  dockNudgePx?: number;

  // supports your "medium"
  overlayStrength?: "base" | "medium" | "strong" | "max";

  // forces hero image to fill viewport
  stage?: "auto" | "viewport";

  // control where `below` renders
  belowMode?: "both" | "overlay" | "dock";
};

export default function Hero({
  imageSrc = "/Dezenio-HomeBG.png",
  imageAlt = "Dezenio Kitchen Gallery",
  title,
  subtitle,
  below,
  dockOffsetPx,
  dockNudgePx,
  overlayStrength = "base",
  stage = "auto",
  belowMode = "both",
}: HeroProps) {
  const DOCK_TRIGGER_OFFSET_PX = dockOffsetPx ?? 140;
  const DOCK_NUDGE_PX = dockNudgePx ?? 40;

  const imgWrapRef = useRef<HTMLDivElement | null>(null);
  const dockContentRef = useRef<HTMLDivElement | null>(null);

  const [headerH, setHeaderH] = useState(80);
  const [dockH, setDockH] = useState(160);
  const [onImage, setOnImage] = useState(true);

  // ✅ Tailwind-only standardized pills (same as Products/Brand/Quote)
  const pill =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full " +
    "border border-white/20 bg-white/5 text-white/90 text-sm font-semibold " +
    "backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition";

  const pillPrimary =
    "inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full " +
    "bg-white text-black text-sm font-semibold hover:opacity-90 transition";

  const measureHeader = (): number => {
    if (typeof window === "undefined") return 80;
    if (window.matchMedia("(min-width: 768px)").matches) return 112;
    if (window.matchMedia("(min-width: 640px)").matches) return 96;
    return 80;
  };

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
      const minNeeded = contentH + 24;
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

  useEffect(() => {
    const onScrollOrResize = () => {
      const wrap = imgWrapRef.current;
      if (!wrap) return;
      const imgBottomAbs = wrap.offsetTop + wrap.offsetHeight;
      const viewTopUnderHeader = window.scrollY + headerH;
      setOnImage(viewTopUnderHeader < imgBottomAbs - DOCK_TRIGGER_OFFSET_PX);
    };

    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [headerH, DOCK_TRIGGER_OFFSET_PX]);

  useEffect(() => {
    const root = document.documentElement;
    if (onImage) root.classList.add("header-float");
    else root.classList.remove("header-float");
    return () => root.classList.remove("header-float");
  }, [onImage]);

  const renderBelowInOverlay =
    below && (belowMode === "both" || belowMode === "overlay");
  const renderBelowInDock =
    below && (belowMode === "both" || belowMode === "dock");

  const DefaultContent = () => (
    <>
      <h1 className="font-extrabold leading-tight tracking-tight drop-shadow-[0_10px_35px_rgba(0,0,0,.65)] text-[clamp(2rem,7vw,5rem)]">
        <span className="block">Premium Cabinetry.</span>
        <span className="block">Unmatched Execution.</span>
      </h1>

      <p className="mt-3 text-white/95 text-[clamp(1rem,2.6vw,1.25rem)] max-w-[72ch] mx-auto">
        Dezenio Cabinetry offers American-made luxury lines and cost-conscious
        RTA options — designed, supplied, and installed with precision.
      </p>

      {/* ✅ Standardized CTAs */}
      <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/quote" className={pillPrimary}>
          Start Your Quote
        </Link>
        <Link href="/products" className={pill}>
          See Brands
        </Link>
      </div>
    </>
  );

  const OverlayContent = () => (
    <>
      {title ? (
        <div className="font-extrabold leading-tight tracking-tight drop-shadow-[0_10px_35px_rgba(0,0,0,.65)] text-[clamp(2rem,7vw,5rem)] text-center">
          {title}
        </div>
      ) : (
        <DefaultContent />
      )}

      {title && subtitle && (
        <p className="mt-3 text-white/95 text-[clamp(1rem,2.6vw,1.25rem)] max-w-[72ch] mx-auto text-center">
          {subtitle}
        </p>
      )}

      {title && renderBelowInOverlay ? (
        <div className="mt-6">{below}</div>
      ) : null}
    </>
  );

  const DockContent = () => (
    <>
      {title ? (
        <>
          <div className="font-extrabold leading-tight tracking-tight drop-shadow-[0_10px_35px_rgba(0,0,0,.65)] text-[clamp(2rem,7vw,5rem)] text-center">
            {title}
          </div>
          {subtitle ? (
            <p className="mt-3 text-white/95 text-[clamp(1rem,2.6vw,1.25rem)] max-w-[72ch] mx-auto text-center">
              {subtitle}
            </p>
          ) : null}
          {renderBelowInDock ? <div className="mt-6">{below}</div> : null}
        </>
      ) : (
        <DefaultContent />
      )}
    </>
  );

  const spotlight =
    overlayStrength === "max"
      ? "bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.42),rgba(0,0,0,0.86))]"
      : overlayStrength === "strong"
        ? "bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.30),rgba(0,0,0,0.78))]"
        : overlayStrength === "medium"
          ? "bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.22),rgba(0,0,0,0.70))]"
          : "bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.18),rgba(0,0,0,0.62))]";

  return (
    <section className="relative w-full text-white">
      {/* STAGE */}
      <div
        ref={imgWrapRef}
        className="relative overflow-hidden"
        style={
          stage === "viewport"
            ? { height: `calc(100vh - ${headerH}px)` }
            : undefined
        }
      >
        {stage === "viewport" ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1366}
            height={5376}
            priority
            className="block w-full h-auto object-cover"
          />
        )}
      </div>

      {/* OVERLAY (while on image) */}
      {onImage && (
        <div
          className="fixed inset-x-0 z-30 pointer-events-none"
          style={{ top: `${headerH}px`, height: `calc(100vh - ${headerH}px)` }}
        >
          <div className="absolute inset-0">
            <div className={`absolute inset-0 ${spotlight}`} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/30" />
          </div>

          <div className="relative z-10 w-full h-full flex items-center justify-center px-4 pointer-events-none">
            <div className="w-full max-w-[1200px] text-center pointer-events-auto">
              <OverlayContent />
            </div>
          </div>
        </div>
      )}

      {/* DOCK (after leaving image) */}
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
            <DockContent />
          </div>
        </div>
      </div>
    </section>
  );
}
