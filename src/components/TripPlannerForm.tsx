'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import TripPlanDisplay from './TripPlanDisplay';
import LoadingSkeleton from './LoadingSkeleton';
import LocationSection from './sections/LocationSection';
import TravelDetailsSection from './sections/TravelDetailsSection';
import BudgetSection from './sections/Budget&HotelSection';
import FoodPreferencesSection from './sections/FoodPreferencesSection';
import FormButtons from './FormButtons';
import ErrorDisplay from './ErrorDisplay';
import { 
  TripPlanRequest, 
  TripPlannerFormData, 
  tripPlannerSchema 
} from '../types/tripPlanner';

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
      // Create the request object with proper typing
      const tripRequest: TripPlanRequest = {
        from: data.from,
        to: data.to,
        days: data.days,
        adults: data.adults,
        kids: data.kids,
        budget: data.budget,
        hotelPreference: data.hotelPreference,
        foodPreference: data.foodPreference,
      };

      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tripRequest),
      });

      if (!res.ok || !res.body) {
        const text = await res.text().catch(() => '');
        throw new Error(text || 'Failed to generate trip plan.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          setTripPlan((prev) => prev + chunk);
        }
      }

      // Smooth scroll to the generated plan once streaming completes
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
    // Navigate to the planner section
    const plannerSection = document.getElementById('planner');
    if (plannerSection) {
      plannerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback to updating the hash to trigger navigation
      window.location.hash = 'planner';
    }
  };

  // Show loading state during hydration
  if (!isMounted) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LocationSection register={register} errors={errors} />
            <TravelDetailsSection register={register} errors={errors} />
            <BudgetSection register={register} errors={errors} />
            <FoodPreferencesSection register={register} errors={errors} />
          </div>
        </div>

        <FormButtons 
          isLoading={isLoading} 
          tripPlan={tripPlan} 
          onNewPlan={handleNewPlan} 
        />
      </form>

      <ErrorDisplay error={error} />

      {tripPlan && (
        <div id="trip-plan-result">
          <TripPlanDisplay tripPlan={tripPlan} />
        </div>
      )}
    </div>
  );
}