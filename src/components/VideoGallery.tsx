"use client";

import { useState } from "react";
import { videos, type Video } from "@/site.config";

/**
 * Videos load as a "facade": we render a thumbnail and only mount the real
 * player once someone clicks. A YouTube iframe pulls in roughly a megabyte of
 * script, so embedding three of them directly would dominate the page's load
 * time for visitors who never press play.
 */
function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="aspect-video overflow-hidden rounded-2xl bg-black">
        {video.kind === "youtube" ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        ) : (
          <video
            src={video.src}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            className="h-full w-full"
          />
        )}
      </div>
    );
  }

  const thumbnail =
    video.kind === "youtube"
      ? `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`
      : video.poster;

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${video.title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-bark-700"
    >
      {/*
       * Plain <img> rather than next/image: these are remote thumbnails that
       * benefit from no optimization, and it lets us fall back cleanly when
       * YouTube has no maxres version of a given video.
       */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnail}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(event) => {
          if (video.kind !== "youtube") return;
          const img = event.currentTarget;
          const fallback = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
          if (img.src !== fallback) img.src = fallback;
        }}
      />
      <span className="absolute inset-0 bg-gradient-to-t from-bark-900/70 via-transparent to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-bark-900">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}

export function VideoGallery() {
  return (
    <section id="work" className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-3xl font-bold text-bark-900 sm:text-4xl">
          See the work
        </h2>
        <p className="mt-3 max-w-xl text-bark-700">
          Real projects, start to finish. No stock footage.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {videos.map((video, index) => (
            <figure
              key={`${video.title}-${index}`}
              className={index === 0 ? "md:col-span-2" : undefined}
            >
              <VideoCard video={video} />
              <figcaption className="mt-4">
                <p className="font-display text-lg font-semibold text-bark-900">
                  {video.title}
                </p>
                {video.caption && (
                  <p className="mt-1 text-sm text-bark-700">{video.caption}</p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
