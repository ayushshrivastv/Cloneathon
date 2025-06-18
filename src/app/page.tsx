"use client";

import { ChatInput } from "@/components/ChatInput";
import { ContentFeed } from "@/components/ContentFeed";
import { FloatingChatContainer } from "@/components/FloatingChatContainer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { SignInModal } from "@/components/SignInModal";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  attachment?: {
    name: string;
  };
}

export default function Home() {
  const [isChatMode, setIsChatMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAssistantThinking, setIsAssistantThinking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();

  const handleSendMessage = async (text: string, isWebSearchEnabled: boolean, attachment: File | null) => {
    if (!text.trim() && !attachment) return;

    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }

    const newUserMessage: Message = { 
      id: Date.now().toString(), 
      text, 
      sender: 'user' as const,
      ...(attachment && { attachment: { name: attachment.name } })
    };
    setMessages(prev => [...prev, newUserMessage]);
    setIsChatMode(true);
    setIsAssistantThinking(true);

    try {
      let response;
      if (attachment) {
        const formData = new FormData();
        formData.append('message', text);
        formData.append('isWebSearchEnabled', String(isWebSearchEnabled));
        formData.append('attachment', attachment);
        
        response = await fetch('/api/chat', {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: text, isWebSearchEnabled }),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `API error: ${response.statusText}`);
      }

      const assistantMessage = { id: (Date.now() + 1).toString(), text: data.reply, sender: 'assistant' as const };
      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error("Failed to send message:", error);
      console.log("Sending message:", text, "Web search:", isWebSearchEnabled);
      const errorMessageText = error instanceof Error ? error.message : "An unknown error occurred.";
      const errorMessage = { id: (Date.now() + 1).toString(), text: errorMessageText, sender: 'assistant' as const };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAssistantThinking(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SignInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {!isLoggedIn && !isChatMode && (
        <Button
          onClick={() => setIsModalOpen(true)}
          className="fixed top-6 right-6 bg-white text-black hover:bg-gray-200 z-50"
        >
          Login
        </Button>
      )}
      {isLoggedIn && (
        <div className="fixed top-6 right-6 flex items-center space-x-4 z-50">
          
          <span className="text-white font-medium">{user?.displayName || 'Welcome'}</span>
          <Button
            onClick={logout}
            variant="outline"
            className="bg-transparent text-white border-gray-600 hover:bg-gray-800 hover:text-white"
          >
            Logout
          </Button>
        </div>
      )}

      {isChatMode ? (
        // Chat Mode Layout
        <div className="flex flex-col h-screen">
          <FloatingChatContainer messages={messages} isLoading={isAssistantThinking}>
              <ChatInput onMessageSubmit={handleSendMessage} />
            </FloatingChatContainer>
        </div>
      ) : (
        // Landing Screen Layout
        <div className="flex flex-col items-center">
          <div className="w-full flex flex-col items-center pt-24 pb-4">
            <h1 className="text-5xl font-semibold mb-10 text-center animate-fade-in text-white">
              What can I help with?
            </h1>
            <div className="animate-fade-in stagger-delay-2 w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
              <ChatInput onMessageSubmit={handleSendMessage} />
            </div>
          </div>
          <ContentFeed />
        </div>
      )}
    </div>
  );
}
