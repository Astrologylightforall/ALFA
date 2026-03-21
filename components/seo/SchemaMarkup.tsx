import { CONTACT_INFO } from '@/lib/data';

export default function SchemaMarkup() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Astrology Light For All (ALFA)",
    "@id": "https://astrologylightforall.com",
    "url": "https://astrologylightforall.com",
    "telephone": CONTACT_INFO.phoneFull,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Subhash Nagar",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110027",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.6441,
      "longitude": 77.1082
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "10:00",
      "closes": "21:00"
    },
    "sameAs": [
      "https://www.instagram.com/astrologylight4all",
      "https://www.youtube.com/@MANJULGMALHOTRA"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
}
