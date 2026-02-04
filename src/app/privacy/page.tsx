import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "../../lib/seo";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: "Privacy policy for AI Trip Planner.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-blue-100">
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-700">
            This page explains what data is processed when you use {SITE_NAME}. If you have questions, contact the site owner.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">Data you provide</h2>
          <p className="text-gray-700">
            Trip details you enter (origin, destination, dates, preferences) are used to generate an itinerary. Avoid entering sensitive personal information.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">Authentication (optional)</h2>
          <p className="text-gray-700">
            If sign-in is enabled, your account information is handled by the configured provider (for example, Google). We use it to personalize your experience.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-3">Analytics</h2>
          <p className="text-gray-700">
            If analytics is enabled, aggregated usage data may be collected to measure performance and improve the product.
          </p>
        </div>
      </section>
    </main>
  );
}

