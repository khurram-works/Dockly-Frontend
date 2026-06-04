// app/dashboard/documents/page.tsx
'use client';

import { useState } from 'react';

// ── Types ──────────────────────────────────────
type DocumentStatus = 'processed' | 'processing' | 'failed';

interface Document {
  id: string;
  name: string;
  size: string;
  status: DocumentStatus;
  uploadedAt: string;
}

// ── Static data — replace with API call later ──
const documents: Document[] = [
  { id: '1', name: 'ReturnPolicy.pdf', size: '2.4 MB', status: 'processed', uploadedAt: 'Jan 15, 2025' },
  { id: '2', name: 'ShippingPolicy.pdf', size: '1.8 MB', status: 'processed', uploadedAt: 'Jan 14, 2025' },
  { id: '3', name: 'Warranty.pdf', size: '3.1 MB', status: 'processed', uploadedAt: 'Jan 13, 2025' },
  { id: '4', name: 'FAQ.pdf', size: '0.9 MB', status: 'processing', uploadedAt: 'Jan 16, 2025' },
  { id: '5', name: 'ProductCatalog.pdf', size: '5.2 MB', status: 'failed', uploadedAt: 'Jan 12, 2025' },
];

// ── Status badge config — one place to change colors ──
const statusConfig = {
  processed: {
    label: 'Processed',
    className: 'bg-[#059669]/10 text-[#059669] border border-[#059669]/20',
    dot: <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />,
  },
  processing: {
    label: 'Processing',
    className: 'bg-secondary/10 text-secondary border border-secondary/20',
    dot: <span className="material-symbols-outlined text-[14px] animate-spin-slow">sync</span>,
  },
  failed: {
    label: 'Failed',
    className: 'bg-error/10 text-error border border-error/20',
    dot: <span className="w-1.5 h-1.5 rounded-full bg-error" />,
  },
};

// Pipeline steps data
const pipelineSteps = [
  { icon: 'upload_file', title: '1. Upload', description: 'File is securely stored and queued.' },
  { icon: 'document_scanner', title: '2. Extract Text', description: 'OCR and parsing algorithms extract raw text.' },
  { icon: 'scatter_plot', title: '3. Generate Embeddings', description: 'Text is vectorized for semantic search.' },
  { icon: 'check', title: '4. Ready for Chat', description: 'AI can now reference this document.', isFinal: true },
];

