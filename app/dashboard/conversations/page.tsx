"use client";
import { useState, useEffect, useRef } from "react";
import { timeAgo } from "@/helper/timeAgo";
import { ConversationsResponse, ConversationRow } from "@/types/conversation";
import { conversations } from "@/api/auth";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { ConversationDrawer } from "@/components/Conversations/conversationDrawer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchParams } from "next/navigation";

const statuses = ["ALL", "ANSWERED", "UNANSWERED"] as const;

const Days = [30, 25, 20, 15, 10, 5, 1];

export default function ConversationsPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ConversationsResponse | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const firstRender = useRef(true);
  const page = Number(searchParams.get("page")) || 1;
  const status = searchParams.get("status") || "ALL";
  const day = Number(searchParams.get("days")) || 30;
  const search = searchParams.get("search") || "";

  const updateQueryParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    params.delete("conversation");
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, value);
    });
    router.replace(`/dashboard/conversations?${params.toString()}`);
  };

  const handleStatusChange = (value: string) => {
    updateQueryParams({
      status: value,
      page: "1",
    });
  };

  const handleDayChange = (value: number) => {
    updateQueryParams({
      days: String(value),
      page: "1",
    });
  };

  const previousPage = () => {
    updateQueryParams({
      page: String(page - 1),
    });
  };

  const nextPage = () => {
    updateQueryParams({
      page: String(page + 1),
    });
  };

  const gotoPage = (pageNumber: number) => {
    updateQueryParams({
      page: String(pageNumber),
    });
  };

  const handleClick = (conversationId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("conversation", conversationId);
    router.push(`/dashboard/conversations?${params.toString()}`);
  };

  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      updateQueryParams({
        search: searchInput,
        page: "1",
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const response = await conversations(page, status, day, search);

        setData(response);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [page, status, day, search]);

  if (loading) {
    return (
      <main className="flex-1 p-gutter flex items-center justify-center">
        <p className="text-on-surface-variant">Loading Conversations...</p>
      </main>
    );
  }

  const totalPages = data?.data.pagination.totalPages || 1;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <main className="flex-1 overflow-y-auto bg-background p-8 relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-headline-md text-primary-container">
          Conversations
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-secondary text-secondary hover:bg-secondary-fixed transition-colors font-medium text-label-md">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "18px" }}
          >
            download
          </span>
          Export CSV
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
        <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-2 shadow-sm w-full sm:w-auto justify-center">
          <span className="text-label-md">💬</span>
          <span className="text-on-background font-semibold text-label-md">
            {data?.data.pagination.totalConversations} Total Conversations
          </span>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-2 shadow-sm w-full sm:w-auto justify-center">
          <span className="text-label-md">✅</span>
          <span className="text-on-background font-semibold text-label-md">
            {data?.data.pagination.answeredCount} Answered
          </span>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-2 shadow-sm w-full sm:w-auto justify-center">
          <span className="text-label-md">❌</span>
          <span className="text-on-background font-semibold text-label-md">
            {data?.data.pagination.unansweredCount} Unanswered
          </span>
        </div>
      </div>

      <div
        className=" bg-surface-container-lowest border rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between"
      >
        <div className="relative flex-1 min-w-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "20px" }}
            >
              search
            </span>
          </div>
          <input
            value={searchInput}
            className="block w-full pl-10 pr-3 py-2 border-none bg-transparent text-on-background placeholder-on-surface-variant focus:ring-0 sm:text-sm"
            placeholder="Search conversations or questions..."
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex  bg-background items-center gap-2 px-3 py-1.5  outline-none ring-0 rounded-md hover:bg-surface-container transition-colors text-label-md text-on-surface-variant border border-transparent hover:border-outline-variant">
                {status}
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "16px" }}
                >
                  arrow_drop_down
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 border-none outline-none bg-background [&]:border-0 z-10">
              <DropdownMenuGroup>
                {statuses.map((sta, index) => (
                  <DropdownMenuCheckboxItem
                    key={index}
                    checked={status === sta}
                    onCheckedChange={() => handleStatusChange(sta)}
                  >
                    {sta}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex bg-background outline-none ring-0 items-center gap-2 px-3 py-1.5 rounded-md hover:bg-surface-container transition-colors text-label-md text-on-surface-variant border border-transparent hover:border-outline-variant">
                Last {day} Days
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "16px" }}
                >
                  arrow_drop_down
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 border-none outline-none bg-background [&]:border-0 z-10">
              <DropdownMenuGroup>
                {Days.map((sta, index) => (
                  <DropdownMenuCheckboxItem
                    key={index}
                    checked={day === sta}
                    onCheckedChange={() => handleDayChange(sta)}
                  >
                    {sta}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm mb-6">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full table-fixed text-left border-collapse">
            <thead>
              <tr className="bg-surface-bright border-b border-outline-variant">
                <th className="py-3 px-4 lg:px-6 text-label-sm text-on-surface-variant uppercase tracking-wider w-20">
                  Id
                </th>

                <th className="py-3 px-4 lg:px-6 text-label-sm text-on-surface-variant uppercase tracking-wider w-[25%]">
                  Customer Question
                </th>

                <th className="py-3 px-4 lg:px-6 text-label-sm text-on-surface-variant uppercase tracking-wider">
                  AI Answer Preview
                </th>

                <th className="py-3 px-4 lg:px-6 text-label-sm text-on-surface-variant uppercase tracking-wider w-32">
                  Time
                </th>

                <th className="py-3 px-4 lg:px-6 text-label-sm text-on-surface-variant uppercase tracking-wider w-32">
                  Status
                </th>

                <th className="py-3 px-4 lg:px-6 text-label-sm text-on-surface-variant uppercase tracking-wider text-right w-24">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="text-body-md text-on-background">
              {data?.data.conversations.map((con) => (
                <tr
                  key={con.id}
                  // onClick={() => setSelectedConversation(con)}
                  className="border-b border-outline-variant hover:bg-secondary-fixed/30 transition-colors cursor-pointer group bg-surface-container/20"
                >
                  <td className="py-4 px-4 lg:px-6 font-medium text-on-surface-variant">
                    {con.id.slice(-6, -1)}
                  </td>

                  <td className="py-4 px-4 lg:px-6">
                    <div className="truncate font-medium">{con.question}</div>
                  </td>

                  <td className="py-4 px-4 lg:px-6">
                    <div className="truncate text-on-surface-variant">
                      {con.answerPreview}
                    </div>
                  </td>

                  <td className="py-4 px-4 lg:px-6 text-on-surface-variant text-sm whitespace-nowrap">
                    {timeAgo(con.updatedAt)}
                  </td>

                  <td className="py-4 px-4 lg:px-6">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-container-high text-primary-container text-label-sm font-medium border border-outline-variant/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      {con.status}
                    </span>
                  </td>

                  <td className="py-4 px-4 lg:px-6 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick(con.id);
                      }}
                      className="p-2 hover:bg-slate-100 rounded-md transition-colors"
                    >
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden divide-y divide-outline-variant">
          {data?.data.conversations.map((con) => (
            <div
              key={con.id}
              className="p-4 cursor-pointer hover:bg-secondary-fixed/20 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      #{con.id.slice(-6, -1)}
                    </span>

                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-high text-xs border border-outline-variant/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      {con.status}
                    </span>
                  </div>

                  <h3 className="font-medium text-sm line-clamp-2 mb-2">
                    {con.question}
                  </h3>

                  <p className="text-sm text-on-surface-variant line-clamp-3 mb-3">
                    {con.answerPreview}
                  </p>

                  <div className="text-xs text-muted-foreground">
                    {timeAgo(con.updatedAt)}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(con.id);

                    // setSelectedConversation(con);
                  }}
                  className="shrink-0 p-2 rounded-md hover:bg-slate-100 transition-colors"
                >
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-label-md text-on-surface-variant">
        <button
          onClick={() => previousPage()}
          disabled={!data?.data.pagination.hasPrevPage}
          className="px-4 py-2 border border-outline-variant rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-colors disabled:opacity-50"
        >
          Previous
        </button>
        <div className="flex items-center gap-1">
          {pages.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => gotoPage(pageNumber)}
              className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
                page === pageNumber
                  ? "bg-secondary text-on-secondary"
                  : "hover:bg-surface-container"
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          onClick={() => nextPage()}
          disabled={!data?.data.pagination.hasNextPage}
          className="px-4 py-2 border border-outline-variant rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-colors disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <ConversationDrawer />
    </main>
  );
}
