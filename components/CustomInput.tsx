import React from 'react';
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
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <div className='flex w-full flex-col'>
            <FormControl>
              <Input
                id={name}
                placeholder={placeholder}
                type={type}
                {...field}
              />
            </FormControl>
            <FormMessage className='mt-2' />
          </div>
        </FormItem>
      )}
    />
  );
}
