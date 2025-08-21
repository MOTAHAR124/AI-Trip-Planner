import { NextRequest } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { auth } from "../auth/[...nextauth]/route";

export const runtime = "nodejs"; // ensure server runtime

const tripPlannerPrompt = PromptTemplate.fromTemplate(`Create a detailed trip itinerary with the following details:
    - User Full Name: {fullName}
    - From: {from}
    - To: {to}
    - Duration: {days} days
    - Travelers: {adults} adults and {kids} kids
    - Budget: {budget} in INR
    - Hotel Preference: {hotelPreference}
    - Food Preference: {foodPreference}

    You can also deny any of the requests if you think it is not possible to fulfill because of the budget or other constraints.

    Always address the user directly and include their full name "{fullName}" at least once in the response. 
    Start the response with a friendly greeting that references their name, and when you reference their name, wrap it in markdown bold like **{fullName}**.

    Please provide a detailed day-by-day itinerary in markdown format with the following sections:

    # Trip Overview
    Start with a brief overview of the trip, including:
    - Destination highlights
    - Best time to visit
    - General travel tips
    - Budget considerations
    - Any special considerations for the group

    ## Day-by-Day Itinerary
    For each day, include:
    - Morning activities
    - Afternoon activities
    - Evening activities
    - Recommended restaurants
    - Transportation details
    - Estimated costs

    ## Accommodations
    - Recommended hotels/places to stay
    - Price ranges
    - Location benefits
    - Amenities
    - Booking tips

    ## Local Transportation
    - Airport transfers
    - Local transport options
    - Cost estimates
    - Tips for getting around

    ## Food & Dining
    - Restaurant recommendations
    - Local specialties
    - Price ranges
    - Dietary considerations
    - Reservation tips

    ## Budget Breakdown
    - Accommodation costs
    - Transportation costs
    - International/intercity travel costs (e.g., flights, trains, buses)
    - Food expenses
    - Activity costs
    - Additional expenses
    - Visa fees (if required) and approximate processing costs
    - Money-saving tips

    ## Travel Tips
    - Local customs
    - Safety tips
    - Weather considerations
    - Packing suggestions
    - Emergency contacts

    Use markdown formatting:
    - Use # for main title
    - Use ## for section headings
    - Use ### for subsections
    - Use bullet points (-) for lists
    - Use bold for emphasis
    - Use italic for additional information
    - Add an empty line between paragraphs
    - Use <br> for line breaks within paragraphs
    - Ensure each section has proper spacing before and after

    Format the response in a clear, organized structure with proper markdown syntax and spacing.`);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await auth();
    const fullName = session?.user?.name || "Traveler";

    const apiKey = process.env.GOOGLE_API_KEY; // server-only
    if (!apiKey) {
      return new Response("Server misconfiguration: missing GOOGLE_API_KEY", { status: 500 });
    }

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      maxOutputTokens: 8192,
      temperature: 0.7,
      apiKey,
    });

    const chain = tripPlannerPrompt.pipe(model).pipe(new StringOutputParser());

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        (async () => {
          try {
            const iterable = await chain.stream({ ...body, fullName });
            for await (const chunk of iterable) {
              controller.enqueue(encoder.encode(chunk));
            }
            controller.close();
          } catch (err) {
            controller.error(err);
          }
        })();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
      status: 200,
    });
  } catch (error: any) {
    console.error("/api/plan error:", error);
    return new Response(error?.message || "Failed to generate plan", { status: 500 });
  }
}
