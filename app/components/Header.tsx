"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Feature flags: set via NEXT_PUBLIC_* env vars
  const showPortfolio =
    (process.env.NEXT_PUBLIC_FEATURE_PORTFOLIO ?? "0") === "1";
  const showBuilders =
    (process.env.NEXT_PUBLIC_FEATURE_BUILDERS ?? "0") === "1";

  const navLinkClass = (path: string) =>
    pathname === path
      ? "relative text-white font-semibold after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-white"
      : "hover:text-white/80 transition-all duration-150";

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black/30 backdrop-blur-md border-b border-white/10 h-[120px]">
      <div className="mx-auto flex items-center justify-between px-8 h-full max-w-[1400px]">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/Wht-Trans-Lg.png"
            alt="Dezenio Cabinetry"
            width={220}
            height={60}
            className="w-auto h-auto"
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-8 text-[17px] font-medium">
          <Link href="/products" className={navLinkClass("/products")}>
            Products
          </Link>

          {showPortfolio && (
            <Link href="/portfolio" className={navLinkClass("/portfolio")}>
              Portfolio
            </Link>
          )}

          {showBuilders && (
            <Link href="/builders" className={navLinkClass("/builders")}>
              Builders
            </Link>
          )}

          {/* Phone Number */}
          <a
            href="tel:6154742004"
            className="whitespace-nowrap text-white hover:text-white/80 transition-all duration-150"
          >
            📞 (615) 474-2004
          </a>

          {/* Quote Button */}
          <Link
            href="/quote"
            className="rounded-full border border-white px-5 py-2 hover:bg-white hover:text-black transition-all duration-200 ease-in-out shadow-sm hover:shadow-lg whitespace-nowrap"
          >
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
