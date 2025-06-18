"use client";

import { ChatInput } from "@/components/ChatInput";
import { FloatingChatContainer } from "@/components/FloatingChatContainer";
import { useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleMessageSubmit = (message: string, isWebSearchEnabled: boolean, attachment: File | null) => {
    if (!message.trim() && !attachment) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
    };

    setMessages(prev => [...prev, newMessage]);

    // Here you would handle the attachment and web search logic
    console.log({ message, isWebSearchEnabled, attachment });
  };

  return (
    <div className="h-full flex flex-col">
      <FloatingChatContainer messages={messages}>
        <ChatInput onMessageSubmit={handleMessageSubmit} />
      </FloatingChatContainer>
    </div>
  );
}
