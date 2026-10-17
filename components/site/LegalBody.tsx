import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";

export type LegalSection = { heading?: string; body?: unknown };

/**
 * Legal pages: one narrow column, numbered headings, no imagery.
 *
 * Deliberately plain. Nobody reads a privacy policy for pleasure — they
 * scan it for one clause. Numbered sections and a generous measure make
 * that scan quick, and anything decorative would get in the way.
 */
export function LegalBody({ sections = [] }: { sections?: LegalSection[] }) {
  if (!sections.length) return null;

  return (
    <section className="bg-paper py-14 md:py-20 lg:py-24">
      <Container width="narrow">
        <div className="space-y-12">
          {sections.map((s, i) => (
            <div key={i} id={`section-${i + 1}`} className="scroll-mt-28">
              {s.heading ? (
                <h2 className="font-display text-xl font-semibold text-navy">
                  <span className="mr-3 tabular-nums text-leaf">{i + 1}.</span>
                  {s.heading}
                </h2>
              ) : null}
              <div className="mt-4">
                <RichText value={s.body} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
