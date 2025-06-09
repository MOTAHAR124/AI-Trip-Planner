import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { TripPlannerFormData } from '../types/tripPlanner';

interface FoodPreferencesSectionProps {
  register: UseFormRegister<TripPlannerFormData>;
  errors: FieldErrors<TripPlannerFormData>;
}

export default function FoodPreferencesSection({ register, errors }: FoodPreferencesSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 flex items-center">
        <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
        Food Preferences
      </h3>
      <div className="space-y-4">
        <div>
          <select
            {...register('foodPreference')}
            className="w-full px-4 py-2.5 rounded-lg border text-black font-semibold uppercase border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            suppressHydrationWarning={true}
          >
            <option value="">Select food preference</option>
            <option value="Local cuisine">Local cuisine</option>
            <option value="Fine dining">Fine dining</option>
            <option value="Vegan">Vegan</option>
            <option value="Seafood">Seafood</option>
            <option value="International">International</option>
            <option value="Fusion">Fusion</option>
          </select>
          {errors.foodPreference && (
            <p className="mt-1 text-sm text-red-600">{errors.foodPreference.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}