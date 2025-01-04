// /app/api/chat-creation/route.ts
import { NextResponse } from "next/server";
import { loadS3IntoPinecone } from "@/lib/db/pinecone";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    
    console.log("Request body:", body);

    if (!file_key || !file_name) {
      return NextResponse.json(
        { error: "Missing file_key or file_name" },
        { status: 400 }
      );
    }

    console.log("Calling loadS3IntoPinecone with:", file_key);
    const pages = await loadS3IntoPinecone(file_key);
    console.log("Pages loaded successfully:", pages?.length || 0);

    // Return some success or do further processing
    return NextResponse.json({
      message: "Chat created successfully",
      pagesCount: pages?.length ?? 0,
    });
  } catch (error) {
    console.error("Error in /api/chat-creation:", error);
    return NextResponse.json(
      { error: "Error: Internal server error" },
      { status: 500 }
    );
  }
}
