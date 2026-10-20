import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Legal page header.
 *
 * Deliberately shallow. Elsewhere the pale band is a hero carrying an
 * image or a long intro; here it's just a title strip, so it gets the
 * padding needed to clear the fixed header and nothing more.
 *
 * The title is one size down from other pages too — "Privacy Policy" at
 * 64px dominates a document nobody opened to admire.
 */
export function LegalHero({
  title,
  intro,
  lastUpdated,
}: {
  title: string;
  intro?: string;
  lastUpdated?: string;
}) {
  const formatted = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <section className="border-b border-line bg-field pb-9 pt-28 md:pb-11 md:pt-32">
      <Container>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Eyebrow>Legal</Eyebrow>
          {formatted ? (
            <span className="text-sm text-slate">Last updated: {formatted}</span>
          ) : null}
        </div>

        <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink">
          {title}
        </h1>

        {intro ? (
          /* max-w-none overrides the base `p { max-width: 68ch }` rule in
             globals.css — without it this wraps early no matter what
             width the container is. */
          <p className="mt-4 max-w-none text-[17px] leading-relaxed text-stone">
            {intro}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
