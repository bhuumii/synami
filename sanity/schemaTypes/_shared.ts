import { defineField } from "sanity";

/** Shared bits used by several schemas. Not a document type. */

export const ICON_LIST = [
  { title: "Lightbulb — ideas, innovation", value: "lightbulb" },
  { title: "Flask — research, formulation", value: "flask" },
  { title: "Microscope — science, testing", value: "microscope" },
  { title: "Shield — quality, safety", value: "shield" },
  { title: "Sprout — growth, crops", value: "sprout" },
  { title: "Leaf — sustainability", value: "leaf" },
  { title: "Globe — international", value: "globe" },
  { title: "Handshake — partnership", value: "handshake" },
  { title: "Truck — supply, logistics", value: "truck" },
  { title: "Target — focus, precision", value: "target" },
  { title: "Users — team, community", value: "users" },
  { title: "Award — standards", value: "award" },
  { title: "Recycle — responsibility", value: "recycle" },
  { title: "Chart — performance, scale", value: "chart" },
  { title: "Scale — integrity, ethics", value: "scale" },
  { title: "Heart — care, values", value: "heart" },
];

export const richText = {
  type: "block" as const,
  styles: [{ title: "Paragraph", value: "normal" }],
  lists: [{ title: "Bullet list", value: "bullet" }],
  marks: {
    decorators: [
      { title: "Bold", value: "strong" },
      { title: "Italic", value: "em" },
    ],
    annotations: [
      {
        name: "link",
        type: "object",
        title: "Link",
        fields: [{ name: "href", type: "url", title: "URL" }],
      },
    ],
  },
};

export const heroImageField = defineField({
  name: "heroImage",
  title: "Hero image (landscape)",
  type: "image",
  description: "Optional. Leave blank for a plain green header with dark text.",
  options: { hotspot: true },
  fields: [defineField({ name: "alt", title: "Image description", type: "string" })],
});
