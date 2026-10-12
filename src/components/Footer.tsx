import Image from "next/image";
import { site } from "@/site.config";
import { SocialLinks } from "@/components/SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-sand-300/60 bg-bark-900 text-sand-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          {/*
           * White tile, not the old cream one: the new logo's own background
           * is pure white, so a cream tile would show as a visible mismatched
           * border around it. Wide rather than square — this logo is a single
           * horizontal line (icon + wordmark), not a stacked lockup.
           */}
          <div className="relative h-20 w-56 overflow-hidden rounded-xl bg-white">
            <Image
              src="/logo.jpg"
              alt={`${site.name} logo`}
              fill
              sizes="224px"
              className="object-contain p-2"
            />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand-300">
            {site.description}
          </p>
          <SocialLinks className="mt-5 flex items-center gap-4" iconClassName="h-6 w-6" />
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
          </ul>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-white">Service area</p>
          <ul className="mt-3 space-y-1 text-sand-300">
            {site.serviceArea.map((town) => (
              <li key={town}>{town}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-6 text-center text-xs text-sand-300">
        © {new Date().getFullYear()} {site.legalName}. All rights reserved.
      </div>
    </footer>
  );
}
