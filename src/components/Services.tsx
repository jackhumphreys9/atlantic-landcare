import { services } from "@/site.config";

/** Simple line icons, keyed by the `icon` field in site.config.ts. */
const icons: Record<string, React.ReactNode> = {
  stump: (
    <>
      <ellipse cx="12" cy="8" rx="5" ry="2.5" />
      <path d="M7 8v6c0 1.9 2.2 3.4 5 3.4s5-1.5 5-3.4V8" />
      <path d="M7 14c-1.5.8-2.5 1.9-3 3M17 14c1.5.8 2.5 1.9 3 3M3 21h18" />
    </>
  ),
  cleanup: (
    <>
      <path d="M12 3v8M6 11h12" />
      <path d="M6 11v5M9.6 11v5M13.2 11v5M16.8 11v5" />
      <path d="M3 21h18" />
    </>
  ),
  storm: (
    <>
      <path d="M13 2 5 13h6l-2 9 9-12h-6z" />
    </>
  ),
  mulch: (
    <>
      <path d="M3 10c3-2 6-2 9 0s6 2 9 0" />
      <path d="M3 15c3-2 6-2 9 0s6 2 9 0" />
      <path d="M3 20h18" />
    </>
  ),
};

export function Services() {
  return (
    <section id="services" className="bg-sand-100 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-3xl font-bold text-bark-900 sm:text-4xl">
          What we do
        </h2>
        <p className="mt-3 max-w-xl text-bark-700">
          One stubborn stump or a whole lot grown over — same phone number either way.
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div key={service.title}>
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-9 w-9 text-leaf-600"
              >
                {icons[service.icon]}
              </svg>
              <h3 className="mt-5 font-display text-xl font-semibold text-bark-900">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bark-700">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
