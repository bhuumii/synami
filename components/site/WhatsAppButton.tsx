"use client";

import { motion } from "motion/react";

/**
 * Floating WhatsApp button.
 *
 * Fixed to the bottom-right on every page. Sits at z-40 — below the
 * header (z-50) and the mobile drawer (z-60), so it never floats over an
 * open menu.
 *
 * On desktop it expands to show a label on hover. On mobile it stays a
 * circle, because a wide pill in the bottom corner covers content and
 * sits in the thumb zone.
 *
 * Renders nothing when no number is set in Sanity, so the site can ship
 * before the client has decided which number to use.
 */
export function WhatsAppButton({
  number,
  message,
}: {
  number?: string;
  message?: string;
}) {
  if (!number) return null;

  /* wa.me wants digits only — no +, spaces, dashes or brackets. */
  const digits = number.replace(/\D/g, "");
  if (digits.length < 8) return null;

  const href = message
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${digits}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 overflow-hidden rounded-pill bg-[#128C4A] py-3.5 pl-3.5 pr-3.5 text-white shadow-[0_6px_24px_rgb(18_61_40/0.28)] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_10px_32px_rgb(18_61_40/0.38)] md:bottom-7 md:right-7 md:hover:gap-2.5 md:hover:pr-6"
    >
      {/* Slow pulse so it's noticed without demanding attention */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 animate-ping rounded-pill bg-[#128C4A]/40 [animation-duration:2.8s]"
      />

      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className="h-6 w-6 shrink-0"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.945c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.587 0 11.946-5.359 11.949-11.945a11.82 11.82 0 0 0-3.431-8.401" />
      </svg>

      <span className="hidden whitespace-nowrap font-display text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:inline md:max-w-0 md:group-hover:max-w-[140px]">
        Chat with us
      </span>
    </motion.a>
  );
}
