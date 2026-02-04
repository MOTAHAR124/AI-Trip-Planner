import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "../../lib/seo";

export const metadata: Metadata = {
  title: "AI Trip Planner Blog: AI Travel Planning Guides",
  description:
    "Actionable guides for AI travel planning: learn how to use an AI trip planner, build better itineraries, and plan smarter trips.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogPage() {
  return (
    <main className="relative min-h-screen bg-linear-to-b from-blue-400 to-blue-100">
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{SITE_NAME} Blog</h1>
          <p className="text-gray-700">
            Practical tips for smart travel planning—get more value from an AI travel planner and create better day-by-day itineraries.
          </p>

          <div className="mt-10 bg-blue-50/70 rounded-2xl p-8 shadow-lg border border-blue-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Popular guides</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>How to use an AI trip planner to build a realistic itinerary</li>
              <li>Travel itinerary generator tips: pace, rest breaks, and transit time</li>
              <li>Best prompts for smarter travel planning (food, budget, hidden gems)</li>
              <li>How to plan a 3-day weekend trip with AI</li>
              <li>Family travel planning with AI: kid-friendly schedules</li>
              <li>Budget travel planning: maximizing value without missing highlights</li>
            </ul>
          </div>

          <div className="mt-10 flex gap-4">
            <Link
              href="/#planner"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Use the trip planner
            </Link>
            <Link
              href="/#faq"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-blue-700 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
            >
              Read FAQs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
