// /app/api/chat-creation/route.ts
import { NextResponse } from "next/server";
import { loadS3IntoPinecone } from "@/lib/db/pinecone";
import { getS3Url } from "@/lib/s3";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema"; // Adjust the import path as necessary



export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

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

    // 1) Load PDF into Pinecone
    console.log("Calling loadS3IntoPinecone with:", file_key);
    const docs = await loadS3IntoPinecone(file_key);
    console.log("Docs loaded successfully:", docs?.length || 0);

        // 2) Insert a record in your database
        const pdfUrl = getS3Url(file_key);

        console.log("Inserting into chats table...");
        const result = await db
          .insert(chats)
          .values({
            fileKey: file_key,
            pdfName: file_name,
            pdfUrl: pdfUrl,
            userId: userId,
            createdAt: new Date(), // Ensure this matches your schema
          })
          .returning({ id: chats.id });
    
        const insertedChat = result[0];
        console.log("Inserted chat:", insertedChat);

        // 3) Return success response
        return NextResponse.json({
          message: "Chat created successfully",
          chat_id: insertedChat.id,
          pagesCount: docs?.length ?? 0,
        }, { status: 200 });
    
      } catch (error) {
        console.error("Error in /api/chat-creation:", error);
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
        );
      }
    }
