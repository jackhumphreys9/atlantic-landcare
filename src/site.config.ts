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

  serviceArea: "Ocean Pines and the surrounding area",
  hours: "Mon–Sat, 7am–6pm",

  social: {
    // TODO(James): swap in the real Atlantic Landcare Facebook page URL.
    facebook: "https://facebook.com/",
  },

  /**
   * Where contact-form submissions get emailed.
   * Overridable without a code change via the CONTACT_TO_EMAIL env var.
   */
  contactInbox: "james@atlanticlandcarellc.com",
} as const;

/**
 * TODO(James): confirm this list. Stump grinding and property cleanups come
 * straight off the logo; the mulch bed and storm debris entries are inferred
 * from the project photos and reviews. Delete anything he doesn't actually want
 * to sell — the grid reflows on its own.
 */
export const services = [
  {
    title: "Stump Grinding",
    description:
      "Stumps ground below grade so you can plant, sod, or build over the top. One stump in a tight side yard or thirty across a lot — same machine, same result.",
    icon: "stump",
  },
  {
    title: "Property Cleanups",
    description:
      "Overgrown lots cut back, brush and briars pulled out, debris hauled off. Good for rentals between tenants, listings before photos, and yards that got away from you.",
    icon: "cleanup",
  },
  {
    title: "Storm Debris Removal",
    description:
      "Downed limbs and leftover trunks cleared after a storm — including the stump the road crew left behind when they opened the street back up.",
    icon: "storm",
  },
  {
    title: "Mulch Beds & Edging",
    description:
      "Fresh beds cut, edged, and mulched. Clean lines that hold their shape through the season instead of bleeding into the lawn.",
    icon: "mulch",
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
 * Videos. The section hides itself entirely when this array is empty.
 *
 * These two are served straight out of public/ and are ~95MB combined. Nothing
 * downloads until a visitor actually presses play (the gallery shows a poster
 * image and only mounts the player on click), but see the hosting note in the
 * README before committing them — putting video in the repo is the one decision
 * here that's genuinely hard to undo.
 *
 * TODO(James): retitle these — the captions are placeholders, written without
 * having watched the footage.
 */
export const videos: Video[] = [
  {
    kind: "mp4",
    src: "/before-after-1.mp4",
    poster: "/after-1.jpg",
    title: "Bed clearing, start to finish",
  },
  {
    kind: "mp4",
    src: "/before-after-2.mp4",
    poster: "/after-2.jpg",
    title: "Stump grinding, start to finish",
  },
];

/** Options in the contact form's "what do you need?" dropdown. */
export const inquiryTypes = [
  "Stump grinding",
  "Property cleanup",
  "Storm debris removal",
  "Mulch beds & edging",
  "Something else",
] as const;
