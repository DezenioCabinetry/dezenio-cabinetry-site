// app/components/BrochureShelf.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type Brochure = {
  label: string;
  url: string; // original resource url
  openUrl?: string; // optional: explicit open-original link
  mode?: "viewer" | "newtab";
};

function isIssuu(url: string) {
  return /issuu\.com\/.+\/docs\/.+/i.test(url);
}

function issuuToEmbed(url: string) {
  // Converts:
  // https://issuu.com/USERNAME/docs/DOCSLUG
  // -> https://e.issuu.com/embed.html?u=USERNAME&d=DOCSLUG
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    const docsIndex = parts.indexOf("docs");
    if (docsIndex > 0 && parts.length > docsIndex + 1) {
      const username = parts[0];
      const docSlug = parts[docsIndex + 1];
      return `https://e.issuu.com/embed.html?u=${encodeURIComponent(
        username,
      )}&d=${encodeURIComponent(docSlug)}`;
    }
  } catch {}
  return url; // fallback
}

function toViewerUrl(url: string) {
  // If it's Issuu, use the official embed viewer
  if (isIssuu(url)) return issuuToEmbed(url);

  // Publuu flip-book URLs usually iframe fine as-is
  // PDFs: browser PDF viewer usually works as-is (if host allows)
  return url;
}

export default function BrochureShelf({
  brochures,
}: {
  brochures?: Brochure[];
}) {
  const items = useMemo(() => (brochures ?? []).filter(Boolean), [brochures]);

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Brochure | null>(null);
  const [expanded, setExpanded] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // lock background scroll while modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // close on ESC
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!items.length) return null;

  const openItem = (b: Brochure) => {
    if (b.mode === "newtab") {
      window.open(b.openUrl ?? b.url, "_blank", "noopener,noreferrer");
      return;
    }
    setActive(b);
    setExpanded(true); // default = big/wide
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setActive(null);
  };

  const viewerSrc = active ? toViewerUrl(active.url) : "";

  const modal =
    open && active ? (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999999, // 🔥 beat EVERYTHING
        }}
      >
        {/* Backdrop */}
        <button
          aria-label="Close brochure"
          onClick={close}
          type="button"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.70)",
            border: "none",
            cursor: "pointer",
          }}
        />

        {/* Modal shell */}
        <div
          style={{
            position: "relative",
            margin: "calc(var(--header-h, 92px) + 18px) auto 24px",
            width: expanded ? "min(1400px, 96vw)" : "min(980px, 94vw)",
            height: expanded ? "min(86vh, 900px)" : "min(72vh, 760px)",
            borderRadius: 22,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(10,10,12,0.55)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 30px 90px rgba(0,0,0,0.55)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Top bar */}
          <div
            style={{
              padding: "12px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              borderBottom: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(0,0,0,0.30)",
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.9)",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                paddingRight: 10,
              }}
              title={active.label}
            >
              {active.label}
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                style={pillBtnStyle}
                title="Toggle size"
              >
                {expanded ? "Shrink" : "Expand"}
              </button>

              <a
                href={active.openUrl ?? active.url}
                target="_blank"
                rel="noreferrer"
                style={{ ...pillBtnStyle, textDecoration: "none" }}
              >
                Open Original
              </a>

              <button type="button" onClick={close} style={pillBtnStyle}>
                Close
              </button>
            </div>
          </div>

          {/* Viewer */}
          <div style={{ flex: 1, background: "rgba(0,0,0,0.25)" }}>
            <iframe
              src={viewerSrc}
              title={active.label}
              style={{ width: "100%", height: "100%", border: "none" }}
              allow="fullscreen"
            />
          </div>
        </div>

        <div
          style={{
            position: "relative",
            textAlign: "center",
            fontSize: 12,
            color: "rgba(255,255,255,0.65)",
            marginTop: 10,
          }}
        >
          If a provider blocks embedding, use “Open Original”.
        </div>
      </div>
    ) : null;

  return (
    <div style={{ marginTop: 26 }}>
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.22em",
          color: "rgba(255,255,255,0.70)",
        }}
      >
        BROCHURES
      </div>
      <div
        style={{ marginTop: 4, color: "rgba(255,255,255,0.90)", fontSize: 14 }}
      >
        View online resources
      </div>

      {/* Buttons with REAL TEXT */}
      <div
        style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 10 }}
      >
        {items.map((b) => (
          <button
            key={`${b.label}-${b.url}`}
            type="button"
            onClick={() => openItem(b)}
            style={{
              padding: "10px 12px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(0,0,0,0.25)",
              color: "rgba(255,255,255,0.92)",
              fontSize: 13,
              cursor: "pointer",
              maxWidth: "100%",
            }}
            title={b.label}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* PORTAL so it can’t get trapped behind your page layers */}
      {mounted && open && active ? createPortal(modal, document.body) : null}
    </div>
  );
}

const pillBtnStyle: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(0,0,0,0.25)",
  color: "rgba(255,255,255,0.92)",
  fontSize: 12,
  cursor: "pointer",
};
