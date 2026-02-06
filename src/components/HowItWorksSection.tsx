export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How the AI Trip Planner Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create a complete itinerary in minutes—perfect for weekend getaways or multi-day trips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-blue-200 hover:bg-blue-50/40 motion-reduce:transform-none">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-800 transition-colors">
              1) Add your trip details
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Enter origin, destination, dates, group size, budget, and preferences so the AI travel planner can personalize your route.
            </p>
          </div>
          <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-blue-200 hover:bg-blue-50/40 motion-reduce:transform-none">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-800 transition-colors">
              2) Get a day-by-day itinerary
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The travel itinerary generator creates a daily schedule with attractions, activities, dining ideas, and travel tips.
            </p>
          </div>
          <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-blue-200 hover:bg-blue-50/40 motion-reduce:transform-none">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-800 transition-colors">
              3) Refine and re-generate
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Adjust preferences (pace, budget, food, hotel style) and generate a new plan until it feels perfect.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
