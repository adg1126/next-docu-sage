import AuthForm from '@/components/AuthForm';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';

export default function SignUp() {
  return (
    <MaxWidthWrapper className='w-full min-h-screen flex flex-col items-center justify-center'>
      <AuthForm type='sign-up' />
    </MaxWidthWrapper>
  );
}
