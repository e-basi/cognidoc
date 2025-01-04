// /lib/db/pinecone.ts
import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import * as fs from "fs";
import path from "path";

const pinecone = new Pinecone({
  // For older Pinecone versions, or if your version supports `Pinecone` directly:
  apiKey: process.env.PINECONE_API_KEY!,
  // For some versions, environment can be here:
  // environment: process.env.PINECONE_ENVIRONMENT!
});

export default pinecone;

/**
 * loadS3IntoPinecone
 * 1. Downloads a PDF from S3 to /tmp
 * 2. Loads it into PDFLoader
 * 3. Returns pages for debugging or further processing
 */
export async function loadS3IntoPinecone(fileKey: string) {
  try {
    console.log("Downloading S3 object into file system for key:", fileKey);
    const file_path = await downloadFromS3(fileKey);

    // Validate path
    if (!file_path || typeof file_path !== "string") {
      throw new Error("Invalid file path returned from downloadFromS3.");
    }

    console.log("File path:", file_path);
    const normalizedPath = path.resolve(file_path);

    if (!fs.existsSync(normalizedPath)) {
      throw new Error(`File does not exist at path: ${normalizedPath}`);
    }

    console.log("Loading PDF into memory...");
    const loader = new PDFLoader(normalizedPath);
    const pages = await loader.load(); // If this fails, see if it's a PDFLoader version mismatch
    console.log("PDF pages loaded:", pages?.length || 0);

    // OPTIONAL: If you want to do actual indexing with Pinecone:
    //   1. Split pages
    //   2. Get embeddings
    //   3. Upsert to Pinecone

    return pages;
  } catch (error) {
    console.error("Error in loadS3IntoPinecone:", error);
    throw error;
  }
}
