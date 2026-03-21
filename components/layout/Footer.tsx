'use client';

import Link from 'next/link';
import { useTranslation } from '@/components/providers/LanguageProvider';
import { CONTACT_INFO, SERVICES_DATA } from '@/lib/data';
import { Phone, MessageCircle, Mail, MapPin, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary-bg border-t border-border-accent text-cream pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Logo & Socials */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/images/logo.png"
              alt="ALFA Logo"
              className="w-10 h-10 object-contain rounded-full border border-gold-primary/20 bg-surface/50 p-0.5 group-hover:border-gold-primary/50 transition-colors"
            />
            <div className="flex flex-col">
              <span 
                className="font-display text-xl font-bold bg-clip-text text-transparent tracking-tight"
                style={{ backgroundImage: "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)" }}
              >
                ALFA
              </span>
              <span className="text-[9px] text-cream/60 uppercase tracking-wider">
                Astrology Light For All
              </span>
            </div>
          </Link>
          <p className="text-sm text-muted-text">
            Ancient Wisdom. Accurate Guidance. Real Solutions. Empowering your journey with authentic Vedic Astrology in Delhi NCR.
          </p>
          <div className="flex items-center gap-4 text-gold-primary">
            <a href="https://www.instagram.com/astrologylight4all" target="_blank" className="hover:scale-110 transition"><Instagram size={20} /></a>
            <a href="https://www.youtube.com/@MANJULGMALHOTRA" target="_blank" className="hover:scale-110 transition"><Youtube size={20} /></a>
            <a href="https://share.google/LJlG8RzXVZpegFfl5" target="_blank" className="hover:scale-110 transition"><MapPin size={20} /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-display text-lg text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-text">
            <li><Link href="/" className="hover:text-gold-primary transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-gold-primary transition">About Manjul Ji</Link></li>
            <li><Link href="/services" className="hover:text-gold-primary transition">Services</Link></li>
            <li><Link href="/blog" className="hover:text-gold-primary transition">Blog</Link></li>
            <li><Link href="/testimonials" className="hover:text-gold-primary transition">Testimonials</Link></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h4 className="font-display text-lg text-white font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-muted-text">
            {SERVICES_DATA.map((service) => (
              <li key={service.slug}>
                <Link href={service.href} className="hover:text-gold-primary transition">{service.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h4 className="font-display text-lg text-white font-semibold mb-4">Contact Info</h4>
          <ul className="space-y-3 text-sm text-muted-text">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-gold-primary mt-0.5 shrink-0" />
              <span>{CONTACT_INFO.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-gold-primary shrink-0" />
              <a href={`tel:${CONTACT_INFO.phoneFull}`} className="hover:text-gold-primary">{CONTACT_INFO.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle size={16} className="text-gold-primary shrink-0" />
              <a href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Namaste`} className="hover:text-gold-primary">WhatsApp Us</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-gold-primary shrink-0" />
              <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-gold-primary">{CONTACT_INFO.email}</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-border-accent mt-12 pt-6 text-center text-xs text-muted-text px-4 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <p>&copy; 2026 ALFA. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link href="/privacy" className="hover:text-gold-primary">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gold-primary">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
