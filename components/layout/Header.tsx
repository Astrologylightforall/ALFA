"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
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

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastYRef.current;
    
    // Transparent to dark background when scrolled even 1px
    if (latest > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Hide header on scroll down, show on scroll up
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else if (latest < previous) {
      setIsHidden(false);
    }
    
    lastYRef.current = latest;
  });

  const [panchang, setPanchang] = useState({ tithi: "Loading...", nakshatra: "Loading...", rahu: "Loading..." });

  useEffect(() => {
    const tithis = [
      "Shukla Ekadashi", "Krishna Dwitiya", "Shukla Chaturthi", "Purnima", "Krishna Ashtami", 
      "Shukla Saptami", "Amavasya", "Shukla Trayodashi", "Krishna Dashami", "Shukla Panchami"
    ];
    const nakshatras = [
      "Rohini", "Pushya", "Magha", "Chitra", "Swati", "Anuradha", "Shravana", "Dhanishta", "Revati", "Ashwini"
    ];
    const rahuKaal = [
      "16:30–18:00", // Sun
      "07:30–09:00", // Mon
      "15:00–16:30", // Tue
      "12:00–13:30", // Wed
      "13:30–15:00", // Thu
      "10:30–12:00", // Fri
      "09:00–10:30"  // Sat
    ];

    const now = new Date();
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
    const dayOfWeek = now.getDay();

    setPanchang({
      tithi: tithis[dayOfYear % tithis.length],
      nakshatra: nakshatras[dayOfYear % nakshatras.length],
      rahu: rahuKaal[dayOfWeek]
    });
  }, []);

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.testimonials"), href: "/testimonials" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const handleLogoHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const textEl = e.currentTarget.querySelector(".alfa-logo-text");
    if (textEl) {
      gsap.fromTo(
        textEl,
        { backgroundPosition: "200% center" },
        { backgroundPosition: "-200% center", duration: 1.5, ease: "power2.inOut" }
      );
    }
  };

  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      {/* Top Bar - Fixed above Header */}
      <div className="bg-secondary-bg text-cream text-[11px] py-1.5 px-4 hidden md:flex justify-between items-center z-50 fixed top-0 w-full font-body border-b border-white/5">
        <div className="flex items-center gap-4">
          <a href="tel:+919953746052" className="flex items-center gap-1 hover:text-gold-primary transition">
            <Phone size={11} className="text-gold-primary" />
            099537 46052
          </a>
          <span className="opacity-40">|</span>
          <span className="text-cream/70">Mon-Sun, 10 AM – 9 PM IST</span>
        </div>

        {/* Live Panchang Indicators */}
        <div className="flex items-center gap-3 text-gold-primary/80 font-semibold tracking-wide">
          <div className="flex items-center gap-1 bg-surface/30 px-2 py-0.5 rounded-md border border-gold-primary/10">
            <span className="text-[10px] text-cream/50">Tithi:</span> {panchang.tithi}
          </div>
          <div className="flex items-center gap-1 bg-surface/30 px-2 py-0.5 rounded-md border border-gold-primary/10">
            <span className="text-[10px] text-cream/50">Nakshatra:</span> {panchang.nakshatra}
          </div>
          <div className="flex items-center gap-1 bg-surface/30 px-2 py-0.5 rounded-md border border-gold-primary/10">
            <span className="text-[10px] text-cream/50">Rahu Kaal:</span> {panchang.rahu}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-gold-primary">★</span> 5.0 Google Rating
        </div>
      </div>

      {/* Main Nav */}
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className={`fixed left-0 w-full z-40 transition-colors duration-300 ${
          isScrolled
            ? "top-0 md:top-8 bg-[#0A0812]/90 backdrop-blur-xl shadow-lg border-b border-white/5"
            : "top-0 md:top-8 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group magnetic"
            onMouseEnter={handleLogoHover}
          >
            <img
              src="/images/logo.png"
              alt="ALFA Logo"
              className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-full border border-gold-primary/20 bg-surface/50 p-0.5 group-hover:border-gold-primary/50 transition-colors duration-300"
            />
            <div className="flex flex-col">
              <span 
                className="alfa-logo-text font-display text-xl md:text-2xl font-bold bg-clip-text text-transparent tracking-tight whitespace-nowrap bg-[length:200%_auto]"
                style={{ backgroundImage: "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)" }}
              >
                ALFA
              </span>
              <span className="text-[9px] md:text-[10px] text-cream/60 font-body uppercase tracking-wider hidden sm:block">
                Astrology Light For All
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group py-2"
                >
                  <span
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isActive ? "text-gold-primary" : "text-cream group-hover:text-white"
                    }`}
                  >
                    {link.label}
                  </span>
                  {/* Hover Underline */}
                  <span className="absolute left-0 bottom-1 w-full h-[1px] bg-gold-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left" />
                  {/* Active Dot */}
                  {isActive && (
                    <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTAs & Lang */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="text-xs font-semibold px-2 py-1 rounded border border-gold-primary/30 text-gold-primary hover:bg-gold-primary/10 transition magnetic"
            >
              {language === "en" ? "EN | हिं" : "हिं | EN"}
            </button>

            <Link
              href="/consultation-room"
              className="hidden lg:flex items-center gap-2 text-gold-primary hover:text-white border border-gold-primary/30 px-3 py-1.5 rounded-md transition-colors font-semibold text-xs bg-surface/30 group shadow-[0_0_15px_rgba(201,168,76,0.15)] hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]"
            >
              <Video size={14} className="group-hover:scale-110 transition-transform" /> <span className="relative top-[1px]">ALFA Portal</span>
            </Link>

            <Link
              href="/contact"
              className="hidden md:flex relative overflow-hidden text-primary-bg text-sm font-bold px-6 py-2.5 rounded-full shadow-lg magnetic group transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(201,168,76,0.5)]"
              style={{ backgroundImage: "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)" }}
            >
              <span className="relative z-10">{t("nav.book_free")}</span>
              {/* Shimmer sweep effect */}
              <span className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] animate-shimmer" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gold-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-[#0A0812]/95 backdrop-blur-lg z-50 transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-[0.25,1,0.5,1] md:hidden flex flex-col`}
      >
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="ALFA"
              className="w-8 h-8 rounded-full border border-gold-primary/20"
            />
            <span className="font-display text-xl text-gold-primary">ALFA</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gold-primary p-2"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col items-center gap-8 mt-16 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-2xl font-display transition duration-300 ${
                pathname === link.href ? "text-gold-primary" : "text-cream hover:text-gold-primary"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/consultation-room"
            className="flex items-center gap-3 text-2xl font-display text-gold-primary mt-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Video size={24} /> ALFA Portal
          </Link>
          <Link
            href="/contact"
            className="w-full text-center text-primary-bg text-lg font-bold px-6 py-4 rounded-full mt-8 shadow-lg relative overflow-hidden"
            style={{ backgroundImage: "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)" }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="relative z-10">{t("nav.book_free")}</span>
          </Link>
        </nav>
      </div>
    </>
  );
}
