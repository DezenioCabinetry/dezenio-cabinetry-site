"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full pt-28">
      {" "}
      {/* pt-2 to push content below fixed header */}
      {/* Massive Background Image (5376px tall) */}
      <div className="relative w-full h-[5376px]">
        <Image
          src="/Dezenio-HomeBG.png"
          alt="Dezenio Kitchen Gallery"
          fill
          priority
          className="object-cover object-top z-0"
        />
      </div>
      {/* Text Overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-20 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-md text-white">
          Premium Cabinetry.
          <br />
          <span className="text-gray-100">Unmatched Execution.</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 drop-shadow max-w-2xl">
          Dezenio Cabinetry offers American-made luxury lines and cost-conscious
          RTA options — designed, supplied, and installed with precision.
        </p>
      </div>
    </section>
  );
}
