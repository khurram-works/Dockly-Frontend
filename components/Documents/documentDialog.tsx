"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSearchParams, useRouter } from "next/navigation";
import { DocDetail } from "@/types/document";
import { useEffect, useState } from "react";
import { docDetails } from "@/api/auth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { formatDate } from "@/helper/formatdate";
import { timeAgo } from "@/helper/timeAgo";

export function DocumentDetailsDialog() {
  const router = useRouter();
  const params = useSearchParams();
  const [detail, setDetail] = useState<DocDetail | null>(null);
  const [loading, setLoading] = useState(false);


  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const docId = params.get("docId");

  const handleClose = () => {
    const newParams = new URLSearchParams(params.toString());
    newParams.delete("docId");
    router.push(`/dashboard/documents?${newParams.toString()}`, {scroll: false});
  };

  useEffect(() => {
    if (!docId) return;
    (async () => {
      try {
        setLoading(true);
        const response: DocDetail = await docDetails(docId);
        setDetail(response);
        console.log(response);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [docId]);


  const fileUrl =
    detail?.document.fileUrl ||
    "https://dockly.app/files/ReturnPolicy_v2_final_approved.pdf";
  const fileId = detail?.document.id || "doc_cuid123456";


  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(fileUrl);
      setCopiedUrl(true);
      toast.success("File Url Copied Successfully");
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL", err);
    }
  };

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(fileId);
      setCopiedId(true);
      toast.success("Doc Id Copied Successfully");
      setTimeout(() => setCopiedId(false), 2000);
    } catch (err) {
      console.error("Failed to copy ID", err);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-surface">
        <Loader2 className="w-5 h-5 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <Dialog
      open={docId !== null}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="w-[95vw] sm:w-full max-w-150 max-h-[90vh] bg-surface-container-lowest shadow-2xl flex flex-col rounded-2xl p-0 border-none overflow-hidden [&>button]:hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="absolute top-6 right-6 z-10">
         
            <button
              onClick={handleClose}
              className="p-2 bg-surface-container-lowest hover:bg-surface-container rounded-full transition-colors text-on-surface-variant cursor-pointer flex items-center justify-center shadow-sm border border-outline-variant/30"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
     
        </div>

        <DialogHeader className="p-6 sm:p-8 pb-6 border-b border-outline-variant/40 shrink-0 bg-surface/30 text-left space-y-0">
          <div className="flex items-start gap-3 sm:gap-4 mb-3">
            <div className="p-2 sm:p-3 bg-secondary/10 border border-secondary/20 rounded-xl text-secondary shadow-sm mt-1 shrink-0">
              <span
                className="material-symbols-outlined text-[24px] sm:text-[28px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                description
              </span>
            </div>
            <div className="min-w-0">
              <DialogTitle className="text-headline-md font-bold text-on-background pr-8 mb-1 truncate">
                {detail?.document.filename || "ReturnPolicy.pdf"}
              </DialogTitle>
              <DialogDescription className="text-label-md text-on-surface-variant flex items-center gap-2">
                ID:{" "}
                <span className="font-mono text-xs bg-surface-container-high px-2 py-1 rounded-md text-on-surface font-medium border border-outline-variant/30 truncate">
                  {fileId}
                </span>
                <button
                  onClick={handleCopyId}
                  className="flex items-center justify-center p-1 hover:text-secondary hover:bg-secondary/10 rounded transition-colors cursor-pointer shrink-0"
                  title="Copy ID"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copiedId ? "check" : "content_copy"}
                  </span>
                </button>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6 sm:space-y-8 custom-scrollbar">
          <section className="p-4 sm:p-5 bg-surface border border-outline-variant/60 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full shrink-0">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-600"></span>
                </span>
                <span className="text-label-sm font-bold text-green-700 tracking-wider">
                  {detail?.document.status}
                </span>
              </div>
              <span className="text-label-sm text-on-surface-variant flex items-center gap-1 shrink-0">
                <span className="material-symbols-outlined text-[14px]">
                  schedule
                </span>
                {timeAgo(String(detail?.document.updatedAt))}
              </span>
            </div>

            <div className="space-y-3 px-1">
              <div className="flex justify-between text-label-sm mb-1">
                <span className="text-on-surface-variant font-medium">
                  AI Indexing Progress
                </span>
                <span className="text-secondary font-bold">100%</span>
              </div>
              <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden border border-outline-variant/20">
                <div className="bg-secondary h-full w-full rounded-full"></div>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant pt-1">
                <span className="material-symbols-outlined text-[18px] text-green-600">
                  check_circle
                </span>
                <span className="text-label-md font-medium">
                  Ready for Chat Interface
                </span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-label-sm font-bold text-on-surface-variant uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                database
              </span>
              Technical Metadata
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-surface-container-lowest border border-outline-variant/60 rounded-xl hover:border-outline hover:shadow-sm transition-all group">
                <span className="text-label-sm text-on-surface-variant mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] group-hover:text-secondary transition-colors">
                    hard_drive_2
                  </span>
                  File Size
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-headline-md font-bold text-on-surface">
                    {(detail?.document.fileSize!/(1024 * 1024)).toFixed(2)}
                  </span>
                  <span className="text-label-md text-on-surface-variant font-medium">
                    MB
                  </span>
                </div>
              </div>
              <div className="p-3 sm:p-4 bg-surface-container-lowest border border-outline-variant/60 rounded-xl hover:border-outline hover:shadow-sm transition-all group">
                <span className="text-label-sm text-on-surface-variant mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] group-hover:text-secondary transition-colors">
                    auto_stories
                  </span>
                  Page Count
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-headline-md font-bold text-on-surface">
                    {detail?.document.pageCount}
                  </span>
                  <span className="text-label-md text-on-surface-variant font-medium">
                    Pages
                  </span>
                </div>
              </div>
              <div className="p-3 sm:p-4 bg-surface-container-lowest border border-outline-variant/60 rounded-xl hover:border-outline hover:shadow-sm transition-all group">
                <span className="text-label-sm text-on-surface-variant mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] group-hover:text-secondary transition-colors">
                    grid_view
                  </span>
                  Chunk Count
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-headline-md font-bold text-on-surface">
                    {detail?.document.chunkCount}
                  </span>
                  <span className="text-label-md text-on-surface-variant font-medium">
                    Chunks
                  </span>
                </div>
              </div>
              <div className="p-3 sm:p-4 bg-surface-container-lowest border border-outline-variant/60 rounded-xl hover:border-outline hover:shadow-sm transition-all group">
                <span className="text-label-sm text-on-surface-variant mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] group-hover:text-secondary transition-colors">
                    calendar_today
                  </span>
                  Created At
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-body-md font-bold text-on-surface truncate">
                    {formatDate(String(detail?.document.createdAt))}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-label-sm font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                link
              </span>
              File Access
            </h3>
            <div className="flex items-center gap-2 p-1.5 pl-3 sm:pl-4 bg-surface-container-lowest border border-outline-variant/60 rounded-xl focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20 transition-all shadow-sm">
              <input
                className="flex-1 min-w-0 bg-transparent border-none text-sm sm:text-body-md text-on-surface focus:ring-0 p-0 overflow-hidden text-ellipsis whitespace-nowrap outline-none"
                readOnly
                type="text"
                value={fileUrl}
              />
              <button
                onClick={handleCopyUrl}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 font-bold rounded-lg transition-colors shrink-0 cursor-pointer shadow-sm ${
                  copiedUrl
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-secondary text-brand-on-secondary hover:bg-secondary/90"
                }`}
              >
                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
                  {copiedUrl ? "check" : "content_copy"}
                </span>
                <span className="text-sm sm:text-base">
                  {copiedUrl ? "Copied" : "Copy"}
                </span>
              </button>
            </div>
          </section>
        </div>

        <DialogFooter className="p-4 sm:p-6 border-t border-outline-variant/40 bg-surface/30 shrink-0 flex flex-col sm:flex-row sm:justify-end gap-3 rounded-b-2xl">
          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-8 py-2.5 bg-surface-container-high border border-outline-variant text-on-surface font-bold rounded-xl hover:bg-surface-container transition-all active:scale-95 cursor-pointer flex items-center justify-center shadow-sm"
          >
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
