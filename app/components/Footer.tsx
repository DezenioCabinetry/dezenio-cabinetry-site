"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="bg-[#070708] border-t border-white/10 text-white"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand / blurb */}
          <div>
            <div className="text-xl font-semibold">Dezenio Cabinetry</div>

            <div className="mt-1 text-[11px] tracking-[0.22em] uppercase text-white/60">
              A division of Dezenio Draft Design, Inc.
            </div>

            <p className="mt-3 text-white/80">
              Premium American-made cabinetry and cost-conscious RTA lines —
              designed, supplied, and installed with precision.
            </p>

            <p className="mt-3 text-white/70 text-sm">
              Serving Middle TN — Nashville &amp; surrounding areas.
            </p>

            <a
              href="https://dezeniodraftdesign.com"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-white/80 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white/40 transition text-sm"
            >
              Visit our parent company: Dezenio Draft Design, Inc.
            </a>
          </div>

          {/* Contact */}
          <div>
            <div className="text-lg font-semibold">Contact</div>
            <ul className="mt-3 space-y-2 text-white/85">
              <li>
                <a href="tel:+16154742004" className="hover:text-white">
                  (615) 474-2004
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
                <Link href="/products#brands" className="hover:text-white">
                  Brands
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
            <div className="mt-3 flex items-center gap-3 flex-wrap">
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

              <Social href="https://tiktok.com" label="TikTok">
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path
                    fill="currentColor"
                    d="M16.5 2c.4 2.7 1.9 4.3 4.5 4.6v3.1c-1.6.1-3.1-.4-4.5-1.3v7.1c0 4-3.3 6.9-7.4 6.2c-2.8-.5-5-2.9-5.1-5.7c-.2-3.6 2.8-6.6 6.4-6.4v3.4c-.2 0-.4 0-.6.1c-1.4.3-2.4 1.6-2.3 3.1c.1 1.7 1.7 2.9 3.4 2.5c1.3-.3 2.2-1.4 2.2-2.8V2h3.4Z"
                  />
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

            <div className="mt-4 text-xs text-white/55">
              Follow for projects, lines, installs, and behind-the-scenes work.
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
      className="p-2 rounded-full bg-white/7 border border-white/12 hover:bg-white/12 hover:border-white/22 transition"
      title={label}
    >
      <span className="text-white/90">{children}</span>
    </a>
  );
}
