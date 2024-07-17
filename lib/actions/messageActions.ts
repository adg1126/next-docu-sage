'use server';
import { ID, Query } from 'node-appwrite';
import { createAdminClient } from '@/lib/server/appwrite';

import { parseStringify } from '../utils';

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_MSSAGE_COLLECTION_ID: MESSAGE_COLLECTION_ID,
} = process.env;

export const createMessage = async ({
  message,
  userId,
  fileId,
}: {
  message: string;
  userId: string;
  fileId: string;
}) => {
  try {
    const { database } = await createAdminClient();

    const res = await database.createDocument(
      DATABASE_ID!,
      MESSAGE_COLLECTION_ID!,
      ID.unique(),
      {
        text: message,
        isUserMessage: true,
        users: userId,
        files: fileId,
      }
    );

    return parseStringify(res);
  } catch (err: any) {
    return { error: err?.response?.message };
  }
};
