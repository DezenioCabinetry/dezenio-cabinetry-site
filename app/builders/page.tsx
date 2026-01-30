"use client";

import Image from "next/image";
import Link from "next/link";
import {
  HardHat,
  Handshake,
  ClipboardList,
  Clock,
  Truck,
  Ruler,
  ShieldCheck,
  DollarSign,
} from "lucide-react";

export default function BuildersPage() {
  const lines = [
    {
      icon: Handshake,
      title: "Dealer Access",
      body: "Authorized lines (Kith, Mouser, ProCraft) with spec support & sampling.",
    },
    {
      icon: ClipboardList,
      title: "Spec‑Accurate Quotes",
      body: "Fast takeoffs from plans—appliance panels, trims, hardware dialed in.",
    },
    {
      icon: Clock,
      title: "Lead‑Time Guidance",
      body: "Up‑front timelines by line/finish so you can schedule confidently.",
    },
    {
      icon: Truck,
      title: "Job‑Site Logistics",
      body: "Coordinated deliveries and staging; protected storage when required.",
    },
    {
      icon: Ruler,
      title: "Field Measures",
      body: "On‑site verification before order release; clean change‑order flow.",
    },
    {
      icon: ShieldCheck,
      title: "Warranty Support",
      body: "Manufacturer parts + 1‑year workmanship install support.",
    },
    {
      icon: DollarSign,
      title: "Value Engineering",
      body: "Options across custom, semi‑custom, and RTA to hit budget targets.",
    },
  ];

  return (
    <main className="relative min-h-screen w-full text-white">
      {/* Fixed background (same treatment as home) */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/Dezenio-HomeBG.png" // swap if you want a builders-specific photo later
          alt="Dezenio background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* dark glass for readability */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />
      </div>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-6 pt-[140px] pb-24">
        {/* Eyebrow */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm">
          <HardHat className="h-4 w-4" />
          <span>Trade Partners</span>
        </div>

        {/* Centered heading + subhead (like home) */}
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Builders Program
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg md:text-xl text-gray-200">
            Reliable cabinetry supply, job‑site coordination, and white‑glove
            installs — built for GC schedules and client expectations.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/quote"
              className="rounded-full bg-white text-black px-6 py-3 font-medium hover:bg-white/90"
            >
              Join the Partner List
            </Link>
            <Link
              href="mailto:info@dezeniocabinetry.com"
              className="rounded-full border border-white/25 px-6 py-3 font-medium hover:border-white/40"
            >
              Email Our Team
            </Link>
          </div>

          <p className="mt-3 text-sm text-gray-300">
            Prefer a call?{" "}
            <a href="tel:16154742004" className="underline underline-offset-2">
              (615) 474‑2004
            </a>
          </p>
        </div>

        {/* VERTICAL OVERLAY TEXT (no cards) */}
        <div className="mt-14 space-y-8">
          {lines.map(({ icon: Icon, title, body }) => (
            <div key={title} className="group">
              {/* subtle line accent; no boxes */}
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Icon className="h-5 w-5 opacity-80" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-3xl text-gray-200">{body}</p>
                </div>
              </div>
              {/* divider */}
              <div className="mt-6 h-px w-full bg-gradient-to-r from-white/30 via-white/15 to-transparent" />
            </div>
          ))}
        </div>

        {/* Bottom CTAs */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/quote"
            className="rounded-lg bg-white text-black px-5 py-3 font-medium hover:bg-white/90"
          >
            Request Cabinetry Pricing
          </Link>
          <Link
            href="/products"
            className="rounded-lg border border-white/20 px-5 py-3 font-medium hover:border-white/40"
          >
            View Brands & Lines
          </Link>
        </div>
      </section>
    </main>
  );
}
