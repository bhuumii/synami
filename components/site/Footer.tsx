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
import { productMenu, capabilitiesMenu, footerContact } from "@/lib/navigation";

const socials = [
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
];

/**
 * Footer on sage — a soft green, not a dark slab.
 *
 * A heavy dark footer was the last of the navy blocks and it ended the page
 * with a thud. Sage keeps the page inside one hue family and lets the green
 * CTA band above it stay the loudest thing on screen, which is where the
 * attention should be.
 *
 * Text is navy on light, so contrast is stronger here than it was on dark.
 */
export function Footer() {
  const year = new Date().getFullYear();

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
            <p className="mt-6 max-w-[34ch] text-sm">
              Science for a healthier tomorrow. Crop protection, fertilizers
              and biostimulants for agricultural businesses worldwide.
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="rounded-pill border border-leaf/20 p-2.5 text-leaf transition-all duration-300 hover:border-leaf hover:bg-leaf hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-display text-xs uppercase tracking-[0.18em] text-navy">
              Products
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {productMenu.map((col) => (
                <li key={col.title}>
                  <Link
                    href={col.href}
                    className="link-wipe inline-block transition-colors hover:text-leaf"
                  >
                    {col.title}
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
                <Link
                  href="/about"
                  className="link-wipe inline-block transition-colors hover:text-leaf"
                >
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

          {/* Contact */}
          <div>
            <h3 className="font-display text-xs uppercase tracking-[0.18em] text-navy">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-leaf" />
                <div className="space-y-1.5">
                  <a
                    href={`mailto:${footerContact.email}`}
                    className="block transition-colors hover:text-leaf"
                  >
                    {footerContact.email}
                  </a>
                  <a
                    href={`mailto:${footerContact.sales}`}
                    className="block transition-colors hover:text-leaf"
                  >
                    {footerContact.sales}
                  </a>
                  <a
                    href={`mailto:${footerContact.export}`}
                    className="block transition-colors hover:text-leaf"
                  >
                    {footerContact.export}
                  </a>
                </div>
              </li>
              {footerContact.phone && (
                <li className="flex gap-3">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-leaf" />
                  <a
                    href={`tel:${footerContact.phone}`}
                    className="transition-colors hover:text-leaf"
                  >
                    {footerContact.phone}
                  </a>
                </li>
              )}
              {footerContact.address && (
                <li className="flex gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-leaf" />
                  <span>{footerContact.address}</span>
                </li>
              )}
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
