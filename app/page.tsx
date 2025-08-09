"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <main className="relative w-full bg-black text-white overflow-x-hidden">
      {/* Scrollable Background Image */}
      <div className="w-full">
        <Image
          src="/Dezenio-HomeBG.png"
          alt="Tall Kitchen Background"
          width={1366}
          height={5376}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Floating Hero Text (fixed in viewport) */}
      <section className="fixed top-0 left-0 z-20 w-full h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-white drop-shadow-[0_6px_16px_rgba(0,0,0,0.85)]">
          Premium Cabinetry. <br />
          <span className="text-white">Unmatched Execution.</span>
        </h1>
        <p className="text-lg md:text-xl text-white font-semibold tracking-tight max-w-2xl drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]">
          Dezenio Cabinetry offers American-made luxury lines and cost-conscious
          RTA options — designed, supplied, and installed with precision.
        </p>
      </section>
    </main>
  );
}
