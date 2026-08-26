import { testimonials } from "@/site.config";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-leaf-100 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-3xl font-bold text-bark-900 sm:text-4xl">
          What our customers say
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.author}
              className="flex flex-col rounded-2xl bg-white p-8 shadow-sm"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-8 w-8 fill-leaf-500/40"
              >
                <path d="M10 11H6.5C6.5 8 8 6.5 10 6V4C6.5 4.5 4 7.5 4 11v9h6zm10 0h-3.5c0-3 1.5-4.5 3.5-5V4c-3.5.5-6 3.5-6 7v9h6z" />
              </svg>
              <blockquote className="mt-5 flex-1 leading-relaxed text-bark-700">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-sand-300 pt-4 text-sm">
                <span className="font-semibold text-bark-900">
                  {testimonial.author}
                </span>
                <span className="text-bark-700"> · {testimonial.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
