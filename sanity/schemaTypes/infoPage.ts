import { defineField, defineType } from "sanity";

/**
 * A simple content page: About, Quality, Solutions, Global Business.
 *
 * One flexible type rather than four near-identical ones. The client can
 * also create new pages without any code change — useful for Privacy Policy
 * and Terms, which every site eventually needs.
 */
export const infoPage = defineType({
  name: "infoPage",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Small label above heading",
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Intro paragraph",
      type: "text",
      rows: 3,
      description: "The larger text directly under the page title.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image (landscape)",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Image description", type: "string" }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      description: "Each section is a heading plus text. Drag to reorder.",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", title: "Heading", type: "string" },
            {
              name: "body",
              title: "Text",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [{ title: "Paragraph", value: "normal" }],
                  lists: [{ title: "Bullet list", value: "bullet" }],
                  marks: {
                    decorators: [
                      { title: "Bold", value: "strong" },
                      { title: "Italic", value: "em" },
                    ],
                  },
                },
              ],
            },
          ],
          preview: { select: { title: "heading" } },
        },
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});
