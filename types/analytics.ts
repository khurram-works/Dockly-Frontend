interface DocumentActivity {
  type: 'document';
  icon: string;
  text: string;
  createdAt: string;
}

interface ConversationActivity {
  type: 'conversation';
  icon: string;
  text: string;
  createdAt: string;
}

export type ActivityFeedItem = DocumentActivity | ConversationActivity;




interface TimelineItem {
  date: string;
  count: number;
}

interface PopularQuestion {
  content: string;
  _count: {
    content: number;
  };
}

interface DayOfWeekDistribution {
  day: string;
  count: number;
}

export interface AnalyticsData {
  questionsToday: number;
  questionsThisMonth: number;
  allConversations: number;
  unansweredCount: number;
  totalDocs: number;
  avgResponseTime: number;

  timeline: TimelineItem[];

  popularQuestions: PopularQuestion[];

  dayOfWeekDistribution: DayOfWeekDistribution[];
  activityFeed: ActivityFeedItem[]
}

export interface AnalyticsResponse {
  success: boolean;
  data: AnalyticsData;
}