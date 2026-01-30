// app/products/[brand]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrandBySlug } from "./brand-data";

type Props = {
  params: { brand: string };
};

function categoryLabel(category: string) {
  if (category === "factory-built") return "Factory-Built";
  if (category === "quick-ship") return "Quick-Ship";
  if (category === "hardware") return "Hardware";
  if (category === "design") return "Design";
  return "Products";
}

export default function BrandPage({ params }: Props) {
  const brand = getBrandBySlug(params.brand);
  if (!brand) return notFound();

  const categoryHref =
    brand.category === "factory-built"
      ? "/products/factory-built"
      : brand.category === "quick-ship"
        ? "/products/quick-ship"
        : brand.category === "hardware"
          ? "/products/hardware"
          : brand.category === "design"
            ? "/products/design"
            : "/products";

  return (
    <main className="dc-page">
      {/* Background stage */}
      <div
        className="dc-stage"
        style={{
          backgroundImage: `url(${brand.heroImage})`,
        }}
      >
        <div className="dc-stageOverlay" />
      </div>

      {/* Content */}
      <div className="dc-content">
        <div className="dc-center">
          <div className="dc-pill">{brand.badge}</div>

          <h1 className="dc-title">{brand.name}</h1>
          <p className="dc-sub">{brand.tagline}</p>

          {/* Pills / actions */}
          <div className="dc-actions">
            <Link className="dc-btn" href={categoryHref}>
              ← Back to {categoryLabel(brand.category)}
            </Link>

            <Link className="dc-btn" href="/products">
              ← Back to Products
            </Link>

            {brand.manufacturerUrl ? (
              <a
                className="dc-btn"
                href={brand.manufacturerUrl}
                target="_blank"
                rel="noreferrer"
              >
                Visit Manufacturer Website
              </a>
            ) : null}

            <Link className="dc-btn dc-btnPrimary" href="/quote">
              Start a Quote
            </Link>
          </div>

          {/* Two panels */}
          <div className="dc-grid2">
            {/* Highlights */}
            <section className="dc-panel">
              <h2 className="dc-h2">Highlights</h2>
              <ul className="dc-list">
                {brand.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>

              {/* Brochures */}
              {brand.brochures?.length ? (
                <>
                  <div className="dc-divider" />
                  <div className="dc-kicker">BROCHURES</div>
                  <div className="dc-brochures">
                    {brand.brochures.map((b) => (
                      <a
                        key={b.title}
                        className="dc-brochureBtn"
                        href={b.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {b.title}
                      </a>
                    ))}
                  </div>
                  <p className="dc-note">Opens in a new tab.</p>
                </>
              ) : null}
            </section>

            {/* At a glance */}
            <section className="dc-panel">
              <h2 className="dc-h2">At a Glance</h2>

              <div className="dc-glanceGrid">
                <div className="dc-glanceCard">
                  <div className="dc-glanceLabel">LEAD TIME</div>
                  <div className="dc-glanceValue">
                    {brand.atAGlance.leadTime}
                  </div>
                </div>

                <div className="dc-glanceCard">
                  <div className="dc-glanceLabel">CONSTRUCTION</div>
                  <div className="dc-glanceValue">
                    {brand.atAGlance.construction}
                  </div>
                </div>

                <div className="dc-glanceCard">
                  <div className="dc-glanceLabel">STYLE COVERAGE</div>
                  <div className="dc-glanceValue">
                    {brand.atAGlance.styleCoverage}
                  </div>
                </div>

                <div className="dc-glanceCard">
                  <div className="dc-glanceLabel">PRICE TIER</div>
                  <div className="dc-glanceValue">
                    {brand.atAGlance.priceTier}
                  </div>
                </div>
              </div>

              {brand.atAGlance.note ? (
                <p className="dc-footnote">{brand.atAGlance.note}</p>
              ) : null}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
