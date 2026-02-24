// app/products/[brand]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import BrochureShelf from "../../components/BrochureShelf";
import { getBrandBySlug } from "./brand-data";

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand: slug } = await params;

  const brand = getBrandBySlug(slug);
  if (!brand) return notFound();

  const backToCategory = `/products/${brand.category}`;

  const brochures =
    brand.brochures?.map((b) => ({
      label: b.title,
      url: b.url,
      openUrl: b.url,
      mode: "viewer" as const,
    })) ?? [];

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

  const glanceCard =
    "rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4";

  // ✅ safe string for CSS url()
  const heroUrl = brand.heroImage?.replace(/"/g, '\\"') ?? "";

  return (
    <main className="relative min-h-screen text-white">
      {/* Background stage */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url("${heroUrl}")` }}
        aria-hidden
      />
      <div className="fixed inset-0 -z-10 bg-black/40" aria-hidden />
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent, rgba(0,0,0,0.70))",
        }}
        aria-hidden
      />
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.06), transparent 55%)",
        }}
        aria-hidden
      />

      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-[calc(var(--header-h)+22px)] pb-24">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full border border-white/15 bg-black/30 backdrop-blur-xl px-4 py-2 text-[11px] tracking-[0.32em] uppercase text-white/80">
            {brand.badge}
          </div>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            {brand.name}
          </h1>

          <p className="mt-4 max-w-3xl mx-auto text-white/80">
            {brand.tagline}
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link className={pill} href={backToCategory}>
              ← Back to {brand.badge}
            </Link>

            {/* ✅ Brands anchor (matches Header/Footer) */}
            <Link className={pill} href="/products#brands">
              ← Back to Brands
            </Link>

            <Link className={pill} href="/products">
              ← Back to Products
            </Link>

            {brand.manufacturerUrl ? (
              <a
                className={pill}
                href={brand.manufacturerUrl}
                target="_blank"
                rel="noreferrer"
              >
                Manufacturer Site
              </a>
            ) : null}

            <Link className={pillPrimary} href="/quote">
              Start a Quote
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Highlights + Brochures */}
          <section className={panel}>
            <div className="p-6 sm:p-8">
              <div className="text-[11px] tracking-[0.32em] uppercase text-white/60">
                Highlights
              </div>

              <ul className="mt-4 space-y-2 text-white/85">
                {brand.highlights.map((h) => (
                  <li key={h} className="leading-relaxed">
                    • {h}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <BrochureShelf brochures={brochures} />
              </div>
            </div>
          </section>

          {/* At a glance */}
          <section className={panel}>
            <div className="p-6 sm:p-8">
              <div className="text-[11px] tracking-[0.32em] uppercase text-white/60">
                At a glance
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={glanceCard}>
                  <div className="text-[11px] tracking-[0.28em] uppercase text-white/60">
                    Lead time
                  </div>
                  <div className="mt-1 text-lg font-semibold">
                    {brand.atAGlance.leadTime}
                  </div>
                </div>

                <div className={glanceCard}>
                  <div className="text-[11px] tracking-[0.28em] uppercase text-white/60">
                    Construction
                  </div>
                  <div className="mt-1 text-lg font-semibold">
                    {brand.atAGlance.construction}
                  </div>
                </div>

                <div className={glanceCard}>
                  <div className="text-[11px] tracking-[0.28em] uppercase text-white/60">
                    Style coverage
                  </div>
                  <div className="mt-1 text-lg font-semibold">
                    {brand.atAGlance.styleCoverage}
                  </div>
                </div>

                <div className={glanceCard}>
                  <div className="text-[11px] tracking-[0.28em] uppercase text-white/60">
                    Price tier
                  </div>
                  <div className="mt-1 text-lg font-semibold">
                    {brand.atAGlance.priceTier}
                  </div>
                </div>
              </div>

              {brand.atAGlance.note ? (
                <div className="mt-4 text-xs text-white/60">
                  {brand.atAGlance.note}
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
