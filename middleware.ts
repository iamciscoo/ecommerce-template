import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Configuration for paths that require authentication
const authConfig = {
  // Public paths that don't require authentication
  publicPaths: [
    "/",
    "/auth/signin",
    "/auth/signup",
    "/auth/error",
    "/auth/signout",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/api/auth/(.+)",
  ],
  // Paths that require admin role
  adminPaths: ["/admin", "/admin/(.+)"],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the path is public
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Check authentication using JWT token directly instead of auth()
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If there's no token, redirect to login
  if (!token) {
    const signInUrl = new URL("/auth/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Check for admin paths
  if (isAdminPath(pathname) && token.role !== "admin") {
    // If the user is not an admin, redirect to access denied
    const accessDeniedUrl = new URL("/auth/error", req.url);
    accessDeniedUrl.searchParams.set("error", "AccessDenied");
    return NextResponse.redirect(accessDeniedUrl);
  }

  // User is authenticated and has proper access, proceed
  return NextResponse.next();
}

// Helper function to check if a path is public
function isPublicPath(pathname: string): boolean {
  return authConfig.publicPaths.some((path) => {
    if (path.includes("(.+)")) {
      const regex = new RegExp(`^${path.replace("(.+)", ".*")}$`);
      return regex.test(pathname);
    }
    return pathname === path;
  });
}

// Helper function to check if a path is admin-only
function isAdminPath(pathname: string): boolean {
  return authConfig.adminPaths.some((path) => {
    if (path.includes("(.+)")) {
      const regex = new RegExp(`^${path.replace("(.+)", ".*")}$`);
      return regex.test(pathname);
    }
    return pathname === path;
  });
}

// Configure middleware to run only on specific paths
export const config = {
  matcher: [
    // Match all paths except static files, api routes we don't want to protect, and _next
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}; 