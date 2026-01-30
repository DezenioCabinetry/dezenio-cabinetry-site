"use client";

import Link from "next/link";

export default function BackToProducts() {
  return (
    <div className="flex justify-center">
      <Link
        href="/products"
        className="chip chip-lg inline-flex items-center gap-2"
      >
        <span aria-hidden>←</span>
        Back to Products
      </Link>
    </div>
  );
}
