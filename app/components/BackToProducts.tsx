"use client";

import Link from "next/link";

export default function BackToProducts() {
  const pill =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full " +
    "border border-white/20 bg-white/5 text-white/90 text-sm font-semibold " +
    "backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition";

  return (
    <div className="flex justify-center">
      <Link href="/products" className={pill}>
        <span aria-hidden>←</span>
        Back to Products
      </Link>
    </div>
  );
}
