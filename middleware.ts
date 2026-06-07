import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/sessionCookie";

export function middleware(request: NextRequest) {
  const hasSessionMarker = request.cookies.has(SESSION_COOKIE_NAME);

  if (!hasSessionMarker) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
