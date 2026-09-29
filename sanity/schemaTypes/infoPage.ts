import { defineField, defineType } from "sanity";

/**
 * A content page: About, Quality, Solutions, Global Business, Privacy, Terms.
 *
 * One flexible type rather than six near-identical ones. `section` decides
 * where the page lives and which menu it appears in, so the client can add a
 * new Insights page and have it show up in the navigation automatically.
 *
 * Sections alternate left/right automatically when they carry an image, so a
 * long page reads as a designed sequence rather than a wall of text.
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
      description:
        "Decides the web address and which menu it appears in. Pick carefully — changing it changes the URL.",
      options: {
        list: [
          { title: "About  →  /about", value: "about" },
          { title: "Insights menu  →  /capabilities/...", value: "capabilities" },
          { title: "Legal (privacy, terms)  →  /...", value: "legal" },
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
      description:
        "One short line shown under the page name in the Insights dropdown.",
      validation: (r) => r.max(90).warning("Keep it to a few words."),
    }),

    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Position in the Insights menu. 1 appears first.",
      initialValue: 1,
    }),

    defineField({
      name: "eyebrow",
      title: "Small label above the title",
      type: "string",
    }),

    defineField({
      name: "intro",
      title: "Intro paragraph",
      type: "text",
      rows: 3,
      description: "The larger text directly under the page title.",
    }),

    defineField({
      name: "heroImage",
      title: "Hero image (landscape)",
      type: "image",
      description:
        "Optional. Wide image behind the page title. Leave blank for a plain green header.",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Image description", type: "string" }),
      ],
    }),

    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      description:
        "Each section is a heading, text, and an optional image. Drag to reorder.",
      of: [
        {
          type: "object",
          name: "pageSection",
          fields: [
            { name: "heading", title: "Heading", type: "string" },
            {
              name: "body",
              title: "Text",
              type: "array",
              of: [
                {
                  type: "block",
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
                },
              ],
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              description:
                "Optional. Sections with an image alternate left and right down the page.",
              options: { hotspot: true },
              fields: [
                { name: "alt", title: "Image description", type: "string" },
              ],
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
      description:
        "Optional. A grid of short cards shown below the sections — good for listing capabilities or quality steps.",
      of: [
        {
          type: "object",
          fields: [
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
      subtitle:
        subtitle === "about"
          ? "/about"
          : subtitle === "legal"
            ? "Legal"
            : "Insights menu",
      media,
    }),
  },
});
