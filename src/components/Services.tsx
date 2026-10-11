import Link from "next/link";
import { services } from "@/site.config";
import { ServiceIcon } from "@/components/service-icons";

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
            <Link
              key={service.title}
              href={`/services/${service.slug}`}
              className="group block"
            >
              <ServiceIcon
                icon={service.icon}
                className="h-9 w-9 text-leaf-600"
              />
              <h3 className="mt-5 font-display text-xl font-semibold text-bark-900 group-hover:underline">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bark-700">
                {service.description}
              </p>
            </Link>
          ))}
        </div>

        <Link
          href="/services"
          className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-600 hover:underline"
        >
          View all services
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
