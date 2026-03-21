"use client";

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center text-center px-4 overflow-hidden bg-primary-bg mt-[-6rem]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-primary/10 via-primary-bg to-secondary-bg"></div>
        <div className="max-w-4xl mx-auto z-10 space-y-4 pt-20 relative">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] block pb-2">
            Privacy Policy
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
              At **Astrology Light For All (ALFA)**, we respect your privacy and are committed to protecting any personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or book our astrology services.
            </p>
          </div>

          <div className="space-y-4 bg-surface/30 p-8 rounded-[2rem] border border-border-accent shadow-xl">
            <h2 className="font-display text-2xl md:text-3xl text-white font-bold">1. Information We Collect</h2>
            <p>To provide accurate Vedic readings, we collect certain personal credentials. This information is provided voluntarily by you when filling out forms or contacting us:</p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-cream/90">
              <li>Full Name</li>
              <li>Date of Birth</li>
              <li>Time of Birth</li>
              <li>Place of Birth (City, Country)</li>
              <li>Contact Details (Email Address, Whatsapp Number)</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-white font-bold">2. How We Use Your Information</h2>
            <p>The information we collect is used strictly for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-cream/90">
              <li>To construct and analyse your descriptive **Janam Kundali** (Birth Chart) and Dashas (Periods).</li>
              <li>To perform Kundali Milan or compatibility reports when requested for matrimonial purposes.</li>
              <li>To correspond with you regarding your consultation bookings, schedules, and administrative confirmations.</li>
            </ul>
            <p className="border-l-2 border-gold-primary/40 pl-5 text-gold-primary font-medium italic">
              We never sell, rent, or share your birth details, chart maps, or contact information with any third parties under any circumstances.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-white font-bold">3. Confidentiality of Consultations</h2>
            <p>
              All consultations, whether via call, video, or in-person, are strictly private and confidential. Discussion notes or transcripts, if any, are used only for reference in your future consultations with **Manjul Malhotra** and are kept secure.
            </p>
          </div>

          <div className="space-y-4 bg-surface/10 p-6 rounded-2xl border border-border-accent">
            <h2 className="font-display text-xl md:text-2xl text-white font-semibold">4. Data Security</h2>
            <p>
              We implement industry-standard security measures to guard your birth data and conversation streams against unauthorised access, alteration, or disclosure. However, please remember that no transmission method over the internet is 100% secure.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-white font-bold">5. Cookies and Analytics</h2>
            <p>
              Our website may use basic cookies or tracking tools to improve user experience and understand website traffic patterns. These tools do not collect personal identifyable references and are strictly used to boost page speeds and visual reliability.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-white font-bold">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to have your birth details deleted from our private dashboard records after a consultation, please contact us at our support desk.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
