import { site, testimonials } from "@/site.config";
import { FacebookMark } from "@/components/SocialLinks";

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
