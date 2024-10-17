import { auth } from "@lib/auth";

import { NextRequest, NextResponse } from "next/server";
import { routeMatchers } from "./constants/route-matchers";

function redirectTo(url: string, req: NextRequest): NextResponse {
  return NextResponse.redirect(new URL(url, req.url));
}

export default auth((req: NextRequest) => {
  const url = new URL(req.url);

  if (req.auth) {
    if (routeMatchers.auth.includes(url.pathname)) {
      return redirectTo("/", req);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
