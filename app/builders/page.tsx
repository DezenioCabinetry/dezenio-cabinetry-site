"use client";

import { HardHat } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white text-center">
      <HardHat size={48} className="mb-4 text-gray-400" />
      <h1 className="text-3xl font-bold">Builders</h1>
      <p className="text-gray-400 mt-2">Partner program coming soon.</p>
    </div>
  );
}
