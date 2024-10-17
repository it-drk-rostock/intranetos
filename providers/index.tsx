"use client";
import { getQueryClient } from "@lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { MantineProvider } from "@providers/mantine-provider";
import { SessionProvider } from "next-auth/react";

import { Session } from "next-auth";
/* const DirectusPageView = dynamic(() => import("@lib/directus/directus-page-view"), {
  ssr: false,
}); */

export const Providers = async ({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) => {
  const queryClient = getQueryClient();

  return (
    <SessionProvider session={session} refetchInterval={30}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          {/* <DirectusPageView /> */}
          {children}
        </MantineProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};
