'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from './ui/button';

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    const fullName = session.user?.name || 'User';
    return (
      <div className="flex items-center gap-4">
        <p className="text-base sm:text-lg font-semibold text-gray-900">
          {fullName}
        </p>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    );
  }

  return (
    <Button onClick={() => signIn('google')}>Sign in with Google</Button>
  );
}
