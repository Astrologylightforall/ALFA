'use client';

import { useTranslation } from '@/components/providers/LanguageProvider';
import { CONTACT_INFO } from '@/lib/data';
import { Phone, MessageCircle } from 'lucide-react';

import { usePathname } from 'next/navigation';

export default function StickyMobileBar() {
  const { t } = useTranslation();
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-[60px] bg-primary-bg/90 backdrop-blur-xl border-t border-gold-primary/20 z-50 flex md:hidden shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <a
        href={`tel:${CONTACT_INFO.phoneFull}`}
        className="flex-1 flex items-center justify-center gap-2 text-primary-bg font-bold text-sm border-r border-white/10 active:opacity-80 transition-opacity bg-gradient-gold"
      >
        <Phone size={18} />
        Call Now
      </a>
      <a
        href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Namaste`}
        className="flex-1 flex items-center justify-center gap-2 bg-[#25D366]/90 text-white font-bold text-sm active:opacity-80 transition-opacity"
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>
    </div>
  );
}
