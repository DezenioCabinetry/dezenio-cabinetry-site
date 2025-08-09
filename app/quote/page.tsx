"use client";

import Image from "next/image";
import QuoteForm from "../components/QuoteForm";

export default function QuotePage() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden text-white font-sans">
      {/* ✅ BACKGROUND IMAGE — no dimming */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/backgrounds/kitchen-dark-modern.png"
          alt="Luxury Kitchen Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* ✅ SOFT GLASS OVERLAY (no heavy gradient) */}
      <section className="relative z-10 pt-44 pb-24 px-4 sm:px-8 max-w-3xl mx-auto">
        <div className="bg-black/50 backdrop-blur-lg rounded-2xl px-10 py-12 shadow-xl border border-white/10">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 tracking-tight">
            Get a Cabinetry Quote
          </h1>
          <p className="text-center text-white/80 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
            Tell us about your project — we’ll follow up with pricing, lead
            times, and product options based on your layout and needs.
          </p>
          <QuoteForm />
        </div>
      </section>
    </main>
  );
}
