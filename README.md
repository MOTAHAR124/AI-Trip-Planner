# AI Trip Planner

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![LangChain](https://img.shields.io/badge/LangChain-0.3-4f46e5)](https://js.langchain.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](#license)

Plan smarter, faster. AI Trip Planner generates detailed, day‑by‑day itineraries based on your origin, destination, trip length, group size, budget, hotel and food preferences. It streams a rich markdown itinerary with travel tips, budget breakdowns, dining, and more.

Built with Next.js 15, React 19, Tailwind CSS 4, and LangChain + Google Gemini 2.0.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install](#clone-and-install)
  - [Environment Variables](#environment-variables)
  - [Run Locally](#run-locally)
- [Usage](#usage)
- [API](#api)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Authentication (Optional)](#authentication-optional)
- [Security & Privacy](#security--privacy)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **AI‑generated itineraries** using `@langchain/google-genai` (Gemini 2.0 Flash).
- **Streaming responses** from `POST /api/plan` for a responsive UX.
- **Form validation** with `zod` and `react-hook-form`.
- **Polished UI** with Tailwind CSS and modular React components.
- **Prompt design** to generate structured markdown (overview, daily plan, hotels, transport, dining, budget, tips).
- **Error handling** with user‑friendly messaging and loading skeletons.
- **Optional Auth** via NextAuth; falls back to a generic name when unauthenticated.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript, React 19
- **AI/LLM**: LangChain `@langchain/google-genai` (Gemini 2.0 Flash)
- **Forms & Validation**: react-hook-form, zod, @hookform/resolvers
- **Styling**: Tailwind CSS 4
- **Auth (optional)**: next-auth
- **Utilities**: clsx, class-variance-authority, lucide-react, markdown-to-jsx

---

## Demo

- Below is a real screenshot from `public/travel-1.jpg`:

```md
![Planner UI](./public/travel-1.jpg)
```

- Optional GIF: add a file at `public/demo.gif` and reference it:

```md
![Demo](./public/demo.gif)
```

---

## Getting Started

### Prerequisites

- Node.js 18+ and Yarn (Classic)
- Google Generative AI API key (Gemini)

### Clone and Install

```bash
# Clone
git clone https://github.com/MOTAHAR124/AI-Trip-Planner.git
cd AI-Trip-Planner

# Install deps
yarn install
```

### Environment Variables

This project reads separate keys for server and client usage:

- Server: `GOOGLE_API_KEY` (used in `src/app/api/plan/route.ts`)
- Client: `NEXT_PUBLIC_GOOGLE_API_KEY` (used in `src/lib/langchain.ts`)

Create a `.env` or `.env.local` file in the project root (either works for Next.js):

```bash
# .env or .env.local
GOOGLE_API_KEY=your_server_side_gemini_key
NEXT_PUBLIC_GOOGLE_API_KEY=your_client_side_gemini_key
```

Notes:
- Keys are required; the app throws or responds 500 if missing.
- Keep server and client keys distinct if your security model requires it.
- Next.js loads `.env*` files; `.env.local` is typically git-ignored for local secrets.

#### Quick copy-paste for `.env` (or `.env.local`)

```env
# Required - Server (used in src/app/api/plan/route.ts)
GOOGLE_API_KEY=your_server_side_gemini_key

# Required - Client (used in src/lib/langchain.ts)
NEXT_PUBLIC_GOOGLE_API_KEY=your_client_side_gemini_key
```

#### Optional (only if you enable NextAuth)

```env
# NextAuth core
# NEXTAUTH_URL=http://localhost:3000
# NEXTAUTH_SECRET=your_strong_random_secret  # Note: use NEXTAUTH_SECRET (not AUTH_SECRET)

# Google provider (used in src/app/api/auth/[...nextauth]/route.ts)
# GOOGLE_CLIENT_ID=your_google_oauth_client_id
# GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

### Run Locally

```bash
# Dev server
yarn dev
# Build
yarn build
# Start production build
yarn start
```

Open http://localhost:3000

---

## Usage

- Visit the homepage and scroll to the planner section.
- Fill in: From, To, Days, Adults, Kids, Budget, Hotel Preference, Food Preference.
- Submit to stream a markdown itinerary.
- Use "New Plan" to reset and plan again.

Key files involved:

- `src/components/TripPlannerForm.tsx` — Submits request, validates with `zod`, handles streaming and UI.
- `src/app/api/plan/route.ts` — Streams AI output using LangChain and Gemini; uses `GOOGLE_API_KEY` and optional NextAuth session to personalize with a full name.
- `src/lib/langchain.ts` — Client‑side model/prompt helper (requires `NEXT_PUBLIC_GOOGLE_API_KEY`).
- `src/types/tripPlanner.ts` — Types and validation schema.

---

## API

### POST /api/plan

Streams a `text/plain` markdown itinerary.

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

Notes:
- Response is streamed; use `-N` with curl to disable buffering.
- If NextAuth is configured and the user is logged in, the response greets them by name; otherwise it addresses "Traveler".

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

## Scripts

From `package.json`:

```bash
yarn dev     # Start dev server
yarn build   # Build for production
yarn start   # Start production server
yarn lint    # Lint the project
```

---

## Authentication (Optional)

- NextAuth is scaffolded under `src/app/api/auth/[...nextauth]/`.
- The planner works without signing in; the API greets users by the session name when present.
- If enabling auth in UI, ensure providers and session handling are configured per NextAuth docs.

### Google NextAuth Setup

1. Create a project at Google Cloud Console → OAuth consent screen.
   - User type: External
   - Scopes: `email`, `profile`
2. Create OAuth 2.0 Client ID (Web application):
   - Authorized redirect URI (local): `http://localhost:3000/api/auth/callback/google`
   - Add your production URL later: `https://your-domain.com/api/auth/callback/google`
3. Add env vars to `.env` or `.env.local`:

```env
NEXTAUTH_SECRET=your_strong_random_secret
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
# NEXTAUTH_URL=http://localhost:3000    # set in production too
```

4. Restart the dev server: `npm run dev`.
   - With Yarn: `yarn dev`.
5. Wire a sign-in button in your UI (optional) using `next-auth`:
   - In a client component: `import { signIn } from "next-auth/react";` then `onClick={() => signIn('google')}`.
   - Or navigate to `/api/auth/signin` to use the default NextAuth sign-in page.

---

## Security & Privacy

- `NEXT_PUBLIC_GOOGLE_API_KEY` is exposed to the browser by design (Next.js `NEXT_PUBLIC_` prefix). Use a limited-scope client key.
- Keep your server `GOOGLE_API_KEY` secret; never expose it on the client.
- Do not commit env files. Prefer `.env.local` for local secrets.

---

## Troubleshooting

- "Missing NEXT_PUBLIC_GOOGLE_API_KEY" error in browser: set `NEXT_PUBLIC_GOOGLE_API_KEY` in `.env` or `.env.local` and restart dev server.
- 500 from `/api/plan`: ensure `GOOGLE_API_KEY` is set and valid.
- If using NextAuth and sign-in fails: confirm you used `NEXTAUTH_SECRET` (not `AUTH_SECRET`) and set `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`.
- Slow or truncated responses: verify Gemini API quotas and network; streaming is plain text with backpressure.
- Tailwind styles not applying: confirm `globals.css` is imported in `src/app/layout.tsx` and Tailwind v4 postcss plugin is installed.

---

## Deployment

- Compatible with platforms that support Next.js 15 (e.g., Vercel).
- Configure env vars in your hosting provider:
  - `GOOGLE_API_KEY` (server)
  - `NEXT_PUBLIC_GOOGLE_API_KEY` (client)
- The `api/plan` route uses `runtime = "nodejs"` and streams responses. Ensure streaming is supported.

### Vercel (example)

1. Push to a Git repository (GitHub/GitLab/Bitbucket).
2. Import the project in Vercel.
3. Add env vars in Vercel Project Settings.
4. Deploy.

### .env.local.example (add this file to repo root)

Create `/.env.local.example` with placeholders to help contributors:

```env
# Server
GOOGLE_API_KEY=

# Client
NEXT_PUBLIC_GOOGLE_API_KEY=

# NextAuth (optional)
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Do not commit a real `.env.local`; keep secrets out of version control.

---

## Roadmap

- [ ] Add destination images and map embeds
- [ ] Add itinerary export (PDF/Markdown)
- [ ] Persist user plans (auth + DB)
- [ ] Add rate limiting and usage analytics

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
