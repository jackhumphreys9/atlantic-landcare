import type { Metadata } from "next";
import Link from "next/link";
import { services, site } from "@/site.config";
import { ServiceIcon } from "@/components/service-icons";
import { ServiceCta } from "@/components/ServiceCta";

export const metadata: Metadata = {
  title: `Services — ${site.name}`,
  description: `Everything ${site.name} offers across ${site.serviceAreaSummary}: ${services
    .map((s) => s.title.toLowerCase())
    .join(", ")}.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-bark-900 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sun-500">
            {site.serviceAreaSummary}
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold text-white sm:text-5xl">
            Services
          </h1>
          <p className="mt-5 max-w-xl text-lg text-sand-100">
            {site.description}
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group rounded-2xl border border-sand-300 bg-white p-7 transition-colors hover:border-leaf-500"
              >
                <ServiceIcon
                  icon={service.icon}
                  className="h-9 w-9 text-leaf-600"
                />
                <h2 className="mt-5 font-display text-xl font-semibold text-bark-900 group-hover:underline">
                  {service.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-bark-700">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-600">
                  How it&apos;s done
                  <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>

          <ServiceCta
            heading="Don't see exactly what you need?"
            subhead="Call or text — most jobs are some mix of the above."
          />
        </div>
      </section>
    </>
  );
}
