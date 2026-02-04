import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from "../components/HowItWorksSection";
import FaqSection from "../components/FaqSection";
import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import { FAQ_ITEMS, HOME_META_TITLE, SITE_KEYWORDS, faqJsonLd } from "../lib/seo";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../components/LoadingSkeleton";

const TripPlannerForm = dynamic(
  () => import("../components/TripPlannerForm.js").then((mod) => mod.default),
  {
  loading: () => <LoadingSkeleton />,
  }
);

export const metadata: Metadata = {
  title: HOME_META_TITLE,
  description:
    "AI Trip Planner is a smart AI travel planner and travel itinerary generator. Build personalized day-by-day itineraries with routes, attractions, hotels, and food picks in seconds.",
  keywords: [...SITE_KEYWORDS],
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-100 ">
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />

      <section id="planner" className="py-20 bg-blue-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-2">
            Generate your travel itinerary
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Use the AI trip planner below to create a personalized, day-by-day itinerary based on your destination, budget, hotel style, and food preferences.
          </p>
          <TripPlannerForm />
        </div>
      </section>

      <FaqSection />
    </main>
  );
}
