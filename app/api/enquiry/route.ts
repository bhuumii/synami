import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry-schema";
import { writeClient } from "@/sanity/lib/writeClient";

/**
 * Receives an enquiry, saves it to Sanity, then emails a notification.
 *
 * Order matters. The save happens FIRST and the email second, because email
 * is the more fragile of the two — a Resend outage or a quota limit must
 * never cost the client a lead. If the email fails we log it and still
 * return success, since the enquiry is safely stored either way.
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again" },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot filled means a bot. Return 200 so it doesn't learn anything.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const submittedAt = new Date().toISOString();

  try {
    await writeClient.create({
      _type: "lead",
      name: data.name,
      company: data.company,
      country: data.country,
      email: data.email,
      phone: data.phone || undefined,
      requirement: data.requirement || undefined,
      message: data.message,
      submittedAt,
    });
  } catch (err) {
    console.error("Failed to save enquiry to Sanity:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please email us directly." },
      { status: 500 }
    );
  }

  // Notification email. Best-effort — never blocks a successful response.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_NOTIFY_EMAIL;

  if (apiKey && to) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "Synami Website <onboarding@resend.dev>",
          to: [to],
          reply_to: data.email,
          subject: `New enquiry — ${data.company} (${data.country})`,
          text: [
            `Name:        ${data.name}`,
            `Company:     ${data.company}`,
            `Country:     ${data.country}`,
            `Email:       ${data.email}`,
            `Phone:       ${data.phone || "—"}`,
            `Requirement: ${data.requirement || "—"}`,
            "",
            "Message:",
            data.message,
            "",
            `Received: ${new Date(submittedAt).toUTCString()}`,
          ].join("\n"),
        }),
      });
    } catch (err) {
      console.error("Enquiry saved, but notification email failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
