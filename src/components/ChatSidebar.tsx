"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Thread {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

export function ChatSidebar() {
  const router = useRouter();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedThread, setSelectedThread] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching threads from storage
    const storedThreads = localStorage.getItem("chatThreads");
    if (storedThreads) {
      setThreads(JSON.parse(storedThreads));
    }
  }, []);

  const handleCreateThread = () => {
    const newThread: Thread = {
      id: Date.now().toString(),
      title: "New Conversation",
      lastMessage: "",
      timestamp: new Date().toLocaleString(),
    };

    setThreads(prevThreads => [
      newThread,
      ...prevThreads
    ]);
    setSelectedThread(newThread.id);
    localStorage.setItem("chatThreads", JSON.stringify([...threads, newThread]));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredThreads = threads.filter(thread =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed left-0 top-0 h-full w-48 py-6 px-4 bg-black flex flex-col">
      <div className="mb-6">
        <h2 className="text-white text-lg font-semibold mb-4">Conversations</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400"
          />
        </div>
      </div>

      <button
        onClick={handleCreateThread}
        className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
      >
        <span className="text-sm">New Conversation</span>
      </button>

      <div className="flex-1 overflow-y-auto">
        {filteredThreads.map((thread) => (
          <button
            key={thread.id}
            onClick={() => setSelectedThread(thread.id)}
            className={cn(
              "w-full flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-900/30 rounded-md transition-colors",
              selectedThread === thread.id && "bg-gray-900/30"
            )}
          >
            <div className="flex-1">
              <h3 className="text-sm font-medium">{thread.title}</h3>
              <p className="text-xs text-gray-400">{thread.lastMessage}</p>
            </div>
            <span className="text-xs text-gray-400">{thread.timestamp}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
