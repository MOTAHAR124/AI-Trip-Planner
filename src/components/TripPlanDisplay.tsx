import Markdown from 'markdown-to-jsx';
import { useMemo, useCallback } from 'react';
import Image from 'next/image';

interface TripPlanDisplayProps {
  tripPlan: string;
}

export default function TripPlanDisplay({ tripPlan }: TripPlanDisplayProps) {
  const sanitized = (tripPlan || '').trim();
  // Normalize excessive blank lines to avoid uneven spacing in rendering
  const normalized = useMemo(() => sanitized.replace(/\n{3,}/g, '\n\n'), [sanitized]);

  // Simple slugify to match original behavior
  const slugify = useCallback((s: string) => {
    return s
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }, []);

  // Extract H2 headings for a quick table of contents
  const toc = useMemo(() => {
    const lines = normalized.match(/^##\s+.+$/gm) || [];
    return lines.map((l) => {
      const title = l.replace(/^##\s+/, '').trim();
      return { title, id: slugify(title) };
    });
  }, [normalized, slugify]);

  return (
    <div className="mt-6 sm:mt-8 bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Your Trip Plan</h2>
          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-200">
              ✨ AI Generated
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(normalized)}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 cursor-pointer text-sm"
              title="Copy Markdown"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline text-sm font-medium">Copy</span>
              <span className="sm:hidden text-xs">Copy</span>
            </button>
            <button
              onClick={() => {
                const blob = new Blob([normalized], { type: 'text/markdown;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'trip-plan.md';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 cursor-pointer text-sm"
              title="Download Markdown"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
              </svg>
              <span className="hidden sm:inline text-sm font-medium">Download</span>
              <span className="sm:hidden text-xs">DL</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 cursor-pointer text-sm"
              title="Print or Save as PDF"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span className="hidden sm:inline text-sm font-medium">Print</span>
              <span className="sm:hidden text-xs">Print</span>
            </button>
          </div>
        </div>

        {/* Table of contents for quick navigation */}
        {toc.length > 0 && (
          <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-900 print:hidden">
            <div className="font-semibold mb-2">On this page</div>
            <ul className="flex flex-wrap gap-x-3 gap-y-4">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="px-3 py-2 rounded-full bg-white border border-blue-200 hover:bg-blue-100 transition-colors text-xs sm:text-sm"
                    aria-label={`Jump to section ${item.title}`}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-gray-900 max-w-none leading-7 tracking-[0.01em] overflow-x-hidden">
          <Markdown
            options={{
              forceBlock: true,
              forceWrapper: true,
              wrapper: 'div',
              overrides: {
                h1: {
                  component: ({ children, ...props }) => {
                    const text = Array.isArray(children) ? children.join(' ') : String(children);
                    return (
                      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-8 sm:mt-12 mb-4 sm:mb-6 first:mt-0 pb-2 sm:pb-3 border-b-2 border-blue-100" {...props}>
                        {text}
                      </h1>
                    );
                  },
                },
                h2: {
                  component: ({ children, ...props }) => {
                    const raw = Array.isArray(children) ? children.join(' ') : String(children);
                    const slug = slugify(String(raw));
                    return (
                      <h2 id={slug} className="group scroll-mt-24 text-xl sm:text-2xl font-bold text-gray-800 mt-8 sm:mt-10 mb-3 sm:mb-4 flex items-center" {...props}>
                        <span className="w-1 h-6 sm:h-8 bg-blue-500 rounded-full mr-3" />
                        {raw}
                        <a href={`#${slug}`} className="ml-2 opacity-0 group-hover:opacity-100 text-blue-500" aria-label="Anchor">
                          #
                        </a>
                      </h2>
                    );
                  },
                },
                h3: {
                  component: ({ children, ...props }) => (
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mt-6 sm:mt-8 mb-2 sm:mb-3 flex items-center" {...props}>
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full mr-2"></span>
                      {children}
                    </h3>
                  ),
                },
                p: {
                  component: ({ children, ...props }) => (
                    <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-5 last:mb-0 leading-relaxed break-words" {...props}>
                      {children}
                    </p>
                  ),
                },
                ul: {
                  component: ({ children, ...props }) => (
                    <ul className="mb-4 sm:mb-5 last:mb-0 space-y-2 pl-1" {...props}>
                      {children}
                    </ul>
                  ),
                },
                ol: {
                  component: ({ children, ...props }) => (
                    <ol className="mb-4 sm:mb-5 last:mb-0 space-y-2 pl-4 list-decimal" {...props}>
                      {children}
                    </ol>
                  ),
                },
                li: {
                  component: ({ children, ...props }) => (
                    <li className="flex items-start text-gray-700" {...props}>
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                      <span className="text-sm sm:text-base">{children}</span>
                    </li>
                  ),
                },
                strong: {
                  component: ({ children, ...props }) => (
                    <strong className="font-semibold text-gray-900" {...props}>
                      {children}
                    </strong>
                  ),
                },
                em: {
                  component: ({ children, ...props }) => (
                    <em className="italic text-gray-600" {...props}>
                      {children}
                    </em>
                  ),
                },
                blockquote: {
                  component: ({ children, ...props }) => (
                    <blockquote className="border-l-4 border-blue-300 bg-blue-50 pl-3 sm:pl-4 py-2 my-4 sm:my-5 last:mb-0 italic text-gray-700" {...props}>
                      {children}
                    </blockquote>
                  ),
                },
                hr: {
                  component: ({ ...props }) => (
                    <hr className="my-6 sm:my-8 border-gray-200" {...props} />
                  ),
                },
                table: {
                  component: ({ children, ...props }) => (
                    <div className="overflow-x-auto my-4 sm:my-6 -mx-4 sm:mx-0">
                      <table className="min-w-full bg-white border border-gray-200 rounded-lg" {...props}>
                        {children}
                      </table>
                    </div>
                  ),
                },
                th: {
                  component: ({ children, ...props }) => (
                    <th className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 text-left text-xs sm:text-sm font-semibold text-gray-900 border-b border-gray-200" {...props}>
                      {children}
                    </th>
                  ),
                },
                td: {
                  component: ({ children, ...props }) => (
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 border-b border-gray-200" {...props}>
                      {children}
                    </td>
                  ),
                },
                code: {
                  component: ({ children, ...props }) => (
                    <code className="break-words whitespace-pre-wrap bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs sm:text-sm font-mono" {...props}>
                      {children}
                    </code>
                  ),
                },
                pre: {
                  component: ({ children, ...props }) => (
                    <pre className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto my-4 sm:my-5 last:mb-0 text-xs sm:text-sm" {...props}>
                      {children}
                    </pre>
                  ),
                },
                img: {
                  component: ({ alt, ...props }) => (
                    // Use Next.js Image component for better performance and add alt prop
                    <Image 
                      className="max-w-full h-auto rounded" 
                      alt={alt || "Trip plan image"} 
                      width={800} 
                      height={600} 
                      {...props} 
                    />
                  ),
                },
              },
            }}
          >
            {normalized}
          </Markdown>
        </div>

        {/* Additional styling for better visual separation */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:space-x-4 text-xs sm:text-sm text-gray-500">
            <span>Generated with AI</span>
            <span className="hidden sm:inline">•</span>
            <span>Trip Planner</span>
            <span className="hidden sm:inline">•</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}