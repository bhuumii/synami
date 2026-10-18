import { defineField, defineType } from "sanity";
import { richText, heroImageField } from "./_shared";

/**
 * PRODUCTS INDEX — singleton, serves /products.
 *
 * The main categories themselves come from Main Categories; this holds
 * only the wrapper content, so the client edits the page's words in one
 * place and the listing stays generated.
 */
export const productsPage = defineType({
  name: "productsPage",
  title: "Products Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      initialValue: "Everything a crop needs",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Small label above the title",
      type: "string",
      initialValue: "Our products",
    }),
    defineField({
      name: "intro",
      title: "Intro paragraph",
      type: "text",
      rows: 3,
      description: "The larger text directly under the page title.",
    }),
    heroImageField,

    defineField({
      name: "listingHeading",
      title: "Heading above the list",
      type: "string",
      description: 'Optional. For example "Our ranges".',
    }),

    defineField({
      name: "body",
      title: "Closing text",
      type: "array",
      description:
        "Optional. Shown below the list of categories — useful for a note about custom formulation or registration support.",
      of: [richText],
    }),

    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Products Page" }) },
});
