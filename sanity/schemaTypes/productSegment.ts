import { defineField, defineType } from "sanity";

/**
 * P1 — a top-level product segment.
 *
 * Crop Protection, Fertilizers, Biostimulants — and any others the client
 * adds later. Nothing about these is hardcoded: add one here and it appears
 * automatically as a card on the homepage and a column in the navigation.
 *
 * Page lives at /products/[slug] and lists the categories inside it.
 */
export const productSegment = defineType({
  name: "productSegment",
  title: "Main Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Name",
      type: "string",
      description: 'For example "Crop Protection" or "Fertilizers".',
      validation: (r) => r.required(),
    }),

    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      description:
        'Click Generate. Just the name, no slashes — "crop-protection" becomes /products/crop-protection',
      options: { source: "title", maxLength: 96 },
      validation: (r) =>
        r.required().custom((slug) =>
          slug?.current?.includes("/")
            ? "Remove the slashes — enter only the name."
            : true
        ),
    }),

    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 2,
      description:
        "One or two lines. Appears on the homepage card for this section.",
      validation: (r) => r.required().max(220),
    }),

    defineField({
      name: "heroImage",
      title: "Hero image (landscape)",
      type: "image",
      description: "Wide image across the top of this page. At least 1920px wide.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Image description",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
    }),

    defineField({
      name: "description",
      title: "Full description",
      type: "array",
      description: "The main text on this page, above the list of categories.",
      of: [
        {
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading", value: "h3" },
          ],
          lists: [{ title: "Bullet list", value: "bullet" }],
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
        },
      ],
    }),

    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description:
        "Controls the sequence on the homepage and in the menu. 1 appears first.",
      validation: (r) => r.required().integer().min(1),
    }),

    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],

  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],

  preview: {
    select: { title: "title", subtitle: "shortDescription", media: "heroImage" },
  },
});
