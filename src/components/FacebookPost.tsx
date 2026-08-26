"use client";

import { useEffect, useRef, useState } from "react";
import { EMBED_WIDTH, type FacebookEmbed } from "@/site.config";

/**
 * A single Facebook post embed.
 *
 * Two things the raw embed code doesn't handle on its own:
 *
 * 1. **Width.** Facebook renders the post at whatever `width` is in the plugin
 *    URL and does not reflow — on a phone the card is simply clipped. Since the
 *    supplied height is the height *at that width*, scaling the whole frame
 *    keeps it proportional. The wrapper's height is scaled to match so the
 *    layout doesn't leave a gap underneath.
 *
 * 2. **Cost.** Each embed pulls in Facebook's player and tracking. Three of them
 *    firing on page load is a heavy start for a page most visitors open to find
 *    a phone number, so the iframe isn't mounted until it's near the viewport.
 */
export function FacebookPost({
  embed,
  index,
}: {
  embed: FacebookEmbed;
  index: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      // Never scale up — the embed is only sharp at its native width.
      setScale(Math.min(1, entry.contentRect.width / EMBED_WIDTH));
    });
    resizeObserver.observe(element);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          intersectionObserver.disconnect();
        }
      },
      // Start loading slightly before it scrolls into view.
      { rootMargin: "400px" },
    );
    intersectionObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[500px] overflow-hidden rounded-xl bg-white"
      style={{ height: embed.height * scale }}
    >
      {shouldLoad ? (
        <iframe
          src={embed.src}
          width={EMBED_WIDTH}
          height={embed.height}
          title={`Facebook recommendation ${index + 1}`}
          loading="lazy"
          scrolling="no"
          // Trimmed from Facebook's default list: these are text posts, so
          // there's nothing for autoplay or fullscreen to act on.
          allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
          style={{
            border: "none",
            overflow: "hidden",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        />
      ) : (
        // Holds the space so nothing jumps when the embed mounts.
        <div aria-hidden className="h-full w-full animate-pulse bg-sand-100" />
      )}
    </div>
  );
}
