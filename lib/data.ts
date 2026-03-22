import { ShieldCheck, Star, Phone, Globe, Heart, BookOpen, Briefcase, MapPin, MessageCircle, Mail } from 'lucide-react';

export const SERVICES_DATA = [
  {
    slug: "kundali-reading",
    title: "Kundali Reading",
    title_hindi: "कुंडली पाठन",
    description: "In-depth analysis of your Janam Kundali — planetary positions, houses, doshas, and life path predictions.",
    cta: "Learn More →",
    href: "/services/kundali-reading",
    icon: 'FileText', 
    category: "Astrology",
    key_points: ["Lagna, Moon sign, and Sun sign analysis", "Planetary Dasha and Antardasha timeline", "Life path predictions for career, health, relationships", "Identification of Yogas and Doshas", "Personalised remedies"],
    whatsapp_message: "Namaste Manjul ji, I am interested in a Kundali Reading consultation. Please share details and availability."
  },
  {
    slug: "kundali-matching",
    title: "Kundali Matching",
    title_hindi: "कुंडली मिलान",
    description: "Expert Ashtakoota Milan across 36 gunas — Mangal Dosha, Nadi Dosha & Bhakoot Dosha analysis before marriage.",
    cta: "Learn More →",
    href: "/services/kundali-matching",
    icon: 'Heart',
    category: "Marriage",
    key_points: ["Complete 36 Guna analysis", "Mangal Dosha identification and remedies", "Nadi and Bhakoot Dosha assessment", "Vivah Muhurat selection"],
    whatsapp_message: "Namaste Manjul ji, I need Kundali Matching for a marriage proposal. Please guide me."
  },
  {
    slug: "career-astrology",
    title: "Career Astrology",
    title_hindi: "कैरियर ज्योतिष",
    description: "Planetary guidance for career obstacles, job changes, business decisions, and financial investments.",
    cta: "Learn More →",
    href: "/services/career-astrology",
    icon: 'Briefcase',
    category: "Astrology",
    key_points: ["Career path analysis via 10th house", "Business timing and partner compatibility", "Financial investment guidance", "Remedies for career obstacles"],
    whatsapp_message: "Namaste Manjul ji, I need career and business astrology guidance. Can we schedule a consultation?"
  },
  {
    slug: "marriage-astrology",
    title: "Marriage Astrology",
    title_hindi: "विवाह ज्योतिष",
    description: "Horoscope compatibility, Vivah Muhurat selection, and Vedic remedies for delayed or troubled marriages.",
    cta: "Learn More →",
    href: "/services/marriage-astrology",
    icon: 'UserPlus',
    category: "Marriage",
    key_points: ["Delayed marriage analysis", "Partner characteristics prediction", "Vivah Muhurat selection", "Post-marriage compatibility guidance"],
    whatsapp_message: "Namaste Manjul ji, I need marriage astrology guidance. Please share your consultation details."
  },
  {
    slug: "vastu-remedies",
    title: "Astrology Stones & Vastu",
    title_hindi: "रत्न और वास्तु",
    description: "Birth chart-based gemstone recommendations and Vastu Shastra guidance for home and business spaces.",
    cta: "Learn More →",
    href: "/services/vastu-remedies",
    icon: 'Home',
    category: "Vastu",
    key_points: ["Gemstone recommendation by Lagna and chart", "Home and office Vastu guidance", "Puja recommendations for planetary peace", "Rudraksha recommendations"],
    whatsapp_message: "Namaste Manjul ji, I am interested in gemstone recommendations and Vastu guidance. Please help."
  },
  {
    slug: "horoscope-2026",
    title: "2026 Horoscope",
    title_hindi: "2026 राशिफल",
    description: "Detailed yearly predictions for 2026 — Sun transit impact, Shani Dasha effects, and actionable remedies.",
    cta: "Learn More →",
    href: "/services/horoscope-2026",
    icon: 'Calendar',
    category: "Astrology",
    key_points: ["All 12 Rashi covered", "Sun transit impact", "Shani Dasha analysis", "Actionable remedies for 2026"],
    whatsapp_message: "Namaste Manjul ji, I want my detailed 2026 horoscope prediction. Please guide."
  }
];

