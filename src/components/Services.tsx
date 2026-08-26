import { services } from "@/site.config";

/** Simple line icons, keyed by the `icon` field in site.config.ts. */
const icons: Record<string, React.ReactNode> = {
  design: (
    <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
  ),
  hardscape: (
    <path d="M3 8h18M3 14h18M3 4h18v16H3zM9 4v4M15 8v6M9 14v6" />
  ),
  lawn: (
    <path d="M12 21V9M12 9c0-3 2-5 5-5 0 3-2 5-5 5zM12 12c0-3-2-5-5-5 0 3 2 5 5 5zM4 21h16" />
  ),
  water: (
    <path d="M12 3s6 6.5 6 10.5A6 6 0 0 1 6 13.5C6 9.5 12 3 12 3z" />
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
          From a single overgrown bed to a full property rebuild.
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
