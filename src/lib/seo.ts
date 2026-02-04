export const SITE_URL = "https://ai-trip-planner-pi-taupe.vercel.app";
export const SITE_NAME = "AI Trip Planner";
export const SITE_DESCRIPTION =
  "AI Trip Planner is an intelligent travel planning platform that generates personalized, end-to-end itineraries in seconds based on your destination, duration, and preferences.";

export function absoluteUrl(path: string) {
  return new URL(path.startsWith("/") ? path : `/${path}`, SITE_URL).toString();
}

