import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function DocumentationPage() {
  return (
    <div className="bg-black text-white min-h-screen font-serif">
      <header className="fixed top-0 left-48 right-0 bg-black/50 backdrop-blur-sm z-10">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16 border-b border-gray-800">
            <h1 className="text-xl font-display font-bold">T3 Chat: A New Era in AI Assistance</h1>
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="inline-block w-4 h-4 mr-1" />
              Return to Application
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 max-w-3xl mx-auto px-6 sm:px-8 lg:px-10">
        <article>
          <header className="mb-12 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-4">The Digital Vanguard: How T3 Chat is Redefining Artificial Intelligence</h2>
            <p className="text-lg text-gray-400">In an increasingly crowded field of digital assistants, T3 Chat emerges not merely as another competitor, but as a formidable new standard. Offering access to elite AI models such as GPT-4 and Claude, the service is positioned to become an indispensable tool for professionals and creatives alike.</p>
            <p className="text-lg text-gray-400 mt-4">
              Visit the official website: <a href="https://t3.chat" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">t3.chat</a>
            </p>
          </header>

          <section className="mb-12 animate-fade-in-delay-1">
            <h3 className="text-2xl font-display font-bold mb-4">Core Capabilities</h3>
            <p className="text-gray-400 mb-6">At its foundation, T3 Chat is built upon a set of robust, user-centric features. The platform's ability to seamlessly integrate with multiple language models provides a level of versatility that is rare in the current market. This is complemented by a secure authentication system that ensures user data and chat histories are meticulously synchronized across devices. The entire experience is delivered through a polished, browser-friendly interface, designed for immediate and intuitive use.</p>
          </section>

          <section className="my-12 animate-fade-in-delay-1.5">
            <Image
              src="/t3-chat-interface.jpg"
              alt="A screenshot of the T3 Chat application interface."
              width={1200}
              height={750}
              className="rounded-lg shadow-2xl mx-auto"
            />
          </section>

          <section className="mb-12 animate-fade-in-delay-2">
            <h3 className="text-2xl font-display font-bold mb-4">Extended Functionality</h3>
            <p className="text-gray-400 mb-6">Beyond its core offerings, T3 Chat introduces a suite of advanced features that push the boundaries of what is expected from an AI assistant. Users can upload and analyze files, generate images through AI, and enjoy a superior coding experience with integrated syntax highlighting. The platform also addresses common frustrations with features like resumable conversations, chat branching for exploring different lines of inquiry, and the ability to share discussions with collaborators. For power users, the inclusion of real-time web search and the option to use personal API keys provide an unparalleled degree of control and flexibility.</p>
          </section>

          <footer className="animate-fade-in-delay-3">
            <h3 className="text-2xl font-display font-bold mb-4">Further Inquiry</h3>
            <p className="text-gray-400">For a more detailed exploration of the platform, interested parties are directed to the official T3 Chat website at <a href="https://t3.chat" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">t3.chat</a>. Additional information, including details on the ongoing Cloneathon development competition, can be found at <a href="https://cloneathon.t3.chat" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">cloneathon.t3.chat</a>.</p>
          </footer>
        </article>
      </main>
    </div>
  );
}
