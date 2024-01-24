import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { DEFAULT_LOGIN_RED, apiPrefix, publicRoutes } from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const res = NextResponse.next();
  const { nextUrl } = req;

  const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);

  if (isApiRoute) {
    res.headers.append("Access-Control-Allow-Origin", "*");
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

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
