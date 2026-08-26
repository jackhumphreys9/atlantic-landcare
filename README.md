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

## ⚠️ Images still needed

The site references eight photos that aren't in the repo yet. Until they're
added you'll see broken images. Check at any time with:

```bash
npm run check:images
```

Save the files at these exact paths:

| Path | Photo |
| --- | --- |
| `public/logo.png` | The Atlantic Landcare stump logo |
| `public/james.jpg` | James's headshot in the green polo |
| `public/gallery/stump-front-before.jpg` | Cut trunks still in the front yard, tan house behind |
| `public/gallery/stump-front-after.jpg` | Same yard ground flat, covered in chips |
| `public/gallery/lot-clearing-before.jpg` | Overgrown brush, sun through the trees |
| `public/gallery/lot-clearing-after.jpg` | Same area cleared, truck and trailer parked |
| `public/gallery/mulch-bed-after.jpg` | Black mulch bed with brick edging |
| `public/gallery/grinder-at-work.jpg` | The red stump grinder mid-job |

Two notes on the source files:

- **Use the original photos, not the phone screenshots.** The screenshots have
  black letterbox bars baked in, which will show up as black bands inside the
  rounded frames.
- Anything over ~2500px wide is wasted — Next.js resizes on the fly, but the
  original still has to be committed and uploaded.

## Editing the content

**Almost everything James will want changed lives in
[`src/site.config.ts`](src/site.config.ts)** — business details, the four
service cards, the gallery, and the reviews. You should rarely need to open a
component to update copy.

There are three `TODO(James)` comments in that file marking things that were
inferred rather than confirmed:

1. **Service area** — "Ocean Pines and the surrounding area" is a guess from the
   reviews and photos.
2. **Service list** — stump grinding and property cleanups come off the logo;
   storm debris and mulch beds were inferred from photos and reviews.
3. **Facebook URL** — currently a placeholder, used in the footer link.

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

The three Facebook recommendations are transcribed in `site.config.ts`.
**Reviewer names are deliberately omitted** — each card shows only the Facebook
mark, "Recommended on Facebook", and the post date. Set `featured: true` on one
review to render it full-width above the others.

One transcription note: the first review reads "I still had a stomp to deal
with" on Facebook. That's an obvious typo for "stump" and it's corrected on the
site. Everything else is verbatim.

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
npm run dev            # local dev server
npm run build          # production build
npm run lint           # eslint
npm run check:images   # verify every referenced image exists in public/
```