export default function DocumentsPage() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="p-md lg:p-xl lg:px-12 max-w-container-max mx-auto space-y-xl">

      {/* ── Page header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-headline-xl-mobile md:text-headline-xl font-bold text-on-background">
            Documents
          </h1>
          <p className="text-on-surface-variant mt-1 text-body-md">
            Manage and train the AI on your knowledge base.
          </p>
        </div>
        <button className="bg-secondary text-on-secondary hover:bg-secondary-container 
                           transition-colors px-6 py-3 rounded-lg text-label-md 
                           flex items-center justify-center gap-2 shadow-sm font-semibold group">
          <span className="material-symbols-outlined text-[20px] group-hover:rotate-90 transition-transform">
            add
          </span>
          Upload Document
        </button>
      </div>

      {/* ── Stats pills ── */}
      <div className="flex flex-wrap items-center gap-3">
        {[
          { icon: 'folder', label: '12 Total', bg: 'bg-surface-container' },
          { icon: 'check_circle', label: '10 Processed', bg: 'bg-surface-container-highest', iconColor: 'text-[#059669]' },
          { icon: 'sync', label: '2 Processing', bg: 'bg-secondary-fixed', iconColor: 'text-secondary animate-spin-slow' },
        ].map((stat) => (
          <div key={stat.label}
            className="bg-surface-container-lowest border border-outline-variant 
                       shadow-sm rounded-full px-4 py-2 flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full ${stat.bg} flex items-center justify-center`}>
              <span className={`material-symbols-outlined text-[16px] ${stat.iconColor || 'text-on-surface'}`}>
                {stat.icon}
              </span>
            </div>
            <span className="text-label-md text-on-surface font-semibold">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* ── Two column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        {/* ── Left: Upload + Table ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Upload dropzone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
            className={`
              bg-surface-container-lowest rounded-xl border-2 border-dashed
              transition-all duration-300 p-8
              flex flex-col items-center justify-center text-center cursor-pointer group shadow-sm
              ${isDragging
                ? 'border-secondary bg-surface-container/30'
                : 'border-secondary/40 hover:border-secondary hover:bg-surface-container/30'
              }
            `}
          >
            <div className="w-16 h-16 bg-secondary-fixed rounded-full flex items-center 
                            justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-secondary text-[32px]">
                cloud_upload
              </span>
            </div>
            <h3 className="text-headline-md text-on-background mb-2">
              Drag and drop your PDF files here
            </h3>
            <p className="text-on-surface-variant text-body-md mb-4">
              Supports PDF files up to 50MB
            </p>
            <button className="text-secondary text-label-md font-semibold hover:underline 
                               decoration-2 underline-offset-4">
              Or browse files
            </button>
          </div>

          {/* Documents table */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">

            {/* Table header bar */}
            <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
              <h3 className="text-on-background font-semibold text-[18px]">Recent Files</h3>
              <button className="p-1.5 text-on-surface-variant hover:bg-surface-container rounded-md">
                <span className="material-symbols-outlined text-[20px]">filter_list</span>
              </button>
            </div>

            {/* Desktop table — hidden on mobile */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-bright border-b border-outline-variant/50 
                                 text-on-surface-variant text-label-sm uppercase tracking-wider">
                    <th className="p-4 w-12 text-center">
                      <input type="checkbox" className="rounded border-outline-variant text-secondary focus:ring-secondary" />
                    </th>
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
                    const isProcessing = doc.status === 'processing';
                    return (
                      <tr key={doc.id}
                        className={`hover:bg-surface/50 transition-colors group
                          ${isProcessing ? 'bg-surface-container-low/30' : ''}
                        `}
                      >
                        <td className="p-4 text-center">
                          <input type="checkbox" className="rounded border-outline-variant text-secondary focus:ring-secondary" />
                        </td>
                        <td className="p-4 font-medium text-on-background">
                          <div className="flex items-center gap-3">
                            <span className={`material-symbols-outlined text-[20px] ${isProcessing ? 'text-outline' : 'text-error'}`}>
                              picture_as_pdf
                            </span>
                            {doc.name}
                          </div>
                        </td>
                        <td className="p-4 text-on-surface-variant text-sm">{doc.size}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 
                                          rounded-full text-xs font-semibold ${status.className}`}>
                            {status.dot}
                            {status.label}
                          </span>
                        </td>
                        <td className="p-4 text-on-surface-variant text-sm">{doc.uploadedAt}</td>
                        <td className="p-4 text-right">
                          {doc.status === 'failed' ? (
                            <button className="p-1.5 text-on-surface-variant hover:text-secondary 
                                               opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Retry">
                              <span className="material-symbols-outlined text-[20px]">refresh</span>
                            </button>
                          ) : (
                            <button className={`p-1.5 text-on-surface-variant hover:text-secondary 
                                               transition-opacity
                                               ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100'}`}>
                              <span className="material-symbols-outlined text-[20px]">visibility</span>
                            </button>
                          )}
                          <button className={`p-1.5 text-on-surface-variant hover:text-error 
                                             transition-opacity
                                             ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100'}`}>
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards — shown below md */}
            <div className="md:hidden flex flex-col divide-y divide-outline-variant/30">
              {documents.map((doc) => {
                const status = statusConfig[doc.status];
                return (
                  <div key={doc.id}
                    className={`p-4 hover:bg-surface/50 
                      ${doc.status === 'processing' ? 'bg-surface-container-low/30' : ''}
                    `}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2 font-medium text-on-background">
                        <span className={`material-symbols-outlined text-[20px] 
                          ${doc.status === 'processing' ? 'text-outline' : 'text-error'}`}>
                          picture_as_pdf
                        </span>
                        {doc.name}
                      </div>
                      <button className="text-on-surface-variant">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </div>
                    <div className="flex justify-between items-center text-sm text-on-surface-variant">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 
                                       rounded-full text-[10px] font-semibold ${status.className}`}>
                        {status.dot} {status.label}
                      </span>
                      <span>{doc.size} • {doc.uploadedAt.split(',')[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-outline-variant/50 flex items-center 
                            justify-between bg-surface-bright">
              <p className="text-sm text-on-surface-variant hidden sm:block">
                Showing 1 to 5 of 12 entries
              </p>
              <div className="flex gap-1 w-full sm:w-auto justify-center">
                <button className="px-3 py-1 rounded border border-outline-variant 
                                   text-on-surface-variant hover:bg-surface-container 
                                   text-sm font-medium transition-colors disabled:opacity-50">
                  Previous
                </button>
                {[1, 2, 3].map((page) => (
                  <button key={page}
                    className={`w-8 h-8 rounded text-sm font-medium flex items-center justify-center transition-colors
                      ${page === 1
                        ? 'bg-secondary text-on-secondary shadow-sm'
                        : 'border border-outline-variant hover:bg-surface-container text-on-surface-variant'
                      }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-3 py-1 rounded border border-outline-variant 
                                   text-on-surface-variant hover:bg-surface-container 
                                   text-sm font-medium transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Pipeline sidebar ── */}
        <div className="lg:col-span-1">
          <div className="bg-surface-container rounded-xl p-6 border border-secondary/20 
                          shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary">memory</span>
              <h3 className="text-on-background font-semibold text-[18px]">Processing Pipeline</h3>
            </div>
            <p className="text-on-surface-variant text-sm mb-6">
              Here's what happens when you upload a document to build your AI knowledge base.
            </p>

            {/* Pipeline steps */}
            <div className="flex flex-col gap-0 relative">
              {/* Connecting vertical line */}
              <div className="absolute left-3.75 top-4 bottom-8 w-0.5 bg-secondary-fixed z-0" />

              {pipelineSteps.map((step, index) => (
                <div key={step.title}
                  className={`flex gap-4 relative z-10 group ${index < pipelineSteps.length - 1 ? 'pb-6' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                                  shrink-0 shadow-sm group-hover:scale-110 transition-transform
                                  ${step.isFinal
                                    ? 'bg-secondary text-on-secondary'
                                    : 'bg-surface-container-lowest border-2 border-secondary'
                                  }`}
                  >
                    <span className={`material-symbols-outlined text-[16px] ${!step.isFinal ? 'text-secondary' : ''}`}>
                      {step.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-label-md font-bold text-on-background">{step.title}</h4>
                    <p className="text-sm text-on-surface-variant mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}