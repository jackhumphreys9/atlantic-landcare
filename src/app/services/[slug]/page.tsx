import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, site, testimonials } from "@/site.config";
import { ServiceIcon } from "@/components/service-icons";
import { ServiceCta } from "@/components/ServiceCta";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

function findService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};

  const title = `${service.title} in ${site.serviceAreaSummary} | ${site.name}`;
  return {
    title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title, description: service.description },
  };
}

export default async function ServicePage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const service = findService(slug);
  if (!service) notFound();

  // Prefer a review tagged for this service alone over one tagged for several
  // — otherwise a broad review tagged early in the array (like the featured
  // one, tagged for both Stump Grinding and Storm Debris Cleanup) shadows a
  // more specific one further down (the "30 stumps" review) on every page it
  // also matches.
  const review =
    testimonials.find((t) => t.services?.length === 1 && t.services[0] === service.title) ??
    testimonials.find((t) => t.services?.includes(service.title));
  const otherServices = services.filter((s) => s.slug !== service.slug);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: `${service.title} — ${site.name}`,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: site.legalName,
      telephone: site.phoneHref,
      email: site.email,
    },
    areaServed: site.serviceArea.map((town) => ({ "@type": "City", name: town })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-bark-900 py-20">
        <div className="mx-auto max-w-4xl px-5">
          <Link
            href="/services"
            className="text-sm font-medium text-sand-100 hover:text-white"
          >
            ← All services
          </Link>

          <div className="mt-6 flex items-start gap-5">
            <ServiceIcon
              icon={service.icon}
              className="mt-1 h-10 w-10 shrink-0 text-leaf-500"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sun-500">
                {site.serviceAreaSummary}
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                {service.title}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-sand-100">
                {service.description}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`tel:${site.phoneHref}`}
              className="rounded-full bg-leaf-500 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-leaf-600"
            >
              Call {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Email {site.owner.name.split(" ")[0]}
            </a>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-5">
          <h2 className="font-display text-2xl font-bold text-bark-900">
            How it&apos;s done
          </h2>
          <ol className="mt-8 space-y-6">
            {service.process.map((step, index) => (
              <li key={step} className="flex gap-5">
                <span className="font-display text-xl font-bold text-leaf-500/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="pt-0.5 leading-relaxed text-bark-700">{step}</p>
              </li>
            ))}
          </ol>

          {review && (
            <figure className="mt-16 rounded-2xl bg-leaf-100 p-8 sm:p-10">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-8 w-8 fill-leaf-500/30"
              >
                <path d="M10 11H6.5C6.5 8 8 6.5 10 6V4C6.5 4.5 4 7.5 4 11v9h6zm10 0h-3.5c0-3 1.5-4.5 3.5-5V4c-3.5.5-6 3.5-6 7v9h6z" />
              </svg>
              <blockquote className="mt-5 text-lg leading-relaxed text-bark-700">
                {review.quote}
              </blockquote>
              <figcaption className="mt-5 text-sm font-medium text-bark-900">
                Recommended on Facebook · {review.date}
              </figcaption>
            </figure>
          )}

          <div className="mt-16 border-t border-sand-300 pt-10">
            <p className="text-sm font-semibold text-bark-900">Other services</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="rounded-full border border-sand-300 px-4 py-2 text-sm text-bark-700 transition-colors hover:border-leaf-500 hover:text-leaf-600"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          <ServiceCta
            heading={`Ready for ${service.title.toLowerCase()}?`}
            subhead="Free walkthrough, no pressure after it."
          />
        </div>
      </section>
    </>
  );
}
