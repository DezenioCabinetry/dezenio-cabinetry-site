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
      title: "Spec-Accurate Quotes",
      body: "Fast takeoffs from plans—appliance panels, trims, hardware dialed in.",
    },
    {
      icon: Clock,
      title: "Lead-Time Guidance",
      body: "Up-front timelines by line/finish so you can schedule confidently.",
    },
    {
      icon: Truck,
      title: "Job-Site Logistics",
      body: "Coordinated deliveries and staging; protected storage when required.",
    },
    {
      icon: Ruler,
      title: "Field Measures",
      body: "On-site verification before order release; clean change-order flow.",
    },
    {
      icon: ShieldCheck,
      title: "Warranty Support",
      body: "Manufacturer parts + 1-year workmanship install support.",
    },
    {
      icon: DollarSign,
      title: "Value Engineering",
      body: "Options across custom, semi-custom, and RTA to hit budget targets.",
    },
  ];

  return (
    <main className="relative min-h-screen w-full text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/Dezenio-HomeBG.png"
          alt="Dezenio background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent, rgba(0,0,0,0.72))",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.06), transparent 55%)",
          }}
        />
      </div>

      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-[calc(var(--header-h)+28px)] pb-24">
        {/* Hero */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 backdrop-blur-xl px-4 py-2 text-[11px] tracking-[0.32em] uppercase text-white/80">
            <HardHat className="h-4 w-4 opacity-80" />
            Trade Partners
          </div>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            Builders Program
          </h1>

          <p className="mt-4 max-w-3xl mx-auto text-white/80">
            Reliable cabinetry supply, job-site coordination, and white-glove
            installs — built for GC schedules and client expectations.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:opacity-90 transition"
            >
              Join the Partner List
            </Link>

            <a
              href="mailto:info@dezeniocabinetry.com"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white/90 text-sm font-semibold backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition"
            >
              Email Our Team
            </a>

            <a
              href="tel:+16154742004"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white/90 text-sm font-semibold backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition"
            >
              (615) 474-2004
            </a>
          </div>
        </div>

        {/* Content cards (consistent with Quote/Brand pages) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Offer / Services */}
          <section className="glass-card">
            <div className="p-6 sm:p-8">
              <div className="text-[11px] tracking-[0.32em] uppercase text-white/60">
                What you get
              </div>

              <div className="mt-5 space-y-4">
                {lines.map(({ icon: Icon, title, body }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Icon className="h-5 w-5 text-white/75" />
                      </div>
                      <div className="flex-1">
                        <div className="text-lg font-semibold">{title}</div>
                        <div className="mt-1 text-white/70">{body}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Right: Process + CTA */}
          <section className="glass-card">
            <div className="p-6 sm:p-8">
              <div className="text-[11px] tracking-[0.32em] uppercase text-white/60">
                How it works
              </div>

              <div className="mt-4 space-y-4 text-white/80">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                  <div className="font-semibold text-white">1) Send plans</div>
                  <div className="mt-1 text-white/70">
                    PDFs, sketches, elevations, or a simple layout—whatever
                    you’ve got.
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                  <div className="font-semibold text-white">
                    2) We spec + quote
                  </div>
                  <div className="mt-1 text-white/70">
                    We build a clean cabinet list, confirm panels/trims, and
                    price to your schedule.
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                  <div className="font-semibold text-white">
                    3) Order + coordinate
                  </div>
                  <div className="mt-1 text-white/70">
                    Lead-time confirmation, delivery staging, and install
                    coordination if needed.
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:opacity-90 transition"
                >
                  Request Cabinetry Pricing
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white/90 text-sm font-semibold backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition"
                >
                  View Brands & Lines
                </Link>
              </div>

              <div className="mt-4 text-xs text-white/60">
                Response time: typically within one business day.
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
