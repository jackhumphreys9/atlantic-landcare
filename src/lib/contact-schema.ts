import { z } from "zod";

/**
 * Shared between the browser form and the API route so the two can never
 * disagree about what a valid submission looks like.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.email("Please enter a valid email address").max(200),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  inquiry: z.string().trim().max(100).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more about the project")
    .max(4000),
  /**
   * Honeypot. Hidden from real users via CSS, so anything in it is a bot.
   * We accept the request and silently discard it rather than returning an
   * error, which avoids teaching the bot what tripped the filter.
   */
  company: z.string().max(0).optional().or(z.string()),
});

export type ContactInput = z.infer<typeof contactSchema>;
