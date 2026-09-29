import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/ui/Container";

/**
 * Page header.
 *
 * With an image it's a full-bleed hero under the forest overlay, matching
 * the product pages. Without one it's a pale green block with dark text —
 * which is better than a grey placeholder box, and means the client can
 * publish a page before they've sourced photography.
 */
export function PageHero({
  title,
  eyebrow,
  intro,
  image,
  breadcrumb,
}: {
  title: string;
  eyebrow?: string;
  intro?: string;
  image?: { alt?: string };
  breadcrumb?: { label: string; href: string }[];
}) {
  const crumbs = breadcrumb ?? [];

  if (!image) {
    return (
      <section className="bg-field pb-16 pt-36 md:pb-20 md:pt-44">
        <Container>
          {crumbs.length > 0 ? (
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-sm text-slate"
            >
              <Link href="/" className="transition-colors hover:text-leaf">
                Home
              </Link>
              {crumbs.map((c) => (
                <span key={c.href} className="flex items-center gap-2">
                  <ChevronRight className="h-3.5 w-3.5" />
                  <Link href={c.href} className="transition-colors hover:text-leaf">
                    {c.label}
                  </Link>
                </span>
              ))}
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-navy">{title}</span>
            </nav>
          ) : null}

          {eyebrow ? (
            <p className="mt-6 font-display text-xs uppercase tracking-[0.2em] text-leaf">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="mt-4 max-w-[18ch] font-display text-4xl font-semibold text-ink">
            {title}
          </h1>

          {intro ? <p className="mt-6 max-w-[56ch] text-lg">{intro}</p> : null}
        </Container>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-[58vh] items-end overflow-hidden pb-12 pt-32 md:min-h-[54vh] md:pb-16 md:pt-40">
      <Image
        src={urlFor(image as never).width(2400).height(1100).fit("crop").url()}
        alt={image.alt || title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="overlay-forest absolute inset-0" />

      <Container className="relative z-10">
        {crumbs.length > 0 ? (
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-white/70"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.href} className="flex items-center gap-2">
                <ChevronRight className="h-3.5 w-3.5" />
                <Link href={c.href} className="transition-colors hover:text-white">
                  {c.label}
                </Link>
              </span>
            ))}
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">{title}</span>
          </nav>
        ) : null}

        {eyebrow ? (
          <p className="mt-6 font-display text-xs uppercase tracking-[0.2em] text-leaf-bright">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="mt-4 max-w-[18ch] font-display text-4xl font-semibold text-white">
          {title}
        </h1>

        {intro ? (
          <p className="mt-6 max-w-[52ch] text-lg text-white/85">{intro}</p>
        ) : null}
      </Container>
    </section>
  );
}
