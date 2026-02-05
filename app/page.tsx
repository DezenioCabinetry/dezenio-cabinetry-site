"use client";

import Hero from "./components/Hero";

export default function HomePage() {
  return (
    <main className="relative bg-black text-white overflow-x-hidden">
      <Hero />
      {/* No spacer needed — the Hero computes the exact landing space. */}
    </main>
  );
}
