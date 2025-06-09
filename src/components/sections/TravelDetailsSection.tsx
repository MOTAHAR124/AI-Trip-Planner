import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { TripPlannerFormData } from '../types/tripPlanner';

interface TravelDetailsSectionProps {
  register: UseFormRegister<TripPlannerFormData>;
  errors: FieldErrors<TripPlannerFormData>;
}

export default function TravelDetailsSection({ register, errors }: TravelDetailsSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 flex items-center">
        <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
        Travel Details
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (days)</label>
          <input
            type="number"
            {...register('days', { valueAsNumber: true })}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 text-black font-semibold focus:ring-blue-500 focus:border-blue-500 transition-colors"
            min="1"
            suppressHydrationWarning={true}
          />
          {errors.days && <p className="mt-1 text-sm text-red-600">{errors.days.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
            <input
              type="number"
              {...register('adults', { valueAsNumber: true })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 text-black font-semibold focus:ring-blue-500 focus:border-blue-500 transition-colors"
              min="1"
              suppressHydrationWarning={true}
            />
            {errors.adults && <p className="mt-1 text-sm text-red-600">{errors.adults.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kids</label>
            <input
              type="number"
              {...register('kids', { valueAsNumber: true })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 text-black font-semibold focus:ring-blue-500 focus:border-blue-500 transition-colors"
              min="0"
              suppressHydrationWarning={true}
            />
            {errors.kids && <p className="mt-1 text-sm text-red-600">{errors.kids.message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}