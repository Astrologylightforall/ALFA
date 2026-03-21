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
import ScrollProgress from "@/components/ui/ScrollProgress";
import AnimatedGrain from "@/components/ui/AnimatedGrain";
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

export const metadata: Metadata = {
  title: "Astrology Light For All (ALFA) | Best Astrologer in Delhi",
  description: "Consult Manjul Malhotra, Delhi's trusted Vedic astrologer for kundali reading, matching, career, and marriage guidance.",
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
            <SchemaMarkup />
            <ScrollProgress />
            <Header />
            <PageTransitionProvider>
              <main className="pt-24 min-h-screen">
                {children}
              </main>
            </PageTransitionProvider>
            <Footer />
            <StickyMobileBar />
            <FloatingWhatsApp />
            <MysticBall />
            <CustomCursor />
            <AnimatedGrain />
          </LanguageProvider>
        </LenisProvider>
      </body>
    </html>
  );
}





