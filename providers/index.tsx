import { getQueryClient } from "@lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { MantineProvider } from "@providers/mantine-provider";

/* const DirectusPageView = dynamic(() => import("@lib/directus/directus-page-view"), {
  ssr: false,
}); */

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        {/* <DirectusPageView /> */}
        {children}
      </MantineProvider>
    </QueryClientProvider>
  );
};
