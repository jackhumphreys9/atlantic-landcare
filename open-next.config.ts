import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Adapter config for running this Next.js app on Cloudflare Workers.
 *
 * Deliberately empty. The incremental cache, tag cache, and queue that OpenNext
 * can wire up to KV and R2 all exist to support ISR — and this site has none.
 * The one page is fully static and the only dynamic route is the contact
 * endpoint, which has nothing worth caching.
 *
 * If a page ever starts using `revalidate`, add an incremental cache here.
 */
export default defineCloudflareConfig();
