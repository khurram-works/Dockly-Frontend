"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AuthGuard } from "@/components/AuthGuard";
import { useAuthContext } from "@/context/authContext";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";


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
  // { label: "Chatbot Settings", icon: "smart_toy", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-background text-on-background">
      <nav
        className="bg-primary-container text-secondary border-r border-outline-variant
                      shadow-sm fixed left-0 top-0 h-full w-64
                      flex-col p-md hidden lg:flex z-50"
      >
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

          <li className="mt-auto space-y-1 border-t border-outline-variant/20 pt-4">
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 text-on-primary-container 
                         hover:bg-surface-variant/10 px-4 py-3 rounded-lg 
                         transition-colors text-label-md"
            >
              <span className="material-symbols-outlined">settings</span>
              Profile &amp; Settings
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 text-on-primary-container 
                         hover:bg-surface-variant/10 px-4 py-3 rounded-lg 
                         transition-colors text-label-md"
            >
              <span className="material-symbols-outlined">logout</span>
              Sign out
            </button>
          </li>
        </ul>
      </nav>


      <Drawer
        direction="left"
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
      >

        
        <DrawerContent className="bg-primary-container border-outline-variant p-md flex flex-col">
          
          <DrawerTitle className="hidden">Dockly</DrawerTitle>
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

            <li className="mt-auto space-y-1 border-t border-outline-variant/20 pt-4">
              <Link
                href="/dashboard/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 text-on-primary-container 
                           hover:bg-surface-variant/10 px-4 py-3 rounded-lg 
                           transition-colors text-label-md"
              >
                <span className="material-symbols-outlined">settings</span>
                Profile &amp; Settings
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  void handleLogout();
                }}
                className="flex w-full items-center gap-3 text-on-primary-container 
                           hover:bg-surface-variant/10 px-4 py-3 rounded-lg 
                           transition-colors text-label-md"
              >
                <span className="material-symbols-outlined">logout</span>
                Sign out
              </button>
            </li>
          </ul>

        </DrawerContent>
      </Drawer>


      <header
        className="bg-surface-container-lowest border-b border-outline-variant
                         shadow-sm fixed top-0 right-0 left-0 lg:left-64 z-40
                         flex justify-between items-center px-md py-sm h-16"
      >
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden mr-xs text-primary"
          >
            <span className="material-symbols-outlined">menu</span>
          </Button>

          <span className="lg:hidden text-headline-md font-black text-primary">
            Dockly
          </span>

          {/* <div
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
          </div> */}
        </div>

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

          <div
            className="ml-2 w-8 h-8 rounded-full bg-secondary-container 
                          text-on-secondary-container flex items-center justify-center 
                          font-bold text-label-md overflow-hidden border border-outline-variant"
          >
            <span className="text-label-sm font-bold">A</span>
          </div>
        </div>
      </header>
      <main className="lg:ml-64 mt-16 min-h-[calc(100vh-64px)] overflow-y-auto">
        <AuthGuard>{children}</AuthGuard>
      </main>
    </div>
  );
}
