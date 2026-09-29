"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ChevronDown, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import type { NavSegment } from "@/lib/nav-types";

export type CapabilityLink = {
  _id: string;
  title: string;
  slug: string;
  menuBlurb?: string;
};

export function Header({
  segments,
  capabilities,
}: {
  segments: NavSegment[];
  capabilities: CapabilityLink[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  /** Which top-level drawer row is expanded: "products" | "insights" | null */
  const [drawerOpen, setDrawerOpen] = useState<string | null>(null);
  /** Which main category inside Products is expanded */
  const [openSegment, setOpenSegment] = useState<string | null>(null);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setDrawerOpen(null);
    setOpenSegment(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const open = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(name);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  const dark = scrolled || openMenu !== null;

  const nav: { title: string; href: string; menu: string | null }[] = [
    { title: "Home", href: "/", menu: null },
    { title: "About Us", href: "/about", menu: null },
    { title: "Products", href: "/products", menu: "products" },
    { title: "Insights", href: "/capabilities", menu: "capabilities" },
    { title: "Careers", href: "/careers", menu: null },
    { title: "Contact Us", href: "/contact", menu: null },
  ];

  const gridCols = (n: number) =>
    n >= 4 ? "grid-cols-4" : n === 3 ? "grid-cols-3" : n === 2 ? "grid-cols-2" : "grid-cols-1";

  /** Shared row style for the drawer's top level. Products and Insights
      look identical to Home and About Us — they just carry a chevron. */
  const drawerRow =
    "flex w-full items-center justify-between py-4 text-left font-display text-xl text-navy";

  return (
    <header className="fixed inset-x-0 top-0 z-50" onMouseLeave={scheduleClose}>
      <Container className="pt-4 md:pt-5">
        <div
          className={cn(
            "flex items-center justify-between rounded-pill pl-4 pr-3 transition-all duration-300",
            dark
              ? "border border-line bg-white/95 py-2 shadow-[var(--shadow-rest)] backdrop-blur-md"
              : "border border-white/25 bg-white/10 py-2.5 backdrop-blur-md"
          )}
        >
          <Link
            href="/"
            className={cn(
              "flex items-center rounded-pill py-1 transition-all",
              !dark && "bg-white px-3 py-1.5"
            )}
            aria-label="Synami Agriscience, home"
          >
            <Image
              src="/logo.jpg"
              alt="Synami Agriscience"
              width={600}
              height={228}
              priority
              className="h-8 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex">
            {nav.map((item) => {
              const isOpen = item.menu !== null && openMenu === item.menu;
              const active = pathname === item.href;

              const base = cn(
                "relative rounded-pill px-3.5 py-2 font-display text-sm font-medium transition-colors",
                dark ? "text-navy hover:text-leaf" : "text-white/90 hover:text-white",
                active && (dark ? "text-leaf" : "text-white")
              );

              if (item.menu === null) {
                return (
                  <Link key={item.title} href={item.href} className={base}>
                    {item.title}
                  </Link>
                );
              }

              if (item.menu === "products" && segments.length === 0) return null;
              if (item.menu === "capabilities" && capabilities.length === 0) return null;

              return (
                <button
                  key={item.title}
                  type="button"
                  className={cn(base, "inline-flex items-center gap-1")}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onMouseEnter={() => open(item.menu as string)}
                  onFocus={() => open(item.menu as string)}
                  onClick={() => setOpenMenu(isOpen ? null : (item.menu as string))}
                >
                  {item.title}
                  <ChevronDown
                    className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")}
                  />
                </button>
              );
            })}
          </nav>

          <Link
            href="/contact"
            className={cn(
              "ml-2 hidden rounded-pill px-5 py-2.5 font-display text-sm font-medium transition-all duration-300 xl:inline-flex",
              dark ? "bg-leaf text-white hover:bg-leaf-deep" : "bg-white text-forest hover:bg-field"
            )}
          >
            Send enquiry
          </Link>

          <button
            type="button"
            className={cn("rounded-pill p-2.5 xl:hidden", dark ? "text-navy" : "text-white")}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* ---------------- Desktop mega menu ---------------- */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-x-0 top-full hidden xl:block"
            onMouseEnter={() => open(openMenu)}
          >
            <Container className="pt-2">
              <div className="overflow-hidden rounded-card border border-line bg-white shadow-[var(--shadow-deep)]">
                {openMenu === "products" ? (
                  <div className={cn("grid divide-x divide-line", gridCols(segments.length))}>
                    {segments.map((seg) => (
                      <div key={seg._id} className="p-7">
                        <Link
                          href={`/products/${seg.slug}`}
                          className="link-wipe inline-block font-display text-sm font-semibold text-navy hover:text-leaf"
                        >
                          {seg.title}
                        </Link>
                        {seg.categories.length > 0 ? (
                          <ul className="mt-4 space-y-2.5">
                            {seg.categories.map((cat) => (
                              <li key={cat._id}>
                                <Link
                                  href={`/products/${seg.slug}/${cat.slug}`}
                                  className="text-sm text-stone transition-colors hover:text-leaf"
                                >
                                  {cat.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-4 text-sm text-slate">Coming soon</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={cn("grid divide-x divide-line", gridCols(capabilities.length))}>
                    {capabilities.map((item) => (
                      <Link key={item._id} href={`/capabilities/${item.slug}`} className="group p-7">
                        <span className="font-display text-sm font-semibold text-navy transition-colors group-hover:text-leaf">
                          {item.title}
                        </span>
                        {item.menuBlurb ? (
                          <p className="mt-2 text-sm text-slate">{item.menuBlurb}</p>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- Mobile drawer ---------------- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-white xl:hidden"
          >
            {/* The drawer owns its own bar, so there is always a visible way
                out. Previously the only close button was in the header
                underneath, which was easy to miss. */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-white/95 px-6 py-4 backdrop-blur">
              {drawerOpen ? (
                <button
                  type="button"
                  onClick={() => {
                    setDrawerOpen(null);
                    setOpenSegment(null);
                  }}
                  className="inline-flex items-center gap-2 font-display text-sm font-medium text-leaf"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <Link href="/" className="flex items-center">
                  <Image
                    src="/logo.jpg"
                    alt="Synami Agriscience"
                    width={600}
                    height={228}
                    className="h-7 w-auto"
                  />
                </Link>
              )}

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="rounded-pill p-2 text-navy"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <Container className="pb-20 pt-4">
              <nav className="divide-y divide-line">
                {nav.map((item) => {
                  /* Plain links */
                  if (item.menu === null) {
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="block py-4 font-display text-xl text-navy"
                      >
                        {item.title}
                      </Link>
                    );
                  }

                  if (item.menu === "products" && segments.length === 0) return null;
                  if (item.menu === "capabilities" && capabilities.length === 0) return null;

                  const isProducts = item.menu === "products";
                  const expanded = drawerOpen === item.menu;

                  return (
                    <div key={item.title}>
                      {/* Same size and weight as the plain links — only the
                          chevron distinguishes them. */}
                      <button
                        type="button"
                        className={drawerRow}
                        aria-expanded={expanded}
                        onClick={() => {
                          setDrawerOpen(expanded ? null : (item.menu as string));
                          setOpenSegment(null);
                        }}
                      >
                        {item.title}
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 text-leaf transition-transform duration-300",
                            expanded && "rotate-180"
                          )}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4 pl-1">
                              {isProducts ? (
                                <>
                                  <Link
                                    href="/products"
                                    className="block py-2 text-sm font-medium text-leaf"
                                  >
                                    All products
                                  </Link>

                                  {segments.map((seg) => {
                                    const segOpen = openSegment === seg._id;
                                    return (
                                      <div
                                        key={seg._id}
                                        className="border-t border-line/70 first:border-t-0"
                                      >
                                        <div className="flex items-center justify-between">
                                          <Link
                                            href={`/products/${seg.slug}`}
                                            className="flex-1 py-3 font-display text-base font-semibold text-navy"
                                          >
                                            {seg.title}
                                          </Link>

                                          {seg.categories.length > 0 && (
                                            <button
                                              type="button"
                                              aria-label={`Show ${seg.title} categories`}
                                              aria-expanded={segOpen}
                                              onClick={() =>
                                                setOpenSegment(segOpen ? null : seg._id)
                                              }
                                              className="p-2 text-leaf"
                                            >
                                              <ChevronDown
                                                className={cn(
                                                  "h-4 w-4 transition-transform duration-300",
                                                  segOpen && "rotate-180"
                                                )}
                                              />
                                            </button>
                                          )}
                                        </div>

                                        <AnimatePresence initial={false}>
                                          {segOpen && seg.categories.length > 0 && (
                                            <motion.ul
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: "auto", opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              transition={{
                                                duration: 0.25,
                                                ease: [0.22, 1, 0.36, 1],
                                              }}
                                              className="overflow-hidden border-l-2 border-leaf/20 pl-4"
                                            >
                                              {seg.categories.map((cat) => (
                                                <li key={cat._id}>
                                                  <Link
                                                    href={`/products/${seg.slug}/${cat.slug}`}
                                                    className="block py-2.5 text-sm text-stone"
                                                  >
                                                    {cat.title}
                                                  </Link>
                                                </li>
                                              ))}
                                              <li className="h-2" />
                                            </motion.ul>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    );
                                  })}
                                </>
                              ) : (
                                <ul className="border-l-2 border-leaf/20 pl-4">
                                  {capabilities.map((c) => (
                                    <li key={c._id}>
                                      <Link
                                        href={`/capabilities/${c.slug}`}
                                        className="block py-2.5 text-sm text-stone"
                                      >
                                        {c.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>

              <Link
                href="/contact"
                className="mt-8 inline-flex w-full items-center justify-center rounded-pill bg-leaf px-6 py-4 font-display font-medium text-white"
              >
                Send enquiry
              </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
