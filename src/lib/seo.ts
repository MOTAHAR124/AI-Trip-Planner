export const SITE_URL = "https://ai-trip-planner-pi-taupe.vercel.app";
export const SITE_NAME = "AI Trip Planner";
export const SITE_TAGLINE = "AI travel planner & itinerary generator";
export const SITE_DESCRIPTION =
  "Plan smarter in seconds. AI Trip Planner generates personalized, day-by-day travel itineraries with routes, attractions, food, and hotel suggestions based on your budget and preferences.";

export const SITE_KEYWORDS = [
  "AI Trip Planner",
  "AI travel planner",
  "travel itinerary generator",
  "trip planning app",
  "travel planner with AI",
  "smart travel planning",
  "AI itinerary",
  "trip planner",
  "travel planner",
] as const;

export const SOCIAL_IMAGE_ALT = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const HOME_META_TITLE = `${SITE_NAME}: Personalized Travel Itinerary Generator`;
export const HOME_META_DESCRIPTION =
  "Plan trips in seconds. AI Trip Planner creates a personalized day-by-day itinerary with routes, attractions, hotels, and food picks—based on your budget and preferences.";

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

export function webApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
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
    featureList: [
      "AI-powered trip planning",
      "Personalized day-by-day itineraries",
      "Budget-aware recommendations",
      "Hotel and food preferences",
      "Streaming markdown itinerary output",
    ],
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

export type BreadcrumbItem = { name: string; path: string };
export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
