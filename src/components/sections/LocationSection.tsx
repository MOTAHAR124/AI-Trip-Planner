import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { TripPlannerFormData } from '../types/tripPlanner';

interface LocationSectionProps {
  register: UseFormRegister<TripPlannerFormData>;
  errors: FieldErrors<TripPlannerFormData>;
}

export default function LocationSection({ register, errors }: LocationSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 flex items-center">
        <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
        Location Details
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <input
            type="text"
            {...register('from')}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 text-black font-semibold uppercase focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Departure location"
            suppressHydrationWarning={true}
          />
          {errors.from && <p className="mt-1 text-sm text-red-600">{errors.from.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <input
            type="text"
            {...register('to')}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 text-black font-semibold uppercase focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Destination"
            suppressHydrationWarning={true}
          />
          {errors.to && <p className="mt-1 text-sm text-red-600">{errors.to.message}</p>}
        </div>
      </div>
    </div>
  );
}