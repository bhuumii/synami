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
import { capabilitiesMenu } from "@/lib/navigation";
import type { NavSegment } from "@/lib/nav-types";

type Settings = {
  generalEmail?: string;
  salesEmail?: string;
  exportEmail?: string;
  phone?: string;
  address?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  footerTagline?: string;
};

/**
 * Footer on sage. Product column and contact details both come from Sanity,
 * so nothing here goes stale when the client changes something.
 *
 * Social icons render only when a URL exists — an icon linking to "#" reads
 * as an unfinished site.
 */
export function Footer({
  segments,
  settings,
}: {
  segments: NavSegment[];
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

  return (
    <footer className="bg-sage text-stone">
      <Container className="py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
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
                    href={href!}
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

          <div>
            <h3 className="font-display text-xs uppercase tracking-[0.18em] text-navy">
              Products
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {segments.map((seg) => (
                <li key={seg._id}>
                  <Link
                    href={`/products/${seg.slug}`}
                    className="link-wipe inline-block transition-colors hover:text-leaf"
                  >
                    {seg.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xs uppercase tracking-[0.18em] text-navy">
              Company
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/about" className="link-wipe inline-block transition-colors hover:text-leaf">
                  About Us
                </Link>
              </li>
              {capabilitiesMenu.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="link-wipe inline-block transition-colors hover:text-leaf"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

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

              {settings?.phone ? (
                <li className="flex gap-3">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-leaf" />
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-leaf"
                  >
                    {settings.phone}
                  </a>
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
