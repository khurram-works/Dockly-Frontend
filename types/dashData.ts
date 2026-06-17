export interface DashData {
  success: boolean;
  message: string;
  TotalDocs: number;
  TotalConversations: number;
  QuestionsAsked: number;
  RecentConversations: RecentConversations[],
  chatBotName: string,
  chatBotUrl: string,
  questionsByDay: QuestionsByDay[]
}

interface RecentConversations {
  companyId: string;
  createdAt: string;
  id: string;
  isResolved: boolean;
  messages: Message[];
  sessionId: string;
  updatedAt: string;
}

interface Message {
  content: string;
  createdAt: string;
  documentId: string | null;
  id: string;
}

export interface QuestionsByDay {
  day: string;
  count: number;
}