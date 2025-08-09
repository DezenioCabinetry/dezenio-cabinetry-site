import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800 bg-black text-white mt-10">
      <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-neutral-400 flex flex-col md:flex-row justify-between gap-4">
        <p>
          © {new Date().getFullYear()} Dezenio Cabinetry · All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
