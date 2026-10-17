import { defineField, defineType } from "sanity";
import { ICON_LIST, richText, heroImageField } from "./_shared";

/**
 * A content page — Insights pages and legal pages ONLY.
 *
 * The About pages used to live here too, which meant every Insights page
 * showed Core Values and Founder's Message tabs it had no use for. They
 * now have their own types, so this one is back to a single clear job.
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
      name: "section",
      title: "Where does this page live?",
      type: "string",
      options: {
        list: [
          { title: "Insights menu  →  /capabilities/...", value: "capabilities" },
          { title: "Legal  →  /privacy, /terms", value: "legal" },
        ],
        layout: "radio",
      },
      initialValue: "capabilities",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      description: 'Click Generate. Just the name, no slashes — "quality" becomes /capabilities/quality',
      options: { source: "title", maxLength: 96 },
      validation: (r) =>
        r.required().custom((slug) =>
          slug?.current?.includes("/")
            ? "Remove the slashes — enter only the name."
            : true
        ),
    }),

    defineField({
      name: "menuBlurb",
      title: "Menu description",
      type: "string",
      description: "One short line shown under the page name in the dropdown.",
      validation: (r) => r.max(90).warning("Keep it to a few words."),
    }),

    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Position in the Insights menu. 1 appears first.",
      initialValue: 1,
    }),

    defineField({ name: "eyebrow", title: "Small label above the title", type: "string" }),
    defineField({ name: "intro", title: "Intro paragraph", type: "text", rows: 3 }),
    defineField(heroImageField),

    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      description: "Sections with an image alternate left and right down the page.",
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
      description: "Optional. A grid of short cards with an icon at the top.",
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

  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],

  preview: {
    select: { title: "title", subtitle: "section", media: "heroImage" },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle === "legal" ? "Legal" : "Insights menu",
      media,
    }),
  },
});
