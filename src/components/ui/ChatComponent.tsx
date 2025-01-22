"use client";
import React from "react";
import { useChat } from "ai/react";
import MessageList from "./MessageList";
import { Input } from "./Input";
import { Button } from "./button";

const ChatComponent = () => {
  const { input, handleInputChange, handleSubmit, messages, error } = useChat({
    api: "/api/chat", // Match your server route
  });

  // Debugging: Log messages and errors
  React.useEffect(() => {
    if (error) {
      console.error("Chat error:", error);
    }
    console.log("Messages:", messages);
  }, [messages, error]);

  return (
    <div className="relative max-h-screen overflow-scroll">
      {/* Header */}
      <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500">
          An error occurred: {error.message || "Unexpected error"}
        </div>
      )}

      {/* Message List */}
      <MessageList messages={messages} />

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="p-4">
        <div className="relative w-full">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="w-full pr-10"
          />
          <Button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-r-md px-3"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;