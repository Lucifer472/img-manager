import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { DEFAULT_LOGIN_RED, apiPrefix, publicRoutes } from "@/routes";
import { getWebsites } from "@/lib/websites";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  const { nextUrl } = req;

  const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);

  if (isApiRoute) return null;

  const isPub = publicRoutes.includes(nextUrl.pathname);

  if (isPub) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_RED, nextUrl));
    }

    return null;
  }

  if (!isLoggedIn) return Response.redirect(new URL("/", nextUrl));
  return null;
});

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const res = NextResponse.next();

  const websites = await getWebsites();

  if (websites === "http://localhost:3000") return null;

  const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);

  if (isApiRoute) {
    websites.map((w) => {
      res.headers.append("Access-Control-Allow-Origin", w.websites);
    });
    res.headers.append("Access-Control-Allow-Credentials", "true");
    res.headers.append(
      "Access-Control-Allow-Methods",
      "GET,DELETE,PATCH,POST,PUT"
    );
    res.headers.append(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );

    return res;
  }

  return null;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
