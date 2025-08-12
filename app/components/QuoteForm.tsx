"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const SearchBox = dynamic(
  () =>
    import("@mapbox/search-js-react").then((m) => ({
      default: m.SearchBox,
    })),
  { ssr: false }
);

type Status = "idle" | "sending" | "sent" | "error";

type RetrieveEvent = {
  features?: Array<{
    geometry?: { coordinates?: [number, number] };
    place_name?: string;
    properties?: {
      full_address?: string;
      address?: string;
      context?: {
        place?: { name?: string };
        region?: { name?: string };
        postcode?: { name?: string };
        country?: { name?: string };
      };
    };
  }>;
};

export default function QuoteForm() {
  const router = useRouter(); // 👈 add
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const addressInputRef = useRef<HTMLInputElement | null>(null);

  const setHidden = (name: string, val: string) => {
    const el = document.querySelector<HTMLInputElement>(
      `input[name="${name}"]`
    );
    if (el) el.value = val;
  };

  function handleRetrieve(e: RetrieveEvent) {
    const place = e?.features?.[0];
    if (!place) return;
    const full =
      place.properties?.full_address ||
      place.place_name ||
      place.properties?.address ||
      "";
    const coords = place.geometry?.coordinates ?? [];
    if (addressInputRef.current) addressInputRef.current.value = full;

    setHidden("addressLine1", place.properties?.address || "");
    setHidden("placeCity", place.properties?.context?.place?.name || "");
    setHidden("placeRegion", place.properties?.context?.region?.name || "");
    setHidden("placePostcode", place.properties?.context?.postcode?.name || "");
    setHidden("placeCountry", place.properties?.context?.country?.name || "");
    setHidden("lat", String(coords[1] ?? ""));
    setHidden("lng", String(coords[0] ?? ""));
  }

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

      // ✅ redirect to thank-you
      router.push("/thank-you");
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <input
        type="text"
        name="honeypot"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            name="name"
            required
            className="w-full px-4 py-2 rounded border border-white/20 bg-black/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-2 rounded border border-white/20 bg-black/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Phone (optional)
          </label>
          <input
            name="phone"
            className="w-full px-4 py-2 rounded border border-white/20 bg-black/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
            placeholder="(615) 555-1234"
          />
        </div>
      </div>

      {/* Address with autocomplete */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Project Address
        </label>
        <SearchBox
          accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string}
          options={{ language: "en", country: "US" }}
          onRetrieve={handleRetrieve}
          className="mb-2"
        />
        <input
          ref={addressInputRef}
          name="address"
          required
          className="w-full px-4 py-2 rounded border border-white/20 bg-black/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
          placeholder="1234 Oak St, Nashville, TN"
        />
        {/* Hidden structured fields */}
        <input type="hidden" name="addressLine1" />
        <input type="hidden" name="placeCity" />
        <input type="hidden" name="placeRegion" />
        <input type="hidden" name="placePostcode" />
        <input type="hidden" name="placeCountry" />
        <input type="hidden" name="lat" />
        <input type="hidden" name="lng" />
      </div>

      {/* Project basics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Project Type</label>
          <select
            name="projectType"
            className="w-full px-4 py-2 rounded border border-white/20 bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
            defaultValue="Kitchen"
          >
            <option>Kitchen</option>
            <option>Bathroom</option>
            <option>Laundry</option>
            <option>Closet</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Desired Start
          </label>
          <input
            type="date"
            name="startDate"
            className="w-full px-4 py-2 rounded border border-white/20 bg-black/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Budget Range</label>
          <select
            name="budget"
            className="w-full px-4 py-2 rounded border border-white/20 bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
            defaultValue="10–25k"
          >
            <option value="<10k">&lt; $10k</option>
            <option value="10–25k">$10–25k</option>
            <option value="25–50k">$25–50k</option>
            <option value="50k+">$50k+</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          How did you hear about us?
        </label>
        <select
          name="source"
          className="w-full px-4 py-2 rounded border border-white/20 bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
          defaultValue="Referral"
        >
          <option>Referral</option>
          <option>Google</option>
          <option>Instagram</option>
          <option>Homeowner Group</option>
          <option>Builder/Contractor</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Project Details
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full px-4 py-2 rounded border border-white/20 bg-black/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
          placeholder="Layout info, measurements, door style, finishes, timeline…"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
      >
        {status === "sending" ? "Sending…" : "Submit Quote Request"}
      </button>

      {/* inline fallback if you decide not to redirect someday */}
      {status === "sent" && (
        <p className="text-green-400 text-center">
          Thanks! We’ll follow up shortly.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-center">Error: {error}</p>
      )}
    </form>
  );
}
