import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';

export default function CustomAlert({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <Alert
      className={className}
      variant='destructive'
    >
      <AlertCircle className='h-4 w-4' />
      <AlertDescription className='text-sm'>{text}</AlertDescription>
    </Alert>
  );
}
