"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // ✅ Track html.header-float (set by Hero)
    const root = document.documentElement;
    const sync = () => setFloating(root.classList.contains("header-float"));
    sync();

    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("scroll", onScroll);
      mo.disconnect();
    };
  }, []);

  const active = (path: string) =>
    pathname === path
      ? "relative font-semibold after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-white"
      : "hover:text-white/80 transition";

  // ✅ The whole point:
  // - When Hero says "header-float" => make header look like clear glass (not a black bar)
  // - When docked / scrolled => slightly stronger glass for readability
  const shell = [
    "h-[110px] md:h-[120px] border-b border-white/10",
    floating
      ? "bg-white/[0.04] backdrop-blur-xl"
      : scrolled
        ? "bg-black/55 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,.45)]"
        : "bg-black/40 backdrop-blur-lg",
  ].join(" ");

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className={shell}>
        <div className="mx-auto h-full max-w-[1400px] px-4 sm:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/Wht-Trans-Lg.png"
              alt="Dezenio Cabinetry"
              width={240}
              height={60}
              className="h-auto w-[220px] md:w-[240px]"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-white">
            <Link href="/products" className={active("/products")}>
              Products
            </Link>

            <Link href="/builders" className={active("/builders")}>
              Builders
            </Link>

            <a href="tel:16154742004" className="opacity-90 hover:opacity-100">
              (615) 474-2004
            </a>

            <Link
              href="/quote"
              className={[
                "rounded-full px-5 py-2.5 font-semibold ring-1 transition",
                floating
                  ? "bg-white/90 text-black ring-white/70 hover:bg-white"
                  : "bg-white text-black ring-white/70 hover:bg-white/95 shadow-[0_10px_30px_rgba(0,0,0,.35)]",
              ].join(" ")}
            >
              Get a Quote
            </Link>
          </nav>

          {/* mobile hamburger unchanged */}
        </div>
      </div>
    </header>
  );
}
