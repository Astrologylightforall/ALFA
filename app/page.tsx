import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import CTABanner from "@/components/sections/CTABanner";
import AboutSnippet from "@/components/sections/AboutSnippet";
import StatsBar from "@/components/sections/StatsBar";
import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel";
import WhyChooseALFA from "@/components/sections/WhyChooseALFA";
import InstagramFeed from "@/components/sections/InstagramFeed";
import ContactSnippet from "@/components/sections/ContactSnippet";
import TextMarquee from "@/components/ui/TextMarquee";

export default function Home() {
  return (
    <>
      <Hero />
      <TextMarquee />
      <ServicesGrid />
      <CTABanner />
      <AboutSnippet />
      <StatsBar />
      <TestimonialsCarousel />
      <WhyChooseALFA />
      <InstagramFeed />
      <ContactSnippet />
    </>
  );
}





