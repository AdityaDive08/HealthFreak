import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// ✅ Public routes (accessible without login)
const isPublicRoute = createRouteMatcher([
  "/",                  // Home page
  "/sign-in(.*)",       // Sign in routes
  "/sign-up(.*)",       // Sign up routes
  "/api/(.*)",          // API routes (like SOS API)
  "/sos",               // SOS emergency page
  "/emergency(.*)",     // Any emergency-related pages
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // ✅ Redirect logged-in users away from public landing pages
  if (
    userId &&
    (req.nextUrl.pathname === "/" ||
      req.nextUrl.pathname.startsWith("/sign-in") ||
      req.nextUrl.pathname.startsWith("/sign-up"))
  ) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return Response.redirect(dashboardUrl);
  }

  // ✅ Protect all other private routes
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static assets
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
