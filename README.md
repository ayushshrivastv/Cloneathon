# T3 Chat: A New Era in AI Assistance

![T3 Chat](public/t3-chat-interface.jpg)

Welcome to T3 Chat, a revolutionary AI assistant built with the T3 Stack. This project is designed to provide a seamless, intuitive, and type-safe conversational AI experience.

## Project Overview

T3 Chat leverages the best of modern web development to create a powerful and responsive chat application. With a focus on developer experience and performance, it combines a full-stack framework with end-to-end type safety, ensuring that you can build and scale with confidence.

## Architecture

The T3 Chat application follows a modern, full-stack architecture. Here's a high-level overview:

```
   +---------------------------------------+
   |               User (Browser)          |
   +---------------------------------------+
                   |
                   | HTTP/S Request
                   v
   +---------------------------------------+
   |           Next.js (React Server Components) |
   |           [Frontend & Backend]        |
   +---------------------------------------+
        |         ^        |         ^
        | tRPC    |        | API     |
        v         |        v         |
   +----------------+  +----------------+
   |   tRPC Router  |  | Next.js API Routes |
   +----------------+  +----------------+
        |                    |
        | (Server-Side)      | (Server-Side)
        v                    v
   +---------------------------------------+
   |           External Services           |
   | (e.g., OpenAI, Firebase, etc.)        |
   +---------------------------------------+
```

## ✨ Features

*   **Real-time Conversation:** Engage in natural, real-time conversations with an AI.
*   **Type-Safe API:** End-to-end type safety with tRPC, from your database to your UI.
*   **Server-Side Rendering (SSR):** Fast initial page loads and improved SEO with Next.js.
*   **Modern UI:** A beautiful and responsive user interface built with Tailwind CSS.
*   **Authentication:** Secure user authentication with Firebase.
*   **Component-Based Architecture:** A clean and organized codebase with React components.

## 📂 Project Structure

Here is a detailed breakdown of the project's file structure:

```
/src
├── app/
│   ├── ClientBody.tsx
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
│   ├── chat/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── documentation/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── news/
│   │   └── page.tsx
│   └── page.tsx
├── components/
│   ├── CTA.tsx
│   ├── ChatInput.tsx
│   ├── ChatSidebar.tsx
│   ├── CleverlyLogo.tsx
│   ├── ContentFeed.tsx
│   ├── FAQ.tsx
│   ├── FloatingChatContainer.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── HomeSidebar.tsx
│   ├── Impact.tsx
│   ├── LeftSidebar.tsx
│   ├── ModelSelector.tsx
│   ├── OpenAPILogo.tsx
│   ├── Products.tsx
│   ├── Research.tsx
│   ├── SignInModal.tsx
│   └── ui/
│       ├── accordion.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── hover-card.tsx
│       ├── input.tsx
│       ├── navigation-menu.tsx
│       ├── sheet.tsx
│       └── tabs.tsx
├── context/
│   └── AuthContext.tsx
└── lib/
    ├── firebase.ts
    └── utils.ts
```

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **API:** [tRPC](https://trpc.io/)
*   **Authentication:** [Firebase](https://firebase.google.com/)

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key
```

## 📦 Getting Started

### Prerequisites

*   Node.js (v18.x or later)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/ayushshrivastv/Cloneathon.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd Cloneathon
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Set up your environment variables in a `.env.local` file.

5.  Run the development server:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Deployment

This application is ready to be deployed on [Vercel](https://vercel.com/), the creators of Next.js. For more information, see the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See `LICENSE` for more information.
