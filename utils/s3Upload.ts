import { S3Client } from '@aws-sdk/client-s3';

const REGION = 'us-east-2'; // Replace with your region

export const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: 'AKIAZI2LCNUH7TCAU7XU',
    secretAccessKey: 'IPfV7fxJHyRwOY54PHbqanocBoBvUAg9Dj54HLTH',
  },
});
