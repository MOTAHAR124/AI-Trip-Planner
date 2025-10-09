import * as z from 'zod';

// Interface for the trip plan request
export interface TripPlanRequest {
  from: string;
  to: string;
  days: number;
  adults: number;
  kids: number;
  budget: string;
  hotelPreference: string;
  foodPreference: string;
  additionalDetails?: string;
}

// Zod schema for form validation
export const tripPlannerSchema = z.object({
  from: z.string().min(1, 'Departure location is required'),
  to: z.string().min(1, 'Destination is required'),
  days: z.number().min(1, 'Duration must be at least 1 day'),
  adults: z.number().min(1, 'At least 1 adult is required'),
  // Make kids optional in the UI; accept empty/string and coerce to number
  kids: z.coerce.number().min(0, 'Number of kids cannot be negative'),
  budget: z.string().min(1, 'Budget is required'),
  hotelPreference: z.string().min(1, 'Hotel preference is required'),
  foodPreference: z.string().min(1, 'Food preference is required'),
  additionalDetails: z.string().max(1000, 'Additional details should be under 1000 characters').optional(),
});

export type TripPlannerFormData = z.infer<typeof tripPlannerSchema>;