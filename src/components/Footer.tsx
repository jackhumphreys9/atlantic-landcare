import { site } from "@/site.config";

export function Footer() {
  return (
    <footer className="border-t border-sand-300/60 bg-bark-900 text-sand-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-white">{site.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-sand-300">
            {site.description}
          </p>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-white">Get in touch</p>
          <ul className="mt-3 space-y-2 text-sand-300">
            <li>
              <a href={`tel:${site.phoneHref}`} className="hover:text-leaf-500">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-leaf-500">
                {site.email}
              </a>
            </li>
            <li>{site.hours}</li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-white">Service area</p>
          <p className="mt-3 text-sand-300">{site.serviceArea}</p>
          <div className="mt-4 flex gap-4">
            <a
              href={site.social.instagram}
              className="text-sand-300 hover:text-leaf-500"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              href={site.social.facebook}
              className="text-sand-300 hover:text-leaf-500"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-6 text-center text-xs text-sand-300">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
