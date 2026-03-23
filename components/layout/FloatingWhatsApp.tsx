'use client';

import { MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/data';

import { usePathname } from 'next/navigation';

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <a 
      href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Namaste%20Manjul%20ji`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition duration-300 hidden md:flex items-center justify-center border-2 border-gold-primary group"
    >
      <MessageCircle size={24} />
      <span className="absolute right-14 bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">
        Chat with Manjul Ji
      </span>
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping -z-10"></span>
    </a>
  );
}
