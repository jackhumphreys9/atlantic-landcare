import Image from "next/image";
import { site } from "@/site.config";

export function About() {
  return (
    <section id="about" className="bg-sand-100 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[0.8fr_1fr]">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-sand-300">
          <Image
            src="/james.jpg"
            alt={`${site.owner.name}, owner of ${site.name}`}
            fill
            sizes="(min-width: 1024px) 400px, 90vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf-600">
            Who you&apos;re hiring
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-bark-900 sm:text-4xl">
            Meet {site.owner.name.split(" ")[0]}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-bark-700">
            {site.owner.bio}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="rounded-full bg-leaf-600 px-7 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-leaf-500"
            >
              Get a free quote
            </a>
            <a
              href={`tel:${site.phoneHref}`}
              className="rounded-full border border-bark-900/20 px-7 py-3.5 text-center text-sm font-semibold text-bark-900 transition-colors hover:bg-white"
            >
              Call {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
