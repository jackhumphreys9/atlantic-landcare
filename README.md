# Atlantic Landcare

Marketing site for Atlantic Landcare LLC — stump grinding and property cleanups,
owner-operated by James Yates.

One page: hero, services, before/after gallery, Facebook reviews, and about —
with a call/email/service-area block instead of a contact form, since James's
customers call.

## Stack

| Piece | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js (App Router) + React + TypeScript | Fully static — no backend |
| Styling | Tailwind CSS v4 | Brand colors live in `src/app/globals.css` |
| Hosting | [Cloudflare Workers](https://workers.cloudflare.com) via [OpenNext](https://opennext.js.org/cloudflare) | Free tier, and unlike Vercel's Hobby plan it permits commercial use |

## Running locally

```bash
npm install
cp .env.example .env.local   # optional for a first look
npm run dev
```

Open http://localhost:3000.

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
2. **Caps the long edge at 1000px** (shrinking only, never upscaling).
3. **Re-encodes as JPEG.** The set went from 22MB to 1.8MB.

**These files are served exactly as generated.** Next's image optimizer needs a
Node process with sharp, which a Cloudflare Worker doesn't have, so
`images.unoptimized` is set in `next.config.ts` and the sizes above are sized
against the real layout — the widest any photo renders is the ~530px
single-column gallery slot, so 1000px covers 2x displays. next/image still does
lazy loading and reserves layout space; only resizing and format conversion are
gone. If that ever isn't enough, the upgrade is Cloudflare Image Transformations
plus a custom `loader`.

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

## Deploying to Cloudflare

The site runs as a Cloudflare Worker via the
[OpenNext adapter](https://opennext.js.org/cloudflare), which turns the ordinary
`next build` output into something Workers can run. Nothing about how you write
the app changes — `npm run dev` is still plain Next.js.

> Cloudflare's docs now point at **vinext** as their default Next.js path. It's
> still beta, so this uses OpenNext, which is GA.

```bash
npm run cf:preview   # build + run the real Worker locally on :8787
npm run cf:deploy    # build + push it live
```

`cf:preview` is worth running before any deploy — it uses the actual Workers
runtime, which catches things `npm run dev` won't.

### First deploy

```bash
npx wrangler login   # opens the browser once
npm run cf:deploy
```

That publishes to `atlantic-landcare.<your-subdomain>.workers.dev`.

There are no runtime secrets — the site has no backend. `NEXT_PUBLIC_SITE_URL`
is the only environment variable, and it's baked in at **build** time, not read
at runtime. It falls back to `https://www.atlanticlandcarellc.com` in
`site.config.ts`, which is already correct, so it only needs setting if the
domain changes.

### Deploy on push

Optional, and nicer once set up: Cloudflare dashboard → **Workers & Pages** →
**Create** → **Import a repository**. Point it at the GitHub repo with:

- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx wrangler deploy`

Every push to `main` then deploys on its own.

### Custom domain

Cloudflare dashboard → the Worker → **Settings** → **Domains & Routes** → **Add
custom domain**. If the domain's nameservers point at Cloudflare, DNS and HTTPS
are handled for you. Otherwise add the records Cloudflare shows you at whatever
DNS host the domain uses.

**Don't remove the `MX` or `TXT` records on `atlanticlandcarellc.com`** —
Google Workspace runs James's email on that domain, and deleting them stops his
mail silently.

## Useful commands

```bash
npm run dev              # local dev server
npm run build            # production build
npm run lint             # eslint
npm run prepare:images   # crop + compress assets-raw/ into public/
npm run check:images     # verify every referenced image exists in public/
npm run cf:preview       # run the real Cloudflare Worker locally on :8787
npm run cf:deploy        # build + deploy to Cloudflare
```
