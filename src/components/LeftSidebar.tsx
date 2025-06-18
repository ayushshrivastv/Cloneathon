"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { OpenAPILogo } from "@/components/OpenAPILogo";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react"; // Make sure to install lucide-react if not already installed

const navigationItems: { name: string; href: string }[] = [
  { name: "Home", href: "/" },
  { name: "Documentation", href: "/documentation" },
];

export function LeftSidebar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const isChatOpen = pathname === '/chat';

  return (
    <div className="fixed left-0 top-0 h-full w-48 py-6 px-4 bg-black flex flex-col z-50">
      <Link href="/" className="flex items-center justify-center mb-8 px-2">
        <OpenAPILogo width={154} height={44} className="mx-auto" priority={true} />
      </Link>

      <nav className="flex-1">
        <ul className="space-y-0.5">
          {navigationItems.map((item) => {
            const isHome = item.href === "/";
            const Tag = Link;

            return (
              <li key={item.name}>
                <Tag
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between py-2 px-2 text-white text-base hover:bg-gray-900/30 rounded-md transition-colors group",
                    hoveredItem === item.name && "bg-gray-900/50"
                  )}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span>{item.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn(
                      "transition-opacity duration-300",
                      hoveredItem === item.name ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Tag>
              </li>
            );
          })}
        </ul>
        {isChatOpen && (
          <div className="mt-6">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search chat history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-8 py-2.5 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        )}
      </nav>

      <div className="mt-auto pt-6">
        <Link
          href="/help"
          className="flex items-center justify-between py-1.5 px-2 text-white/70 text-sm hover:text-white hover:bg-gray-900/30 rounded-md transition-colors group"
          onMouseEnter={() => setHoveredItem("help")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <span>Help Center</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={cn(
              "transition-opacity duration-300",
              hoveredItem === "help" ? "opacity-100" : "opacity-0"
            )}
          >
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </Link>
        <Link
          href="/account"
          className="flex items-center justify-between py-1.5 px-2 text-white/70 text-sm hover:text-white hover:bg-gray-900/30 rounded-md transition-colors group"
          onMouseEnter={() => setHoveredItem("account")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <span>Account</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={cn(
              "transition-opacity duration-300",
              hoveredItem === "account" ? "opacity-100" : "opacity-0"
            )}
          >
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}
