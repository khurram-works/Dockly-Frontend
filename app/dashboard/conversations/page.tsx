"use client";

export default function ConversationsPage() {
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

      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-2 shadow-sm">
          <span className="text-label-md">💬</span>
          <span className="text-on-background font-semibold text-label-md">
            389 Total Conversations
          </span>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-2 shadow-sm">
          <span className="text-label-md">✅</span>
          <span className="text-on-background font-semibold text-label-md">
            371 Answered
          </span>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-2 shadow-sm">
          <span className="text-label-md">❌</span>
          <span className="text-on-background font-semibold text-label-md">
            18 Unanswered
          </span>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-2 mb-6 flex items-center justify-between shadow-sm">
        <div className="relative w-[400px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "20px" }}
            >
              search
            </span>
          </div>
          <input
            className="block w-full pl-10 pr-3 py-2 border-none bg-transparent text-on-background placeholder-on-surface-variant focus:ring-0 sm:text-sm"
            placeholder="Search conversations or questions..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-2 pr-2">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-surface-container transition-colors text-label-md text-on-surface-variant border border-transparent hover:border-outline-variant">
            All Status
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "16px" }}
            >
              arrow_drop_down
            </span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-surface-container transition-colors text-label-md text-on-surface-variant border border-transparent hover:border-outline-variant">
            Last 30 Days
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "16px" }}
            >
              arrow_drop_down
            </span>
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden mb-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-bright border-b border-outline-variant">
              <th className="py-3 px-6 text-label-sm text-on-surface-variant uppercase tracking-wider w-20">
                #
              </th>
              <th className="py-3 px-6 text-label-sm text-on-surface-variant uppercase tracking-wider w-1/4">
                Customer Question
              </th>
              <th className="py-3 px-6 text-label-sm text-on-surface-variant uppercase tracking-wider">
                AI Answer Preview
              </th>
              <th className="py-3 px-6 text-label-sm text-on-surface-variant uppercase tracking-wider w-32">
                Time
              </th>
              <th className="py-3 px-6 text-label-sm text-on-surface-variant uppercase tracking-wider w-32">
                Status
              </th>
              <th className="py-3 px-6 text-label-sm text-on-surface-variant uppercase tracking-wider text-right w-24">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-body-md text-on-background">
            <tr className="border-b border-outline-variant hover:bg-secondary-fixed/30 transition-colors cursor-pointer group bg-surface-container/20">
              <td className="py-4 px-6 font-medium text-on-surface-variant">
                #389
              </td>
              <td className="py-4 px-6 font-medium truncate max-w-xs">
                What is your refund policy?
              </td>
              <td className="py-4 px-6 text-on-surface-variant truncate max-w-md">
                Nike products can be returned within 30 days...
              </td>
              <td className="py-4 px-6 text-on-surface-variant text-sm">
                2 min ago
              </td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-container-high text-primary-container text-label-sm font-medium border border-outline-variant/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Answered
                </span>
              </td>
              <td className="py-4 px-6 text-right">
                <button className="text-on-surface-variant hover:text-secondary transition-colors p-1 rounded-md hover:bg-surface-container">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    visibility
                  </span>
                </button>
              </td>
            </tr>

            <tr className="border-b border-outline-variant hover:bg-secondary-fixed/30 transition-colors cursor-pointer group">
              <td className="py-4 px-6 font-medium text-on-surface-variant">
                #388
              </td>
              <td className="py-4 px-6 font-medium truncate max-w-xs">
                How long does shipping take?
              </td>
              <td className="py-4 px-6 text-on-surface-variant truncate max-w-md">
                Standard shipping takes 5-7 business days...
              </td>
              <td className="py-4 px-6 text-on-surface-variant text-sm">
                15 min ago
              </td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-container-high text-primary-container text-label-sm font-medium border border-outline-variant/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Answered
                </span>
              </td>
              <td className="py-4 px-6 text-right">
                <button className="text-on-surface-variant hover:text-secondary transition-colors p-1 rounded-md hover:bg-surface-container">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    visibility
                  </span>
                </button>
              </td>
            </tr>

            <tr className="border-b border-outline-variant hover:bg-error-container/40 bg-error-container/20 transition-colors cursor-pointer group">
              <td className="py-4 px-6 font-medium text-on-surface-variant">
                #387
              </td>
              <td className="py-4 px-6 font-medium truncate max-w-xs">
                Do you ship internationally?
              </td>
              <td className="py-4 px-6 text-on-surface-variant truncate max-w-md">
                I could not find specific information about...
              </td>
              <td className="py-4 px-6 text-on-surface-variant text-sm">
                1 hr ago
              </td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-error-container text-on-error-container text-label-sm font-medium border border-error/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                  Unanswered
                </span>
              </td>
              <td className="py-4 px-6 text-right">
                <button className="text-on-surface-variant hover:text-error transition-colors p-1 rounded-md hover:bg-surface-container">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    visibility
                  </span>
                </button>
              </td>
            </tr>

            <tr className="border-b border-outline-variant hover:bg-secondary-fixed/30 transition-colors cursor-pointer group">
              <td className="py-4 px-6 font-medium text-on-surface-variant">
                #386
              </td>
              <td className="py-4 px-6 font-medium truncate max-w-xs">
                What is the warranty on Air Max?
              </td>
              <td className="py-4 px-6 text-on-surface-variant truncate max-w-md">
                Nike provides a 2-year warranty on all footwear...
              </td>
              <td className="py-4 px-6 text-on-surface-variant text-sm">
                3 hrs ago
              </td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-container-high text-primary-container text-label-sm font-medium border border-outline-variant/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Answered
                </span>
              </td>
              <td className="py-4 px-6 text-right">
                <button className="text-on-surface-variant hover:text-secondary transition-colors p-1 rounded-md hover:bg-surface-container">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    visibility
                  </span>
                </button>
              </td>
            </tr>

            <tr className="border-b border-outline-variant hover:bg-secondary-fixed/30 transition-colors cursor-pointer group">
              <td className="py-4 px-6 font-medium text-on-surface-variant">
                #385
              </td>
              <td className="py-4 px-6 font-medium truncate max-w-xs">
                Can I change my order after placing it?
              </td>
              <td className="py-4 px-6 text-on-surface-variant truncate max-w-md">
                Orders can be modified within 1 hour...
              </td>
              <td className="py-4 px-6 text-on-surface-variant text-sm">
                5 hrs ago
              </td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-container-high text-primary-container text-label-sm font-medium border border-outline-variant/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Answered
                </span>
              </td>
              <td className="py-4 px-6 text-right">
                <button className="text-on-surface-variant hover:text-secondary transition-colors p-1 rounded-md hover:bg-surface-container">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    visibility
                  </span>
                </button>
              </td>
            </tr>

            <tr className="hover:bg-error-container/40 bg-error-container/20 transition-colors cursor-pointer group">
              <td className="py-4 px-6 font-medium text-on-surface-variant">
                #384
              </td>
              <td className="py-4 px-6 font-medium truncate max-w-xs">
                Where is my order?
              </td>
              <td className="py-4 px-6 text-on-surface-variant truncate max-w-md">
                I could not find tracking information...
              </td>
              <td className="py-4 px-6 text-on-surface-variant text-sm">
                8 hrs ago
              </td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-error-container text-on-error-container text-label-sm font-medium border border-error/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                  Unanswered
                </span>
              </td>
              <td className="py-4 px-6 text-right">
                <button className="text-on-surface-variant hover:text-error transition-colors p-1 rounded-md hover:bg-surface-container">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    visibility
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-label-md text-on-surface-variant">
        <button
          className="px-4 py-2 border border-outline-variant rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-colors disabled:opacity-50"
          disabled
        >
          Previous
        </button>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-secondary text-on-secondary font-medium">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-surface-container transition-colors">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-surface-container transition-colors">
            3
          </button>
          <span className="px-1">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-surface-container transition-colors">
            18
          </button>
        </div>
        <button className="px-4 py-2 border border-outline-variant rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-colors">
          Next
        </button>
      </div>

      {/* <div className="absolute inset-0 bg-primary-container/20 backdrop-blur-sm z-10 transition-opacity"></div> */}

      {/* <div className="absolute top-0 right-0 bottom-0 w-120 bg-surface-container-lowest border-l border-outline-variant z-20 shadow-[-10px_0_30px_rgba(15,23,42,0.05)] flex flex-col transform transition-transform duration-300 translate-x-0">
        <div className="px-6 py-5 border-b border-outline-variant flex items-start justify-between bg-surface-bright shrink-0">
          <div>
            <h3 className="text-headline-md text-primary-container mb-1">
              Conversation #389
            </h3>
            <p className="text-label-sm text-on-surface-variant font-medium">
              2 minutes ago · <span className="text-secondary">Answered</span> ·
              Source: ReturnPolicy.pdf
            </p>
          </div>
          <button className="text-on-surface-variant hover:text-on-background p-1 rounded-md hover:bg-surface-container transition-colors">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "24px" }}
            >
              close
            </span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-background">
          <div className="flex gap-3 max-w-[85%]">
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary text-sm">
                robot_2
              </span>
            </div>
            <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl rounded-tl-sm px-4 py-3 text-body-md text-on-background shadow-sm">
              Hello! How can I help you today?
            </div>
          </div>

          <div className="flex gap-3 max-w-[85%] ml-auto justify-end">
            <div className="bg-secondary rounded-2xl rounded-tr-sm px-4 py-3 text-body-md text-on-secondary shadow-sm">
              What is your refund policy?
            </div>
            <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center shrink-0 border border-outline-variant/50">
              <span className="material-symbols-outlined text-on-surface-variant text-sm">
                person
              </span>
            </div>
          </div>

          <div className="flex gap-3 max-w-[90%]">
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary text-sm">
                robot_2
              </span>
            </div>
            <div className="space-y-2 w-full">
              <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl rounded-tl-sm px-4 py-3 text-body-md text-on-background shadow-sm leading-relaxed">
                Nike products can be returned within 30 days of purchase. Items
                must be unworn and unwashed to be eligible for a full refund.
                Would you like me to guide you through the return process?
              </div>
              <div className="text-label-sm text-on-surface-variant flex items-center gap-1 pl-1">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "14px" }}
                >
                  description
                </span>
                Source: ReturnPolicy.pdf
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-outline-variant bg-surface-bright shrink-0">
          <h4 className="text-label-md text-primary-container mb-3 uppercase tracking-wider">
            Reference Material
          </h4>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 flex items-start gap-3 hover:border-secondary transition-colors cursor-pointer group shadow-sm">
            <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-secondary group-hover:bg-secondary-fixed transition-colors">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                description
              </span>
            </div>
            <div>
              <p className="text-label-md text-on-background font-medium">
                ReturnPolicy.pdf
              </p>
              <p className="text-label-sm text-on-surface-variant mt-1">
                Chunk 3, Page 2
              </p>
            </div>
            <span
              className="material-symbols-outlined text-on-surface-variant ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ fontSize: "18px" }}
            >
              open_in_new
            </span>
          </div>
        </div>

        <div className="p-6 border-t border-outline-variant bg-surface-container-lowest flex gap-3 shrink-0">
          <button className="flex-1 py-2.5 rounded-lg border-2 border-secondary text-secondary font-semibold hover:bg-secondary-fixed transition-colors text-label-md">
            Mark as Reviewed
          </button>
          <button className="px-6 py-2.5 rounded-lg border border-outline-variant text-on-surface-variant font-medium hover:bg-surface-container transition-colors text-label-md">
            Close
          </button>
        </div>
      </div> */}
    </main>
  );
}
