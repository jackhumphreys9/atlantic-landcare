import { site } from "@/site.config";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bark-900">
      {/*
       * Placeholder backdrop. Drop a wide photo at /public/hero.jpg and swap this
       * div for a <next/image fill> — the overlay and text below already assume a
       * dark background, so nothing else needs to change.
       */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,var(--color-leaf-600),transparent_60%),radial-gradient(ellipse_at_75%_80%,var(--color-bark-700),transparent_55%)]"
      />
      <div aria-hidden className="absolute inset-0 bg-bark-900/40" />

      <div className="relative mx-auto max-w-6xl px-5 py-28 sm:py-36">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sun-500">
          {site.descriptor} · {site.serviceAreaSummary}
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-6xl">
          {site.tagline}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-sand-100">
          {site.description}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#contact"
            className="rounded-full bg-leaf-500 px-8 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-leaf-600"
          >
            Request a free quote
          </a>
          <a
            href={`tel:${site.phoneHref}`}
            className="rounded-full border border-white/30 px-8 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
