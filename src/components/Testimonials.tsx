import { site, testimonials } from "@/site.config";

/** Facebook's "f" mark, in their brand blue. */
function FacebookMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="#1877F2"
        d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z"
      />
    </svg>
  );
}

/**
 * Attribution line. Reviewer names are deliberately not shown — only that the
 * recommendation came from Facebook. Nothing rendered here identifies anyone.
 */
function Source({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <FacebookMark className="h-4 w-4 shrink-0" />
      <span className="font-medium text-bark-900">Recommended on Facebook</span>
      <span aria-hidden className="text-sand-300">
        ·
      </span>
      <span className="text-bark-700">{date}</span>
    </div>
  );
}

function QuoteMark() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-8 w-8 fill-leaf-500/30">
      <path d="M10 11H6.5C6.5 8 8 6.5 10 6V4C6.5 4.5 4 7.5 4 11v9h6zm10 0h-3.5c0-3 1.5-4.5 3.5-5V4c-3.5.5-6 3.5-6 7v9h6z" />
    </svg>
  );
}

export function Testimonials() {
  const featured = testimonials.find((t) => t.featured);
  const rest = testimonials.filter((t) => t !== featured);

  return (
    <section id="testimonials" className="bg-leaf-100 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-3xl font-bold text-bark-900 sm:text-4xl">
          What neighbors say
        </h2>
        <p className="mt-3 max-w-xl text-bark-700">
          Straight from the {site.name} Facebook page.
        </p>

        {featured && (
          <figure className="mt-14 rounded-2xl bg-white p-8 shadow-sm sm:p-10">
            <QuoteMark />
            <blockquote className="mt-5 text-lg leading-relaxed text-bark-700">
              {featured.quote}
            </blockquote>
            <figcaption className="mt-7 border-t border-sand-300 pt-5">
              <Source date={featured.date} />
            </figcaption>
          </figure>
        )}

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((testimonial) => (
            <figure
              key={testimonial.date}
              className="flex flex-col rounded-2xl bg-white p-8 shadow-sm"
            >
              <QuoteMark />
              <blockquote className="mt-5 flex-1 leading-relaxed text-bark-700">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-sand-300 pt-5">
                <Source date={testimonial.date} />
              </figcaption>
            </figure>
          ))}
        </div>

        <a
          href={site.social.facebookReviews}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-leaf-600 hover:underline"
        >
          <FacebookMark className="h-4 w-4" />
          See all reviews on Facebook
        </a>
      </div>
    </section>
  );
}
