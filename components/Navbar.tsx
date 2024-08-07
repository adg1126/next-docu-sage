import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { getLoggedInUser } from '@/lib/actions/userActions';
import { Avatar } from '@radix-ui/react-avatar';
import SignOutBtn from './SignOutBtn';

export default async function Navbar() {
  const loggedInUser = await getLoggedInUser();

  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link
            href='/'
            className='flex z-40 font-semibold'
          >
            DocuSage.
          </Link>

          {/* mobile navbar */}

          <div className='hidden items-center space-x-4 sm:flex'>
            <>
              <Link
                className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                href='/pricing'
              >
                Pricing
              </Link>

              {loggedInUser?.$id ? (
                <>
                  <SignOutBtn />
                  <Avatar className='flex  items-center justify-center bg-primary rounded-full w-[35px] h-[35px] font-bold'>{`${loggedInUser?.firstName[0]}${loggedInUser?.lastName[0]}`}</Avatar>
                </>
              ) : (
                <>
                  <Link
                    href='/sign-in'
                    className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                  >
                    Sign in
                  </Link>
                  <Link
                    href='/sign-up'
                    className={buttonVariants({ size: 'sm' })}
                  >
                    Get started <ArrowRight className='ml-1.5 h-5 w-5' />
                  </Link>
                </>
              )}
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
