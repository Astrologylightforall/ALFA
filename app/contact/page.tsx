"use client";

import { useState } from "react";
import { CONTACT_INFO } from "@/lib/data";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Phone, Clock, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  msg: z.string().min(5, { message: "Message must be at least 5 characters" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const resp = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "Contact Form", ...data }),
      });
      if (resp.ok) {
        setIsSuccess(true);
      } else {
        const err = await resp.json();
        alert(err.error || "Submission could not be completed at this moment.");
      }
    } catch (error) {
       console.error("Contact submit error:", error);
       alert("Error submitting. Please try emailing directly.");
    }
  };

  return (
    <>
      <section className="relative h-[45vh] min-h-[400px] flex items-center justify-center text-center px-4 overflow-hidden bg-primary-bg mt-[-6rem]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-primary/10 via-primary-bg to-secondary-bg"></div>
        <div className="max-w-4xl mx-auto z-10 space-y-4 pt-16 relative">
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
            Get In Touch
          </h1>
          <p className="font-body text-sm md:text-lg text-cream/70 max-w-xl mx-auto font-medium">
            Have questions about your chart? Connect with Manjul Malhotra today.
          </p>
        </div>
      </section>

      <section className="py-24 bg-secondary-bg px-4 border-t border-border-accent relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          
          {/* Left: Contact Info */}
          <div className="space-y-12">
            <div>
              <span className="text-gold-primary text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold font-body block opacity-80 mb-2">Connect Directly</span>
              <h2 className="font-display text-4xl font-bold text-white tracking-tight">Contact Information</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-5 p-4 rounded-xl hover:bg-surface/40 border border-transparent hover:border-gold-primary/30 transition-all duration-300">
                <div className="text-gold-primary mt-1 p-3 bg-gold-primary/10 rounded-full"><MapPin size={24} /></div>
                <div>
                  <h4 className="font-display text-xl font-bold text-white mb-1">Address</h4>
                  <p className="font-body text-[15px] text-cream/70 leading-relaxed max-w-sm">{CONTACT_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-5 p-4 rounded-xl hover:bg-surface/40 border border-transparent hover:border-gold-primary/30 transition-all duration-300">
                <div className="text-gold-primary mt-1 p-3 bg-gold-primary/10 rounded-full"><Phone size={24} /></div>
                <div>
                  <h4 className="font-display text-xl font-bold text-white mb-1">Call Us</h4>
                  <a href={`tel:${CONTACT_INFO.phoneFull}`} className="font-body text-[15px] text-gold-primary hover:text-gold-light inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-gold-primary after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-300 transition-colors">{CONTACT_INFO.phone}</a>
                </div>
              </div>

              <div className="flex items-start gap-5 p-4 rounded-xl hover:bg-surface/40 border border-transparent hover:border-gold-primary/30 transition-all duration-300">
                <div className="text-gold-primary mt-1 p-3 bg-gold-primary/10 rounded-full"><Clock size={24} /></div>
                <div>
                  <h4 className="font-display text-xl font-bold text-white mb-1">Hours</h4>
                  <p className="font-body text-[15px] text-cream/70 leading-relaxed">{CONTACT_INFO.hours}</p>
                </div>
              </div>
            </div>

            <div className="h-[350px] rounded-[2rem] overflow-hidden border border-gold-primary/20 shadow-[0_20px_40px_rgba(0,0,0,0.3)] mt-8 p-1 bg-surface/50 backdrop-blur-md relative group">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14006.1834!2d77.1082!3d28.6441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d039f00000001%3A0x0!2sSubhash%20Nagar%20New%20Delhi!5e0!3m2!1sen!2sin!4v161234567890" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)', mixBlendMode: 'screen' }} 
                  allowFullScreen={false} 
                  loading="lazy"
                  className="group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-primary-bg/50 via-transparent to-transparent opacity-80 mix-blend-multiply"></div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-surface/40 backdrop-blur-xl border border-gold-primary/20 p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-h-[500px] flex items-center relative overflow-hidden">
            
            {/* Ambient form glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-primary/5 rounded-full filter blur-[80px] pointer-events-none" />

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full relative z-10"
                >
                  <h3 className="font-display text-[2rem] font-bold text-white mb-8 tracking-tight">Send a Message</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    
                    <div className="relative group">
                      <label className="block text-[11px] text-gold-primary uppercase tracking-widest font-bold mb-2 ml-1">Name</label>
                      <input 
                        type="text" 
                        {...register("name")} 
                        className="w-full bg-surface/50 border border-border-accent rounded-2xl p-4 text-cream text-[15px] focus:border-gold-primary focus:bg-surface/80 focus:ring-1 focus:ring-gold-primary/50 outline-none transition-all duration-300 shadow-inner group-hover:border-gold-primary/50" 
                        placeholder="Your Name" 
                      />
                      {errors.name && <p className="absolute -bottom-5 left-2 text-red-400 text-[11px] tracking-wide font-medium">{errors.name.message}</p>}
                    </div>

                    <div className="relative group">
                      <label className="block text-[11px] text-gold-primary uppercase tracking-widest font-bold mb-2 ml-1 mt-6">Phone Number</label>
                      <input 
                        type="tel" 
                        {...register("phone")} 
                        className="w-full bg-surface/50 border border-border-accent rounded-2xl p-4 text-cream text-[15px] focus:border-gold-primary focus:bg-surface/80 focus:ring-1 focus:ring-gold-primary/50 outline-none transition-all duration-300 shadow-inner group-hover:border-gold-primary/50" 
                        placeholder="099537 46052" 
                      />
                      {errors.phone && <p className="absolute -bottom-5 left-2 text-red-400 text-[11px] tracking-wide font-medium">{errors.phone.message}</p>}
                    </div>

                    <div className="relative group">
                      <label className="block text-[11px] text-gold-primary uppercase tracking-widest font-bold mb-2 ml-1 mt-6">Message</label>
                      <textarea 
                        rows={4} 
                        {...register("msg")} 
                        className="w-full bg-surface/50 border border-border-accent rounded-2xl p-4 text-cream text-[15px] focus:border-gold-primary focus:bg-surface/80 focus:ring-1 focus:ring-gold-primary/50 outline-none transition-all duration-300 shadow-inner resze-none group-hover:border-gold-primary/50" 
                        placeholder="Tell us about your questions..." 
                      />
                      {errors.msg && <p className="absolute -bottom-5 left-2 text-red-400 text-[11px] tracking-wide font-medium">{errors.msg.message}</p>}
                    </div>

                    <div className="pt-6">
                      <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="magnetic relative overflow-hidden group w-full bg-[#0A0812] text-gold-primary font-bold py-4 rounded-full hover:scale-[1.02] transition-transform shadow-[0_10px_20px_rgba(201,168,76,0.2)] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center text-[15px] border border-gold-primary/30"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {isSubmitting ? "Sending details..." : "Submit Message"}
                        </span>
                        {!isSubmitting && (
                          <span className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] animate-shimmer" />
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  className="w-full relative z-10 flex flex-col items-center justify-center text-center space-y-6 py-12"
                >
                  <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", damping: 15 }}
                    className="w-24 h-24 bg-gold-primary/10 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(201,168,76,0.3)] mb-4"
                  >
                    <CheckCircle2 size={48} className="text-gold-primary" />
                  </motion.div>
                  <h3 className="font-display text-4xl font-bold text-white tracking-tight">Message Sent</h3>
                  <p className="font-body text-[16px] text-cream/70 leading-relaxed max-w-sm">
                    Thank you for reaching out. Manjul ji or the ALFA team will get back to you shortly.
                  </p>
                  
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 px-8 py-3 rounded-full border border-border-accent text-cream/70 hover:text-white hover:border-white/40 transition-colors text-sm font-semibold uppercase tracking-widest"
                  >
                    Send Another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </>
  );
}
