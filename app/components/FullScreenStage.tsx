"use client";

import Image from "next/image";
import { cn } from "../lib/cn";

type Props = {
  bg?: string;
  videoSrc?: string;
  poster?: string;
  children: React.ReactNode;
  className?: string;

  /** 0–100 */
  overlayDarkness?: number;

  /** header clearance */
  safeTop?: number;

  /** footer clearance */
  safeBottom?: number;

  /** vertically center content */
  center?: boolean;

  /** e.g. "center 35%" */
  objectPosition?: string;

  /** use fixed background */
  parallax?: boolean;
};

export default function FullScreenStage({
  bg,
  videoSrc,
  poster,
  children,
  className,
  overlayDarkness = 18, // ↓ was 30; brighter, still readable
  safeTop = 110,
  safeBottom = 140,
  center = false,
  objectPosition = "center center",
  parallax = false,
}: Props) {
  return (
    <main className={cn("relative w-full min-h-screen text-white", className)}>
      {/* Background */}
      {parallax && bg && (
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundPosition: objectPosition,
          }}
          aria-hidden
        />
      )}

      {!parallax && (
        <div className="absolute inset-0 -z-20 pointer-events-none" aria-hidden>
          {videoSrc ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={poster}
              className="h-full w-full object-cover"
              style={{ objectPosition }}
            >
              <source src={videoSrc} />
            </video>
          ) : (
            bg && (
              <Image
                src={bg}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition }}
              />
            )
          )}
        </div>
      )}

      {/* Overlay (lighter + premium vignette) */}
      <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{ background: `rgba(0,0,0,${overlayDarkness / 100})` }}
        />
        {/* subtle vignette + top lift (makes it feel cleaner, not muddy) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8">
        <div style={{ height: safeTop }} aria-hidden />
        {center ? (
          <div
            className="flex flex-col justify-center"
            style={{
              minHeight: `calc(100vh - ${safeTop}px - ${safeBottom}px)`,
            }}
          >
            {children}
          </div>
        ) : (
          children
        )}
        <div style={{ height: safeBottom }} aria-hidden />
      </div>
    </main>
  );
}
