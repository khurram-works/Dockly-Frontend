"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifySession } from "@/api/auth";
import { clearSessionMarker } from "@/lib/sessionCookie";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    verifySession()
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        if (!cancelled) {
          clearSessionMarker();
          router.replace("/login");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <p className="text-on-surface-variant">Checking session...</p>
      </div>
    );
  }

  return <>{children}</>;
}
