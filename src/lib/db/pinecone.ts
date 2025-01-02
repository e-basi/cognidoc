// pinecone.ts
import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

export default pinecone;


export async function loadS3IntoPinecone(fileKey: string){}