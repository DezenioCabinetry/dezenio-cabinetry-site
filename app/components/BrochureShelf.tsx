// app/components/BrochureShelf.tsx
"use client";

import { useMemo, useState } from "react";

type Brochure = {
  label: string;
  url: string;
  mode?: "viewer" | "newtab";
};

export default function BrochureShelf({
  brochures,
}: {
  brochures?: Brochure[];
}) {
  const items = useMemo(() => (brochures ?? []).filter(Boolean), [brochures]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Brochure | null>(null);

  if (!items.length) return null;

  const openItem = (b: Brochure) => {
    if (b.mode === "newtab") {
      window.open(b.url, "_blank", "noopener,noreferrer");
      return;
    }
    setActive(b);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setActive(null);
  };

  return (
    <div className="mt-8">
      <div className="text-[11px] tracking-[0.22em] text-white/70">
        BROCHURES
      </div>
      <div className="mt-1 text-white/90 text-sm">View online resources</div>

      <div className="mt-4 flex flex-wrap gap-3">
        {items.map((b) => (
          <button
            key={`${b.label}-${b.url}`}
            type="button"
            onClick={() => openItem(b)}
            className="chip chip-lg"
            title="Opens in-page (no navigating away)."
          >
            {b.label}
          </button>
        ))}
      </div>

      {open && active && (
        <div className="fixed inset-0 z-[90]">
          {/* Backdrop */}
          <button
            aria-label="Close brochure"
            className="absolute inset-0 bg-black/70"
            onClick={close}
            type="button"
          />

          {/* Modal */}
          <div className="relative mx-auto mt-[120px] w-[min(1100px,92vw)]">
            <div className="glass rounded-3xl overflow-hidden border border-white/12">
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/10 bg-black/20">
                <div className="text-sm text-white/90 truncate">
                  {active.label}
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noreferrer"
                    className="chip"
                  >
                    Open New Tab
                  </a>
                  <button className="chip" onClick={close} type="button">
                    Close
                  </button>
                </div>
              </div>

              {/* Viewer */}
              <div className="relative bg-black/30">
                <iframe
                  src={active.url}
                  title={active.label}
                  className="w-full h-[70vh]"
                  allow="fullscreen"
                />
              </div>
            </div>

            <div className="mt-2 text-xs text-white/60 text-center">
              If a provider blocks embedding, use “Open New Tab”.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
