import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Founder's message.
 *
 * A sticky portrait on the left, the letter on the right. The portrait
 * holds while the message scrolls, so the reader keeps a face in view —
 * which is the only reason this page exists rather than being a paragraph
 * on the About page.
 */
export function FounderMessage({
  name,
  role,
  photo,
  pullQuote,
  message,
  signature,
}: {
  name?: string;
  role?: string;
  photo?: { alt?: string };
  pullQuote?: string;
  message?: unknown;
  signature?: { alt?: string };
}) {
  if (!name && !message && !pullQuote) return null;

  return (
    <section className="bg-paper py-16 md:py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {photo ? (
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[140px_18px_140px_18px] bg-sage shadow-[var(--shadow-lift)]">
              <Image
  src={urlFor(photo as never).width(900).height(1125).fit("crop").url()}
  alt={photo.alt || name || "Founder"}
  fill
  priority
  sizes="(max-width: 1024px) 100vw, 40vw"
  className="object-cover"
/>
              </div>

              {name ? (
                <div className="mt-7">
                  <p className="font-display text-lg font-semibold text-navy">{name}</p>
                  {role ? <p className="mt-1 text-sm text-slate">{role}</p> : null}
                </div>
              ) : null}
            </div>
          ) : null}

          <div>
            {pullQuote ? (
              <Reveal>
                <blockquote className="border-l-[3px] border-straw pl-6 font-display text-2xl font-medium leading-snug text-navy">
                  {pullQuote}
                </blockquote>
              </Reveal>
            ) : null}

            {message ? (
              <Reveal delay={0.08}>
                <div className={pullQuote ? "mt-10" : undefined}>
                  <RichText value={message} />
                </div>
              </Reveal>
            ) : null}

            {signature ? (
              <Reveal delay={0.12}>
                <div className="mt-12 border-t border-line pt-8">
                  <Image
                    src={urlFor(signature as never).width(420).url()}
                    alt={`${name ?? "Founder"} signature`}
                    width={210}
                    height={70}
                    className="h-16 w-auto"
                  />
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
