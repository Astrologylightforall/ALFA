"use client";

export default function TermsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center text-center px-4 overflow-hidden bg-primary-bg mt-[-6rem]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-primary/10 via-primary-bg to-secondary-bg"></div>
        <div className="max-w-4xl mx-auto z-10 space-y-4 pt-20 relative">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] block pb-2">
            Terms & Conditions
          </h1>
          <p className="font-body text-base md:text-lg text-cream/70 max-w-2xl mx-auto font-medium">
            Last updated: March 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-secondary-bg px-4 border-t border-border-accent relative z-10">
        <div className="max-w-4xl mx-auto font-body text-[15px] md:text-lg text-cream/80 leading-relaxed space-y-12">
          <div className="space-y-4">
            <p>
              By accessing the **Astrology Light For All (ALFA)** website and booking our services, you agree to comply with and be bound by the following Terms and Conditions. Please review them carefully before consulting.
            </p>
          </div>

          <div className="space-y-4 bg-surface/30 p-8 rounded-[2rem] border border-border-accent shadow-xl">
            <h2 className="font-display text-2xl md:text-3xl text-white font-bold">1. Nature of Astrology & Advice</h2>
            <p>
              Vedic Astrology (Jyotish) is an ancient predictive and analytical system based on astronomical calculations and classical references. 
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-cream/90">
              <li>Our services are intended to provide actionable **spiritual guidance and support** using ancient wisdom methods.</li>
              <li>Calculations and interpretations may vary based on accurate birth detail logs provided by the user.</li>
              <li>Astrological advice should **never** be considered as a definitive replacement for professional advice (including but not limited to medical diagnostics, legal frameworks, or certified financial planning).</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-white font-bold">2. Accurate Information Requirement</h2>
            <p>
              The user warrants that all birth metrics (Date, exact Time, and Place) supplied are accurate to the best of their knowledge. Correct calculations rely significantly on these accurate inputs. Inaccuaracies in the logs will create different charts for which ALFA is not liable.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-white font-bold">3. Booking, Payment & Cancellation</h2>
            <p>
              Consultations must be scheduled in advance through our official channels (WhatsApp, phone, or forms). 
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-cream/90">
              <li>Consultations are confirmed only after standard booking fee is approved.</li>
              <li>Rescheduling or cancellations must be made **at least 24 hours** in advance for full scheduling slots replacement.</li>
              <li>Refunds for completed consultations are not provided.</li>
            </ul>
          </div>

          <div className="space-y-4 bg-surface/10 p-6 rounded-2xl border border-border-accent">
            <h2 className="font-display text-xl md:text-2xl text-white font-semibold">4. User Ethics & Right to Refusal</h2>
            <p>
              We promote a respectful, polite, and calm learning/consultative environment. **Manjul Malhotra** and the ALFA team reserve the absolute right to cancel bookings or refuse service without notice in any event of harassment, unreasonable demands, or requests involving malicious intent against third parties.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-white font-bold">5. Intellectual Property</h2>
            <p>
              All website content, logos, imagery, and static write-ups are the exclusive property of ALFA. They may not be copied, reproduced, or distributed without explicit prior consent for commercial amplification.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-white font-bold">6. Modifications</h2>
            <p>
              We reserve the right to revise these terms from time to time. Your continued use of the website or booking interfaces after update logs constitutes acceptance of all terms.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
