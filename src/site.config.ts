/**
 * Single source of truth for everything business-specific on the site.
 *
 * This is the file to edit when James wants to change a phone number, add a
 * testimonial, or swap in new project photos. Nothing here requires touching a
 * component.
 */

export type Video = {
  title: string;
  caption?: string;
  /**
   * Vertical sources — YouTube Shorts, phone footage — get a 9:16 frame at a
   * constrained width instead of the default 16:9.
   */
  vertical?: boolean;
  /**
   * Poster image shown before play. Optional for YouTube, where it defaults to
   * the video's own thumbnail; required for mp4, which has none.
   */
  poster?: string;
} & ({ kind: "youtube"; id: string } | { kind: "mp4"; src: string; poster: string });

export const site = {
  /**
   * Canonical origin, used for link previews, robots.txt, and the sitemap.
   * Set NEXT_PUBLIC_SITE_URL in Vercel once the real domain is attached; the
   * fallback is the domain on James's email address.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.atlanticlandcarellc.com",

  name: "Atlantic Landcare",
  legalName: "Atlantic Landcare LLC",
  /**
   * Used in <title>, the header's small subtitle, the hero eyebrow, and the
   * generated social-share image — everywhere the site's "title" actually
   * shows up. Broadened from "Stump Grinding & Property Cleanups" on
   * purpose: with seven services now listed, leading with just two of them
   * undersold the rest.
   */
  descriptor: "Landscaping & Property Care",
  // TODO(Jack): still stump/cleanup-specific — flagged, not changed, since
  // it's the big hero headline rather than literally "the title." Worth
  // revisiting alongside descriptor if the broader framing should carry
  // through here too.
  tagline: "Stumps gone. Property cleared.",
  description:
    "Owner-operated landscaping and property care — stump grinding, brush clearing, cleanups, and more. You deal with James from the first walkthrough to the last job done.",

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
    instagram: "https://www.instagram.com/atlanticlandcare",
  },

  /**
   * Where contact-form submissions get emailed.
   * Overridable without a code change via the CONTACT_TO_EMAIL env var.
   */
  contactInbox: "james@atlanticlandcarellc.com",
} as const;

/**
 * The service list James supplied. Titles are his; the descriptions and
 * `process` steps underneath were drafted here.
 *
 * `slug` drives /services/[slug] — a dedicated page per service, mainly for
 * search: a page titled "Stump Grinding in Coastal Maryland & Delaware" ranks
 * for that search in a way a single homepage section split seven ways can't.
 *
 * `process` is a short, honest description of how the job actually goes —
 * intentionally plain, not a sales pitch. Keeping it generic/trade-accurate
 * rather than specific (no named equipment, no promised turnaround times)
 * means it won't need correcting later even as the barebones copy gets
 * filled in.
 *
 * TODO(James): read the descriptions and process steps and correct anything
 * that oversells or misdescribes what's actually offered. The grid reflows
 * on its own, so services can be added or removed freely.
 */
