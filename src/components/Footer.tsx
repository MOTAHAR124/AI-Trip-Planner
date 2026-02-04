import Link from "next/link";
import { SITE_NAME } from "../lib/seo";

export default function Footer() {
  return (
    <footer className="bg-blue-100 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">{SITE_NAME}</span> — smart travel planning with AI.
          </p>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/#planner" className="text-gray-700 hover:text-gray-900">
              Trip planner
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-gray-900">
              Blog
            </Link>
            <Link href="/privacy" className="text-gray-700 hover:text-gray-900">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-700 hover:text-gray-900">
              Terms
            </Link>
            <a href="/sitemap.xml" className="text-gray-700 hover:text-gray-900">
              Sitemap
            </a>
            <a href="/robots.txt" className="text-gray-700 hover:text-gray-900">
              Robots
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

