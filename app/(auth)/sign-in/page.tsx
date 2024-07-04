import AuthForm from '@/components/AuthForm';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';

export default function SignIn() {
  return (
    <MaxWidthWrapper className='w-full h-screen flex flex-col items-center justify-center'>
      <AuthForm type='sign-in' />
    </MaxWidthWrapper>
  );
}
