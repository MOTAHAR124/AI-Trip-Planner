import Markdown from 'markdown-to-jsx';

interface TripPlanDisplayProps {
  tripPlan: string;
}

export default function TripPlanDisplay({ tripPlan }: TripPlanDisplayProps) {
  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Your Trip Plan</h2>
          <div className="flex items-center space-x-3">
            <span className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-200">
              ✨ AI Generated
            </span>
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
              title="Print or Save as PDF"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span className="text-sm font-medium">Print</span>
            </button>
          </div>
        </div>
        
        <div className="prose prose-lg text-gray-900 max-w-none">
          <Markdown
            options={{
              forceBlock: true,
              forceWrapper: true,
              wrapper: 'div',
              overrides: {
                h1: {
                  component: ({ children, ...props }) => (
                    <h1 className="text-4xl font-bold text-gray-900 mt-12 mb-6 first:mt-0 pb-3 border-b-2 border-blue-100" {...props}>
                      {children}
                    </h1>
                  ),
                },
                h2: {
                  component: ({ children, ...props }) => (
                    <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4 flex items-center" {...props}>
                      <span className="w-1 h-8 bg-blue-500 rounded-full mr-3"></span>
                      {children}
                    </h2>
                  ),
                },
                h3: {
                  component: ({ children, ...props }) => (
                    <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-3 flex items-center" {...props}>
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      {children}
                    </h3>
                  ),
                },
                p: {
                  component: ({ children, ...props }) => (
                    <p className="text-gray-700 mb-4 leading-relaxed text-base" {...props}>
                      {children}
                    </p>
                  ),
                },
                ul: {
                  component: ({ children, ...props }) => (
                    <ul className="mb-6 space-y-2" {...props}>
                      {children}
                    </ul>
                  ),
                },
                ol: {
                  component: ({ children, ...props }) => (
                    <ol className="mb-6 space-y-2" {...props}>
                      {children}
                    </ol>
                  ),
                },
                li: {
                  component: ({ children, ...props }) => (
                    <li className="flex items-start text-gray-700" {...props}>
                      <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{children}</span>
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
                    <blockquote className="border-l-4 border-blue-300 bg-blue-50 pl-4 py-2 my-4 italic text-gray-700" {...props}>
                      {children}
                    </blockquote>
                  ),
                },
                hr: {
                  component: ({ ...props }) => (
                    <hr className="my-8 border-gray-200" {...props} />
                  ),
                },
                table: {
                  component: ({ children, ...props }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full bg-white border border-gray-200 rounded-lg" {...props}>
                        {children}
                      </table>
                    </div>
                  ),
                },
                th: {
                  component: ({ children, ...props }) => (
                    <th className="px-4 py-3 bg-gray-50 text-left text-sm font-semibold text-gray-900 border-b border-gray-200" {...props}>
                      {children}
                    </th>
                  ),
                },
                td: {
                  component: ({ children, ...props }) => (
                    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200" {...props}>
                      {children}
                    </td>
                  ),
                },
                code: {
                  component: ({ children, ...props }) => (
                    <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" {...props}>
                      {children}
                    </code>
                  ),
                },
                pre: {
                  component: ({ children, ...props }) => (
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4" {...props}>
                      {children}
                    </pre>
                  ),
                },
              },
            }}
          >
            {tripPlan}
          </Markdown>
        </div>
        
        {/* Additional styling for better visual separation */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>Generated with AI</span>
            <span>•</span>
            <span>Trip Planner</span>
            <span>•</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}