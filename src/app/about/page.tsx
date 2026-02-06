import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, breadcrumbJsonLd } from "../../lib/seo";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE_NAME}: ${SITE_DESCRIPTION}`,
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-linear-to-b from-blue-400 to-blue-100">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About {SITE_NAME}</h1>
          <p className="text-gray-700">
            {SITE_NAME} is an AI-powered trip planning app that helps you generate a personalized, day-by-day travel
            itinerary in seconds.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">How it works</h2>
          <p className="text-gray-700">
            You enter your trip details (origin, destination, trip length, group size, budget, hotel style, and food
            preferences). The AI travel planner then produces a structured itinerary you can refine and regenerate.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">Limitations</h2>
          <p className="text-gray-700">
            AI-generated itineraries are suggestions. Always verify important details like opening hours, prices,
            safety, and local rules before booking or traveling.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">Privacy</h2>
          <p className="text-gray-700">
            Read our <Link href="/privacy" className="text-blue-700 underline underline-offset-2">Privacy Policy</Link>{" "}
            to understand what trip details are processed when you use the planner.
          </p>
        </div>
      </section>
    </main>
  );
}
