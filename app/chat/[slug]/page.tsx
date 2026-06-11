"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { comp_chatbot_info } from "@/api/auth";

interface Chat {
  success: boolean;
  chatbotName: string;
  welcomeMessage: string;
  slug: string;
}

interface Message {
  id: string;
  role: string;
  content: string;
  isStreaming?: boolean;
  sources?: {
    filename: string;
    pageNumber: number;
  }[];
}

export default function Chatbot({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [botInfo, setBotInfo] = useState<Chat | null>(null);
  const [notFound, setNotFound] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const capitalizeFirst = (str?: string) => {
    if (!str) return "";
    return str[0].toUpperCase() + str.slice(1);
  };
  const fetchDocs = async (slug: string) => {
    try {
      setIsLoading(true);
      const data = await comp_chatbot_info(slug);
      if (!data?.success) {
        setNotFound(data?.message || "Chatbot not found");
      } else {
        setBotInfo(data);
      }
    } catch (err: any) {
      console.log(err);
      setNotFound(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs(slug);
  }, [slug]);

  const sendMessage = (text: string)=>{
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMessage]);
  }

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(inputValue.trim())
    setInputValue("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-gutter text-center">
        <span className="material-symbols-outlined text-[48px] text-error mb-md">
          error
        </span>
        <h1 className="font-headline-md font-bold mb-sm">Not Found</h1>
        <p className="text-on-surface-variant font-body-md">{notFound}</p>
      </div>
    );
  }
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col items-center justify-center p-0 md:p-gutter">
      <div className="w-full h-screen md:h-217 max-w-180 bg-surface-container-lowest flex flex-col md:rounded-2xl md:shadow-[0_20px_25px_-5px_rgba(15,23,42,0.1)] border-0 md:border md:border-outline-variant overflow-hidden shrink-0">
        <header className="bg-primary-container text-on-primary flex items-center justify-between px-gutter py-md shrink-0">
          <div className="flex items-center gap-sm">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden shrink-0">
              <Image
                alt="Nike Logo"
                className="w-full h-full object-cover"
                data-alt="A clean, minimalist circular avatar showing a subtle, high-end abstract graphic. The graphic uses sleek curves and a monochrome palette, resembling a premium corporate identity mark. The lighting is studio-perfect, emphasizing the smooth texture of the logo against a pure white background. The overall aesthetic is modern, professional, and sophisticated."
                src="/google.jpg"
                width={32}
                height={32}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-headline-md text-headline-md font-semibold m-0 leading-none pb-xs">
                {capitalizeFirst(botInfo?.slug)} {botInfo?.chatbotName}
              </h1>
              <span className="font-label-sm text-label-sm text-on-primary-container flex items-center gap-xs">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                Online
              </span>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end">
            <span className="font-label-sm text-label-sm text-on-primary-container">
              Powered by
            </span>
            <span className="font-label-md text-label-md text-surface-container-highest font-bold flex items-center gap-xs">
              <Image
                className="object-cover h-full w-full"
                alt="Docly Logo"
                height={28}
                width={28}
                src="/logo.png"
              />
              Dockly
            </span>
          </div>
        </header>

        <main
          className="flex-1 overflow-y-auto chat-scroll p-gutter flex flex-col gap-md bg-surface-container-lowest"
          id="chat-container"
        >
          {messages.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center h-full text-center px-gutter py-xl opacity-100 transition-opacity duration-300"
              id="welcome-state"
            >
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-md shadow-sm border border-outline-variant">
                <span
                  className="material-symbols-outlined text-secondary text-[32px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  forum
                </span>
              </div>

              <h2 className="font-headline-md text-headline-md font-bold text-on-surface mb-sm">
                {botInfo?.welcomeMessage}👋
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-100 mb-lg">
                I'm {capitalizeFirst(slug)} AI assistant. Ask me anything about
                our privacy policy.
              </p>
              <div className="flex flex-wrap justify-center gap-sm mt-md">
                <button
                onClick={() => sendMessage("What's your privacy policy?")}
                 className="suggestion-chip px-md py-xs rounded-full border border-secondary text-secondary font-label-md text-label-md hover:bg-secondary hover:text-on-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 bg-surface-container-lowest">
                  What's your privacy policy?
                </button>
                <button 
                onClick={() => sendMessage("Any new changes?")} 
                className="suggestion-chip px-md py-xs rounded-full border border-secondary text-secondary font-label-md text-label-md hover:bg-secondary hover:text-on-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 bg-surface-container-lowest">
                  Any new changes?
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-md pb-lg" id="conversation">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col  max-w-[80%] rounded-xl p-md ${
                    msg.role === "user"
                      ? " bg-indigo-500 ml-auto text-white self-end rounded-br-sm"
                      : "bg-surface-container mr-auto text-on-surface self-start rounded-bl-sm  border border-outline-variant "
                  }`}
                >
                  {msg.role === "assistant" &&
                  msg.isStreaming &&
                  msg.content === "" ? (
                    <div className="flex gap-1 py-xs">
                      <span className="animate-bounce">●</span>
                      <span className="animate-bounce [animation-delay:0.2s]">
                        ●
                      </span>
                      <span className="animate-bounce [animation-delay:0.4s]">
                        ●
                      </span>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  )}

                  {!msg.isStreaming &&
                    msg.sources &&
                    msg.sources.length > 0 && (
                      <div className="text-xs text-on-surface-variant mt-sm pt-xs border-t border-outline-variant flex flex-wrap gap-xs">
                        {msg.sources.map((source, idx) => (
                          <span
                            key={idx}
                            className="bg-surface-container-highest px-xs py-0.5 rounded border border-outline-variant"
                          >
                            📄 {source.filename} (Pg. {source.pageNumber})
                          </span>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </main>

        <div className="bg-surface-container-lowest border-t border-outline-variant p-md shrink-0 flex flex-col gap-xs">
          <form
            onSubmit={handleSendMessage}
            className="relative flex items-center w-full bg-surface-container rounded-xl border border-outline-variant focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-0 focus-within:border-secondary transition-all duration-200 shadow-[0_4px_6px_-1px_rgba(15,23,42,0.05)]"
            id="chat-form"
          >
            <input
              autoComplete="off"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-transparent border-none py-sm pl-md pr-xl font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:ring-0 rounded-xl"
              id="chat-input"
              placeholder="Ask a question..."
              type="text"
            />
            <button
              aria-label="Send message"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-on-secondary hover:bg-secondary-container transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              type="submit"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                send
              </span>
            </button>
          </form>
          <div className="flex items-center justify-center pt-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-[14px]">
                shield
              </span>
              Answers are based on {slug} official documents only
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
