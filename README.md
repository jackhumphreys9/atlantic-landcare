# Landscaping Business Website

A marketing site built with Next.js. One page: hero, services, video gallery,
testimonials, and a contact form that emails the owner.

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

## Editing the content

**Almost everything the owner will want changed lives in
[`src/site.config.ts`](src/site.config.ts).** Business name, phone, email,
service area, the four service cards, the video list, and the testimonials are
all there. You should rarely need to open a component to update copy.

### Adding a video

Upload to YouTube (unlisted is fine if they don't want it public), then add the
id from the URL:

```ts
// youtube.com/watch?v=AbCdEf12345
{ kind: "youtube", id: "AbCdEf12345", title: "Patio rebuild", caption: "..." }
```

The gallery shows a thumbnail and only loads the YouTube player when someone
clicks, so extra videos cost nothing until they're played.

**On self-hosting video:** `site.config.ts` also supports
`{ kind: "mp4", src, poster }` for files in `/public`. It works, but be careful
— Vercel's free tier includes limited bandwidth, and video is the one thing that
can blow through it. A single popular 50MB clip can do real damage. Use YouTube
unless you have a reason not to; if you need player control without the YouTube
branding, [Cloudflare Stream](https://www.cloudflare.com/products/cloudflare-stream/)
is about $5/month.

### Changing the colors

The six brand colors are defined at the top of `src/app/globals.css` under
`@theme`. Change those hex values and the entire site re-skins — components only
reference the names (`bark-900`, `leaf-600`, `sand-50`, and so on).

### Adding a real hero photo

Drop a wide image at `public/hero.jpg`, then replace the placeholder gradient
`div` in [`src/components/Hero.tsx`](src/components/Hero.tsx) with:

```tsx
import Image from "next/image";

<Image src="/hero.jpg" alt="" fill priority className="object-cover" />
```

The dark overlay below it is already in place, so the white text stays readable.

## Setting up email

1. Sign up at [resend.com](https://resend.com) and create an API key.
2. Put it in `.env.local` as `RESEND_API_KEY`.
3. Set `CONTACT_TO_EMAIL` to the owner's inbox.

While you're testing, the default sender `onboarding@resend.dev` only delivers
to the address you registered with. To send to the owner's real inbox, verify a
domain in Resend (a few DNS records) and set `CONTACT_FROM_EMAIL` to an address
on that domain.

## Deploying to Vercel

1. Push this repo to GitHub.
2. At [vercel.com/new](https://vercel.com/new), import the repo. Vercel detects
   Next.js — accept every default.
3. Add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` under
   **Settings → Environment Variables**, then redeploy.

Every push to `main` deploys to production; every pull request gets its own
preview URL you can send to the owner for feedback.

### Custom domain

Buy the domain (Cloudflare and Porkbun are both around $10–15/year), then add it
in Vercel under **Settings → Domains** and follow the DNS instructions. HTTPS is
automatic and free.

## Spam

The form has a honeypot field that catches most low-effort bots. If real spam
starts arriving, the next step is rate limiting with
[Upstash Redis](https://upstash.com) (free tier) or swapping the honeypot for
Cloudflare Turnstile — both drop into `src/app/api/contact/route.ts` without
touching the frontend.

## Useful commands

```bash
npm run dev     # local dev server
npm run build   # production build — run before pushing if you changed much
npm run lint    # eslint
```
