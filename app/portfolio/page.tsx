"use client";

import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";

export default function PortfolioPage() {
  const pill =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full " +
    "border border-white/20 bg-white/5 text-white/90 text-sm font-semibold " +
    "backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition";

  const pillPrimary =
    "inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full " +
    "bg-white text-black text-sm font-semibold hover:opacity-90 transition";

  const panel =
    "rounded-3xl border border-white/15 bg-black/30 backdrop-blur-xl " +
    "shadow-[0_20px_70px_rgba(0,0,0,0.45)]";

  return (
    <main className="relative w-full min-h-screen text-white overflow-hidden">
      {/* Background (match Home) */}
      <div className="pointer-events-none fixed inset-0 -z-20" aria-hidden>
        <Image
          src="/Dezenio-HomeBG.png"
          alt="Dezenio Cabinetry background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Overlays (same vibe as other pages) */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-black/35"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent, rgba(0,0,0,0.70))",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.06), transparent 55%)",
        }}
        aria-hidden
      />

      {/* Content */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-[calc(var(--header-h)+40px)] pb-24">
        {/* Hero card */}
        <div className="flex justify-center">
          <div className={`w-full max-w-[980px] ${panel}`}>
            <div className="p-8 sm:p-10 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] tracking-[0.28em] uppercase text-white/80 backdrop-blur-xl">
                <Lock className="h-4 w-4" />
                Privacy-First Gallery
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
                Discretion. Privacy. Exclusivity.
              </h1>

              <p className="mt-4 max-w-2xl mx-auto text-white/80">
                Our work speaks for itself — quietly. We offer private,
                by-appointment viewings tailored to your project.
              </p>

              {/* CTAs (standardized) */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link href="/quote" className={pillPrimary}>
                  Request a Private Viewing
                </Link>
                <Link href="/products" className={pill}>
                  Explore Our Brands
                </Link>
              </div>

              <p className="mt-6 text-sm text-white/60">
                Representative imagery available on request. We protect client
                confidentiality. NDA available.
              </p>
            </div>
          </div>
        </div>

        {/* Trust blurbs */}
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-[980px] grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              [
                "By-Invitation Only",
                "Curated previews tailored to your project.",
              ],
              ["White-Glove Process", "Design, supply, install — end to end."],
              ["Confidentiality", "NDA on request, no public posts."],
            ].map(([title, body]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/12 bg-black/25 backdrop-blur-xl p-5 shadow-[0_14px_45px_rgba(0,0,0,0.35)]"
              >
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-white/70">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
