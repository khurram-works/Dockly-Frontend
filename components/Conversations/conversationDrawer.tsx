"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bot,
  User,
  Clock,
  MessageSquare,
  X,
  Loader2,
  FileText,
} from "lucide-react";
import { timeAgo } from "@/helper/timeAgo";
import { useSearchParams, useRouter } from "next/navigation";
import { conversationDetail } from "@/api/auth";
import { ConversationDetail, Message, Source } from "@/types/conversation";

export function ConversationDrawer() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedConversationId = searchParams.get("conversation");

  const [conversation, setConversation] = useState<ConversationDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const isResolved = conversation?.isResolved ?? false;

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("conversation");
    router.push(`/dashboard/conversations?${params.toString()}`);
  };

  useEffect(() => {
    if (!selectedConversationId) return;

    const getDetails = async () => {
      setLoading(true);
      try {
        const response = await conversationDetail(selectedConversationId);
        setConversation(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [selectedConversationId]);

  return (
    <Drawer
      open={selectedConversationId !== null}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
      direction="right"
    >
      <DrawerContent className="border-none outline-none [&]:border-0 flex flex-col">

  
        <DrawerHeader className="border-b px-5 py-4 flex flex-row items-center bg-white justify-between text-left shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <DrawerTitle className="text-sm font-medium text-on-surface">
                Conversation details
              </DrawerTitle>
              <Badge
                className={
                  isResolved
                    ? "bg-emerald-50 text-emerald-700 border-0 text-[10px] font-semibold tracking-wide rounded-full px-2"
                    : "bg-amber-50 text-amber-700 border-0 text-[10px] font-semibold tracking-wide rounded-full px-2"
                }
              >
                {isResolved ? "RESOLVED" : "OPEN"}
              </Badge>
            </div>
            <DrawerDescription className="text-[11px] text-on-surface-variant flex items-center gap-1.5">
              <span className="font-mono bg-surface-container-low px-1.5 py-0.5 rounded text-[10px]">
                ID: {conversation?.id?.slice(-6).toUpperCase() ?? "——"}
              </span>
              ·
              <Clock className="w-3 h-3" />
              {conversation ? timeAgo(conversation.createdAt) : "——"}
            </DrawerDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full border border-surface-container-high"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DrawerHeader>


        {loading && (
          <div className="flex-1 flex items-center justify-center bg-surface">
            <Loader2 className="w-5 h-5 animate-spin text-secondary" />
          </div>
        )}


        {!loading && conversation && (
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 bg-surface">
            {conversation.messages.map((msg: Message) => {
              const isUser = msg.role === "USER";
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
                >
  
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 mb-5">
                      <Bot className="w-3.5 h-3.5 text-secondary" />
                    </div>
                  )}

                  <div className={`flex flex-col max-w-[78%] ${isUser ? "items-end" : "items-start"}`}>


                    <div
                      className={
                        isUser
                          ? "bg-secondary text-on-secondary text-[13px] leading-relaxed px-3 py-2.5 rounded-tl-2xl rounded-tr-sm rounded-br-2xl rounded-bl-2xl"
                          : "bg-white border border-surface-container-high text-on-background text-[13px] leading-relaxed px-3 py-2.5 rounded-tl-sm rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"
                      }
                    >
                      {msg.content}
                    </div>


                    <p className={`text-[10px] text-on-surface-variant mt-1 ${isUser ? "mr-1" : "ml-1"}`}>
                      {isUser ? "Customer" : "AI"} · {timeAgo(msg.createdAt)}
                    </p>


                    {!isUser && msg.sources?.length > 0 && (
                      <div className="mt-2 flex flex-col gap-1.5 w-full">
                        {msg.sources.map((source: Source, si: number) => {
                          const isPdf = source.filename.endsWith(".pdf");
                          const pages = source.pages
                            .sort((a, b) => a - b)
                            .join(", ");
                          return (
                            <div
                              key={si}
                              className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${
                                isPdf
                                  ? "bg-rose-50 border-rose-100"
                                  : "bg-emerald-50 border-emerald-100"
                              }`}
                            >
                              <FileText
                                className={`w-3.5 h-3.5 shrink-0 ${
                                  isPdf ? "text-rose-500" : "text-emerald-600"
                                }`}
                              />
                              <div className="min-w-0">
                                <p className="text-[11px] font-medium text-on-background truncate">
                                  {source.filename}
                                </p>
                                <p className="text-[10px] text-on-surface-variant">
                                  {source.pages.length > 1
                                    ? `Pages ${pages}`
                                    : `Page ${pages}`}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>


                  {isUser && (
                    <div className="w-7 h-7 rounded-full bg-surface-container-low border border-surface-container-high flex items-center justify-center shrink-0 mb-5">
                      <User className="w-3.5 h-3.5 text-secondary" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {!loading && !conversation && selectedConversationId && (
          <div className="flex-1 flex items-center justify-center bg-surface">
            <p className="text-sm text-on-surface-variant">
              Conversation not found.
            </p>
          </div>
        )}


        <DrawerFooter className="border-t px-4 py-3 bg-white shrink-0">
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              className="border-surface-container-high text-xs"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              size="sm"
              className="bg-secondary hover:bg-secondary-container text-on-secondary text-xs gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Takeover chat
            </Button>
          </div>
        </DrawerFooter>

      </DrawerContent>
    </Drawer>
  );
}