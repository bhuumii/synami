import { NextResponse } from "next/server";
import { careerSchema, MAX_RESUME_BYTES } from "@/lib/career-schema";
import { writeClient } from "@/sanity/lib/writeClient";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = careerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again" },
      { status: 400 }
    );
  }

  const data = parsed.data;

  if (data.website) return NextResponse.json({ ok: true }); // bot

  // Re-check the real decoded size. The browser check is a convenience;
  // this is the one that counts.
  const approxBytes = Math.floor((data.resumeData.length * 3) / 4);
  if (approxBytes > MAX_RESUME_BYTES) {
    return NextResponse.json(
      { error: "That file is too large. Please keep your resume under 3 MB." },
      { status: 400 }
    );
  }

  const submittedAt = new Date().toISOString();
  const name = `${data.firstName} ${data.lastName}`;

  /* Email FIRST here — unlike the enquiry form.
     The resume only exists in that email, so if it fails to send, the
     application is effectively lost and we must tell the applicant. */
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CAREERS_NOTIFY_EMAIL;

  if (!apiKey || !to) {
    return NextResponse.json(
      { error: "Applications aren't being accepted right now. Please email us directly." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "Synami Careers <onboarding@resend.dev>",
        to: [to],
        reply_to: data.email,
        subject: `Job application — ${name}`,
        text: [
          `Name:  ${name}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone}`,
          "",
          "Message:",
          data.message,
          "",
          `Resume attached: ${data.resumeName}`,
          `Received: ${new Date(submittedAt).toUTCString()}`,
        ].join("\n"),
        attachments: [{ filename: data.resumeName, content: data.resumeData }],
      }),
    });

    if (!res.ok) {
      console.error("Resend rejected the application email:", await res.text());
      return NextResponse.json(
        { error: "We couldn't send your application. Please email us directly." },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Failed to send application email:", err);
    return NextResponse.json(
      { error: "We couldn't send your application. Please email us directly." },
      { status: 500 }
    );
  }

  /* Record the application (without the file) so it's countable in the
     Studio. Best-effort — the email already went, so a failure here must
     not tell the applicant their application failed. */
  try {
    await writeClient.create({
      _type: "jobApplication",
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      message: data.message,
      resumeName: data.resumeName,
      submittedAt,
    });
  } catch (err) {
    console.error("Application emailed, but not recorded in Sanity:", err);
  }

  return NextResponse.json({ ok: true });
}
