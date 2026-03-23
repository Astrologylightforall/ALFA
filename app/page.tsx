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
import NumerologyCalculator from "@/components/sections/NumerologyCalculator";
import DailyHoroscope from "@/components/sections/DailyHoroscope";
import LiveTransits from "@/components/sections/LiveTransits";

export default function Home() {
  return (
    <>
      <Hero />
      <TextMarquee />
      <ServicesGrid />
      <NumerologyCalculator />
      <DailyHoroscope />
      <LiveTransits />
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





