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
    <div className="fixed bottom-0 left-0 w-full h-14 bg-primary-bg/80 backdrop-blur-md border-t border-border-accent z-50 flex md:hidden">
      <a 
        href={`tel:${CONTACT_INFO.phoneFull}`} 
        className="flex-1 flex items-center justify-center gap-2 text-[#0A0B10] font-bold text-sm border-r border-border-accent"
        style={{ backgroundImage: "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)" }}
      >
        <Phone size={18} />
        Call Now
      </a>
      <a 
        href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Namaste`} 
        className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold text-sm"
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>
    </div>
  );
}
