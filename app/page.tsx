"use client";

import Header from "./components/Header";
import Hero from "./components/Hero";

export default function HomePage() {
  return (
    <main className="relative bg-black text-white overflow-x-hidden">
      <Header />
      <Hero />
      {/* No spacer needed — the Hero computes the exact landing space. */}
    </main>
  );
}
