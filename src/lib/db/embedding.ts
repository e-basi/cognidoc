// /lib/db/embedding.ts
import { Configuration, OpenAIApi } from "openai-edge";

// Make sure you have OPENAI_API_KEY in your .env
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
  organization: process.env.OPENAI_ORGANIZATION,
});

const openai = new OpenAIApi(config);

/**
 * getEmbedding
 * Calls OpenAI's 'text-embedding-ada-002' to create a 1536-dimensional embedding.
 */
export async function getEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text.replace(/\n/g, " "),
    });

    // The openai-edge library returns a special response object
    const result = await response.json();

    // Return the array of floats from 'result.data[0].embedding'
    return result.data[0].embedding as number[];
  } catch (error) {
    console.error("Error calling OpenAI embedding API:", error);
    throw error;
  }
}