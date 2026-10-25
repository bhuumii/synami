import { defineArrayMember, defineField, defineType } from "sanity";
import { richText } from "./_shared";

const featureMember = defineArrayMember({
  type: "object",
  name: "feature",
  fields: [
    defineField({
      name: "title",
      title: "Feature",
      type: "string",
      description: 'The bold lead-in. For example "Selective & systemic herbicide".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "text",
      title: "Explanation",
      type: "text",
      rows: 2,
      description: "The sentence that follows it.",
    }),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});

const cropRowMember = defineArrayMember({
  type: "object",
  name: "cropRow",
  fields: [
    defineField({
      name: "crop",
      title: "Crop",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "target",
      title: "Target pest / disease",
      type: "text",
      rows: 2,
      description: "Separate several with commas.",
    }),
    defineField({
      name: "dosage",
      title: "Dosage",
      type: "string",
      description: 'For example "60 g/acre".',
    }),
  ],
  preview: {
    select: { title: "crop", subtitle: "target" },
  },
});

/**
 * P3 — an individual product.
 *
 * Restructured: the old flat `keyFeatures`, `targetCrops`, `targetPests`
 * and `dosage` fields have been replaced by `featuresBenefits` and
 * `cropRecommendations`. The old shape couldn't express "this dosage, for
 * this pest, on this crop" — three loose lists can't be read as a table,
 * and a table is what a distributor actually wants.
 */
export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "main", title: "Main", default: true },
    { name: "technical", title: "Technical" },
    { name: "crops", title: "Crops & dosage" },
    { name: "meta", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Product name",
      type: "string",
      group: "main",
      description: 'The full name, e.g. "Pyroxasulfone 85% WG".',
      validation: (r) => r.required(),
    }),

    defineField({
      name: "brandName",
      title: "Brand name",
      type: "string",
      group: "main",
      description: "Optional trade name, shown above the product name.",
    }),

    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      group: "main",
      options: { source: "title", maxLength: 96 },
      validation: (r) =>
        r.required().custom((slug) =>
          slug?.current?.includes("/")
            ? "Remove the slashes — enter only the name."
            : true
        ),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "main",
      to: [{ type: "productCategory" }],
      validation: (r) => r.required(),
    }),

    defineField({
      name: "heroImage",
      title: "Product image",
      type: "image",
      group: "main",
      description: "A pack shot works best. Portrait or square.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Image description", type: "string" })],
    }),

    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 2,
      group: "main",
      description: "One or two lines. Shown on the category listing and under the title.",
      validation: (r) => r.required().max(220),
    }),

    defineField({
      name: "description",
      title: "Full description",
      type: "array",
      group: "main",
      of: [richText],
    }),

    defineField({
      name: "formulationType",
      title: "Formulation type",
      type: "string",
      group: "technical",
      description: "SC, EC, WG, SL, OD, WP and so on. Shown as a badge.",
    }),

    defineField({
      name: "modeOfAction",
      title: "Mode of action",
      type: "array",
      group: "technical",
      description: "How the product works. One or two paragraphs.",
      of: [richText],
    }),

    defineField({
      name: "featuresBenefits",
      title: "Features & benefits",
      type: "array",
      group: "technical",
      description: "Four to six works well. Each has a bold lead-in and a sentence.",
      of: [featureMember],
    }),

    defineField({
      name: "packSizes",
      title: "Pack sizes",
      type: "array",
      group: "technical",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: 'Type one and press Enter. For example "100 g", "500 g", "1 kg".',
    }),

    defineField({
      name: "brochure",
      title: "Brochure / datasheet",
      type: "file",
      group: "technical",
      description: "Optional PDF. Adds a download button.",
    }),

    defineField({
      name: "cropRecommendations",
      title: "Crop recommendations",
      type: "array",
      group: "crops",
      description: "One row per crop. Renders as a table.",
      of: [cropRowMember],
    }),



    defineField({ name: "seo", title: "SEO", type: "seo", group: "meta" }),
  ],

   orderings: [
    {
      title: "Name (A–Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
    {
      title: "Category, then name",
      name: "byCategory",
      by: [
        { field: "category.title", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],

  preview: {
    select: { title: "title", subtitle: "category.title", media: "heroImage" },
  },
});
