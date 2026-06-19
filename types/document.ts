export interface Document {
  id: string;
  companyId: string;

  filename: string;
  fileSize: number;
  fileUrl: string;

  status: DocumentStatus;

  pageCount: number | null;
  chunkCount: number | null;
  errorMessage: string | null;

  createdAt: Date;
  updatedAt: Date;
}

type DocumentStatus =
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED";


export interface DocDetail{
  success: boolean;
  document: Document;
}