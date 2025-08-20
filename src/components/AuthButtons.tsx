'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from './ui/button';

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p>Signed in as {session.user?.email}</p>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    );
  }

  return (
    <Button onClick={() => signIn('google')}>Sign in with Google</Button>
  );
}
