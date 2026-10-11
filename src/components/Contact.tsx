import { ContactForm } from "@/components/ContactForm";
import { site } from "@/site.config";

export function Contact() {
  return (
    <section id="contact" className="bg-sand-100 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="font-display text-3xl font-bold text-bark-900 sm:text-4xl">
            Get a free quote
          </h2>
          <p className="mt-4 leading-relaxed text-bark-700">
            Tell {site.owner.name.split(" ")[0]} what you&apos;re dealing with and
            he&apos;ll come out, look at it in person, and give you a number. No charge
            for the visit and no pressure after it.
          </p>

          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="font-semibold text-bark-900">Call or text</dt>
              <dd className="mt-1">
                <a
                  href={`tel:${site.phoneHref}`}
                  className="text-lg font-semibold text-leaf-600 hover:underline"
                >
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-bark-900">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${site.email}`}
                  className="text-bark-700 hover:text-leaf-600"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-bark-900">Service area</dt>
              <dd className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-bark-700">
                {site.serviceArea.map((town, index) => (
                  <span key={town}>
                    {town}
                    {index < site.serviceArea.length - 1 && (
                      <span aria-hidden className="ml-2 text-sand-300">
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
