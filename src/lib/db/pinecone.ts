// /lib/db/pinecone.ts
import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import * as fs from "fs";
import path from "path";

import {
  Document as PineconeDocument,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";

const pinecone = new Pinecone({
  // For older Pinecone versions, or if your version supports `Pinecone` directly:
  apiKey: process.env.PINECONE_API_KEY!,
  // For some versions, environment can be here:
  // environment: process.env.PINECONE_ENVIRONMENT!
});

export default pinecone;


type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};
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
    const pages: PDFPage[] = (await loader.load()) as PDFPage[]; // If this fails, see if it's a PDFLoader version mismatch
    console.log("PDF pages loaded:", pages?.length || 0);

    //   2. Split pages & segment  

    const documents = (await Promise.all(pages.map(prepareDocument))).flat();
    

    //vectorise & embeddings documents

    // OPTIONAL: If you want to do actual indexing with Pinecone:
    //   1. Split pages
    //   2. Get embeddings
    //   3. Upsert to Pinecone
    return documents;
  } catch (error) {
    console.error("Error in loadS3IntoPinecone:", error);
    throw error;
  }
}


export const trunatStringByBytes = (str: string, bytes: number)=> {
  const enc = new TextEncoder()
  return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes))
}
async function prepareDocument(page: PDFPage): Promise<PineconeDocument[]> {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");

  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new PineconeDocument({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: pageContent,
      },
    }),
  ]);
  return docs;
}
