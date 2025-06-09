interface FormButtonsProps {
  isLoading: boolean;
  tripPlan: string;
  onNewPlan: () => void;
}

export default function FormButtons({ isLoading, tripPlan, onNewPlan }: FormButtonsProps) {
  return (
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
          onClick={onNewPlan}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Plan New Trip
        </button>
      )}
    </div>
  );
}