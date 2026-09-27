import { PortableText, type PortableTextComponents } from "next-sanity";

/**
 * Renders the rich text the client writes in Sanity.
 *
 * Every element is styled explicitly here. Without this, portable text comes
 * out as unstyled browser defaults — Times New Roman paragraphs with no
 * spacing — which is the most common reason a CMS-driven page looks broken
 * on first load.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-5 first:mt-0">{children}</p>,
    h3: ({ children }) => (
      <h3 className="mt-12 font-display text-xl font-semibold text-navy first:mt-0">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 space-y-2.5 border-l-2 border-leaf/25 pl-5">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="text-stone">{children}</li>,
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
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export function RichText({ value }: { value: unknown }) {
  if (!value) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PortableText value={value as any} components={components} />;
}
