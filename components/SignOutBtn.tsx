'use client';

import { signOut } from '@/lib/actions/userActions';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';

export default function SignOutBtn() {
  const router = useRouter();

  const handleSignout = async () => {
    const signedOut = await signOut();

    if (signedOut) router.push('/');
  };

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={handleSignout}
    >
      Sign out
    </Button>
  );
}
