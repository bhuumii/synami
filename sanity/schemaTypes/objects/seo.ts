import { defineField, defineType } from "sanity";

/**
 * Reusable SEO block. Every page-like document gets one.
 * All fields optional — sensible fallbacks are built into the page code, so
 * the client only fills these in when they want to override.
 */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Browser tab / Google title",
      type: "string",
      description:
        "Leave blank to use the page title. Around 60 characters works best.",
      validation: (r) => r.max(70).warning("Google usually cuts off past ~60."),
    }),
    defineField({
      name: "description",
      title: "Google description",
      type: "text",
      rows: 3,
      description: "The grey text under the link in search results. 150–160 characters.",
      validation: (r) => r.max(170).warning("Google usually cuts off past ~160."),
    }),
    defineField({
      name: "image",
      title: "Share image",
      type: "image",
      description: "Shown when the page is shared on WhatsApp or LinkedIn. 1200x630.",
    }),
  ],
});
