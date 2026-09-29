import { defineField, defineType } from "sanity";

/**
 * A careers application.
 *
 * Written by the API route, never created by hand.
 *
 * Note what is NOT here: the resume file. Sanity asset URLs are public and
 * unauthenticated, so storing CVs there would put strangers' personal
 * documents on permanently reachable links. The resume is attached to the
 * notification email instead, where it stays inside the client's inbox.
 * This record exists so applications are still countable and searchable.
 */
export const jobApplication = defineType({
  name: "jobApplication",
  title: "Job Application",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "firstName", title: "First name", type: "string" }),
    defineField({ name: "lastName", title: "Last name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text", rows: 6 }),
    defineField({
      name: "resumeName",
      title: "Resume file",
      type: "string",
      description: "The file is attached to the notification email.",
    }),
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
    select: { first: "firstName", last: "lastName", subtitle: "email", date: "submittedAt" },
    prepare: ({ first, last, subtitle, date }) => ({
      title: [first, last].filter(Boolean).join(" ") || "Application",
      subtitle: [subtitle, date ? new Date(date).toLocaleDateString() : null]
        .filter(Boolean)
        .join(" — "),
    }),
  },
});
