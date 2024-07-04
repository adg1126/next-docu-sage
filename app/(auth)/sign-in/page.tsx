import AuthForm from '@/components/AuthForm';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { getLoggedInUser } from '@/lib/actions/userActions';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function SignIn() {
  const loggedInUser = await getLoggedInUser();

  if (loggedInUser?.userId) redirect('/');

  return (
    <MaxWidthWrapper className='w-full h-screen flex flex-col items-center justify-center'>
      <AuthForm type='sign-in' />
    </MaxWidthWrapper>
  );
}
