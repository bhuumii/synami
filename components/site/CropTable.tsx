"use client";

import { motion } from "motion/react";

export type CropRow = { crop?: string; target?: string; dosage?: string };

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Crop recommendations.
 *
 * Two renderings rather than one responsive table. A real <table> squeezed
 * onto a 360px screen either scrolls sideways or crushes the pest column
 * into one word per line — both unreadable. Below md each row becomes a
 * labelled card instead.
 *
 * The desktop table keeps semantic <table> markup so screen readers and
 * Google still read it as tabular data.
 */
export function CropTable({ rows }: { rows: CropRow[] }) {
  if (!rows?.length) return null;

  return (
    <>
      {/* ---------- Desktop ---------- */}
      <div className="hidden overflow-hidden rounded-card border border-line md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-forest text-white">
              <th className="px-6 py-4 font-display text-xs font-semibold uppercase tracking-[0.14em]">
                Crop
              </th>
              <th className="px-6 py-4 font-display text-xs font-semibold uppercase tracking-[0.14em]">
                Target pest / disease
              </th>
              <th className="px-6 py-4 text-right font-display text-xs font-semibold uppercase tracking-[0.14em]">
                Dosage
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <motion.tr
                key={r.crop ?? i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
                className="border-t border-line bg-paper transition-colors duration-200 hover:bg-field"
              >
                <td className="px-6 py-5 align-top font-display font-semibold text-navy">
                  {r.crop}
                </td>
                <td className="px-6 py-5 align-top text-[15px] text-stone">
                  {r.target}
                </td>
                <td className="whitespace-nowrap px-6 py-5 text-right align-top font-display text-[15px] font-medium text-leaf">
                  {r.dosage}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Mobile ---------- */}
      <div className="space-y-4 md:hidden">
        {rows.map((r, i) => (
          <motion.div
            key={r.crop ?? i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
            className="overflow-hidden rounded-card border border-line bg-paper"
          >
            <div className="flex items-center justify-between gap-4 bg-forest px-5 py-3">
              <span className="font-display font-semibold text-white">{r.crop}</span>
              {r.dosage ? (
                <span className="whitespace-nowrap rounded-pill bg-white/15 px-3 py-1 font-display text-sm text-white">
                  {r.dosage}
                </span>
              ) : null}
            </div>
            {r.target ? (
              <div className="px-5 py-4">
                <p className="font-display text-xs uppercase tracking-[0.14em] text-slate">
                  Target pest / disease
                </p>
                <p className="mt-1.5 text-[15px] text-stone">{r.target}</p>
              </div>
            ) : null}
          </motion.div>
        ))}
      </div>
    </>
  );
}
