"use client";

import { useState } from "react";
import { contactSchema } from "@/lib/contact-schema";
import { inquiryTypes, site } from "@/site.config";

type Status = "idle" | "submitting" | "sent" | "error";

const fieldClass =
  "w-full rounded-lg border border-sand-300 bg-white px-4 py-3 text-bark-900 outline-none transition-colors placeholder:text-bark-700/40 focus:border-leaf-600 focus:ring-2 focus:ring-leaf-600/20";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const data = Object.fromEntries(new FormData(event.currentTarget));

    // Validate in the browser first so obvious mistakes never cost a round trip.
    // The API route re-validates with this same schema — this check is a
    // convenience, not the security boundary.
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors(
        Object.fromEntries(
          Object.entries(fieldErrors).map(([key, messages]) => [key, messages![0]]),
        ),
      );
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        setFormError(payload.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setFormError(
        "We couldn't reach the server. Please check your connection or call us.",
      );
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-leaf-600/30 bg-white p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-leaf-100">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7 text-leaf-600"
          >
            <path d="m5 13 4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold text-bark-900">
          Thanks — we got it.
        </h3>
        <p className="mt-2 text-bark-700">
          We usually reply within one business day. Thanks for reaching out!
          <a
            href={`tel:${site.phoneHref}`}
            className="font-semibold text-leaf-600 underline"
          >
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-sand-300 bg-white p-8 shadow-sm"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Jane Smith"
            className={fieldClass}
          />
        </Field>

        <Field label="Email" name="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            className={fieldClass}
          />
        </Field>

        <Field label="Phone" name="phone" optional error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={site.phone}
            className={fieldClass}
          />
        </Field>

        <Field label="What do you need?" name="inquiry" optional>
          <select id="inquiry" name="inquiry" defaultValue="" className={fieldClass}>
            <option value="">Select one…</option>
            {inquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Tell us about the project" name="message" error={errors.message}>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Roughly how big is the space, what are you hoping to change, and is there a timeline you're working toward?"
              className={`${fieldClass} resize-y`}
            />
          </Field>
        </div>
      </div>

      {/* Bot trap — hidden from real users. See .honeypot in globals.css. */}
      <div className="honeypot" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {formError && (
        <p role="alert" className="mt-5 text-sm font-medium text-red-700">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-7 w-full rounded-full bg-leaf-600 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-leaf-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      <p className="mt-4 text-center text-xs text-bark-700">
        We&apos;ll only use your details to reply about your project.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  optional,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-bark-900"
      >
        {label}
        {optional && <span className="font-normal text-bark-700"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm text-red-700">{error}</p>
      )}
    </div>
  );
}
