import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { ExpandIcon, Loader2 } from 'lucide-react';
import SimpleBar from 'simplebar-react';
import { Document, Page } from 'react-pdf';

import { useToast } from './ui/use-toast';
import { useResizeDetector } from 'react-resize-detector';

export default function PdfFullscreen({ fileUrl }: PdfRenderProps) {
  const { toast } = useToast(),
    { width, ref } = useResizeDetector();

  const [dialogOpen, setDialogOpen] = useState(false),
    [numPages, setNumPages] = useState<number | null>(null);

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={() => setDialogOpen(!dialogOpen)}
    >
      <DialogTrigger
        asChild
        onClick={() => setDialogOpen(true)}
      >
        <Button
          variant='ghost'
          className='gap-1.5'
          aria-label='fullscreen'
        >
          <ExpandIcon className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-7xl w-full'>
        <SimpleBar
          autoHide={false}
          className='max-h-[calc(100vh-10rem)] mt-6'
        >
          <div ref={ref}>
            <Document
              file={fileUrl}
              className='max-h-full'
              loading={
                <div className='flex justify-center'>
                  <Loader2 className='my-24 h-6 w-6 animate-spin' />
                </div>
              }
              onLoadError={() => {
                toast({
                  title: 'Error loading PDF',
                  description: 'Please try again later',
                  variant: 'destructive',
                });
              }}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
              {new Array(numPages).fill(0).map((_, i) => (
                <Page
                  key={i}
                  width={width ? width : 1}
                  pageNumber={i + 1}
                />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
}
