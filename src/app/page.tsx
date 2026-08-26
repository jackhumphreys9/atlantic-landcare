import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { VideoGallery } from "@/components/VideoGallery";
import { Testimonials } from "@/components/Testimonials";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      {/* Renders nothing until there's a video in site.config.ts. */}
      <VideoGallery />
      <Testimonials />
      <About />
      <Contact />
    </>
  );
}
