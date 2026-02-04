"use client";

import { useSession } from "next-auth/react";

export default function HeroGreeting() {
  const { data: session } = useSession();
  const fullName = session?.user?.name || "";
  const firstName = fullName.split(" ")[0] || fullName;

  if (!session) return null;

  return (
    <p className="text-5xl font-bold text-gray-900 leading-tight">
      Hello, <span className="text-blue-600">{firstName}</span>
    </p>
  );
}

