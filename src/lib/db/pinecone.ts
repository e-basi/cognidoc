// pinecone.ts
import { Pinecone } from '@pinecone-database/pinecone';
import { downloadFromS3 } from "./s3-server";

const pinecone = new Pinecone({
  // environment: process.env.PINECONE_ENVIRONMENT!, // e.g., "us-east1-gcp"
  apiKey: process.env.PINECONE_API_KEY!,
});

export default pinecone;


export async function loadS3IntoPinecone(fileKey: string) {
  // Add your implementation here
  console.log("downloading s3 into file system");
  const file_name = await downloadFromS3(fileKey);
  if (!file_name) {
    throw new Error("could not download from s3");
  }
}
