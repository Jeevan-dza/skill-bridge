import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  // Soft check for edge runtime — instant cookie presence check
  const isSessionValid = !!session;

  const protectedRoutes = ["/dashboard", "/onboarding", "/skill-gap", "/learning-path", "/job-readiness", "/profile", "/bridge-prism"];
  const isProtected = protectedRoutes.some((path) => request.nextUrl.pathname.startsWith(path));

  if (isProtected && !isSessionValid) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    // Aggressively clear dirty cookies if they try to access protection with a malformed state
    response.cookies.delete("session");
    return response;
  }

  const authRoutes = ["/login", "/signup"];
  const isAuthRoute = authRoutes.some((path) => request.nextUrl.pathname.startsWith(path));

  if (isAuthRoute && isSessionValid) {
    // Already logged in — redirect before page renders, user never sees auth page
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
