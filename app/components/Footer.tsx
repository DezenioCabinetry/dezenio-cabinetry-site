"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="mt-16 bg-black/60 border-t border-white/10 text-white"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand / blurb */}
          <div>
            <div className="text-xl font-semibold">Dezenio Cabinetry</div>
            <p className="mt-3 text-white/80">
              Premium American‑made cabinetry and cost‑conscious RTA lines —
              designed, supplied, and installed with precision.
            </p>
          </div>

          {/* Contact */}
          <div>
            <div className="text-lg font-semibold">Contact</div>
            <ul className="mt-3 space-y-2 text-white/85">
              <li>
                <a href="tel:+16154742004" className="hover:text-white">
                  (615) 474‑2004
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@dezeniocabinetry.com"
                  className="hover:text-white"
                >
                  info@dezeniocabinetry.com
                </a>
              </li>
              <li>Nashville, TN</li>
              <li className="text-white/60">Mon–Fri · 9am–5pm</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-lg font-semibold">Quick Links</div>
            <ul className="mt-3 space-y-2 text-white/85">
              <li>
                <Link href="/products" className="hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-white">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/builders" className="hover:text-white">
                  Builders
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <div className="text-lg font-semibold">Follow</div>
            <div className="mt-3 flex items-center gap-3">
              <Social href="https://instagram.com" label="Instagram">
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path
                    fill="currentColor"
                    d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m5 5a5 5 0 1 0 0 10a5 5 0 0 0 0-10m6.5-.9a1.1 1.1 0 1 0 0 2.2a1.1 1.1 0 0 0 0-2.2M12 9a3 3 0 1 1 0 6a3 3 0 0 1 0-6Z"
                  />
                </svg>
              </Social>
              <Social href="https://facebook.com" label="Facebook">
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path
                    fill="currentColor"
                    d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2m1.25 10.5h1.875l.375-2.25h-2.25v-1.2c0-.9.3-1.5 1.5-1.5h.825V5.5c-.45-.06-1.2-.12-1.95-.12c-1.95 0-3.15 1.125-3.15 3.225v1.645H8.75v2.25H10.5V18h2.75z"
                  />
                </svg>
              </Social>
              <Social href="https://www.pinterest.com" label="Pinterest">
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path
                    fill="currentColor"
                    d="M12.04 2C6.58 2 3 5.66 3 10.02c0 3.04 1.71 4.76 2.7 4.76c.42 0 .66-1.16.66-1.49c0-.39-1-1.22-1-2.85c0-3.37 2.56-5.72 6.2-5.72c3 0 5.19 1.71 5.19 4.86c0 2.35-1.18 6.38-4.98 6.38c-1 0-1.86-.54-2.16-1.17c0 0-.51 2.03-.62 2.42c-.22.83-.81 1.87-1.2 2.5c.91.28 1.88.43 2.88.43c5.46 0 9.04-3.66 9.04-8.02C21.01 5.64 17.5 2 12.04 2"
                  />
                </svg>
              </Social>
              <Social href="https://www.houzz.com" label="Houzz">
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path fill="currentColor" d="M4 3v9l8-4.5V21l8-4.5V3z" />
                </svg>
              </Social>
              <Social href="https://youtube.com" label="YouTube">
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path
                    fill="currentColor"
                    d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3A2.7 2.7 0 0 0 2.4 7.2A28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8a2.7 2.7 0 0 0 1.9 1.9C6 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8M10 15V9l5 3z"
                  />
                </svg>
              </Social>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/70">
          <div>
            © {new Date().getFullYear()} Dezenio Cabinetry · All rights
            reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="p-2 rounded-full bg-white/8 border border-white/15 hover:bg-white/15 hover:border-white/25 transition"
      title={label}
    >
      <span className="text-white/90">{children}</span>
    </a>
  );
}
