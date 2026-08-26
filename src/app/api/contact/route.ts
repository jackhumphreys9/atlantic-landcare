import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { site } from "@/site.config";

/**
 * The entire backend. A single POST endpoint that validates a contact form and
 * emails it to the owner.
 *
 * Runs as a serverless function on Vercel — there is no server to keep alive.
 */

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]!,
  );

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the form and try again.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { name, email, phone, inquiry, message, company } = parsed.data;

  // Honeypot tripped: report success so the bot moves on, but send nothing.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.contactInbox;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  // Local development without a key: log instead of failing, so the form is
  // still testable before the email account exists.
  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.info("[contact] No RESEND_API_KEY set — submission not emailed:", {
        name,
        email,
        phone,
        inquiry,
        message,
      });
      return NextResponse.json({ ok: true, delivered: false });
    }
    console.error("[contact] RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "The contact form is temporarily unavailable. Please call us instead." },
      { status: 500 },
    );
  }

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Interested in", inquiry || "Not specified"],
  ];

  const html = `
    <h2>New enquiry from ${escapeHtml(site.name)}</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="color:#666">${escapeHtml(label)}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`,
        )
        .join("")}
    </table>
    <h3>Message</h3>
    <p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `${site.name} Website <${from}>`,
      to: [to],
      // Lets the owner hit "Reply" and reach the customer directly.
      replyTo: email,
      subject: `New enquiry from ${name}${inquiry ? ` — ${inquiry}` : ""}`,
      html,
      text: [...rows.map(([l, v]) => `${l}: ${v}`), "", "Message:", message].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return NextResponse.json(
        { error: "We couldn't send your message. Please call us instead." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] Unexpected failure sending message:", err);
    return NextResponse.json(
      { error: "We couldn't send your message. Please call us instead." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
