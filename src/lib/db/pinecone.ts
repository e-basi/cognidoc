// /lib/db/pinecone.ts
import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import * as fs from "fs";
import path from "path";
import md5 from "md5";
import { convertToAscii } from "@/lib/utils"; // Adjust if you have your own logic

import {
  Document as DS_Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";


export async function getEmbeddings(text: string): Promise<number[]> {
  // For demonstration, return a dummy embeddings array of fixed size
  return Array(1536).fill(0.12345);
}
/** Vector type matching Pinecone’s upsert format */
export type Vector = {
  id: string;
  values: number[];
  metadata: {
    text: string;
    pageNumber: number;
  };
};

/** PineconeDocument extends the doc-splitter Document with typed metadata */
// Re-alias the doc-splitter Document
type PineconeDocument = DS_Document & {
  metadata: {
    text: string;
    pageNumber: number;
  };
};


/** PDFPage shape from PDFLoader's result  */
type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

/** Create or retrieve the Pinecone client */
export function getPineconeClient() {
  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
    // environment: process.env.PINECONE_ENVIRONMENT!,
  });
}

const pinecone = getPineconeClient();
export default pinecone;

/**
 * loadS3IntoPinecone
 * - Downloads PDF from S3 -> /tmp
 * - Loads with PDFLoader -> PDFPage[]
 * - Splits -> doc-splitter Documents
 * - Creates embeddings -> 1536 dimension
 * - Upserts to Pinecone
 */
export async function loadS3IntoPinecone(fileKey: string): Promise<PineconeDocument[]> {
  try {
    console.log("Downloading S3 object for key:", fileKey);
    const filePath = await downloadFromS3(fileKey);

    // Validate
    if (!filePath || typeof filePath !== "string") {
      throw new Error("Invalid file path returned from downloadFromS3.");
    }

    const normalizedPath = path.resolve(filePath);
    if (!fs.existsSync(normalizedPath)) {
      throw new Error(`File does not exist at path: ${normalizedPath}`);
    }

    console.log("Loading PDF into memory...");
    const loader = new PDFLoader(normalizedPath);
    const pages = (await loader.load()) as PDFPage[];
    console.log("PDF pages loaded:", pages?.length || 0);

    // 1) Split pages -> doc-splitter Documents
    const documents = (await Promise.all(pages.map(prepareDocument))).flat();

    // 2) Embed each doc
    const vectors = await Promise.all(documents.map(embedPineconeDocument));

    // 3) Upsert to Pinecone
    const client = getPineconeClient();
    const pineconeIndex = await client.index("cognidoc"); // Ensure dimension=1536 in Pinecone
    const namespace = pineconeIndex.namespace(convertToAscii(fileKey));

    console.log("Inserting vectors to Pinecone...");
    await namespace.upsert(vectors); 
    console.log("Upsert complete.");

    // Return the array of PineconeDocuments
    return documents;
  } catch (error) {
    console.error("Error in loadS3IntoPinecone:", error);
    throw error;
  }
}

/**
 * prepareDocument
 * Splits a single PDFPage into multiple PineconeDocument(s).
 */
async function prepareDocument(page: PDFPage): Promise<PineconeDocument[]> {
  const rawContent = page.pageContent.replace(/\n/g, "");
  const { pageNumber } = page.metadata.loc;

  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new DS_Document({
      pageContent: rawContent,
      metadata: {
        pageNumber,
        text: rawContent,
      },
    }),
  ]);

  return docs as PineconeDocument[];
}

/**
 * embedPineconeDocument
 * Calls OpenAI for a 1536-dim embedding -> returns a Pinecone Vector
 */
async function embedPineconeDocument(doc: PineconeDocument): Promise<Vector> {
  // Use your newly imported getEmbedding
  const embeddings = await getEmbeddings(doc.pageContent);
  const hash = md5(doc.pageContent);

  return {
    id: hash,
    values: embeddings, // 1536 floats
    metadata: {
      text: doc.metadata.text,
      pageNumber: doc.metadata.pageNumber,
    },
  };
}


/** Helper to truncate a string by bytes */
export function truncateStringByBytes(str: string, bytes: number) {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
}

