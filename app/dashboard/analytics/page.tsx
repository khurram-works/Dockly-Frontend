"use client";

export default function AnalyticsPage() {
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
                48
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
                1,284
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
                1.2s
              </h3>
              <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <span>Excellent</span>
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
                12
              </h3>
            </div>
            <p className="text-sm font-medium text-indigo-600 mt-2">
              10 active
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-low overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-navy-900">
                Questions Over Time
              </h3>
              <p className="text-sm text-slate-500">
                Volume of interactions over the last 30 days
              </p>
            </div>
          </div>
          <div className="p-6 h-80 relative flex items-end">
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 1000 250"
            >
              <defs>
                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="#4F46E5"
                    stopOpacity="0.2"
                  ></stop>
                  <stop
                    offset="100%"
                    stopColor="#4F46E5"
                    stopOpacity="0"
                  ></stop>
                </linearGradient>
              </defs>
              <line
                stroke="#F1F5F9"
                strokeWidth="1"
                x1="0"
                x2="1000"
                y1="50"
                y2="50"
              ></line>
              <line
                stroke="#F1F5F9"
                strokeWidth="1"
                x1="0"
                x2="1000"
                y1="100"
                y2="100"
              ></line>
              <line
                stroke="#F1F5F9"
                strokeWidth="1"
                x1="0"
                x2="1000"
                y1="150"
                y2="150"
              ></line>
              <line
                stroke="#F1F5F9"
                strokeWidth="1"
                x1="0"
                x2="1000"
                y1="200"
                y2="200"
              ></line>
              <path
                d="M0,200 L0,150 C100,140 200,180 300,120 C400,60 500,140 600,100 C700,60 800,90 900,40 C950,20 980,50 1000,30 L1000,250 L0,250 Z"
                fill="url(#gradient)"
              ></path>
              <path
                d="M0,150 C100,140 200,180 300,120 C400,60 500,140 600,100 C700,60 800,90 900,40 C950,20 980,50 1000,30"
                fill="none"
                stroke="#4F46E5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              ></path>
              <circle
                cx="300"
                cy="120"
                fill="#ffffff"
                r="4"
                stroke="#4F46E5"
                strokeWidth="2"
              ></circle>
              <circle
                cx="600"
                cy="100"
                fill="#ffffff"
                r="4"
                stroke="#4F46E5"
                strokeWidth="2"
              ></circle>
              <circle
                cx="900"
                cy="40"
                fill="#ffffff"
                r="4"
                stroke="#4F46E5"
                strokeWidth="2"
              ></circle>
            </svg>
            <div className="absolute bottom-2 w-full flex justify-between px-6 text-xs font-medium text-slate-400">
              <span>Day 1</span>
              <span>Day 5</span>
              <span>Day 10</span>
              <span>Day 15</span>
              <span>Day 20</span>
              <span>Day 25</span>
              <span>Day 30</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-low p-6">
            <h3 className="text-lg font-bold text-navy-900 mb-6">
              Popular Questions
            </h3>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-navy-900 truncate pr-4">
                    How to setup?
                  </span>
                  <span className="text-slate-500 shrink-0">234</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-navy-900 truncate pr-4">
                    What is the pricing?
                  </span>
                  <span className="text-slate-500 shrink-0">189</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full opacity-80"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-navy-900 truncate pr-4">
                    How to integrate?
                  </span>
                  <span className="text-slate-500 shrink-0">156</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full opacity-60"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-navy-900 truncate pr-4">
                    Where are docs?
                  </span>
                  <span className="text-slate-500 shrink-0">98</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full opacity-40"
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-navy-900 truncate pr-4">
                    Contact support
                  </span>
                  <span className="text-slate-500 shrink-0">67</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full opacity-30"
                    style={{ width: "25%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-low p-6 flex flex-col">
            <h3 className="text-lg font-bold text-navy-900 mb-6">
              Conversations by Day
            </h3>
            <div className="flex-1 flex items-end justify-between gap-2 h-48 mt-auto pt-8">
              <div className="flex flex-col items-center gap-2 flex-1 group">
                <div className="w-full bg-indigo-100 rounded-t-sm h-[40%] group-hover:bg-indigo-200 transition-colors relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-navy-900 text-white text-xs px-2 py-1 rounded transition-opacity">
                    120
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-500">Mon</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1 group">
                <div className="w-full bg-indigo-500 rounded-t-sm h-[85%] group-hover:bg-indigo-600 transition-colors relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-navy-900 text-white text-xs px-2 py-1 rounded transition-opacity">
                    256
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-800">Tue</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1 group">
                <div className="w-full bg-indigo-100 rounded-t-sm h-[60%] group-hover:bg-indigo-200 transition-colors relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-navy-900 text-white text-xs px-2 py-1 rounded transition-opacity">
                    180
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-500">Wed</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1 group">
                <div className="w-full bg-indigo-100 rounded-t-sm h-[75%] group-hover:bg-indigo-200 transition-colors relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-navy-900 text-white text-xs px-2 py-1 rounded transition-opacity">
                    225
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-500">Thu</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1 group">
                <div className="w-full bg-indigo-100 rounded-t-sm h-[50%] group-hover:bg-indigo-200 transition-colors relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-navy-900 text-white text-xs px-2 py-1 rounded transition-opacity">
                    150
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-500">Fri</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1 group">
                <div className="w-full bg-slate-200 rounded-t-sm h-[20%] group-hover:bg-slate-300 transition-colors relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-navy-900 text-white text-xs px-2 py-1 rounded transition-opacity">
                    60
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-400">Sat</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1 group">
                <div className="w-full bg-slate-200 rounded-t-sm h-[15%] group-hover:bg-slate-300 transition-colors relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-navy-900 text-white text-xs px-2 py-1 rounded transition-opacity">
                    45
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-400">Sun</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-low p-6">
          <h3 className="text-lg font-bold text-navy-900 mb-6">
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
          </div>
        </div>
      </div>
    </main>
  );
}
