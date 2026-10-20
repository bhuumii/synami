import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * LEGAL PAGE — Privacy Policy, Terms & Conditions.
 *
 * One long rich-text field, not a section builder. Legal copy arrives as
 * a finished document — usually written by a lawyer and pasted in whole —
 * so asking the client to chop it into blocks just creates work and a
 * chance to lose a clause.
 *
 * Headings are available inside the editor, so the structure comes from
 * the text itself rather than from the schema.
 */
export const legalPage = defineType({
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      description: 'For example "Privacy Policy".',
      validation: (r) => r.required(),
    }),

    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      description:
        'Must be exactly "privacy" or "terms" — those are the two pages that exist.',
      options: { source: "title", maxLength: 40 },
      validation: (r) =>
        r.required().custom((slug) =>
          slug?.current === "privacy" || slug?.current === "terms"
            ? true
            : 'Use "privacy" or "terms".'
        ),
    }),

    defineField({
      name: "intro",
      title: "Intro line",
      type: "text",
      rows: 2,
      description: "Optional. One sentence under the title.",
    }),

    defineField({
      name: "lastUpdated",
      title: "Last updated",
      type: "date",
      description:
        "Shown at the top of the page. Update this whenever the text changes — it matters legally.",
      options: { dateFormat: "D MMMM YYYY" },
    }),

    defineField({
      name: "body",
      title: "Content",
      type: "array",
      description:
        "Paste the whole document here. Use Heading 2 for each numbered section.",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Sub-heading", value: "h3" },
          ],
          lists: [
            { title: "Bullet list", value: "bullet" },
            { title: "Numbered list", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        }),
      ],
      validation: (r) => r.required(),
    }),

    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],

  preview: { select: { title: "title", subtitle: "slug.current" } },
});
