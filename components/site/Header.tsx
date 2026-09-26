"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { mainNav, productMenu, capabilitiesMenu } from "@/lib/navigation";

/**
 * Sticky pill header.
 *
 * Over the hero it is translucent with a blur, so the video reads through it.
 * After ~40px of scroll it becomes solid white with a hairline and a soft
 * shadow, and the pill tightens slightly. That shift is the only thing that
 * animates on scroll in the chrome.
 *
 * Why top-anchored rather than the reference site's bottom-floating bar:
 * a bottom bar overlaps body copy on desktop and sits in the thumb zone on
 * mobile. Same pill shape, none of the collision.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Solid state after a short scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Any navigation closes everything
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  // Escape closes the open dropdown — keyboard users need a way out
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

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /**
   * A short delay before closing on mouse-out. Without it, the gap between
   * the trigger and the panel closes the menu as the cursor travels down.
   */
  const open = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(name);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  const dark = scrolled || openMenu !== null;

  return (
    <header className="fixed inset-x-0 top-0 z-50" onMouseLeave={scheduleClose}>
      <Container className="pt-4 md:pt-5">
        <div
          className={cn(
            "flex items-center justify-between rounded-pill pl-4 pr-3 transition-all duration-300",
            dark
              ? "border border-line bg-white/95 py-2 shadow-[0_4px_24px_rgb(13_28_64/0.08)] backdrop-blur-md"
              : "border border-white/25 bg-white/10 py-2.5 backdrop-blur-md"
          )}
        >
          {/* Logo */}
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

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => {
              const hasMenu = "menu" in item && item.menu;
              const isOpen = hasMenu && openMenu === item.menu;
              const active = pathname === item.href;

              const base = cn(
                "relative rounded-pill px-4 py-2 font-display text-sm font-medium transition-colors",
                dark ? "text-navy hover:text-leaf" : "text-white/90 hover:text-white",
                active && (dark ? "text-leaf" : "text-white")
              );

              if (!hasMenu) {
                return (
                  <Link key={item.title} href={item.href} className={base}>
                    {item.title}
                  </Link>
                );
              }

              return (
                <button
                  key={item.title}
                  type="button"
                  className={cn(base, "inline-flex items-center gap-1")}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onMouseEnter={() => open(item.menu!)}
                  onFocus={() => open(item.menu!)}
                  onClick={() => setOpenMenu(isOpen ? null : item.menu!)}
                >
                  {item.title}
                  <ChevronDown
                    className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")}
                  />
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className={cn(
              "ml-2 hidden rounded-pill px-5 py-2.5 font-display text-sm font-medium transition-colors lg:inline-flex",
              dark ? "bg-leaf text-white hover:bg-leaf-deep" : "bg-white text-navy hover:bg-field"
            )}
          >
            Send enquiry
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            className={cn("rounded-pill p-2.5 lg:hidden", dark ? "text-navy" : "text-white")}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* ---------------- Mega menu ---------------- */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-x-0 top-full hidden lg:block"
            onMouseEnter={() => open(openMenu)}
          >
            <Container className="pt-2">
              <div className="overflow-hidden rounded-card border border-line bg-white shadow-[0_18px_50px_rgb(13_28_64/0.12)]">
                {openMenu === "products" ? (
                  <div className="grid grid-cols-4 divide-x divide-line">
                    {productMenu.map((col) => (
                      <div key={col.title} className="p-7">
                        <Link
                          href={col.href}
                          className="font-display text-sm font-semibold text-navy hover:text-leaf"
                        >
                          {col.title}
                        </Link>
                        <ul className="mt-4 space-y-2.5">
                          {col.items.map((sub) => (
                            <li key={sub.title}>
                              <Link
                                href={sub.href}
                                className="text-sm text-stone transition-colors hover:text-leaf"
                              >
                                {sub.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-4 divide-x divide-line">
                    {capabilitiesMenu.map((item) => (
                      <Link key={item.title} href={item.href} className="group p-7">
                        <span className="font-display text-sm font-semibold text-navy transition-colors group-hover:text-leaf">
                          {item.title}
                        </span>
                        <p className="mt-2 text-sm text-slate">{item.blurb}</p>
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
            className="fixed inset-0 top-0 z-40 overflow-y-auto bg-white pt-24 lg:hidden"
          >
            <Container className="pb-16">
              <nav className="divide-y divide-line">
                {mainNav
                  .filter((i) => !("menu" in i && i.menu))
                  .map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="block py-4 font-display text-xl text-navy"
                    >
                      {item.title}
                    </Link>
                  ))}
              </nav>

              <div className="mt-8">
                <p className="font-display text-xs uppercase tracking-[0.18em] text-slate">
                  Products
                </p>
                {productMenu.map((col) => (
                  <div key={col.title} className="mt-6">
                    <Link href={col.href} className="font-display font-semibold text-navy">
                      {col.title}
                    </Link>
                    <ul className="mt-3 space-y-2.5 border-l border-line pl-4">
                      {col.items.map((sub) => (
                        <li key={sub.title}>
                          <Link href={sub.href} className="text-stone">
                            {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <p className="font-display text-xs uppercase tracking-[0.18em] text-slate">
                  Insights
                </p>
                <ul className="mt-4 space-y-3">
                  {capabilitiesMenu.map((item) => (
                    <li key={item.title}>
                      <Link href={item.href} className="text-navy">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contact"
                className="mt-10 inline-flex w-full items-center justify-center rounded-pill bg-leaf px-6 py-4 font-display font-medium text-white"
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
