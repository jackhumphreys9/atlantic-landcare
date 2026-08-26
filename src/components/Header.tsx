import Link from "next/link";
import { site } from "@/site.config";

const links = [
  { href: "#work", label: "Before & After" },
  { href: "#services", label: "Services" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-sand-300/60 bg-sand-50/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-5">
        {/*
         * Text wordmark rather than the logo image: the logo is a stacked
         * lockup with a two-line subtitle, which is unreadable at header
         * height. The full logo appears in the footer instead.
         */}
        <Link href="/" className="leading-tight">
          <span className="block font-display text-xl font-bold tracking-tight text-leaf-600">
            {site.name}
          </span>
          <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-bark-700 sm:block">
            {site.descriptor}
          </span>
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

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phoneHref}`}
            className="hidden text-sm font-semibold text-bark-700 transition-colors hover:text-leaf-600 sm:block"
          >
            {site.phone}
          </a>
          <a
            href="#contact"
            className="rounded-full bg-leaf-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-leaf-500"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </header>
  );
}
