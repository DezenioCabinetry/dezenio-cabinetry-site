// app/components/Glass.tsx
"use client";

import * as React from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Padding = "none" | "sm" | "md" | "lg";

type GlassProps<T extends React.ElementType = "div"> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
  padding?: Padding;
  interactive?: boolean;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function Glass<T extends React.ElementType = "div">({
  as,
  className,
  children,
  padding = "md",
  interactive = false,
  ...rest
}: GlassProps<T>) {
  const Comp = (as || "div") as React.ElementType;

  return (
    <Comp
      {...rest}
      className={cn(
        "glass rounded-3xl border border-white/12 bg-white/8 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,.35)]",
        padding === "none"
          ? "p-0"
          : padding === "sm"
            ? "p-4 md:p-6"
            : padding === "lg"
              ? "p-8 md:p-10"
              : "p-6 md:p-8",
        interactive &&
          "transition-transform duration-150 will-change-transform hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
