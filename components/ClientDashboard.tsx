import React from 'react';

import { FileX } from 'lucide-react';
import { getLoggedInUser } from '@/lib/actions/userActions';
import { getUserFiles } from '@/lib/actions/filesActions';

import UploadButton from './UploadButton';
import FileListItem from './FileListItem';

export default async function ClientDashboard() {
  const loggedInUser = await getLoggedInUser();
  const { documents: files } = await getUserFiles(loggedInUser.$id);

  return (
    <main className='mx-auto max-w-7xl md:p-10'>
      <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mb-3 font-bold text-5xl text-gray-900'>My Files</h1>
        <UploadButton />
      </div>

      {files?.length > 0 ? (
        <ul className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 mg:grid-cols-2 md:grid-cols-3'>
          {files?.map((file: any) => (
            <FileListItem
              file={file}
              key={file?.$id}
            />
          ))}
        </ul>
      ) : (
        <div className='mt-16 flex flex-col items-center gap-2'>
          <FileX className='h-8 w-8 text-zinc-800' />
          <h3 className='font-semibold text-xl'>You have no files.</h3>
          <p>{`Upload your first PDF.`}</p>
        </div>
      )}
    </main>
  );
}
