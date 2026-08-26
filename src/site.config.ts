/**
 * Single source of truth for everything business-specific on the site.
 *
 * This is the file to edit when James wants to change a phone number, add a
 * testimonial, or swap in new project photos. Nothing here requires touching a
 * component.
 */

export type Video =
  | { kind: "youtube"; id: string; title: string; caption?: string }
  | { kind: "mp4"; src: string; poster: string; title: string; caption?: string };

export const site = {
  /**
   * Canonical origin, used for link previews, robots.txt, and the sitemap.
   * Set NEXT_PUBLIC_SITE_URL in Vercel once the real domain is attached; the
   * fallback is the domain on James's email address.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.atlanticlandcarellc.com",

  name: "Atlantic Landcare",
  legalName: "Atlantic Landcare LLC",
  descriptor: "Stump Grinding & Property Cleanups",
  tagline: "Stumps gone. Property cleared.",
  description:
    "Owner-operated stump grinding and property cleanup. You deal with James from the first walkthrough to the last load hauled out.",

  owner: {
    name: "James Yates",
    // Shown beside the headshot in the About section.
    bio: "James runs Atlantic Landcare himself — he quotes the job, grinds the stumps, and cleans up the site. No crews to coordinate, no one to chase down for an answer, and the person who gave you the number is the person who shows up.",
  },

  phone: "(302) 581-9172",
  // Digits only — used for the tel: link so it dials correctly on mobile.
  phoneHref: "+13025819172",
  email: "james@atlanticlandcarellc.com",

  /** Short form for the hero, where the full town list won't fit. */
  serviceAreaSummary: "Coastal Maryland & Delaware",

  /**
   * Grouped by state for readability rather than kept in the order they were
   * given. The Maryland towns had their state added for clarity.
   */
  serviceArea: [
    "Berlin, MD",
    "Ocean Pines, MD",
    "Ocean City, MD",
    "West Ocean City, MD",
    "Bishopville, MD",
    "Snow Hill, MD",
    "Selbyville, DE",
    "Millsboro, DE",
    "Ocean View, DE",
  ],

  social: {
    facebook: "https://www.facebook.com/AtlanticLandcareLLC",
    /** Deep link straight to the reviews tab, used by the reviews button. */
    facebookReviews:
      "https://www.facebook.com/AtlanticLandcareLLC/reviews/?id=61589348813099&sk=reviews",
  },

  /**
   * Where contact-form submissions get emailed.
   * Overridable without a code change via the CONTACT_TO_EMAIL env var.
   */
  contactInbox: "james@atlanticlandcarellc.com",
} as const;

/**
 * The service list James supplied. Titles are his; the descriptions underneath
 * were drafted here.
 *
 * TODO(James): read the descriptions and correct anything that oversells or
 * misdescribes what's actually offered. The grid reflows on its own, so
 * services can be added or removed freely.
 */
export const services = [
  {
    title: "Stump Grinding",
    description:
      "Stumps ground below grade so you can plant, sod, or build over the top. One stump in a tight side yard or thirty across a lot.",
    icon: "stump",
  },
  {
    title: "Landscape Design",
    description:
      "Planning the space before anything goes in the ground — beds, borders, and how it will read once everything fills in.",
    icon: "design",
  },
  {
    title: "Brush Clearing",
    description:
      "Overgrown scrub, briars, and volunteer growth cut back to open, usable ground.",
    icon: "brush",
  },
  {
    title: "Storm Debris Cleanup",
    description:
      "Downed limbs and leftover trunks cleared after a storm — including the stump the road crew leaves behind.",
    icon: "storm",
  },
  {
    title: "Fall Cleanup",
    description:
      "Leaves cleared, spent growth cut back, and beds put to bed before winter sets in.",
    icon: "leaves",
  },
  {
    title: "Garden Bed Maintenance",
    description:
      "Beds edged, weeded, and re-mulched so the lines stay sharp through the season instead of bleeding into the lawn.",
    icon: "beds",
  },
  {
    title: "Power Washing",
    description:
      "Siding, decks, patios, and walkways washed back toward their original color.",
    icon: "wash",
  },
] as const;

export type GalleryItem = {
  title: string;
  caption?: string;
  /** Paths under /public. Both are shown side by side, labelled. */
  before?: string;
  after: string;
};

/**
 * Project photos.
 *
 * Source files live in assets-raw/ (gitignored). `npm run prepare:images` crops
 * the black bars off the phone screenshots, shrinks them, and writes the
 * versions referenced here into public/.
 *
 * `before` is optional — an entry with only an `after` renders as a single
 * wide photo, which is right for finished work with no useful before shot.
 *
 * TODO(James): the titles and captions below were written from the photos.
 * Correct anything that misdescribes the actual job.
 */
export const gallery: GalleryItem[] = [
  {
    title: "Overgrown corner to finished bed",
    caption:
      "Scrub and volunteer growth cleared out, then replanted, edged in brick, and finished in black mulch.",
    before: "/before-1.jpg",
    after: "/after-1.jpg",
  },
  {
    title: "Stump ground out, lot graded flat",
    caption:
      "A trunk and full root flare ground below grade, then the whole area raked level and cleaned up.",
    before: "/before-2.jpg",
    after: "/after-2.jpg",
  },
  {
    title: "Front yard stumps removed",
    caption:
      "Trunks cut flush and left behind by the tree crew, ground out and levelled back to lawn height.",
    before: "/before-3.jpg",
    after: "/after-3.jpg",
  },
];

/**
 * Facebook recommendations, transcribed from the review screenshots.
 *
 * Names are intentionally omitted — the site shows only that each one is a
 * Facebook recommendation. Nothing here should identify the reviewer.
 */
export type Testimonial = {
  quote: string;
  /** Date shown on the Facebook post. No year — Facebook omits it for the current year. */
  date: string;
  /** Exactly one may be featured; it renders full width above the others. */
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "After the storm earlier this year, I had a down tree. Ocean Pines cleared the tree from the road, but I still had a stump to deal with. James stopped over twice as he was very willing to look for work and do the job. The first time he stopped over I still felt like I could do the stump and dirt by myself but by the second time, I realized that I needed to look for somebody else. He stopped over the second time and we agreed on the job. He gave me a very reasonable number and did all the work as agreed in a timely fashion. He exemplifies the exact working attitude that a young entrepreneur should have in contrast of the usual contractors in this area. I would highly recommend him as from start to finish was a seamless and painless transaction.",
    date: "Jun 17",
    featured: true,
  },
  {
    quote:
      "James ground down 30 stumps on my property on one of the hottest weekends of the summer. He is professional and does an outstanding job. I highly recommend him.",
    date: "Jul 19",
  },
  {
    quote:
      "Excellent service, James was prompt, polite & a very hard worker, would recommend for any landscaping job!",
    date: "Jul 13",
  },
];

/**
 * Videos. The section hides itself entirely while this array is empty, so the
 * site is complete without it.
 *
 * The two before/after clips are waiting in assets-raw/ (gitignored). They're
 * going up on YouTube rather than being served from here — 95MB of video in the
 * repo would live in git history permanently. Once they're uploaded, take the
 * id out of each URL and add an entry:
 *
 *   // youtube.com/watch?v=AbCdEf12345
 *   { kind: "youtube", id: "AbCdEf12345", title: "Stump grind, start to finish" }
 *
 * The gallery loads a thumbnail and only mounts the player on click, so extra
 * videos cost nothing until someone presses play.
 */
export const videos: Video[] = [];

/** Options in the contact form's "what do you need?" dropdown. */
export const inquiryTypes = [
  ...services.map((service) => service.title),
  "Something else",
] as const;
