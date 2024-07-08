'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import {
  DialogContent,
  DialogTrigger,
  Dialog,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import UploadDropzone from './UploadDropzone';

export default function UploadButton() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <Dialog
      open={modalOpen}
      onOpenChange={handleModalOpen}
    >
      <DialogTrigger
        onClick={() => setModalOpen(true)}
        asChild
      >
        <Button>Upload PDF</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogTitle>Upload PDF</DialogTitle>
        <DialogDescription></DialogDescription>
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  );
}
