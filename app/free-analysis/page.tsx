'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CONTACT_INFO } from '@/lib/data';
import { Clock, ShieldCheck, Star } from 'lucide-react';

const analysisSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  dob: z.string().min(1, { message: "Date of Birth is required" }),
  tob: z.string().min(1, { message: "Time of Birth is required" }),
  pob: z.string().min(2, { message: "Place of Birth is required" }),
});

type AnalysisFormValues = z.infer<typeof analysisSchema>;

export default function FreeAnalysisPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AnalysisFormValues>({
    resolver: zodResolver(analysisSchema),
  });

  const onSubmit = (data: AnalysisFormValues) => {
    // 1. Log Lead internally
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "Free Horoscope Request", ...data }),
    }).catch(err => console.error("Auto submission failed:", err));

    // 2. Open WhatsApp immediately to bypass popup blockers
    const text = `Namaste Manjul ji, I would like a Free Horoscope Analysis.\n\nName: ${data.name}\nPhone: ${data.phone}\nDOB: ${data.dob}\nTOB: ${data.tob}\nPOB: ${data.pob}`;
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center text-center px-4 overflow-hidden bg-primary-bg mt-[-6rem]">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-bg via-primary-bg/95 to-secondary-bg"></div>
        <div className="max-w-4xl mx-auto z-10 space-y-2 pt-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Claim Your Free Horoscope Analysis
          </h1>
          <p className="font-body text-sm md:text-base text-cream/70 max-w-xl mx-auto leading-relaxed">
            Fill in your birth details below to receive a complimentary initial reading from Manjul ji.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-secondary-bg px-4 border-t border-border-accent relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Left: Explainer (2/5) */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-display text-2xl font-bold text-white">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-surface/30 p-4 rounded-xl border border-border-accent">
                <div className="text-gold-primary mt-0.5"><Clock size={20} /></div>
                <div>
                  <h4 className="font-display text-base font-semibold text-white">Share Details</h4>
                  <p className="font-body text-xs text-cream/70 leading-relaxed">Submit your exact Date, Time, and Place of birth accurately.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-surface/30 p-4 rounded-xl border border-border-accent">
                <div className="text-gold-primary mt-0.5"><ShieldCheck size={20} /></div>
                <div>
                  <h4 className="font-display text-base font-semibold text-white">100% Private</h4>
                  <p className="font-body text-xs text-cream/70 leading-relaxed">Your birth details and consultations are strictly confidential.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-surface/30 p-4 rounded-xl border border-border-accent">
                <div className="text-gold-primary mt-0.5"><Star size={20} /></div>
                <div>
                  <h4 className="font-display text-base font-semibold text-white">Authentic Guidance</h4>
                  <p className="font-body text-xs text-cream/70 leading-relaxed">No automated software reports. Read personally by Manjul ji.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form (3/5) */}
          <div className="lg:col-span-3 bg-surface/40 backdrop-blur-md border border-border-accent p-6 rounded-2xl shadow-xl">
            <h3 className="font-display text-xl font-bold text-white mb-4">Birth Details Form</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-cream/70 font-body mb-1">Name</label>
                  <input type="text" {...register('name')} className="w-full bg-surface/50 border border-border-accent rounded-lg p-2.5 text-cream text-sm focus:border-gold-primary outline-none" placeholder="Your Name" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs text-cream/70 font-body mb-1">WhatsApp Number</label>
                  <input type="text" {...register('phone')} className="w-full bg-surface/50 border border-border-accent rounded-lg p-2.5 text-cream text-sm focus:border-gold-primary outline-none" placeholder="099537 46052" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs text-cream/70 font-body mb-1">Date of Birth</label>
                <input type="date" {...register('dob')} className="w-full bg-surface/50 border border-border-accent rounded-lg p-2.5 text-cream text-sm focus:border-gold-primary outline-none" />
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-cream/70 font-body mb-1">Time of Birth</label>
                  <input type="time" {...register('tob')} className="w-full bg-surface/50 border border-border-accent rounded-lg p-2.5 text-cream text-sm focus:border-gold-primary outline-none" />
                  {errors.tob && <p className="text-red-500 text-xs mt-1">{errors.tob.message}</p>}
                </div>
                <div>
                  <label className="block text-xs text-cream/70 font-body mb-1">Place of Birth</label>
                  <input type="text" {...register('pob')} className="w-full bg-surface/50 border border-border-accent rounded-lg p-2.5 text-cream text-sm focus:border-gold-primary outline-none" placeholder="Delhi, India" />
                  {errors.pob && <p className="text-red-500 text-xs mt-1">{errors.pob.message}</p>}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-gradient-gold text-primary-bg font-bold py-3 rounded-full hover:scale-105 transition shadow-lg text-sm flex items-center justify-center gap-2"
              >
                Submit via WhatsApp
              </button>
            </form>

            <p className="text-[10px] text-center text-muted-text mt-4">
              Clicking submit will organize your details and open WhatsApp to send them directly.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
