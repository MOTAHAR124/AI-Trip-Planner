export const SITE_URL = "https://ai-trip-planner-pi-taupe.vercel.app";
export const SITE_NAME = "AI Trip Planner";
export const SITE_TAGLINE = "AI travel planner & itinerary generator";
export const SITE_DESCRIPTION =
  "AI Trip Planner is a smart AI travel planner that generates personalized, day-by-day travel itineraries in seconds—optimized routes, attractions, food, and hotel suggestions based on your preferences.";

export const SITE_KEYWORDS = [
  "AI Trip Planner",
  "AI travel planner",
  "travel itinerary generator",
  "smart travel planning",
  "AI itinerary",
  "trip planner",
  "travel planner",
] as const;

export const SOCIAL_IMAGE_ALT = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const HOME_META_TITLE = `${SITE_NAME}: ${SITE_TAGLINE}`;

export type FaqItem = { question: string; answer: string };
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is an AI trip planner?",
    answer:
      "An AI trip planner uses artificial intelligence to create a personalized itinerary based on your destination, trip length, budget, and preferences.",
  },
  {
    question: "How does the travel itinerary generator work?",
    answer:
      "You enter your trip details (from/to, days, group size, budget, hotel and food preferences). The app generates a day-by-day itinerary with suggestions for attractions, activities, and logistics.",
  },
  {
    question: "Can I plan trips for families or groups?",
    answer:
      "Yes. You can include adults and kids to tailor recommendations for group-friendly activities and pacing.",
  },
  {
    question: "Does it work on mobile?",
    answer:
      "Yes. The interface is designed mobile-first and works well on phones and tablets.",
  },
  {
    question: "Is AI Trip Planner free to use?",
    answer:
      "You can generate itineraries without changing the domain. Costs depend on the underlying AI API usage configured for your deployment.",
  },
];

export function absoluteUrl(path: string) {
  return new URL(path.startsWith("/") ? path : `/${path}`, SITE_URL).toString();
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/favicon.ico"),
  };
}

export function softwareAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "TravelApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
}

export function productJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    brand: { "@type": "Brand", name: SITE_NAME },
    url: SITE_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
