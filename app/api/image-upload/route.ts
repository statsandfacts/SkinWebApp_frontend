import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const s3_bucket = process.env.AWS_S3_BUCKET;
  const reason = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  const response = {
    s3_bucket,
    reason,
    accessKeyId,
    secretAccessKey,
  };

  return NextResponse.json(response);
}
