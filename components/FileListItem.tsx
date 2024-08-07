'use client';

import React from 'react';

import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from './ui/button';
import { Plus, MessageSquare, TrashIcon } from 'lucide-react';
import { deleteFile } from '@/lib/actions/filesActions';

export default function FileListItem({ file }: any) {
  const router = useRouter();

  const handleDeleteFile = (file: any) => {
    const { $id: fileCollectionId, fileId: fileBucketId } = file;
    deleteFile({ fileCollectionId, fileBucketId });
    router.refresh();
  };

  return (
    <li
      key={file.fileId}
      className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg'
    >
      <Link
        className='flex flex-col gap-2'
        href={`/dashboard/${file.$id}`}
      >
        <div className='pt-6 px-6 flex w-full items-center justify-between space-x-6'>
          <div className='h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500' />
          <div className='flex-1 truncate'>
            <div className='flex items-center space-x-3'>
              <h3 className='truncate text-lg font-medium text-zinc-900'>
                {file.name}
              </h3>
            </div>
          </div>
        </div>
      </Link>

      <div className='px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500'>
        <div className='flex items-center gap-2'>
          <Plus className='h-4 w-4' />
          {format(new Date(file.createdAt), 'MMM yyyy')}
        </div>
        <div className='flex items-center gap-2'>
          <MessageSquare className='h-4 w-4' />
        </div>
        <Button
          onClick={() => handleDeleteFile(file)}
          size='sm'
          className='w-full'
          variant='destructive'
        >
          <TrashIcon className='h-4 w-4' />
        </Button>
      </div>
    </li>
  );
}
