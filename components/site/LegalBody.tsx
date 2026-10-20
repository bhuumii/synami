import { PortableText, type PortableTextComponents } from "next-sanity";
import { Container } from "@/components/ui/Container";

/**
 * Legal document body.
 *
 * Its own renderer rather than the site-wide RichText: legal copy needs
 * headings every few paragraphs, numbered clauses, and no decoration.
 *
 * Every text element carries `max-w-none` to override the base
 * `p { max-width: 68ch }` rule in globals.css, which otherwise caps lines
 * at roughly 640px regardless of the container.
 *
 * `scroll-mt-28` on headings means an anchor link lands below the fixed
 * header rather than underneath it.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-4 max-w-none text-[17px] leading-[1.7] text-stone">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-11 scroll-mt-28 border-t border-line pt-8 font-display text-xl font-semibold text-navy first:mt-0 first:border-0 first:pt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-7 scroll-mt-28 font-display text-base font-semibold text-navy">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 space-y-2">{children}</ul>,
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 marker:font-display marker:text-leaf">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative max-w-none pl-6 text-[17px] leading-[1.7] text-stone before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-leaf">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="max-w-none text-[17px] leading-[1.7] text-stone">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-navy">{children}</strong>
    ),
    link: ({ children, value }) => {
      const external = value?.href?.startsWith("http");
      return (
        <a
          href={value?.href}
          className="text-leaf underline underline-offset-4 hover:text-leaf-deep"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export function LegalBody({ value }: { value: unknown }) {
  if (!value) return null;

  return (
    <section className="bg-paper py-12 md:py-16">
      <Container>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <PortableText value={value as any} components={components} />
      </Container>
    </section>
  );
}
