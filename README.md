# ⚡ Dockly Frontend

[![Vercel Deployment](https://img.shields.io/badge/deployed_on-vercel-black.svg?style=flat-square&logo=vercel)](https://dockly-frontend.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-blueviolet.svg?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

Dockly is a secure, multi-tenant, AI-powered customer support platform that enables companies to automate customer service using Retrieval-Augmented Generation (RAG). 

This repository contains the **Next.js frontend application**, designed to be visually stunning, highly interactive, and completely responsive.

🌐 **Live Demo:** [https://dockly-frontend.vercel.app/](https://dockly-frontend.vercel.app/)

---

## ✨ Features

- **🚀 Interactive Landing Page**: A fully responsive landing page with sections for features, pricing, and onboarding flows.
- **🔐 Multi-Tenant Authentication**: Secure registration and login workflows for companies, ensuring data isolation.
- **📊 Admin Dashboard**: A comprehensive hub for managing your support assistant's settings, custom chatbot names, and overall operations.
- **📄 RAG Document Management**: Drag-and-drop document upload (PDFs, FAQs, policies) with instant processing feedback, enabling the AI to learn from your data.
- **💬 Streamed Chat Interface**: Public, company-specific chat pages (`/chat/[slug]`) featuring real-time streamed responses directly from the backend.
- **📈 Rich Analytics**: Dynamic data visualization using Recharts to monitor active sessions, popular queries, and user conversation trends.
- **⚙️ Profile & Security Settings**: Manage chatbot names, URL slug handles, and secure password updates.

---

## 🛠️ Tech Stack

- **Core Framework**: [Next.js 16 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Lucide React](https://lucide.dev/) for icons
- **State & Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod Validation](https://zod.dev/)
- **UI Components**: Built on [Radix UI](https://www.radix-ui.com/) and styled with [Shadcn UI](https://ui.shadcn.com/)
- **Data Visualization**: [Recharts](https://recharts.org/) for beautiful analytics dashboards
- **Toast Notifications**: [Sonner](https://errka.github.io/sonner/)

---

## 📂 Project Structure

```text
frontend/
├── api/                  # API clients for communication with backend services
│   ├── auth.ts           # Authentication, profile updates, and settings APIs
│   └── client.ts         # Base fetch clients with automatic session refresh (401 handler)
├── app/                  # Next.js App Router folders (pages & layouts)
│   ├── card/             # UI card helper views
│   ├── chat/             # Public chatbot routes (chat/[slug])
│   ├── dashboard/        # Admin portal (analytics, documents, conversation lists)
│   ├── login/            # Agent/Company login page
│   ├── register/         # Company registration page
│   ├── globals.css       # Global design theme & Tailwind imports
│   ├── layout.tsx        # Base root layout
│   └── page.tsx          # Landing page
├── components/           # Reusable UI elements
│   ├── analyticsDashboard/ # Specialized chart components (Recharts)
│   ├── Conversations/    # User chat review components
│   ├── Documents/        # Document upload and parsing interfaces
│   ├── landingPage/      # Sections of the public home page
│   ├── ui/               # Base design system components (buttons, dialogs, sheets, inputs)
│   └── AuthGuard.tsx     # Route shield protecting dashboard views
├── context/              # React Context Providers (e.g., AuthContext)
├── helper/               # Shared helpers and parser logic
├── lib/                  # Utilities (Tailwind merge, cookie helpers)
├── public/               # Static assets (favicons, images, logos)
└── types/                # TypeScript interfaces and type definitions
```

---

## ⚙️ Configuration & Environment Variables

To run the frontend app locally, you need to set up your environment variables. Create a `.env` file in the root of the `frontend` folder:

```env
# URL of your Dockly Backend API
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

---

## 🚀 Getting Started

Follow these steps to run the development server locally:

### 1. Install Dependencies
Make sure you have Node.js installed, then run:
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### 3. Build for Production
To build the application for optimal production deployment:
```bash
npm run build
```

### 4. Start Production Server
```bash
npm run start
```

---

## 🌐 Deployment on Vercel

The application is configured to deploy seamlessly on [Vercel](https://vercel.com). To deploy your own instance:

1. Import this frontend folder to your Vercel workspace.
2. In the Vercel Project Settings, add the environment variable `NEXT_PUBLIC_API_URL` pointing to your deployed backend.
3. Deploy! Vercel handles Next.js caching, optimization, and edge routing automatically.

Live deployment is active at: **[https://dockly-frontend.vercel.app/](https://dockly-frontend.vercel.app/)**
