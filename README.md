# AI Trip Planner

Plan smarter, faster. AI Trip Planner generates detailed, day-by-day itineraries based on your origin, destination, trip length, group size, budget, hotel and food preferences. It streams a rich markdown itinerary with travel tips, budget breakdowns, dining, and more.

Built with Next.js 15, LangChain, and Google Gemini 2.0.

---

## Features

- **AI-generated itineraries** using `@langchain/google-genai` with the Gemini 2.0 Flash model.
- **Streaming responses** from `POST /api/plan` for a responsive UX.
- **Form validation** with `zod` and `react-hook-form`.
- **Polished UI** with Tailwind CSS and modular React components.
- **Detailed prompt design** to generate structured markdown (overview, daily plan, hotels, transport, dining, budget, tips).
- **Error handling** with user-friendly messaging and loading skeletons.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript, React 19
- **AI/LLM**: LangChain `@langchain/google-genai` (Gemini 2.0 Flash)
- **Forms & Validation**: react-hook-form, zod, @hookform/resolvers
- **Styling**: Tailwind CSS 4
- **Auth (optional scaffolding)**: next-auth (not required for core flow)
- **Utilities**: clsx, class-variance-authority, lucide-react

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Generative AI API key (Gemini)

### Clone and Install

```bash
# Clone
git clone https://github.com/<your-username>/AI-Trip-Planner.git
cd AI-Trip-Planner

# Install deps
npm install
```

### Environment Variables

This project reads separate keys for server and client usage:

- Server: `GOOGLE_API_KEY` (used in `src/app/api/plan/route.ts`)
- Client: `NEXT_PUBLIC_GOOGLE_API_KEY` (used in `src/lib/langchain.ts`)

Create a `.env.local` file in the project root:

```bash
# .env.local
GOOGLE_API_KEY=your_server_side_gemini_key
NEXT_PUBLIC_GOOGLE_API_KEY=your_client_side_gemini_key
```

Note: Keep server and client keys distinct if your security model requires it. The app will throw if these are missing.

### Run Locally

```bash
# Dev server
npm run dev
# Build
npm run build
# Start production build
npm start
```

Then open http://localhost:3000

---

## Usage

- Visit the homepage and scroll to the planner section.
- Fill in: From, To, Days, Adults, Kids, Budget, Hotel Preference, Food Preference.
- Submit to stream a markdown itinerary.
- Use "New Plan" to reset and plan again.

Key files involved:

- `src/components/TripPlannerForm.tsx` — Collects inputs, validates with `zod`, calls API, handles streaming.
- `src/app/api/plan/route.ts` — Streams AI output using LangChain and Gemini.
- `src/lib/langchain.ts` — Client-side model/prompt utility (requires `NEXT_PUBLIC_GOOGLE_API_KEY`).
- `src/types/tripPlanner.ts` — Types and validation schema.

---

## API

### POST /api/plan

Streams a text/plain markdown itinerary.

Request body (JSON):

```json
{
  "from": "Mumbai",
  "to": "Goa",
  "days": 4,
  "adults": 2,
  "kids": 1,
  "budget": "50000",
  "hotelPreference": "4-star",
  "foodPreference": "Vegetarian"
}
```

Example curl:

```bash
curl -N \
  -H "Content-Type: application/json" \
  -X POST http://localhost:3000/api/plan \
  -d '{
    "from": "Mumbai",
    "to": "Goa",
    "days": 4,
    "adults": 2,
    "kids": 1,
    "budget": "50000",
    "hotelPreference": "4-star",
    "foodPreference": "Vegetarian"
  }'
```

Note: Response is streamed. Some terminals may buffer; use `-N` with curl to disable buffering.

---

## Example Code Snippets

- Schema and types (`src/types/tripPlanner.ts`):

```ts
export interface TripPlanRequest {
  from: string;
  to: string;
  days: number;
  adults: number;
  kids: number;
  budget: string;
  hotelPreference: string;
  foodPreference: string;
}
```

- Fetching and reading a stream (`src/components/TripPlannerForm.tsx`):

```ts
const res = await fetch('/api/plan', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(tripRequest),
});

const reader = res.body!.getReader();
const decoder = new TextDecoder();
let done = false;
while (!done) {
  const { value, done: doneReading } = await reader.read();
  done = doneReading;
  if (value) setTripPlan(prev => prev + decoder.decode(value, { stream: !done }));
}
```

---

## Project Structure

```
├─ public/
├─ src/
│  ├─ app/
│  │  ├─ api/
│  │  │  └─ plan/route.ts
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components/
│  │  ├─ TripPlannerForm.tsx
│  │  ├─ TripPlanDisplay.tsx
│  │  ├─ FeaturesSection.tsx
│  │  ├─ HeroSection.tsx
│  │  └─ ...
│  ├─ lib/
│  │  └─ langchain.ts
│  └─ types/
│     └─ tripPlanner.ts
├─ package.json
├─ tsconfig.json
└─ README.md
```

---

## Deployment

- The app is compatible with platforms that support Next.js 15 (e.g., Vercel).
- Ensure environment variables are configured in your hosting provider:
  - `GOOGLE_API_KEY` (server)
  - `NEXT_PUBLIC_GOOGLE_API_KEY` (client)
- The `api/plan` route uses `runtime = "nodejs"` and streams responses. Confirm streaming is supported in your hosting environment.

### Vercel (example)

1. Push to a Git repository (GitHub/GitLab/Bitbucket).
2. Import the project in Vercel.
3. Add env vars in Vercel Project Settings.
4. Deploy.

---

## Contributing

Contributions are welcome!

- Fork the repo and create a feature branch.
- Use clear commit messages.
- Add or update relevant docs.
- Open a pull request with a concise description and screenshots (if UI changes).

---

## License

MIT License. See `LICENSE` file or the text below.

```
MIT License

Copyright (c) <year> <your-name>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Badges / Screenshots (Optional)

You can add shields.io badges and screenshots for better presentation. Example:

```md
![CI](https://img.shields.io/badge/build-passing-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
```

Place screenshots in `public/` and reference them like:

```md
![Homepage](./public/homepage-screenshot.jpg)