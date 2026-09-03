import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Adapter config for running this Next.js app on Cloudflare Workers.
 *
 * Deliberately empty. The incremental cache, tag cache, and queue that OpenNext
 * can wire up to KV and R2 all exist to support ISR — and this site is fully
 * static, with no dynamic routes at all.
 *
 * If a page ever starts using `revalidate`, add an incremental cache here.
 */
export default defineCloudflareConfig();
