"use client";

import { useEffect, useState } from "react";
import { dashboardData } from "@/api/auth";
import { useRouter } from "next/navigation";
import { clearSessionMarker } from "@/lib/sessionCookie";
import Link from "next/link";
import { DashData } from "@/types/dashData";

const BASE_URL = "http://localhost:3000";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dashData, setDashData] = useState<DashData>({
    success: false,
    message: "",
    TotalDocs: 0,
    TotalConversations: 0,
    QuestionsAsked: 0,
    RecentConversations: [],
    chatBotName: "",
    chatBotUrl: "",
  });

  useEffect(() => {
    let cancelled = false;

    const fetchDashboardData = async () => {
      try {
        const response: DashData = await dashboardData();
        console.log(response);

        if (!cancelled && response.success) {
          setDashData(response);
        }
      } catch (error) {
        if (!cancelled) {
          clearSessionMarker();
          router.replace("/login");
          return;
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      cancelled = true;
    };
  }, [router]);

  // useEffect(() => {
  //   console.log("dashData updated successfully:", dashData);
  // }, [dashData]);

  if (loading) {
    return (
      <main className="flex-1 p-gutter flex items-center justify-center">
        <p className="text-on-surface-variant">Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main className="flex-1 p-gutter overflow-y-auto">
      <div className="max-w-container-max mx-auto space-y-xl">
        <div className="md:hidden mb-lg">
          <h2 className="font-headline-xl-mobile text-headline-xl-mobile font-bold text-primary">
            Dashboard
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Total Documents
              </h3>
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">
                  description
                </span>
              </div>
            </div>
            <p className="font-headline-xl text-headline-xl text-on-surface">
              {dashData?.TotalDocs}
            </p>
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Questions Asked
              </h3>
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">
                  forum
                </span>
              </div>
            </div>
            <p className="font-headline-xl text-headline-xl text-on-surface">
              {dashData?.QuestionsAsked}
            </p>
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Total Conversations
              </h3>
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">
                  chat
                </span>
              </div>
            </div>
            <p className="font-headline-xl text-headline-xl text-on-surface">
              {dashData?.TotalConversations}
            </p>
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-secondary/30 p-md shadow-sm relative overflow-hidden ring-1 ring-secondary/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full -mr-8 -mt-8"></div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Active Chatbot
              </h3>
              <div className="px-2 py-1 bg-secondary/10 text-secondary rounded font-label-sm text-label-sm border border-secondary/20 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                Live
              </div>
            </div>
            <p className="font-headline-md text-headline-md text-on-surface mt-2 font-medium">
              Customer {dashData?.chatBotName}
            </p>
            {/* <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
              Version 2.4.1
            </p> */}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-md">
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex flex-col h-full">
            <div className="p-md border-b border-outline-variant flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Recent Conversations
              </h3>
              <button className="text-secondary font-label-md text-label-md hover:underline">
                View All
              </button>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse min-w-125">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container-low/50">
                    <th className="p-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">
                      Customer Question
                    </th>
                    <th className="p-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">
                      Time
                    </th>
                    <th className="p-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium text-right">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="font-body-md text-body-md text-on-surface divide-y divide-outline-variant/50">
                  {dashData.RecentConversations.map((conv) => (
                    <tr
                      key={conv.id}
                      className="hover:bg-surface-container-low/30 transition-colors"
                    >
                      <td className="p-sm">
                        {conv.messages?.[0]?.content ?? "No message"}
                      </td>
                      <td className="p-sm text-on-surface-variant font-label-md text-label-md">
                        {conv.messages?.[0]?.createdAt
                          ? new Date(
                              conv.messages[0].createdAt,
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "—"}
                      </td>
                      <td className="p-sm text-right">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-semibold border ${
                            conv.isResolved
                              ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                              : "bg-amber-100 text-amber-800 border-amber-200"
                          }`}
                        >
                          {conv.isResolved ? "Answered" : "Escalated"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-md flex flex-col h-full relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-40 h-40 bg-linear-to-br from-secondary/10 to-transparent rounded-full blur-2xl"></div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-md relative z-10">
              Quick Actions
            </h3>
            <div className="space-y-sm flex-1 flex flex-col relative z-10">
              <Link
               href={`${BASE_URL}/dashboard/documents`}
               className="w-full py-3 px-4 bg-secondary bg-linear-to-r from-secondary to-[#585af2] text-on-secondary font-label-md text-label-md rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group">
                <span className="material-symbols-outlined text-[20px] group-hover:-translate-y-1 transition-transform">
                  upload_file
                </span>
                Upload Document
              </Link>
              <button className="w-full py-3 px-4 bg-surface-container-low border border-outline-variant text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-variant transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                  content_copy
                </span>
                Copy Chatbot Link
              </button>
              <Link
                href={dashData?.chatBotUrl}
                className="w-full py-3 px-4 bg-transparent border border-outline-variant text-on-surface-variant font-label-md text-label-md rounded-lg hover:bg-surface-container-low hover:text-on-surface transition-colors flex items-center justify-center gap-2 mt-auto"
              >
                <span className="material-symbols-outlined text-[20px]">
                  insert_link
                </span>
                {dashData?.chatBotUrl}
              </Link>
              <Link
              href={`${BASE_URL}/dashboard/analytics`}
               className="w-full py-3 px-4 bg-transparent border border-outline-variant border-dashed text-on-surface-variant font-label-md text-label-md rounded-lg hover:bg-surface-container-low hover:text-on-surface transition-colors flex items-center justify-center gap-2 mt-auto">
                <span className="material-symbols-outlined text-[20px]">
                  insights
                </span>
                View Detailed Analytics
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-md">
          <div className="flex justify-between items-center mb-lg border-b border-outline-variant pb-sm">
            <h3 className="font-headline-md text-headline-md text-on-surface">
              Questions This Week
            </h3>
            <div className="flex gap-2">
              <span className="inline-block w-3 h-3 rounded-sm bg-secondary mt-1"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Total Volume
              </span>
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 mt-8 relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-[10px] text-on-surface-variant opacity-50 -ml-2">
              <span>400</span>
              <span>300</span>
              <span>200</span>
              <span>100</span>
              <span>0</span>
            </div>

            <div className="absolute left-8 right-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none z-0">
              <div className="border-t border-outline-variant/30 w-full"></div>
              <div className="border-t border-outline-variant/30 w-full"></div>
              <div className="border-t border-outline-variant/30 w-full"></div>
              <div className="border-t border-outline-variant/30 w-full"></div>
              <div className="border-t border-outline-variant/50 w-full"></div>
            </div>
            <div className="w-full flex justify-around items-end h-[calc(100%-24px)] pl-8 z-10">
              <div className="flex flex-col items-center w-full group">
                <div className="w-3/4 max-w-10 bg-secondary/80 hover:bg-secondary rounded-t-md h-[40%] transition-all relative">
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface px-2 py-1 rounded text-xs whitespace-nowrap transition-opacity">
                    142
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-2">
                  Mon
                </span>
              </div>

              <div className="flex flex-col items-center w-full group">
                <div className="w-3/4 max-w-10 bg-secondary/80 hover:bg-secondary rounded-t-md h-[65%] transition-all relative">
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface px-2 py-1 rounded text-xs whitespace-nowrap transition-opacity">
                    234
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-2">
                  Tue
                </span>
              </div>

              <div className="flex flex-col items-center w-full group">
                <div className="w-3/4 max-w-10 bg-secondary/80 hover:bg-secondary rounded-t-md h-[85%] transition-all relative">
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface px-2 py-1 rounded text-xs whitespace-nowrap transition-opacity">
                    312
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-2">
                  Wed
                </span>
              </div>

              <div className="flex flex-col items-center w-full group">
                <div className="w-3/4 max-w-10 bg-secondary/80 hover:bg-secondary rounded-t-md h-[50%] transition-all relative">
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface px-2 py-1 rounded text-xs whitespace-nowrap transition-opacity">
                    189
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-2">
                  Thu
                </span>
              </div>

              <div className="flex flex-col items-center w-full group">
                <div className="w-3/4 max-w-10 bg-secondary/80 hover:bg-secondary rounded-t-md h-[95%] transition-all relative">
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface px-2 py-1 rounded text-xs whitespace-nowrap transition-opacity">
                    389
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-2">
                  Fri
                </span>
              </div>

              <div className="flex flex-col items-center w-full group">
                <div className="w-3/4 max-w-10 bg-secondary/40 hover:bg-secondary/60 rounded-t-md h-[30%] transition-all relative">
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface px-2 py-1 rounded text-xs whitespace-nowrap transition-opacity">
                    95
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-2">
                  Sat
                </span>
              </div>

              <div className="flex flex-col items-center w-full group">
                <div className="w-3/4 max-w-10 bg-secondary/40 hover:bg-secondary/60 rounded-t-md h-[20%] transition-all relative">
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface px-2 py-1 rounded text-xs whitespace-nowrap transition-opacity">
                    64
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-2">
                  Sun
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
