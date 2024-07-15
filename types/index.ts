declare interface signInProps {
  email: string;
  password: string;
}

declare type SignUpParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

declare interface getUserInfoProps {
  userId: string;
}

declare interface getUserFilesProps {
  userId: string;
}

declare type UploadStatus = 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED';

declare type UserFile = {
  fileId: string;
  name: string;
  uploadStatus: UploadStatus;
  url: string;
  key: string;
  createdAt: Date;
  updatedAt: Date;
  users: User;
  userId: string;
};

declare type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  stripeCurrentPeriodEnd: Date;
  stripeCustomerId: string;
  files: UserFile[];
};

declare interface FilePageProps {
  params: {
    fileId: string;
  };
}

declare interface FileUpdateProps {
  fileId: string;
  name: string;
}

declare interface PdfRenderProps {
  fileUrl: string;
}
