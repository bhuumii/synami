import { defineField, defineType } from "sanity";

/** A button: its words and where it goes. */
export const cta = defineType({
  name: "cta",
  title: "Button",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Button text",
      type: "string",
      validation: (r) => r.max(30).warning("Keep buttons short."),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: 'Internal like "/contact", or a full https:// address.',
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
