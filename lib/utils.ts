import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind classes safely.
 * Later classes win over earlier ones, so a component's default
 * `px-6` can be overridden by passing `className="px-10"`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
