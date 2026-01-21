// /app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    console.log("Received messages:", messages);

    const model = process.env.PREFERRED_MODEL || "gpt-3.5-turbo";

    const result = streamText({
      model: openai(model),
      system: "You are a helpful assistant.",
      messages,
      maxTokens: 2048
    });

    // Log each token as it streams
    for await (const token of result.textStream) {
      console.log("Streaming token:", token);
    }

    console.log("Returning data stream response...");
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

