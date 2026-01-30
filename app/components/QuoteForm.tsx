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

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6"
      noValidate
      style={{ maxWidth: 980, margin: "0 auto" }}
    >
      <input
        type="text"
        name="honeypot"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Contact */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <FieldWrap className="md:col-span-5" label="Full Name">
          <input
            name="name"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-white/15 bg-black/35 text-white placeholder-white/55 focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Jane Doe"
            autoComplete="name"
          />
        </FieldWrap>

        <FieldWrap className="md:col-span-5" label="Email">
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-white/15 bg-black/35 text-white placeholder-white/55 focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </FieldWrap>

        <FieldWrap className="md:col-span-2" label="Phone">
          <input
            name="phone"
            className="w-full px-4 py-2.5 rounded-lg border border-white/15 bg-black/35 text-white placeholder-white/55 focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="(615)"
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
          className="w-full px-4 py-2.5 rounded-lg border border-white/15 bg-black/35 text-white placeholder-white/55 focus:outline-none focus:ring-2 focus:ring-white/30"
          placeholder="1234 Oak St, Nashville, TN"
          autoComplete="street-address"
        />
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
          <select
            name="projectType"
            className="w-full px-4 py-2.5 rounded-lg border border-white/15 bg-black/35 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            defaultValue="Kitchen"
          >
            <option>Kitchen</option>
            <option>Bathroom</option>
            <option>Laundry</option>
            <option>Closet</option>
            <option>Other</option>
          </select>
        </FieldWrap>

        <FieldWrap className="md:col-span-4" label="Desired Start">
          <input
            type="date"
            name="startDate"
            className="w-full px-4 py-2.5 rounded-lg border border-white/15 bg-black/35 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </FieldWrap>

        <FieldWrap className="md:col-span-4" label="Budget Range">
          <select
            name="budget"
            className="w-full px-4 py-2.5 rounded-lg border border-white/15 bg-black/35 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            defaultValue="10–25k"
          >
            <option value="<10k">&lt; $10k</option>
            <option value="10–25k">$10–25k</option>
            <option value="25–50k">$25–50k</option>
            <option value="50k+">$50k+</option>
          </select>
        </FieldWrap>
      </div>

      <FieldWrap label="How did you hear about us?">
        <select
          name="source"
          className="w-full px-4 py-2.5 rounded-lg border border-white/15 bg-black/35 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
          defaultValue="Referral"
        >
          <option>Referral</option>
          <option>Google</option>
          <option>Instagram</option>
          <option>Homeowner Group</option>
          <option>Builder/Contractor</option>
          <option>Other</option>
        </select>
      </FieldWrap>

      <FieldWrap label="Project Details">
        <textarea
          name="message"
          required
          rows={6}
          className="w-full px-4 py-2.5 rounded-lg border border-white/15 bg-black/35 text-white placeholder-white/55 focus:outline-none focus:ring-2 focus:ring-white/30"
          placeholder="Layout info, measurements, door style, finishes, timeline…"
        />
      </FieldWrap>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-xl bg-white text-black px-6 py-3.5 font-semibold hover:bg-gray-100 transition disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit Quote Request"}
      </button>

      {status === "error" && (
        <p className="text-red-300 text-center text-sm">Error: {error}</p>
      )}
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
      <label className="block text-xs font-medium tracking-wide text-white/75 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
