"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <main className="relative w-full min-h-screen text-white overflow-x-hidden">
      {/* Fixed full-screen background image with scroll */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/backgrounds/manufacturing-blur.png"
          alt="Manufacturing Background"
          fill
          priority
          className="object-cover object-center brightness-100 contrast-110"
        />
      </div>
      <div className="absolute inset-0 bg-black/20 -z-10" />

      {/* Scrollable column of clickable brand images */}
      <div className="pt-44 space-y-20 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-2">
          Our Cabinetry & Hardware Partners
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-center text-gray-300 mb-12">
          We proudly partner with America’s top cabinetry manufacturers and
          hardware suppliers. Click any image below to visit the official brand
          site.
        </p>

        <div className="flex flex-col items-center gap-14">
          {brands.map((brand) => (
            <a
              key={brand.name}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-[1600px] relative group"
            >
              <Image
                src={brand.image}
                alt={brand.name}
                width={1920}
                height={1080}
                className="rounded-xl shadow-xl object-cover w-full h-auto group-hover:opacity-90 transition duration-300"
              />
              <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <span className="text-white font-semibold text-2xl text-center px-6">
                  Visit {brand.name}
                </span>
              </div>
            </a>
          ))}
        </div>

        <footer className="pt-24 text-center text-sm text-gray-400">
          *All trademarks and logos are property of their respective brands.
          Dezenio Cabinetry is an authorized dealer for select lines.
        </footer>
      </div>
    </main>
  );
}

const brands = [
  {
    name: "Adornus Cabinetry",
    url: "https://adornus.com",
    image: "/brands/adornus.png",
  },
  {
    name: "Bishop Cabinets",
    url: "https://bishopcabinets.com",
    image: "/brands/bishop.png",
  },
  {
    name: "Kith Kitchens",
    url: "https://kithkitchens.com",
    image: "/brands/kith.png",
  },
  {
    name: "Mouser Cabinetry",
    url: "https://mousercabinetry.com",
    image: "/brands/mouser.png",
  },
  {
    name: "ProCraft Cabinetry",
    url: "https://procraftcabinetry.com",
    image: "/brands/procraft.png",
  },
  {
    name: "Richelieu Hardware",
    url: "https://www.richelieu.com",
    image: "/brands/richelieu.png",
  },
];
