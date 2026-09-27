import { defineField, defineType } from "sanity";

/**
 * A contact form submission.
 *
 * Written by the form's API route, never created by hand. Lives in the
 * Studio so the client sees enquiries in the same place they edit content —
 * no second dashboard to learn.
 *
 * `readOnly` on every field prevents accidental edits to a record of what
 * someone actually sent.
 */
export const lead = defineType({
  name: "lead",
  title: "Enquiry",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "country", title: "Country", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone / WhatsApp", type: "string" }),
    defineField({ name: "requirement", title: "Product / requirement", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text", rows: 5 }),
    defineField({ name: "submittedAt", title: "Received", type: "datetime" }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "newest",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "company", date: "submittedAt" },
    prepare: ({ title, subtitle, date }) => ({
      title: title || "Unnamed enquiry",
      subtitle: [subtitle, date ? new Date(date).toLocaleDateString() : null]
        .filter(Boolean)
        .join(" — "),
    }),
  },
});
