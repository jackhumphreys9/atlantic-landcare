import { site } from "@/site.config";

/** The "call or email" band repeated at the bottom of the services index and every service page. */
export function ServiceCta({
  heading,
  subhead,
}: {
  heading: string;
  subhead: string;
}) {
  return (
    <div className="mt-16 rounded-2xl bg-sand-100 p-8 text-center sm:p-10">
      <h2 className="font-display text-2xl font-bold text-bark-900">{heading}</h2>
      <p className="mt-2 text-bark-700">{subhead}</p>
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <a
          href={`tel:${site.phoneHref}`}
          className="rounded-full bg-leaf-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-leaf-500"
        >
          Call {site.phone}
        </a>
        <a
          href={`mailto:${site.email}`}
          className="rounded-full border border-bark-900/20 px-7 py-3.5 text-sm font-semibold text-bark-900 transition-colors hover:bg-white"
        >
          Email {site.owner.name.split(" ")[0]}
        </a>
      </div>
    </div>
  );
}
