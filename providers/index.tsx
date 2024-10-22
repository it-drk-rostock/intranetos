"use client";

import dynamic from "next/dynamic";
import { MantineProvider } from "@providers/mantine-provider";
import { SessionProvider } from "next-auth/react";

import { Session } from "next-auth";
import { ReactQueryProvider } from "./react-query-provider";
/* const DirectusPageView = dynamic(() => import("@lib/directus/directus-page-view"), {
  ssr: false,
}); */

export const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  return (
    <SessionProvider session={session} refetchInterval={30}>
      <ReactQueryProvider>
        <MantineProvider>
          {/* <DirectusPageView /> */}
          {children}
        </MantineProvider>
      </ReactQueryProvider>
    </SessionProvider>
  );
};
