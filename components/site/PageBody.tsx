import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";

export type PageSection = {
  heading?: string;
  body?: unknown;
  image?: { alt?: string };
};

export type Highlight = { title?: string; text?: string };

/**
 * Renders the body of any content page.
 *
 * Sections WITH an image get a two-column layout that alternates side each
 * time, so a long page has visual rhythm. Sections WITHOUT one fall back to
 * a narrow single column, which is the right measure for reading.
 *
 * Backgrounds alternate white / pale green per section, continuing the band
 * rhythm from the homepage.
 */
export function PageBody({
  sections = [],
  highlights = [],
}: {
  sections?: PageSection[];
  highlights?: Highlight[];
}) {
  return (
    <>
      {sections.map((s, i) => {
        const tone = i % 2 === 0 ? "bg-paper" : "bg-field";
        const flip = i % 2 === 1;

        if (!s.image) {
          return (
            <section key={i} className={`${tone} py-20 md:py-28`}>
              <Container width="narrow">
                {s.heading ? <h2 className="text-2xl">{s.heading}</h2> : null}
                <div className="mt-7">
                  <RichText value={s.body} />
                </div>
              </Container>
            </section>
          );
        }

        return (
          <section key={i} className={`${tone} py-20 md:py-28`}>
            <Container>
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div className={flip ? "lg:order-2" : undefined}>
                  {s.heading ? <h2 className="text-2xl">{s.heading}</h2> : null}
                  <div className="mt-7">
                    <RichText value={s.body} />
                  </div>
                </div>

                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-card bg-sage ${
                    flip ? "lg:order-1" : ""
                  }`}
                >
                  <Image
                    src={urlFor(s.image as never).width(1200).height(900).fit("crop").url()}
                    alt={s.image.alt || s.heading || ""}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {highlights.length > 0 ? (
        <section
          className={`${sections.length % 2 === 0 ? "bg-paper" : "bg-field"} py-20 md:py-28`}
        >
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((h, i) => (
                <div
                  key={h.title ?? i}
                  className="lift group rounded-card border border-line bg-paper p-8"
                >
                  <span className="font-display text-xs tabular-nums text-slate">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-navy transition-colors group-hover:text-leaf">
                    {h.title}
                  </h3>
                  {h.text ? (
                    <p className="mt-2.5 text-sm text-stone">{h.text}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
