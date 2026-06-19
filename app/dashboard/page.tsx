"use client";

import { useEffect, useState } from "react";
import { dashboardData } from "@/api/auth";
import { useRouter } from "next/navigation";
import { clearSessionMarker } from "@/lib/sessionCookie";
import Link from "next/link";
import { DashData } from "@/types/dashData";
import { Bar, BarChart, LabelList, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";


const chartConfig = {
  count: {
    label: "Questions",
    color: "#4F46E5",
  },
} satisfies ChartConfig;

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
    questionsByDay: [],
  });

  useEffect(() => {
    let cancelled = false;

    const fetchDashboardData = async () => {
      try {
        const response: DashData = await dashboardData();

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

  if (loading) {
    return (
      <main className="flex-1 p-gutter flex items-center justify-center">
        <p className="text-on-surface-variant">Loading dashboard...</p>
      </main>
    );
  }

  const chartData =
    dashData?.questionsByDay?.map((item) => ({
      day: item.day,
      count: Number(item.count),
    })) ?? [];

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
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-md items-stretch">
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex flex-col h-full">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Recent Conversations
              </h3>

              <Link
                href="/dashboard/conversations"
                className="text-secondary font-label-md text-label-md hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="overflow-x-auto flex-1 flex flex-col">
              <table className="w-full h-full text-left border-collapse min-w-150">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container-low">
                    <th className="px-4 py-3 font-medium uppercase tracking-wider text-xs text-on-surface-variant">
                      Customer Question
                    </th>
                    <th className="px-4 py-3 font-medium uppercase tracking-wider text-xs text-on-surface-variant">
                      Time
                    </th>
                    <th className="px-4 py-3 font-medium uppercase tracking-wider text-xs text-on-surface-variant text-right">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-outline-variant">
                  {dashData?.RecentConversations?.slice(0, 4).map((conv) => (
                    <tr
                      key={conv.id}
                      className="hover:bg-surface-container-low transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-on-surface">
                        <div
                          className="max-w-62.5 truncate"
                          title={conv.messages?.[0]?.content}
                        >
                          {conv.messages?.[0]?.content ?? "No message"}
                        </div>
                      </td>

                      <td className="px-4 py-3 text-sm text-on-surface-variant">
                        {conv.messages?.[0]?.createdAt
                          ? new Date(
                              conv.messages[0].createdAt,
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "—"}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex justify-end">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border tracking-wide uppercase ${
                              conv.isResolved
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            {conv.isResolved ? "Answered" : "Escalated"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-4 flex flex-col h-full relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-40 h-40 bg-linear-to-br from-secondary/10 to-transparent rounded-full blur-2xl"></div>

            <h3 className="font-headline-md text-headline-md text-on-surface mb-4 relative z-10">
              Quick Actions
            </h3>

            <div className="space-y-3 flex-1 flex flex-col relative z-10">
              <Link
                href={`/dashboard/documents`}
                className="w-full py-3 px-4 bg-secondary bg-linear-to-r from-secondary to-[#585af2] text-on-secondary font-label-md text-label-md rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
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
                href={dashData?.chatBotUrl || "#"}
                className="w-full py-3 px-4 bg-transparent border border-outline-variant text-on-surface-variant font-label-md text-label-md rounded-lg hover:bg-surface-container-low hover:text-on-surface transition-colors flex items-center justify-center gap-2 mt-auto"
              >
                <span className="material-symbols-outlined text-[20px]">
                  insert_link
                </span>
                {dashData?.chatBotUrl || "No Link Available"}
              </Link>

              <Link
                href={`/dashboard/analytics`}
                className="w-full py-3 px-4 bg-transparent border border-outline-variant border-dashed text-on-surface-variant font-label-md text-label-md rounded-lg hover:bg-surface-container-low hover:text-on-surface transition-colors flex items-center justify-center gap-2 mt-auto"
              >
                <span className="material-symbols-outlined text-[20px]">
                  insights
                </span>
                View Detailed Analytics
              </Link>
            </div>
          </div>
        </div>

        <Card className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-md">
          <CardHeader className="flex justify-between items-center mb-lg border-b border-outline-variant pb-sm">
            <CardTitle className="font-headline-md text-headline-md text-on-surface">
              Questions This Week
            </CardTitle>
            <div className="flex gap-2">
              <span className="inline-block w-3 h-3 rounded-sm bg-secondary mt-1"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Total Volume
              </span>
            </div>
          </CardHeader>

          <CardContent
            className="h-64
          //  flex items-end justify-between gap-2 sm:gap-4 mt-8 relative
           "
          >
            <ChartContainer config={chartConfig} className="h-48 w-full">
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{ top: 20 }}
              >
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="count" fill="var(--color-count)" radius={8}>
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
