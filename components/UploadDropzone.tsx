import { uploadFile } from '@/lib/actions/filesActions';
import { Progress } from '@/components/ui/progress';
import { Cloud, File } from 'lucide-react';
import Dropzone from 'react-dropzone';

import React, { useState } from 'react';

export default function UploadDropzone({ handleModalOpen }: any) {
  const [isUploading, setIsUploading] = useState(false),
    [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (acceptedFile: any) => {
    setIsUploading(true);
    const progressInterval = startSimulatedProgress();
    const file = acceptedFile[0];

    await uploadFile(file);
    clearInterval(progressInterval);
    setUploadProgress(100);
    handleModalOpen(false);
  };

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);

    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={handleFileUpload}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className='border h-64 m-4 border-dashed border-gray-300 rounded-lg'
        >
          <div className='flex items-center justify-center h-full w-full'>
            <label
              htmlFor='dropzone-file'
              className='flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'
            >
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <Cloud className='h-6 w-6 text-zinc-500 mb-2' />
                <p className='mb-2 text-sm text-zinc-700'>
                  <span className='font-semibold'>Click to upload</span> or drag
                  and drop
                </p>
                <p className='text-xs text-zinc-500'>PDF (up to 4MB)</p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className='max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200'>
                  <div className='px-3 py-2 h-full grid place-items-center'>
                    <File className='h-4 w-4 text-blue-500' />
                  </div>
                  <div className='px-3 py-2 h-full text-sm truncate'>
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className='w-full mt-4 max-w-xs mx-auto'>
                  <Progress
                    value={uploadProgress}
                    className='h-1 w-full bg-zinc-200'
                  />
                </div>
              ) : null}

              <input
                {...getInputProps()}
                type='file'
                id='dropzone-file'
                className='hidden'
                accept='application/pdf'
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
}