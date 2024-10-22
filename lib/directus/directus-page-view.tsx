"use client";

import { createItem } from "@directus/sdk";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { client } from "./clients";

const DirectusPageView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const session = useSession();
  const analyticsToken = process.env.NEXT_PUBLIC_ANALYTICS_TOKEN;
  const isDevelopment = process.env.NODE_ENV === "development";
  const isLocalhost = window.location.hostname === "localhost";

  useEffect(() => {
    if (pathname && !isDevelopment && !isLocalhost) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }

      const token = session.data?.token || analyticsToken;

      if (token) {
        client(token).request(
          createItem("page_analytics", {
            path: url,
          })
        );
      }
    }
  }, [pathname, searchParams, session, analyticsToken]);

  return null;
};

export default DirectusPageView;
