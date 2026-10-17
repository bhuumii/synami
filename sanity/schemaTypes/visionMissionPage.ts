import { defineField, defineType } from "sanity";
import { richText, heroImageField } from "./_shared";

const pointFields = [
  {
    name: "heading",
    title: "Heading",
    type: "string",
    validation: (r: { required: () => unknown }) => r.required(),
  },
  { name: "body", title: "Description", type: "array", of: [richText] },
  {
    name: "image",
    title: "Image",
    type: "image",
    options: { hotspot: true },
    fields: [{ name: "alt", title: "Image description", type: "string" }],
  },
];

/**
 * VISION & MISSION — singleton, serves /about/vision-mission.
 *
 * Two labelled groups, each a list of points. Every point is a heading,
 * a description and an image, rendered as an alternating row with the
 * same shaped frame and parallax used on the About page.
 */
export const visionMissionPage = defineType({
  name: "visionMissionPage",
  title: "Vision & Mission",
  type: "document",
  groups: [
    { name: "page", title: "Page", default: true },
    { name: "vision", title: "Our Vision" },
    { name: "mission", title: "Our Mission" },
    { name: "meta", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      group: "page",
      initialValue: "Our Vision & Mission",
      validation: (r) => r.required(),
    }),
    defineField({ name: "eyebrow", title: "Small label above the title", type: "string", group: "page" }),
    defineField({ name: "intro", title: "Intro paragraph", type: "text", rows: 3, group: "page" }),
    defineField({ ...heroImageField, group: "page" }),

    defineField({
      name: "visionHeading",
      title: "Section heading",
      type: "string",
      group: "vision",
      initialValue: "Our Vision",
    }),
    defineField({
      name: "visionIntro",
      title: "Section intro",
      type: "text",
      rows: 3,
      group: "vision",
      description: "Optional. A short paragraph before the points.",
    }),
    defineField({
      name: "visionPoints",
      title: "Vision points",
      type: "array",
      group: "vision",
      description: "Three or four works well. Each needs an image.",
      of: [
        {
          type: "object",
          fields: pointFields,
          preview: { select: { title: "heading", media: "image" } },
        },
      ],
    }),

    defineField({
      name: "missionHeading",
      title: "Section heading",
      type: "string",
      group: "mission",
      initialValue: "Our Mission",
    }),
    defineField({
      name: "missionIntro",
      title: "Section intro",
      type: "text",
      rows: 3,
      group: "mission",
    }),
    defineField({
      name: "missionPoints",
      title: "Mission points",
      type: "array",
      group: "mission",
      of: [
        {
          type: "object",
          fields: pointFields,
          preview: { select: { title: "heading", media: "image" } },
        },
      ],
    }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "meta" }),
  ],
  preview: { prepare: () => ({ title: "Vision & Mission" }) },
});
