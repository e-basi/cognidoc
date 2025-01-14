"use client";

import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import ThemeToggle from "@/app/theme-toggle"; // Corrected import path
import { cn } from "@/lib/utils";
import { GiPaperPlane } from "react-icons/gi";
import { RiSideBarLine } from "react-icons/ri";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
  return (
    <div className="w-full h-screen overflow-y-auto p-4 bg-background text-foreground border-r border-slate-200">
      {/* Logo */}
      <div className="flex items-center justify-center mb-4 w-full">
        <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-foreground">
          <GiPaperPlane className="w-6 h-6 text-primary" />
          <span>CogniDoc</span>
        </Link>

        <div className="ml-4">
          <ThemeToggle />
        </div>

        <div className="ml-4 w-2 ">
        <RiSideBarLine />
      </div>
      
      </div>
      
      {/* New Chat Button */}
      <div className="flex flex-col items-center justify-between mb-4 w-full">
        <Link href="/" className="w-full">
          <Button className="w-full border-dashed border-border">
            <PlusCircle className="mr-2 w-4 h-6" />
            New Chat
          </Button>
        </Link>
      </div>

      {/* Chat List */}
      <div className="flex flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn(
                "rounded-lg p-3 flex items-center transition-colors duration-300",
                {
                  "bg-blue-600 text-white": chat.id === chatId, // Active chat message
                  "hover:bg-gray-700 hover:text-white": chat.id !== chatId, // Hover effect in light mode
                  "dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100": chat.id !== chatId // White background in dark mode
                }
              )}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap">
                {chat.pdfName}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer Links */}
      <div className="absolute bottom-4 left-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <Link href="/">HOME</Link>
          <Link href="/">SOURCE</Link>
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;

