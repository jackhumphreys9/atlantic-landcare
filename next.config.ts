import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Next's image optimizer needs a Node process with sharp, which a
     * Cloudflare Worker doesn't have — /_next/image just streams the original
     * file back, so leaving it on adds a redirect hop and buys nothing.
     *
     * Instead the images are pre-sized to what the layout actually renders by
     * `npm run prepare:images`. next/image still handles lazy loading and
     * reserves layout space; only resizing and format conversion are dropped.
     *
     * If they ever outgrow this, the upgrade is Cloudflare Image
     * Transformations plus a custom `loader` here — it needs a custom domain
     * and enabling the feature in the Cloudflare dashboard.
     */
    unoptimized: true,
  },
};

export default nextConfig;
