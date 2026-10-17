import { defineField, defineType } from "sanity";
import { ICON_LIST, richText, heroImageField } from "./_shared";

/**
 * ABOUT SYNAMI — singleton, serves /about.
 *
 * Exactly one of these exists, so it's a singleton rather than a list.
 * The client can't create a second About page by accident, and the fields
 * here are only the ones this page actually uses.
 */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Synami",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      initialValue: "About Synami Agriscience",
      validation: (r) => r.required(),
    }),
    defineField({ name: "eyebrow", title: "Small label above the title", type: "string" }),
    defineField({
      name: "intro",
      title: "Intro paragraph",
      type: "text",
      rows: 3,
      description: "The larger text directly under the page title.",
    }),
    defineField(heroImageField),

    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      description:
        "Heading, text and an optional image. Sections with an image alternate left and right down the page.",
      of: [
        {
          type: "object",
          name: "pageSection",
          fields: [
            { name: "heading", title: "Heading", type: "string" },
            { name: "body", title: "Text", type: "array", of: [richText] },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Image description", type: "string" }],
            },
          ],
          preview: { select: { title: "heading", media: "image" } },
        },
      ],
    }),

    defineField({
      name: "highlights",
      title: "Highlight cards",
      type: "array",
      description: "A grid of short cards with an icon at the top. Used for Our Mission.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: ICON_LIST },
              initialValue: "leaf",
            },
            { name: "title", title: "Title", type: "string" },
            { name: "text", title: "Description", type: "text", rows: 3 },
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        },
      ],
    }),

    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "About Synami" }) },
});
