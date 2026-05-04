import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Noto_Sans_Devanagari } from "next/font/google";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileBar from "@/components/layout/StickyMobileBar";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import MysticBall from "@/components/ui/MysticBall";
import CustomCursor from "@/components/ui/CustomCursor";
import LenisProvider from "@/components/providers/LenisProvider";
import PageTransitionProvider from "@/components/providers/PageTransitionProvider";
import ScrollTimelineProvider from "@/components/providers/ScrollTimelineProvider";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AnimatedGrain from "@/components/ui/AnimatedGrain";
import AmbientBackground from "@/components/background/AmbientBackground";

import ParticleCursor from "@/components/ui/ParticleCursor";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A1111",
};

export const metadata: Metadata = {
  title: {
    default: "Astrology Light For All (ALFA) | Best Astrologer in Delhi",
    template: "%s | ALFA Astrology",
  },
  description: "Consult Manjul Malhotra, Delhi's trusted Vedic astrologer for kundali reading, matching, career, and marriage guidance. 100% verified accurate predictions.",
  keywords: ["best astrologer in delhi", "vedic astrology", "kundali matching", "career astrology", "vastu expert", "manjul malhotra", "online astrologer"],
  authors: [{ name: "Manjul Malhotra" }],
  creator: "Manjul Malhotra",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://astrologylight4all.com",
    siteName: "Astrology Light For All",
    title: "Astrology Light For All (ALFA) | Best Astrologer in Delhi",
    description: "Expert Vedic astrology consultations by Manjul Malhotra. Get your Kundali, Career, Marriage, and Vastu analysis today.",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "Astrology Light For All Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Astrology Light For All (ALFA)",
    description: "Expert Vedic astrology consultations by Manjul Malhotra.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${notoDevanagari.variable} antialiased`}
      >
        <LenisProvider>
          <LanguageProvider>
            <ScrollTimelineProvider>
              <AmbientBackground />

              <ParticleCursor />
              <SchemaMarkup />
              <ScrollProgress />
              <Header />
              <PageTransitionProvider>
                <main className="pt-24 pb-[60px] md:pb-0 min-h-screen relative z-10">
                  {children}
                </main>
              </PageTransitionProvider>
              <Footer />
              <StickyMobileBar />
              <FloatingWhatsApp />
              <MysticBall />
              <CustomCursor />
              <AnimatedGrain />
            </ScrollTimelineProvider>
          </LanguageProvider>
        </LenisProvider>
      </body>
    </html>
  );
}





