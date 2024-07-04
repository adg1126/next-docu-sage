import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const authFormSchema = (type: String) =>
  type === 'sign-up'
    ? z
        .object({
          email: z.string().email(),
          password: z.string().min(8),
          firstName: z.string().min(2),
          lastName: z.string().min(2),
          confirmPassword: z.string().min(8),
        })
        .refine(
          (values) => {
            return values.password === values.confirmPassword;
          },
          {
            message: 'Passwords must match',
            path: ['confirmPassword'],
          }
        )
    : z.object({
        email: z.string().email(),
        password: z.string().min(8),
        firstName:
          type == 'sign-in' ? z.string().optional() : z.string().min(2),
        lastName: type == 'sign-in' ? z.string().optional() : z.string().min(2),
        confirmPassword:
          type == 'sign-in' ? z.string().optional() : z.string().min(8),
      });
