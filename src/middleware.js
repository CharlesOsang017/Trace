import { NextResponse } from "next/server";

export function middleware(request) {
  const userToken = request.cookies.get("jwt")?.value;
  const { pathname } = request.nextUrl;
  const loginUrl = new URL("/login", request.url);
  const dashboardUrl = new URL("/", request.url);

  // Define public routes that don't require authentication
  const publicPaths = ["/login"];
  const isPublicPath = publicPaths.includes(pathname);

  if (userToken) {
    // Redirect authenticated users from public paths to dashboard
    if (isPublicPath) {
      return NextResponse.redirect(dashboardUrl);
    }
  } else {
    // Redirect unauthenticated users from protected paths to login
    if (!isPublicPath) {
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths except static files and API routes
  matcher: ["/issues:path*", "/"],
};
