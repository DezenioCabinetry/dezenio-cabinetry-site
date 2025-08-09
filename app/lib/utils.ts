// lib/utils.tsx

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to conditionally combine Tailwind CSS classes.
 * Example:
 * cn("btn", isActive && "btn-active") → "btn btn-active"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
