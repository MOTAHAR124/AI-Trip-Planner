import Image from "next/image";
import Link from "next/link";
import HeroGreeting from "./HeroGreeting";

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative min-h-150 bg-linear-to-b from-blue-400 to-blue-100"
    >
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <HeroGreeting />

            <h1 id="hero-title" className="text-5xl font-bold text-gray-900 leading-tight">
              {`AI Trip Planner for `}
              <span className="text-blue-600">smart travel planning</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Build a personalized, day-by-day itinerary in seconds with our AI travel planner and
              travel itinerary generator—routes, attractions, food picks, and hotel suggestions
              tailored to your preferences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#planner"
                aria-label="Jump to the trip planner"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Start Planning
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>

              <Link
                href="#features"
                aria-label="Jump to features section"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
              >
                Learn More
              </Link>

              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-900 bg-white/70 rounded-xl hover:bg-white transition-colors border border-black/10"
              >
                Travel Guides
              </Link>
            </div>
          </div>

          <div className="relative h-125" aria-hidden="true">
            <div className="absolute top-0 right-0 w-72 h-72 group hover:z-10 cursor-pointer">
              <Image
                src="/travel-1.jpg"
                alt="Scenic travel destination photo"
                fill
                sizes="288px"
                className="rounded-2xl object-cover shadow-xl transition-all duration-300 ease-out transform-gpu group-hover:scale-105 group-hover:-rotate-2 group-hover:shadow-2xl group-hover:-translate-y-1 group-hover:translate-x-1"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 w-72 h-72 group hover:z-10 cursor-pointer">
              <Image
                src="/travel-2.jpg"
                alt="Travel experience photo"
                fill
                sizes="288px"
                className="rounded-2xl object-cover shadow-xl transition-all duration-300 ease-out transform-gpu group-hover:scale-105 group-hover:rotate-2 group-hover:shadow-2xl group-hover:translate-y-1 group-hover:-translate-x-1"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 group hover:z-10 cursor-pointer">
              <Image
                src="/travel-3.jpg"
                alt="Travel adventure photo"
                fill
                sizes="288px"
                className="rounded-2xl object-cover shadow-xl transition-all duration-300 ease-out transform-gpu group-hover:scale-105 group-hover:-rotate-1 group-hover:shadow-2xl group-hover:-translate-y-1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
