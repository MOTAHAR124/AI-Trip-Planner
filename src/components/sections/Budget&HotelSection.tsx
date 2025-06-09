import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { TripPlannerFormData } from '../../types/tripPlanner';

interface BudgetSectionProps {
  register: UseFormRegister<TripPlannerFormData>;
  errors: FieldErrors<TripPlannerFormData>;
}

export default function BudgetSection({ register, errors }: BudgetSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 flex items-center">
        <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
        Budget Preferences
      </h3>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            {...register('budget')}
            className="w-full px-4 py-2.5 rounded-lg border text-black font-semibold uppercase border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="e.g., ₹ 1000-2000"
            suppressHydrationWarning={true}
          />
          {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
            Hotel Preferences
          </h3>
          <select
            {...register('hotelPreference')}
            className="w-full px-4 py-2.5 rounded-lg border text-black font-semibold uppercase border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            suppressHydrationWarning={true}
          >
            <option value="">Select hotel preference</option>
            <option value="Luxury">Luxury</option>
            <option value="Boutique">Boutique</option>
            <option value="Mid-range">Mid-range</option>
            <option value="Budget">Budget</option>
            <option value="Resort">Resort</option>
            <option value="Bed and Breakfast">Bed and Breakfast</option>
            <option value="Hostel">Hostel</option>
          </select>
          {errors.hotelPreference && (
            <p className="mt-1 text-sm text-red-600">{errors.hotelPreference.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}