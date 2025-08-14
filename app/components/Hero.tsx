"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [docked, setDocked] = useState(false);

  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const bandRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    const imageWrap = imageWrapRef.current;
    if (!footer || !imageWrap) return;

    const LANDING_WEIGHT = 0.64; // closer to the footer

    const update = () => {
      const imageBottomAbs =
        window.scrollY + imageWrap.getBoundingClientRect().bottom;
      const footerTopAbs = window.scrollY + footer.getBoundingClientRect().top;

      const midAbs =
        imageBottomAbs + (footerTopAbs - imageBottomAbs) * LANDING_WEIGHT;

      const headerH =
        window.innerWidth >= 768 ? 112 : window.innerWidth >= 640 ? 96 : 80;

      const targetY = midAbs - headerH;

      const ENTER_BUFFER = 8;
      const EXIT_BUFFER = 40;
      const y = window.scrollY;

      setDocked((prev) => {
        if (!prev && y >= targetY + ENTER_BUFFER) return true;
        if (prev && y < targetY - EXIT_BUFFER) return false;
        return prev;
      });
    };

    const onScrollResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollResize, { passive: true });
    window.addEventListener("resize", onScrollResize);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScrollResize);
      window.removeEventListener("resize", onScrollResize);
    };
  }, []);

  return (
    <section className="relative w-full text-white">
      {/* Push image below header */}
      <div
        ref={imageWrapRef}
        className="w-full mt-[80px] sm:mt-[96px] md:mt-0"
        style={{ marginTop: "max(80px, env(safe-area-inset-top))" }}
      >
        <Image
          src="/Dezenio-HomeBG.png"
          alt="Dezenio Kitchen Gallery"
          width={1366}
          height={5376}
          priority
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Tighter breathing room */}
      <div className="h-[clamp(8px,2vh,20px)] bg-transparent" />

      {/* Smaller black band */}
      <div
        ref={bandRef}
        id="hero-dock"
        className="relative bg-black h-[4vh] sm:h-[3.5vh] md:h-[3vh]"
      >
        <div
          className={[
            "absolute inset-0 flex items-center justify-center px-4",
            "transition-opacity duration-150",
            docked ? "opacity-100" : "opacity-0 pointer-events-none",
          ].join(" ")}
        >
          <Docked />
        </div>
      </div>

      {/* Floating overlay */}
      <div
        className={[
          "fixed inset-x-0 top-[64px] sm:top-[84px] z-30",
          "h-[calc(100vh-64px)] sm:h-[calc(100vh-84px)]",
          "flex items-center justify-center px-4 pointer-events-none",
          "transition-opacity duration-150",
          docked ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b
                     from-black/24 via-black/12 to-black/4
                     md:from-black/18 md:via-black/10 md:to-black/0"
        />
        <div className="relative z-10 pointer-events-auto w-full">
          <div className="max-w-[1200px] mx-auto text-center px-4">
            <HeroCopy />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroCopy() {
  return (
    <>
      <h1 className="font-extrabold leading-tight text-white tracking-tight drop-shadow-[0_8px_30px_rgba(0,0,0,.6)] text-[clamp(2rem,7vw,5rem)] max-w-[22ch] sm:max-w-none mx-auto">
        Premium Cabinetry.
        <br className="hidden md:block" />
        Unmatched Execution.
      </h1>

      <p className="mt-3 text-white/95 text-[clamp(1rem,2.6vw,1.25rem)] max-w-[72ch] mx-auto">
        Dezenio Cabinetry offers American-made luxury lines and cost-conscious
        RTA options — designed, supplied, and installed with precision.
      </p>

      <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
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
    </>
  );
}

function Docked() {
  return (
    <div className="w-full max-w-[1200px] text-center px-4">
      <HeroCopy />
    </div>
  );
}
