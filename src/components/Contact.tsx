import { ContactForm } from "@/components/ContactForm";
import { site } from "@/site.config";

export function Contact() {
  return (
    <section id="contact" className="bg-sand-100 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="font-display text-3xl font-bold text-bark-900 sm:text-4xl">
            Let&apos;s talk about your yard
          </h2>
          <p className="mt-4 leading-relaxed text-bark-700">
            Tell us what you have in mind and we&apos;ll come out for a free walkthrough
            and estimate. No pressure, no charge.
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
              <dt className="font-semibold text-bark-900">Hours</dt>
              <dd className="mt-1 text-bark-700">{site.hours}</dd>
            </div>
            <div>
              <dt className="font-semibold text-bark-900">Service area</dt>
              <dd className="mt-1 text-bark-700">{site.serviceArea}</dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
