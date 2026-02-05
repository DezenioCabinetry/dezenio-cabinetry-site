// app/quote/page.tsx
import Link from "next/link";
import QuoteForm from "../components/QuoteForm";

export default function QuotePage() {
  // ✅ Standardized pills (same as the rest of the site)
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
    <main className="relative min-h-screen text-white">
      {/* Background */}
      <div
        className="pointer-events-none fixed inset-0 -z-20 bg-center bg-cover"
        style={{ backgroundImage: "url('/dezenio-hero.png')" }}
        aria-hidden
      />

      {/* ✅ Overlays ONLY below header so header stays glass */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 -z-10"
        style={{
          top: "var(--header-h)",
          background: "rgba(0,0,0,0.30)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 -z-10"
        style={{
          top: "var(--header-h)",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent, rgba(0,0,0,0.65))",
        }}
        aria-hidden
      />
      {/* subtle center lift so the page matches your “premium” hero feel */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 -z-10"
        style={{
          top: "var(--header-h)",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.06), transparent 55%)",
        }}
        aria-hidden
      />

      {/* Content */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-[calc(var(--header-h)+28px)] pb-24">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            Get a Cabinetry Quote
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-white/80">
            Tell us about your project — we’ll follow up with pricing, lead
            times, and product options based on your layout and needs.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/products" className={pill}>
              ← Back to Products
            </Link>

            <a href="tel:+16154742004" className={pillPrimary}>
              Call (615) 474-2004
            </a>

            <div className="text-xs text-white/60">
              Response time: typically within one business day.
            </div>
          </div>
        </div>

        {/* Symmetry wrapper */}
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-[980px] space-y-8">
            {/* What to expect */}
            <div className={panel}>
              <div className="px-6 sm:px-8 py-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="shrink-0">
                    <div className="text-[11px] tracking-[0.32em] uppercase text-white/60">
                      What to expect
                    </div>
                    <div className="mt-1 text-xl sm:text-2xl font-semibold">
                      Fast, clear next steps.
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 flex-1">
                    <div className="text-sm">
                      <div className="font-semibold text-white">
                        Confirm scope
                      </div>
                      <div className="mt-1 text-white/70">
                        We review measurements, layout notes, and site
                        conditions.
                      </div>
                    </div>

                    <div className="text-sm">
                      <div className="font-semibold text-white">
                        Recommend a line
                      </div>
                      <div className="mt-1 text-white/70">
                        We match budget + lead time with the best-fit cabinet
                        brand.
                      </div>
                    </div>

                    <div className="text-sm">
                      <div className="font-semibold text-white">
                        Send pricing
                      </div>
                      <div className="mt-1 text-white/70">
                        You get a clean quote and realistic lead time range.
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 shrink-0">
                    <a href="tel:+16154742004" className={pillPrimary}>
                      Call Now
                    </a>
                    <Link href="/products" className={pill}>
                      View Products
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Form card */}
            <div className={panel}>
              <div className="p-6 sm:p-8">
                <div className="text-[11px] tracking-[0.32em] uppercase text-white/60">
                  Quote request
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-semibold">
                  Tell us about your project
                </div>
                <div className="mt-2 text-white/70">
                  The more detail you provide, the faster we can price it.
                </div>

                <div className="mt-6">
                  <QuoteForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
