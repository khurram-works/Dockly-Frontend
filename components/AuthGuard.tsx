"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifySession } from "@/api/auth";
import { clearSessionMarker } from "@/lib/sessionCookie";
import { useAuthContext } from "@/context/authContext";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const { company } = useAuthContext();

  useEffect(() => {
    let cancelled = false;

    if (company) {
      if (!cancelled) setReady(true);
    } else {
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
    }

    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <p className="text-on-surface-variant">Checking session...</p>
      </div>
    );
  }

  return <>{children}</>;
}
