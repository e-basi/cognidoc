// /lib/s3.ts
import { S3 } from "@aws-sdk/client-s3";

/**
 * uploadToS3
 * Uploads a file to S3.
 */
export async function uploadToS3(file: File) {
  const s3 = new S3({
    region: process.env.NEXT_PUBLIC_S3_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
    },
  });

  const fileKey = `uploads/${Date.now().toString()}-${file.name.replace(/\s+/g, "-")}`;

  // Body must be the file content (Blob/File in browser)
  await s3.putObject({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
    Key: fileKey,
    Body: file,
  });

  return { fileKey, fileName: file.name };
}

/**
 * getS3Url
 * Returns a direct S3 URL for a given key.
 */
export function getS3Url(fileKey: string) {
  return `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${fileKey}`;
}
