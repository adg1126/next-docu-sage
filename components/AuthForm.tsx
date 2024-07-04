'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import CustomInput from './CustomInput';

import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { signIn, signUp } from '@/lib/actions/userActions';
import CustomAlert from './CustomAlert';

export default function AuthForm({ type }: { type: String }) {
  const router = useRouter();
  const [user, setUser] = useState(null),
    [isLoading, setIsLoading] = useState(false),
    [alertMsg, setAlertMsg] = useState('');

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try {
      // Sign up with Appwrite
      if (type === 'sign-up') {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          email: data.email,
          password: data.password,
        };

        const res = await signUp(userData);
        if ('error' in res) {
          setAlertMsg(res.error);
        } else {
          setUser(res);
          router.push('/dashboard');
        }
      }

      if (type === 'sign-in') {
        const res = await signIn({
          email: data.email,
          password: data.password,
        });

        if ('error' in res) {
          setAlertMsg(res.error);
        } else {
          setUser(res);
          router.push('/dashboard');
        }
      }
    } catch (err) {
      console.log('from authform', err);
    } finally {
      setIsLoading(false);
    }
  };

  return user ? (
    <></>
  ) : (
    <section className='max-w-[420px] px-5 flex flex-col justify-center gap-5 py-10 md:gap-8'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link
          href='/'
          className='cursor-pointer items-center gap-1 flex'
        >
          <h1 className='text-26 font-bold text-black-1'>DocuSage</h1>
        </Link>

        <div className='flex flex-col gap-1 md:gap-3'>
          <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            Enter your details
          </h1>
        </div>
      </header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'
        >
          {type === 'sign-up' && (
            <div className='flex gap-4'>
              <CustomInput
                control={form.control}
                name='firstName'
                label='First Name'
                placeholder='ex: John'
                type='text'
              />
              <CustomInput
                control={form.control}
                name='lastName'
                label='Last Name'
                placeholder='ex: Doe'
                type='text'
              />
            </div>
          )}
          <CustomInput
            control={form.control}
            name='email'
            label='Email'
            placeholder='Enter your email'
            type='text'
          />
          <CustomInput
            control={form.control}
            name='password'
            label='Password'
            placeholder='Enter your password'
            type='password'
          />
          {type === 'sign-up' && (
            <CustomInput
              control={form.control}
              name='confirmPassword'
              label='Confirm Password'
              placeholder='Confirm your password'
              type='password'
            />
          )}
          <div className='flex flex-col gap-4'>
            <Button
              type='submit'
              className='form-btn'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2
                    size={20}
                    className='animate-spin'
                  />
                  &nbsp; Loading...
                </>
              ) : type === 'sign-in' ? (
                'Sign In'
              ) : (
                'Sign Up'
              )}
            </Button>
          </div>
        </form>
      </Form>

      {alertMsg.length ? (
        <CustomAlert
          className={type === 'sign-in' ? 'max-w-[237px]' : 'max-w-[420px]'}
          text={alertMsg}
        />
      ) : null}

      <footer className='flex justify-center gap-1'>
        <p className='text-14 font-normal text-gray-600'>
          {type === 'sign-in'
            ? `Don't have an account?`
            : 'Already have an account?'}
        </p>
        <Link
          className='form-link'
          href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
        >
          {type === 'sign-in' ? 'Sign up' : 'Sign in'}
        </Link>
      </footer>
    </section>
  );

  // return (
  //   <section className='max-w-[420px] flex flex-col justify-center gap-5 py-10 md:gap-8'>
  //     <header className='flex flex-col gap-5 md:gap-8'>
  //       <Link
  //         href='/'
  //         className='cursor-pointer items-center gap-1 flex'
  //       >
  //         <h1 className='text-26 font-bold text-black-1'>DocuSage</h1>
  //       </Link>

  //       <div className='flex flex-col gap-1 md:gap-3'>
  //         <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
  //           Enter your details
  //         </h1>
  //       </div>
  //     </header>

  //     {user ? (
  //       <div className='flex flex-col gap-4'></div>
  //     ) : (
  //       <>
  //         <Form {...form}>
  //           <form
  //             onSubmit={form.handleSubmit(onSubmit)}
  //             className='space-y-8'
  //           >
  //             {type === 'sign-up' && (
  //               <>
  //                 <div className='flex gap-4'>
  //                   <CustomInput
  //                     control={form.control}
  //                     name='firstName'
  //                     label='First Name'
  //                     placeholder='ex: John'
  //                     type='text'
  //                   />
  //                   <CustomInput
  //                     control={form.control}
  //                     name='lastName'
  //                     label='Last Name'
  //                     placeholder='ex: Doe'
  //                     type='text'
  //                   />
  //                 </div>
  //               </>
  //             )}
  //             <CustomInput
  //               control={form.control}
  //               name='email'
  //               label='Email'
  //               placeholder='Enter your email'
  //               type='text'
  //             />
  //             <CustomInput
  //               control={form.control}
  //               name='password'
  //               label='Password'
  //               placeholder='Enter your password'
  //               type='password'
  //             />
  //             {type === 'sign-up' && (
  //               <CustomInput
  //                 control={form.control}
  //                 name='confirmPassword'
  //                 label='Confirm Password'
  //                 placeholder='Confirm your password'
  //                 type='password'
  //               />
  //             )}
  //             <div className='flex flex-col gap-4'>
  //               <Button
  //                 type='submit'
  //                 className='form-btn'
  //                 disabled={isLoading}
  //               >
  //                 {isLoading ? (
  //                   <>
  //                     <Loader2
  //                       size={20}
  //                       className='animate-spin'
  //                     />
  //                     &nbsp; Loading...
  //                   </>
  //                 ) : type === 'sign-in' ? (
  //                   'Sign In'
  //                 ) : (
  //                   'Sign Up'
  //                 )}
  //               </Button>
  //             </div>
  //           </form>
  //         </Form>

  //         <footer className='flex justify-center gap-1'>
  //           <p className='text-14 font-normal text-gray-600'>
  //             {type === 'sign-in'
  //               ? `Don't have an account?`
  //               : 'Already have an account?'}
  //           </p>
  //           <Link
  //             className='form-link'
  //             href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
  //           >
  //             {type === 'sign-in' ? 'Sign up' : 'Sign in'}
  //           </Link>
  //         </footer>
  //       </>
  //     )}
  //   </section>
  // );
}
