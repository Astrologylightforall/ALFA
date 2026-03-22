import { SERVICES_DATA } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Phone, MessageCircle, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import ServiceHero from '@/components/sections/ServiceHero';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { LineReveal, ListReveal } from '@/components/ui/AnimatedText';

export function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  return {
    title: `${service?.title} | Astrology Light For All (ALFA)`,
    description: service?.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const faqs = [
    { q: `What details do you need for ${service.title}?`, a: "I need your exact date of birth, time of birth, and place of birth to calculate your planetary chart accurately." },
    { q: "Is the session recorded?", a: "Yes, you can request a recording of the session, or take notes during our call for future reference." },
    { q: "Can I ask multiple questions?", a: "Absolutely. During your consultation, we can address specific questions about career, family, health, or remedies regarding the main topic." }
  ];

  return (
    <>
      {/* Service Parallax Hero */}
      <ServiceHero title={service.title} titleHindi={service.title_hindi || 'ज्योतिष सेवा'} />

      {/* Main Content & Sidebar */}
      <section className="py-24 bg-secondary-bg px-4 border-t border-border-accent relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Details & FAQs */}
          <div className="lg:col-span-2 space-y-16">
            
            <div className="space-y-8">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
                About the Consultation
              </h2>
              
              <LineReveal>
                <p className="font-body text-cream/80 text-base md:text-lg leading-relaxed">
                  {service.description} This consultation is a comprehensive dive into your planetary alignment. We examine the operating mechanisms of your current Dashas and identify energetic blockages or strengths that are guiding your life path right now.
                </p>
              </LineReveal>
              
              <div className="pt-4">
                <h3 className="font-display text-2xl font-bold text-white mb-6">What it Covers:</h3>
                <ListReveal className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.key_points.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 text-[15px] text-cream/90 bg-surface/30 p-5 rounded-2xl border border-border-accent hover:border-gold-primary/30 transition-colors shadow-sm">
                      <span className="text-gold-primary mt-1 text-lg">✦</span>
                      <span className="pt-0.5">{point}</span>
                    </div>
                  ))}
                </ListReveal>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="space-y-8 pt-10 border-t border-border-accent/50">
              <h3 className="font-display text-3xl font-bold text-white tracking-tight">Frequently Asked Questions</h3>
              <FAQAccordion faqs={faqs} />
            </div>
          </div>

          {/* Right Column: Sticky Sidebar CTA */}
          <div className="lg:col-span-1 lg:sticky lg:top-28">
            <div className="bg-surface/60 backdrop-blur-xl rounded-3xl border border-gold-primary/20 p-8 space-y-8 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(201,168,76,0.1)] transition-shadow duration-500">
              
              <div>
                <h4 className="font-display text-[22px] font-bold text-white tracking-wide mb-2">Book Consultation</h4>
                <p className="font-body text-[14px] text-cream/70 leading-relaxed">
                  Schedule a private session with Manjul ji. Select your preference for a phone call or WhatsApp meeting.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-surface/80 p-4 rounded-xl border border-border-accent/80 flex items-start gap-4">
                  <div className="text-gold-primary mt-1 p-2 bg-gold-primary/10 rounded-full"><Clock size={20} /></div>
                  <div className="text-sm text-cream/80 pt-1">
                    <span className="font-bold text-white block mb-1">Requirements</span>
                    Exact Date, Time & Place of birth
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-border-accent/50">
                <a 
                  href={`tel:+919953746052`} 
                  className="magnetic relative overflow-hidden group w-full flex items-center justify-center gap-2 bg-gradient-gold text-primary-bg font-bold py-4 rounded-full hover:scale-105 transition-transform shadow-[0_10px_20px_rgba(201,168,76,0.3)] text-[15px]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Phone size={18} /> Call Manjul Ji
                  </span>
                  <span className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg] animate-[shimmer_3s_infinite_linear]" />
                </a>
                
                <a 
                  href={`https://wa.me/919999691464?text=${encodeURIComponent(service.whatsapp_message || "Namaste Manjul ji, I am interested in a consultation.")}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="magnetic w-full flex items-center justify-center gap-2 border-[1.5px] border-gold-primary/50 text-gold-primary font-bold py-4 rounded-full hover:bg-gold-primary/10 hover:border-gold-primary transition-colors text-[15px]"
                >
                  <MessageCircle size={18} className="group-hover:animate-bounce" />
                  WhatsApp Message
                </a>
              </div>

              <p className="text-[11px] text-center text-cream/40 uppercase tracking-widest font-semibold pt-2">
                100% Private & Confidential
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
