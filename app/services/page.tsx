'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/components/providers/LanguageProvider';
import { SERVICES_DATA } from '@/lib/data';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { useState } from 'react';

export default function ServicesPage() {
  const { t, language } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Astrology', 'Marriage', 'Vastu'];

  const filteredServices = selectedCategory === 'All' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(service => (service as any).category === selectedCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center text-center px-4 overflow-hidden bg-primary-bg mt-[-6rem]">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-bg via-primary-bg/95 to-secondary-bg"></div>
        <div className="max-w-4xl mx-auto z-10 space-y-2 pt-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Our Astrology Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-body text-sm md:text-base text-cream/70 max-w-xl mx-auto"
          >
            From birth chart analysis to Vedic remedies — comprehensive guidance for every area of life.
          </motion.p>
        </div>
      </section>

      {/* Services Grid Detailed */}
      <section className="py-20 bg-secondary-bg px-4 border-t border-border-accent">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => {
              const isActive = cat === selectedCategory;
              return (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 cursor-pointer ${isActive ? "bg-gold-primary text-primary-bg" : "bg-surface/40 text-cream border border-border-accent hover:border-gold-primary hover:text-gold-primary"}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredServices.map((service, index) => {
            const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.FileText;

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-surface/30 backdrop-blur-md rounded-2xl p-8 border border-border-accent flex flex-col justify-between hover:bg-surface/50 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary">
                    <IconComponent size={28} />
                  </div>

                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">
                      {service.title}
                    </h2>
                    <span className="text-gold-primary/80 text-xs font-semibold">{service.title_hindi}</span>
                  </div>

                  <p className="font-body text-cream/80 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Key Points */}
                  <ul className="space-y-2 pt-2">
                    {service.key_points.map((point, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-cream/90 font-body">
                        <span className="text-gold-primary">✦</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-8">
                  <Link 
                    href={`/services/${service.slug}`} 
                    className="flex-1 text-center border border-gold-primary text-gold-primary font-bold px-4 py-2.5 rounded-full hover:bg-gold-primary/10 transition text-sm flex items-center justify-center"
                  >
                    View Details
                  </Link>
                  <a 
                    href={`https://wa.me/919999691464?text=${encodeURIComponent(service.whatsapp_message)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-gradient-gold text-primary-bg font-bold px-4 py-2.5 rounded-full hover:scale-105 transition text-sm shadow-md flex items-center justify-center gap-1"
                  >
                    Book Consultation
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
        </div>
      </section>
    </>
  );
}
