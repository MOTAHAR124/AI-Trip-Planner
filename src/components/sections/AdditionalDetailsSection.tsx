import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { TripPlannerFormData } from '../../types/tripPlanner';

interface AdditionalDetailsSectionProps {
  register: UseFormRegister<TripPlannerFormData>;
  errors: FieldErrors<TripPlannerFormData>;
}

export default function AdditionalDetailsSection({ register, errors }: AdditionalDetailsSectionProps) {
  return (
    <div className="space-y-2 mt-6">
      <h3 className="text-xl font-semibold text-gray-900 flex items-center">
        <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
        Additional Detail *
      </h3>
      <textarea
        {...register('additionalDetails')}
        className="w-full px-4 py-2.5 rounded-lg border text-black font-semibold uppercase border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        rows={2}
        placeholder="prefer nature spots, wheelchair access, must-see attractions, arrival time , must‑sees, mobility or diet notes, celebrations — make it yours."
        maxLength={1000}
      />
      {errors.additionalDetails && (
        <p className="mt-1 text-sm text-red-600">{errors.additionalDetails.message}</p>
      )}
    </div>
  );
}
