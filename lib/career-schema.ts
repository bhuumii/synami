import { z } from "zod";

/** Resume cap. Vercel's serverless request limit is 4.5 MB and base64
 *  inflates a file by roughly a third, so 3 MB of actual file is the safe
 *  ceiling. A CV that exceeds it is almost always an unoptimised export. */
export const MAX_RESUME_BYTES = 3 * 1024 * 1024;

export const ACCEPTED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const careerSchema = z.object({
  firstName: z.string().trim().min(2, "Please enter your first name").max(60),
  lastName: z.string().trim().min(1, "Please enter your last name").max(60),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .email("That doesn't look like a valid email address")
    .max(160),
  phone: z.string().trim().min(6, "Please enter your phone number").max(40),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little about yourself")
    .max(3000),

  /* Resume arrives as base64 plus its metadata. */
  resumeName: z.string().min(1, "Please attach your resume").max(200),
  resumeType: z.string().refine((t) => ACCEPTED_RESUME_TYPES.includes(t), {
    message: "Please upload a PDF or Word document",
  }),
  resumeData: z.string().min(1, "Please attach your resume"),

  /* Honeypot */
  website: z.string().max(0).optional(),
});

export type CareerInput = z.infer<typeof careerSchema>;
