import { S3Client as _S3Client } from '@aws-sdk/client-s3';

const AWS_REGION = 'ap-southeast-2';

const accessKeyId = process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID;
const accessKey = process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY;

const config = {
  region: AWS_REGION,
  credentials: {
    accessKeyId,
    secretAccessKey: accessKey,
  },
};

export const S3Client = new _S3Client(config);
