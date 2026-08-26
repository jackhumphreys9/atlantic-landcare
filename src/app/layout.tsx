import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { services, site } from "@/site.config";
import "./globals.css";

const body = Inter({
  variable: "--font-sans-body",
  subsets: ["latin"],
});

const display = Fraunces({
  variable: "--font-display-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  // Makes the generated opengraph-image resolve to an absolute URL, which
  // Facebook and iMessage both require.
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.descriptor}`,
  description: site.description,
  keywords: [
    ...services.map((service) => service.title.toLowerCase()),
    ...site.serviceArea,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — ${site.descriptor}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.descriptor}`,
    description: site.description,
  },
};

/**
 * Tells Google this is a local business, what it does, and which towns it
 * covers — the structured data behind "stump grinding near me" results.
 *
 * No address: we don't have one. If James works from a business address he's
 * happy to publish, adding it here (and claiming a Google Business Profile)
 * is the single biggest thing left for local search.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.legalName,
  alternateName: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phoneHref,
  email: site.email,
  image: `${site.url}/logo.jpg`,
  founder: { "@type": "Person", name: site.owner.name },
  sameAs: [site.social.facebook],
  areaServed: site.serviceArea.map((town) => ({ "@type": "City", name: town })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.title },
    })),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
