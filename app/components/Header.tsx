"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type NavItem = { label: string; href: string; desc?: string };

export default function Header() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [floating, setFloating] = useState(false);

  // desktop dropdown open state (also used for click)
  const [openMenu, setOpenMenu] = useState<"services" | "brands" | null>(null);

  // close dropdowns on route change
  useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Track html.header-float (set by Hero)
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
      ? "relative font-semibold text-white after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-white"
      : "text-white/85 hover:text-white transition";

  const shell = [
    "h-[110px] md:h-[120px] border-b border-white/10",
    floating
      ? "bg-white/[0.04] backdrop-blur-xl"
      : scrolled
        ? "bg-black/55 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,.45)]"
        : "bg-black/40 backdrop-blur-lg",
  ].join(" ");

  // --- Dropdown data
  const services: NavItem[] = useMemo(
    () => [
      {
        label: "Services Overview",
        href: "/products",
        desc: "Everything we offer.",
      },
      { label: "Factory-Built Cabinetry", href: "/products/factory-built" },
      { label: "Quick-Ship (RTA)", href: "/products/quick-ship" },
      { label: "Hardware & Accessories", href: "/products/hardware" },
      { label: "Design Services", href: "/products/design" },
      { label: "Installation", href: "/products/installation" },
    ],
    [],
  );

  const brands: NavItem[] = useMemo(
    () => [
      {
        label: "All Brands & Brochures",
        href: "/products#brands",
        desc: "Browse lines + spec resources.",
      },
      { label: "Kith Kitchens", href: "/products/kith" },
      { label: "Mouser Cabinetry", href: "/products/mouser" },
      { label: "ProCraft (Quick-Ship RTA)", href: "/products/procraft" },
      { label: "Bishop Cabinets", href: "/products/bishop" },
      { label: "Adornus", href: "/products/adornus" },
      { label: "Richelieu Hardware", href: "/products/richelieu" },
    ],
    [],
  );

  function closeAll() {
    setOpenMenu(null);
  }

  // Close dropdown if user clicks outside
  const wrapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function onDocDown(e: MouseEvent) {
      const el = wrapRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) closeAll();
    }
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className={shell}>
        <div
          ref={wrapRef}
          className="mx-auto h-full max-w-[1400px] px-4 sm:px-8 flex items-center justify-between"
        >
          {/* Logo */}
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

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 text-white">
            {/* SERVICES dropdown (hover + click) */}
            <DesktopDropdown
              label="Services"
              open={openMenu === "services"}
              onOpen={() => setOpenMenu("services")}
              onClose={closeAll}
              items={services}
              activeClass={
                pathname.startsWith("/products")
                  ? "relative font-semibold text-white after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-white"
                  : "text-white/85 hover:text-white transition"
              }
            />

            {/* BRANDS dropdown (hover + click) */}
            <DesktopDropdown
              label="Brands"
              open={openMenu === "brands"}
              onOpen={() => setOpenMenu("brands")}
              onClose={closeAll}
              items={brands}
              activeClass={
                pathname.startsWith("/products")
                  ? "text-white/85 hover:text-white transition"
                  : "text-white/85 hover:text-white transition"
              }
            />

            <Link href="/builders" className={active("/builders")}>
              Builders
            </Link>

            <a
              href="tel:16154742004"
              className="text-white/85 hover:text-white transition"
            >
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

          {/* Mobile nav (simple, no dropdown drama) */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function DesktopDropdown({
  label,
  open,
  onOpen,
  onClose,
  items,
  activeClass,
}: {
  label: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  items: { label: string; href: string; desc?: string }[];
  activeClass: string;
}) {
  // Hover-to-open with a tiny delay so it doesn’t “blink”
  const tRef = useRef<number | null>(null);

  const onEnter = () => {
    if (tRef.current) window.clearTimeout(tRef.current);
    tRef.current = window.setTimeout(() => onOpen(), 40);
  };
  const onLeave = () => {
    if (tRef.current) window.clearTimeout(tRef.current);
    tRef.current = window.setTimeout(() => onClose(), 120);
  };

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        type="button"
        onClick={() => (open ? onClose() : onOpen())}
        className={[
          "inline-flex items-center gap-2",
          "px-2 py-2 rounded-xl",
          "focus:outline-none focus:ring-2 focus:ring-white/30",
          activeClass,
        ].join(" ")}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
        <span className="text-white/70 text-xs translate-y-[1px]">▾</span>
      </button>

      {open && (
        <div
          className={[
            "absolute right-0 mt-3 w-[340px] overflow-hidden",
            "rounded-2xl border border-white/15",
            "bg-black/80 backdrop-blur-xl",
            "shadow-[0_25px_80px_rgba(0,0,0,.55)]",
          ].join(" ")}
          role="menu"
        >
          {/* Top strip */}
          <div className="px-4 py-3 border-b border-white/10">
            <div className="text-[11px] tracking-[0.32em] uppercase text-white/60">
              {label === "Brands"
                ? "Manufacturer Lines"
                : "Cabinetry + Services"}
            </div>
            <div className="mt-1 text-sm text-white/85">
              {label === "Brands"
                ? "Browse lines, brochures, and spec resources."
                : "Design, supply, and installation — built around your timeline."}
            </div>
          </div>

          <div className="py-2">
            {items.map((it) => (
              <Link
                key={it.href + it.label}
                href={it.href}
                className={[
                  "block px-4 py-3",
                  "text-white/90 hover:text-white",
                  "hover:bg-white/[0.06] transition",
                ].join(" ")}
                role="menuitem"
              >
                <div className="font-medium">{it.label}</div>
                {it.desc ? (
                  <div className="mt-0.5 text-xs text-white/60">{it.desc}</div>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileMenu() {
  // keep your existing hamburger if you already have one
  // this is intentionally minimal so we don’t break your current setup
  return (
    <div className="md:hidden flex items-center gap-3">
      <Link
        href="/quote"
        className="rounded-full px-4 py-2 font-semibold bg-white text-black ring-1 ring-white/70 hover:bg-white/95 transition"
      >
        Quote
      </Link>
    </div>
  );
}