export const TESTIMONIALS_DATA = [
  {
    name: "Prashant Singh",
    source: "Google Review",
    rating: 5,
    text: "My sessions with Manjul ji were truly insightful and helpful. His predictions were incredibly accurate. I finally have clarity on my career path. Highly recommend to everyone.",
    time: "7 months ago"
  },
  {
    name: "Karan Sharma",
    source: "WhatsApp",
    rating: 5,
    text: "We consulted Manjul ji for kundali matching before our son's wedding. He was extremely thorough in analysing Mangal Dosha and suggested simple, effective remedies. Very reliable.",
    time: "Recent"
  },
  {
    name: "Pooja Gupta",
    source: "Google Review",
    rating: 5,
    text: "Called for a career consultation and was amazed at how accurate the reading was. Manjul ji's guidance gave me the confidence to make a decision I had been delaying for months.",
    time: "Recent"
  },
  {
    name: "Rahul Verma",
    source: "Google Review",
    rating: 5,
    text: "Extremely detailed Kundali match. Manjul Malhotra was very patient. He explained terms beautifully without making them sound fatalistic. He focuses heavily on actionable remedies.",
    time: "2 weeks ago"
  },
  {
    name: "Nidhi Aggarwal",
    source: "WhatsApp",
    rating: 5,
    text: "The Vastu advice for my new boutique has transformed the work environment. Within two weeks of placing remedies correctly, we noticed improved footfall and smoother sales cycles.",
    time: "1 month ago"
  },
  {
    name: "Sarthak Kapoor",
    source: "Google Review",
    rating: 5,
    text: "I consulted for business astrology for entering a new partnership. The timing of execution he recommended saved me from taking a critical financial risk. Trust his guidance.",
    time: "4 months ago"
  },
  {
    name: "Rishi Kant",
    source: "Google Review",
    rating: 5,
    text: "Great experience. Accurate reading with simple gemstone advice that I could easily follow without high costs. Highly accessible online consulting approach.",
    time: "5 months ago"
  },
  {
    name: "Anjali Mehta",
    source: "WhatsApp",
    rating: 5,
    text: "The horoscope analysis provided for my daughter was so calm and reassuring. Clear, logical advice without exaggerating bad alignments. We are very satisfied with his reading.",
    time: "Today"
  }
];

export const STATS_DATA = [
  { number: "5.0★", label: "Google Rating", sublabel: "20 Verified Reviews" },
  { number: "100%", label: "Positive Feedback", sublabel: "Every review 5 stars" },
  { number: "10+", label: "Years of Experience", sublabel: "Vedic Astrology" },
  { number: "Free", label: "Initial Analysis", sublabel: "No commitment needed" }
];

export const FEATURES_DATA = [
  { icon: ShieldCheck, title: "Google Verified Profile", desc: "Officially verified on Google My Business — your assurance of legitimacy." },
  { icon: Star, title: "5-Star Rated Consistently", desc: "Every single review is 5 stars. Our reputation is built on results." },
  { icon: Phone, title: "Free Initial Consultation", desc: "Begin your journey with zero risk — free horoscope analysis." },
  { icon: Globe, title: "Serving All of India Online", desc: "Consult from anywhere via phone or video call." },
  { icon: Heart, title: "Inclusive & Non-Judgmental", desc: "LGBTQ+ friendly. All backgrounds welcomed." },
  { icon: BookOpen, title: "Classical Vedic Methodology", desc: "Rooted in authentic Jyotish Shastra — not generic signs." }
];

export const CONTACT_INFO = {
  address: "10/17, Ground Floor, Subhash Nagar, New Delhi, Delhi 110027",
  phone: "+91 99996 91464",
  phoneFull: "+919999691464",
  whatsapp: "09999691464",
  whatsappFull: "+919999691464",
  email: "astrologylightforall@gmail.com",
  hours: "Monday to Sunday, 10:00 AM – 9:00 PM IST",
  locationUrl: "https://share.google/aFHmQNSEbUpkLwG6E"
};
