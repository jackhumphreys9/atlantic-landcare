import Image from "next/image";
import { gallery, type GalleryItem } from "@/site.config";

/**
 * Before/after photos are shown side by side rather than in a drag-slider.
 * The shots are handheld from different angles and distances, so they don't
 * register on top of each other — a slider would just look broken. Two labelled
 * frames read correctly regardless of how the photos were taken.
 */
function Frame({
  src,
  label,
  title,
}: {
  src: string;
  label: "Before" | "After";
  title: string;
}) {
  const isAfter = label === "After";
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-sand-100">
      <Image
        src={src}
        alt={`${title} — ${label.toLowerCase()}`}
        fill
        sizes="(min-width: 768px) 45vw, 90vw"
        className="object-cover"
      />
      <span
        className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
          isAfter ? "bg-leaf-600 text-white" : "bg-bark-900/75 text-white"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function Item({ item }: { item: GalleryItem }) {
  return (
    <figure>
      {item.before ? (
        <div className="grid grid-cols-2 gap-3">
          <Frame src={item.before} label="Before" title={item.title} />
          <Frame src={item.after} label="After" title={item.title} />
        </div>
      ) : (
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sand-100">
          <Image
            src={item.after}
            alt={item.title}
            fill
            sizes="(min-width: 768px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
      )}

      <figcaption className="mt-4">
        <p className="font-display text-lg font-semibold text-bark-900">
          {item.title}
        </p>
        {item.caption && (
          <p className="mt-1 text-sm leading-relaxed text-bark-700">{item.caption}</p>
        )}
      </figcaption>
    </figure>
  );
}

export function Gallery() {
  if (gallery.length === 0) return null;

  return (
    <section id="work" className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-3xl font-bold text-bark-900 sm:text-4xl">
          Before &amp; after
        </h2>
        <p className="mt-3 max-w-xl text-bark-700">
          Real jobs on real properties. No stock photos.
        </p>

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          {gallery.map((item) => (
            <Item key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
