import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import ChatSideBar from "@/components/ui/ChatSideBar";
import PDFViewer from "@/components/ui/PDFViewer";


type Props = {
  params: {
    chatId: string;
  };
};

export default async function ChatPage( props : Props) {
  // Await `props.params` safely
  const params = await props.params; // Explicitly ensure params is awaited

  // Safely destructure `chatId` from params
  const { chatId } = params;

  // Now you can safely use `chatId`
  const { userId } = await auth();
  console.log("Authenticated userId:", userId);
  if (!userId) {
    return redirect("/sign-in");
  }

  // Query all chats for this user
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));

  // 4) If you truly want to show chat/1 only if user is in:
  //    - check if the chatId is in their list. If not, handle as you prefer.
  const chatFound = _chats.some((c) => c.id === parseInt(chatId, 10));
  if (!chatFound) {
    // Optional: redirect or show "Not Found" if the user doesn't have that chat ID
    // For now, let's just redirect back to a main chat page:
    return redirect("/");
  }

  // If chatId does not match any chat in `_chats`, redirect
  const chatExists = _chats.some((chat) => chat.id === parseInt(chatId));
  if (!chatExists) {
    return redirect("/");
  }
  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId, 10));

  console.log("Chats for user:", _chats);
 
  // Render page
  return (
    <div className="flex max-h-screen">
      {/* Chat Sidebar */}
      <div className="flex-[1] max-w-xs border-r border-slate-200">
        <ChatSideBar chats={_chats} chatId={parseInt(chatId, 10)} />
      </div>

      {/* PDF Viewer */}
      <div className="flex-[5] max-h-screen p-4 overflow-scroll">
        <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
      </div>

      {/* Chat Messages */}
      <div className="flex-[3] border-l border-slate-200">
        {/* Chat messages and interactions go here */}
      </div>
    </div>
  );
}


