"use client";

export default function ChatbotSettingsPage() {
  return (
    <main className=" min-h-screen bg-background">
      <div className="max-w-[container-max] mx-auto px-gutter py-xl">
        <header className="mb-lg">
          <h2 className="font-headline-xl text-headline-xl text-on-surface">
            Chatbot Settings
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
            Configure how your AI assistant looks and behaves.
          </p>
        </header>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
          <div className="xl:col-span-8 flex flex-col gap-lg">
            <section className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-md shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)]">
              <div className="flex items-center gap-3 mb-md">
                <div className="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined" data-icon="tune">
                    tune
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  General Settings
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
                    Chatbot Name
                  </label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                    type="text"
                    placeholder="Nike Support Assistant"
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
                    Company Display Name
                  </label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                    type="text"
                    placeholder="Nike"
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
                    Welcome Message
                  </label>
                  <textarea
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all resize-none"
                    rows={3}
                    placeholder="Hi there! I'm the Nike Support Assistant. How can I help you gear up today?"
                  >
                   
                  </textarea>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                    This is the first message users will see.
                  </p>
                </div>
              </div>
              <div className="mt-md flex justify-end">
                <button className="bg-linear-to-b from-secondary to-[#3739B3] text-on-secondary font-label-md text-label-md px-6 py-2 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95">
                  Save Changes
                </button>
              </div>
            </section>

            <section className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-md shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)]">
              <div className="flex items-center gap-3 mb-md">
                <div className="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center text-secondary">
                  <span
                    className="material-symbols-outlined"
                    data-icon="public"
                  >
                    public
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Your Public Chatbot URL
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="grow w-auto relative">
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 pr-10 font-body-md text-body-md text-on-surface-variant cursor-default outline-none"
                    readOnly
                    type="text"
                    value="https://dockly.com/chat/nike"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                    lock
                  </span>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-outline-variant text-primary font-label-md text-label-md px-4 py-2 rounded-lg hover:bg-surface-container transition-colors">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      data-icon="open_in_new"
                    >
                      open_in_new
                    </span>
                    Open
                  </button>
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-linear-to-b from-secondary to-[#3739B3] text-on-secondary font-label-md text-label-md px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all  active:scale-95">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      data-icon="content_copy"
                    >
                      content_copy
                    </span>
                    Copy Link
                  </button>
                </div>
              </div>
              <div className="mt-md border-t border-outline-variant pt-md flex items-center justify-between">
                <div>
                  <h4 className="font-label-md text-label-md text-on-surface">
                    QR Code Share
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">
                    Download a QR code to print on physical materials.
                  </p>
                  <button className="mt-3 text-secondary font-label-md text-label-md hover:underline flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      data-icon="download"
                    >
                      download
                    </span>{" "}
                    Download PNG
                  </button>
                </div>
                <div className="w-20 h-20 bg-surface-container-low border border-outline-variant rounded-lg flex items-center justify-center p-2">
                  <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlNWVlZmYiLz48cGF0aCBkPSJNMTAgMTBoMjB2MjBIMTB6bTQwIDBoMjB2MjBINTB6TTEwIDUwaDIwdjIwSDEwem0zMCAwaDMwdjMwSDQweiIgZmlsbD0iIzQ2NDhkNCIvPjwvc3ZnPg==')] bg-cover bg-center opacity-50"></div>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-md shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)]">
              <div className="flex items-center gap-3 mb-md">
                <div className="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center text-secondary">
                  <span
                    className="material-symbols-outlined"
                    data-icon="palette"
                  >
                    palette
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Chatbot Appearance
                </h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                    Primary Accent Color
                  </label>
                  <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-full bg-[#111111] border-2 border-transparent hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#111111]"></button>
                    <button className="w-10 h-10 rounded-full bg-secondary border-2 border-primary hover:scale-110 transition-transform focus:outline-none shadow-sm relative">
                      <span className="material-symbols-outlined text-white text-[20px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        check
                      </span>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-[#E11D48] border-2 border-transparent hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E11D48]"></button>
                    <button className="w-10 h-10 rounded-full bg-[#16A34A] border-2 border-transparent hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A34A]"></button>
                    <button className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant hover:scale-110 transition-transform flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-on-surface-variant text-[20px]"
                        data-icon="add"
                      >
                        add
                      </span>
                    </button>
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-outline-variant">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div>
                      <span className="font-label-md text-label-md text-on-surface block">
                        Show Company Logo
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Display your avatar in the chat header.
                      </span>
                    </div>
                    <div className="relative inline-flex items-center h-6 rounded-full w-11 bg-secondary transition-colors">
                      <span className="inline-block w-4 h-4 transform translate-x-6 bg-white rounded-full transition-transform"></span>
                    </div>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div>
                      <span className="font-label-md text-label-md text-on-surface block">
                        Show "Powered by Dockly"
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Pro tier only.
                      </span>
                    </div>
                    <div className="relative inline-flex items-center h-6 rounded-full w-11 bg-surface-tint/30 transition-colors">
                      <span className="inline-block w-4 h-4 transform translate-x-1 bg-white rounded-full transition-transform"></span>
                    </div>
                  </label>
                </div>
              </div>
              <div className="mt-md flex justify-end">
                <button className="bg-linear-to-b from-secondary to-[#3739B3] text-on-secondary font-label-md text-label-md px-6 py-2 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95">
                  Save Appearance
                </button>
              </div>
            </section>
          </div>

          <div className="xl:col-span-4 mt-lg xl:mt-0">
            <div className="sticky top-24">
              <div className="bg-surface-container-lowest rounded-4xl border-4 border-surface-container-highest p-2 shadow-xl max-w-90 mx-auto overflow-hidden flex flex-col h-150 relative">
                <div className="bg-secondary px-4 py-4 rounded-t-3xl flex items-center justify-between shadow-sm z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-secondary text-sm">
                      N
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md text-white font-semibold">
                        Nike Support
                      </h4>
                      <p className="text-white/80 text-[10px] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>{" "}
                        Online
                      </p>
                    </div>
                  </div>
                  <button className="text-white hover:bg-white/20 p-1 rounded-full transition-colors">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      data-icon="close"
                    >
                      close
                    </span>
                  </button>
                </div>

                <div className="grow bg-surface-container-lowest p-4 overflow-y-auto flex flex-col gap-4 relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px]">
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-6 h-6 rounded-full bg-secondary shrink-0 flex items-center justify-center text-white text-[10px] font-bold mt-1">
                      N
                    </div>
                    <div className="bg-surface-container-low border border-outline-variant text-on-surface font-body-md text-[14px] p-3 rounded-2xl rounded-tl-sm shadow-sm">
                      Hi there! I'm the Nike Support Assistant. How can I help
                      you gear up today?
                    </div>
                  </div>

                  <div className="flex gap-2 max-w-[85%] self-end flex-row-reverse">
                    <div className="bg-secondary text-white font-body-md text-[14px] p-3 rounded-2xl rounded-tr-sm shadow-sm">
                      What is your return policy?
                    </div>
                  </div>

                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-6 h-6 rounded-full bg-secondary shrink-0 flex items-center justify-center text-white text-[10px] font-bold mt-1">
                      N
                    </div>
                    <div className="bg-surface-container-low border border-outline-variant text-on-surface font-body-md text-[14px] p-3 rounded-2xl rounded-tl-sm shadow-sm">
                      You can return Nike products within 30 days of delivery,
                      completely free of charge. Items must be unworn and
                      unwashed. Would you like me to start a return for you?
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest border-t border-outline-variant p-3 z-10 flex items-center gap-2 rounded-b-3xl">
                  <input
                    className="grow bg-surface-container-low border-none rounded-full px-4 py-2 text-[14px] outline-none"
                    disabled
                    placeholder="Type a message..."
                    type="text"
                  />
                  <button className="w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center shrink-0 opacity-50 cursor-not-allowed">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      data-icon="send"
                    >
                      send
                    </span>
                  </button>
                </div>

                <div className="absolute bottom-1 left-0 w-full text-center pb-1">
                  <span className="text-[10px] text-on-surface-variant opacity-60">
                    Powered by Dockly
                  </span>
                </div>
              </div>
              <p className="text-center font-label-sm text-label-sm text-on-surface-variant mt-4 flex items-center justify-center gap-1">
                <span
                  className="material-symbols-outlined text-[16px]"
                  data-icon="info"
                >
                  info
                </span>{" "}
                Visit your public URL to test it live.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
