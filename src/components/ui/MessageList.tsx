// src/components/ui/MessageList.tsx
import React from "react";
import { Message } from "ai/react";
import { cn } from "@/lib/utils";

type Props = {
  messages: Message[];
};

const MessageList = ({ messages }: Props) => {
  if (!messages) return null;

  return (
    <div className="flex flex-col gap-2 px-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn("flex", {
            "justify-end p1-10": message.role === "user",
            "justify-end pr-10": message.role === "assistant",
          })}
        >
          <div
            className={cn(
              "round-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10",
              {
                "bg-blue-800 text-white": message.role === "user",
                "bg-gray-100 text-black": message.role === "assistant",
              }
            )}
          >
            <p>{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;