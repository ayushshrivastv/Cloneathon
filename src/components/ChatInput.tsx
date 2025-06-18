"use client";

import { useState, useRef, useEffect } from "react";
import { ModelSelector } from './ModelSelector';
import { useFloating, useClick, useDismiss, useInteractions, FloatingPortal, offset, flip, shift } from '@floating-ui/react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUp, Wand2, Globe, Paperclip, X } from "lucide-react";

interface ChatInputProps {
  onMessageSubmit: (message: string, isWebSearchEnabled: boolean, attachment: File | null) => void;
}

export function ChatInput({ onMessageSubmit }: ChatInputProps) {
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-pro'); // Default model
  const [message, setMessage] = useState("");
  const [isWebSearchEnabled, setIsWebSearchEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setAttachment(file);
      } else {
        alert("Only PDF files are allowed.");
      }
    }
  };
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'top-start',
    middleware: [offset(10), flip(), shift({ padding: 8 })],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !attachment) return;

    // Call the parent's message handler
    if (onMessageSubmit) {
      onMessageSubmit(message.trim(), isWebSearchEnabled, attachment);
    }
    
    console.log("Message submitted:", message);
    setMessage("");
    setAttachment(null);
    if (textareaRef.current) {
      // Reset to initial height after submission
      textareaRef.current.style.height = "52px"; // Or use the computed min-height
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to recalculate based on content
      const scrollHeight = textareaRef.current.scrollHeight;
      // Attempt to get max-height from Tailwind class (e.g., max-h-60 which is 15rem or 240px)
      // Fallback to a pixel value if parsing fails.
      const computedMaxHeight = getComputedStyle(textareaRef.current).maxHeight;
      const maxHeight = computedMaxHeight.endsWith('px') ? parseInt(computedMaxHeight, 10) : 240;
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [message]);

  const initialMinHeightClass = "min-h-[52px]";

  return (
    <div className="relative w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
      {attachment && (
        <div className="flex items-center justify-between p-2 mb-2 bg-white rounded-xl shadow-md">
          <div className="flex items-center space-x-2 overflow-hidden">
            <Paperclip className="w-5 h-5 text-gray-600 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-800 truncate">{attachment.name}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setAttachment(null)}
            className="w-7 h-7 rounded-full flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      <div
        className={cn(
          "relative rounded-3xl bg-white p-2 sm:p-3 transition-all shadow-md",
          isFocused ? "ring-2 ring-blue-500" : "hover:bg-gray-50"
        )}
      >
        <form onSubmit={handleSubmit} id="chat-form" className="flex items-center w-full">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask Anything.."
            className={`flex-grow resize-none bg-transparent py-3 pl-4 pr-2 text-gray-900 placeholder-gray-500 outline-none max-h-60 ${initialMinHeightClass} text-sm sm:text-base`}
            rows={1}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar for cleaner look
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="application/pdf"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="text-gray-400 hover:text-gray-600 rounded-full w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0"
          >
            <Paperclip size={18} />
            <span className="sr-only">Attach file</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsWebSearchEnabled(!isWebSearchEnabled)}
            className={cn(
              "ml-2 rounded-full w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0",
              isWebSearchEnabled ? "text-blue-500 bg-blue-100 hover:bg-blue-200" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <Globe size={18} />
            <span className="sr-only">Toggle Web Search</span>
          </Button>
          <Button
            ref={refs.setReference}
            {...getReferenceProps()}
            type="button"
            variant="ghost"
            size="icon"
            className="ml-2 text-gray-400 hover:text-gray-600 rounded-full w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0"
          >
            <Wand2 size={18} />
            <span className="sr-only">Processor</span>
          </Button>
          <Button
            type="submit"
            size="icon"
            className={cn(
              "ml-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-full w-8 h-8 sm:w-9 sm:h-9 shadow flex-shrink-0",
              !message.trim() && "opacity-50 cursor-not-allowed"
            )}
            disabled={!message.trim()}
          >
            <ArrowUp size={18} />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
        <FloatingPortal>
        {isOpen && (
          <ModelSelector 
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            selectedModel={selectedModel} 
            onModelSelect={(modelId) => {
              setSelectedModel(modelId);
              setIsOpen(false);
            }}
          />
        )}
      </FloatingPortal>
      </div>
    </div>
  );
}
