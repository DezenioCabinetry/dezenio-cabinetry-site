"use client";

import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";

export default function PortfolioPage() {
  return (
    <main className="relative w-full min-h-screen text-white overflow-hidden">
      {/* Background (match Home) */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Dezenio-HomeBG.png" // use the same image as Home; swap if you want
          alt="Dezenio Cabinetry background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark glass overlay for readability */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />
      </div>

      {/* HERO — centered like Home */}
      <section className="relative flex items-center justify-center text-center px-6 pt-[140px] pb-16">
        {/* The header is ~120px tall, so we pad-top to avoid overlap.
            The box below is the floating hero container. */}
        <div className="max-w-4xl mx-auto">
          {/* Small lock badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm">
            <Lock className="h-4 w-4" />
            <span>Privacy‑First Portfolio</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Discretion. Privacy. Exclusivity.
          </h1>

          <p className="mt-5 text-lg md:text-xl text-gray-200">
            Our work speaks for itself — quietly. We offer private,
            by‑appointment viewings.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/quote"
              className="rounded-full bg-white text-black px-6 py-3 font-medium hover:bg-white/90"
            >
              Request a Private Viewing
            </Link>
            <Link
              href="/products"
              className="rounded-full border border-white/25 px-6 py-3 font-medium hover:border-white/40"
            >
              Explore Our Brands
            </Link>
          </div>

          {/* Disclosure line */}
          <p className="mt-6 text-sm text-gray-300">
            Representative imagery available on request. We protect client
            confidentiality.
          </p>
        </div>
      </section>

      {/* TRUST BLURBS — sit below the hero */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            [
              "By‑Invitation Only",
              "Curated previews tailored to your project.",
            ],
            ["White‑Glove Process", "Design, supply, install — end to end."],
            ["Confidentiality", "NDA on request, no public posts."],
          ].map(([title, body]) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-[1px]"
            >
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-gray-300">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
