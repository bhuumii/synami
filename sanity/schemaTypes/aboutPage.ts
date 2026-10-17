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
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});

/** ABOUT SYNAMI — singleton, serves /about. */
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
    heroImageField,

    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      description:
        "Heading, text and an optional image. Sections with an image alternate left and right down the page.",
      of: [sectionMember],
    }),

    defineField({
      name: "highlights",
      title: "Highlight cards",
      type: "array",
      description: "A grid of short cards with an icon at the top.",
      of: [highlightMember],
    }),

    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "About Synami" }) },
});
