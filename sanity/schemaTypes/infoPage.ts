import { defineArrayMember, defineField, defineType } from "sanity";
import { ICON_LIST, richText, heroImageField } from "./_shared";

const sectionMember = defineArrayMember({
  type: "object",
  name: "pageSection",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "body", title: "Text", type: "array", of: [richText] }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Image description", type: "string" })],
    }),
  ],
  preview: { select: { title: "heading", media: "image" } },
});

const highlightMember = defineArrayMember({
  type: "object",
  name: "highlight",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: ICON_LIST },
      initialValue: "leaf",
    }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "text", title: "Description", type: "text", rows: 3 }),
       defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Only needed for the Image grid layout. Square or portrait works best.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Image description", type: "string" })],
    }),
  ],
 preview: { select: { title: "title", subtitle: "text", media: "image" } },
});

/**
 * A content page — Insights pages and legal pages only.
 *
 * The About pages have their own dedicated types, so this one is back to
 * a single clear job and no longer shows fields it has no use for.
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
      description:
        'Click Generate. Just the name, no slashes — "quality" becomes /capabilities/quality',
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
    heroImageField,

    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      description: "Sections with an image alternate left and right down the page.",
      of: [sectionMember],
    }),

 defineField({
      name: "highlightsLayout",
      title: "How should the points below be shown?",
      type: "string",
      options: {
        list: [
          { title: "Cards — icon, title, text", value: "cards" },
          { title: "Image grid — checkerboard, needs an image per point", value: "grid" },
          { title: "Route map — for places and regions", value: "map" },
        ],
        layout: "radio",
      },
      initialValue: "cards",
    }),

    defineField({
      name: "highlightsHeading",
      title: "Heading above the points",
      type: "string",
      description: 'For example "Our approach to quality" or "Our international focus".',
    }),

    defineField({
      name: "highlightsIntro",
      title: "Intro above the points",
      type: "text",
      rows: 3,
      description: "Only shown with the Route map layout.",
    }),


    defineField({
      name: "highlights",
      title: "Highlight cards",
      type: "array",
      description: "Optional. A grid of short cards with an icon at the top.",
      of: [highlightMember],
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
