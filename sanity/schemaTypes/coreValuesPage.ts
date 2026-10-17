import { defineArrayMember, defineField, defineType } from "sanity";
import { ICON_LIST, heroImageField } from "./_shared";

const valueMember = defineArrayMember({
  type: "object",
  name: "coreValue",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: ICON_LIST },
      initialValue: "leaf",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "text",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Two or three lines. Keep them a similar length.",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Square or portrait works best — these crop to a square.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Image description", type: "string" })],
    }),
  ],
  preview: { select: { title: "title", subtitle: "text", media: "image" } },
});

/** CORE VALUES — singleton, serves /about/core-values. */
export const coreValuesPage = defineType({
  name: "coreValuesPage",
  title: "Core Values",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      initialValue: "Core Values",
      validation: (r) => r.required(),
    }),
    defineField({ name: "eyebrow", title: "Small label above the title", type: "string" }),
    defineField({ name: "intro", title: "Intro paragraph", type: "text", rows: 3 }),
    heroImageField,

    defineField({
      name: "gridHeading",
      title: "Grid heading",
      type: "string",
      initialValue: "Core Values",
      description: "The heading shown above the grid itself.",
    }),

    defineField({
      name: "values",
      title: "Core values",
      type: "array",
      description:
        "Each value becomes a text panel paired with an image. An EVEN number works best — six gives three tidy rows.",
      of: [valueMember],
    }),

    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Core Values" }) },
});
