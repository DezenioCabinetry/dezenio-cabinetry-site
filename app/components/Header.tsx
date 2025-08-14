"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const showPortfolio =
    (process.env.NEXT_PUBLIC_FEATURE_PORTFOLIO ?? "0") === "1";
  const showBuilders =
    (process.env.NEXT_PUBLIC_FEATURE_BUILDERS ?? "0") === "1";
  const isActive = (p: string) =>
    pathname === p
      ? "relative text-white font-semibold after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-white"
      : "text-white/90 hover:text-white";

  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/35 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[80px] sm:h-[96px] md:h-[112px]">
        {/* LOGO — fully responsive size */}
        <Link
          href="/"
          className="flex items-center justify-center md:justify-start shrink-0 w-full md:w-auto"
        >
          <Image
            src="/dc-logo-wht-trans-crop.png"
            alt="Dezenio Cabinetry"
            width={260}
            height={64}
            className="h-[42px] sm:h-[52px] md:h-[64px] lg:h-[72px] w-auto"
            priority
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-9 text-[15px]">
          <Link href="/products" className={isActive("/products")}>
            Products
          </Link>
          {showPortfolio && (
            <Link href="/portfolio" className={isActive("/portfolio")}>
              Portfolio
            </Link>
          )}
          {showBuilders && (
            <Link href="/builders" className={isActive("/builders")}>
              Builders
            </Link>
          )}
          <a href="tel:+16154742004" className="text-white/90 hover:text-white">
            (615) 474-2004
          </a>
          <Link
            href="/quote"
            className="inline-flex items-center rounded-full px-5 py-2.5 bg-white text-black font-semibold hover:opacity-90"
          >
            Get a Quote
          </Link>
        </nav>

        {/* MOBILE HAMBURGER */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border border-white/15"
        >
          <div className="w-6 space-y-1.5">
            <span className="block h-[2px] w-full bg-white"></span>
            <span className="block h-[2px] w-4/5 bg-white"></span>
            <span className="block h-[2px] w-3/5 bg-white"></span>
          </div>
        </button>
      </div>

      {/* MOBILE SHEET */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-[86%] max-w-[360px] bg-black/90 backdrop-blur-md border-l border-white/10 p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-white">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="w-10 h-10 grid place-items-center rounded-full bg-white/10 border border-white/15"
              >
                <div className="relative w-4 h-4">
                  <span className="absolute inset-0 rotate-45 block h-[2px] bg-white top-1/2"></span>
                  <span className="absolute inset-0 -rotate-45 block h-[2px] bg-white top-1/2"></span>
                </div>
              </button>
            </div>

            <Link
              href="/products"
              onClick={() => setOpen(false)}
              className="text-base py-2 text-white"
            >
              Products
            </Link>
            {showPortfolio && (
              <Link
                href="/portfolio"
                onClick={() => setOpen(false)}
                className="text-base py-2 text-white"
              >
                Portfolio
              </Link>
            )}
            {showBuilders && (
              <Link
                href="/builders"
                onClick={() => setOpen(false)}
                className="text-base py-2 text-white"
              >
                Builders
              </Link>
            )}
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="text-base py-2 text-white"
            >
              Get a Quote
            </Link>
            <a
              href="tel:+16154742004"
              onClick={() => setOpen(false)}
              className="text-base py-2 text-white"
            >
              (615) 474-2004
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
