"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@lib/react-query";
import type * as React from "react";

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
