"use client";
import { analytics } from "@/api/auth";
import { useState, useEffect } from "react";
import { AnalyticsData, AnalyticsResponse } from "@/types/analytics";
import { RecentActivityFeed } from "@/components/analyticsDashboard/analyticsActivityFeed";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  YAxis,
  XAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "Conversations",
    color: "#4F46E5",
  },
} satisfies ChartConfig;

const lineChartConfig = {
  count: {
    label: "Questions",
    color: "#4F46E5",
  },
} satisfies ChartConfig;



export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [Analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  const chartData =
    Analytics?.dayOfWeekDistribution?.map((item) => ({
      day: item.day,
      count: Number(item.count),
    })) ?? [];

  const lineChartData = Analytics?.timeline?.map((item) => ({
    day: item.date,
    count: Number(item.count),
  }));

  const totalDays = lineChartData?.length ?? 0;
  const xTicks = [0, 4, 9, 14, 19, 24, 29]
    .filter((i) => i < totalDays)
    .map((i) => lineChartData![i].day);

  const maxCount = Analytics?.popularQuestions?.[0]?._count?.content ?? 1;

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response: AnalyticsResponse = await analytics();
        setAnalytics(response.data);
        console.log(response);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);
  if (loading) {
    return (
      <main className="flex-1 p-gutter flex items-center justify-center">
        <p className="text-on-surface-variant">Loading Analytics...</p>
      </main>
    );
  }
  return (
    <main className="flex-1 flex flex-col h-full relative overflow-y-auto w-full bg-slate-50">
      <div className="p-8 max-w-container-max mx-auto w-full space-y-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-low">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-slate-500">
                Questions Today
              </p>
              <div className="size-10 rounded-full bg-indigo-50 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-indigo-600"
                  data-icon="chat_bubble"
                >
                  chat_bubble
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <h3 className="text-3xl font-bold text-navy-900 tracking-tight">
                {Analytics?.questionsToday}
              </h3>
              <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <span
                  className="material-symbols-outlined text-sm"
                  data-icon="trending_up"
                >
                  trending_up
                </span>
                <span>+12%</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">vs yesterday</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-low">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-slate-500">
                Questions This Month
              </p>
              <div className="size-10 rounded-full bg-indigo-50 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-indigo-600"
                  data-icon="forum"
                >
                  forum
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <h3 className="text-3xl font-bold text-navy-900 tracking-tight">
                {Analytics?.questionsThisMonth}
              </h3>
              <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <span
                  className="material-symbols-outlined text-sm"
                  data-icon="trending_up"
                >
                  trending_up
                </span>
                <span>+23%</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">vs last month</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-low">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-slate-500">
                Avg Response Time
              </p>
              <div className="size-10 rounded-full bg-indigo-50 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-indigo-600"
                  data-icon="timer"
                >
                  timer
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <h3 className="text-3xl font-bold text-navy-900 tracking-tight">
                {Analytics?.avgResponseTime}
              </h3>
              <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <span>
                  {Analytics?.avgResponseTime == null
                    ? "No data"
                    : Analytics.avgResponseTime < 2
                      ? "Excellent"
                      : Analytics.avgResponseTime < 5
                        ? "Good"
                        : "Needs Improvement"}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">Target: &lt; 2.0s</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-low">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-slate-500">
                Total Documents
              </p>
              <div className="size-10 rounded-full bg-indigo-50 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-indigo-600"
                  data-icon="description"
                >
                  description
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <h3 className="text-3xl font-bold text-navy-900 tracking-tight">
                {Analytics?.totalDocs}
              </h3>
            </div>
            <p className="text-sm font-medium text-indigo-600 mt-2">
              {Analytics?.totalDocs} active
            </p>
          </div>
        </div>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-low overflow-hidden">
          <CardHeader className="p-6 border-b border-slate-100">
            <div>
              <CardTitle className="text-lg font-bold text-navy-900">
                Questions Over Time
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
                Volume of interactions over the last 30 days
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 ">
            <ChartContainer config={lineChartConfig} className="h-64 w-full">
              <AreaChart
                data={lineChartData}
                margin={{ left: 30, right: 30, top: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  ticks={xTicks}
                  tickFormatter={(_, index) => {
                    const dayNumbers = [1, 5, 10, 15, 20, 25, 30];
                    return `Day ${dayNumbers[index]}`;
                  }}
                />
                <YAxis domain={[0, "auto"]} hide />
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const { day, count } = payload[0].payload;
                    return (
                      <div className="bg-white border border-slate-200 rounded-lg shadow-md px-3 py-2 text-sm">
                        <p className="font-semibold text-navy-900">{day}</p>
                        <p className="text-indigo-600 font-medium">
                          {count} question{count !== 1 ? "s" : ""}
                        </p>
                      </div>
                    );
                  }}
                />
                <Area
                  dataKey="count"
                  type="monotone"
                  stroke="#4F46E5"
                  strokeWidth={2.5}
                  fill="url(#colorCount)"
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    if (payload.count === 0) return <g key={`dot-${cx}`} />;
                    return (
                      <circle
                        key={`dot-${cx}`}
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill="#4F46E5"
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    );
                  }}
                  activeDot={{ r: 6, fill: "#4F46E5" }}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-low p-6">
            <h3 className="text-lg font-bold text-navy-900 mb-6">
              Popular Questions
            </h3>
            <div className="space-y-5">
              {Analytics?.popularQuestions?.length ? (
                Analytics.popularQuestions.map((q, i) => {
                  const count = q._count.content;
                  const widthPercent = Math.round((count / maxCount) * 100);
                  return (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-navy-900 truncate pr-4">
                          {q.content}
                        </span>
                        <span className="text-slate-500 shrink-0">{count}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-indigo-500 h-2 rounded-full transition-all"
                          style={{ width: `${widthPercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-slate-400">No questions yet.</p>
              )}
            </div>
          </div>

          <Card className="bg-white rounded-xl border border-slate-200 shadow-low p-6 flex flex-col">
            <CardHeader className="text-lg font-bold text-navy-900 mb-6">
              <CardTitle>Conversations by Day</CardTitle>
            </CardHeader>
            <CardContent className="pb-0">
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

        {Analytics?.activityFeed.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-low p-6">
            <div className="text-center py-8 text-on-surface-variant">
              <span className="material-symbols-outlined text-[32px] mb-2">
                history
              </span>
              <p>No activity yet</p>
            </div>
          </div>
        ) : (
          // <div className="bg-white rounded-xl border border-slate-200 shadow-low p-6">
          //   <h3 className="text-lg font-bold text-navy-900 mb-6">
          //     Recent Activity Feed
          //   </h3>
          //   <div className="relative pl-6 border-l-2 border-slate-100 space-y-8">
          //     {Analytics?.activityFeed.map(event, index)=>(

          //     )

          //     }
          //   </div>
          // </div>
          <RecentActivityFeed activityFeed={Analytics?.activityFeed ?? []} />
        )}
        {/* <h3 className="text-lg font-bold text-navy-900 mb-6">
            Recent Activity Feed
          </h3>
          <div className="relative pl-6 border-l-2 border-slate-100 space-y-8">
            <div className="relative">
              <div className="absolute -left-7.75 top-1 bg-white p-1 rounded-full">
                <div className="size-3 bg-indigo-500 rounded-full ring-4 ring-indigo-50"></div>
              </div>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="text-sm font-medium text-navy-900">
                    New Document Uploaded
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    "Q3 API Documentation v2.pdf" was indexed successfully.
                  </p>
                </div>
                <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
                  2h ago
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-7.75 top-1 bg-white p-1 rounded-full">
                <div className="size-3 bg-slate-300 rounded-full ring-4 ring-slate-50"></div>
              </div>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="text-sm font-medium text-navy-900">
                    Customer Question Answered
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    AI successfully answered: "How do I reset my password?"
                  </p>
                </div>
                <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
                  3h ago
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-7.75 top-1 bg-white p-1 rounded-full">
                <div className="size-3 bg-slate-300 rounded-full ring-4 ring-slate-50"></div>
              </div>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="text-sm font-medium text-navy-900">
                    Customer Question Answered
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    AI successfully answered: "What are the pricing tiers?"
                  </p>
                </div>
                <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
                  5h ago
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-7.75 top-1 bg-white p-1 rounded-full">
                <div className="size-3 bg-slate-300 rounded-full ring-4 ring-slate-50"></div>
              </div>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="text-sm font-medium text-navy-900">
                    Document Updated
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    "Getting Started Guide" content was refreshed.
                  </p>
                </div>
                <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
                  6h ago
                </span>
              </div>
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </main>
  );
}
