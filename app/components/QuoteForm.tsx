"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "sending" | "sent" | "error";

export default function QuoteForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const addressInputRef = useRef<HTMLInputElement | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to send.");

      setStatus("sent");
      form.reset();
      if (addressInputRef.current) addressInputRef.current.value = "";
      router.push("/thank-you");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setStatus("error");
      setError(msg);
    }
  }

  // ✅ unified inputs (same across all fields)
  const inputBase =
    "w-full rounded-2xl px-4 py-3 " +
    "border border-white/12 bg-black/25 text-white placeholder-white/45 " +
    "backdrop-blur-xl " +
    "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 " +
    "transition";

  const selectBase =
    inputBase +
    " appearance-none pr-10 " +
    "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(255,255,255,0.00))]";

  const textareaBase = inputBase + " resize-y min-h-[160px] leading-relaxed";

  const hint = "text-xs text-white/55 leading-relaxed";

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="honeypot"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* ✅ Everything is one cohesive card section */}
      <div className="space-y-6">
        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <FieldWrap className="md:col-span-5" label="Full Name">
            <input
              name="name"
              required
              className={inputBase}
              placeholder="Jane Doe"
              autoComplete="name"
            />
          </FieldWrap>

          <FieldWrap className="md:col-span-5" label="Email">
            <input
              type="email"
              name="email"
              required
              className={inputBase}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </FieldWrap>

          <FieldWrap className="md:col-span-2" label="Phone">
            <input
              name="phone"
              className={inputBase}
              placeholder="(615) 555-1234"
              autoComplete="tel"
            />
          </FieldWrap>
        </div>

        {/* Address */}
        <FieldWrap label="Project Address">
          <input
            ref={addressInputRef}
            name="address"
            required
            className={inputBase}
            placeholder="1234 Oak St, Nashville, TN"
            autoComplete="street-address"
          />

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <span className={hint}>
              Tip: include unit #, subdivision, or lot if applicable.
            </span>
          </div>

          {/* Hidden geo fields */}
          <input type="hidden" name="addressLine1" />
          <input type="hidden" name="placeCity" />
          <input type="hidden" name="placeRegion" />
          <input type="hidden" name="placePostcode" />
          <input type="hidden" name="placeCountry" />
          <input type="hidden" name="lat" />
          <input type="hidden" name="lng" />
        </FieldWrap>

        {/* Project basics */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <FieldWrap className="md:col-span-4" label="Project Type">
            <div className="relative">
              <select
                name="projectType"
                className={selectBase}
                defaultValue="Kitchen"
              >
                <option>Kitchen</option>
                <option>Bathroom</option>
                <option>Laundry</option>
                <option>Closet</option>
                <option>Other</option>
              </select>
              <Chevron />
            </div>
          </FieldWrap>

          <FieldWrap className="md:col-span-4" label="Desired Start">
            <input type="date" name="startDate" className={inputBase} />
          </FieldWrap>

          <FieldWrap className="md:col-span-4" label="Budget Range">
            <div className="relative">
              <select
                name="budget"
                className={selectBase}
                defaultValue="10–25k"
              >
                <option value="<10k">&lt; $10k</option>
                <option value="10–25k">$10–25k</option>
                <option value="25–50k">$25–50k</option>
                <option value="50k+">$50k+</option>
              </select>
              <Chevron />
            </div>
          </FieldWrap>
        </div>

        {/* Source */}
        <FieldWrap label="How did you hear about us?">
          <div className="relative">
            <select
              name="source"
              className={selectBase}
              defaultValue="Referral"
            >
              <option>Referral</option>
              <option>Google</option>
              <option>Instagram</option>
              <option>Homeowner Group</option>
              <option>Builder/Contractor</option>
              <option>Other</option>
            </select>
            <Chevron />
          </div>
        </FieldWrap>

        {/* Details */}
        <FieldWrap label="Project Details">
          <textarea
            name="message"
            required
            rows={7}
            className={textareaBase}
            placeholder="Layout info, measurements, door style, finishes, timeline…"
          />
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <span className={hint}>
              Helpful: rough room dimensions, appliance sizes, and any
              inspiration links.
            </span>
          </div>
        </FieldWrap>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "sending"}
          className={[
            "w-full rounded-2xl px-6 py-3.5 font-semibold transition",
            "bg-white text-black hover:opacity-95",
            "disabled:opacity-60 disabled:cursor-not-allowed",
            "shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
          ].join(" ")}
        >
          {status === "sending" ? "Sending…" : "Submit Quote Request"}
        </button>

        {/* Error */}
        {status === "error" && (
          <div className="rounded-2xl border border-red-300/25 bg-red-500/10 px-4 py-3 text-center">
            <p className="text-red-200 text-sm">
              <span className="font-semibold">Error:</span> {error}
            </p>
          </div>
        )}
      </div>
    </form>
  );
}

function FieldWrap({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="block text-[11px] uppercase tracking-[0.22em] text-white/60 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
        clipRule="evenodd"
      />
    </svg>
  );
}
