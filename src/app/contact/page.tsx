import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import { SITE_NAME, SITE_URL, breadcrumbJsonLd } from "../../lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE_NAME} for support, feedback, or partnership inquiries.`,
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-linear-to-b from-blue-400 to-blue-100">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact</h1>
          <p className="text-gray-700">
            Have feedback, partnership ideas, or a bug report? Use the details below to reach the site owner.
          </p>

          <div className="mt-8 bg-blue-50/70 rounded-2xl shadow-lg border border-blue-100 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Support</h2>
            <p className="text-gray-700">
              For now, the fastest way to get help is via the project repository. If you prefer email support, add a
              contact address here.
            </p>
            <p className="text-gray-700 mt-4">
              <a
                href="https://github.com/MOTAHAR124/AI-Trip-Planner"
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 underline underline-offset-2"
              >
                GitHub repository
              </a>
            </p>
            <p className="text-gray-700 mt-4">
              Looking for legal pages? See <Link href="/terms" className="text-blue-700 underline underline-offset-2">Terms</Link>{" "}
              and <Link href="/privacy" className="text-blue-700 underline underline-offset-2">Privacy</Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
