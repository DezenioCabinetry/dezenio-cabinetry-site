"use client";

import React from "react";
import Link from "next/link";
import Hero from "../components/Hero";
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

type Line = {
  icon: React.ElementType;
  title: string;
  body: string;
};

export default function BuildersPage() {
  const whatYouGet: Line[] = [
    {
      icon: Handshake,
      title: "Dealer access",
      body: "Authorized lines (Kith, Mouser, ProCraft) with spec support & sampling.",
    },
    {
      icon: ClipboardList,
      title: "Spec-accurate quotes",
      body: "Fast takeoffs from plans—appliance panels, trims, hardware dialed in.",
    },
    {
      icon: Clock,
      title: "Lead-time guidance",
      body: "Up-front timelines by line/finish so you can schedule confidently.",
    },
    {
      icon: Truck,
      title: "Job-site logistics",
      body: "Coordinated delivery + staging; protected storage when required.",
    },
    {
      icon: Ruler,
      title: "Field measures",
      body: "On-site verification before order release; clean change-order flow.",
    },
    {
      icon: ShieldCheck,
      title: "Warranty support",
      body: "Manufacturer parts + 1-year workmanship install support.",
    },
    {
      icon: DollarSign,
      title: "Value engineering",
      body: "Options across custom, semi-custom, and RTA to hit budget targets.",
    },
  ];

  const howItWorks = [
    {
      n: "1",
      title: "Upload plans (fastest)",
      body: "Attach PDFs, sketches, elevations, or photos on the Quote form.",
    },
    {
      n: "2",
      title: "We spec + quote",
      body: "We confirm panels/trims/hardware and build a clean cabinet list.",
    },
    {
      n: "3",
      title: "Order + coordinate",
      body: "Lead-time confirmation, staging/delivery planning, and install coordination if needed.",
    },
  ];

  const pill =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full " +
    "border border-white/20 bg-white/5 text-white/90 text-sm font-semibold " +
    "backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition";

  const pillPrimary =
    "inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full " +
    "bg-white text-black text-sm font-semibold hover:opacity-90 transition";

  // One shared width so both columns feel perfectly centered and balanced
  const colInner = "mx-auto w-full max-w-[560px]";

  return (
    <Hero
      imageSrc="/Dezenio-HomeBG.png"
      imageAlt="Builders program background"
      overlayStrength="strong"
      dockNudgePx={0}
      title={
        <>
          <span className="block">Builders</span>
          <span className="block">Trade Partner Program</span>
        </>
      }
      subtitle={
        <>
          Reliable cabinetry supply, clean quoting, and coordinated
          delivery/installation — built for GC schedules and client
          expectations.
        </>
      }
      below={
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          {/* Centered badge + CTAs */}
          <div className="mt-6 flex flex-col items-center gap-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 backdrop-blur-xl px-4 py-2 text-[11px] tracking-[0.32em] uppercase text-white/85">
              <HardHat className="h-4 w-4 opacity-80" />
              Trade Partners
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/quote" className={pillPrimary}>
                Upload Plans (Quote Form)
              </Link>

              <a href="mailto:info@dezeniocabinetry.com" className={pill}>
                Email Plans
              </a>

              <a href="tel:+16154742004" className={pill}>
                (615) 474-2004
              </a>
            </div>

            <div className="text-xs text-white/70">
              Typical response: within one business day.
            </div>
          </div>

          {/* Section framing (no “card”) */}
          <div className="mt-10">
            <div className="border-t border-white/10" />

            <div className="py-10">
              {/* ✅ Make the grid itself centered and symmetrical */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* LEFT COLUMN */}
                <div className="text-center">
                  <div className={colInner}>
                    <div className="text-[11px] tracking-[0.32em] uppercase text-white/70 text-center">
                      What you get
                    </div>

                    {/* ✅ Rows are centered as a block, but text inside is left-aligned */}
                    <div className="mt-6 space-y-6">
                      {whatYouGet.map(({ icon: Icon, title, body }) => (
                        <div key={title} className="mx-auto w-full">
                          <div className="flex items-start gap-3 w-full">
                            <Icon className="mt-[3px] h-5 w-5 text-white/75 shrink-0" />
                            <div className="text-left">
                              <div className="font-semibold text-white">
                                {title}
                              </div>
                              <div className="mt-1 text-white/75 leading-relaxed">
                                {body}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="text-center">
                  <div className={colInner}>
                    <div className="text-[11px] tracking-[0.32em] uppercase text-white/70 text-center">
                      How it works
                    </div>

                    <div className="mt-6 space-y-7">
                      {howItWorks.map((s) => (
                        <div key={s.n} className="mx-auto w-full">
                          <div className="flex items-start gap-3 w-full">
                            <div className="mt-[2px] inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/5 text-xs font-semibold text-white/90 shrink-0">
                              {s.n}
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-white">
                                {s.title}
                              </div>
                              <div className="mt-1 text-white/75 leading-relaxed">
                                {s.body}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3 justify-center">
                      <Link href="/quote" className={pillPrimary}>
                        Start Quote + Upload
                      </Link>
                      <Link href="/products#brands" className={pill}>
                        View Brands & Lines
                      </Link>
                    </div>

                    <div className="mt-4 text-xs text-white/60 text-center">
                      Uploads happen on the Quote form — Builders page routes
                      you there.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-white/10" />
          </div>

          <div className="h-16" />
        </div>
      }
    />
  );
}
