"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

// Nav items in an array — adding a new page is one line here.
const navItems = [
  { label: "Dashboard", icon: "dashboard", href: "/dashboard" },
  {
    label: "Documents",
    icon: "description",
    href: "/dashboard/documents",
    iconFilled: true,
  },
  { label: "Conversations", icon: "forum", href: "/dashboard/conversations" },
  { label: "Analytics", icon: "monitoring", href: "/dashboard/analytics" },
  { label: "Chatbot Settings", icon: "smart_toy", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // usePathname tells us the current URL so we can highlight the active nav item.
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* ══════════════════════════════════════
          SIDEBAR — fixed left, desktop only
          ══════════════════════════════════════ */}
      {/*
        w-64 = 256px — matches the lg:ml-64 offset on main content.
        hidden lg:flex — invisible on mobile, shown on desktop.
        z-50 so it sits above the topbar on desktop.
      */}
      <nav
        className="bg-primary-container text-secondary border-r border-outline-variant
                      shadow-sm fixed left-0 top-0 h-full w-64
                      flex-col p-md hidden lg:flex z-50"
      >
        {/* Brand */}
        <div className="flex items-center gap-3 mb-xl px-2">
          <div className="w-auto h-12 rounded-md flex items-center justify-center text-on-secondary">
            <Image
              src="/logo.png"
              alt="Dockly Logo"
              width={38}
              height={38}
              className="h-12 w-auto"
            />
          </div>
          <div>
            <h1 className="text-headline-md font-extrabold text-on-primary-fixed leading-tight">
              Dockly
            </h1>
            <p className="text-label-sm text-on-primary-container opacity-80">
              AI Customer Support, Simplified
            </p>
          </div>
        </div>

        {/* Nav links */}
        <ul className="flex flex-col gap-2 grow">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg 
                    font-label-md transition-all text-label-md
                    ${
                      isActive
                        ? "bg-secondary-container text-on-secondary-container font-semibold shadow-sm"
                        : "text-on-primary-container hover:bg-surface-variant/10"
                    }
                  `}
                >
                  <span
                    className="material-symbols-outlined"
                    style={
                      isActive
                        ? { fontVariationSettings: "'FILL' 1" }
                        : undefined
                    }
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}

          {/* Settings — pushed to bottom with mt-auto */}
          <li className="mt-auto">
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 text-on-primary-container 
                         hover:bg-surface-variant/10 px-4 py-3 rounded-lg 
                         transition-colors text-label-md
                         border-t border-outline-variant/20 pt-4"
            >
              <span className="material-symbols-outlined">settings</span>
              Profile &amp; Settings
            </Link>
          </li>
        </ul>
      </nav>

      {/* ══════════════════════════════════════
          MOBILE DRAWER — shadcn controlled mode
          open/onOpenChange gives us free: overlay click,
          swipe-to-close, and Escape key handling.
          DrawerContent renders the panel + overlay automatically.
          ══════════════════════════════════════ */}
      <Drawer
        direction="left"
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
      >
        {/*
          DrawerContent is the actual sliding panel.
          We override bg-popover (shadcn default) with our
          bg-primary-container to match the desktop sidebar.
          The rest of the classes come from drawer.tsx automatically:
          inset-y-0 left-0 w-3/4 rounded-r-xl border-r
        */}
        <DrawerTitle>Dockly</DrawerTitle>
        <DrawerContent className="bg-primary-container border-outline-variant p-md flex flex-col">

          {/* Header row: brand + close button */}
          <div className="flex items-center justify-between mb-xl px-2">
            <div className="flex items-center gap-3">
              <div className="w-auto h-12 rounded-md flex items-center justify-center text-on-secondary">
                <Image
                  src="/logo.png"
                  alt="Dockly Logo"
                  width={38}
                  height={38}
                  className="h-12 w-auto"
                />
              </div>
              <h1 className="text-on-secondary font-bold text-headline-md leading-tight">
                Dockly
              </h1>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-primary-container p-1"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Nav links — identical markup to desktop sidebar */}
          <ul className="flex flex-col gap-2 grow">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg text-label-md transition-all
                      ${
                        isActive
                          ? "bg-secondary-container text-on-secondary-container font-semibold"
                          : "text-on-primary-container hover:bg-surface-variant/10"
                      }
                    `}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={
                        isActive
                          ? { fontVariationSettings: "'FILL' 1" }
                          : undefined
                      }
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}

            {/* Profile & Settings — pushed to bottom */}
            <li className="mt-auto">
              <Link
                href="/dashboard/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 text-on-primary-container 
                           hover:bg-surface-variant/10 px-4 py-3 rounded-lg 
                           transition-colors text-label-md
                           border-t border-outline-variant/20 pt-4"
              >
                <span className="material-symbols-outlined">settings</span>
                Profile &amp; Settings
              </Link>
            </li>
          </ul>

        </DrawerContent>
      </Drawer>

      {/* ══════════════════════════════════════
          TOPBAR — fixed top, full width minus sidebar
          ══════════════════════════════════════ */}
      {/*
        left-0 lg:left-64: on mobile spans full width,
        on desktop starts after the sidebar (256px).
        h-16 = 64px — matches the mt-16 on main content.
      */}
      <header
        className="bg-surface-container-lowest border-b border-outline-variant
                         shadow-sm fixed top-0 right-0 left-0 lg:left-64 z-40
                         flex justify-between items-center px-md py-sm h-16"
      >
        {/* Left: hamburger (mobile) + search (desktop) */}
        <div className="flex items-center">
          {/*
            Mobile hamburger — plain Button, NO DrawerTrigger.
            We're in controlled mode so we drive open state manually.
            DrawerTrigger is only needed when Drawer manages its own state.
          */}
          <Button
            variant="ghost"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden mr-xs text-primary"
          >
            <span className="material-symbols-outlined">menu</span>
          </Button>

          {/* Mobile brand name */}
          <span className="lg:hidden text-headline-md font-black text-primary">
            Dockly
          </span>

          {/* Desktop search bar */}
          <div
            className="hidden lg:flex items-center bg-surface-container rounded-full 
                          px-4 py-2 w-64 border border-outline-variant/30 
                          focus-within:ring-2 focus-within:ring-secondary transition-all"
          >
            <span className="material-symbols-outlined text-outline mr-2 text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-body-md w-full placeholder:text-outline p-0"
            />
          </div>
        </div>

        {/* Right: notifications, help, avatar */}
        <div className="flex items-center gap-2">
          <button
            className="hover:bg-surface-container rounded-full p-2 transition-all 
                             text-on-surface-variant flex items-center justify-center"
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button
            className="hover:bg-surface-container rounded-full p-2 transition-all 
                             text-on-surface-variant flex items-center justify-center"
          >
            <span className="material-symbols-outlined">help_outline</span>
          </button>

          {/* Avatar */}
          <div
            className="ml-2 w-8 h-8 rounded-full bg-secondary-container 
                          text-on-secondary-container flex items-center justify-center 
                          font-bold text-label-md overflow-hidden border border-outline-variant"
          >
            <span className="text-label-sm font-bold">A</span>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════
          PAGE CONTENT
          {children} renders whatever page is active.
          mt-16 clears the fixed topbar (64px).
          lg:ml-64 clears the fixed sidebar (256px).
          ══════════════════════════════════════ */}
      <main className="lg:ml-64 mt-16 min-h-[calc(100vh-64px)]">
        {children}
      </main>
    </div>
  );
}
