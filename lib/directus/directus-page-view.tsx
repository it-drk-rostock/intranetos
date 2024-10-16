/* "use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const DirectusPageView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
   const directus = useDirectus(); 
   const isDevelopment = process.env.NODE_ENV === "development";
const isLocalhost = window.location.hostname === "localhost";
  useEffect(() => {
Track pageviews
    if (pathname && directus && !isDevelopment && !isLocalhost) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      directus.capture(url);
    }
  }, [pathname, searchParams, directus]);

  return null;
};

export default DirectusPageView; */
