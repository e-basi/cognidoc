import { NextResponse } from "next/server";
import { loadS3IntoPinecone } from "@/lib/db/pinecone"

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { file_key, file_name } = body;

    if (!file_key || !file_name) {
      return NextResponse.json(
        { error: "Missing file_key or file_name" },
        { status: 400 }
      );
    }

    console.log("Received data:", { file_key, file_name });
    await loadS3IntoPinecone(file_key);

    return NextResponse.json({ message: "Chat created successfully" });
  } catch (error) {
    console.error("Error in /api/chat-creation:", error);
    return NextResponse.json(
      { error: "Error: Internal server error" },
      { status: 500 }
    );
  }
}
