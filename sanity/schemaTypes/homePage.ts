import { defineField, defineType } from "sanity";

/**
 * HOME PAGE — a singleton.
 *
 * Structure is LOCKED. Sections can't be reordered, added or removed, and
 * the scroll behaviour isn't exposed. Every piece of TEXT is editable.
 *
 * That split is deliberate: the client gets full control of the words
 * without any route to breaking the design. A section builder would have
 * given them freedom they didn't ask for and a way to wreck the page.
 *
 * Fields are grouped so the Studio shows one section at a time rather than
 * a wall of forty inputs.
 */
export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "1. Hero", default: true },
    { name: "who", title: "2. Who we are" },
    { name: "segments", title: "3. Products" },
    { name: "why", title: "4. Why Synami" },
    { name: "approach", title: "5. Our approach" },
    { name: "global", title: "6. Global vision" },
    { name: "cta", title: "7. Partner with us" },
    { name: "meta", title: "SEO" },
  ],
  fields: [
    /* ---------------- 1. Hero ---------------- */
    defineField({
      name: "heroHeading",
      title: "Main headline",
      type: "string",
      group: "hero",
      description: "The large text over the video. Short works best — under 8 words.",
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "heroSubheading",
      title: "Sub-headline",
      type: "text",
      rows: 2,
      group: "hero",
      validation: (r) => r.required().max(220),
    }),
    defineField({
      name: "heroPrimaryCta",
      title: "First button",
      type: "cta",
      group: "hero",
    }),
    defineField({
      name: "heroSecondaryCta",
      title: "Second button",
      type: "cta",
      group: "hero",
    }),

    /* ---------------- 2. Who we are ---------------- */
    defineField({
      name: "whoEyebrow",
      title: "Small label above heading",
      type: "string",
      group: "who",
      initialValue: "Who we are",
    }),
    defineField({
      name: "whoHeading",
      title: "Heading",
      type: "string",
      group: "who",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "whoBody",
      title: "Paragraphs",
      type: "array",
      group: "who",
      description: "Add one entry per paragraph.",
      of: [{ type: "text", rows: 4 }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "whoCta",
      title: "Link",
      type: "cta",
      group: "who",
    }),

    /* ---------------- 3. Products (categories pulled automatically) ------- */
    defineField({
      name: "segmentsEyebrow",
      title: "Small label above heading",
      type: "string",
      group: "segments",
      initialValue: "Our products",
    }),
    defineField({
      name: "segmentsHeading",
      title: "Heading",
      type: "string",
      group: "segments",
      description:
        "The product categories themselves are pulled from Product Categories — edit them there, not here.",
      validation: (r) => r.required(),
    }),

    /* ---------------- 4. Why Synami ---------------- */
    defineField({
      name: "whyEyebrow",
      title: "Small label above heading",
      type: "string",
      group: "why",
      initialValue: "Why Synami",
    }),
    defineField({
      name: "whyHeading",
      title: "Heading",
      type: "string",
      group: "why",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "whyIntro",
      title: "Intro paragraph",
      type: "text",
      rows: 3,
      group: "why",
    }),
    defineField({
      name: "whyItems",
      title: "Reasons",
      type: "array",
      group: "why",
      description: "Numbered automatically. Drag to reorder.",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "text", title: "Description", type: "text", rows: 2 },
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        },
      ],
      validation: (r) => r.min(2),
    }),

    /* ---------------- 5. Approach ---------------- */
    defineField({
      name: "approachEyebrow",
      title: "Small label above heading",
      type: "string",
      group: "approach",
      initialValue: "Our approach",
    }),
    defineField({
      name: "approachHeading",
      title: "Heading",
      type: "string",
      group: "approach",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "approachSteps",
      title: "Steps",
      type: "array",
      group: "approach",
      description:
        "Four steps fit the layout best. More than four will get cramped.",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Step name", type: "string" },
            { name: "text", title: "Description", type: "text", rows: 2 },
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        },
      ],
      validation: (r) =>
        r.min(3).max(5).warning("Four steps is the ideal number here."),
    }),

    /* ---------------- 6. Global vision ---------------- */
    defineField({
      name: "globalEyebrow",
      title: "Small label above heading",
      type: "string",
      group: "global",
      initialValue: "Global vision",
    }),
    defineField({
      name: "globalHeading",
      title: "Heading",
      type: "string",
      group: "global",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "globalBody",
      title: "Paragraph",
      type: "text",
      rows: 4,
      group: "global",
    }),
    defineField({
      name: "globalNote",
      title: "Small print",
      type: "string",
      group: "global",
      description: "The lighter grey line below the paragraph.",
    }),
    defineField({
      name: "globalRegions",
      title: "Regions",
      type: "array",
      group: "global",
      of: [{ type: "string" }],
      description: "One region per line. Numbered automatically.",
    }),
    defineField({
      name: "globalCta",
      title: "Button",
      type: "cta",
      group: "global",
    }),

    /* ---------------- 7. Partner CTA ---------------- */
    defineField({
      name: "ctaHeading",
      title: "Heading",
      type: "string",
      group: "cta",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "ctaBody",
      title: "Paragraph",
      type: "text",
      rows: 3,
      group: "cta",
    }),
    defineField({
      name: "ctaAudiences",
      title: "Partner types",
      type: "array",
      group: "cta",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Shown as small pills. Importers, Distributors, and so on.",
    }),
    defineField({
      name: "ctaPrimary",
      title: "First button",
      type: "cta",
      group: "cta",
    }),
    defineField({
      name: "ctaSecondary",
      title: "Second button",
      type: "cta",
      group: "cta",
    }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "meta" }),
  ],

  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});