export const services = [
  {
    slug: "stump-grinding",
    title: "Stump Grinding",
    description:
      "Stumps ground below grade so you can plant, sod, or build over the top. One stump in a tight side yard or thirty across a lot.",
    icon: "stump",
    process: [
      "Walk the site to check stump size, root flare, and anything nearby that needs working around — fences, septic, utility lines.",
      "Grind the stump and major surface roots down below grade with a compact, track-mounted grinder — the kind that fits through a gate, not a full-size truck-mounted rig.",
      "Backfill the hole with the ground-up wood where that works for you, or haul it off if you'd rather have it gone entirely.",
      "Rake the area level and walk the site together before leaving.",
    ],
  },
  {
    slug: "landscape-design",
    title: "Landscape Design",
    description:
      "Planning the space before anything goes in the ground — beds, borders, and how it will read once everything fills in.",
    icon: "design",
    process: [
      "Walk the property together — sun, drainage, what's already growing, and how the space actually gets used.",
      "Sketch out beds, borders, and layout before anything goes in the ground.",
      "Install in phases where that makes sense, rather than forcing it into one visit.",
      "Check back in after a season so beds can be adjusted once everything has filled in.",
    ],
  },
  {
    slug: "brush-clearing",
    title: "Brush Clearing",
    description:
      "Overgrown scrub, briars, and volunteer growth cut back to open, usable ground.",
    icon: "brush",
    process: [
      "Walk the property and mark what stays — trees and shrubs worth keeping — versus what comes out.",
      "Cut back scrub, briars, and volunteer growth by hand and with power equipment.",
      "Haul everything off site rather than leaving it in piles.",
      "Rake and grade the cleared ground so it's usable right away.",
    ],
  },
  {
    slug: "storm-debris-cleanup",
    title: "Storm Debris Cleanup",
    description:
      "Downed limbs and leftover trunks cleared after a storm — including the stump the road crew leaves behind.",
    icon: "storm",
    process: [
      "Check the site first for anything hazardous — hung-up limbs, a leaning tree — before cutting anything.",
      "Cut downed limbs and brush down to manageable pieces and haul them off.",
      "Grind out any stump a tree or road crew left behind, in the same visit if you'd like it done together.",
      "Leave the yard graded and walkable, not just picked up.",
    ],
  },
  {
    slug: "fall-cleanup",
    title: "Fall Cleanup",
    description:
      "Leaves cleared, spent growth cut back, and beds put to bed before winter sets in.",
    icon: "leaves",
    process: [
      "Clear leaves from the lawn and out of beds.",
      "Cut back spent annuals and perennials.",
      "Edge beds and refresh mulch heading into winter.",
      "Haul everything off — nothing left curbside in piles.",
    ],
  },
  {
    slug: "garden-bed-maintenance",
    title: "Garden Bed Maintenance",
    description:
      "Beds edged, weeded, and re-mulched so the lines stay sharp through the season instead of bleeding into the lawn.",
    icon: "beds",
    process: [
      "Weed beds and cut a clean edge against the lawn.",
      "Top off mulch where it's thinned out.",
      "Light pruning and deadheading as needed.",
      "Set up a recurring visit so it never gets away from you again.",
    ],
  },
  {
    slug: "power-washing",
    title: "Power Washing",
    description:
      "Siding, decks, patios, and walkways washed back toward their original color.",
    icon: "wash",
    process: [
      "Check the surface first — siding, deck wood versus composite, pavers — and pick the right pressure for it.",
      "Pre-treat any heavy mildew or algae buildup.",
      "Wash top-down on siding, or section by section on decks, patios, and walkways.",
      "Rinse and walk the surface to check for anything missed.",
    ],
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
  /**
   * Service titles (matching `services[].title`) this review is relevant to.
   * Used to show a real quote on that service's own page. Omit rather than
   * force a tag onto a review that doesn't actually speak to a service — the
   * page just skips that section.
   */
  services?: string[];
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "After the storm earlier this year, I had a down tree. Ocean Pines cleared the tree from the road, but I still had a stump to deal with. James stopped over twice as he was very willing to look for work and do the job. The first time he stopped over I still felt like I could do the stump and dirt by myself but by the second time, I realized that I needed to look for somebody else. He stopped over the second time and we agreed on the job. He gave me a very reasonable number and did all the work as agreed in a timely fashion. He exemplifies the exact working attitude that a young entrepreneur should have in contrast of the usual contractors in this area. I would highly recommend him as from start to finish was a seamless and painless transaction.",
    date: "Jun 17",
    featured: true,
    services: ["Stump Grinding", "Storm Debris Cleanup"],
  },
  {
    quote:
      "James ground down 30 stumps on my property on one of the hottest weekends of the summer. He is professional and does an outstanding job. I highly recommend him.",
    date: "Jul 19",
    services: ["Stump Grinding"],
  },
  {
    quote:
      "Excellent service, James was prompt, polite & a very hard worker, would recommend for any landscaping job!",
    date: "Jul 13",
  },
];

/**
 * Videos, hosted on YouTube so the files stay out of the repo. The section
 * hides itself entirely while this array is empty.
 *
 * Both of these are Shorts, so they're vertical. A Short embeds through the
 * ordinary /embed/<id> player — the only thing that changes is the frame shape.
 *
 * No `poster` set on purpose. YouTube crops a Short's thumbnail to 16:9, but
 * cropping that back to portrait lands on the middle of the original vertical
 * frame at close to full resolution, so it stays sharp and, unlike one of our
 * own photos, can't end up showing a different property than the video.
 */
export const videos: Video[] = [
  {
    kind: "youtube",
    id: "59cys31azag",
    vertical: true,
    title: "Yard cleanup, start to finish",
  },
  {
    kind: "youtube",
    id: "8UAL-Qmer3k",
    vertical: true,
    title: "Another cleanup, start to finish",
  },
];

/** Options in the contact form's "what do you need?" dropdown. */
export const inquiryTypes = [
  ...services.map((service) => service.title),
  "Something else",
] as const;
