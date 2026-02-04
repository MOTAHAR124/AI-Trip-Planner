'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthButtons from './AuthButtons';

export default function Header() {
  const pathname = usePathname();
  const isBlog = pathname === '/blog' || pathname?.startsWith('/blog/');

  return (
    <header className="bg-[#50A2FF] border-b border-black/30 shadow-[0_6px_12px_rgba(37,99,235,0.25)] z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              AI Trip Planner
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
              <Link
                href="/#features"
                className="text-gray-900/90 hover:text-gray-900 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900/70"
              >
                Features
              </Link>
              <Link
                href="/#how-it-works"
                className="text-gray-900/90 hover:text-gray-900 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900/70"
              >
                How it works
              </Link>
              <Link
                href="/#planner"
                className="text-gray-900/90 hover:text-gray-900 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900/70"
              >
                Planner
              </Link>
              <Link
                href="/blog"
                aria-current={isBlog ? 'page' : undefined}
                className={
                  isBlog
                    ? 'text-gray-900 underline decoration-gray-900/80 decoration-2 underline-offset-8 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900/70'
                    : 'text-gray-900/90 hover:text-gray-900 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900/70'
                }
              >
                Blog
              </Link>
            </div>
          </div>
          <div>
            <AuthButtons />
          </div>
        </div>
      </nav>
    </header>
  );
}
