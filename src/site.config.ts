/**
 * Single source of truth for everything business-specific on the site.
 *
 * This is the file to edit when the owner wants to change a phone number, add a
 * testimonial, or swap in a new video. Nothing here requires touching a component.
 */

export type Video =
  | { kind: "youtube"; id: string; title: string; caption?: string }
  | { kind: "mp4"; src: string; poster: string; title: string; caption?: string };

export const site = {
  name: "Evergreen Landscaping",
  tagline: "Yards worth coming home to.",
  description:
    "Full-service landscape design, installation, and maintenance. Family owned and serving the local area for over a decade.",

  phone: "(555) 123-4567",
  // Digits only — used for the tel: link so it dials correctly on mobile.
  phoneHref: "+15551234567",
  email: "hello@example.com",

  serviceArea: "Greater Springfield and surrounding towns",
  hours: "Mon–Fri, 7am–5pm",

  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },

  /**
   * Where contact-form submissions get emailed. Usually the owner's inbox.
   * Overridable without a code change via the CONTACT_TO_EMAIL env var.
   */
  contactInbox: "owner@example.com",
} as const;

export const services = [
  {
    title: "Landscape Design",
    description:
      "We plan the whole yard before a single shovel hits dirt — planting beds, hardscape, drainage, and how it will look in five years.",
    icon: "design",
  },
  {
    title: "Installation & Hardscape",
    description:
      "Patios, retaining walls, walkways, and planting. Built to drain properly and survive winter.",
    icon: "hardscape",
  },
  {
    title: "Lawn Care & Maintenance",
    description:
      "Mowing, fertilization, aeration, and seasonal cleanups on a schedule you don't have to think about.",
    icon: "lawn",
  },
  {
    title: "Irrigation",
    description:
      "Sprinkler and drip system install, repair, and spring/fall service so nothing dries out or freezes.",
    icon: "water",
  },
] as const;

/**
 * Videos shown in the gallery.
 *
 * YouTube is the recommended default — free, and it handles all the bandwidth.
 * Grab the id from the URL: youtube.com/watch?v=THIS_PART
 *
 * The `mp4` kind exists for short clips you host yourself, but read the hosting
 * note in the README before using it — video bandwidth is the one thing that can
 * turn a free Vercel project into a bill.
 */
export const videos: Video[] = [
  {
    kind: "youtube",
    id: "dQw4w9WgXcQ",
    title: "Full backyard transformation",
    caption: "A sloped, unusable back lot rebuilt into a terraced patio and lawn.",
  },
  {
    kind: "youtube",
    id: "dQw4w9WgXcQ",
    title: "Retaining wall build, start to finish",
    caption: "Three days of block work compressed into two minutes.",
  },
  {
    kind: "youtube",
    id: "dQw4w9WgXcQ",
    title: "Spring cleanup on a half-acre",
    caption: "What a seasonal maintenance visit actually looks like.",
  },
];

export const testimonials = [
  {
    quote:
      "They regraded our whole backyard so it finally drains, and then made it look good on top of that. First spring in six years without standing water.",
    author: "Dana R.",
    location: "Springfield",
  },
  {
    quote:
      "Showed up when they said, cleaned up every day, and the patio came in under what two other companies quoted. I've already recommended them twice.",
    author: "Marcus T.",
    location: "Fairview",
  },
  {
    quote:
      "We've been on their maintenance plan for three years. I genuinely never think about the yard anymore, which is exactly what I was paying for.",
    author: "Priya S.",
    location: "Northgate",
  },
];

/** Options in the contact form's "what do you need?" dropdown. */
export const inquiryTypes = [
  "Landscape design",
  "Installation or hardscape",
  "Lawn care & maintenance",
  "Irrigation",
  "Something else",
] as const;
