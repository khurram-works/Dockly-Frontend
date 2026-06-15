import React from "react";
import { ActivityFeedItem } from "@/types/analytics";
import { timeAgo } from "@/helper/timeAgo";


interface RecentActivityFeedProps {
  activityFeed: ActivityFeedItem[];
}


export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ activityFeed }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Recent Activity Feed</h3>

      <div className="relative mt-6">

        <div className="absolute left-1.25 top-2 bottom-2 w-0.5 bg-gray-200" />


        {activityFeed?.map((event, index) => { 
          const isLast = index === activityFeed.length - 1;
          
          const isDocument = event.type === 'document';
          const title = isDocument ? 'Document Synced' : 'New Customer Inquiry';
          const subtitle = `${event.icon} ${event.text}`;

          const dotColorClass = isDocument 
            ? 'bg-blue-500 border-white' 
            : 'bg-emerald-500 border-white';

          return (
            <div 
              key={event.createdAt + index} 
              className={`flex row gap-4 ${isLast ? 'pb-0' : 'pb-6'}`}
            >
   
              <div className="relative z-10 mt-1.5 shrink-0">
                <div className={`w-3 h-3 rounded-full border-2 ${dotColorClass}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {title}
                  </p>
                  <span className="text-xs text-gray-500 shrink-0 ml-4">
                    {timeAgo(event.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-0.5 wrap-break-words">
                  {subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};