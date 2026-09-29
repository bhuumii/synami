import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
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

/**
 * Footer on sage — a soft green rather than a dark slab, so the page ends
 * without a thud and stays inside one hue family.
 *
 * Every link and detail comes from Sanity. Social icons render ONLY when a
 * URL exists; an icon pointing at "#" reads as an unfinished site.
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
    settings?.generalEmail,
    settings?.salesEmail,
    settings?.exportEmail,
  ].filter(Boolean) as string[];

  const phones = [settings?.phone, settings?.phoneAlt].filter(Boolean) as string[];

  const linkClass =
    "link-wipe inline-block transition-colors hover:text-leaf";

  return (
    <footer className="bg-sage text-stone">
      <Container className="py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Identity */}
          <div>
            <Image
              src="/logo.jpg"
              alt="Synami Agriscience"
              width={600}
              height={228}
              className="h-10 w-auto rounded-image"
            />

            {settings?.footerTagline ? (
              <p className="mt-6 max-w-[34ch] text-sm">{settings.footerTagline}</p>
            ) : null}

            {socials.length > 0 ? (
              <div className="mt-7 flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="rounded-pill border border-leaf/20 p-2.5 text-leaf transition-all duration-300 hover:border-leaf hover:bg-leaf hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* Products */}
          <div>
            <h3 className="font-display text-xs uppercase tracking-[0.18em] text-navy">
              Products
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {segments.map((seg) => (
                <li key={seg._id}>
                  <Link href={`/products/${seg.slug}`} className={linkClass}>
                    {seg.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display text-xs uppercase tracking-[0.18em] text-navy">
              Company
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/about" className={linkClass}>
                  About Us
                </Link>
              </li>
              {capabilities.map((item) => (
                <li key={item._id}>
                  <Link href={`/capabilities/${item.slug}`} className={linkClass}>
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/careers" className={linkClass}>
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className={linkClass}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-xs uppercase tracking-[0.18em] text-navy">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              {emails.length > 0 ? (
                <li className="flex gap-3">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-leaf" />
                  <div className="space-y-1.5">
                    {emails.map((e) => (
                      <a
                        key={e}
                        href={`mailto:${e}`}
                        className="block transition-colors hover:text-leaf"
                      >
                        {e}
                      </a>
                    ))}
                  </div>
                </li>
              ) : null}

              {phones.length > 0 ? (
                <li className="flex gap-3">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-leaf" />
                  <div className="space-y-1.5">
                    {phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\s/g, "")}`}
                        className="block transition-colors hover:text-leaf"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </li>
              ) : null}

              {settings?.address ? (
                <li className="flex gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-leaf" />
                  <span className="whitespace-pre-line">{settings.address}</span>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-leaf/15 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Synami Agriscience Private Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-leaf">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-leaf">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
