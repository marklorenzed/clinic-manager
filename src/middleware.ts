import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.REDIS_URL || "",
  token: process.env.REDIS_SECRET || "",
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(50, "1 h"),
});

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname; // relative path

    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage = pathname.startsWith("/login");
    const sensitiveRoutes = ["/dashboard"];
    const sensitiveAPIRoutes = ["/api/organization"];

    // Manage rate limiting
    if (sensitiveAPIRoutes.some((route) => pathname.startsWith(route))) {
      const ip = req.ip ?? "127.0.0.1";
      try {
        const { success } = await ratelimit.limit(ip);

        if (!success) return NextResponse.json({ error: "Too Many Requests" });

        if (!isAuth)
          return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
          });
        return NextResponse.next();
      } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" });
      }
    }

    // Manage route protection
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return null;
    }
    if (
      !isAuth &&
      sensitiveRoutes.some((route) => pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*", "/api/:path*"],
};
