# Atlantic Landcare

Marketing site for Atlantic Landcare LLC — stump grinding and property cleanups,
owner-operated by James Yates.

One page: hero, services, before/after gallery, Facebook reviews, about, and a
contact form that emails James.

## Stack

| Piece | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js (App Router) + React + TypeScript | Frontend and backend in one project |
| Styling | Tailwind CSS v4 | Brand colors live in `src/app/globals.css` |
| Backend | One Next.js Route Handler | `src/app/api/contact/route.ts` — no separate server |
| Email | [Resend](https://resend.com) | Free tier covers 3,000 emails/month |
| Hosting | [Vercel](https://vercel.com) | Free Hobby tier is enough for this site |

## Running locally

```bash
npm install
cp .env.example .env.local   # optional for a first look
npm run dev
```

Open http://localhost:3000.

Without `RESEND_API_KEY`, the contact form still submits — the message prints to
your terminal instead of being emailed. That's intentional so you can build the
site before setting up email.

## Images

Original photos live in `assets-raw/`, which is **gitignored and never
deployed**. The versions the site actually uses are generated from them:

```bash
npm run prepare:images   # assets-raw/*  →  public/*.jpg
npm run check:images     # verify every path referenced in src/ exists
```

`prepare:images` does three things to each file:

1. **Crops the black letterbox bars.** These are phone screenshots, so each one
   arrived at full screen height with black bands above and below the photo —
   between 176px and 674px per edge, and not symmetrical, so a centered crop
   would have been wrong. The bars are detected per file.
2. **Caps the long edge at 1800px** (shrinking only, never upscaling).
3. **Re-encodes as JPEG.** The set went from 22MB to 4.8MB. Next.js shrinks them
   further on request — the largest lands around 210KB at typical display width.

It's safe to re-run: originals in `assets-raw/` are never modified. To add a new
photo, drop it in `assets-raw/` and run it again.

`assets-raw/reference/` holds the original Facebook review screenshots. They're
kept for reference only and are deliberately **not** published — they contain
reviewer names and profile photos, and the site shows the reviews anonymously.

### Current photos

| File | Photo |
| --- | --- |
| `logo.jpg` | Atlantic Landcare stump logo |
| `headshot.jpg` | James in the green polo |
| `before-1.jpg` / `after-1.jpg` | Overgrown corner → planted bed with brick edging |
| `before-2.jpg` / `after-2.jpg` | Grinder mid-job → lot graded flat |
| `before-3.jpg` / `after-3.jpg` | Cut trunks → ground flat to lawn height |

## 📹 Video — waiting on YouTube uploads

The two before/after clips are in `assets-raw/` (28MB and 62MB). They're
**deliberately not in the repo**: 95MB of video would live in git history
permanently, and every clone and Vercel build would pay for it.

They're going on YouTube instead. Once uploaded, take the id out of each URL
and add an entry to the `videos` array in `src/site.config.ts`:

```ts
// youtube.com/watch?v=AbCdEf12345
{ kind: "youtube", id: "AbCdEf12345", title: "Stump grind, start to finish" }
```

The video section hides itself while that array is empty, so the site is
complete and deployable without it. The three before/after photo pairs already
carry the story.

The gallery loads a thumbnail and only mounts the player on click, so extra
videos cost nothing until someone presses play.

## Editing the content

**Almost everything James will want changed lives in
[`src/site.config.ts`](src/site.config.ts)** — business details, the four
service cards, the gallery, and the reviews. You should rarely need to open a
component to update copy.

There are two `TODO(James)` comments in that file marking things that still
need his eyes:

1. **Service descriptions** — the seven service titles are his, but the sentence
   under each one was drafted here. Worth reading for anything that oversells.
2. **Gallery captions** — written from the photos, not from knowing the jobs.

Service area, service list, and the Facebook page URL are confirmed.

The contact form's dropdown is derived from the `services` array, so adding or
removing a service updates the form automatically.

### Adding a before/after pair

```ts
{
  title: "Back lot cleared",
  caption: "Optional line under the photos.",
  before: "/gallery/back-lot-before.jpg",
  after: "/gallery/back-lot-after.jpg",
}
```

`before` is optional — an entry with only `after` renders as one wide photo,
which is right for finished work with no useful before shot.

They're shown side by side rather than in a drag-slider, because the photos are
handheld from different angles and wouldn't line up in a slider.

### Reviews

The three Facebook recommendations are transcribed into the `testimonials` array
in `site.config.ts` and rendered as styled text cards. **Reviewer names are
deliberately omitted** — each card shows only the Facebook mark, "Recommended on
Facebook", and the post date. Set `featured: true` on one to render it
full-width above the others.

Underneath them, a link points at the Facebook reviews tab
(`site.social.facebookReviews`) for anyone who wants to verify them or read
more.

One transcription note: the first review reads "I still had a stomp to deal
with" on Facebook. That's an obvious typo for "stump" and it's corrected on the
site. Everything else is verbatim.

Live Facebook post embeds were tried and reverted — they drag Facebook's own
styling onto the page, show reviewer names and photos, load slowly, and go blank
if a post is ever deleted. The implementation is in git history at commit
`c44e946` if it's ever wanted back.

### Adding video

`site.config.ts` has an empty `videos` array and the video section hides itself
until there's something in it. Add a YouTube id and it appears:

```ts
{ kind: "youtube", id: "AbCdEf12345", title: "Stump grind, start to finish" }
```

The gallery loads a thumbnail and only mounts the player on click, so extra
videos cost nothing until they're played.

**On self-hosting video:** the config also supports `{ kind: "mp4", src, poster }`
for files in `/public`. It works, but video bandwidth is the one thing that can
turn a free Vercel project into a bill. Use YouTube unless there's a reason not
to; [Cloudflare Stream](https://www.cloudflare.com/products/cloudflare-stream/)
is about $5/month if he wants a player without YouTube branding.

### Changing the colors

The brand colors are defined at the top of `src/app/globals.css` under `@theme`,
sampled from the logo — dark green, cream, and the gold from the sun behind the
stump. Change those values and the whole site re-skins; components only
reference the names (`bark-900`, `leaf-600`, `sand-50`, `sun-500`).

### A real hero photo

The hero currently uses a green gradient. Drop a wide shot at `public/hero.jpg`
and replace the placeholder `div` in
[`src/components/Hero.tsx`](src/components/Hero.tsx) with:

```tsx
import Image from "next/image";

<Image src="/hero.jpg" alt="" fill priority className="object-cover" />
```

The dark overlay is already in place, so the white text stays readable.

## Setting up email

1. Sign up at [resend.com](https://resend.com) and create an API key.
2. Put it in `.env.local` as `RESEND_API_KEY`.
3. Set `CONTACT_TO_EMAIL` to James's inbox.

While testing, the default sender `onboarding@resend.dev` only delivers to the
address you registered with. To send to James's real inbox, verify the
`atlanticlandcarellc.com` domain in Resend (a few DNS records) and set
`CONTACT_FROM_EMAIL` to something like `website@atlanticlandcarellc.com`.

## Deploying to Vercel

1. Push this repo to GitHub.
2. At [vercel.com/new](https://vercel.com/new), import the repo. Vercel detects
   Next.js — accept every default.
3. Add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` under
   **Settings → Environment Variables**, then redeploy.

Every push to `main` deploys to production; every pull request gets its own
preview URL you can send to James for feedback.

### Custom domain

He already owns `atlanticlandcarellc.com` (it's in his email), so point it at
Vercel under **Settings → Domains**. HTTPS is automatic and free.

## Spam

The form has a honeypot field that catches most low-effort bots. If real spam
starts arriving, the next step is rate limiting with
[Upstash Redis](https://upstash.com) (free tier) or swapping the honeypot for
Cloudflare Turnstile — both drop into `src/app/api/contact/route.ts` without
touching the frontend.

## Useful commands

```bash
npm run dev              # local dev server
npm run build            # production build
npm run lint             # eslint
npm run prepare:images   # crop + compress assets-raw/ into public/
npm run check:images     # verify every referenced image exists in public/
```
