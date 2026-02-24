"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";

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

  /**
   * OPTIONAL: scroll-driven chapters for homepage story.
   * If provided, chapters override title/subtitle/below while on homepage.
   * If not provided, we’ll use a built-in default chapter set on "/".
   */
  chapters?: Chapter[];
  /**
   * Controls how sensitive chapter switching is. Default 0.06.
   * Lower = switches faster, higher = more stable.
   */
  chapterHysteresis?: number;
};

type ChapterCTA = {
  label: string;
  href: string;
  variant?: "primary" | "ghost";
};

type Chapter = {
  id: string;
  at: number; // 0..1 down the stitched image area
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  ctas?: ChapterCTA[];
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

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
  chapters,
  chapterHysteresis = 0.06,
}: HeroProps) {
  const pathname = usePathname();

  const DOCK_TRIGGER_OFFSET_PX = dockOffsetPx ?? 140;
  const DOCK_NUDGE_PX = dockNudgePx ?? 40;

  const imgWrapRef = useRef<HTMLDivElement | null>(null);
  const dockContentRef = useRef<HTMLDivElement | null>(null);

  const [headerH, setHeaderH] = useState(80);
  const [dockH, setDockH] = useState(160);
  const [onImage, setOnImage] = useState(true);

  // Chapter state
  const defaultHomeChapters: Chapter[] = useMemo(
    () => [
      {
        id: "intro",
        at: 0.06,
        eyebrow: "Dezenio Cabinetry",
        title: (
          <>
            <span className="block">Premium Cabinetry.</span>
            <span className="block">Unmatched Execution.</span>
          </>
        ),
        subtitle:
          "American-made luxury lines and cost-conscious RTA options — designed, supplied, and installed with precision.",
        ctas: [
          { label: "Start Your Quote", href: "/quote", variant: "primary" },
          { label: "See Brands", href: "/products", variant: "ghost" },
        ],
      },
      {
        id: "lines",
        at: 0.25,
        eyebrow: "Authorized Lines",
        title: (
          <>
            <span className="block">Kith • Mouser • ProCraft</span>
            <span className="block">Plus supporting lines.</span>
          </>
        ),
        subtitle:
          "Real lead-time guidance, finish help, and spec support — so orders land clean and installs stay on schedule.",
        ctas: [
          { label: "Explore Products", href: "/products", variant: "primary" },
          { label: "Builders", href: "/builders", variant: "ghost" },
        ],
      },
      {
        id: "process",
        at: 0.48,
        eyebrow: "Design + Takeoff",
        title: (
          <>
            <span className="block">Plan takeoffs that match</span>
            <span className="block">the build — not guesses.</span>
          </>
        ),
        subtitle:
          "Appliance panels, fillers, trim, hardware, and install details accounted for before order day.",
        ctas: [
          { label: "Start Quote", href: "/quote", variant: "primary" },
          { label: "Portfolio", href: "/portfolio", variant: "ghost" },
        ],
      },
      {
        id: "install",
        at: 0.72,
        eyebrow: "Delivery + Install",
        title: (
          <>
            <span className="block">Protected delivery.</span>
            <span className="block">Crisp installation.</span>
          </>
        ),
        subtitle:
          "Jobsite-ready coordination and clean installs that keep your project moving with confidence.",
        ctas: [
          { label: "Get a Quote", href: "/quote", variant: "primary" },
          { label: "See Brands", href: "/products", variant: "ghost" },
        ],
      },
      {
        id: "cta",
        at: 0.9,
        eyebrow: "Let’s build it right",
        title: (
          <>
            <span className="block">Ready when you are.</span>
            <span className="block">Let’s price your project.</span>
          </>
        ),
        subtitle:
          "Upload plans or share scope. We respond fast with a clean next step.",
        ctas: [
          { label: "Start Your Quote", href: "/quote", variant: "primary" },
          { label: "Products", href: "/products", variant: "ghost" },
        ],
      },
    ],
    [],
  );

  const useChapters =
    pathname === "/" &&
    stage === "auto" && // stitched scroll story mode
    (chapters?.length ? true : true); // default chapters enabled on home

  const chaptersToUse = useMemo(() => {
    if (!useChapters) return [];
    return chapters?.length ? chapters : defaultHomeChapters;
  }, [useChapters, chapters, defaultHomeChapters]);

  const [activeChapterIdx, setActiveChapterIdx] = useState(0);

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

  // onImage toggle (your existing dock behavior)
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

  // header float class (your existing behavior)
  useEffect(() => {
    const root = document.documentElement;
    if (onImage) root.classList.add("header-float");
    else root.classList.remove("header-float");
    return () => root.classList.remove("header-float");
  }, [onImage]);

  // ✅ NEW: chapter selection based on scroll progress through stitched image
  useEffect(() => {
    if (!useChapters) return;

    const onScroll = () => {
      const wrap = imgWrapRef.current;
      if (!wrap) return;

      const top = wrap.offsetTop;
      const height = wrap.offsetHeight;
      const viewY = window.scrollY + headerH;

      // progress while within image (0..1)
      const p = clamp01((viewY - top) / Math.max(1, height));

      // pick nearest chapter by `at`, with light hysteresis to avoid jitter
      const current = chaptersToUse[activeChapterIdx];
      const currentDist = current ? Math.abs(current.at - p) : Infinity;

      let best = activeChapterIdx;
      let bestDist = currentDist;

      for (let i = 0; i < chaptersToUse.length; i++) {
        const d = Math.abs(chaptersToUse[i].at - p);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }

      // only switch if meaningfully closer than current
      if (
        best !== activeChapterIdx &&
        bestDist + chapterHysteresis < currentDist
      ) {
        setActiveChapterIdx(best);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [
    useChapters,
    chaptersToUse,
    activeChapterIdx,
    headerH,
    chapterHysteresis,
  ]);

  const renderBelowInOverlay =
    below && (belowMode === "both" || belowMode === "overlay");
  const renderBelowInDock =
    below && (belowMode === "both" || belowMode === "dock");

  // Chapter-derived content (only on homepage in stitched mode)
  const activeChapter = useChapters ? chaptersToUse[activeChapterIdx] : null;

  const EffectiveTitle = activeChapter?.title ?? title;
  const EffectiveSubtitle = activeChapter?.subtitle ?? subtitle;
  const EffectiveCTAs = activeChapter?.ctas ?? null;
  const EffectiveEyebrow = activeChapter?.eyebrow ?? null;

  const DefaultContent = () => (
    <>
      {EffectiveEyebrow ? (
        <div className="mb-2 text-[11px] sm:text-xs tracking-[0.18em] uppercase text-white/80">
          {EffectiveEyebrow}
        </div>
      ) : null}

      <h1 className="font-extrabold leading-tight tracking-tight drop-shadow-[0_10px_35px_rgba(0,0,0,.65)] text-[clamp(2rem,7vw,5rem)]">
        <span className="block">Premium Cabinetry.</span>
        <span className="block">Unmatched Execution.</span>
      </h1>

      <p className="mt-3 text-white/95 text-[clamp(1rem,2.6vw,1.25rem)] max-w-[72ch] mx-auto">
        Dezenio Cabinetry offers American-made luxury lines and cost-conscious
        RTA options — designed, supplied, and installed with precision.
      </p>

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
      {EffectiveTitle ? (
        <>
          {EffectiveEyebrow ? (
            <div className="mb-2 text-[11px] sm:text-xs tracking-[0.18em] uppercase text-white/80 text-center">
              {EffectiveEyebrow}
            </div>
          ) : null}

          <div className="font-extrabold leading-tight tracking-tight drop-shadow-[0_10px_35px_rgba(0,0,0,.65)] text-[clamp(2rem,7vw,5rem)] text-center">
            {EffectiveTitle}
          </div>
        </>
      ) : (
        <DefaultContent />
      )}

      {EffectiveTitle && EffectiveSubtitle && (
        <p className="mt-3 text-white/95 text-[clamp(1rem,2.6vw,1.25rem)] max-w-[72ch] mx-auto text-center">
          {EffectiveSubtitle}
        </p>
      )}

      {/* Chapter CTAs override standard CTAs */}
      {EffectiveCTAs?.length ? (
        <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
          {EffectiveCTAs.map((c) => (
            <Link
              key={c.href + c.label}
              href={c.href}
              className={c.variant === "primary" ? pillPrimary : pill}
            >
              {c.label}
            </Link>
          ))}
        </div>
      ) : null}

      {EffectiveTitle && renderBelowInOverlay ? (
        <div className="mt-6">{below}</div>
      ) : null}
    </>
  );

  const DockContent = () => (
    <>
      {EffectiveTitle ? (
        <>
          {EffectiveEyebrow ? (
            <div className="mb-2 text-[11px] sm:text-xs tracking-[0.18em] uppercase text-white/80 text-center">
              {EffectiveEyebrow}
            </div>
          ) : null}

          <div className="font-extrabold leading-tight tracking-tight drop-shadow-[0_10px_35px_rgba(0,0,0,.65)] text-[clamp(2rem,7vw,5rem)] text-center">
            {EffectiveTitle}
          </div>

          {EffectiveSubtitle ? (
            <p className="mt-3 text-white/95 text-[clamp(1rem,2.6vw,1.25rem)] max-w-[72ch] mx-auto text-center">
              {EffectiveSubtitle}
            </p>
          ) : null}

          {EffectiveCTAs?.length ? (
            <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
              {EffectiveCTAs.map((c) => (
                <Link
                  key={c.href + c.label}
                  href={c.href}
                  className={c.variant === "primary" ? pillPrimary : pill}
                >
                  {c.label}
                </Link>
              ))}
            </div>
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
