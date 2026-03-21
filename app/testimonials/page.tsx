'use client';

import { motion } from 'framer-motion';
import { TESTIMONIALS_DATA } from '@/lib/data';

export default function TestimonialsPage() {
  return (
    <>
      <section className="relative h-[35vh] flex items-center justify-center text-center px-4 overflow-hidden bg-primary-bg mt-[-6rem]">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-bg via-primary-bg/95 to-secondary-bg"></div>
        <div className="max-w-4xl mx-auto z-10 space-y-2 pt-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
            Client Testimonials
          </h1>
          <p className="font-body text-sm text-cream/70 max-w-xl mx-auto leading-relaxed">
            Stories of faith, clarity, and guidance from those we've had the privilege to serve.
          </p>
        </div>
      </section>

      <section className="py-20 bg-secondary-bg px-4 border-t border-border-accent relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface/30 border border-border-accent p-6 rounded-2xl space-y-4 hover:border-gold-primary/30 transition shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex gap-1 text-gold-primary text-sm">
                  {Array.from({ length: testimonial.rating }).map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="font-display italic text-base text-cream/90 leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-border-accent/50 text-xs text-muted-text mt-4">
                <div>
                  <span className="font-body font-bold text-gold-primary block">{testimonial.name}</span>
                  <span>{testimonial.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <img src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="h-4 object-contain brightness-75 mix-blend-screen" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
