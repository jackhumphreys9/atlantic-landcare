import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { VideoGallery } from "@/components/VideoGallery";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <VideoGallery />
      <Testimonials />
      <Contact />
    </>
  );
}
