import { LeftSidebar } from "@/components/LeftSidebar";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <LeftSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
