import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected API routes that require session
const PROTECTED_API = [
  "/api/projects",
  "/api/ai/",
  "/api/integrations/",
];

// Public API routes (no auth needed)
const PUBLIC_API = [
  "/api/auth/",
  "/api/lead",
];

// Protected pages
const PROTECTED_PAGES = [
  "/dashboard",
  "/editor",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if it's a protected API route
  const isProtectedApi = PROTECTED_API.some(p => pathname.startsWith(p));
  const isPublicApi = PUBLIC_API.some(p => pathname.startsWith(p));

  if (isProtectedApi && !isPublicApi) {
    const session = request.cookies.get("sb_session");
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // Check if it's a protected page
  if (PROTECTED_PAGES.some(p => pathname.startsWith(p))) {
    const session = request.cookies.get("sb_session");
    if (!session) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*", "/editor/:path*"],
};
