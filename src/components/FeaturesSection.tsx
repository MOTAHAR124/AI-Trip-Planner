import { MapPin, Calendar, Users, DollarSign, Hotel, Utensils } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Smart Itineraries',
    description: 'AI-powered trip planning that considers your preferences and creates the perfect route.',
  },
  {
    icon: Calendar,
    title: 'Flexible Planning',
    description: 'Plan trips of any duration, from weekend getaways to extended vacations.',
  },
  {
    icon: Users,
    title: 'Group-Friendly',
    description: 'Perfect for solo travelers, couples, or family trips with customized recommendations.',
  },
  {
    icon: DollarSign,
    title: 'Budget Conscious',
    description: 'Get recommendations that match your budget, from luxury to budget-friendly options.',
  },
  {
    icon: Hotel,
    title: 'Accommodation Options',
    description: 'Find the perfect place to stay based on your preferences and requirements.',
  },
  {
    icon: Utensils,
    title: 'Local Cuisine',
    description: 'Discover authentic local restaurants and food experiences.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our AI Travel Planner?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Smart travel planning made simple: generate a complete itinerary with routes, pacing, and recommendations that match your style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-blue-200 hover:bg-blue-50/40 motion-reduce:transform-none"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 transition-colors group-hover:bg-blue-200/70">
                <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-800 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
