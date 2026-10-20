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
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Shown on the Products page and at the top of this page.",
      options: {
        list: [
          { title: "Shield — crop protection", value: "shield" },
          { title: "Bug — insect control", value: "bug" },
          { title: "Spray can — application", value: "spray" },
          { title: "Microscope — biologicals", value: "microscope" },
          { title: "Heart pulse — plant health", value: "heart" },
          { title: "Sprout — growth", value: "sprout" },
          { title: "Leaf — general crop", value: "leaf" },
          { title: "Flower — flowering crops", value: "flower" },
          { title: "Beaker — fertilizers, nutrition", value: "beaker" },
          { title: "Flask — formulation", value: "flask" },
          { title: "Test tube — micronutrients", value: "testtube" },
          { title: "Droplets — liquids", value: "droplets" },
          { title: "Atom — technicals", value: "atom" },
          { title: "Zap — performance", value: "zap" },
          { title: "Wheat — cereals", value: "wheat" },
          { title: "Carrot — vegetables", value: "carrot" },
          { title: "Tree — perennials", value: "tree" },
          { title: "Tractor — field operations", value: "tractor" },
          { title: "Factory — manufacturing", value: "factory" },
          { title: "Package — private label, supply", value: "package" },
          { title: "Layers — product ranges", value: "layers" },
          { title: "Globe — international", value: "globe" },
          { title: "Sun / Rain / Waves — environment", value: "sun" },
          { title: "Recycle — sustainability", value: "recycle" },
        ],
      },
      initialValue: "leaf",
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
