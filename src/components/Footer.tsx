import Image from "next/image";
import { site } from "@/site.config";

export function Footer() {
  return (
    <footer className="border-t border-sand-300/60 bg-bark-900 text-sand-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          {/*
           * The logo artwork has a cream background baked in, so it sits in a
           * rounded tile rather than floating on the dark footer.
           */}
          <div className="relative h-32 w-32 overflow-hidden rounded-xl bg-sand-100">
            <Image
              src="/logo.png"
              alt={`${site.name} logo`}
              fill
              sizes="128px"
              className="object-contain p-1"
            />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand-300">
            {site.description}
          </p>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-white">Get in touch</p>
          <ul className="mt-3 space-y-2 text-sand-300">
            <li>
              <a href={`tel:${site.phoneHref}`} className="hover:text-sun-500">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="break-all hover:text-sun-500">
                {site.email}
              </a>
            </li>
            <li>{site.hours}</li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-white">Service area</p>
          <p className="mt-3 text-sand-300">{site.serviceArea}</p>
          <a
            href={site.social.facebook}
            className="mt-4 inline-block text-sand-300 hover:text-sun-500"
            target="_blank"
            rel="noreferrer"
          >
            Find us on Facebook
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-6 text-center text-xs text-sand-300">
        © {new Date().getFullYear()} {site.legalName}. All rights reserved.
      </div>
    </footer>
  );
}
