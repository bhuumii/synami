import { defineField, defineType } from "sanity";
import { ICON_LIST, heroImageField } from "./_shared";

/**
 * CORE VALUES — singleton, serves /about/core-values.
 *
 * One field that matters: the values list. Each becomes a text panel
 * paired with an image in a checkerboard grid.
 */
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
    defineField(heroImageField),

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
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (r) => r.required(),
            },
            {
              name: "text",
              title: "Description",
              type: "text",
              rows: 3,
              description: "Two or three lines. Keep them a similar length.",
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              description: "Square or portrait works best — these crop to a square.",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Image description", type: "string" }],
            },
          ],
          preview: { select: { title: "title", subtitle: "text", media: "image" } },
        },
      ],
    }),

    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Core Values" }) },
});
