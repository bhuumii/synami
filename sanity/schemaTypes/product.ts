import { defineField, defineType } from "sanity";

/**
 * P3 — an individual product.
 *
 * For example "Azoxystrobin 11% + Tebuconazole 18.3% SC", sitting inside the
 * Fungicides category. Page lives at /products/[category]/[product].
 *
 * The page needs only hero image + description, so everything below that is
 * optional. Optional fields render only when filled, which means the client
 * can start with the bare minimum today and enrich products later without
 * anyone touching code.
 */
export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "main", title: "Main", default: true },
    { name: "technical", title: "Technical details" },
    { name: "meta", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Product name",
      type: "string",
      group: "main",
      description:
        'The full name, e.g. "Azoxystrobin 11% + Tebuconazole 18.3% SC".',
      validation: (r) => r.required(),
    }),

    defineField({
      name: "brandName",
      title: "Brand name",
      type: "string",
      group: "main",
      description:
        "Optional. The trade name, if this product is sold under one. Shown above the product name.",
    }),

    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      group: "main",
      description: "Click Generate. Appears in the web address.",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "main",
      description:
        "Which category this belongs to. Decides where it appears and its web address.",
      to: [{ type: "productCategory" }],
      validation: (r) => r.required(),
    }),

    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      group: "main",
      description: "Main image for this product. At least 1600px wide.",
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
      group: "main",
      description: "One or two lines. Shown on the category page listing.",
      validation: (r) => r.required().max(200),
    }),

    defineField({
      name: "description",
      title: "Full description",
      type: "array",
      group: "main",
      description: "The main text on the product page.",
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

    /* ---- Optional technical fields. Render only when filled. ---- */

    defineField({
      name: "formulationType",
      title: "Formulation type",
      type: "string",
      group: "technical",
      description: "Optional. SC, EC, WG, SL, OD, WP and so on.",
    }),

    defineField({
      name: "keyFeatures",
      title: "Key features",
      type: "array",
      group: "technical",
      description: "Optional. Short bullet points shown as a list.",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "targetCrops",
      title: "Target crops",
      type: "array",
      group: "technical",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({
      name: "targetPests",
      title: "Target pests / diseases",
      type: "array",
      group: "technical",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({
      name: "dosage",
      title: "Dosage",
      type: "string",
      group: "technical",
      description: "Optional. Recommended rate of application.",
    }),

    defineField({
      name: "packSizes",
      title: "Pack sizes",
      type: "array",
      group: "technical",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: 'Optional. For example "100 ml", "1 L", "5 L".',
    }),

    defineField({
      name: "brochure",
      title: "Brochure / datasheet",
      type: "file",
      group: "technical",
      description: "Optional PDF. Adds a download button to the product page.",
    }),

    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      group: "main",
      description: "Optional. Lower numbers appear first within the category.",
    }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "meta" }),
  ],

  orderings: [
    {
      title: "Category, then order",
      name: "byCategory",
      by: [
        { field: "category.title", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "category.title",
      media: "heroImage",
    },
  },
});
