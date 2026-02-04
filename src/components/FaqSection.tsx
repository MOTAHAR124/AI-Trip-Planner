import { FAQ_ITEMS } from "../lib/seo";

export default function FaqSection() {
  return (
    <section id="faq" className="py-20 bg-blue-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">AI Trip Planner FAQs</h2>
          <p className="text-xl text-gray-600">
            Quick answers about our AI travel planner and itinerary generator.
          </p>
        </div>

        <div className="space-y-6">
          {FAQ_ITEMS.map((item) => (
            <div
              key={item.question}
              className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:border-blue-200 hover:bg-blue-50/30 motion-reduce:transform-none"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-800 transition-colors">
                {item.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
