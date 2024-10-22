import { auth } from "@lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { routeMatchers } from "./constants/route-matchers";
import { UserProps } from "./server/utils/get-user";

function redirectTo(url: string, req: NextRequest): NextResponse {
  return NextResponse.redirect(new URL(url, req.url));
}

async function fetchUser(token: string): Promise<UserProps | null> {
  try {
    const response = await fetch(`http://localhost:3000/api/get-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        appApiKey: process.env.APP_API_KEY,
      }),
    });
    return await response.json();
  } catch (error) {
    return null;
  }
}

export default auth(async (req: NextRequest) => {
  const url = new URL(req.url);

  if (!req.auth) {
    if (
      routeMatchers.auth.includes(url.pathname) ||
      routeMatchers.public.includes(url.pathname)
    ) {
      return NextResponse.next();
    }
    return redirectTo("/sign-in", req);
  }

  if (routeMatchers.auth.includes(url.pathname)) {
    return redirectTo("/", req);
  }

  if (!routeMatchers.public.includes(url.pathname)) {
    const user = await fetchUser(req.auth.token);

    if (!user?.first_name || !user?.last_name) {
      return url.pathname.includes("/user-info")
        ? NextResponse.next()
        : redirectTo("/user-info", req);
    }

    if (user?.requested_policies.length === 0) {
      return url.pathname.includes("/join-area")
        ? NextResponse.next()
        : redirectTo("/join-area", req);
    }

    if (url.pathname.includes("/onboarding-completed")) {
      return NextResponse.next();
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
