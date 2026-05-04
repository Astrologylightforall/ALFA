"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, Video } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import gsap from "gsap";

export default function Header() {
  const { t, language, setLanguage } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastYRef.current;
    if (latest > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else if (latest < previous) {
      setIsHidden(false);
    }
    lastYRef.current = latest;
  });

  const [panchang, setPanchang] = useState({ tithi: "...", nakshatra: "...", rahu: "..." });

  useEffect(() => {
    const calculatePanchang = () => {
      const tithis = ["Shukla Ekadashi", "Krishna Dwitiya", "Shukla Chaturthi", "Purnima", "Krishna Ashtami"];
      const nakshatras = ["Rohini", "Pushya", "Magha", "Chitra", "Swati"];
      const rahuKaal = ["16:30–18:00", "07:30–09:00", "15:00–16:30", "12:00–13:30", "13:30–15:00", "10:30–12:00", "09:00–10:30"];
      const now = new Date();
      const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
      const dayOfWeek = now.getDay();
      return {
        tithi: tithis[dayOfYear % tithis.length],
        nakshatra: nakshatras[dayOfYear % nakshatras.length],
        rahu: rahuKaal[dayOfWeek]
      };
    };
    setPanchang(calculatePanchang());
  }, []);

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.testimonials"), href: "/testimonials" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-secondary-bg text-cream text-[11px] py-2 px-4 hidden md:flex justify-between items-center z-50 fixed top-0 w-full font-body border-b border-white/5 shadow-sm">
        <div className="flex items-center gap-6">
          <a href="tel:+919953746052" className="flex items-center gap-1.5 hover:text-gold-primary transition-colors">
            <Phone size={12} className="text-gold-primary" />
            <span className="font-semibold">099537 46052</span>
          </a>
          <span className="text-cream/50">Mon-Sun, 10 AM – 9 PM IST</span>
        </div>

        <div className="flex items-center gap-4 text-gold-primary/90 font-medium tracking-wide">
          <div className="flex items-center gap-2 bg-surface/50 px-3 py-1 rounded-full border border-white/5">
            <span className="text-[10px] text-cream/40 uppercase">Tithi</span> {panchang.tithi}
          </div>
          <div className="flex items-center gap-2 bg-surface/50 px-3 py-1 rounded-full border border-white/5">
            <span className="text-[10px] text-cream/40 uppercase">Nakshatra</span> {panchang.nakshatra}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gold-primary">★</span> 5.0 Google Rated
        </div>
      </div>

      {/* Main Nav */}
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className={`fixed left-0 w-full z-40 transition-all duration-500 ${isScrolled
          ? "top-0 md:top-10 bg-primary-bg/95 backdrop-blur-xl shadow-2xl border-b border-white/10"
          : "top-0 md:top-10 bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/images/logo.png"
                alt="ALFA Logo"
                width={50}
                height={50}
                className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-full border border-gold-primary/30 group-hover:border-gold-primary transition-colors duration-500"
              />
              <div className="absolute inset-0 rounded-full bg-gold-primary/10 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">ALFA</span>
              <span className="text-[9px] text-gold-primary/70 font-body uppercase tracking-[0.2em] hidden sm:block">Astrology Light For All</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className="relative group py-2 overflow-hidden">
                  <span className={`text-sm font-semibold transition-colors duration-300 ${isActive ? "text-gold-primary" : "text-cream group-hover:text-gold-primary"}`}>
                    {link.label}
                  </span>
                  <span className={`absolute left-0 bottom-1 w-full h-[1.5px] bg-gold-primary transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="text-[11px] font-bold px-3 py-1.5 rounded-full border border-gold-primary/30 text-gold-primary hover:bg-gold-primary hover:text-primary-bg transition-all"
            >
              {language === "en" ? "EN | हिं" : "हिं | EN"}
            </button>

            <Link
              href="/contact"
              className="hidden md:flex items-center bg-gradient-gold text-primary-bg text-sm font-bold px-7 py-2.5 rounded-full shadow-lg hover:scale-[1.05] transition-all duration-300"
            >
              {t("nav.book_free")}
            </Link>

            <button className="md:hidden text-gold-primary" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-primary-bg/98 backdrop-blur-2xl z-50 transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-500 ease-in-out md:hidden flex flex-col`}>
        <div className="flex justify-between items-center p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="ALFA" width={32} height={32} className="rounded-full" />
            <span className="font-display text-xl text-white font-bold">ALFA</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-gold-primary p-2">
            <X size={32} />
          </button>
        </div>
        <nav className="flex flex-col items-center gap-10 mt-20 px-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-4xl font-display font-bold transition-all ${pathname === link.href ? "text-gold-primary" : "text-cream hover:text-gold-primary"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="w-full text-center bg-gradient-gold text-primary-bg text-xl font-bold py-5 rounded-full mt-10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("nav.book_free")}
          </Link>
        </nav>
      </div>
    </>
  );
}
