export interface ConversationRow {
  id: string;
  number: number;
  question: string;
  answerPreview: string;
  status: "ANSWERED" | "UNANSWERED";
  createdAt: string; 
  updatedAt: string;
  isResolved: boolean;
}

interface Pagination {
  totalConversations: number;
  unansweredCount: number;
  answeredCount: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number
}

export interface ConversationsResponse {
  success: boolean;
  data: {
    conversations: ConversationRow[];
    pagination: Pagination;
  };
}

// types/conversation.ts

export interface Source {
  documentId: string
  filename: string
  pages: number[]       // grouped pages array
}

export interface Message {
  id: string
  role: "USER" | "ASSISTANT"
  content: string
  sources: Source[]
  createdAt: string
}

export interface ConversationDetail {
  id: string
  isResolved: boolean
  createdAt: string
  messages: Message[]
}