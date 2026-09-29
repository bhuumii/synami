import { z } from "zod";

/**
 * ONE schema, used by both the browser form and the API route.
 *
 * This matters: client-side validation is a convenience for the visitor and
 * nothing more — anyone can POST straight to the API with curl. Validating
 * again on the server with the same rules means the two can never drift
 * apart and disagree about what's valid.
 */
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100),

  company: z
    .string()
    .trim()
    .min(2, "Please enter your company name")
    .max(120),

  country: z
    .string()
    .trim()
    .min(2, "Please enter your country")
    .max(80),

  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .email("That doesn't look like a valid email address")
    .max(160),

  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal("")),

  requirement: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more — at least 10 characters")
    .max(3000),

  /**
   * Honeypot. Hidden from humans with CSS, invisible to screen readers via
   * aria-hidden, and skipped in the tab order. Bots fill every field they
   * find, so anything arriving with this populated is discarded.
   *
   * Costs nothing, needs no third-party service, and stops the bulk of
   * automated spam. If real spam still gets through later, that's when
   * Turnstile is worth adding.
   */
  website: z.string().max(0).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
