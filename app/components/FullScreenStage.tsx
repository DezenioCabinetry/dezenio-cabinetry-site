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
  overlayDarkness = 18,
  safeTop = 110,
  safeBottom = 140,
  center = false,
  objectPosition = "center center",
  parallax = false,
}: Props) {
  const hasVideo = Boolean(videoSrc);
  const hasBg = Boolean(bg);

  return (
    <main className={cn("relative w-full min-h-screen text-white", className)}>
      {/* Background (parallax image) */}
      {parallax && hasBg && !hasVideo && (
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundPosition: objectPosition,
          }}
          aria-hidden
        />
      )}

      {/* Background (non-parallax video or image) */}
      {(!parallax || hasVideo) && (
        <div className="absolute inset-0 -z-20 pointer-events-none" aria-hidden>
          {hasVideo ? (
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
            hasBg && (
              <Image
                src={bg!}
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

      {/* Overlay (consistent “premium” stack) */}
      <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
        {/* base darkness */}
        <div
          className="absolute inset-0"
          style={{ background: `rgba(0,0,0,${overlayDarkness / 100})` }}
        />

        {/* top lift -> keeps header glass from feeling muddy */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45" />

        {/* subtle center glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_55%)]" />

        {/* vignette corners */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55))]" />
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
