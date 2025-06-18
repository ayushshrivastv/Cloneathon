"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  image: string;
  type: string;
  readTime: string;
  date?: string;
}

interface ContentCategory {
  title: string;
  items: ContentItem[];
}

const contentCategories: ContentCategory[] = [
  {
    title: "Special Report",
    items: [
      {
        id: "ai-financial-analyst",
        title: "T3.chat: The Future of Conversational AI Development",
        description: `NEW DELHI – In a world where developers are constantly seeking better ways to build and interact with AI systems, T3.chat emerges as a revolutionary platform that bridges the gap between human creativity and machine intelligence. This isn't just another chat interface; it's a comprehensive development environment that allows developers to create, test, and deploy AI applications with unprecedented ease. With its intuitive interface and powerful backend, T3.chat enables developers to focus on what truly matters: building meaningful AI experiences that solve real-world problems. From natural language processing to complex data analysis, T3.chat provides the tools and infrastructure needed to bring AI innovations to life. But more than just a technical platform, T3.chat represents a new paradigm in AI development—one where collaboration, experimentation, and rapid iteration are at the forefront. As we enter this exciting new era of AI development, T3.chat stands as a testament to what's possible when human ingenuity meets cutting-edge technology.`,
        image: "/images/Gta8NpEXkAAcA5d.jpeg", // Local image
        type: "Insight",
        readTime: "2 min read",
      }
    ]
  }
];

const HighlightedDescription = ({ text }: { text: string }) => {
  const parts = text.split(/(MongoDB|Google)/g);
  return (
    <p className="text-sm text-white/90 mb-3">
      {parts.map((part, i) =>
        part === 'MongoDB' || part === 'Google' ? (
          <span key={i} className="bg-purple-500/30 text-purple-300 px-1 rounded-sm font-semibold">{part}</span>
        ) : (
          part
        )
      )}
    </p>
  );
};

export function ContentFeed() {
  const [visibleItems, setVisibleItems] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px 100px 0px" }
    );

    document.querySelectorAll(".content-item").forEach(item => {
      observer.observe(item);
    });

    return () => {
      document.querySelectorAll(".content-item").forEach(item => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto pt-16 pb-32">
      {contentCategories.map((category, categoryIndex) => (
        <section key={category.title} className="mb-24">
          {/* Content section without heading */}

          <div className={categoryIndex === 0 ? "grid grid-cols-1 gap-8" : "grid grid-cols-1 md:grid-cols-3 gap-6"}>
            {category.items.map((item, itemIndex) => (
              <Card
                key={item.id}
                id={`${category.title}-${item.id}`}
                className={cn(
                  "content-item overflow-hidden transition-all duration-700 group relative",
                  visibleItems[`${category.title}-${item.id}`]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                )}
              >
                <img src={item.image} alt={item.title} className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <CardContent className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex items-center mb-2">
                    <span className="bg-purple-500/30 text-purple-300 px-2 py-1 rounded-full text-xs font-semibold">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                  <HighlightedDescription text={item.description} />
                  <div className="text-xs text-gray-300">{item.readTime}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
