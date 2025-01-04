// /lib/db/s3-server.ts
import AWS from "aws-sdk";

// 2) Suppress the maintenance mode message
// @ts-ignore (to avoid type complaints in TypeScript)
import maintenanceModeMessage from "aws-sdk/lib/maintenance_mode_message";
maintenanceModeMessage.suppress = true;

import * as fs from "fs";
import path from "path";

/**
 * downloadFromS3
 * Downloads a file from S3 and writes to /tmp directory in Node.js.
 * @param fileKey The S3 object key (e.g., "uploads/1693568801787hjkn.pdf")
 * @returns The local file path (string) where the file was written
 */
export async function downloadFromS3(fileKey: string): Promise<string> {
  AWS.config.update({
    region: process.env.NEXT_PUBLIC_S3_REGION || "us-east-1",
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
  });

  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME!;
  const s3 = new AWS.S3();

  try {
    // Retrieve object from S3
    const data = await s3.getObject({ Bucket: bucketName, Key: fileKey }).promise();

    if (!data.Body) {
      throw new Error("S3 getObject: No body returned.");
    }

    // Ensure /tmp directory is valid in your environment
    const filePath = path.resolve("/tmp", path.basename(fileKey));
    fs.writeFileSync(filePath, data.Body as Buffer);

    console.log("File downloaded and saved to:", filePath);
    return filePath;
  } catch (error) {
    console.error("Error downloading file from S3:", error);
    throw new Error("Failed to download file from S3.");
  }
}
