import { defineField, defineType } from "sanity";

/**
 * SITE SETTINGS — singleton.
 * Contact details, social links, and the two page images.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "contact", title: "Contact", default: true },
    { name: "location", title: "Location & map" },
    { name: "images", title: "Page images" },
    { name: "social", title: "Social links" },
    { name: "footer", title: "Footer" },
    { name: "whatsapp", title: "WhatsApp button" },
  ],
  fields: [
    defineField({
      name: "generalEmail",
      title: "General email",
      type: "string",
      group: "contact",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "salesEmail",
      title: "Sales email",
      type: "string",
      group: "contact",
      validation: (r) => r.email(),
    }),
    defineField({
      name: "exportEmail",
      title: "Export email",
      type: "string",
      group: "contact",
      validation: (r) => r.email(),
    }),
    defineField({
      name: "phone",
      title: "Phone / WhatsApp",
      type: "string",
      group: "contact",
      description: "Include the country code, e.g. +91 98765 43210",
    }),
    defineField({
      name: "phoneAlt",
      title: "Second phone (optional)",
      type: "string",
      group: "contact",
    }),

    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 4,
      group: "location",
      description: "Each line displays exactly as typed.",
    }),
    defineField({
      name: "mapEmbedUrl",
      title: "Google Maps embed link",
      type: "url",
      group: "location",
      description:
        'Google Maps → Share → Embed a map → copy ONLY the src="..." address. Leave blank to hide the map.',
    }),
    defineField({
      name: "mapLinkUrl",
      title: "Google Maps share link",
      type: "url",
      group: "location",
      description: 'Google Maps → Share → Copy link. Powers the "Open in Maps" button.',
    }),

      defineField({
      name: "whatsappNumber",
      title: "WhatsApp number",
      type: "string",
      group: "whatsapp",
      description:
        "Include the country code, e.g. +91 98765 43210. Spaces and dashes are fine — they're stripped automatically. Leave blank to hide the button.",
    }),
    defineField({
      name: "whatsappMessage",
      title: "Pre-filled message",
      type: "text",
      rows: 2,
      group: "whatsapp",
      description:
        "Optional. Appears already typed in the visitor's WhatsApp, so they only have to press send.",
      initialValue: "Hello, I'd like to know more about Synami Agriscience products.",
    }),

    /* ---------- Page images ---------- */
    defineField({
      name: "contactImage",
      title: "Contact page image",
      type: "image",
      group: "images",
      description:
        "Shown beside the heading on the Contact page. Portrait or square works best — at least 1200px wide. Leave blank and the layout closes up neatly.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Image description",
          type: "string",
          description: "One short sentence, for screen readers and Google.",
        }),
      ],
    }),
    defineField({
      name: "careersImage",
      title: "Careers page image",
      type: "image",
      group: "images",
      description:
        "Shown beside the heading on the Careers page. A team or workplace photo works better here than a product shot.",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Image description", type: "string" }),
      ],
    }),

    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
      group: "social",
      description: "Leave blank to hide the icon.",
    }),
    defineField({ name: "facebook", title: "Facebook URL", type: "url", group: "social" }),
    defineField({ name: "instagram", title: "Instagram URL", type: "url", group: "social" }),
    defineField({ name: "youtube", title: "YouTube URL", type: "url", group: "social" }),

    defineField({
      name: "footerTagline",
      title: "Footer tagline",
      type: "text",
      rows: 3,
      group: "footer",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
