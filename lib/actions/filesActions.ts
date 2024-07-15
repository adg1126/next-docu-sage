import { Client, ID, Storage, Databases, Query } from 'appwrite';
import { parseStringify } from '../utils';
import { getLoggedInUser } from './userActions';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

const storage = new Storage(client),
  databases = new Databases(client);

export const uploadFile = async (file: any) => {
  try {
    const createdFileInBucket = await storage.createFile(
      process.env.NEXT_PUBLIC_APPWRITE_FILE_BUCKET_ID!,
      ID.unique(),
      file
    );

    const { $id: userId } = await getLoggedInUser();

    const { $id, $createdAt, $permissions, $updatedAt, name } =
      createdFileInBucket;

    if (!createdFileInBucket || userId.length === 0) {
    }

    const createdFileInDatabase = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_FILE_COLLECTION_ID!,
      ID.unique(),
      {
        fileId: $id,
        name,
        createdAt: $createdAt,
        updatedAt: $updatedAt,
        users: userId,
      }
    );

    return parseStringify(createdFileInDatabase);
  } catch (err: any) {
    return { error: err?.response?.message };
  }
};

export const deleteFile = async ({
  fileCollectionId,
  fileBucketId,
}: {
  fileCollectionId: string;
  fileBucketId: string;
}) => {
  console.log(fileCollectionId, fileBucketId);
  try {
    // delete file in File colleection
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_FILE_COLLECTION_ID!,
      fileCollectionId
    );

    // delete file in file bucket
    await storage.deleteFile(
      process.env.NEXT_PUBLIC_APPWRITE_FILE_BUCKET_ID!,
      fileBucketId
    );
  } catch (err: any) {
    return { error: err?.response?.message };
  }
};

export const getUserFiles = async (userId: string) => {
  try {
    const documentRes = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_FILE_COLLECTION_ID!,
      [Query.equal('users', userId)]
    );

    return parseStringify(documentRes);
  } catch (err: any) {
    return { error: err?.response?.message };
  }
};
