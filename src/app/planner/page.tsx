import type { Metadata } from "next";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import FaqSection from "../../components/FaqSection";
import JsonLd from "../../components/JsonLd";
import { FAQ_ITEMS, SITE_URL, breadcrumbJsonLd, faqJsonLd } from "../../lib/seo";

const TripPlannerForm = dynamic(
  () => import("../../components/TripPlannerForm.js").then((mod) => mod.default),
  { loading: () => <LoadingSkeleton /> }
);

export const metadata: Metadata = {
  title: "AI Travel Planner & Itinerary Generator",
  description:
    "Generate a personalized, day-by-day travel itinerary with routes, attractions, hotels, and food picks—based on your preferences and budget.",
  alternates: { canonical: `${SITE_URL}/planner` },
};

export default function PlannerPage() {
  return (
    <main className="min-h-screen bg-blue-100">
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Planner", path: "/planner" }]),
          faqJsonLd(FAQ_ITEMS),
        ]}
      />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Trip Planner</h1>
          <p className="text-gray-700">
            Create a realistic day-by-day itinerary in seconds. Add your destination, trip length, group size, budget,
            hotel style, and food preferences—then let the AI travel planner generate a plan you can refine.
          </p>

          <div id="planner" className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Generate your itinerary</h2>
            <TripPlannerForm />
          </div>
        </div>
      </section>

      <section className="pb-6">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">What you get</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Day-by-day schedule with morning, afternoon, and evening suggestions</li>
            <li>Attractions, activities, and pacing tips</li>
            <li>Restaurant ideas and local food highlights</li>
            <li>Hotel suggestions by style and budget range</li>
            <li>Local transport options and cost estimates</li>
            <li>Budget breakdown and money-saving tips</li>
          </ul>
        </div>
      </section>

      <FaqSection />
    </main>
  );
}
