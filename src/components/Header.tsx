'use client';

import Link from 'next/link';
import AuthButtons from './AuthButtons';

export default function Header() {
  return (
    <header className="bg-blue shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              AI Trip Planner
            </Link>
          </div>
          <div>
            <AuthButtons />
          </div>
        </div>
      </nav>
    </header>
  );
}