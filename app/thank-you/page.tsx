// app/thank-you/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Thank You | Dezenio Cabinetry",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="relative min-h-screen text-white">
      <div className="fixed inset-0 -z-10 bg-black/70" />
      <section className="mx-auto max-w-2xl px-6 py-28 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Thanks! We got your request.
        </h1>
        <p className="text-gray-300">
          We’ll reach out from <strong>info@dezeniocabinetry.com</strong>{" "}
          shortly.
        </p>
        <Link href="/" className="inline-block mt-8 underline">
          Back to Home
        </Link>
      </section>
    </main>
  );
}
