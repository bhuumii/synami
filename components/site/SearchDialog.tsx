"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Search, X, CornerDownLeft, Loader2 } from "lucide-react";
import { CategoryIcon } from "@/components/site/CategoryIcon";

type Segment = { _id: string; title: string; slug: string; icon?: string };
type Category = Segment & { segmentTitle: string; segmentSlug: string };
type Product = {
  _id: string;
  title: string;
  brandName?: string;
  slug: string;
  formulationType?: string;
  categoryTitle: string;
  categorySlug: string;
  segmentSlug: string;
};

type Index = { segments: Segment[]; categories: Category[]; products: Product[] };

type Hit = {
  id: string;
  href: string;
  /** What the row leads with */
  title: string;
  /** The line under it — empty for main categories, which have no parent */
  meta?: string;
  kind: "Product" | "Category" | "Range";
  icon?: string;
  rank: number;
};

/**
 * Site-wide search.
 *
 * Pulls a compact index once on first open, then filters in the browser.
 * No request per keystroke, so results appear as fast as you can type.
 *
 * Ranking puts exact prefix matches above mid-string ones, and products
 * above categories above ranges — someone typing a molecule name wants
 * the product, not the category it sits in.
 */
export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [index, setIndex] = useState<Index | null>(null);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  /* Fetch the index the first time the panel opens, never again. */
  useEffect(() => {
    if (!open || index || loading) return;
    setLoading(true);
    fetch("/api/search")
      .then((r) => r.json())
      .then((d: Index) => setIndex(d))
      .catch(() => setIndex({ segments: [], categories: [], products: [] }))
      .finally(() => setLoading(false));
  }, [open, index, loading]);

  useEffect(() => {
    if (open) {
      setQ("");
      setCursor(0);
      /* A frame's delay, or the input isn't mounted yet to focus. */
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
      return () => {
        cancelAnimationFrame(id);
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const hits = useMemo<Hit[]>(() => {
    const term = q.trim().toLowerCase();
    if (!index || term.length < 2) return [];

    const score = (text: string) => {
      const t = text.toLowerCase();
      if (t.startsWith(term)) return 0;
      const i = t.indexOf(term);
      return i === -1 ? -1 : 1 + i / 100;
    };

    const out: Hit[] = [];

    for (const p of index.products) {
      const s = Math.min(
        ...[p.title, p.brandName ?? "", p.formulationType ?? ""]
          .map(score)
          .filter((v) => v >= 0)
          .concat([99])
      );
      if (s < 99) {
        out.push({
          id: p._id,
          href: `/products/${p.segmentSlug}/${p.categorySlug}/${p.slug}`,
          title: p.brandName || p.title,
          meta: p.brandName
            ? `${p.title} · ${p.categoryTitle}`
            : p.categoryTitle,
          kind: "Product",
          rank: s,
        });
      }
    }

    for (const c of index.categories) {
      const s = score(c.title);
      if (s >= 0)
        out.push({
          id: c._id,
          href: `/products/${c.segmentSlug}/${c.slug}`,
          title: c.title,
          meta: c.segmentTitle,
          kind: "Category",
          icon: c.icon,
          rank: s + 0.5,
        });
    }

    for (const s0 of index.segments) {
      const s = score(s0.title);
      if (s >= 0)
        out.push({
          id: s0._id,
          href: `/products/${s0.slug}`,
          title: s0.title,
          kind: "Range",
          icon: s0.icon,
          rank: s + 1,
        });
    }

    return out.sort((a, b) => a.rank - b.rank).slice(0, 12);
  }, [q, index]);

  useEffect(() => setCursor(0), [q]);

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, hits.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter" && hits[cursor]) {
      e.preventDefault();
      go(hits[cursor].href);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  /* Keep the highlighted row in view when arrowing past the fold */
  useEffect(() => {
    listRef.current
      ?.querySelectorAll("li")
      [cursor]?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-forest/40 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[620px] overflow-hidden rounded-card border border-line bg-paper shadow-[var(--shadow-deep)]"
          >
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-line px-5">
              {loading ? (
                <Loader2 className="h-5 w-5 shrink-0 animate-spin text-leaf" />
              ) : (
                <Search className="h-5 w-5 shrink-0 text-leaf" />
              )}
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKey}
                placeholder="Search products, categories, ranges…"
                aria-label="Search"
                className="w-full bg-transparent py-5 text-base text-navy outline-none placeholder:text-slate"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="shrink-0 rounded-pill p-1.5 text-slate transition-colors hover:text-navy"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[52vh] overflow-y-auto">
              {q.trim().length < 2 ? (
                <p className="px-5 py-8 text-center text-sm text-slate">
                  Type at least two characters — a molecule, a brand name, or
                  a category.
                </p>
              ) : hits.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm text-stone">
                    Nothing matched &ldquo;{q.trim()}&rdquo;.
                  </p>
                  <button
                    type="button"
                    onClick={() => go("/contact")}
                    className="mt-3 font-display text-sm font-medium text-leaf underline underline-offset-4"
                  >
                    Ask us about it
                  </button>
                </div>
              ) : (
                <ul ref={listRef} className="py-2">
                  {hits.map((h, i) => (
                    <li key={h.id}>
                      <button
                        type="button"
                        onMouseEnter={() => setCursor(i)}
                        onClick={() => go(h.href)}
                        className={[
                          "flex w-full items-center gap-4 px-5 py-3 text-left transition-colors",
                          i === cursor ? "bg-field" : "bg-transparent",
                        ].join(" ")}
                      >
                        {h.icon ? (
                          <span className="group shrink-0">
                            <CategoryIcon name={h.icon} size={34} />
                          </span>
                        ) : (
                          <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-pill bg-field font-display text-[11px] font-semibold text-leaf">
                            {h.kind === "Product" ? "P" : "R"}
                          </span>
                        )}

                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-display font-semibold text-navy">
                            {h.title}
                          </span>
                          {h.meta ? (
                            <span className="mt-0.5 block truncate text-sm text-slate">
                              {h.meta}
                            </span>
                          ) : null}
                        </span>

                        <span className="shrink-0 rounded-pill border border-line px-2.5 py-0.5 font-display text-[11px] uppercase tracking-[0.1em] text-slate">
                          {h.kind}
                        </span>

                        {i === cursor ? (
                          <CornerDownLeft className="h-4 w-4 shrink-0 text-leaf" />
                        ) : null}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between border-t border-line bg-field px-5 py-3 text-xs text-slate">
              <span>↑ ↓ to move · Enter to open · Esc to close</span>
              {hits.length > 0 ? <span>{hits.length} results</span> : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
