'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { generateTripPlan } from '../lib/langchain';
import TripPlanDisplay from './TripPlanDisplay';

const tripPlannerSchema = z.object({
  from: z.string().min(1, 'Departure location is required'),
  to: z.string().min(1, 'Destination is required'),
  days: z.number().min(1, 'Duration must be at least 1 day'),
  adults: z.number().min(1, 'At least 1 adult is required'),
  kids: z.number().min(0, 'Number of kids cannot be negative'),
  budget: z.string().min(1, 'Budget is required'),
  hotelPreference: z.string().min(1, 'Hotel preference is required'),
  foodPreference: z.string().min(1, 'Food preference is required'),
});

type TripPlannerFormData = z.infer<typeof tripPlannerSchema>;

export default function TripPlannerForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TripPlannerFormData>({
    resolver: zodResolver(tripPlannerSchema),
  });

  // Ensure component is mounted before rendering form inputs
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: TripPlannerFormData) => {
    setIsLoading(true);
    setError('');
    setTripPlan(''); // Clear previous plan
    
    try {
      const plan = await generateTripPlan(data);
      setTripPlan(plan);
      // Smooth scroll to the generated plan
      setTimeout(() => {
        const tripPlanElement = document.getElementById('trip-plan-result');
        if (tripPlanElement) {
          tripPlanElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err) {
      console.error('Trip plan generation error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate trip plan. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewPlan = () => {
    setTripPlan('');
    setError('');
    reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show loading state during hydration
  if (!isMounted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Location Section */}
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

            {/* Travel Details Section */}
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

            {/* Preferences Section */}
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

            {/* Food Preferences Section */}
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
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            suppressHydrationWarning={true}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Plan...
              </span>
            ) : (
              '✨ Generate Trip Plan'
            )}
          </button>
          
          {tripPlan && (
            <button
              type="button"
              onClick={handleNewPlan}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Plan New Trip
            </button>
          )}
        </div>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      {tripPlan && (
        <div id="trip-plan-result">
          <TripPlanDisplay tripPlan={tripPlan} />
        </div>
      )}
    </div>
  );
}