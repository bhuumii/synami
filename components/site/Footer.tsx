"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, ArrowUp } from "lucide-react";
import {
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";
import { Container } from "@/components/ui/Container";
import type { NavSegment } from "@/lib/nav-types";
import type { CapabilityLink } from "@/components/site/Header";

type Settings = {
  generalEmail?: string;
  salesEmail?: string;
  exportEmail?: string;
  phone?: string;
  phoneAlt?: string;
  address?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  footerTagline?: string;
};

/** Matches the Header's fixed About menu. */
const ABOUT_LINKS = [
  { href: "/about", title: "About Synami" },
  { href: "/about/vision-mission", title: "Vision & Mission" },
  { href: "/about/core-values", title: "Core Values" },
  { href: "/about/founders-message", title: "Founder's Message" },
];

const COMPANY_LINKS = [
  { href: "/careers", title: "Careers" },
  { href: "/contact", title: "Contact Us" },
];

/** Column heading: rule plus a dot, borrowed from the reference footer. */
function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-base font-semibold text-navy">
      {children}
      <span aria-hidden className="mt-3 flex items-center gap-1.5">
        <span className="h-[2px] w-9 bg-leaf" />
        <span className="h-[5px] w-[5px] rounded-pill bg-leaf/50" />
      </span>
    </h3>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="link-wipe inline-block text-[15px] leading-snug text-stone transition-colors duration-200 hover:text-leaf"
    >
      {children}
    </Link>
  );
}

/**
 * Footer.
 *
 * Runs to a wider container than the rest of the site — 1460px rather
 * than 1240px. A footer is a directory, not prose: the extra width lets
 * the address sit in three lines instead of nine, and stops five columns
 * squeezing into the middle of a large screen.
 *
 * Brand block on the left, four link columns, contact on the right.
 */
export function Footer({
  segments,
  capabilities,
  settings,
}: {
  segments: NavSegment[];
  capabilities: CapabilityLink[];
  settings?: Settings;
}) {
  const year = new Date().getFullYear();

  const socials = [
    { icon: LinkedinIcon, href: settings?.linkedin, label: "LinkedIn" },
    { icon: FacebookIcon, href: settings?.facebook, label: "Facebook" },
    { icon: InstagramIcon, href: settings?.instagram, label: "Instagram" },
    { icon: YoutubeIcon, href: settings?.youtube, label: "YouTube" },
  ].filter((s) => !!s.href);

  const emails = [
    { label: "General", value: settings?.generalEmail },
    { label: "Sales", value: settings?.salesEmail },
    { label: "Export", value: settings?.exportEmail },
  ].filter((e) => !!e.value);

  const phones = [settings?.phone, settings?.phoneAlt].filter(Boolean) as string[];

  return (
    <footer className="relative overflow-hidden bg-sage-deep text-stone">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-pill bg-leaf/[0.07] blur-3xl"
      />

     <Container className="relative max-w-[1460px]">
  <div className="grid gap-x-8 gap-y-12 py-16 sm:grid-cols-2 lg:grid-cols-[2fr_1.2fr_1fr_0.8fr_1.2fr] lg:gap-x-10 lg:py-20">
    {/* ---------- Brand ---------- */}
    <div className="sm:col-span-2 lg:col-span-1">
      <Image
        src="/logo-tagline.png"
        alt="Synami Agriscience"
        width={2713}
        height={830}
        className="h-14 w-auto lg:h-[82px]"
      />
      {settings?.footerTagline ? (
        <p className="mt-7 max-w-[30ch] text-[15px] leading-relaxed">
          {settings.footerTagline}
        </p>
      ) : null}

      {socials.length > 0 ? (
        <div className="mt-8">
          <p className="font-display text-sm font-semibold text-navy">
            Follow us
          </p>
          <div className="mt-4 flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href as string}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-pill border border-leaf/25 p-3 text-leaf transition-all duration-300 hover:-translate-y-0.5 hover:border-leaf hover:bg-leaf hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>

    {/* ---------- Products ---------- */}
    <div>
      <ColHeading>Products</ColHeading>
      <ul className="mt-6 space-y-3.5">
        {segments.map((seg) => (
          <li key={seg._id}>
            <FooterLink href={`/products/${seg.slug}`}>{seg.title}</FooterLink>
          </li>
        ))}
        <li>
          <FooterLink href="/products">All products</FooterLink>
        </li>
      </ul>
    </div>

    {/* ---------- About ---------- */}
    <div>
      <ColHeading>About Us</ColHeading>
      <ul className="mt-6 space-y-3.5">
        {ABOUT_LINKS.map((a) => (
          <li key={a.href}>
            <FooterLink href={a.href}>{a.title}</FooterLink>
          </li>
        ))}
      </ul>
    </div>

    {/* ---------- Insights ---------- */}
    <div>
      <ColHeading>Insights</ColHeading>
      <ul className="mt-6 space-y-3.5">
        {capabilities.map((item) => (
          <li key={item._id}>
            <FooterLink href={`/capabilities/${item.slug}`}>{item.title}</FooterLink>
          </li>
        ))}
        {COMPANY_LINKS.map((c) => (
          <li key={c.href}>
            <FooterLink href={c.href}>{c.title}</FooterLink>
          </li>
        ))}
      </ul>
    </div>

    {/* ---------- Contact ---------- */}
    <div className="sm:col-span-2 lg:col-span-1">
      <ColHeading>Contact</ColHeading>
      <ul className="mt-6 space-y-5">
        {emails.length > 0 ? (
          <li className="flex gap-3">
            <Mail className="mt-[3px] h-4 w-4 shrink-0 text-leaf" />
            <div className="space-y-1.5">
              {emails.map((e) => (
                <a
                  key={e.value}
                  href={`mailto:${e.value}`}
                  className="block text-[15px] text-stone transition-colors hover:text-leaf"
                >
                  {e.value}
                </a>
              ))}
            </div>
          </li>
        ) : null}

              {phones.length > 0 ? (
                <li className="flex gap-3">
                  <Phone className="mt-[3px] h-4 w-4 shrink-0 text-leaf" />
                  <div className="space-y-1.5">
                    {phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\s/g, "")}`}
                        className="block text-[15px] text-stone transition-colors hover:text-leaf"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </li>
              ) : null}

              {settings?.address ? (
                <li className="flex gap-3">
                  <MapPin className="mt-[3px] h-4 w-4 shrink-0 text-leaf" />
                  <p className="whitespace-pre-line text-[15px] leading-relaxed">
                    {settings.address}
                  </p>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="flex flex-col gap-4 border-t border-leaf/15 py-7 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Synami Agriscience Private Limited. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-leaf">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-leaf">
              Terms &amp; Conditions
            </Link>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 font-display font-medium text-leaf"
            >
              Go to top
              <span className="rounded-pill bg-leaf p-2 text-white transition-transform duration-300 group-hover:-translate-y-0.5">
                <ArrowUp className="h-3.5 w-3.5" />
              </span>
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
