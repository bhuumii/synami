import { defineField, defineType } from "sanity";

/**
 * SITE SETTINGS — singleton.
 * Contact details and social links, used in the header, footer and contact page.
 * Changing an email here changes it everywhere at once.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "contact", title: "Contact", default: true },
    { name: "social", title: "Social links" },
    { name: "footer", title: "Footer" },
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
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
      group: "contact",
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
      description: "The short paragraph under the logo in the footer.",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
