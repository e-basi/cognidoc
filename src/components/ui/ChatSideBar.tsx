"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { GiPaperPlane } from "react-icons/gi";
import { RiSideBarLine } from "react-icons/ri";
import ThemeToggle from "@/app/theme-toggle";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { format, isToday, isYesterday, subDays } from "date-fns";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
};

const groupChatsByDate = (chats: DrizzleChat[]) => {
  const grouped: { [key: string]: DrizzleChat[] } = {};

  chats.forEach((chat) => {
    const date = new Date(chat.createdAt);
    let group = "";

    if (isToday(date)) {
      group = "Today";
    } else if (isYesterday(date)) {
      group = "Yesterday";
    } else if (date > subDays(new Date(), 7)) {
      group = "Past 7 Days";
    } else {
      group = format(date, "MMMM d, yyyy");
    }

    if (!grouped[group]) {
      grouped[group] = [];
    }
    grouped[group].push(chat);
  });

  return grouped;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
  const [open, setOpen] = useState(true);
  const groupedChats = groupChatsByDate(chats);

  return (
    <motion.div
      layout
      className={`h-screen overflow-y-auto border-r border-slate-200 bg-background text-foreground relative`}
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4 w-full p-4">
        <div className="flex items-center space-x-2">
          <GiPaperPlane className="w-6 h-6 text-primary" />
          {open && (
            <motion.span
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-foreground"
            >
              CogniDoc
            </motion.span>
          )}
        </div>
        <motion.button
          layout
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-center w-8 h-8 hover:bg-muted rounded-full cursor-pointer transition-all duration-300"
        >
          <RiSideBarLine
            className={`w-6 h-6 text-foreground transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </motion.button>
      </div>

      {/* Content */}
      {open && (
        <>
          {/* New Chat Button */}
          <motion.div layout className="flex flex-col items-center justify-between mb-4 w-full px-4">
            <Link href="/" className="w-full">
              <Button className="w-full border-dashed border-border">
                <PlusCircle className="mr-2 w-4 h-6" />
                New Chat
              </Button>
            </Link>
          </motion.div>

          {/* Grouped Chats */}
          <div className="flex flex-col gap-4 mt-4 px-4">
            {Object.entries(groupedChats)
              .sort(([groupA], [groupB]) => {
                const order = ["Today", "Yesterday", "Past 7 Days"];
                const indexA = order.indexOf(groupA);
                const indexB = order.indexOf(groupB);
                if (indexA === -1 && indexB === -1) {
                  return new Date(groupA).getTime() - new Date(groupB).getTime();
                }
                return (indexA === -1 ? 3 : indexA) - (indexB === -1 ? 3 : indexB);
              })
              .map(([dateGroup, chats]) => (
                <div key={dateGroup} className="flex flex-col gap-2">
                  {/* Date Group Label */}
                  <div className="sticky bg-background text-muted-foreground top-0 z-10 py-1 text-xs font-semibold">
                    {dateGroup}
                  </div>
                  {chats.map((chat) => (
                    <Link key={chat.id} href={`/chat/${chat.id}`}>
                      <motion.div
                        layout
                        className={cn(
                          "rounded-lg p-3 flex items-center transition-colors duration-300",
                          {
                            "bg-blue-600 text-white": chat.id === chatId,
                            "hover:bg-gray-700 hover:text-white": chat.id !== chatId,
                          }
                        )}
                      >
                        <MessageCircle className="mr-2" />
                        {open && (
                          <motion.p
                            layout
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="w-full overflow-hidden text-sm truncate whitespace-nowrap"
                          >
                            {chat.pdfName}
                          </motion.p>
                        )}
                      </motion.div>
                    </Link>
                  ))}
                </div>
              ))}
          </div>
        </>
      )}

      {/* Footer */}
      <div className="absolute bottom-4 left-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <Link href="/">HOME</Link>
          <Link href="/">SOURCE</Link>

          <div className="ml-4">
          <ThemeToggle />
        </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatSideBar;
