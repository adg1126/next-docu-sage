import React, { useState } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control, FieldPath } from 'react-hook-form';
import { z } from 'zod';

import { authFormSchema } from '@/lib/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const formSchema = authFormSchema('sign-up');

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  type: string;
}

export default function CustomInput({
  control,
  name,
  label,
  placeholder,
  type,
}: CustomInput) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChangePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <div className='flex w-full flex-col'>
            <FormControl>
              <div className='flex flex-row items-center'>
                {
                  <Input
                    id={name}
                    placeholder={placeholder}
                    type={
                      type === 'password' && passwordVisible
                        ? 'text'
                        : type === 'password' && !passwordVisible
                        ? 'password'
                        : type
                    }
                    {...field}
                  />
                }
                {type === 'password' && passwordVisible ? (
                  <EyeIcon
                    onClick={handleChangePasswordVisibility}
                    className='relative right-8 cursor-pointer'
                  />
                ) : type === 'password' && !passwordVisible ? (
                  <EyeOffIcon
                    onClick={handleChangePasswordVisibility}
                    className='relative right-8 cursor-pointer'
                  />
                ) : null}
              </div>
            </FormControl>
            <FormMessage className='mt-2' />
          </div>
        </FormItem>
      )}
    />
  );
}
