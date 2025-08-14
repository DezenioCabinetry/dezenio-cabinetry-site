"use client";

import Header from "./components/Header";
import Hero from "./components/Hero";

export default function HomePage() {
  return (
    <main className="relative bg-black text-white overflow-x-hidden">
      <Header />
      <Hero />

      {/* 👇 Spacer to prevent footer clash with fixed hero text */}
      <div className="h-[100vh] md:h-[75vh] lg:h-[60vh]" />

      {/* Add any real sections here later if needed */}
    </main>
  );
}
