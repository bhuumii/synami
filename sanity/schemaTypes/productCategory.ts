import { defineField, defineType } from "sanity";

/**
 * P2 — a product category, sitting inside a Main Category (P1).
 *
 * Insecticides, Fungicides, Herbicides, Plant Growth Regulators,
 * Water-Soluble Fertilizers, Micronutrients, and so on.
 *
 * Page lives at /products/[segment]/[slug] and lists its products.
 */
export const productCategory = defineType({
  name: "productCategory",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category name",
      type: "string",
      description: 'For example "Insecticides" or "Micronutrients".',
      validation: (r) => r.required(),
    }),

    defineField({
      name: "segment",
      title: "Main category",
      type: "reference",
      description:
        "Which main category this belongs under — Crop Protection, Fertilizers, and so on.",
      to: [{ type: "productSegment" }],
      validation: (r) => r.required(),
    }),

    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      description:
        'Click Generate. Just the name, no slashes — "insecticides" becomes /products/crop-protection/insecticides',
      options: { source: "title", maxLength: 96 },
      validation: (r) =>
        r.required().custom((slug) =>
          slug?.current?.includes("/")
            ? "Remove the slashes — enter only the name."
            : true
        ),
    }),

    defineField({
      name: "heroImage",
      title: "Hero image (landscape)",
      type: "image",
      description: "Wide image across the top of the category page. At least 1920px wide.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Image description",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),

    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 2,
      description:
        "One or two lines. Appears on the main category page and in the navigation menu.",
      validation: (r) => r.required().max(200),
    }),

    defineField({
      name: "description",
      title: "Full description",
      type: "array",
      description: "The main text on the category page.",
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
      description: "Sequence within its main category. 1 appears first.",
      validation: (r) => r.required().integer().min(1),
    }),

    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],

  orderings: [
    {
      title: "Main category, then order",
      name: "bySegment",
      by: [
        { field: "segment.title", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],

  preview: {
    select: { title: "title", subtitle: "segment.title", media: "heroImage" },
  },
});
