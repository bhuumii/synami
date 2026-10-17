import { defineField, defineType } from "sanity";
import { richText, heroImageField } from "./_shared";

/** FOUNDER'S MESSAGE — singleton, serves /about/founders-message. */
export const founderPage = defineType({
  name: "founderPage",
  title: "Founder's Message",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      initialValue: "Founder's Message",
      validation: (r) => r.required(),
    }),
    defineField({ name: "eyebrow", title: "Small label above the title", type: "string" }),
    defineField({ name: "intro", title: "Intro paragraph", type: "text", rows: 3 }),
    heroImageField,

    defineField({
      name: "founderName",
      title: "Founder's name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "founderRole", title: "Role / title", type: "string" }),
    defineField({
      name: "founderPhoto",
      title: "Photograph",
      type: "image",
      description: "Portrait orientation works best.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Image description", type: "string" })],
    }),
    defineField({
      name: "pullQuote",
      title: "Pull quote",
      type: "text",
      rows: 2,
      description: "One sentence, set large. Optional.",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "array",
      of: [richText],
    }),
    defineField({
      name: "signature",
      title: "Signature image",
      type: "image",
      description: "Optional. A transparent PNG of a handwritten signature.",
    }),

    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Founder's Message" }) },
});
