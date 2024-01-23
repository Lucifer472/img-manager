import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { DEFAULT_LOGIN_RED, apiPrefix, publicRoutes } from "./routes";

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

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
