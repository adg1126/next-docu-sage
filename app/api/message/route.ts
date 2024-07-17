import { NextRequest } from 'next/server';
import { getLoggedInUser } from '@/lib/actions/userActions';
import { SendMessageValidator } from '@/lib/validators/SendMessageValidators';
import { getFile } from '@/lib/actions/filesActions';
import { createMessage } from '@/lib/actions/messageActions';

export const POST = async (req: NextRequest) => {
  // endpoint for asking a uestion to a pdf file

  const body = await req.json();

  const { $id: userId } = await getLoggedInUser();

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { fileId, message } = SendMessageValidator.parse(body);

  const file = await getFile(fileId);

  if (!file) {
    return new Response('File not found', { status: 404 });
  }

  await createMessage({ message, userId, fileId });
};
