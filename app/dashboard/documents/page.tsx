"use client";
import { Trash2Icon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { uploadDoc } from "@/api/auth";
import { getDocuments, deleteDoc, reprocessDoc } from "@/api/auth";
import { formatDate } from "@/helper/formatdate";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { DocumentDetailsDialog } from "@/components/Documents/documentDialog";
import { getFileIcon } from "@/helper/filename";

type DocumentStatus = "PROCESSED" | "PROCESSING" | "FAILED";

interface Document {
  id: string;
  filename: string;
  fileSize: string;
  status: DocumentStatus;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  totalPages: number;
  totalDocs: number;
  currentPage: number;
  hasNextPage: number;
  hasPrevPage: number;
}

const statusConfig = {
  PROCESSED: {
    label: "processed",
    className: "bg-[#059669]/10 text-[#059669] border border-[#059669]/20",
    dot: <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />,
  },
  PROCESSING: {
    label: "processing",
    className: "bg-secondary/10 text-secondary border border-secondary/20",
    dot: (
      <span className="material-symbols-outlined text-[14px] animate-spin-slow">
        sync
      </span>
    ),
  },
  FAILED: {
    label: "failed",
    className: "bg-error/10 text-error border border-error/20",
    dot: <span className="w-1.5 h-1.5 rounded-full bg-error" />,
  },
};

const pipelineSteps = [
  {
    icon: "upload_file",
    title: "1. Upload",
    description: "File is securely stored and queued.",
  },
  {
    icon: "document_scanner",
    title: "2. Extract Text",
    description: "OCR and parsing algorithms extract raw text.",
  },
  {
    icon: "scatter_plot",
    title: "3. Generate Embeddings",
    description: "Text is vectorized for semantic search.",
  },
  {
    icon: "check",
    title: "4. Ready for Chat",
    description: "AI can now reference this document.",
    isFinal: true,
  },
];

const allowedExtensions = [
  "pdf",
  "doc",
  "docx",
  "txt",
  "md",
  "epub",
  "html",
  "csv",
  "ppt",
  "pptx",
  "jpg",
  "jpeg",
  "png",
];

export default function DocumentsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;
  const [isDragging, setIsDragging] = useState(false);
  const [isUpLoading, setIsUpLoading] = useState(false);
  const [Error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const updateQueryParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    params.delete("docId");
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, value);
    });
    router.replace(`/dashboard/documents?${params.toString()}`);
  };

  useEffect(() => {
    if (!searchParams.get("page")) {
      updateQueryParams({ page: "1" });
    }
  }, []);

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

  const uploadDocument = async (file: File) => {
    try {
      const fd = new FormData();
      fd.append("file", file);
      const response = await uploadDoc(fd);
      toast.success("Document Uploaded Successfully");
      console.log(response);
    } catch (err: any) {
      console.log(err);
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error(err.message);
      }
    }
  };

  const pollDocumentStatus = async (currentPage: number, maxAttempts = 5) => {
    let attempts = 0;
    const interval = 5000;

    const checkStatus = async () => {
      try {
        attempts++;
        const data = await getDocuments(currentPage);

        setDocuments(data.documents);
        setPagination(data.pagination);
        const isStillProcessing = data.documents.some(
          (doc: Document) => doc.status === "PROCESSING",
        );

        if (isStillProcessing && attempts < maxAttempts) {
          setTimeout(checkStatus, interval);
        } else if (isStillProcessing && attempts >= maxAttempts) {
          toast.info(
            "Document is taking longer than usual to process. It will update in the background.",
          );
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    };

    await checkStatus();
  };

  const uploadFile = async (file: File) => {
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (!extension || !allowedExtensions.includes(extension)) {
      toast.error("Unsupported file type");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError("File too large. Maximum size is 50MB");
      toast.error("File too large. Maximum size is 50MB");
      return;
    }

    setError("");
    setIsUpLoading(true);

    try {
      await uploadDocument(file);
      setIsUpLoading(false);
      pollDocumentStatus(page);
    } catch (err: any) {
      setError(err.message);
      setIsUpLoading(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      uploadFile(files[0] as File);
    }
  };

  const reprocess_Doc = async (documentId: string) => {
    try {
      const response = await reprocessDoc(documentId);
      console.log(response);

      if (response.success) {
        toast.success(response.message);
        const currentPage = page;

        setTimeout(async () => {
          try {
            const data = await getDocuments(currentPage);
            setDocuments(data.documents);
            setPagination(data.pagination);
          } catch (fetchError) {
            console.error(
              "Failed to refresh documents after delay:",
              fetchError,
            );
            toast.error("Failed to refresh document list.");
          }
        }, 10000);
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error triggering reprocessing:", err);
      toast.error("An unexpected error occurred.");
    }
  };

  const delete_Doc = async (documentId: string) => {
    try {
      const response = await deleteDoc(documentId);
      console.log(response);

      if (response.success) {
        toast.success(response.message);
        const isLastItemOnPage = documents.length === 1;
        const targetPage = page > 1 && isLastItemOnPage ? page - 1 : page;

        const data = await getDocuments(targetPage);
        setDocuments(data.documents);
        setPagination(data.pagination);

        if (targetPage !== page) {
          gotoPage(targetPage);
        }
      } else {
        toast.error(response.message || "Failed to delete document.");
      }
    } catch (err) {
      console.error("Error deleting document:", err);
      toast.error("An unexpected error occurred.");
    }
  };

  const handleClick = (docId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("docId", docId);
    router.push(`/dashboard/documents?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    let isMounted = true;
    const fetchDocs = async () => {
      try {
        const data = await getDocuments(page);
        if (isMounted) {
          setDocuments(data.documents);
          setPagination(data.pagination);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDocs();
    return () => {
      isMounted = false;
    };
  }, [page]);

  const limit = 4;

  const totalPages = pagination?.totalPages || 1;
  const totalDocs = pagination?.totalDocs || 1;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalDocs);

  return (
    <>
      <div className="p-md lg:px-12 max-w-container-max mx-auto space-y-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-headline-xl-mobile md:text-headline-xl font-bold text-on-background">
              Documents
            </h1>
            <p className="text-on-surface-variant mt-1 text-body-md">
              Manage and train the AI on your knowledge base.
            </p>
          </div>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className=" transition-colors px-6 py-3 rounded-lg
                           flex items-center justify-center gap-2 shadow-sm font-semibold group"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:rotate-90 transition-transform">
              add
            </span>
            Upload Document
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {[
            {
              icon: "folder",
              label: `${documents.length} Total`,
              bg: "bg-surface-container",
            },
            {
              icon: "check_circle",
              label: `${documents.filter((d) => d.status === "PROCESSED").length} Processed`,
              bg: "bg-surface-container-highest",
              iconColor: "text-[#059669]",
            },
            {
              icon: "sync",
              label: `${documents.filter((d) => d.status === "PROCESSING").length} Processing`,
              bg: "bg-secondary-fixed",
              iconColor: "text-secondary animate-spin-slow",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-surface-container-lowest border border-outline-variant 
                       shadow-sm rounded-full px-4 py-2 flex items-center gap-2"
            >
              <div
                className={`w-6 h-6 rounded-full ${stat.bg} flex items-center justify-center`}
              >
                <span
                  className={`material-symbols-outlined text-[16px] ${stat.iconColor || "text-on-surface"}`}
                >
                  {stat.icon}
                </span>
              </div>
              <span className="text-label-md text-on-surface font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const files = Array.from(e.dataTransfer.files);
                if (files.length > 0) {
                  uploadFile(files[0] as File);
                }
              }}
              className={`
              bg-surface-container-lowest rounded-xl border-2 border-dashed
              transition-all duration-300 p-8
              flex flex-col items-center justify-center text-center cursor-pointer group shadow-sm
              ${
                isDragging
                  ? "border-secondary bg-surface-container/30"
                  : "border-secondary/40 hover:border-secondary hover:bg-surface-container/30"
              }
            `}
            >
              {isUpLoading ? (
                <h3 className="text-headline-md text-on-background mb-2">
                  Uploading...
                </h3>
              ) : (
                <div
                  className="w-16 h-16 bg-secondary-fixed rounded-full flex items-center 
                            justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                >
                  <span className="material-symbols-outlined text-secondary text-[32px]">
                    cloud_upload
                  </span>
                  <input
                    type="file"
                    accept="
                      .pdf,
                      .doc,
                      .docx,
                      .md,
                      .txt,
                      .epub,
                      .html,
                      .csv,
                      .ppt,
                      .pptx,
                      .jpg,
                      .jpeg,
                      .png,
                    "
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileInput}
                  />
                </div>
              )}
              {Error && <p className="text-red-500">{Error}</p>}
              <h3 className="text-headline-md text-on-background mb-2">
                Drag and drop your documents here
              </h3>
              <p className="text-on-surface-variant text-body-md mb-4">
                Supports PDF, DOC, DOCX, EPUB, Markdown, TXT, CSV, Html
                files (up to 50MB) and also Images(jpg, jpeg, png)
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-secondary text-label-md font-semibold hover:underline 
              decoration-2 underline-offset-4"
              >
                Or browse files
              </button>
            </div>

            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
              <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
                <h3 className="text-on-background font-semibold text-[18px]">
                  Recent Files
                </h3>
              </div>

              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr
                      className="bg-surface-bright border-b border-outline-variant/50 
                                 text-on-surface-variant text-label-sm uppercase tracking-wider"
                    >
                      <th className="p-4 font-semibold">File Name</th>
                      <th className="p-4 font-semibold">Size</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold">Uploaded</th>
                      <th className="p-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-body-md divide-y divide-outline-variant/30">
                    {documents.map((doc) => {
                      const status = statusConfig[doc.status];
                      const isProcessing = doc.status === "PROCESSING";
                      return (
                        <tr
                          key={doc.id}
                          className={`hover:bg-surface/50 transition-colors group
                          ${isProcessing ? "bg-surface-container-low/30" : ""}
                        `}
                        >
                          <td className="p-4 font-medium text-on-background">
                            <div className="flex items-center gap-3">
                              <span
                                className={`material-symbols-outlined text-[20px] ${isProcessing ? "text-outline" : "text-error"}`}
                              >
                                picture_as_pdf
                              </span>
                              {doc.filename}
                            </div>
                          </td>
                          <td className="p-4 text-on-surface-variant text-sm">
                            {doc.fileSize}
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 
                                          rounded-full text-xs font-semibold ${status.className}`}
                            >
                              {status.dot}
                              {status.label}
                            </span>
                          </td>
                          <td className="p-4 text-on-surface-variant text-sm">
                            {formatDate(doc.createdAt)}
                          </td>
                          <td className="p-4 text-right">
                            {doc.status === "FAILED" ? (
                              <button
                                onClick={() => reprocess_Doc(doc.id)}
                                className="p-1.5 text-on-surface-variant hover:text-secondary 
                                               opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Retry"
                              >
                                <span className="material-symbols-outlined text-[20px]">
                                  refresh
                                </span>
                              </button>
                            ) : (
                              <button
                                onClick={() => handleClick(doc.id)}
                                className={`p-1.5 text-on-surface-variant hover:text-secondary 
                                               transition-opacity
                                               ${isProcessing ? "opacity-50 cursor-not-allowed" : "opacity-0 group-hover:opacity-100"}`}
                              >
                                <span className="material-symbols-outlined text-[20px]">
                                  visibility
                                </span>
                              </button>
                            )}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button
                                  className={`p-1.5 text-on-surface-variant hover:text-error 
                                             transition-opacity
                                             ${isProcessing ? "opacity-50 cursor-not-allowed" : "opacity-0 group-hover:opacity-100"}`}
                                >
                                  <span className="material-symbols-outlined text-[20px]">
                                    delete
                                  </span>
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent
                                size="sm"
                                className="bg-background outline-none ring-0 border-none"
                              >
                                <AlertDialogHeader>
                                  <AlertDialogMedia className="bg-destructive/10 text-destructive">
                                    <Trash2Icon />
                                  </AlertDialogMedia>
                                  <AlertDialogTitle>
                                    Delete Document?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to Delete the
                                    Document? Once you click on delete the
                                    process can't be undone and the document
                                    will be deleted permanently.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel variant="outline">
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => delete_Doc(doc.id)}
                                    variant="destructive"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden flex flex-col divide-y divide-outline-variant/30">
                {documents.map((doc) => {
                  const status = statusConfig[doc.status];
                  return (
                    <div
                      key={doc.id}
                      className={`p-4 hover:bg-surface/50 
                      ${doc.status === "PROCESSING" ? "bg-surface-container-low/30" : ""}
                    `}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2 font-medium text-on-background">
                          <span
                            className={`material-symbols-outlined text-[20px] 
                          ${doc.status === "PROCESSING" ? "text-outline" : "text-error"}`}
                          >
                            {getFileIcon(doc.filename)}
                          </span>
                          {doc.filename}
                        </div>
                        <button className="text-on-surface-variant">
                          <span className="material-symbols-outlined text-[20px]">
                            more_vert
                          </span>
                        </button>
                      </div>
                      <div className="flex justify-between items-center text-sm text-on-surface-variant">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5rounded-full text-[10px] font-semibold ${status.className}`}
                        >
                          {status.dot} {status.label}
                        </span>
                        <span>
                          {doc.fileSize} •{" "}
                          {formatDate(doc.createdAt).split(",")[0]}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                className="p-4 border-t border-outline-variant/50 flex items-center 
                            justify-between bg-surface-bright"
              >
                <p className="text-sm text-on-surface-variant hidden sm:block">
                  Showing {start} to {end} of {totalDocs} Documents
                </p>
                <div className="flex gap-1 w-full sm:w-auto justify-center">
                  <button
                    onClick={() => previousPage()}
                    disabled={!pagination?.hasPrevPage}
                    className="px-3 py-1 rounded border border-outline-variant 
                                   text-on-surface-variant hover:bg-surface-container 
                                   text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {pages.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => gotoPage(pageNumber)}
                      className={`w-8 h-8 rounded text-sm font-medium flex items-center justify-center transition-colors
                      ${
                        pageNumber === page
                          ? "bg-secondary text-on-secondary shadow-sm"
                          : "border border-outline-variant hover:bg-surface-container text-on-surface-variant"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => nextPage()}
                    disabled={!pagination?.hasNextPage}
                    className="px-3 py-1 rounded border border-outline-variant 
                                   text-on-surface-variant hover:bg-surface-container 
                                   text-sm font-medium transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div
              className="bg-surface-container rounded-xl p-6 border border-secondary/20 
                          shadow-sm sticky top-24"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-secondary">
                  memory
                </span>
                <h3 className="text-on-background font-semibold text-[18px]">
                  Processing Pipeline
                </h3>
              </div>
              <p className="text-on-surface-variant text-sm mb-6">
                Here's what happens when you upload a document to build your AI
                knowledge base.
              </p>
              <div className="flex flex-col gap-0 relative">
                <div className="absolute left-3.75 top-4 bottom-8 w-0.5 bg-secondary-fixed z-0" />

                {pipelineSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className={`flex gap-4 relative z-10 group ${index < pipelineSteps.length - 1 ? "pb-6" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center 
                                  shrink-0 shadow-sm group-hover:scale-110 transition-transform
                                  ${
                                    step.isFinal
                                      ? "bg-secondary text-on-secondary"
                                      : "bg-surface-container-lowest border-2 border-secondary"
                                  }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[16px] ${!step.isFinal ? "text-secondary" : ""}`}
                      >
                        {step.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-label-md font-bold text-on-background">
                        {step.title}
                      </h4>
                      <p className="text-sm text-on-surface-variant mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DocumentDetailsDialog />
    </>
  );
}
