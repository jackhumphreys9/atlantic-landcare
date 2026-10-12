import Image from "next/image";
import Link from "next/link";
import { site } from "@/site.config";
import { SocialLinks } from "@/components/SocialLinks";

/*
 * "/#work" rather than "#work": now that /services and /services/[slug]
 * exist, a bare hash link would try to scroll the current page instead of
 * navigating home first. The leading slash makes these work from anywhere.
 */
const links = [
  { href: "/#work", label: "Before & After" },
  { href: "/services", label: "Services" },
  { href: "/#testimonials", label: "Reviews" },
  { href: "/#about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-sand-300/60 bg-sand-50/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-5">
        {/*
         * The real logo now, not a text stand-in — the new mark is a single
         * line (no subtitle underneath it), so it stays legible this small.
         */}
        <Link href="/" className="relative h-9 w-[120px] shrink-0 sm:h-10 sm:w-[135px]">
          <Image
            src="/logo.jpg"
            alt={site.name}
            fill
            sizes="135px"
            priority
            className="object-contain object-left"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-bark-700 transition-colors hover:text-leaf-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <SocialLinks className="flex items-center gap-3" iconClassName="h-5 w-5" />
          <span aria-hidden className="hidden h-5 w-px bg-sand-300 sm:block" />
          <a
            href={`tel:${site.phoneHref}`}
            className="hidden text-sm font-semibold text-bark-700 transition-colors hover:text-leaf-600 sm:block"
          >
            {site.phone}
          </a>
          <Link
            href="/#contact"
            className="rounded-full bg-leaf-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-leaf-500"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
