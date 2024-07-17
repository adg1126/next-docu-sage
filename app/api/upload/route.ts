import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/lib/actions/filesActions';

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      throw new Error('No file provided');
    }

    if (file.type !== 'application/pdf') {
      throw new Error('Incorrect file type');
    }

    const uploadedFile = await uploadFile(file);

    if (uploadedFile.fileId) {
      return NextResponse.json(
        {},
        {
          statusText: `${uploadedFile?.name} has been uploaded`,
          status: 200,
        }
      );
    }
  } catch (err: any) {
    return NextResponse.json({}, { status: 400, statusText: err.message });
  }
}
