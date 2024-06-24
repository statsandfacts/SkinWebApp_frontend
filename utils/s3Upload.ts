import { S3Client } from '@aws-sdk/client-s3';

const REGION = 'us-east-2'; // Replace with your region

export const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: 'AKIAZI2LCNUHYEQ4B67A',
    secretAccessKey: 'J4J7JyRDq1xC75iVT+EoLP5MJL10u8QtaoUJSa35',
  },
});
